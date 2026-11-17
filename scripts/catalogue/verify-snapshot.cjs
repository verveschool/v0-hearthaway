/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node verification utility. */
const fs = require('node:fs')
const crypto = require('node:crypto')
const assert = require('node:assert/strict')
const file = process.argv[2]
if (!file) throw new Error('Usage: node scripts/catalogue/verify-snapshot.cjs <snapshot.json>')
const snapshot = JSON.parse(fs.readFileSync(file, 'utf8'))
for (const [path, contents] of Object.entries(snapshot.sourceFiles)) {
  assert.equal(crypto.createHash('sha256').update(contents).digest('hex'), snapshot.report.sourceChecksums[path], `source checksum: ${path}`)
}
assert.equal(Object.keys(snapshot.sourceFiles).length, Object.keys(snapshot.report.sourceChecksums).length)
const properties = snapshot.publishedOutput
const rawProperties = snapshot.rawAdapterOutput
const rooms = properties.flatMap(p => p.roomTypes)
assert.equal(properties.length, rawProperties.length, 'property count changed in sanitization')
assert.equal(rooms.length, snapshot.roomSlugs.length, 'room slug coverage')
assert.equal(rooms.length, snapshot.sourceRoomMappings.length, 'source lineage coverage')
assert.equal(new Set(properties.map(p => p.slug)).size, properties.length, 'property slug uniqueness')
assert.equal(new Set(snapshot.roomSlugs.map(r => r.slug)).size, rooms.length, 'room slug uniqueness')
assert.deepEqual(snapshot.sourceRoomMappings.map(r => r.slug), snapshot.roomSlugs.map(r => r.slug), 'source mappings ordered with published rooms')
const strongKeys = snapshot.sourceRoomMappings.filter(r => ['provider-room-id', 'adapter-source-id'].includes(r.basis)).map(r => `${r.provider}:${r.providerKey}`)
assert.equal(new Set(strongKeys).size, strongKeys.length, 'strong source identifiers must be unique within provider')
for (let i = 0; i < properties.length; i++) {
  assert.equal(properties[i].slug, rawProperties[i].slug, 'property order and slug parity')
  assert.equal(properties[i].roomTypes.length, rawProperties[i].roomTypes.length, `room count: ${properties[i].slug}`)
}
const tracked = new Set(snapshot.trackedAssets.map(a => a.file))
for (const media of snapshot.mediaReferences) {
  if (media.url.startsWith('/') && !media.url.startsWith('//')) {
    const local = `public${decodeURIComponent(media.url.split(/[?#]/, 1)[0])}`
    assert.ok(tracked.has(local), `untracked local asset: ${local}`)
  }
}
const publishedByProvider = snapshot.report.publishedOutput
for (const [provider, counts] of Object.entries(publishedByProvider)) {
  const selected = properties.filter(p => p.provider === provider)
  assert.equal(selected.length, counts.properties, `property count: ${provider}`)
  assert.equal(selected.flatMap(p => p.roomTypes).length, counts.rooms, `room count: ${provider}`)
}
assert.equal(snapshot.researchEvidence.records.length, snapshot.report.vitaImageRequirementExclusions.length, 'excluded source property research coverage')
assert.ok(snapshot.researchEvidence.records.every(r => r.images.length > 0 && r.images.every(i => i.url && i.attribution && i.rightsStatus)), 'image provenance coverage')
console.log(`Verified ${properties.length} published properties, ${rooms.length} room mappings and ${snapshot.mediaReferences.length} media references`)
