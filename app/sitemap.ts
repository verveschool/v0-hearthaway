import type { MetadataRoute } from 'next'
import { countries } from '@/lib/country-data'
import { cities, universities } from '@/lib/place-data'
import { movingAbroadArticles } from '@/lib/moving-abroad-data'
import { accommodationListings, accommodationRoomListings } from '@/app/accommodation/listing-data'

const baseUrl = 'https://hearthaway.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/universities',
    '/cities',
    '/about',
    '/how-it-works',
    '/moving-abroad',
    '/get-matched',
    '/accommodation',
    '/accommodation/rooms',
    '/partners',
    '/careers',
    '/privacy',
    '/terms',
    '/cookies',
  ]

  const countryRoutes = countries.map((country) => `/${country.slug}`)
  const resourceRoutes = movingAbroadArticles.map((article) => `/moving-abroad/${article.slug}`)
  const cityRoutes = cities.map((city) => `/cities/${city.slug}`)
  const universityRoutes = universities.map((university) => `/universities/${university.slug}`)
  const accommodationRoutes = [
    ...accommodationListings.map((property) => `/accommodation/property/${property.slug}`),
    ...accommodationRoomListings.map((room) => `/accommodation/rooms/${room.slug}`),
  ]

  const allRoutes = Array.from(new Set([
    ...staticRoutes,
    ...countryRoutes,
    ...resourceRoutes,
    ...cityRoutes,
    ...universityRoutes,
    ...accommodationRoutes,
  ]))

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/accommodation') ? 0.9 : route.startsWith('/universities') || route.startsWith('/cities') ? 0.8 : 0.7,
  }))
}
