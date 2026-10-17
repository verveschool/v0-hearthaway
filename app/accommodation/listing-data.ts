import {
  accommodationFeedCities,
  accommodationFeedDevelopments,
  getDevelopmentDescription,
  type AccommodationFeedDevelopment,
} from './response-data'
import { accommodationProperties as curatedProperties } from './catalog'

export type AccommodationRoomRecord = {
  name: string
  image: string | null
  priceFrom: number | null
  available: number | null
  minimumOccupancy: number | null
  maximumOccupancy: number | null
  academicYear: string | null
}

export type AccommodationListingRecord = {
  key: string
  slug: string
  city: string
  country: string | null
  name: string
  buildings: Array<{ name: string | null; address: string | null; postcode: string | null; unitsAvailable: number | null }>
  address: string | null
  description: string | null
  gallery: string[]
  amenities: string[]
  inclusions: string[]
  roomFeatures: string[]
  contractTerms: string[]
  depositNote: string | null
  distance: string | null
  universities: string[]
  roomTypes: AccommodationRoomRecord[]
}

function normalized(value: string | undefined): string {
  return value?.trim().toLocaleLowerCase().replace(/\s+/g, ' ') ?? ''
}

function getDuplicateIdentity(development: AccommodationFeedDevelopment): string {
  const buildings = development.buildings
    .map((building) => [building.name, building.address, building.postcode, building.unitsAvailable, building.description, building.externalLink])
    .map((parts) => JSON.stringify(parts.map((part) => typeof part === 'string' ? normalized(part) : part ?? null)))
    .sort()
  const rooms = development.rooms
    .map((room) => JSON.stringify([
      normalized(room.name),
      room.image ?? null,
      room.priceFrom ?? null,
      room.available ?? null,
      room.minimumOccupancy ?? null,
      room.maximumOccupancy ?? null,
      normalized(room.academicYear),
    ]))
    .sort()

  return JSON.stringify([
    normalized(development.city),
    normalized(development.name),
    normalized(development.country),
    normalized(development.brand),
    buildings,
    rooms,
  ])
}

function formatSourceAddress(address: string): string {
  return address
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/,+$/, ''))
    .filter(Boolean)
    .join(', ')
}

function getDevelopmentAddress(development: AccommodationFeedDevelopment): string | null {
  const building = development.buildings.find((candidate) => candidate.address || candidate.postcode)
  if (!building) return null

  const address = building.address ? formatSourceAddress(building.address) : null
  const postcode = building.postcode && !address?.toLocaleLowerCase().includes(building.postcode.toLocaleLowerCase())
    ? building.postcode
    : null
  return [address, postcode].filter(Boolean).join(', ') || null
}

function normalizeIdentity(value: string): string {
  return value.trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function getCuratedProperty(development: AccommodationFeedDevelopment) {
  const name = normalizeIdentity(development.name)
  const city = normalizeIdentity(development.city)
  return curatedProperties.find((property) =>
    normalizeIdentity(property.name) === name && normalizeIdentity(property.city) === city,
  )
}

function getDescriptionInclusions(description: string | null): string[] {
  if (!description) return []
  const includedText = description.match(/what(?:'|’)s included is\s*(.+?)(?:\.|$)/i)?.[1]
  if (!includedText) return []
  return includedText
    .split(/,|\s+and\s+/i)
    .map((item) => item.trim().replace(/[.;]+$/, ''))
    .filter(Boolean)
}

const uniqueDevelopments: AccommodationFeedDevelopment[] = []
const seenDevelopmentIdentities = new Set<string>()

for (const development of accommodationFeedDevelopments) {
  const identity = getDuplicateIdentity(development)
  if (seenDevelopmentIdentities.has(identity)) continue
  seenDevelopmentIdentities.add(identity)
  uniqueDevelopments.push(development)
}

const slugCounts = new Map<string, number>()

export const accommodationListings: AccommodationListingRecord[] = uniqueDevelopments.map((development) => {
  const curatedProperty = getCuratedProperty(development)
  const description = getDevelopmentDescription(development) ?? null
  const baseSlug = `${development.city}-${development.name}`
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const duplicateCount = slugCounts.get(baseSlug) ?? 0
  slugCounts.set(baseSlug, duplicateCount + 1)
  const slug = duplicateCount ? `${baseSlug}-${duplicateCount + 1}` : baseSlug

  return {
    key: development.key,
    slug,
    city: development.city,
    country: development.country ?? null,
    name: development.name,
    buildings: development.buildings.map((building) => ({
      name: building.name ?? null,
      address: building.address ? formatSourceAddress(building.address) : null,
      postcode: building.postcode ?? null,
      unitsAvailable: building.unitsAvailable ?? null,
    })),
    address: getDevelopmentAddress(development) ?? curatedProperty?.address ?? null,
    description,
    gallery: curatedProperty?.gallery ?? [],
    amenities: curatedProperty?.amenities ?? [],
    inclusions: [...new Set([
      ...(curatedProperty?.inclusions ?? []),
      ...getDescriptionInclusions(description),
    ])],
    roomFeatures: curatedProperty?.roomFeatures ?? [],
    contractTerms: curatedProperty?.contractTerms ?? [],
    depositNote: curatedProperty?.depositNote ?? null,
    distance: curatedProperty?.distance ?? null,
    universities: curatedProperty?.universities ?? [],
    roomTypes: development.rooms.map((room) => ({
      name: room.name,
      image: room.image ?? null,
      priceFrom: room.priceFrom ?? null,
      available: room.available ?? null,
      minimumOccupancy: room.minimumOccupancy ?? null,
      maximumOccupancy: room.maximumOccupancy ?? null,
      academicYear: room.academicYear ?? null,
    })),
  }
}).filter((listing) =>
  listing.gallery.length > 0 || listing.roomTypes.some((room) => Boolean(room.image)),
)

export const accommodationCities = [...new Set(accommodationListings.map((listing) => listing.city))]
  .sort((first, second) => first.localeCompare(second))

export const accommodationSourceNotice =
  'Prices are shown as supplied; the source does not specify a currency or billing period.'

export function formatSourcePrice(value: number): string {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(value)
}

export function formatSourceAvailability(value: number): string {
  return `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(value)} available`
}
