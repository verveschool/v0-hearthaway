import { MetadataRoute } from 'next'
import { cities, universities } from '@/lib/place-data'
import { accommodationListings, accommodationRoomListings } from '@/app/accommodation/listing-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hearthaway.com'

  // Define static routes
  const staticRoutes = [
    '',
    '/about',
    '/how-it-works',
    '/get-matched',
    '/partners',
    '/careers',
    '/privacy',
    '/terms',
    '/cookies',
  ]

  // Define country routes
  const countryRoutes = [
    '/uk',
    '/ireland',
    '/france',
    '/germany',
    '/australia',
    '/usa',
    '/canada',
    '/spain',
    '/italy',
    '/singapore',
    '/austria',
    '/belgium',
    '/hungary',
    '/malta',
    '/uae',
    '/netherlands',
    '/malaysia',
  ]

  const placeRoutes = [
    ...cities.map((city) => `/cities/${city.slug}`),
    ...universities.map((university) => `/universities/${university.slug}`),
  ]
  const accommodationRoutes = [
    '/accommodation',
    '/accommodation/rooms',
    ...accommodationListings.map((property) => `/accommodation/property/${property.slug}`),
    ...accommodationRoomListings.map((room) => `/accommodation/rooms/${room.slug}`),
  ]

  const allRoutes = [...staticRoutes, ...countryRoutes, ...placeRoutes, ...accommodationRoutes]

  const sitemapEntries: MetadataRoute.Sitemap = allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/accommodation') ? 0.9 : route.startsWith('/cities/') || route.startsWith('/universities/') ? 0.8 : route.startsWith('/uk') || route.startsWith('/ireland') ? 0.8 : 0.6,
  }))

  return sitemapEntries
}
