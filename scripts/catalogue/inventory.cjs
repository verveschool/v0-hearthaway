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
    for (const name of ['rawAccommodationListings', 'uniqueDevelopments']) {
      const marker = `const ${name}`
      if (!source.includes(marker)) throw new Error(`Cannot instrument ${name}; adapter changed`)
      source = source.replace(marker, `export ${marker}`)
    }
  }
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, resolveJsonModule: true } })
  module._compile(output.outputText, filename)
}
const { rawAccommodationListings, uniqueDevelopments, accommodationListings, accommodationRoomListings } = require('../../app/accommodation/listing-data.ts')
const { accommodationFeedDevelopments } = require('../../app/accommodation/response-data.ts')
const { igluProperties, igluRooms } = require('../../app/accommodation/iglu-data.ts')
const { newProviderProperties } = require('../../app/accommodation/neonwood-data.ts')
const { studyInnVerifiedInventory } = require('../../app/accommodation/studyinn-data.ts')
const stacey = require('../../app/accommodation/stacey-inventory.json')
const vitaSource = require('../../app/accommodation/response.json')
const { countries } = require('../../lib/country-data.ts')
const { cities, universities } = require('../../lib/place-data.ts')
const sources = ['app/accommodation/response.json', 'app/accommodation/response-data.ts', 'app/accommodation/stacey-inventory.json', 'app/accommodation/iglu-data.ts', 'app/accommodation/iglu-images.json', 'app/accommodation/iglu-room-images.json', 'app/accommodation/iglu-property-details.json', 'app/accommodation/iglu-offers.json', 'app/accommodation/neonwood-data.ts', 'app/accommodation/new-provider-images.json', 'app/accommodation/studyinn-data.ts', 'docs/studyinn-image-provenance.json', 'app/accommodation/listing-data.ts', 'app/accommodation/presentation.ts', 'lib/country-data.ts', 'lib/place-data.ts']
const summarize = (records) => Object.fromEntries([...new Set(records.map(p => p.provider))].sort().map(provider => {
  const properties = records.filter(p => p.provider === provider)
  const rooms = properties.flatMap(p => p.roomTypes)
  return [provider, { properties: properties.length, rooms: rooms.length, roomsWithoutSourceId: rooms.filter(r => !r.sourceId).length, roomsWithoutPrice: rooms.filter(r => r.priceFrom == null && r.pricePerNight == null && !r.pricingOptions?.some(o => o.amount != null)).length, indicativeRooms: rooms.filter(r => r.priceConfidence === 'indicative').length }]
}))
const duplicateValues = (values) => [...values.reduce((m,v) => m.set(v,(m.get(v) || 0)+1),new Map())].filter(([,n])=>n>1)
const report = {
  commit: child.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
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
  duplicatePropertySlugs: duplicateValues(accommodationListings.map(p=>p.slug)),
  duplicateRoomSlugs: duplicateValues(accommodationRoomListings.map(r=>r.slug)),
}
if (process.argv.includes('--snapshot')) {
  console.log(JSON.stringify({ report, source: { vita: vitaSource, stacey, igluProperties, igluRooms, neonwood: newProviderProperties, studyInnIdentities: studyInnVerifiedInventory }, rawAdapterOutput: rawAccommodationListings, publishedOutput: accommodationListings, roomSlugs: accommodationRoomListings.map(({slug,property,room}) => ({slug, propertySlug:property.slug, roomName:room.name})) }, null, 2))
} else {
  console.log(JSON.stringify(report,null,2))
}
