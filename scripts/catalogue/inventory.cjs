/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS loader is needed to instrument the TypeScript adapters in memory. */
// Read-only inventory of the pinned source and its current public projection.
// Run from the repository root after installing the locked dependencies.
const fs = require('node:fs')
const crypto = require('node:crypto')
const child = require('node:child_process')
const ts = require('typescript')
const Module = require('node:module')
const path = require('node:path')
const resolve = Module._resolveFilename
Module._resolveFilename = function (request, ...args) { return resolve.call(this, request.startsWith('@/') ? path.join(process.cwd(), request.slice(2)) : request, ...args) }
require.extensions['.ts'] = function (module, filename) {
  let source = fs.readFileSync(filename, 'utf8')
  // Expose the pre-sanitization projection only within this read-only process.
  if (filename.endsWith('/app/accommodation/listing-data.ts')) {
    source = source.replace('function parseStaceyMonthlyPrice(', 'export function parseStaceyMonthlyPrice(')
    for (const name of ['rawAccommodationListings', 'uniqueDevelopments']) {
      const marker = `const ${name}`
      if (!source.includes(marker)) throw new Error(`Cannot instrument ${name}; adapter changed`)
      source = source.replace(marker, `export ${marker}`)
    }
  }
  if (filename.endsWith('/app/accommodation/studyinn-data.ts')) {
    const marker = 'const propertySeeds:'
    if (!source.includes(marker)) throw new Error('Cannot expose Study Inn seeds; adapter changed')
    source = source.replace(marker, `export ${marker}`)
  }
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, resolveJsonModule: true } })
  module._compile(output.outputText, filename)
}
const { rawAccommodationListings, uniqueDevelopments, accommodationListings, accommodationRoomListings, parseStaceyMonthlyPrice } = require('../../app/accommodation/listing-data.ts')
const { accommodationFeedDevelopments } = require('../../app/accommodation/response-data.ts')
const { igluProperties, igluRooms } = require('../../app/accommodation/iglu-data.ts')
const { newProviderProperties } = require('../../app/accommodation/neonwood-data.ts')
const { studyInnVerifiedInventory, propertySeeds: studyInnSourceSeeds } = require('../../app/accommodation/studyinn-data.ts')
const stacey = require('../../app/accommodation/stacey-inventory.json')
const vitaSource = require('../../app/accommodation/response.json')
const { countries } = require('../../lib/country-data.ts')
const { cities, universities } = require('../../lib/place-data.ts')
const sources = ['app/accommodation/response.json', 'app/accommodation/response-data.ts', 'app/accommodation/stacey-inventory.json', 'app/accommodation/iglu-data.ts', 'app/accommodation/iglu-images.json', 'app/accommodation/iglu-room-images.json', 'app/accommodation/iglu-property-details.json', 'app/accommodation/iglu-offers.json', 'app/accommodation/neonwood-data.ts', 'app/accommodation/new-provider-images.json', 'app/accommodation/studyinn-data.ts', 'docs/studyinn-image-provenance.json', 'app/accommodation/listing-data.ts', 'app/accommodation/presentation.ts', 'lib/country-data.ts', 'lib/place-data.ts', 'lib/moving-abroad-data.ts', 'docs/iglu-image-provenance.md', 'docs/neonwood-provider-evidence.md', 'docs/studyinn-completion-matrix.md', 'docs/studyinn-unresolved-fields.md']
const summarize = (records) => Object.fromEntries([...new Set(records.map(p => p.provider))].sort().map(provider => {
  const properties = records.filter(p => p.provider === provider)
  const rooms = properties.flatMap(p => p.roomTypes)
  return [provider, { properties: properties.length, rooms: rooms.length, roomsWithoutSourceId: rooms.filter(r => !r.sourceId).length, roomsWithoutPrice: rooms.filter(r => r.priceFrom == null && r.pricePerNight == null && !r.pricingOptions?.some(o => o.amount != null)).length, indicativeRooms: rooms.filter(r => r.priceConfidence === 'indicative').length }]
}))
const duplicateValues = (values) => [...values.reduce((m,v) => m.set(v,(m.get(v) || 0)+1),new Map())].filter(([,n])=>n>1)
const sourceRoomMappings = accommodationRoomListings.map(({slug, property, room}) => {
  const index = property.roomTypes.indexOf(room)
  let providerKey = room.sourceId ?? null
  let basis = providerKey ? 'adapter-source-id' : 'legacy-slug-only'
  if (property.provider === 'iglu') {
    const parentId = property.key.replace(/^iglu-property-/, '')
    const candidate = igluRooms.filter(r => r.parentPropertyId === parentId)[index]
    if (!candidate || candidate.name !== room.name) throw new Error(`Iglu room alignment failed: ${slug}`)
    providerKey = candidate.id
    basis = 'provider-room-id'
  }
  if (property.provider === 'study-inn') {
    const source = studyInnVerifiedInventory.find(p => p.propertySlug === property.slug)
    const candidate = source?.roomCategories[index]
    if (!candidate || candidate.name !== room.name) throw new Error(`Study Inn room alignment failed: ${slug}`)
    providerKey = candidate.sourceUrl
    basis = 'source-url-candidate-not-unique'
  }
  return { slug, propertySlug: property.slug, provider: property.provider, providerKey, basis }
})
const sourceFiles = Object.fromEntries(sources.map(file => [file, fs.readFileSync(file, 'utf8')]))
const evidence = require('./vita-excluded-research.json')
const mediaReferences = (properties) => {
  const refs = []
  for (const property of properties) {
    const add = (url, role, roomIndex = null) => { if (typeof url === 'string' && url) refs.push({ propertySlug: property.slug, roomIndex, role, url }) }
    add(property.coverImage, 'cover')
    property.gallery.forEach(url => add(url, 'gallery'))
    property.roomTypes.forEach((room, i) => {
      add(room.image, 'room-cover', i)
      room.images.forEach(url => add(url, 'room-gallery', i))
      add(room.floorplan, 'floorplan', i)
      room.floorplans?.forEach(item => add(item.image, 'floorplan', i))
    })
  }
  return refs
}
const media = mediaReferences(accommodationListings)
const monthlyPrices = {}
for (const property of rawAccommodationListings) {
  if (!['neonwood', 'stacey'].includes(property.provider)) continue
  const providerProperty = property.provider === 'neonwood'
    ? newProviderProperties.find(p => `${p.sourceBrand}:${p.sourcePath}` === property.key)
    : stacey.cities[Number(property.key.split('-').at(-1))]
  monthlyPrices[property.slug] = property.roomTypes.map((room, index) => {
    const sourceRoom = providerProperty?.rooms[index]
    if (!sourceRoom || sourceRoom.name !== room.name) throw new Error(`Monthly price identity mismatch: ${property.slug} / ${room.name}`)
    const amount = property.provider === 'neonwood' ? sourceRoom.monthlyFrom : parseStaceyMonthlyPrice(sourceRoom.price)
    if (amount !== null && !Number.isFinite(amount)) throw new Error(`Invalid monthly price: ${property.slug} / ${room.name}`)
    return { amount, label: sourceRoom.price ?? null }
  })
}
const cityGuides = cities.map(({ name, country, slug }) => ({ name, country, slug }))
const universityGuides = universities.map(({ name, country, city, slug, citySlug }) => ({ name, country, city, slug, citySlug }))
const vitaBuildings = Object.fromEntries(accommodationFeedDevelopments.map(p => [p.key, p.buildings]))
const imageAttribution = {}
for (const { src, sourceUrl } of [
  ...require('../../app/accommodation/iglu-images.json').flatMap(p => p.assets),
  ...require('../../app/accommodation/iglu-room-images.json').flatMap(p => p.images),
]) {
  imageAttribution[src] = { sourceUrl, evidence: 'docs/iglu-image-provenance.md' }
}
for (const { localPath, sourceUrl, sourcePage, authorization } of require('../../docs/studyinn-image-provenance.json').assets) {
  imageAttribution[localPath] ??= { sourceUrl, sourcePage, authorization }
}
const catalogueMetadata = { monthlyPrices, cityGuides, universityGuides, vitaBuildings, imageAttribution }
const sourceCommitOption = process.argv.indexOf('--source-commit')
const sourceCommit = sourceCommitOption === -1
  ? child.execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
  : process.argv[sourceCommitOption + 1]
if (!sourceCommit || !/^[a-f0-9]{40}$/.test(sourceCommit)) throw new Error('Expected a full source commit SHA')
child.execFileSync('git', ['diff', '--quiet', sourceCommit, '--', ...sources, 'scripts/catalogue/vita-excluded-research.json'])
const trackedAssets = child.execFileSync('git', ['ls-tree','-r','-z',sourceCommit,'--','public'], { maxBuffer: 16 * 1024 * 1024 }).toString().split('\0').filter(Boolean).map(row => {
  const [metadata, file] = row.split('\t')
  const [mode, type, gitBlob] = metadata.split(' ')
  return { file, mode, type, gitBlob }
})
const trackedPaths = new Set(trackedAssets.map(asset => asset.file))
const localPath = url => {
  if (!url.startsWith('/') || url.startsWith('//')) return null
  try { return `public${decodeURIComponent(url.split(/[?#]/, 1)[0])}` } catch { return null }
}
const missingLocalMedia = [...new Set(media.map(item => localPath(item.url)).filter(file => file && !trackedPaths.has(file)))].sort()
const report = {
  commit: sourceCommit,
  sourceChecksums: Object.fromEntries(sources.map(path => [path, crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex')])),
  input: {
    vitaSource: { properties: Object.values(vitaSource.data).reduce((n,c)=>n+c.developments.length,0), rooms: Object.values(vitaSource.data).flatMap(c=>c.developments).reduce((n,p)=>n+Object.keys(p.unit_types ?? {}).length,0) },
    vitaParsed: { properties: accommodationFeedDevelopments.length, rooms: accommodationFeedDevelopments.reduce((n,p)=>n+p.rooms.length,0) },
    stacey: { properties: stacey.cities.length, rooms: stacey.cities.reduce((n,p)=>n+(p.rooms.length),0) },
    iglu: { properties: igluProperties.length, rooms: igluRooms.length },
    neonwood: { properties: newProviderProperties.length, rooms: newProviderProperties.reduce((n,p)=>n+p.rooms.length,0) },
    studyinn: { properties: studyInnVerifiedInventory.length, rooms: studyInnVerifiedInventory.reduce((n,p)=>n+p.roomCategories.length,0) },
  },
  vitaDuplicateExclusions: accommodationFeedDevelopments.filter(p => !uniqueDevelopments.includes(p)).map(p => ({city:p.city, name:p.name, roomCount:p.rooms.length, sourceKey:p.key})),
  vitaImageRequirementExclusions: uniqueDevelopments.filter(p => !rawAccommodationListings.some(l => l.provider === 'vita-student' && l.key === p.key)).map(p => ({city:p.city, name:p.name, roomCount:p.rooms.length, sourceKey:p.key})),
  rawAdapterOutput: summarize(rawAccommodationListings),
  publishedOutput: summarize(accommodationListings),
  placeRecords: { countries: countries.length, cities: cities.length, universities: universities.length },
  media: { references: media.length, uniqueUrls: new Set(media.map(m => m.url)).size, localReferences: media.filter(m => localPath(m.url)).length, missingLocalPaths: missingLocalMedia },
  duplicatePropertySlugs: duplicateValues(accommodationListings.map(p=>p.slug)),
  duplicateRoomSlugs: duplicateValues(accommodationRoomListings.map(r=>r.slug)),
  sourcePricing: { studyInnSeedRoomsWithoutAnnualPrice: studyInnSourceSeeds.flatMap(p => p.rooms.map(r => ({ property: p.name, room: r.name, price2026: r.price2026, price2027: r.price2027 }))).filter(r => r.price2026 === null && r.price2027 === null), neonWoodMonthlyMissing: newProviderProperties.flatMap(p => p.rooms.map(r => ({ property: p.name, room: r.name, monthlyFrom: r.monthlyFrom }))).filter(r => r.monthlyFrom === null) },
  sourceRoomMappingBasis: Object.fromEntries([...new Set(sourceRoomMappings.map(m=>m.basis))].map(basis => [basis, sourceRoomMappings.filter(m=>m.basis === basis).length])),
}
if (process.argv.includes('--snapshot')) {
  console.log(JSON.stringify({ report, sourceFiles, researchEvidence: evidence, mediaReferences: media, trackedAssets, sourceRoomMappings, catalogueMetadata, source: { vita: vitaSource, stacey, igluProperties, igluRooms, neonwood: newProviderProperties, studyInnIdentities: studyInnVerifiedInventory, studyInnSourceSeeds }, rawAdapterOutput: rawAccommodationListings, publishedOutput: accommodationListings, roomSlugs: accommodationRoomListings.map(({slug,property,room}) => ({slug, propertySlug:property.slug, roomName:room.name})) }, null, 2))
} else {
  console.log(JSON.stringify(report,null,2))
}
