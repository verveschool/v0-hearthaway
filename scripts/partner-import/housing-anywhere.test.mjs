import assert from 'node:assert/strict'
import test from 'node:test'
import { housingAnywhereManifest } from './adapters/housing-anywhere.mjs'

test('outbound mapping keeps tracking, original monthly minor units and ordered photos', () => {
  const item = {
    listing_id: 12, source_url: 'https://housinganywhere.com/room/12', referral_url: 'https://housinganywhere.com/room/12?utm_source=test',
    billing_period: 'monthly', name: 'Fixture studio', address: 'Example street', postcode: '1000',
    city: 'Test city', country: 'DE', description: 'Fixture only', price_minor: 123450,
    currency: 'EUR', availability: 'available', images: ['second.jpg', 'first.jpg'],
  }
  const feed = { complete: true, expected_count: 1, observed_at: '2026-11-27T00:00:00Z', listings: [item], synthetic: true }
  const paths = object => Object.fromEntries(Object.keys(object).map(key => [key, [key]]))
  const mapping = { direction: 'outbound', unit: 'single-rentable-listing', monthly_value: 'monthly', header: paths(feed), fields: paths(item) }
  const manifest = housingAnywhereManifest(feed, mapping)
  assert.equal(manifest.synthetic, true)
  const property = manifest.properties[0]
  assert.equal(property.referral_url, item.referral_url)
  assert.equal(property.rooms[0].offers[0].price_minor, 123450)
  assert.deepEqual(property.images.map(i => i.url), item.images)
  assert.throws(() => housingAnywhereManifest({...feed, complete: false}, mapping), /incomplete/)
  assert.throws(() => housingAnywhereManifest(feed, {...mapping, direction: 'inbound'}), /outbound/)
})
