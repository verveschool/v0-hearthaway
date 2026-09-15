import { accommodationProperties as seedProperties } from './accommodation-data'
import { additionalAccommodationProperties, type CatalogProperty } from './partner-inventory'
import { propertyOverrides } from './property-overrides'

const normalizeProperty = (property: CatalogProperty): CatalogProperty => ({
  ...property,
  categories: Array.isArray(property.categories) ? property.categories : [],
  gallery: Array.isArray(property.gallery) && property.gallery.length ? property.gallery : [property.image].filter(Boolean),
  gallerySourceUrl: property.gallerySourceUrl ?? property.sourceUrl,
  universities: Array.isArray(property.universities) ? property.universities : [],
  roomTypes: Array.isArray(property.roomTypes) ? property.roomTypes : [],
  amenities: Array.isArray(property.amenities) ? property.amenities : [],
  highlights: Array.isArray(property.highlights) ? property.highlights : [],
})

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
