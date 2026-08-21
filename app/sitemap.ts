import { MetadataRoute } from 'next'

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
    '/uae',
  ]

  // Combine all routes
  const allRoutes = [...staticRoutes, ...countryRoutes]

  const sitemapEntries: MetadataRoute.Sitemap = allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/uk') || route.startsWith('/ireland') ? 0.8 : 0.6,
  }))

  return sitemapEntries
}
