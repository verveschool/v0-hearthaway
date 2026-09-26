import { accommodationProperties as seedProperties } from './accommodation-data'
import { additionalAccommodationProperties, type CatalogProperty } from './partner-inventory'
import { propertyOverrides } from './property-overrides'
import { getUniversitiesByCity } from '@/lib/place-data'
import { formatAccommodationPrice, formatAccommodationPricePeriod } from './formatters'
import type { AccommodationCurrency, AccommodationPricePeriod, AccommodationRoomPrice, AccommodationRoomType } from './accommodation-data'

/**
 * Stable, human-legible, collision-free slug for one room type at one property.
 * Used as the public listing slug so `${property.slug}--${slugifyRoomName(name)}`
 * never collides across properties and never changes as long as the room's own
 * name doesn't change.
 */
function slugifyRoomName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'room'
}

/**
 * Inventory ("this property offers this room type") is derived from every name
 * in `roomTypes` and must never be filtered by availability, stock or booking
 * status. When a property doesn't yet have a curated `rooms` entry for a given
 * name, this synthesizes one WITHOUT inventing a price: only the property's own
 * confirmed starting price — attached to the first/entry-level room type, which
 * is what a source's "from" price describes — is reused, and every other room
 * type is marked "price on enquiry" rather than hidden or given a copied price.
 */
function buildRooms(property: CatalogProperty, currency: AccommodationCurrency, pricePeriod: AccommodationPricePeriod): AccommodationRoomType[] {
  if (Array.isArray(property.rooms) && property.rooms.length) return property.rooms

  const roomTypeNames = Array.isArray(property.roomTypes) ? property.roomTypes : []
  const hasConfirmedStartingPrice = Number.isFinite(property.priceFrom) && property.priceFrom > 0

  return roomTypeNames.map((name, index) => ({
    name,
    availabilityNote: property.availabilityNote,
    price: index === 0 && hasConfirmedStartingPrice
      ? {
          value: property.priceFrom,
          currency,
          period: pricePeriod,
          indicative: true,
          conditions: 'Starting price for this property; confirm the exact rate for this room type, dates and contract length with the provider.',
        }
      : { currency, period: pricePeriod, priceOnEnquiry: true },
  }))
}

const normalizeProperty = (property: CatalogProperty): CatalogProperty => {
  const gallery = Array.isArray(property.gallery) && property.gallery.length ? property.gallery : [property.image].filter(Boolean)
  // The cover image is always derived from the first gallery photo so the listing
  // card, the property page banner, and the social sharing preview can never
  // diverge — a property's cover photo is defined in exactly one place: gallery[0].
  const image = gallery[0] ?? property.image

  const currency = property.currency ?? 'GBP'
  const pricePeriod = property.pricePeriod && property.pricePeriod !== 'check' ? property.pricePeriod : currency === 'GBP' || currency === 'AUD' ? 'week' : 'month'
  const pricingSourceUrl = property.pricingSourceUrl || property.sourceUrl
  const locationMapUrl = property.locationMapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.address}, ${property.city}, ${property.country}`)}`
  const universities = Array.isArray(property.universities) && property.universities.length
    ? property.universities
    : getUniversitiesByCity(property.city).map((university) => university.name)
  const roomTypes = Array.isArray(property.roomTypes) ? property.roomTypes : []
  const rooms = buildRooms(property, currency, pricePeriod)
  // The first room type's listing is the canonical destination for anything that
  // still needs to link at the property level (old bookmarks, city/university
  // pages grouping by property) now that `/accommodation/[slug]` is a listing page.
  const primaryListingSlug = rooms.length ? `${property.slug}--${slugifyRoomName(rooms[0].name)}` : property.slug

  return {
    ...property,
    // A missing price remains unconfirmed rather than being represented by an invented fallback amount.
    priceFrom: Number.isFinite(property.priceFrom) && property.priceFrom > 0 ? property.priceFrom : 0,
    currency,
    pricePeriod,
    categories: Array.isArray(property.categories) ? property.categories : [],
    image,
    gallery,
    // Source URLs remain in the inventory data for internal maintenance and are intentionally not exposed in the rendered catalogue.
    gallerySourceUrl: '',
    sourceUrl: '',
    universities,
    // Every room type the source lists stays in the catalogue regardless of current availability, stock or booking status.
    roomTypes,
    rooms,
    primaryListingSlug,
    amenities: Array.isArray(property.amenities) ? property.amenities : [],
    highlights: Array.isArray(property.highlights) ? property.highlights : [],
    // Every displayed price is a tentative starting point sourced from the partner or listing page.
    // Keep the source in data for maintenance while the public page makes the uncertainty explicit.
    pricingNote: property.pricingNote ?? 'Tentative starting price; confirm the current room offer, dates, contract length, bills and deposit before booking.',
    pricingSourceUrl,
    locationMapUrl,
  }
}

const applyOverride = (property: CatalogProperty): CatalogProperty => normalizeProperty({
  ...property,
  ...(propertyOverrides[property.slug] ?? {}),
})

const normalizedSeedProperties: CatalogProperty[] = seedProperties.map((property) => applyOverride(normalizeProperty({
  ...property,
  partnerSlug: property.source.toLowerCase().replace(/\s+/g, '-'),
  categories: [property.propertyType, ...property.roomTypes].filter(Boolean),
  gallery: [property.image],
  gallerySourceUrl: property.sourceUrl,
  verifiedAt: '2026-09-15',
})))

const normalizedAdditionalProperties: CatalogProperty[] = additionalAccommodationProperties.map(applyOverride)

const allAccommodationProperties: CatalogProperty[] = [
  ...normalizedSeedProperties,
  ...normalizedAdditionalProperties,
]

/**
 * A property is eligible only when its own source, starting price, and at least
 * one specific room offer have been checked. Other room types remain visible on
 * the detail page but are marked as needing confirmation instead of excluding
 * the entire property from the catalogue.
 */
export function hasVerifiedRoomPhoto(property: CatalogProperty): boolean {
  return (property.rooms ?? []).some((room) => Boolean(room.image))
}

/**
 * One distinct room type = one distinct listing. A listing is a `(property, room)`
 * pair: everything room-specific (photo, price, features, tenancy, availability)
 * comes from `room`; everything property-level (address, provider, amenities,
 * universities, gallery, location map) is inherited by reference from `property`
 * and never duplicated. Room- and property-level amenities are kept as two
 * separate arrays on purpose so they're never conflated in the UI.
 */
export type AccommodationListingSibling = Readonly<{ slug: string; name: string; price: AccommodationRoomPrice }>

export type AccommodationListing = Readonly<{
  slug: string
  propertySlug: string
  property: CatalogProperty
  room: AccommodationRoomType
  /** Room-level amenities only, e.g. private bathroom, kitchenette. Never merged with property-level amenities. */
  roomAmenities: string[]
  /** Building-wide amenities only, e.g. gym, laundry, reception. Never merged with room-level amenities. */
  propertyAmenities: string[]
  /** The other room types at the same property, for a "other room types here" section. */
  siblingListings: AccommodationListingSibling[]
  /** True only when this specific room type has its own source photo, not just some room somewhere at the property. */
  hasVerifiedRoomPhoto: boolean
}>

function buildListingSlug(propertySlug: string, roomName: string): string {
  return `${propertySlug}--${slugifyRoomName(roomName)}`
}

export function hasListingLevelEvidence(property: CatalogProperty): boolean {
  const hasSource = Boolean(property.pricingSourceUrl)
  const hasPropertyPrice = Number.isFinite(property.priceFrom) && property.priceFrom > 0
  const hasPropertyPhoto = Boolean(property.image) && property.gallery.length > 0

  // Keep a sourced property visible when its room-level photo is still being
  // confirmed; the card and detail page state that limitation explicitly.
  return hasSource && hasPropertyPrice && hasPropertyPhoto
}

export const accommodationProperties: CatalogProperty[] = allAccommodationProperties.filter(hasListingLevelEvidence)

export const accommodationCities = [...new Set(accommodationProperties.map((property) => property.city))].sort()
export const accommodationCountries = [...new Set(accommodationProperties.map((property) => property.country))].sort()

export const accommodationCitiesByCountry: ReadonlyMap<string, readonly string[]> = new Map(
  accommodationCountries.map((country) => [
    country,
    [...new Set(accommodationProperties.filter((property) => property.country === country).map((property) => property.city))].sort(),
  ]),
)

export function getAccommodationCitiesByCountry(country: string): readonly string[] {
  return accommodationCitiesByCountry.get(country) ?? []
}

export const accommodationCategories = [...new Set(accommodationProperties.flatMap((property) => property.categories))].sort()
export const accommodationRoomTypes = [...new Set(accommodationProperties.flatMap((property) => property.roomTypes))].sort()

type ConfirmedAccommodationPricePeriod = Exclude<AccommodationPricePeriod, 'check'>

export type AccommodationBudgetRange = Readonly<{
  value: string
  currency: AccommodationCurrency
  upperBound: number
  pricePeriod: ConfirmedAccommodationPricePeriod
  label: string
}>

function getBudgetIncrement(amount: number): number {
  if (amount < 1_000) return 50
  if (amount < 5_000) return 100
  return 500
}

/**
 * Produces comparable price ceilings from confirmed catalogue prices only. Prices
 * are kept separate by currency and billing period so weekly and monthly amounts
 * are never treated as equivalent.
 */
export function getAccommodationBudgetRanges(properties: readonly CatalogProperty[]): AccommodationBudgetRange[] {
  const ranges = new Map<string, AccommodationBudgetRange>()

  for (const property of properties) {
    if (!Number.isFinite(property.priceFrom) || property.priceFrom <= 0 || !property.pricePeriod || property.pricePeriod === 'check') continue

    const upperBound = Math.ceil(property.priceFrom / getBudgetIncrement(property.priceFrom)) * getBudgetIncrement(property.priceFrom)
    const key = `${property.currency}:${property.pricePeriod}:${upperBound}`

    ranges.set(key, {
      value: key,
      currency: property.currency,
      upperBound,
      pricePeriod: property.pricePeriod,
      label: `Up to ${formatAccommodationPrice(property.currency, upperBound)}${formatAccommodationPricePeriod(property.pricePeriod)}`,
    })
  }

  return [...ranges.values()].sort((first, second) => first.currency.localeCompare(second.currency) || first.pricePeriod.localeCompare(second.pricePeriod) || first.upperBound - second.upperBound)
}

/**
 * One entry per room type per property, flattened from `property.rooms` (which is
 * either curated data or, for uncurated room names, a price-on-enquiry entry
 * synthesized by `buildRooms` above) &mdash; coverage is automatic for every
 * property, current and future, with no re-entry of data required.
 */
export const accommodationListings: AccommodationListing[] = accommodationProperties.flatMap((property) => {
  const rooms = property.rooms ?? []
  return rooms.map((room, index): AccommodationListing => ({
    slug: buildListingSlug(property.slug, room.name),
    propertySlug: property.slug,
    property,
    room,
    roomAmenities: room.features ?? [],
    propertyAmenities: property.amenities,
    siblingListings: rooms
      .filter((_, siblingIndex) => siblingIndex !== index)
      .map((sibling) => ({ slug: buildListingSlug(property.slug, sibling.name), name: sibling.name, price: sibling.price })),
    hasVerifiedRoomPhoto: Boolean(room.image),
  }))
})

export function getAccommodationListingBySlug(slug: string): AccommodationListing | undefined {
  return accommodationListings.find((listing) => listing.slug === slug)
}

export function getAccommodationBySlug(slug: string) {
  return accommodationProperties.find((property) => property.slug === slug)
}
