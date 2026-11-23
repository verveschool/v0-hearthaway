import { catalogueDatabaseEnabled, cataloguePageSize, catalogueRoomPage, catalogueSearchParam, type CatalogueSearchParams } from '../catalogue-server'

import CatalogueImage from '@/components/accommodation/catalogue-image'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import Footer from '@/components/footer'
import {
  accommodationCities,
  accommodationRoomListings,
  getAccommodationProviderName,
} from '@/app/accommodation/listing-data'
import { getRoomPriceDisplay, PRICE_AVAILABILITY_NOTICE } from '@/app/accommodation/presentation'

export const metadata: Metadata = {
  title: 'Student Room Types | HearthAway',
  description:
    'Browse student room types and see which property each room belongs to.',
}

type RoomsPageProps = {
  searchParams: Promise<CatalogueSearchParams>
}

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
  const params = await searchParams
  const city = catalogueSearchParam(params.city) ?? ''
  const query = catalogueSearchParam(params.query)?.trim().slice(0, 100) ?? ''
  const page = catalogueSearchParam(params.page) ?? '1'

  const normalizedQuery = query.toLocaleLowerCase()
  const selectedCity = accommodationCities.includes(city) ? city : ''

  const result = catalogueDatabaseEnabled() ? await catalogueRoomPage({ city: selectedCity, query: normalizedQuery, page }) : null
  const rooms = result?.listings ?? accommodationRoomListings.filter(({ property, room }) => {
    if (selectedCity && property.city !== selectedCity) return false
    if (!normalizedQuery) return true

    return [
      room.name,
      property.name,
      property.city,
      property.country ?? '',
      property.provider,
    ]
      .join(' ')
      .toLocaleLowerCase()
      .includes(normalizedQuery)
  })

  const pageCount = Math.max(1, Math.ceil((result?.total ?? rooms.length) / cataloguePageSize))
  const requestedPage = Number(page)
  const currentPage = result?.current ?? (Number.isSafeInteger(requestedPage) ? Math.min(pageCount, Math.max(1, requestedPage)) : 1)
  const pageUrl = (target: number) => {
    const params = new URLSearchParams()
    if (selectedCity) params.set('city', selectedCity)
    if (query) params.set('query', query)
    if (target > 1) params.set('page', String(target))
    const suffix = params.toString()
    return `/accommodation/rooms${suffix ? `?${suffix}` : ''}`
  }

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#F7F6F3] pb-16">
        <PageBanner
          title="Find your kind of room"
          action={{
            label: 'Browse properties',
            href: selectedCity ? `/accommodation?city=${encodeURIComponent(selectedCity)}` : '/accommodation',
          }}
        />

        {/* Room inventory and search */}
        <section
          aria-label="Room inventory"
          className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12"
        >
          <form
            method="get"
            className="grid gap-3 rounded-2xl border border-[#E8E6E1] bg-white p-4 sm:grid-cols-[minmax(0,1fr)_220px_auto] sm:items-end sm:p-5"
          >
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
              <span>Search rooms</span>
              <input
                name="query"
                defaultValue={query}
                placeholder="Room, property, city or provider"
                className="min-h-11 rounded-xl border border-[#D8D5CE] px-3 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
              <span>City</span>
              <select
                name="city"
                defaultValue={selectedCity}
                className="min-h-11 rounded-xl border border-[#D8D5CE] bg-white px-3 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
              >
                <option value="">All cities</option>
                {accommodationCities.map((availableCity) => (
                  <option key={availableCity} value={availableCity}>
                    {availableCity}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex gap-2">
              <button
                type="submit"
                className="min-h-11 flex-1 rounded-xl bg-[#00319D] px-5 py-2 text-sm font-bold text-white hover:bg-[#00277D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
              >
                Search
              </button>

              <Link
                href="/accommodation/rooms"
                className="inline-flex min-h-11 items-center rounded-xl border border-[#D8D5CE] px-4 py-2 text-sm font-semibold text-[#00319D] hover:bg-[#F7F6F3]"
              >
                Clear
              </Link>
            </div>
          </form>

          <p className="mt-6 text-sm text-[#6B6860]">
            {result?.total ?? rooms.length} room {(result?.total ?? rooms.length) === 1 ? 'type' : 'types'}
          </p>

          {rooms.length ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {(result ? rooms : rooms.slice((currentPage - 1) * cataloguePageSize, currentPage * cataloguePageSize)).map(({ slug, property, room }) => (
                <article
                  key={slug}
                  className="overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white transition-shadow hover:shadow-md"
                >
                  <Link
                    href={`/accommodation/rooms/${slug}`}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00319D]"
                  >
                    {room.image || property.coverImage ? (
                      <CatalogueImage
                        card
                        src={room.image ?? property.coverImage ?? ''}
                        sizes="(min-width: 1280px) 392px, (min-width: 640px) calc((100vw - 84px) / 2), calc(100vw - 40px)"
                        alt={room.image ? room.imageLabels?.[room.image] ?? `${room.name} room at ${property.name}` : `${room.name} room at ${property.name}`}
                        className="aspect-[4/3] w-full bg-[#F1F0EC] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="aspect-[4/3] bg-[#F1F0EC]"
                      />
                    )}

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#F7F6F3] px-3 py-1 text-[11px] font-bold tracking-wide text-[#00319D]">
                          {getAccommodationProviderName(property.provider)}
                        </span>

                        <span className="text-xs text-[#6B6860]">
                          {property.city}
                        </span>
                      </div>

                      <h2 className="mt-4 font-heading text-xl font-extrabold text-[#1A1A1A] group-hover:text-[#00319D]">
                        {room.name}
                      </h2>

                      <p className="mt-1 text-sm text-[#6B6860]">
                        {property.name}
                      </p>

                      <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#E8E6E1] pt-4">
                        <div>
                          <p className="text-[11px] font-bold tracking-wide text-[#6B6860]">
                            Price
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#00319D]">
                            {getRoomPriceDisplay(room)}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="mt-2 rounded-lg bg-[#F7F6F3] p-3 text-left text-xs leading-relaxed text-[#6B6860]">
                            {PRICE_AVAILABILITY_NOTICE}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-[#E8E6E1] bg-white p-8 text-center">
              <h2 className="font-heading text-xl font-extrabold text-[#1A1A1A]">
                No rooms match those filters
              </h2>
              <p className="mt-2 text-sm text-[#6B6860]">
                Try another city or search term.
              </p>
            </div>
          )}
          {pageCount > 1 ? <nav aria-label="Room pages" className="mt-7 flex items-center justify-center gap-4">
            {currentPage > 1 ? <Link href={pageUrl(currentPage - 1)} className="secondary-cta px-4 py-2">Previous</Link> : null}
            <span className="text-sm text-[#6B6860]">Page {currentPage} of {pageCount}</span>
            {currentPage < pageCount ? <Link href={pageUrl(currentPage + 1)} className="secondary-cta px-4 py-2">Next</Link> : null}
          </nav> : null}
        </section>
      </main>

      <Footer />
    </>
  )
}

