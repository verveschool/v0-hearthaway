import { accommodationListings, getAccommodationRoomBySlug } from './listing-data'
import { catalogueDatabaseEnabled, catalogueProperty, catalogueRoom } from './catalogue-server'

export async function getEnquiryContext(propertySlug?: string, roomSlug?: string) {
  const database = catalogueDatabaseEnabled()
  const entry = roomSlug && roomSlug.length <= 250
    ? database ? await catalogueRoom(roomSlug) : getAccommodationRoomBySlug(roomSlug)
    : undefined
  const property = roomSlug ? entry?.property : propertySlug && propertySlug.length <= 250
    ? database ? await catalogueProperty(propertySlug) : accommodationListings.find((listing) => listing.slug === propertySlug)
    : undefined
  if (!property) return undefined
  return {
    propertySlug: property.slug,
    propertyName: property.name,
    city: property.city,
    country: property.country,
    roomSlug: entry?.slug,
    roomName: entry?.room.name,
  }
}

export type EnquiryContext = NonNullable<Awaited<ReturnType<typeof getEnquiryContext>>>
