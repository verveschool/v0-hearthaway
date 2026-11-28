import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { PassThrough } from 'node:stream';
import { createHash } from 'node:crypto';
import { createMediaClient, isPublicAddress } from './media.mjs';

const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jDBkAAAAASUVORK5CYII=', 'base64');
const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 4, 1, 2, 0xff, 0xd9]);
const WEBP = Buffer.concat([Buffer.from('RIFF'), Buffer.from([16, 0, 0, 0]), Buffer.from('WEBPVP8L'), Buffer.from([4, 0, 0, 0, 0, 0, 0, 0])]);
const URL = 'https://cdn.partner.example/property.png';
const HOST = 'cdn.partner.example';
const SUPABASE_HOST = 'abcdefghijklmnopqrst.supabase.co';
const KEY = 'sb_secret_test_never_in_errors';
const SHA = createHash('sha256').update(PNG).digest('hex');
const baseOptions = {
  partner: 'scraye', allowedHosts: [HOST], supabaseUrl: `https://${SUPABASE_HOST}`,
  serverKey: KEY, concurrency: 2,
};

function harness(handler, { addresses = [{ address: '93.184.216.34', family: 4 }] } = {}) {
  const calls = [];
  const resolutions = [];
  const sleeps = [];
  let active = 0;
  let maxActive = 0;
  const request = (options, callback) => {
    const req = new EventEmitter();
    let body = Buffer.alloc(0);
    let destroyed = false;
    let call;
    req.write = (bytes) => { body = Buffer.concat([body, bytes]); };
    req.destroy = (error) => { destroyed = true; if (call) call.destroyed = true; if (error) queueMicrotask(() => req.emit('error', error)); };
    req.end = () => {
      call = { ...options, body };
      calls.push(call);
      active += 1;
      maxActive = Math.max(maxActive, active);
      queueMicrotask(async () => {
        let released = false;
        const release = () => { if (!released) { active -= 1; released = true; } };
        try {
          await new Promise((resolve, reject) => options.lookup(options.hostname, { all: false }, (error, address, family) => {
            if (error) reject(error); else { call.pinned = { address, family }; resolve(); }
          }));
          const result = await handler(call, calls.length);
          if (destroyed) { release(); return; }
          if (result.error) { release(); req.emit('error', result.error); return; }
          const response = new PassThrough();
          response.statusCode = result.status ?? 200;
          response.headers = result.headers ?? { 'content-type': 'image/png' };
          response.complete = false;
          response.on('close', release);
          callback(response);
          if (result.delayMs) await new Promise((resolve) => setTimeout(resolve, result.delayMs));
          for (const chunk of result.chunks ?? [result.bytes ?? PNG]) {
            if (response.destroyed) break;
            response.write(chunk);
          }
          response.complete = true;
          response.end();
          // Data has arrived; do not count a completed request during subsequent work.
          release();
        } catch (error) { release(); req.emit('error', error); }
      });
    };
    return req;
  };
  const client = createMediaClient({
    request,
    resolve: async (hostname) => {
      resolutions.push(hostname);
      return typeof addresses === 'function' ? addresses(hostname, resolutions.length) : addresses;
    },
    sleep: async (ms) => { sleeps.push(ms); },
    random: () => 0,
  });
  return { client, calls, resolutions, sleeps, maxActive: () => maxActive };
}

const json = (value, status = 200) => ({ status, headers: { 'content-type': 'application/json' }, bytes: Buffer.from(JSON.stringify(value)) });
const bucket = () => json({ id: 'ha-import-staging', public: false });

test('public-address predicate rejects private, special, mapped and metadata addresses', () => {
  for (const address of [
    '127.0.0.1', '10.0.0.1', '100.64.0.1', '169.254.169.254', '172.16.0.1',
    '192.168.1.1', '198.18.0.1', '192.0.2.1', '224.0.0.1', '255.255.255.255',
    '::1', '::ffff:127.0.0.1', 'fc00::1', 'fe80::1', '64:ff9b::7f00:1', '2002:7f00:1::',
    '2001:db8::1', '2001::1', '3fff::1',
  ]) assert.equal(isPublicAddress(address), false, address);
  assert.equal(isPublicAddress('8.8.8.8'), true);
  assert.equal(isPublicAddress('2606:4700:4700::1111'), true);
});

test('rejects URL bypasses before transport', async () => {
  const h = harness(() => ({}));
  for (const url of [
    'http://cdn.partner.example/a.png', 'https://cdn.partner.example:8443/a.png',
    'https://user:secret@cdn.partner.example/a.png', 'https://127.0.0.1/a.png',
    'https://cdn.partner.example.attacker.example/a.png', 'https://cdn.partner.example/a.png#fragment',
  ]) await assert.rejects(h.client.downloadImage(url, { allowedHosts: [HOST] }));
  await assert.rejects(h.client.downloadImage(URL, { allowedHosts: ['*.partner.example'] }), { code: 'INVALID_CONFIG' });
  assert.equal(h.calls.length, 0);
});

test('rejects mixed public/private DNS answers and makes no request', async () => {
  const h = harness(() => ({}), { addresses: [{ address: '8.8.8.8', family: 4 }, { address: '169.254.169.254', family: 4 }] });
  await assert.rejects(h.client.downloadImage(URL, { allowedHosts: [HOST] }), { code: 'UNSAFE_ADDRESS' });
  assert.equal(h.calls.length, 0);
});

test('pins resolved address while keeping original TLS and Host hostname', async () => {
  const h = harness(() => ({}), { addresses: (_hostname, count) => [{ address: count === 1 ? '8.8.8.8' : '127.0.0.1', family: 4 }] });
  const image = await h.client.downloadImage(URL, { allowedHosts: [HOST] });
  assert.equal(image.sha256, SHA);
  assert.equal(h.resolutions.length, 1);
  assert.deepEqual(h.calls[0].pinned, { address: '8.8.8.8', family: 4 });
  assert.equal(h.calls[0].hostname, HOST);
  assert.equal(h.calls[0].servername, HOST);
  assert.equal(h.calls[0].agent, false);
  assert.equal(h.calls[0].headers.apikey, undefined);
});

test('never follows image redirects', async () => {
  const h = harness(() => ({ status: 302, headers: { location: 'https://169.254.169.254/latest/meta-data' } }));
  await assert.rejects(h.client.downloadImage(URL, { allowedHosts: [HOST] }), { code: 'REDIRECT_REJECTED' });
  assert.equal(h.calls.length, 1);
});

test('identifies supported original bytes and rejects SVG or MIME mismatch', async () => {
  for (const [bytes, contentType, extension] of [[PNG, 'image/png', 'png'], [JPEG, 'image/jpeg', 'jpg'], [WEBP, 'image/webp', 'webp']]) {
    const h = harness(() => ({ bytes, headers: { 'content-type': contentType } }));
    const result = await h.client.downloadImage(URL, { allowedHosts: [HOST] });
    assert.equal(result.extension, extension);
    assert.deepEqual(result.bytes, bytes);
  }
  const mismatch = harness(() => ({ bytes: PNG, headers: { 'content-type': 'image/jpeg' } }));
  await assert.rejects(mismatch.client.downloadImage(URL, { allowedHosts: [HOST] }), { code: 'MIME_MISMATCH' });
  const svg = harness(() => ({ bytes: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>'), headers: { 'content-type': 'image/svg+xml' } }));
  await assert.rejects(svg.client.downloadImage(URL, { allowedHosts: [HOST] }), { code: 'UNSUPPORTED_IMAGE' });
});

test('streamed byte limit applies without Content-Length or despite a misleading length', async () => {
  for (const headers of [{}, { 'content-length': '1' }]) {
    const h = harness(() => ({ chunks: [Buffer.alloc(16), Buffer.alloc(16)], headers }));
    await assert.rejects(h.client.downloadImage(URL, { allowedHosts: [HOST], maxBytes: 20 }), { code: 'BYTE_LIMIT' });
  }
  const oversized = harness(() => ({ headers: { 'content-length': '9999999999' } }));
  await assert.rejects(oversized.client.downloadImage(URL, { allowedHosts: [HOST] }), { code: 'BYTE_LIMIT' });
});

test('retries transient responses with capped delay and does not retry permanent failures', async () => {
  const transient = harness((_call, count) => count < 3 ? { status: count === 1 ? 429 : 503, headers: { 'retry-after': '999' }, bytes: Buffer.alloc(0) } : {});
  await transient.client.downloadImage(URL, { allowedHosts: [HOST] });
  assert.equal(transient.calls.length, 3);
  assert.deepEqual(transient.sleeps, [5000, 5000]);
  const permanent = harness(() => ({ status: 403, bytes: Buffer.alloc(0) }));
  await assert.rejects(permanent.client.downloadImage(URL, { allowedHosts: [HOST] }), { code: 'IMAGE_HTTP_ERROR' });
  assert.equal(permanent.calls.length, 1);
  const network = harness((_call, count) => count === 1 ? { error: Object.assign(new Error(KEY), { code: 'ECONNRESET' }) } : {});
  await network.client.downloadImage(URL, { allowedHosts: [HOST] });
  assert.equal(network.calls.length, 2);
});

test('fails closed on public bucket or untrusted Supabase configuration before image download', async () => {
  const h = harness(() => json({ id: 'ha-import-staging', public: true }));
  await assert.rejects(h.client.stageImages([URL], baseOptions), { code: 'STAGING_BUCKET_UNAVAILABLE' });
  assert.equal(h.calls.length, 1);
  for (const supabaseUrl of ['https://attacker.example/', 'https://abcdefghijklmnopqrst.supabase.co.attacker.example/', 'https://abcdefghijklmnopqrst.supabase.co/path']) {
    await assert.rejects(h.client.stageImages([URL], { ...baseOptions, supabaseUrl }), { code: 'INVALID_CONFIG' });
  }
  await assert.rejects(h.client.stageImages([URL], { ...baseOptions, serverKey: 'sb_publishable_invalid' }), { code: 'INVALID_CONFIG' });
  assert.equal(h.calls.length, 1);
});

test('stages one immutable object for duplicate bytes with ordered references and bounded concurrency', async () => {
  const h = harness((call) => {
    if (call.path.startsWith('/storage/v1/bucket/')) return bucket();
    if (call.hostname === HOST) return { delayMs: call.path.includes('slow') ? 15 : 1 };
    if (call.method === 'POST') return json({ Key: `ha-import-staging/scraye/${SHA}.png` });
    return {};
  });
  let checkpointsActive = 0;
  let maxCheckpoints = 0;
  const checkpoints = [];
  const result = await h.client.stageImages([
    `https://${HOST}/slow.png`, `https://${HOST}/fast.png`, { url: `https://${HOST}/third.png` },
  ], { ...baseOptions, checkpoint: async (asset) => {
    checkpointsActive += 1;
    maxCheckpoints = Math.max(maxCheckpoints, checkpointsActive);
    await new Promise((resolve) => setTimeout(resolve, 1));
    checkpoints.push(asset);
    checkpointsActive -= 1;
  } });
  assert.equal(result.failures.length, 0);
  assert.deepEqual(result.assets.map((asset) => asset.index), [0, 1, 2]);
  assert.equal(result.assets.filter((asset) => asset.status === 'uploaded').length, 1);
  assert.equal(new Set(result.assets.map((asset) => asset.path)).size, 1);
  const uploads = h.calls.filter((call) => call.method === 'POST');
  assert.equal(uploads.length, 1);
  assert.equal(uploads[0].path, `/storage/v1/object/ha-import-staging/scraye/${SHA}.png`);
  assert.equal(uploads[0].headers['x-upsert'], 'false');
  assert.deepEqual(uploads[0].body, PNG);
  assert.ok(h.maxActive() <= 2);
  assert.equal(checkpoints.length, 3);
  assert.equal(maxCheckpoints, 1);
});

test('rerun verifies existing conflict bytes and refuses mismatched objects', async () => {
  for (const [storedBytes, expectedSuccess] of [[PNG, true], [JPEG, false]]) {
    const h = harness((call) => {
      if (call.path.startsWith('/storage/v1/bucket/')) return bucket();
      if (call.hostname === HOST) return {};
      if (call.method === 'POST') return json({ error: 'Duplicate', message: 'The resource already exists' }, 400);
      return { bytes: storedBytes, headers: { 'content-type': storedBytes === PNG ? 'image/png' : 'image/jpeg' } };
    });
    const result = await h.client.stageImages([URL], baseOptions);
    assert.equal(result.assets.length, expectedSuccess ? 1 : 0);
    if (expectedSuccess) assert.equal(result.assets[0].status, 'reused');
    else assert.equal(result.failures[0].code, 'STORAGE_HASH_MISMATCH');
    assert.equal(h.calls.filter((call) => call.path.includes('/object/authenticated/')).length, 1);
    assert.equal(h.calls.filter((call) => call.method === 'PUT').length, 0);
  }
});

test('a lost upload response retries without overwriting and verifies conflict', async () => {
  let attempts = 0;
  const h = harness((call) => {
    if (call.path.startsWith('/storage/v1/bucket/')) return bucket();
    if (call.hostname === HOST) return {};
    if (call.method === 'POST') {
      attempts += 1;
      return attempts === 1 ? { error: Object.assign(new Error(KEY), { code: 'ECONNRESET' }) } : json({ error: 'ResourceAlreadyExists' }, 409);
    }
    return {};
  });
  const result = await h.client.stageImages([URL], baseOptions);
  assert.equal(result.failures.length, 0);
  assert.equal(result.assets[0].status, 'reused');
  assert.equal(attempts, 2);
  assert.ok(h.calls.filter((call) => call.method === 'POST').every((call) => call.headers['x-upsert'] === 'false'));
});

test('Storage redirects are rejected without leaking the server key or contacting redirect hosts', async () => {
  const h = harness((call) => {
    if (call.path.startsWith('/storage/v1/bucket/')) return bucket();
    if (call.hostname === HOST) return {};
    return { status: 302, headers: { location: `https://attacker.example/?secret=${KEY}` } };
  });
  const result = await h.client.stageImages([URL], baseOptions);
  assert.equal(result.failures[0].code, 'REDIRECT_REJECTED');
  assert.ok(!JSON.stringify(result).includes(KEY));
  assert.ok(h.calls.every((call) => call.hostname === HOST || call.hostname === SUPABASE_HOST));
  assert.ok(h.calls.filter((call) => call.hostname === HOST).every((call) => !call.headers.apikey && !call.headers.authorization));
});

test('an ordinary Storage 400 is a failure, not a presumed existing object', async () => {
  const h = harness((call) => {
    if (call.path.startsWith('/storage/v1/bucket/')) return bucket();
    if (call.hostname === HOST) return {};
    return json({ error: 'InvalidRequest', message: KEY }, 400);
  });
  const result = await h.client.stageImages([URL], baseOptions);
  assert.equal(result.failures[0].code, 'STORAGE_UPLOAD_FAILED');
  assert.equal(h.calls.filter((call) => call.path.includes('/authenticated/')).length, 0);
  assert.ok(!JSON.stringify(result).includes(KEY));
});

test('failed checkpoint remains an explicit failure after staging', async () => {
  const h = harness((call) => {
    if (call.path.startsWith('/storage/v1/bucket/')) return bucket();
    if (call.hostname === HOST) return {};
    if (call.method === 'POST') return json({ Key: 'stored' });
    return {};
  });
  const result = await h.client.stageImages([URL], { ...baseOptions, checkpoint: async () => { throw new Error(KEY); } });
  assert.equal(result.assets.length, 0);
  assert.equal(result.failures[0].code, 'CHECKPOINT_FAILED');
  assert.ok(!JSON.stringify(result).includes(KEY));
});

test('pre-aborted calls fail before DNS, bucket lookup or image work', async () => {
  const controller = new AbortController();
  controller.abort(new Error(KEY));
  const h = harness(() => ({}));
  await assert.rejects(h.client.downloadImage(URL, { allowedHosts: [HOST], signal: controller.signal }), { code: 'ABORTED', message: 'Image staging was cancelled.' });
  await assert.rejects(h.client.stageImages([URL], { ...baseOptions, signal: controller.signal }), { code: 'ABORTED' });
  assert.equal(h.resolutions.length, 0);
  assert.equal(h.calls.length, 0);
});

test('cancels DNS wait and discards a late public answer without opening a socket', { timeout: 1000 }, async () => {
  const controller = new AbortController();
  let finishLookup;
  let requests = 0;
  const client = createMediaClient({
    resolve: () => new Promise((resolve) => {
      finishLookup = resolve;
      queueMicrotask(() => controller.abort(new Error(KEY)));
    }),
    request: () => { requests += 1; throw new Error('Unexpected socket'); },
  });
  await assert.rejects(client.downloadImage(URL, { allowedHosts: [HOST], signal: controller.signal }), { code: 'ABORTED' });
  finishLookup([{ address: '8.8.8.8', family: 4 }]);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(requests, 0);
});

test('lease-loss cancellation destroys an in-flight upload and stops all queued images', { timeout: 1000 }, async () => {
  const controller = new AbortController();
  let checkpoints = 0;
  const h = harness((call) => {
    if (call.path.startsWith('/storage/v1/bucket/')) return bucket();
    if (call.hostname === HOST) return {};
    if (call.method === 'POST') {
      queueMicrotask(() => controller.abort(new Error(KEY)));
      return { delayMs: 20, ...json({ Key: 'possibly-written-before-abort' }) };
    }
    throw new Error('Verification must not start after abort');
  });
  await assert.rejects(h.client.stageImages([URL, `https://${HOST}/queued.png`, `https://${HOST}/also-queued.png`], {
    ...baseOptions, concurrency: 1, signal: controller.signal, checkpoint: () => { checkpoints += 1; },
  }), { code: 'ABORTED' });
  assert.equal(h.calls.filter((call) => call.hostname === HOST).length, 1);
  const uploads = h.calls.filter((call) => call.method === 'POST');
  assert.equal(uploads.length, 1);
  assert.equal(uploads[0].destroyed, true);
  assert.equal(h.calls.filter((call) => call.path.includes('/authenticated/')).length, 0);
  assert.equal(checkpoints, 0);
});

test('cancellation interrupts retry backoff without starting another request', { timeout: 1000 }, async () => {
  const controller = new AbortController();
  const h = harness(() => ({ status: 503, bytes: Buffer.alloc(0) }));
  const client = createMediaClient({
    resolve: async () => [{ address: '8.8.8.8', family: 4 }],
    request: (options, callback) => {
      // Use a small standalone transport so the pending backoff is controlled here.
      h.calls.push(options);
      const req = new EventEmitter();
      req.destroy = () => {};
      req.end = () => queueMicrotask(() => {
        const response = new PassThrough();
        response.statusCode = 503;
        response.headers = {};
        response.complete = true;
        callback(response);
        response.end();
      });
      return req;
    },
    sleep: () => new Promise(() => { queueMicrotask(() => controller.abort(new Error(KEY))); }),
  });
  await assert.rejects(client.downloadImage(URL, { allowedHosts: [HOST], signal: controller.signal }), { code: 'ABORTED' });
  assert.equal(h.calls.length, 1);
});

test('checkpoint receives cancellation signal and no later checkpoint or image starts', { timeout: 1000 }, async () => {
  const controller = new AbortController();
  let checkpoints = 0;
  const h = harness((call) => {
    if (call.path.startsWith('/storage/v1/bucket/')) return bucket();
    if (call.hostname === HOST) return {};
    if (call.method === 'POST') return json({ Key: 'stored' });
    return {};
  });
  await assert.rejects(h.client.stageImages([URL, `https://${HOST}/queued.png`], {
    ...baseOptions, concurrency: 1, signal: controller.signal,
    checkpoint: (_asset, { signal }) => {
      checkpoints += 1;
      assert.equal(signal, controller.signal);
      return new Promise(() => { queueMicrotask(() => controller.abort(new Error(KEY))); });
    },
  }), { code: 'ABORTED' });
  assert.equal(checkpoints, 1);
  assert.equal(h.calls.filter((call) => call.hostname === HOST).length, 1);
});
