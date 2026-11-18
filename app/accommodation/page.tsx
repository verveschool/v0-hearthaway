import { catalogueDatabaseEnabled, cataloguePageSize, cataloguePropertyPage, catalogueSearchParam, type CatalogueSearchParams } from './catalogue-server'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { permanentRedirect } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import AccommodationListings from '@/components/accommodation/accommodation-listings'
import { accommodationListings } from './listing-data'

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

  if (provider === 'neonhomes' || provider === 'neon-homes' || provider === 'neonwood' || provider === 'tannhaus') {
    const params = new URLSearchParams({ provider: 'neon-wood' })
    if (city) params.set('city', city)
    if (query) params.set('query', query)
    permanentRedirect(`/accommodation?${params.toString()}`)
  }

  const visibleListings = provider === 'neon-wood'
    ? accommodationListings.filter((listing) => listing.provider === 'neonwood')
    : provider === 'stacey' || provider === 'vita-student' || provider === 'iglu' || provider === 'study-inn'
      ? accommodationListings.filter((listing) => listing.provider === provider)
      : accommodationListings

  const cities = [...new Set(visibleListings.map((listing) => listing.city))].sort()
  const initialCity = city && cities.includes(city) ? city : 'all'
  const initialQuery = query ?? ''
  const databasePage = catalogueDatabaseEnabled() ? await cataloguePropertyPage({
    provider: provider === 'neon-wood' ? 'neonwood' : ['stacey','vita-student','iglu','study-inn'].find(value => value === provider),
    city: initialCity === 'all' ? undefined : initialCity, query: initialQuery, page,
  }) : undefined
  const pageUrl = (target: number) => {
    const filters = new URLSearchParams({ page: String(target) })
    if (provider) filters.set('provider', provider)
    if (initialCity !== 'all') filters.set('city', initialCity)
    if (initialQuery) filters.set('query', initialQuery)
    return `/accommodation?${filters}`
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
        <section className="flex min-h-[210px] items-center bg-[#00319D] px-6 py-8 text-white lg:min-h-[230px] lg:px-8 lg:py-10">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Explore Student Properties
              </h1>

              <Link
                href="/accommodation/rooms"
                className="secondary-cta mt-6 inline-flex min-h-11 items-center gap-2 px-4 py-2.5 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCC20A]"
              >
                Browse Room Types
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section
          aria-label="Property listings"
          className="bg-[#F7F6F3] px-6 py-12 lg:px-8 lg:py-16"
        >
          <div className="mx-auto max-w-7xl">
            <AccommodationListings
              key={`${provider ?? 'all'}:${initialCity}:${initialQuery}`}
              cities={cities}
              listings={publicListings}
              serverPage={databasePage ? {
                total: databasePage.total, provider,
                previous: databasePage.current > 1 ? pageUrl(databasePage.current - 1) : undefined,
                next: databasePage.current * cataloguePageSize < databasePage.total ? pageUrl(databasePage.current + 1) : undefined,
              } : undefined}
              initialCity={initialCity}
              initialQuery={initialQuery}
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
