/**
 * Private bulk image staging. No SDK or image-transform dependency is required.
 * Originals are preserved; signature checks are not a full image decode.
 * The caller must establish partner extraction and image rights before calling.
 */
import { createHash } from 'node:crypto';
import { lookup } from 'node:dns/promises';
import { request as httpsRequest } from 'node:https';
import { BlockList, isIP } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

const DEFAULT_MAX_BYTES = 5 * 1024 * 1024;
const MAX_STANDARD_BYTES = 6 * 1024 * 1024;
const MAX_ATTEMPTS = 3;
const TRANSIENT_CODES = new Set(['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'EPIPE', 'EAI_AGAIN', 'ENETUNREACH', 'EHOSTUNREACH']);
const ipv4Blocked = new BlockList();
for (const [address, prefix] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
  ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24],
  ['192.88.99.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15],
  ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
]) ipv4Blocked.addSubnet(address, prefix, 'ipv4');
const ipv6Global = new BlockList();
ipv6Global.addSubnet('2000::', 3, 'ipv6');
const ipv6Blocked = new BlockList();
for (const [address, prefix] of [
  ['2001::', 23], ['2001:db8::', 32], ['2002::', 16], ['3fff::', 20],
]) ipv6Blocked.addSubnet(address, prefix, 'ipv6');

export class MediaError extends Error {
  constructor(code, message, { retryable = false, status } = {}) {
    super(message);
    this.name = 'MediaError';
    this.code = code;
    this.retryable = retryable;
    if (status !== undefined) this.status = status;
  }
}

const abortedError = () => new MediaError('ABORTED', 'Image staging was cancelled.');
const throwIfAborted = (signal) => { if (signal?.aborted) throw abortedError(); };

function validateSignal(signal) {
  if (signal !== undefined && !(signal instanceof AbortSignal)) {
    throw new MediaError('INVALID_CONFIG', 'signal must be an AbortSignal when provided.');
  }
  throwIfAborted(signal);
}

// DNS lookup itself has no cancellation API. Stop awaiting it immediately and
// discard late answers; no socket may be opened after cancellation.
function abortable(start, signal) {
  throwIfAborted(signal);
  if (!signal) return Promise.resolve().then(start);
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (error, value) => {
      if (settled) return;
      settled = true;
      signal.removeEventListener('abort', onAbort);
      if (error) reject(error); else resolve(value);
    };
    const onAbort = () => finish(abortedError());
    signal.addEventListener('abort', onAbort, { once: true });
    if (signal.aborted) { onAbort(); return; }
    Promise.resolve().then(() => { throwIfAborted(signal); return start(); }).then(
      (value) => finish(null, value),
      (error) => finish(signal.aborted ? abortedError() : error),
    );
  });
}

export function isPublicAddress(address) {
  const family = isIP(address);
  if (family === 4) return !ipv4Blocked.check(address, 'ipv4');
  if (family === 6) return ipv6Global.check(address, 'ipv6') && !ipv6Blocked.check(address, 'ipv6');
  return false;
}

function validateLimits(maxBytes, timeoutMs) {
  if (!Number.isInteger(maxBytes) || maxBytes < 1 || maxBytes > MAX_STANDARD_BYTES) {
    throw new MediaError('INVALID_CONFIG', 'maxBytes must be between 1 byte and 6 MiB; larger images need a resumable-upload implementation.');
  }
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 60000) {
    throw new MediaError('INVALID_CONFIG', 'timeoutMs must be between 1 and 60000 milliseconds.');
  }
}

function hostAllowlist(allowedHosts) {
  if (!Array.isArray(allowedHosts) || allowedHosts.length === 0) {
    throw new MediaError('INVALID_CONFIG', 'A nonempty exact image hostname allowlist is required.');
  }
  const hosts = new Set();
  for (const host of allowedHosts) {
    if (typeof host !== 'string' || !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/i.test(host) || host.length > 253) {
      throw new MediaError('INVALID_CONFIG', 'Image allowlist entries must be exact DNS hostnames, without paths or wildcards.');
    }
    hosts.add(host.toLowerCase());
  }
  return hosts;
}

function approvedUrl(value, hosts) {
  let url;
  try { url = new URL(value); } catch { throw new MediaError('INVALID_URL', 'An image URL is invalid.'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.hash || isIP(url.hostname.replace(/^\[|\]$/g, ''))) {
    throw new MediaError('UNSAFE_URL', 'Only HTTPS DNS URLs without credentials, custom ports, IP literals or fragments are allowed.');
  }
  if (!hosts.has(url.hostname)) throw new MediaError('HOST_NOT_ALLOWED', 'The image hostname is not on the partner allowlist.');
  return url;
}

function storageConfig({ supabaseUrl, serverKey, bucket, partner }) {
  let url;
  try { url = new URL(supabaseUrl); } catch { throw new MediaError('INVALID_CONFIG', 'A valid Supabase project URL is required.'); }
  if (url.protocol !== 'https:' || !/^[a-z0-9]{20}\.supabase\.co$/.test(url.hostname) || url.port || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new MediaError('INVALID_CONFIG', 'Use the exact HTTPS project-ref.supabase.co URL; custom Storage hosts are not supported by this prototype.');
  }
  if (typeof serverKey !== 'string' || /\s/.test(serverKey)) throw new MediaError('INVALID_CONFIG', 'A server-only Supabase secret or service-role key is required.');
  let legacyServiceRole = false;
  if (!serverKey.startsWith('sb_secret_')) {
    try {
      const segments = serverKey.split('.');
      const payload = JSON.parse(Buffer.from(segments[1], 'base64url').toString('utf8'));
      legacyServiceRole = segments.length === 3 && payload.role === 'service_role';
    } catch { /* Invalid credentials are rejected below without including their contents. */ }
    if (!legacyServiceRole) throw new MediaError('INVALID_CONFIG', 'A server-only Supabase secret or service-role key is required.');
  }
  if (serverKey.length < 16 || !/^[a-z0-9][a-z0-9_-]{0,62}$/.test(bucket) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(partner) || partner.length > 80) {
    throw new MediaError('INVALID_CONFIG', 'Invalid server credential, staging bucket or partner slug.');
  }
  // New secret keys authenticate via apikey; only legacy JWT keys are bearer tokens.
  const headers = { apikey: serverKey, ...(legacyServiceRole ? { authorization: `Bearer ${serverKey}` } : {}) };
  return { base: url.origin, headers };
}

function sniffImage(bytes, declaredType = '') {
  let kind;
  if (bytes.length >= 33 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) && bytes.toString('ascii', 12, 16) === 'IHDR' && bytes.toString('ascii', bytes.length - 8, bytes.length - 4) === 'IEND') {
    kind = { extension: 'png', contentType: 'image/png' };
  } else if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff && bytes[bytes.length - 2] === 0xff && bytes[bytes.length - 1] === 0xd9) {
    kind = { extension: 'jpg', contentType: 'image/jpeg' };
  } else if (bytes.length >= 20 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.readUInt32LE(4) === bytes.length - 8 && bytes.toString('ascii', 8, 12) === 'WEBP' && ['VP8 ', 'VP8L', 'VP8X'].includes(bytes.toString('ascii', 12, 16))) {
    kind = { extension: 'webp', contentType: 'image/webp' };
  } else {
    throw new MediaError('UNSUPPORTED_IMAGE', 'Downloaded bytes do not have a supported PNG, JPEG or WebP image signature.');
  }
  const mime = declaredType.split(';')[0].trim().toLowerCase().replace(/^image\/jpg$/, 'image/jpeg');
  if (mime && mime !== 'application/octet-stream' && mime !== 'binary/octet-stream' && mime !== kind.contentType) {
    throw new MediaError('MIME_MISMATCH', 'The declared image MIME type does not match the downloaded bytes.');
  }
  return kind;
}

const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const safeFailure = (error) => error instanceof MediaError
  ? { code: error.code, message: error.message, retryable: error.retryable }
  : { code: 'MEDIA_FAILED', message: 'Image staging failed.', retryable: false };

/** Dependency injection is for offline tests only. Production exports use Node's TLS transport. */
export function createMediaClient({ resolve = lookup, request = httpsRequest, sleep = delay, random = Math.random } = {}) {
  async function resolvePinned(hostname, timeoutMs, signal) {
    let timer;
    let addresses;
    try {
      addresses = await abortable(() => Promise.race([
        resolve(hostname, { all: true, verbatim: true }),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new MediaError('TIMEOUT', 'DNS resolution timed out.', { retryable: true })), timeoutMs); }),
      ]), signal);
    } catch (error) {
      if (error instanceof MediaError) throw error;
      throw new MediaError('DNS_FAILED', 'Could not resolve the approved hostname.', { retryable: error?.code === 'EAI_AGAIN' });
    } finally { clearTimeout(timer); }
    throwIfAborted(signal);
    if (!Array.isArray(addresses) || addresses.length === 0 || addresses.some(({ address, family }) => !isPublicAddress(address) || isIP(address) !== family)) {
      throw new MediaError('UNSAFE_ADDRESS', 'The hostname resolved to a nonpublic or invalid network address.');
    }
    return addresses[0];
  }

  async function requestOnce(url, { method = 'GET', headers = {}, body, maxBytes, timeoutMs, signal }) {
    throwIfAborted(signal);
    const started = Date.now();
    const address = await resolvePinned(url.hostname, timeoutMs, signal);
    throwIfAborted(signal);
    const remaining = Math.max(1, timeoutMs - (Date.now() - started));
    return new Promise((resolveResponse, reject) => {
      let settled = false;
      let timer;
      let req;
      let incoming;
      const finish = (error, result) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        signal?.removeEventListener('abort', onAbort);
        if (error) reject(error); else resolveResponse(result);
      };
      const onAbort = () => {
        const error = abortedError();
        finish(error);
        req?.destroy(error);
        incoming?.destroy();
      };
      const onError = (error) => finish(error instanceof MediaError ? error : new MediaError('NETWORK_FAILED', 'A network request failed.', { retryable: TRANSIENT_CODES.has(error?.code) }));
      signal?.addEventListener('abort', onAbort, { once: true });
      if (signal?.aborted) { onAbort(); return; }
      try {
        req = request({
          protocol: 'https:', hostname: url.hostname, servername: url.hostname, port: 443,
          path: `${url.pathname}${url.search}`, method, agent: false, autoSelectFamily: false,
          headers: { 'accept-encoding': 'identity', ...headers },
          // Pin the already checked address. TLS still verifies the original DNS name.
          lookup: (hostname, options, callback) => {
            if (hostname !== url.hostname) return callback(new MediaError('UNSAFE_ADDRESS', 'Unexpected hostname during connection.'));
            if (options?.all) callback(null, [address]); else callback(null, address.address, address.family);
          },
        }, (response) => {
          incoming = response;
          if (settled || signal?.aborted) {
            if (signal?.aborted) onAbort();
            response.destroy();
            return;
          }
          const status = response.statusCode ?? 0;
          if (status >= 300 && status < 400) {
            finish(new MediaError('REDIRECT_REJECTED', 'Redirects are not allowed for image or Storage requests.'));
            response.destroy();
            return;
          }
          const encoding = String(response.headers['content-encoding'] ?? '').toLowerCase();
          if (encoding && encoding !== 'identity') {
            finish(new MediaError('ENCODING_NOT_SUPPORTED', 'Compressed HTTP response bodies are not supported.'));
            response.destroy();
            return;
          }
          const rawLength = response.headers['content-length'];
          if (rawLength !== undefined && (!/^\d+$/.test(String(rawLength)) || Number(rawLength) > maxBytes)) {
            finish(new MediaError('BYTE_LIMIT', 'The response exceeds the configured byte limit.'));
            response.destroy();
            return;
          }
          const chunks = [];
          let total = 0;
          response.on('data', (chunk) => {
            if (settled) return;
            const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
            total += buffer.length;
            if (total > maxBytes) {
              finish(new MediaError('BYTE_LIMIT', 'The response exceeds the configured byte limit.'));
              response.destroy();
              return;
            }
            chunks.push(buffer);
          });
          response.on('end', () => finish(null, { status, headers: response.headers, bytes: Buffer.concat(chunks, total) }));
          response.on('error', onError);
          response.on('aborted', () => finish(new MediaError('NETWORK_FAILED', 'The remote response was interrupted.', { retryable: true })));
          response.on('close', () => {
            if (!settled && !response.complete) finish(new MediaError('NETWORK_FAILED', 'The remote response closed before completion.', { retryable: true }));
          });
        });
        req.on('error', onError);
        if (signal?.aborted) { onAbort(); return; }
        timer = setTimeout(() => {
          const error = new MediaError('TIMEOUT', 'The network request timed out.', { retryable: true });
          finish(error);
          req.destroy(error);
        }, remaining);
        if (body) req.write(body);
        req.end();
      } catch (error) {
        onError(error);
        req?.destroy();
      }
    });
  }

  async function requestRetry(url, options) {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
      throwIfAborted(options.signal);
      let retryAfter = 0;
      try {
        const response = await requestOnce(url, options);
        throwIfAborted(options.signal);
        if (response.status === 429 || (response.status >= 500 && response.status <= 599)) {
          const value = response.headers['retry-after'];
          retryAfter = /^\d+$/.test(String(value)) ? Number(value) * 1000 : 0;
          throw new MediaError('HTTP_TRANSIENT', 'The remote service temporarily rejected the request.', { retryable: true, status: response.status });
        }
        return response;
      } catch (error) {
        throwIfAborted(options.signal);
        if (!(error instanceof MediaError) || !error.retryable || attempt === MAX_ATTEMPTS - 1) throw error;
        const backoff = Math.min(5000, Math.max(retryAfter, 250 * 2 ** attempt + Math.floor(random() * 100)));
        await abortable(() => sleep(backoff, undefined, { signal: options.signal }), options.signal);
      }
    }
    throw new MediaError('MEDIA_FAILED', 'The request could not be completed.');
  }

  async function downloadImage(url, { allowedHosts, maxBytes = DEFAULT_MAX_BYTES, timeoutMs = 20000, signal } = {}) {
    validateSignal(signal);
    validateLimits(maxBytes, timeoutMs);
    const approved = approvedUrl(url, hostAllowlist(allowedHosts));
    const response = await requestRetry(approved, { maxBytes, timeoutMs, signal });
    throwIfAborted(signal);
    if (response.status !== 200) throw new MediaError('IMAGE_HTTP_ERROR', 'The image source did not return a complete successful response.', { status: response.status });
    const kind = sniffImage(response.bytes, String(response.headers['content-type'] ?? ''));
    return { bytes: response.bytes, sha256: digest(response.bytes), ...kind };
  }

  /**
   * images: URL strings or { url: string } objects, in desired gallery order.
   * checkpoint(asset, { signal }): optional callback invoked serially for each
   * verified asset. The callback must honor the signal for its own side effects.
   * Cancellation rejects the entire call with code ABORTED and stops queued work.
   * Returns { assets, failures }; both retain input indexes and source URLs.
   * Every rerun revalidates source bytes and any existing immutable Storage object.
   */
  async function stageImages(images, {
    partner, allowedHosts, supabaseUrl, serverKey, bucket = 'ha-import-staging',
    concurrency = 4, maxBytes = DEFAULT_MAX_BYTES, timeoutMs = 20000, checkpoint, signal,
  } = {}) {
    validateSignal(signal);
    validateLimits(maxBytes, timeoutMs);
    hostAllowlist(allowedHosts);
    if (!Array.isArray(images) || !Number.isInteger(concurrency) || concurrency < 1 || concurrency > 16 || (checkpoint !== undefined && typeof checkpoint !== 'function')) {
      throw new MediaError('INVALID_CONFIG', 'Provide an image array, concurrency from 1 to 16, and an optional checkpoint callback.');
    }
    const config = storageConfig({ supabaseUrl, serverKey, bucket, partner });
    const storageRequest = (path, options = {}) => requestRetry(new URL(`${config.base}/storage/v1/${path}`), {
      maxBytes: 65536, timeoutMs, ...options, signal, headers: { ...config.headers, ...options.headers },
    });
    // Fail before downloading or writing if the destination is missing or public.
    const bucketResponse = await storageRequest(`bucket/${bucket}`);
    throwIfAborted(signal);
    let bucketInfo;
    try { bucketInfo = JSON.parse(bucketResponse.bytes.toString('utf8')); } catch { /* Checked below. */ }
    if (bucketResponse.status !== 200 || !bucketInfo || bucketInfo.public !== false || (bucketInfo.id !== bucket && bucketInfo.name !== bucket)) {
      throw new MediaError('STAGING_BUCKET_UNAVAILABLE', 'The configured private staging bucket must already exist and be readable with the server key.');
    }
    const results = new Array(images.length);
    const pendingUploads = new Map();
    let next = 0;
    let checkpointQueue = Promise.resolve();

    async function uploadAndVerify(image) {
      throwIfAborted(signal);
      const path = `${partner}/${image.sha256}.${image.extension}`;
      const upload = await storageRequest(`object/${bucket}/${path}`, {
        method: 'POST', body: image.bytes,
        headers: { 'content-type': image.contentType, 'content-length': String(image.bytes.length), 'x-upsert': 'false', 'cache-control': 'max-age=31536000' },
      });
      let errorBody;
      try { errorBody = JSON.parse(upload.bytes.toString('utf8')); } catch { /* Remote error bodies are never returned to callers. */ }
      const conflict = upload.status === 409 || (upload.status === 400 && (
        ['Duplicate', 'KeyAlreadyExists', 'ResourceAlreadyExists'].includes(errorBody?.error) ||
        ['Duplicate', 'KeyAlreadyExists', 'ResourceAlreadyExists'].includes(errorBody?.code) ||
        errorBody?.message === 'The resource already exists'
      ));
      if (!conflict && (upload.status < 200 || upload.status >= 300)) {
        throw new MediaError('STORAGE_UPLOAD_FAILED', 'Supabase Storage rejected the image upload.', { status: upload.status });
      }
      const stored = await storageRequest(`object/authenticated/${bucket}/${path}`, { maxBytes });
      if (stored.status !== 200 || digest(stored.bytes) !== image.sha256) {
        throw new MediaError('STORAGE_HASH_MISMATCH', 'The stored image could not be verified against the source content hash.');
      }
      const storedKind = sniffImage(stored.bytes, String(stored.headers['content-type'] ?? ''));
      if (storedKind.contentType !== image.contentType) throw new MediaError('STORAGE_HASH_MISMATCH', 'The stored image content type could not be verified.');
      return { sha256: image.sha256, contentType: image.contentType, extension: image.extension, byteLength: image.bytes.length, bucket, path, status: conflict ? 'reused' : 'uploaded' };
    }

    async function worker() {
      while (next < images.length) {
        throwIfAborted(signal);
        const index = next++;
        const sourceUrl = typeof images[index] === 'string' ? images[index] : images[index]?.url;
        try {
          if (typeof sourceUrl !== 'string') throw new MediaError('INVALID_URL', 'Each image must be a URL string or an object containing url.');
          const image = await downloadImage(sourceUrl, { allowedHosts, maxBytes, timeoutMs, signal });
          throwIfAborted(signal);
          const prior = pendingUploads.get(image.sha256);
          let uploadPromise = prior;
          if (!uploadPromise) {
            uploadPromise = uploadAndVerify(image);
            pendingUploads.set(image.sha256, uploadPromise);
            uploadPromise.catch(() => { if (pendingUploads.get(image.sha256) === uploadPromise) pendingUploads.delete(image.sha256); });
          }
          const stored = await uploadPromise;
          throwIfAborted(signal);
          const asset = { index, sourceUrl, ...stored, status: prior ? 'reused' : stored.status };
          if (checkpoint) {
            checkpointQueue = checkpointQueue.catch(() => {}).then(() => {
              throwIfAborted(signal);
              return abortable(() => checkpoint(asset, { signal }), signal);
            });
            const checkpointTask = checkpointQueue;
            try { await abortable(() => checkpointTask, signal); } catch (error) {
              if (signal?.aborted || error?.code === 'ABORTED') throw abortedError();
              throw new MediaError('CHECKPOINT_FAILED', 'The image was staged but its checkpoint could not be saved.');
            }
          }
          throwIfAborted(signal);
          results[index] = { asset };
        } catch (error) {
          if (signal?.aborted || error?.code === 'ABORTED') throw abortedError();
          results[index] = { failure: { index, sourceUrl: typeof sourceUrl === 'string' ? sourceUrl : null, ...safeFailure(error) } };
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(concurrency, images.length) }, worker));
    throwIfAborted(signal);
    return { assets: results.filter((row) => row.asset).map((row) => row.asset), failures: results.filter((row) => row.failure).map((row) => row.failure) };
  }

  return { downloadImage, stageImages };
}

const client = createMediaClient();
export const downloadImage = client.downloadImage;
export const stageImages = client.stageImages;
