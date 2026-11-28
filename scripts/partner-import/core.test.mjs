import test from 'node:test';
import assert from 'node:assert/strict';
import { auditManifest, canonicalHash, canonicalSourceUrl, catalogueSourceKey } from './core.mjs';

const NOW = '2026-11-27T12:00:00.000Z';
const config = {
  slug: 'scraye', listing_hosts: ['www.scraye.com'], image_hosts: ['assets.scraye.com'],
  permission: { reference: 'synthetic-test-only', can_import: true, can_republish: true, can_copy_images: true },
};

function fixture() {
  return {
    schema_version: 1, partner: 'scraye', complete: true, expected_count: 1, observed_at: NOW,
    properties: [{
      external_id: 'p-001', source_url: 'https://www.scraye.com/listings/p-001',
      name: 'Synthetic test property', address: 'Flat 1, 10 Example Street', postcode: 'AB1 2CD',
      city: 'London', country: 'GB', description: 'Synthetic test data; not a real listing.',
      images: [{ url: 'https://assets.scraye.com/test-property.webp', alt: 'Synthetic fixture' }],
      rooms: [{
        external_id: 'r-001', name: 'Synthetic room', images: [],
        offers: [{ external_id: 'o-001', price_minor: 125000, currency: 'GBP', period: 'month', observed_at: NOW,
          start_date: '2027-01-01', end_date: '2027-07-01', status: 'available' }],
      }],
    }],
  };
}

function audit(manifest = fixture(), options = {}) {
  return auditManifest(manifest, { config, baseline: { properties: [] }, now: NOW, ...options });
}

function baselineRecord(item, overrides = {}) {
  return {
    id: 'canonical-001', slug: 'existing-property-slug', provider: 'scraye',
    source_key: catalogueSourceKey('scraye', item.external_id), source_url: item.normalized.source_url,
    name: item.normalized.name, address: item.normalized.address, postcode: item.normalized.postcode,
    city: item.normalized.city, country: item.normalized.country, payload_hash: item.payload_hash,
    ...overrides,
  };
}

test('valid manifest is audited offline without mutating input or converting monthly rent', () => {
  const manifest = fixture();
  const original = structuredClone(manifest);
  const result = audit(manifest);
  assert.deepEqual(result.counts, { create: 1, update: 0, unchanged: 0, conflict: 0, error: 0 });
  assert.equal(result.items[0].normalized.rooms[0].offers[0].period, 'month');
  assert.equal(result.items[0].normalized.rooms[0].offers[0].price_minor, 125000);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(manifest, original);
});

test('canonical hashing ignores object key order but preserves gallery order', () => {
  assert.equal(canonicalHash({ b: 2, a: 1 }), canonicalHash({ a: 1, b: 2 }));
  assert.notEqual(canonicalHash(['first', 'second']), canonicalHash(['second', 'first']));
});

test('same source rerun remains unchanged despite observation time and tracking parameters', () => {
  const first = audit().items[0];
  const manifest = fixture();
  manifest.observed_at = '2026-11-27T11:55:00Z';
  manifest.properties[0].rooms[0].offers[0].observed_at = '2026-11-27T11:55:00Z';
  manifest.properties[0].source_url += '?utm_source=test&gclid=discard';
  const result = audit(manifest, { baseline: { properties: [baselineRecord(first)] } });
  assert.equal(result.items[0].payload_hash, first.payload_hash);
  assert.equal(result.items[0].action, 'unchanged');
  assert.equal(result.items[0].canonical_property_id, 'canonical-001');
  assert.equal(result.items[0].canonical_slug, 'existing-property-slug');
  assert.notEqual(result.manifest_hash, audit().manifest_hash);
});

test('changed source price is an update to the same canonical ID and slug', () => {
  const first = audit().items[0];
  const manifest = fixture();
  manifest.properties[0].rooms[0].offers[0].price_minor = 130000;
  const result = audit(manifest, { baseline: { properties: [baselineRecord(first)] } });
  assert.equal(result.items[0].action, 'update');
  assert.equal(result.items[0].canonical_property_id, 'canonical-001');
  assert.equal(result.items[0].canonical_slug, 'existing-property-slug');
});

test('plain historical source key and canonical URL both match only the same provider', () => {
  const first = audit().items[0];
  const byKey = audit(fixture(), { baseline: { properties: [baselineRecord(first, { source_key: 'p-001', source_url: null })] } });
  assert.equal(byKey.items[0].action, 'unchanged');
  const byUrl = audit(fixture(), { baseline: { properties: [baselineRecord(first, { source_key: 'old-key' })] } });
  assert.equal(byUrl.items[0].action, 'unchanged');
  const anotherProvider = audit(fixture(), { baseline: { properties: [baselineRecord(first, {
    provider: 'campus-living-villages', address: 'A different street',
  })] } });
  assert.equal(anotherProvider.items[0].action, 'create');
});

test('source ID and URL pointing at different existing records is a conflict', () => {
  const first = audit().items[0];
  const result = audit(fixture(), { baseline: { properties: [
    baselineRecord(first, { source_url: 'https://www.scraye.com/listings/old' }),
    baselineRecord(first, { id: 'canonical-002', slug: 'other', source_key: 'p-002' }),
  ] } });
  assert.equal(result.items[0].status, 'conflict');
  assert.equal(result.items[0].action, 'hold');
  assert.equal(result.items[0].canonical_property_id, undefined);
});

test('duplicate property IDs hold every conflicting item without dropping either', () => {
  const manifest = fixture();
  manifest.properties.push(structuredClone(manifest.properties[0]));
  manifest.expected_count = 2;
  const result = audit(manifest);
  assert.equal(result.items.length, 2);
  assert.equal(result.counts.conflict, 2);
  assert.ok(result.items.every(item => item.status === 'conflict' && item.action === 'hold'));
  assert.ok(result.items.every(item => item.errors.some(error => error.includes('duplicate candidate p-001'))));
});

test('duplicate canonical property URLs conflict even if external IDs differ', () => {
  const manifest = fixture();
  const second = structuredClone(manifest.properties[0]);
  second.external_id = 'p-002';
  second.address = 'Flat 2, 10 Example Street';
  second.source_url += '?utm_campaign=example';
  manifest.properties.push(second);
  manifest.expected_count = 2;
  assert.equal(audit(manifest).counts.conflict, 2);
});

test('duplicate room IDs and offer IDs are conflicts, not silently deduplicated', () => {
  const rooms = fixture();
  rooms.properties[0].rooms.push(structuredClone(rooms.properties[0].rooms[0]));
  const roomResult = audit(rooms);
  assert.equal(roomResult.items[0].status, 'conflict');
  assert.equal(roomResult.items[0].normalized.rooms.length, 2);
  const offers = fixture();
  offers.properties[0].rooms[0].offers.push(structuredClone(offers.properties[0].rooms[0].offers[0]));
  const offerResult = audit(offers);
  assert.equal(offerResult.items[0].status, 'conflict');
  assert.equal(offerResult.items[0].normalized.rooms[0].offers.length, 2);
});

test('same room or offer IDs in different properties are independently scoped', () => {
  const manifest = fixture();
  const second = structuredClone(manifest.properties[0]);
  second.external_id = 'p-002';
  second.source_url = 'https://www.scraye.com/listings/p-002';
  second.address = 'Flat 2, 10 Example Street';
  manifest.properties.push(second);
  manifest.expected_count = 2;
  assert.equal(audit(manifest).counts.create, 2);
});

test('cross-provider address duplicate is held but different apartments are distinct', () => {
  const first = audit().items[0];
  const baseline = { properties: [baselineRecord(first, {
    provider: 'housing-anywhere', country: 'United Kingdom', address: 'FLAT 1 / 10 EXAMPLE STREET', postcode: 'ab12cd',
  })] };
  const result = audit(fixture(), { baseline });
  assert.equal(result.items[0].status, 'conflict');
  assert.equal(result.items[0].canonical_property_id, undefined);
  const anotherApartment = fixture();
  anotherApartment.properties[0].address = 'Flat 2, 10 Example Street';
  assert.equal(audit(anotherApartment, { baseline }).counts.create, 1);
});

test('repeated images are preserved and reported for media-worker byte deduplication', () => {
  const manifest = fixture();
  manifest.properties[0].images.push(structuredClone(manifest.properties[0].images[0]));
  const result = audit(manifest);
  assert.equal(result.items[0].normalized.images.length, 2);
  assert.ok(result.items[0].warnings.some(warning => warning.includes('repeated image URL')));
});

test('wrong partner, incomplete snapshot, schema mismatch, and count mismatch hold records', () => {
  for (const change of [{ partner: 'housing-anywhere' }, { complete: false }, { schema_version: 2 }, { expected_count: 2 }]) {
    const result = audit({ ...fixture(), ...change });
    assert.ok(result.errors.length > 0);
    assert.equal(result.counts.error, 1);
    assert.equal(result.items[0].action, 'hold');
  }
});

test('empty manifest cannot masquerade as an instruction to delete the portfolio', () => {
  const result = audit({ ...fixture(), properties: [], expected_count: 0 });
  assert.deepEqual(result.items, []);
  assert.ok(result.errors.some(error => error.includes('withdrawal review')));
});

test('image and listing URL validation requires exact HTTPS host allowlists', () => {
  for (const url of [
    'https://assets.scraye.com.evil.example/test.png',
    'http://assets.scraye.com/test.png',
    'https://user:pass@assets.scraye.com/test.png',
    'https://assets.scraye.com:8443/test.png',
    'https://127.0.0.1/test.png',
    'https://[::1]/test.png',
    'file:///test.png',
  ]) {
    const manifest = fixture();
    manifest.properties[0].images[0].url = url;
    assert.equal(audit(manifest).counts.error, 1, url);
  }
  const manifest = fixture();
  manifest.properties[0].source_url = 'https://housinganywhere.com/test';
  assert.equal(audit(manifest).counts.error, 1);
});

test('literal local IP is rejected even if misconfigured as an approved host', () => {
  const manifest = fixture();
  manifest.properties[0].images[0].url = 'https://127.0.0.1/test.png';
  const result = audit(manifest, { config: { ...config, image_hosts: ['127.0.0.1'] } });
  assert.ok(result.items[0].errors.some(error => error.includes('public domain names')));
});

test('identity query parameters and fragments survive source URL normalization', () => {
  assert.equal(canonicalSourceUrl('https://www.scraye.com/listings?a=2&utm_source=x&unit=12#room-1'),
    'https://www.scraye.com/listings?a=2&unit=12#room-1');
  assert.notEqual(canonicalSourceUrl('https://www.scraye.com/listings?unit=1'), canonicalSourceUrl('https://www.scraye.com/listings?unit=2'));
});

test('unknown source price stays null and zero stays zero with a review warning', () => {
  for (const price of [null, 0]) {
    const manifest = fixture();
    manifest.properties[0].rooms[0].offers[0].price_minor = price;
    const result = audit(manifest);
    assert.equal(result.counts.create, 1);
    assert.equal(result.items[0].normalized.rooms[0].offers[0].price_minor, price);
    assert.ok(result.items[0].warnings.some(warning => warning.includes(price === null ? 'unknown source price' : 'zero source price')));
  }
});

test('negative, fractional, unsafe or omitted minor-unit prices are errors', () => {
  for (const price of [-1, 1.5, Number.MAX_SAFE_INTEGER + 1, '100', undefined, NaN]) {
    const manifest = fixture();
    manifest.properties[0].rooms[0].offers[0].price_minor = price;
    assert.equal(audit(manifest).counts.error, 1, String(price));
  }
});

test('future observation timestamps and invalid or reversed tenancy dates are errors', () => {
  for (const change of [
    { observed_at: '2026-11-28T12:00:00Z' },
    { observed_at: '2026-02-30T12:00:00Z' },
    { observed_at: '2026-11-27T12:00:00' },
    { start_date: '2027-02-30' },
    { end_date: '2026-12-31' },
  ]) {
    const manifest = fixture();
    Object.assign(manifest.properties[0].rooms[0].offers[0], change);
    assert.equal(audit(manifest).counts.error, 1, JSON.stringify(change));
  }
  const future = { ...fixture(), observed_at: '2026-11-28T12:00:00Z' };
  assert.equal(audit(future).counts.error, 1);
});

test('absent rights allow an offline audit but carry explicit staging warnings', () => {
  const result = audit(fixture(), { config: { ...config, permission: {} } });
  assert.equal(result.counts.create, 1);
  assert.equal(result.warnings.length, 4);
  assert.ok(result.warnings.some(warning => warning.includes('can_copy_images')));
});

test('no images and unsupported source fields fail explicitly', () => {
  const manifest = fixture();
  manifest.properties[0].images = [];
  assert.equal(audit(manifest).counts.error, 1);
  const extra = fixture();
  extra.properties[0].rent_includes_bills = true;
  assert.ok(audit(extra).items[0].errors.some(error => error.includes('map it explicitly')));
});

test('country and period validation do not guess missing units', () => {
  const manifest = fixture();
  manifest.properties[0].country = 'UK';
  manifest.properties[0].rooms[0].offers[0].period = 'weekly-ish';
  const result = audit(manifest);
  assert.equal(result.counts.error, 1);
  assert.ok(result.items[0].errors.some(error => error.includes('ISO 3166')));
  assert.ok(result.items[0].errors.some(error => error.includes('expected week')));
});

test('unknown currencies are rejected while source minor units remain untouched', () => {
  const invalid = fixture();
  invalid.properties[0].rooms[0].offers[0].currency = 'ZZZ';
  assert.equal(audit(invalid).counts.error, 1);
  const yen = fixture();
  yen.properties[0].rooms[0].offers[0].currency = 'JPY';
  yen.properties[0].rooms[0].offers[0].price_minor = 123456;
  const result = audit(yen);
  assert.equal(result.counts.create, 1);
  assert.equal(result.items[0].normalized.rooms[0].offers[0].price_minor, 123456);
});

test('source key has deterministic provider scope', () => {
  assert.equal(catalogueSourceKey('housing-anywhere', ' 123 '), 'housing-anywhere:123');
  assert.throws(() => catalogueSourceKey('unknown-provider', '123'));
});
