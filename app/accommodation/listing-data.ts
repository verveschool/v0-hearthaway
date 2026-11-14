import {
  accommodationFeedDevelopments,
  getDevelopmentDescription,
  type AccommodationFeedDevelopment,
} from './response-data'
import staceyInventory from './stacey-inventory.json'
import { getIgluPropertyForRoom, igluProperties, igluRooms } from './iglu-data'
import { newProviderProperties } from './neonwood-data'
import { formatCurrencyAmount, formatSourcePrice } from './presentation'

export { formatSourceAvailability, formatSourcePrice } from './presentation'

export type AccommodationRoomRecord = {
  sourceId?: string
  name: string
  image: string | null
  images: string[]
  priceFrom: number | null
  pricePerNight: number | null
  priceLabel: string | null
  nightlyPriceLabel?: string | null
  available: number | null
  status: string | null
  minimumOccupancy: number | null
  maximumOccupancy: number | null
  academicYear: string | null
  features?: string[]
  priceConfidence?: 'published' | 'indicative' | null
  floorplan?: string | null
}

export type AccommodationListingRecord = {
  provider: 'vita-student' | 'stacey' | 'iglu' | 'neonwood' | 'tannhaus'
  sourceId?: string
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
      priceLabel: room.priceFrom === undefined
        ? null
        : development.country === 'United Kingdom'
          ? `${formatCurrencyAmount(room.priceFrom, '£')}/week`
          : development.country === 'Spain'
            ? `${formatSourcePrice(room.priceFrom)} (currency and billing period not supplied)`
            : formatSourcePrice(room.priceFrom),
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

function parseStaceyMonthlyPrice(price: string | null): number | null {
  return price && /\/\s*month\s*$/i.test(price)
    ? parseStaceyPrice(price)
    : null
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

    const sourceMonthlyPrice = parseStaceyMonthlyPrice(room.price ?? null)
    const nightlyPrice = parseStaceyPrice('pricePerNight' in room ? room.pricePerNight ?? null : null)
    const sourceCurrencySymbol = room.price?.match(/^[^\d\s]+/)?.[0] ?? '€'
    const weeklyPrice = sourceMonthlyPrice === null ? null : (sourceMonthlyPrice * 12) / 52
    const displayedWeeklyPrice = weeklyPrice === null ? null : Math.round(weeklyPrice / 10) * 10

    return {
      name: room.name,
      image: images[0] ?? null,
      images,
      priceFrom: weeklyPrice,
      pricePerNight: nightlyPrice,
      priceLabel: displayedWeeklyPrice !== null
        ? `${formatCurrencyAmount(displayedWeeklyPrice, sourceCurrencySymbol)}/week`
        : nightlyPrice !== null
          ? `${formatCurrencyAmount(nightlyPrice, sourceCurrencySymbol)}/night`
          : room.price ?? null,
      nightlyPriceLabel: nightlyPrice !== null
        ? `${formatCurrencyAmount(nightlyPrice, sourceCurrencySymbol)}/night`
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
    gallery: [...new Set([...property.gallery, ...rooms.flatMap((room) => [...room.images, ...(room.floorplan ? [room.floorplan] : [])])])],
    amenities: property.amenities,
    inclusions: property.inclusions,
    roomFeatures: [...new Set(rooms.flatMap((room) => room.features))],
    contractTerms: [],
    depositNote: null,
    distance: property.distance,
    universities: property.universities,
    roomTypes: rooms.map((room) => ({
      name: room.name,
      image: room.image,
      images: room.images,
      priceFrom: room.priceFrom,
      pricePerNight: null,
      priceLabel: room.priceLabel,
      available: room.available,
      status: room.status,
      minimumOccupancy: room.minimumOccupancy,
      maximumOccupancy: room.maximumOccupancy,
      academicYear: null,
      features: room.features,
      priceConfidence: room.priceConfidence,
      floorplan: room.floorplan,
    })),
  }
})

const newProviderListings: AccommodationListingRecord[] = newProviderProperties.map((property) => {
  const slug = `${property.provider}-${property.sourcePath.split('/').filter(Boolean).at(-1)}`
  return {
    provider: property.provider,
    sourceId: `${property.provider}:${property.sourcePath}`,
    key: `${property.provider}:${property.sourcePath}`,
    slug,
    city: property.city,
    country: 'Germany',
    name: property.name,
    buildings: [{ name: property.name, address: property.address, postcode: null, unitsAvailable: null }],
    address: property.address,
    description: property.description,
    coverImage: null,
    photoSourceUrl: null,
    gallery: [],
    amenities: property.amenities,
    inclusions: property.inclusions,
    roomFeatures: [],
    contractTerms: property.contractTerms,
    depositNote: null,
    distance: null,
    universities: [],
    roomTypes: property.rooms.map((room) => ({
      sourceId: `${property.provider}:${room.sourcePath}`,
      name: room.name,
      image: null,
      images: [],
      priceFrom: room.monthlyFrom,
      pricePerNight: null,
      priceLabel: room.monthlyFrom === null ? null : `€${room.monthlyFrom.toLocaleString('en-US')}/month`,
      available: null,
      status: null,
      minimumOccupancy: null,
      maximumOccupancy: room.details.join(' ').match(/up to (\d+) people/i)
        ? Number(room.details.join(' ').match(/up to (\d+) people/i)?.[1])
        : null,
      academicYear: null,
      features: [
        ...(room.size ? [`Published size: ${room.size}`] : []),
        ...room.details,
        ...(property.provider === 'tannhaus'
          ? ['Warm rent; utilities may be billed by individual consumption depending on property and stay length.']
          : ['Published starting rent; amount can vary by room, stay length, and current promotion.']),
      ],
      priceConfidence: 'published' as const,
    })),
  }
})

// Keep the source relationship explicit and fail loudly if source data drifts.
for (const room of igluRooms) {
  if (!getIgluPropertyForRoom(room)) throw new Error(`Iglu room ${room.id} has no parent property ${room.parentPropertyId}`)
}

for (const listing of newProviderListings) {
  if (newProviderListings.filter((candidate) => candidate.sourceId === listing.sourceId).length !== 1) {
    throw new Error(`Duplicate property source ID ${listing.sourceId}`)
  }
  const roomIds = listing.roomTypes.map((room) => room.sourceId)
  if (new Set(roomIds).size !== roomIds.length) throw new Error(`Duplicate room source ID under ${listing.sourceId}`)
}

export const accommodationListings = [...vitaAccommodationListings, ...staceyListings, ...igluListings, ...newProviderListings]
export const allAccommodationListings = accommodationListings

export function getAccommodationProviderName(provider: AccommodationListingRecord['provider']): string {
  return {
    'vita-student': 'Vita Student',
    stacey: 'STACEY',
    iglu: 'Iglu',
    neonwood: 'Neon Wood',
    tannhaus: 'Tannhaus',
  }[provider]
}

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
