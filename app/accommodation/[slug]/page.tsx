import { catalogueDatabaseEnabled, catalogueProperty, catalogueRoom } from '../catalogue-server'
import { notFound, redirect } from 'next/navigation'
import { accommodationListings, getAccommodationRoomBySlug } from '../listing-data'

type LegacyAccommodationPageProps = {
  params: Promise<{ slug: string }>
}

export default async function LegacyAccommodationPage({ params }: LegacyAccommodationPageProps) {
  const { slug } = await params
  if ((catalogueDatabaseEnabled() ? await catalogueProperty(slug) : accommodationListings.some((listing) => listing.slug === slug))) {
    redirect(`/accommodation/property/${slug}`)
  }
  if (catalogueDatabaseEnabled() ? await catalogueRoom(slug) : getAccommodationRoomBySlug(slug)) {
    redirect(`/accommodation/rooms/${slug}`)
  }
  notFound()
}
