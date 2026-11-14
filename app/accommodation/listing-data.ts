import {
  accommodationFeedDevelopments,
  getDevelopmentDescription,
  type AccommodationFeedDevelopment,
} from './response-data'
import staceyInventory from './stacey-inventory.json'
import { getIgluPropertyForRoom, igluProperties, igluRooms } from './iglu-data'
import { newProviderProperties } from './neonwood-data'
import newProviderImages from './new-provider-images.json'
import { studyInnListings } from './studyinn-data'
import { formatCurrencyAmount, formatSourcePrice } from './presentation'

export { formatSourceAvailability, formatSourcePrice } from './presentation'

export type AccommodationRoomRecord = {
  sourceId?: string
  name: string
  description?: string | null
  accommodationFormat?: string | null
  configuration?: string | null
  image: string | null
  images: string[]
  imageLabels?: Record<string, string>
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
  priceSourceUrl?: string | null
  pricingBasis?: string | null
  floorplan?: string | null
  floorplans?: Array<{ image: string; label: string }>
  floorplanNote?: string | null
  publishedAreaSqm?: number | null
  sourcePublishedBeds?: number | null
  bedroomFeatures?: string[]
  bathroomFeatures?: string[]
  kitchenFeatures?: string[]
  furnishings?: string[]
  appliances?: string[]
  storage?: string[]
  studyFacilities?: string[]
  pricingOptions?: AccommodationPricingOption[]
  sourceUrl?: string | null
}

export type AccommodationPricingOption = {
  academicYear: string | null
  amount: number | null
  currency: string
  billingPeriod: 'week'
  contractDurationWeeks: number | null
  offerType: 'standard' | 'semester' | 'promotional'
  startDate?: string | null
  endDate?: string | null
  status: string | null
  sourceUrl: string
  note?: string | null
}

export type AccommodationListingRecord = {
  provider: 'vita-student' | 'stacey' | 'iglu' | 'neonwood' | 'study-inn'
  sourceBrand?: 'neonwood' | 'tannhaus'
  sourceId?: string
  key: string
  slug: string
  city: string
  country: string | null
  name: string
  propertyPriceFrom?: number | null
  propertyPriceLabel?: string | null
  propertyPriceConfidence?: 'published' | 'indicative' | null
  propertyPriceSourceUrl?: string | null
  propertyPricingBasis?: string | null
  buildings: Array<{ name: string | null; address: string | null; postcode: string | null; unitsAvailable: number | null }>
  address: string | null
  description: string | null
  coverImage: string | null
  photoSourceUrl: string | null
  gallery: string[]
  galleryLabels?: Record<string, string>
  highlights?: string[]
  facilities?: string[]
  transportConnections?: string[]
  landmarks?: string[]
  locationInfo?: string[]
  policies?: string[]
  sourceUrl?: string | null
  dataNotes?: string[]
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
    sourceUrl: development.buildings.find((building) => building.externalLink)?.externalLink ?? null,
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
      priceConfidence: room.priceFrom === undefined ? null : 'published' as const,
      priceSourceUrl: development.buildings.find((building) => building.externalLink)?.externalLink ?? null,
      pricingBasis: room.priceFrom === undefined ? null : 'Provider feed price_from value; weekly billing convention verified against public provider listings.',
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
      priceConfidence: sourceMonthlyPrice !== null || nightlyPrice !== null ? 'published' as const : null,
      priceSourceUrl: property.photoSourceUrl,
      pricingBasis: sourceMonthlyPrice !== null ? 'Source monthly rent converted to an equivalent weekly rate using 12 months ÷ 52 weeks.' : nightlyPrice !== null ? 'Source nightly rate.' : null,
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
    sourceUrl: `https://iglu.com.au${property.sourcePath}`,
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
      priceSourceUrl: `https://iglu.com.au${room.sourcePath}`,
      pricingBasis: room.priceConfidence === 'published' ? 'Published Iglu weekly rate.' : 'Indicative Iglu rate derived from published room pricing records.',
      floorplan: room.floorplan,
    })),
  }
})

type NewProviderImageCatalog = Record<
  'neonwood' | 'tannhaus',
  Record<string, { cover: string; rooms: Record<string, string[]> }>
>

const newProviderImageCatalog = newProviderImages as NewProviderImageCatalog

const newProviderListings: AccommodationListingRecord[] = newProviderProperties.map((property) => {
  const slug = `${property.sourceBrand}-${property.sourcePath.split('/').filter(Boolean).at(-1)}`
  const photoCatalog = newProviderImageCatalog[property.sourceBrand][property.sourcePath]
  if (!photoCatalog) throw new Error(`No image catalog for ${property.sourceBrand}:${property.sourcePath}`)
  const sourceHost = property.sourceBrand === 'neonwood' ? 'https://neonwood.com' : 'https://tannhaus.com'
  const roomTypes = property.rooms.map((room) => {
    const images = photoCatalog.rooms[room.name] ?? []
    const weeklyFrom = room.monthlyFrom === null
      ? null
      : (room.monthlyFrom * 12) / 52
    return {
      sourceId: `${property.sourceBrand}:${room.sourcePath}`,
      name: room.name,
      image: images[0] ?? null,
      images,
      priceFrom: weeklyFrom,
      pricePerNight: null,
      priceLabel: weeklyFrom === null ? null : `€${weeklyFrom.toLocaleString('en-US')}/week`,
      priceSourceUrl: `${sourceHost}${room.sourcePath.split('#')[0]}`,
      pricingBasis: room.monthlyFrom === null ? null : 'Official provider monthly starting rent converted to an equivalent weekly rate using 12 months ÷ 52 weeks.',
      available: null,
      status: 'Available',
      minimumOccupancy: null,
      maximumOccupancy: room.details.join(' ').match(/(?:up to|suitable for) (\d+) (?:people|resident)/i)
        ? Number(room.details.join(' ').match(/(?:up to|suitable for) (\d+) (?:people|resident)/i)?.[1])
        : null,
      academicYear: null,
      features: [
        ...(room.size ? [`Published size: ${room.size}`] : []),
        ...room.details,
        ...(property.sourceBrand === 'tannhaus'
          ? ['Warm rent; utilities may be billed by individual consumption depending on property and stay length.']
          : ['All-inclusive starting rent; weekly price is an indicative equivalent of the source monthly starting rent.']),
      ],
      priceConfidence: 'indicative' as const,
    }
  })
  const gallery = [...new Set([photoCatalog.cover, ...roomTypes.flatMap((room) => room.images)])]
  return {
    provider: property.provider,
    sourceBrand: property.sourceBrand,
    sourceId: `${property.sourceBrand}:${property.sourcePath}`,
    key: `${property.sourceBrand}:${property.sourcePath}`,
    slug,
    city: property.city,
    country: 'Germany',
    name: property.name,
    sourceUrl: `${sourceHost}${property.sourcePath}`,
    buildings: [{ name: property.name, address: property.address, postcode: null, unitsAvailable: null }],
    address: property.address,
    description: property.description,
    coverImage: photoCatalog.cover,
    photoSourceUrl: `${sourceHost}${property.sourcePath}`,
    gallery,
    amenities: property.amenities,
    inclusions: property.inclusions,
    roomFeatures: [],
    contractTerms: property.contractTerms,
    depositNote: null,
    distance: null,
    universities: [],
    roomTypes,
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

const rawAccommodationListings = [...vitaAccommodationListings, ...staceyListings, ...igluListings, ...newProviderListings, ...studyInnListings]

function currencySymbol(country: string | null, fallback?: string): string {
  if (country === 'United Kingdom') return '£'
  if (country === 'Australia') return 'A$'
  if (country === 'Spain' || country === 'Germany') return '€'
  return fallback ?? '£'
}

function formatCataloguePrice(amount: number, currency: string, billingPeriod: 'week' | 'night'): string {
  const rounded = Math.round(amount / 10) * 10
  return `${currency}${formatSourcePrice(rounded)}/${billingPeriod}`
}

function cleanListingText(value: string): string {
  return value
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !/\b(?:academic\s+year|academic\s+session|semester|session)\b|\b20\d{2}\s*[\/–-]\s*\d{2,4}\b/i.test(sentence))
    .join(' ')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function numericRoomPrice(room: AccommodationRoomRecord): { amount: number; billingPeriod: 'week' | 'night' } | null {
  if (room.priceFrom !== null && Number.isFinite(room.priceFrom) && room.priceFrom > 0) {
    return { amount: room.priceFrom, billingPeriod: 'week' }
  }
  if (room.pricePerNight !== null && Number.isFinite(room.pricePerNight) && room.pricePerNight > 0) {
    return { amount: room.pricePerNight, billingPeriod: 'night' }
  }
  const publishedOption = room.pricingOptions?.find((option) => option.amount !== null && option.amount > 0)
  return publishedOption?.amount ? { amount: publishedOption.amount, billingPeriod: publishedOption.billingPeriod } : null
}

function comparableRoomPrice(
  property: AccommodationListingRecord,
  room: AccommodationRoomRecord,
): { listing: AccommodationListingRecord; room: AccommodationRoomRecord; amount: number; billingPeriod: 'week' | 'night' } | null {
  const candidates = rawAccommodationListings.flatMap((candidateProperty) => candidateProperty.roomTypes.flatMap((candidateRoom) => {
    const price = numericRoomPrice(candidateRoom)
    if (!price) return []
    const sameCity = candidateProperty.city.toLocaleLowerCase() === property.city.toLocaleLowerCase()
    const sameCountry = candidateProperty.country === property.country
    const sameProvider = candidateProperty.provider === property.provider
    const sameType = candidateRoom.name.toLocaleLowerCase().includes(room.name.split(' ')[0].toLocaleLowerCase())
    const score = (sameCity ? 8 : 0) + (sameCountry ? 4 : 0) + (sameProvider ? 3 : 0) + (sameType ? 2 : 0)
    return [{ listing: candidateProperty, room: candidateRoom, ...price, score }]
  }))
  const best = candidates.sort((a, b) => b.score - a.score || a.amount - b.amount)[0]
  return best ?? null
}

function sanitizeListing(property: AccommodationListingRecord): AccommodationListingRecord {
  const rooms = property.roomTypes.map((room) => {
    let price = numericRoomPrice(room)
    let confidence = room.priceConfidence ?? 'published'
    let priceSourceUrl = room.priceSourceUrl ?? room.sourceUrl ?? property.sourceUrl ?? property.photoSourceUrl
    let pricingBasis = room.pricingBasis ?? (price ? 'Published source price; source page retained with this room record.' : null)

    if (!price) {
      const comparable = comparableRoomPrice(property, room)
      if (comparable) {
        const factor = comparable.billingPeriod === 'week' ? 1 : 7
        price = { amount: comparable.amount * factor, billingPeriod: 'week' }
        confidence = 'indicative'
        priceSourceUrl = comparable.room.priceSourceUrl ?? comparable.room.sourceUrl ?? comparable.listing.sourceUrl ?? null
        pricingBasis = `Indicative estimate derived from ${comparable.listing.name} in ${comparable.listing.city}, using the closest priced room category (${comparable.room.name}) at ${formatSourcePrice(comparable.amount)} per ${comparable.billingPeriod}; weekly conversion uses 7 nights where applicable.`
      }
    }

    const symbol = currencySymbol(property.country, room.priceLabel?.match(/^(A\$|[£€$])/i)?.[0])
    const priceLabel = price ? formatCataloguePrice(price.amount, symbol, price.billingPeriod) : ''
    return {
      ...room,
      name: cleanListingText(room.name),
      description: room.description ? cleanListingText(room.description) : room.description,
      accommodationFormat: room.accommodationFormat ? cleanListingText(room.accommodationFormat) : room.accommodationFormat,
      configuration: room.configuration ? cleanListingText(room.configuration) : room.configuration,
      features: room.features?.map(cleanListingText).filter(Boolean),
      bedroomFeatures: room.bedroomFeatures?.map(cleanListingText).filter(Boolean),
      bathroomFeatures: room.bathroomFeatures?.map(cleanListingText).filter(Boolean),
      kitchenFeatures: room.kitchenFeatures?.map(cleanListingText).filter(Boolean),
      furnishings: room.furnishings?.map(cleanListingText).filter(Boolean),
      appliances: room.appliances?.map(cleanListingText).filter(Boolean),
      storage: room.storage?.map(cleanListingText).filter(Boolean),
      studyFacilities: room.studyFacilities?.map(cleanListingText).filter(Boolean),
      priceFrom: price?.billingPeriod === 'week' ? price.amount : room.priceFrom,
      pricePerNight: price?.billingPeriod === 'night' ? price.amount : room.pricePerNight,
      priceLabel,
      nightlyPriceLabel: null,
      priceConfidence: price ? confidence : 'indicative',
      priceSourceUrl,
      pricingBasis: pricingBasis ?? 'Indicative local comparable; a source URL and comparison basis are retained for review.',
    }
  })

  const pricedRooms = rooms.flatMap((room) => {
    const price = numericRoomPrice(room)
    return price ? [{ room, price }] : []
  })
  const starting = pricedRooms.sort((a, b) => a.price.amount - b.price.amount)[0]
  let propertyPriceFrom = property.propertyPriceFrom ?? starting?.price.amount ?? null
  let propertyPriceConfidence = property.propertyPriceConfidence ?? (starting ? starting.room.priceConfidence ?? 'published' : null)
  let propertyPriceSourceUrl = property.propertyPriceSourceUrl ?? (starting ? starting.room.priceSourceUrl : property.sourceUrl ?? property.photoSourceUrl)
  let propertyPricingBasis = property.propertyPricingBasis ?? (starting ? `Lowest displayed room price at ${property.name}.` : null)
  if (propertyPriceFrom === null) {
    const sameCountry = rawAccommodationListings
      .filter((candidate) => candidate.country === property.country)
      .flatMap((candidate) => candidate.roomTypes.map((room) => ({ listing: candidate, room, price: numericRoomPrice(room) })))
      .filter((candidate) => candidate.price !== null)
    const fallback = sameCountry[0]
    if (fallback?.price) {
      propertyPriceFrom = fallback.price.amount
      propertyPriceConfidence = 'indicative'
      propertyPriceSourceUrl = fallback.room.priceSourceUrl ?? fallback.listing.sourceUrl ?? null
      propertyPricingBasis = `Indicative property starting estimate based on ${fallback.listing.name} room ${fallback.room.name}, the nearest available catalogue comparable in ${property.country ?? 'the same market'}.`
    }
  }
  const propertySymbol = currencySymbol(property.country)

  return {
    ...property,
    name: cleanListingText(property.name),
    description: property.description ? cleanListingText(property.description) : property.description,
    highlights: property.highlights?.map(cleanListingText).filter(Boolean),
    facilities: property.facilities?.map(cleanListingText).filter(Boolean),
    transportConnections: property.transportConnections?.map(cleanListingText).filter(Boolean),
    landmarks: property.landmarks?.map(cleanListingText).filter(Boolean),
    locationInfo: property.locationInfo?.map(cleanListingText).filter(Boolean),
    policies: property.policies?.map(cleanListingText).filter(Boolean),
    amenities: property.amenities.map(cleanListingText).filter(Boolean),
    inclusions: property.inclusions.map(cleanListingText).filter(Boolean),
    roomFeatures: property.roomFeatures.map(cleanListingText).filter(Boolean),
    contractTerms: property.contractTerms.map(cleanListingText).filter(Boolean),
    buildings: property.buildings.map((building) => ({ ...building, name: building.name ? cleanListingText(building.name) : null })),
    roomTypes: rooms,
    propertyPriceFrom,
    propertyPriceLabel: propertyPriceFrom !== null ? formatCataloguePrice(propertyPriceFrom, propertySymbol, starting?.price.billingPeriod ?? 'week') : '',
    propertyPriceConfidence,
    propertyPriceSourceUrl,
    propertyPricingBasis,
  }
}

export const accommodationListings = rawAccommodationListings.map(sanitizeListing)
export const allAccommodationListings = accommodationListings

export function getAccommodationProviderName(provider: AccommodationListingRecord['provider']): string {
  return {
    'vita-student': 'Vita Student',
    stacey: 'STACEY',
    iglu: 'Iglu',
    neonwood: 'Neon Wood',
    'study-inn': 'Study Inn',
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
