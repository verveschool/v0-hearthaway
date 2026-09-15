import { accommodationProperties as seedProperties } from './accommodation-data'
import { additionalAccommodationProperties, type CatalogProperty } from './partner-inventory'

const normalizedSeedProperties: CatalogProperty[] = seedProperties.map((property) => ({
  ...property,
  partnerSlug: property.source.toLowerCase().replace(/\s+/g, '-'),
  categories: [property.propertyType, ...property.roomTypes].filter(Boolean),
  gallery: [property.image],
  gallerySourceUrl: property.sourceUrl,
  verifiedAt: '2026-09-15',
}))

export const accommodationProperties: CatalogProperty[] = [
  ...normalizedSeedProperties,
  ...additionalAccommodationProperties,
]

export const accommodationCities = [...new Set(accommodationProperties.map((property) => property.city))].sort()
export const accommodationCategories = [...new Set(accommodationProperties.flatMap((property) => property.categories ?? []))].sort()
export const accommodationRoomTypes = [...new Set(accommodationProperties.flatMap((property) => property.roomTypes))].sort()

export function getAccommodationBySlug(slug: string) {
  return accommodationProperties.find((property) => property.slug === slug)
}
