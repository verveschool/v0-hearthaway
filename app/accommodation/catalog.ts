import { accommodationProperties as seedProperties } from './accommodation-data'
import { additionalAccommodationProperties, type CatalogProperty } from './partner-inventory'
import { propertyOverrides } from './property-overrides'
import { getUniversitiesByCity } from '@/lib/place-data'
import { formatAccommodationPrice, formatAccommodationPricePeriod } from './formatters'
import type { AccommodationCurrency, AccommodationPricePeriod } from './accommodation-data'

const fallbackGallery = ['/images/acc-halls.png', '/images/acc-studio.png', '/images/acc-kitchen.png', '/images/acc-shared.png', '/images/acc-homestay.png', '/images/city-liverpool.png', '/images/city-manchester.png']

const normalizeProperty = (property: CatalogProperty): CatalogProperty => {
  const existingGallery = Array.isArray(property.gallery) && property.gallery.length ? property.gallery : [property.image].filter(Boolean)
  const gallery = [...existingGallery]
  for (const image of fallbackGallery) {
    if (gallery.length >= 7) break
    if (!gallery.includes(image)) gallery.push(image)
  }

  const currency = property.currency ?? 'GBP'
  const universities = Array.isArray(property.universities) && property.universities.length
    ? property.universities
    : getUniversitiesByCity(property.city).map((university) => university.name)

  return {
    ...property,
    // A missing price remains unconfirmed rather than being represented by an invented fallback amount.
    priceFrom: Number.isFinite(property.priceFrom) && property.priceFrom > 0 ? property.priceFrom : 0,
    currency,
    pricePeriod: property.pricePeriod && property.pricePeriod !== 'check' ? property.pricePeriod : currency === 'GBP' || currency === 'AUD' ? 'week' : 'month',
    categories: Array.isArray(property.categories) ? property.categories : [],
    gallery,
    // Source URLs remain in the inventory data for internal maintenance and are intentionally not exposed in the rendered catalogue.
    gallerySourceUrl: '',
    sourceUrl: '',
    universities,
    roomTypes: Array.isArray(property.roomTypes) ? property.roomTypes : [],
    amenities: Array.isArray(property.amenities) ? property.amenities : [],
    highlights: Array.isArray(property.highlights) ? property.highlights : [],
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

export const accommodationProperties: CatalogProperty[] = [
  ...normalizedSeedProperties,
  ...normalizedAdditionalProperties,
]

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

export function getAccommodationBySlug(slug: string) {
  return accommodationProperties.find((property) => property.slug === slug)
}
