import {
  accommodationFeedCities,
  accommodationFeedDevelopments,
  getDevelopmentDescription,
  getDevelopmentExternalLinks,
  type AccommodationFeedDevelopment,
} from './response-data'

export type AccommodationRoomRecord = {
  name: string
  image: string | null
  priceFrom: number | null
  available: number | null
  academicYear: string | null
}

export type AccommodationListingRecord = {
  key: string
  city: string
  name: string
  buildings: Array<{ name: string | null }>
  address: string | null
  description: string | null
  providerLinks: Array<{ label: string; href: string }>
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
      normalized(room.academicYear),
    ]))
    .sort()

  return JSON.stringify([normalized(development.city), normalized(development.country), normalized(development.brand), buildings, rooms])
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

  return building.address
    ? formatSourceAddress(building.address)
    : building.postcode ?? null
}

const uniqueDevelopments: AccommodationFeedDevelopment[] = []
const seenDevelopmentIdentities = new Set<string>()

for (const development of accommodationFeedDevelopments) {
  const identity = getDuplicateIdentity(development)
  if (seenDevelopmentIdentities.has(identity)) continue
  seenDevelopmentIdentities.add(identity)
  uniqueDevelopments.push(development)
}

export const accommodationListings: AccommodationListingRecord[] = uniqueDevelopments.map((development) => ({
  key: development.key,
  city: development.city,
  name: development.name,
  buildings: development.buildings.map((building) => ({ name: building.name ?? null })),
  address: getDevelopmentAddress(development),
  description: getDevelopmentDescription(development) ?? null,
  providerLinks: getDevelopmentExternalLinks(development).map(({ building, href }) => ({ label: building, href })),
  roomTypes: development.rooms.map((room) => ({
    name: room.name,
    image: room.image ?? null,
    priceFrom: room.priceFrom ?? null,
    available: room.available ?? null,
    academicYear: room.academicYear ?? null,
  })),
}))

export const accommodationCities = accommodationFeedCities

export const accommodationSourceNotice =
  'Prices are shown as supplied; the source does not specify a currency or billing period.'

export function formatSourcePrice(value: number): string {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(value)
}

export function formatSourceAvailability(value: number): string {
  return `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(value)} available`
}
