import { accommodationProperties as seedProperties } from './accommodation-data'
import { additionalAccommodationProperties, type CatalogProperty } from './partner-inventory'
import { accommodationPartners as partnerDirectory } from './partner-directory'

export const accommodationProperties: CatalogProperty[] = [
  ...(seedProperties as CatalogProperty[]),
  ...additionalAccommodationProperties,
]

export const accommodationCities = [...new Set(accommodationProperties.map((property) => property.city))].sort()
export const accommodationPartners = partnerDirectory.map((partner) => partner.slug)
export const accommodationCategories = [...new Set(accommodationProperties.flatMap((property) => property.categories ?? []))].sort()
export const accommodationRoomTypes = [...new Set(accommodationProperties.flatMap((property) => property.roomTypes))].sort()

export function getAccommodationBySlug(slug: string) {
  return accommodationProperties.find((property) => property.slug === slug)
}
