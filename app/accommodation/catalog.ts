import { accommodationProperties as seedProperties } from './accommodation-data'
import { additionalAccommodationProperties, type CatalogProperty } from './partner-inventory'
import { propertyOverrides } from './property-overrides'
import { getUniversitiesByCity } from '@/lib/place-data'

const fallbackGallery = ['/images/acc-halls.png', '/images/acc-studio.png', '/images/acc-kitchen.png', '/images/acc-shared.png', '/images/acc-homestay.png', '/images/city-liverpool.png', '/images/city-manchester.png']

const normalizeProperty = (property: CatalogProperty): CatalogProperty => {
  const existingGallery = Array.isArray(property.gallery) && property.gallery.length ? property.gallery : [property.image].filter(Boolean)
  const gallery = [...existingGallery]
  for (const image of fallbackGallery) {
    if (gallery.length >= 7) break
    if (!gallery.includes(image)) gallery.push(image)
  }

  const currency = property.currency ?? 'GBP'
  const fallbackPrice = currency === 'GBP' ? 175 : currency === 'EUR' ? 850 : currency === 'AUD' ? 520 : 600
  const universities = Array.isArray(property.universities) && property.universities.length
    ? property.universities
    : getUniversitiesByCity(property.city).map((university) => university.name)

  return {
    ...property,
    priceFrom: property.priceFrom > 0 ? property.priceFrom : fallbackPrice,
    currency,
    pricePeriod: property.pricePeriod && property.pricePeriod !== 'check' ? property.pricePeriod : currency === 'GBP' || currency === 'AUD' ? 'week' : 'month',
    categories: Array.isArray(property.categories) ? property.categories : [],
    gallery,
    gallerySourceUrl: property.gallerySourceUrl ?? property.sourceUrl,
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
export const accommodationCategories = [...new Set(accommodationProperties.flatMap((property) => property.categories))].sort()
export const accommodationRoomTypes = [...new Set(accommodationProperties.flatMap((property) => property.roomTypes))].sort()

export function getAccommodationBySlug(slug: string) {
  return accommodationProperties.find((property) => property.slug === slug)
}
