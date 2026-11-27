import { createHash } from 'node:crypto';
import { isIP } from 'node:net';

const PARTNERS = new Set(['scraye', 'campus-living-villages', 'housing-anywhere']);
const PERIODS = new Set(['week', 'month', 'night', 'term']);
const CURRENCY_CODES = new Set(Intl.supportedValuesOf('currency'));
const COUNTRY_CODES = new Set(('AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW').split(' '));
const BASELINE_COUNTRIES = new Map([
  ['united kingdom', 'GB'], ['uk', 'GB'], ['great britain', 'GB'],
  ['united states', 'US'], ['united states of america', 'US'], ['usa', 'US'],
  ['australia', 'AU'], ['germany', 'DE'], ['spain', 'ES'], ['france', 'FR'],
  ['netherlands', 'NL'], ['italy', 'IT'], ['ireland', 'IE'], ['canada', 'CA'],
]);
const TRACKERS = new Set(['fbclid', 'gclid', 'dclid', 'msclkid']);

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function canonicalValue(value, seen = new Set()) {
  if (value === null || typeof value !== 'object') {
    if (typeof value === 'number' && !Number.isFinite(value)) return { invalid_number: String(value) };
    if (typeof value === 'bigint') return { invalid_bigint: String(value) };
    return value;
  }
  if (seen.has(value)) throw new TypeError('Cannot hash circular data');
  seen.add(value);
  const result = Array.isArray(value)
    ? value.map(item => canonicalValue(item, seen))
    : Object.fromEntries(Object.keys(value).sort().filter(key => value[key] !== undefined)
      .map(key => [key, canonicalValue(value[key], seen)]));
  seen.delete(value);
  return result;
}

/** Deterministic SHA-256 over JSON content. Array order is intentionally preserved. */
export function canonicalHash(value) {
  const json = JSON.stringify(canonicalValue(value));
  if (json === undefined) throw new TypeError('Hash input must be JSON data');
  return createHash('sha256').update(json).digest('hex');
}

function withoutObservationTimes(value) {
  if (Array.isArray(value)) return value.map(withoutObservationTimes);
  if (!isObject(value)) return value;
  return Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'observed_at')
    .map(([key, child]) => [key, withoutObservationTimes(child)]));
}

export function catalogueSourceKey(partner, externalId) {
  if (!PARTNERS.has(partner) || typeof externalId !== 'string' || !externalId.trim()) {
    throw new TypeError('A supported partner and nonempty external ID are required');
  }
  return `${partner}:${externalId.trim()}`;
}

/** Only explicit analytics parameters are discarded; identity parameters/fragments survive. */
export function canonicalSourceUrl(value) {
  const parsed = new URL(value);
  for (const name of [...parsed.searchParams.keys()]) {
    if (name.toLowerCase().startsWith('utm_') || TRACKERS.has(name.toLowerCase())) {
      parsed.searchParams.delete(name);
    }
  }
  parsed.searchParams.sort();
  return parsed.toString();
}

function validateUrl(value, hosts, path, errors, { tracking = false } = {}) {
  if (typeof value !== 'string' || !value.trim()) {
    errors.push(`${path}: a nonempty HTTPS URL is required`);
    return '';
  }
  try {
    const url = new URL(value.trim());
    const host = url.hostname.toLowerCase();
    if (url.protocol !== 'https:') errors.push(`${path}: only HTTPS URLs are allowed`);
    if (url.username || url.password) errors.push(`${path}: embedded credentials are not allowed`);
    if (url.port && url.port !== '443') errors.push(`${path}: nonstandard ports are not allowed`);
    if (isIP(host.replace(/^\[|\]$/g, '')) || host === 'localhost'
      || /\.(localhost|local|internal)$/.test(host) || !host.includes('.')) {
      errors.push(`${path}: only approved public domain names are allowed`);
    }
    if (!hosts.has(host)) errors.push(`${path}: host ${host} is not in the exact host allowlist`);
    return tracking ? canonicalSourceUrl(url.toString()) : url.toString();
  } catch {
    errors.push(`${path}: invalid URL`);
    return '';
  }
}

function stringField(value, path, errors, { optional = false, max = 2000 } = {}) {
  if (optional && (value === null || value === undefined)) return null;
  if (typeof value !== 'string' || !value.trim()) {
    errors.push(`${path}: a nonempty string is required`);
    return '';
  }
  const normalized = value.trim().normalize('NFC');
  if (normalized.length > max) errors.push(`${path}: exceeds ${max} characters`);
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(normalized)) {
    errors.push(`${path}: unsupported control characters`);
  }
  return normalized;
}

function dateOnly(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function timestamp(value, path, errors, now, skew) {
  if (typeof value !== 'string'
    || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/.test(value)
    || !dateOnly(value.slice(0, 10)) || !Number.isFinite(Date.parse(value))) {
    errors.push(`${path}: an ISO timestamp with a timezone is required`);
    return typeof value === 'string' ? value : '';
  }
  if (Date.parse(value) > now + skew) errors.push(`${path}: observation is in the future`);
  return new Date(value).toISOString();
}

function unknownFields(value, allowed, path, errors) {
  if (!isObject(value)) return;
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) errors.push(`${path}.${key}: unsupported field; preserve it in the adapter source snapshot and map it explicitly`);
  }
}

function images(value, path, context) {
  const { errors, warnings, imageHosts } = context;
  if (!Array.isArray(value)) {
    errors.push(`${path}: an array is required`);
    return [];
  }
  const seen = new Set();
  return value.map((image, index) => {
    const here = `${path}[${index}]`;
    if (!isObject(image)) {
      errors.push(`${here}: an image object is required`);
      return { url: '', alt: null };
    }
    unknownFields(image, ['url', 'alt'], here, errors);
    const url = validateUrl(image.url, imageHosts, `${here}.url`, errors);
    if (url && seen.has(url)) warnings.push(`${here}.url: repeated image URL retained; the media worker must report reused bytes`);
    seen.add(url);
    return { url, alt: stringField(image.alt, `${here}.alt`, errors, { optional: true, max: 1000 }) };
  });
}

function duplicates(records, key) {
  const groups = new Map();
  records.forEach((record, index) => {
    const value = key(record);
    if (value) {
      if (!groups.has(value)) groups.set(value, []);
      groups.get(value).push(index);
    }
  });
  return [...groups.entries()].filter(([, indexes]) => indexes.length > 1);
}

function indexRecords(records, key) {
  const index = new Map();
  for (const record of records) {
    const value = key(record);
    if (!value) continue;
    if (!index.has(value)) index.set(value, []);
    index.get(value).push(record);
  }
  return index;
}

function normalizeOffer(value, path, context) {
  const { errors, warnings, now, skew } = context;
  if (!isObject(value)) {
    errors.push(`${path}: an offer object is required`);
    value = {};
  }
  unknownFields(value, ['external_id', 'price_minor', 'currency', 'period', 'observed_at', 'start_date', 'end_date', 'status'], path, errors);
  const externalId = stringField(value.external_id, `${path}.external_id`, errors, { max: 200 });
  const price = value.price_minor;
  if (price !== null && (!Number.isSafeInteger(price) || price < 0)) {
    errors.push(`${path}.price_minor: use a nonnegative integer in source minor units, or explicit null`);
  }
  if (price === null) warnings.push(`${path}.price_minor: unknown source price retained as null`);
  if (price === 0) warnings.push(`${path}.price_minor: zero source price requires review before publication`);
  const currency = stringField(value.currency, `${path}.currency`, errors, { max: 3 }).toUpperCase();
  if (!/^[A-Z]{3}$/.test(currency) || !CURRENCY_CODES.has(currency)) errors.push(`${path}.currency: expected a supported ISO currency code`);
  const period = typeof value.period === 'string' ? value.period.trim().toLowerCase() : '';
  if (!PERIODS.has(period)) errors.push(`${path}.period: expected week, month, night or term`);
  const observedAt = timestamp(value.observed_at, `${path}.observed_at`, errors, now, skew);
  for (const key of ['start_date', 'end_date']) {
    if (value[key] != null && !dateOnly(value[key])) errors.push(`${path}.${key}: expected a real calendar date as YYYY-MM-DD`);
  }
  if (dateOnly(value.start_date) && dateOnly(value.end_date) && value.end_date <= value.start_date) {
    errors.push(`${path}.end_date: must be after start_date`);
  }
  return {
    external_id: externalId,
    price_minor: price === null || Number.isSafeInteger(price) ? price : null,
    currency, period, observed_at: observedAt,
    start_date: value.start_date ?? null, end_date: value.end_date ?? null,
    status: stringField(value.status, `${path}.status`, errors, { optional: true, max: 100 }),
  };
}

function normalizeRoom(value, path, context) {
  const { errors, warnings, conflicts } = context;
  if (!isObject(value)) {
    errors.push(`${path}: a room object is required`);
    value = {};
  }
  unknownFields(value, ['external_id', 'name', 'description', 'images', 'offers'], path, errors);
  if (!Array.isArray(value.offers)) errors.push(`${path}.offers: an array is required`);
  const offers = (Array.isArray(value.offers) ? value.offers : []).map((offer, index) => normalizeOffer(offer, `${path}.offers[${index}]`, context));
  if (!offers.length) warnings.push(`${path}.offers: no source offer supplied; price and availability remain unknown`);
  for (const [key] of duplicates(offers, offer => offer.external_id)) conflicts.push(`${path}.offers: duplicate external_id ${key}; no offer was discarded`);
  return {
    external_id: stringField(value.external_id, `${path}.external_id`, errors, { max: 200 }),
    name: stringField(value.name, `${path}.name`, errors, { max: 500 }),
    description: stringField(value.description, `${path}.description`, errors, { optional: true, max: 50000 }),
    images: images(value.images, `${path}.images`, context), offers,
  };
}

function normalizeProperty(value, path, context) {
  const { errors, conflicts, listingHosts } = context;
  if (!isObject(value)) {
    errors.push(`${path}: a property object is required`);
    value = {};
  }
  unknownFields(value, ['external_id', 'source_url', 'name', 'address', 'postcode', 'city', 'country', 'description', 'images', 'rooms'], path, errors);
  if (!Array.isArray(value.rooms) || value.rooms.length === 0) errors.push(`${path}.rooms: at least one explicit room or rentable unit is required`);
  const rooms = (Array.isArray(value.rooms) ? value.rooms : []).map((room, index) => normalizeRoom(room, `${path}.rooms[${index}]`, context));
  for (const [key] of duplicates(rooms, room => room.external_id)) conflicts.push(`${path}.rooms: duplicate external_id ${key}; no room was discarded`);
  const propertyImages = images(value.images, `${path}.images`, context);
  if (!propertyImages.length && !rooms.some(room => room.images.length)) errors.push(`${path}.images: at least one property or room image is required`);
  const country = stringField(value.country, `${path}.country`, errors, { max: 2 }).toUpperCase();
  if (!COUNTRY_CODES.has(country)) errors.push(`${path}.country: use an ISO 3166-1 alpha-2 country code, such as GB`);
  return {
    external_id: stringField(value.external_id, `${path}.external_id`, errors, { max: 200 }),
    source_url: validateUrl(value.source_url, listingHosts, `${path}.source_url`, errors, { tracking: true }),
    name: stringField(value.name, `${path}.name`, errors, { max: 500 }),
    address: stringField(value.address, `${path}.address`, errors),
    postcode: stringField(value.postcode, `${path}.postcode`, errors, { max: 40 }).toUpperCase(),
    city: stringField(value.city, `${path}.city`, errors, { max: 200 }), country,
    description: stringField(value.description, `${path}.description`, errors, { optional: true, max: 50000 }),
    images: propertyImages, rooms,
  };
}

function addressText(value) {
  return typeof value === 'string' ? value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/\s+/g, ' ') : '';
}

function addressKey(property) {
  const countryInput = typeof property.country === 'string' ? property.country.trim() : '';
  const country = BASELINE_COUNTRIES.get(countryInput.toLowerCase()) ?? countryInput.toUpperCase();
  const address = addressText(property.address);
  const postcode = addressText(property.postcode).replace(/ /g, '');
  const city = addressText(property.city);
  return address && postcode && city && country ? `${country}|${city}|${postcode}|${address}` : '';
}

function safeCanonicalUrl(value) {
  try { return typeof value === 'string' ? canonicalSourceUrl(value) : ''; } catch { return ''; }
}

function hostSet(value, path, errors) {
  if (!Array.isArray(value) || !value.length || value.some(host => typeof host !== 'string' || !host || host !== host.trim() || host.includes('/') || host.includes('*') || host.includes(':'))) {
    errors.push(`${path}: supply an explicit nonempty array of exact domain names`);
    return new Set();
  }
  return new Set(value.map(host => host.toLowerCase()));
}

/** Offline audit only: does not fetch images, call Supabase, mutate the input or infer rents. */
export function auditManifest(manifest, { config = {}, baseline = { properties: [] }, now = new Date() } = {}) {
  const errors = [];
  const warnings = [];
  let manifestHash = null;
  try { manifestHash = canonicalHash(manifest); } catch { errors.push('manifest: must be finite JSON data without circular references'); }
  const source = isObject(manifest) ? manifest : {};
  if (!isObject(manifest)) errors.push('manifest: an object is required');
  unknownFields(source, ['schema_version', 'synthetic', 'partner', 'complete', 'expected_count', 'observed_at', 'properties'], 'manifest', errors);
  if (source.synthetic !== undefined && typeof source.synthetic !== 'boolean') errors.push('manifest.synthetic: expected a boolean offline-fixture marker');
  if (source.synthetic === true) warnings.push('Synthetic fixture: offline audit only; network staging and publication are forbidden');
  if (source.schema_version !== 1) errors.push('manifest.schema_version: expected 1');
  if (!PARTNERS.has(source.partner)) errors.push('manifest.partner: unsupported partner');
  if (!PARTNERS.has(config.slug) || source.partner !== config.slug) errors.push('manifest.partner: must exactly match config.slug');
  if (source.complete !== true) errors.push('manifest.complete: partial snapshots cannot be staged as a complete portfolio');
  if (!Array.isArray(source.properties)) errors.push('manifest.properties: an array is required');
  const properties = Array.isArray(source.properties) ? source.properties : [];
  if (!Number.isSafeInteger(source.expected_count) || source.expected_count < 0 || source.expected_count !== properties.length) {
    errors.push('manifest.expected_count: must exactly equal the number of supplied properties');
  }
  if (!properties.length) errors.push('manifest.properties: empty portfolios require separate withdrawal review and cannot be imported');
  const nowMs = new Date(now).getTime();
  if (!Number.isFinite(nowMs)) throw new TypeError('now must be a valid date');
  const skewSeconds = Number.isFinite(config.max_future_skew_seconds) && config.max_future_skew_seconds >= 0 ? config.max_future_skew_seconds : 300;
  const observedAt = timestamp(source.observed_at, 'manifest.observed_at', errors, nowMs, skewSeconds * 1000);
  const listingHosts = hostSet(config.listing_hosts, 'config.listing_hosts', errors);
  const imageHosts = hostSet(config.image_hosts, 'config.image_hosts', errors);
  if (!isObject(baseline) || !Array.isArray(baseline.properties)) errors.push('baseline.properties: an array is required');
  const existing = isObject(baseline) && Array.isArray(baseline.properties) ? baseline.properties.filter(isObject) : [];
  if (existing.length !== baseline?.properties?.length) errors.push('baseline.properties: every entry must be an object');
  const partnerExisting = existing.filter(record => record.provider === source.partner);
  const sourceIndex = indexRecords(partnerExisting, record => record.source_key);
  const urlIndex = indexRecords(partnerExisting, record => safeCanonicalUrl(record.source_url));
  const addressIndex = indexRecords(existing, addressKey);
  const permission = isObject(config.permission) ? config.permission : {};
  for (const field of ['can_import', 'can_republish', 'can_copy_images']) {
    if (permission[field] !== true) warnings.push(`permission.${field}: not confirmed; audit is allowed but network staging/publication is blocked`);
  }
  if (typeof permission.reference !== 'string' || !permission.reference.trim()) warnings.push('permission.reference: an agreement or consent evidence reference is required before staging');

  const items = properties.map((property, index) => {
    const itemErrors = [...errors];
    const itemWarnings = [...warnings];
    const conflicts = [];
    const normalized = normalizeProperty(property, `properties[${index}]`, {
      errors: itemErrors, warnings: itemWarnings, conflicts, listingHosts, imageHosts, now: nowMs, skew: skewSeconds * 1000,
    });
    const payloadHash = canonicalHash(withoutObservationTimes(normalized));
    const partner = source.partner;
    const exact = [...new Set([
      ...(sourceIndex.get(normalized.external_id) ?? []),
      ...(sourceIndex.get(`${partner}:${normalized.external_id}`) ?? []),
      ...(urlIndex.get(normalized.source_url) ?? []),
    ])];
    const matchedIds = new Set(exact.map(record => record.id));
    if (matchedIds.size > 1 || exact.length > 1 || exact.some(record => !record.id || !record.slug)) {
      conflicts.push('baseline: source identity points to multiple or incomplete canonical records');
    }
    const match = exact.length === 1 && exact[0].id && exact[0].slug ? exact[0] : null;
    const key = addressKey(normalized);
    const addressCandidates = (addressIndex.get(key) ?? []).filter(record => record.id !== match?.id);
    if (addressCandidates.length) conflicts.push(`address: possible existing listing(s) ${addressCandidates.map(record => record.slug ?? record.id ?? 'unknown').join(', ')}; review without automatically merging buildings or units`);
    return {
      external_id: normalized.external_id, status: 'ready',
      action: match ? match.payload_hash === payloadHash ? 'unchanged' : 'update' : 'create',
      errors: itemErrors, warnings: itemWarnings, payload_hash: payloadHash, address_key: key,
      ...(match ? { canonical_property_id: match.id, canonical_slug: match.slug } : {}),
      normalized, _conflicts: conflicts,
    };
  });
  for (const [field, accessor] of [
    ['external_id', item => item.external_id],
    ['source_url', item => item.normalized.source_url],
    ['address', item => item.address_key],
  ]) {
    for (const [key, indexes] of duplicates(items, accessor)) {
      for (const index of indexes) items[index]._conflicts.push(`${field}: duplicate candidate ${key} within this manifest; every conflicting record is held`);
    }
  }
  const counts = { create: 0, update: 0, unchanged: 0, conflict: 0, error: 0 };
  for (const item of items) {
    if (item.errors.length) {
      item.status = 'error'; item.action = 'hold'; counts.error++;
    } else if (item._conflicts.length) {
      item.status = 'conflict'; item.action = 'hold'; counts.conflict++;
    } else {
      counts[item.action]++;
    }
    item.errors.push(...item._conflicts);
    delete item._conflicts;
  }
  return {
    schema_version: 1, partner: source.partner ?? null, manifest_hash: manifestHash,
    observed_at: observedAt, errors, warnings, counts, items,
  };
}
