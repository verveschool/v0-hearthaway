import { accommodationProperties as seedProperties } from './accommodation-data'
import { additionalAccommodationProperties, type CatalogProperty } from './partner-inventory'
import { accommodationPartners as partnerDirectory } from './partner-directory'

const normalizedSeedProperties: CatalogProperty[] = seedProperties.map((property) => {
  const partnerSlug = property.source.toLowerCase().replace(/\s+/g, '-')
  return {
    ...property,
    partnerSlug,
    categories: [property.propertyType, ...property.roomTypes].filter(Boolean),
    gallery: [property.image],
    gallerySourceUrl: property.sourceUrl,
  }
})

export const accommodationProperties: CatalogProperty[] = [
  ...normalizedSeedProperties,
  ...additionalAccommodationProperties,
]

export const accommodationCities = [...new Set(accommodationProperties.map((property) => property.city))].sort()
export const accommodationPartners = partnerDirectory.map((partner) => partner.slug)
export const accommodationCategories = [...new Set(accommodationProperties.flatMap((property) => property.categories ?? []))].sort()
export const accommodationRoomTypes = [...new Set(accommodationProperties.flatMap((property) => property.roomTypes))].sort()

export function getAccommodationBySlug(slug: string) {
  return accommodationProperties.find((property) => property.slug === slug)
}
