import {
  accommodationFeedDevelopments,
  getDevelopmentDescription,
  type AccommodationFeedDevelopment,
} from './response-data'
import staceyInventory from './stacey-inventory.json'
import { getIgluPropertyForRoom, igluProperties, igluRooms } from './iglu-data'

export type AccommodationRoomRecord = {
  name: string
  image: string | null
  images: string[]
  priceFrom: number | null
  pricePerNight: number | null
  priceLabel: string | null
  available: number | null
  status: string | null
  minimumOccupancy: number | null
  maximumOccupancy: number | null
  academicYear: string | null
  features?: string[]
}

export type AccommodationListingRecord = {
  provider: 'vita-student' | 'stacey' | 'iglu'
  key: string
  slug: string
  city: string
  country: string | null
  name: string
  buildings: Array<{ name: string | null; address: string | null; postcode: string | null; unitsAvailable: number | null }>
  address: string | null
  description: string | null
  coverImage: string | null
  photoSourceUrl: string | null
  gallery: string[]
  galleryLabels?: Record<string, string>
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

const vitaAccommodationListings: AccommodationListingRecord[] = uniqueDevelopments.map((development) => {
  const description = getDevelopmentDescription(development) ?? null
  const baseSlug = `${development.city}-${development.name}`
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const duplicateCount = slugCounts.get(baseSlug) ?? 0
  slugCounts.set(baseSlug, duplicateCount + 1)
  const slug = duplicateCount ? `${baseSlug}-${duplicateCount + 1}` : baseSlug

  return {
    provider: 'vita-student' as const,
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
    address: getDevelopmentAddress(development),
    description,
    coverImage: development.rooms.find((room) => room.image)?.image ?? null,
    photoSourceUrl: null,
    gallery: [...new Set(development.rooms.flatMap((room) => room.image ? [room.image] : []))],
    amenities: [],
    inclusions: getDescriptionInclusions(description),
    roomFeatures: [],
    contractTerms: [],
    depositNote: null,
    distance: null,
    universities: [],
    roomTypes: development.rooms.map((room) => ({
      name: room.name,
      image: room.image ?? null,
      images: room.image ? [room.image] : [],
      priceFrom: room.priceFrom ?? null,
      pricePerNight: null,
      priceLabel: null,
      available: room.available ?? null,
      status: null,
      minimumOccupancy: room.minimumOccupancy ?? null,
      maximumOccupancy: room.maximumOccupancy ?? null,
      academicYear: room.academicYear ?? null,
    })),
  }
}).filter((listing) =>
  Boolean(listing.coverImage) || listing.gallery.length > 0 || listing.roomTypes.some((room) => Boolean(room.image)),
)

function parseStaceyPrice(price: string | null): number | null {
  if (!price) return null
  const numeric = Number(price.replace(/[^0-9.,]/g, '').replace(/,(?=\d{3}(?:\D|$))/g, '').replace(',', '.'))
  return Number.isFinite(numeric) ? numeric : null
}

function mapStaceyImage(sourcePath: string): string | null {
  const sourcePrefix = '/components/accommodation/Stacey/images/'
  if (!sourcePath.startsWith(sourcePrefix)) return null

  const relativePath = sourcePath.slice(sourcePrefix.length)
  if (!relativePath || relativePath.split('/').some((segment) => !segment || segment === '.' || segment === '..')) return null

  const encodedRelativePath = relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")

  return `/stacey/${encodedRelativePath}`
}

function mapStaceyGalleryLabels(
  sourcePaths: string[],
  captions: (string | null)[] | undefined,
): Record<string, string> {
  const labels: Record<string, string> = {}
  sourcePaths.forEach((sourcePath, index) => {
    const image = mapStaceyImage(sourcePath)
    const caption = captions?.[index]
    if (image && caption) labels[image] = caption
  })
  return labels
}

function slugifyAccommodationValue(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const staceySlugCounts = new Map<string, number>()

const staceyListings: AccommodationListingRecord[] = staceyInventory.cities.map((property, index) => {
  const slugBase = `stacey-${slugifyAccommodationValue(`${property.locality}-${property.name}`)}`
  const duplicateCount = staceySlugCounts.get(slugBase) ?? 0
  staceySlugCounts.set(slugBase, duplicateCount + 1)
  const slug = duplicateCount ? `${slugBase}-${duplicateCount + 1}` : slugBase
  const roomTypes = property.rooms.map((room) => {
    const images = (room.images ?? [])
      .map(mapStaceyImage)
      .filter((image): image is string => image !== null)

    return {
      name: room.name,
      image: images[0] ?? null,
      images,
      priceFrom: parseStaceyPrice(room.price ?? null),
      pricePerNight: parseStaceyPrice('pricePerNight' in room ? room.pricePerNight ?? null : null),
      priceLabel: typeof room.price === 'string' && room.price
        ? room.price
        : 'pricePerNight' in room && typeof room.pricePerNight === 'string'
          ? `${room.pricePerNight}/night`
          : null,
      available: null,
      status: room.status,
      minimumOccupancy: null,
      maximumOccupancy: null,
      academicYear: null,
    }
  })
  const propertyGallery = property.gallery
    .map(mapStaceyImage)
    .filter((image): image is string => image !== null)
  const sourceGalleryLabels = 'galleryLabels' in property ? property.galleryLabels : undefined
  const coverImage = mapStaceyImage(property.coverImage)
    ?? propertyGallery[0]
    ?? roomTypes.find((room) => room.images.length > 0)?.images[0]
    ?? null

  return {
    provider: 'stacey',
    key: `stacey-${property.name.toLocaleLowerCase()}-${index}`,
    slug,
    city: property.name,
    country: 'Germany',
    name: property.head.title,
    buildings: [{ name: property.locality, address: property.head.address, postcode: null, unitsAvailable: null }],
    address: property.head.address,
    description: [property.head.subtitle, property.head.description, property.neighborhood.description].filter(Boolean).join('\n\n'),
    coverImage,
    photoSourceUrl: property.photoSourceUrl,
    gallery: [...new Set([...(coverImage ? [coverImage] : []), ...propertyGallery, ...roomTypes.flatMap((room) => room.images)])],
    galleryLabels: mapStaceyGalleryLabels(property.gallery, sourceGalleryLabels),
    amenities: property.head.features,
    inclusions: property.head.features,
    roomFeatures: [...new Set(property.rooms.flatMap((room) => room.amenities))],
    contractTerms: [],
    depositNote: null,
    distance: null,
    universities: [],
    roomTypes,
  }
})

const igluListings: AccommodationListingRecord[] = igluProperties.map((property) => {
  const rooms = igluRooms.filter((room) => room.parentPropertyId === property.id)
  return {
    provider: 'iglu',
    key: `iglu-property-${property.id}`,
    slug: property.slug,
    city: property.city,
    country: property.country,
    name: property.name,
    buildings: [{ name: property.name, address: property.address, postcode: null, unitsAvailable: null }],
    address: property.address,
    description: property.description,
    coverImage: property.gallery[0] ?? rooms[0]?.image ?? null,
    photoSourceUrl: null,
    gallery: [...new Set([...property.gallery, ...rooms.flatMap((room) => [...room.images, room.floorplan])])],
    amenities: property.amenities,
    inclusions: property.inclusions,
    roomFeatures: [...new Set(rooms.flatMap((room) => room.features))],
    contractTerms: [],
    depositNote: null,
    distance: null,
    universities: [],
    roomTypes: rooms.map((room) => ({
      name: room.name,
      image: room.image,
      images: room.images,
      priceFrom: null,
      pricePerNight: null,
      priceLabel: null,
      available: null,
      status: null,
      minimumOccupancy: 1,
      maximumOccupancy: 1,
      academicYear: null,
      features: room.features,
    })),
  }
})

// Keep the source relationship explicit and fail loudly if source data drifts.
for (const room of igluRooms) {
  if (!getIgluPropertyForRoom(room)) throw new Error(`Iglu room ${room.id} has no parent property ${room.parentPropertyId}`)
}

export const accommodationListings = [...vitaAccommodationListings, ...staceyListings, ...igluListings]
export const allAccommodationListings = accommodationListings

export type AccommodationRoomListing = {
  slug: string
  property: AccommodationListingRecord
  room: AccommodationRoomRecord
}

export function getAccommodationRoomSlug(propertySlug: string, roomName: string, occurrence = 1): string {
  const roomNameSlug = roomName.trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'room'
  const baseSlug = `${propertySlug}--${roomNameSlug}`
  return occurrence > 1 ? `${baseSlug}-${occurrence}` : baseSlug
}

const roomSlugCounts = new Map<string, number>()
export const accommodationRoomListings: AccommodationRoomListing[] = accommodationListings.flatMap((property) =>
  property.roomTypes.map((room) => {
    const baseSlug = getAccommodationRoomSlug(property.slug, room.name)
    const occurrence = (roomSlugCounts.get(baseSlug) ?? 0) + 1
    roomSlugCounts.set(baseSlug, occurrence)
    return { slug: getAccommodationRoomSlug(property.slug, room.name, occurrence), property, room }
  }),
)

export function getAccommodationRoomBySlug(slug: string): AccommodationRoomListing | null {
  return accommodationRoomListings.find((room) => room.slug === slug) ?? null
}

export const accommodationCities = [...new Set(allAccommodationListings.map((listing) => listing.city))]
  .sort((first, second) => first.localeCompare(second))

export function formatSourcePrice(value: number): string {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(value)
}

export function formatSourceAvailability(value: number): string {
  return `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(value)} available`
}
