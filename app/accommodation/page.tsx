import { catalogueDatabaseEnabled, cataloguePageSize, cataloguePropertyPage, catalogueSearchParam, type CatalogueSearchParams } from './catalogue-server'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { permanentRedirect } from 'next/navigation'
import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import Footer from '@/components/footer'
import AccommodationListings from '@/components/accommodation/accommodation-listings'
import { accommodationListings } from './listing-data'
import { getWeeklyCurrency, type PropertyFilters } from './property-filters'

export const metadata: Metadata = {
  title: 'Student Properties | HearthAway',
  description:
    'Explore student properties by city, compare their details, and browse student room types.',
}

type AccommodationPageProps = {
  searchParams: Promise<CatalogueSearchParams>
}

export default async function AccommodationPage({
  searchParams,
}: AccommodationPageProps) {
  const params = await searchParams
  const provider = catalogueSearchParam(params.provider)
  const city = catalogueSearchParam(params.city)
  const query = catalogueSearchParam(params.query)?.trim().slice(0, 100)
  const page = catalogueSearchParam(params.page)
  const currency = getWeeklyCurrency(catalogueSearchParam(params.currency))
  const max = catalogueSearchParam(params.maxWeekly)
  const sort = catalogueSearchParam(params.sort)
  const databaseEnabled = catalogueDatabaseEnabled()
  const filters: PropertyFilters = databaseEnabled ? {} : {
    currency,
    maxWeekly: currency && max && /^\d{1,7}$/.test(max) && Number(max) > 0 ? Number(max) : undefined,
    roomType: catalogueSearchParam(params.roomType)?.trim().slice(0, 80),
    sort: currency && (sort === 'price-asc' || sort === 'price-desc') ? sort : undefined,
  }


  if (provider === 'neonhomes' || provider === 'neon-homes' || provider === 'neonwood' || provider === 'tannhaus') {
    const params = new URLSearchParams({ provider: 'neon-wood' })
    if (city) params.set('city', city)
    if (query) params.set('query', query)
    for (const [key, value] of Object.entries(filters)) if (value) params.set(key, String(value))
    permanentRedirect(`/accommodation?${params.toString()}`)
  }

  const visibleListings = provider === 'neon-wood'
    ? accommodationListings.filter((listing) => listing.provider === 'neonwood')
    : provider === 'stacey' || provider === 'vita-student' || provider === 'iglu' || provider === 'study-inn'
      ? accommodationListings.filter((listing) => listing.provider === provider)
      : accommodationListings

  const cities = [...new Set(visibleListings.map((listing) => listing.city))].sort()
  const requestedCity = city?.trim().slice(0, 120)
  const initialCity = cities.find((item) => item.toLowerCase() === requestedCity?.toLowerCase()) ?? (requestedCity || 'all')
  const initialQuery = query ?? ''
  const databasePage = databaseEnabled ? await cataloguePropertyPage({
    provider: provider === 'neon-wood' ? 'neonwood' : ['stacey','vita-student','iglu','study-inn'].find(value => value === provider),
    city: initialCity === 'all' ? undefined : initialCity, query: initialQuery, page,
  }) : undefined
  const pageUrl = (target: number) => {
    const pagination = new URLSearchParams({ page: String(target) })
    if (provider) pagination.set('provider', provider)
    if (initialCity !== 'all') pagination.set('city', initialCity)
    if (initialQuery) pagination.set('query', initialQuery)
    for (const [key, value] of Object.entries(filters)) if (value) pagination.set(key, String(value))
    return `/accommodation?${pagination}`
  }
  const publicListings = databasePage?.listings ?? visibleListings.map((listing) => {
    const publicListing = {
      ...listing,
      roomTypes: listing.roomTypes.map((room) => {
        const publicRoom = { ...room } as Record<string, unknown>
        delete publicRoom.priceSourceUrl
        delete publicRoom.pricingBasis
        delete publicRoom.sourceUrl
        delete publicRoom.academicYear
        delete publicRoom.pricingOptions
        delete publicRoom.status
        delete publicRoom.available
        return publicRoom as unknown as typeof room
      }),
      buildings: listing.buildings.map((building) => ({
        ...building,
        unitsAvailable: null,
      })),
    } as Record<string, unknown>
    delete publicListing.propertyPriceSourceUrl
    delete publicListing.propertyPricingBasis
    delete publicListing.sourceUrl
    delete publicListing.photoSourceUrl
    delete publicListing.dataNotes
    return publicListing as unknown as typeof listing
  })

  return (
    <>
      <Navigation />

      <main>
        <PageBanner
          title="Find your student home"
          action={{
            label: 'Browse room types',
            href: initialCity === 'all' ? '/accommodation/rooms' : `/accommodation/rooms?city=${encodeURIComponent(initialCity)}`,
          }}
        />

        <section
          aria-label="Property listings"
          className="bg-[#F7F6F3] px-6 py-12 lg:px-8 lg:py-16"
        >
          <div className="mx-auto max-w-7xl">
            <AccommodationListings
              key={JSON.stringify([provider, initialCity, initialQuery, filters])}
              cities={cities}
              listings={publicListings}
              serverPage={databasePage ? {
                total: databasePage.total,
                previous: databasePage.current > 1 ? pageUrl(databasePage.current - 1) : undefined,
                next: databasePage.current * cataloguePageSize < databasePage.total ? pageUrl(databasePage.current + 1) : undefined,
              } : undefined}
              initialCity={initialCity}
              initialQuery={initialQuery}
              filters={filters}
              advancedFiltersEnabled={!databaseEnabled}
              provider={provider}
            />

            <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#00319D] p-6 text-white sm:flex-row sm:items-center sm:p-8">
              <div>
                <h2 className="font-heading text-xl font-extrabold sm:text-2xl">
                  Need help choosing?
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Our team can help you compare options near your university.
                </p>
              </div>

              <Link
                href="/get-matched"
                className="brand-cta inline-flex min-h-11 shrink-0 items-center gap-2 px-5 py-3 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00319D]"
              >
                Get matched
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
