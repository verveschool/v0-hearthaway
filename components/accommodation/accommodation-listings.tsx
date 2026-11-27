'use client'

import CatalogueImage from '@/components/accommodation/catalogue-image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Building2, MapPin, Search } from 'lucide-react'
import type { AccommodationListingRecord } from '@/app/accommodation/listing-data'
import { filterProperties, weeklyCurrencies, type PropertyFilters } from '@/app/accommodation/property-filters'
import { PRICE_AVAILABILITY_NOTICE } from '@/app/accommodation/presentation'

type AccommodationListingsProps = {
  cities: string[]
  listings: AccommodationListingRecord[]
  initialCity?: string
  initialQuery?: string
  filters: PropertyFilters
  advancedFiltersEnabled: boolean
  provider?: string
  serverPage?: { total: number; next?: string; previous?: string }
}

function PropertyCard({ listing, filters }: { listing: AccommodationListingRecord; filters: PropertyFilters }) {
  const previewRoom = listing.roomTypes.find((room) => room.image || room.images.length > 0)
  const previewImage = listing.coverImage ?? previewRoom?.image ?? previewRoom?.images[0] ?? listing.gallery[0] ?? null
  const previewImageRoom = previewImage
    ? listing.roomTypes.find((room) => room.images.includes(previewImage))?.name ?? null
    : null
  const currencySymbol = filters.currency && weeklyCurrencies[filters.currency]
  const comparableOnly = currencySymbol && (filters.maxWeekly !== undefined || filters.sort)
  const startingRoom = listing.roomTypes
    .filter((room) => room.priceFrom !== null && (!comparableOnly || (
      room.priceLabel?.startsWith(currencySymbol) && room.priceLabel.includes('/week')
    )))
    .sort((first, second) => (first.priceFrom ?? 0) - (second.priceFrom ?? 0))[0]
  const buildingNames = [...new Set(listing.buildings.flatMap((building) => building.name ? [building.name] : []))]

  return (
    <Link
      href={`/accommodation/property/${listing.slug}`}
      aria-label={`View ${listing.name} student property in ${listing.city}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F0EC]">
        {previewImage ? (
          <CatalogueImage
            card
            src={previewImage}
            sizes="(min-width: 1344px) 412px, (min-width: 1280px) calc((100vw - 104px) / 3), (min-width: 1024px) calc((100vw - 84px) / 2), (min-width: 640px) calc((100vw - 68px) / 2), calc(100vw - 48px)"
            alt={listing.galleryLabels?.[previewImage] ?? (previewImageRoom ? `${previewImageRoom} room at ${listing.name}` : `${listing.name} property photo`)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-[#6B6860]">
            <Building2 aria-hidden="true" className="size-10" />
            <span className="text-sm font-semibold">Property photos coming soon</span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#00319D] shadow-sm">
          {listing.city}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <h2 className="font-heading text-xl font-extrabold leading-snug text-[#1A1A1A] group-hover:text-[#00319D] sm:text-2xl">
            {listing.name}
          </h2>
          {buildingNames.length ? <p className="mt-2 text-sm font-medium leading-relaxed text-[#6B6860]">{buildingNames.join(' · ')}</p> : null}
          {listing.address ? (
            <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-[#6B6860]">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#00319D]" />
              <span>{listing.address}</span>
            </p>
          ) : null}
          {listing.description ? <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#4C4A45]">{listing.description}</p> : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E8E6E1] pt-4">
          <div className="text-sm font-semibold text-[#1A1A1A]">
            <p className="text-[#00319D]">{startingRoom?.priceLabel || (filters.roomType ? '' : listing.propertyPriceLabel) ? `From ${startingRoom?.priceLabel || listing.propertyPriceLabel}` : 'Ask for a quote'}</p>
            <p className="mt-1 max-w-[260px] text-xs font-normal leading-relaxed text-[#6B6860]">{PRICE_AVAILABILITY_NOTICE}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-[#00319D]">
            View property <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function AccommodationListings({
  cities,
  listings,
  initialCity = 'all',
  initialQuery = '',
  serverPage,
  filters,
  advancedFiltersEnabled,
  provider,
}: AccommodationListingsProps) {
  const [pageSize, setPageSize] = useState(12)
  const sentinel = useRef<HTMLDivElement>(null)
  const [selectedCity, setSelectedCity] = useState(initialCity)
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
  const visibleListings = serverPage ? listings : filterProperties(listings.filter((listing) => {
    const matchesCity = selectedCity === 'all' || listing.city.toLocaleLowerCase() === selectedCity.toLocaleLowerCase()
    if (!matchesCity || !normalizedQuery) return matchesCity

    const searchableDetails = [
      listing.name,
      listing.city,
      listing.country,
      listing.address ?? '',
      listing.description ?? '',
      ...listing.universities,
      ...listing.buildings.map((building) => building.name ?? ''),
      ...listing.roomTypes.map((room) => room.name),
    ].join(' ').toLocaleLowerCase()

    return searchableDetails.includes(normalizedQuery)
  }), filters)

  const hasMore = !serverPage && pageSize < visibleListings.length
  useEffect(() => {
    const element = sentinel.current
    if (!element || !hasMore) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) setPageSize((size) => size + 12)
    }, { rootMargin: '300px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [hasMore])

  const clearUrl = provider ? `/accommodation?provider=${encodeURIComponent(provider)}` : '/accommodation'

  return (
    <div>
      <form method="get" className="grid gap-5 border-b border-[#E8E6E1] pb-6 sm:grid-cols-2 sm:items-end xl:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)_minmax(200px,0.55fr)]">
        <div className="sm:col-span-2 xl:col-span-1">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-3xl">
            Student Properties
          </h2>
          <p className="mt-2 text-sm text-[#6B6860]" aria-live="polite">
            {serverPage?.total ?? visibleListings.length} {(serverPage?.total ?? visibleListings.length) === 1 ? 'property' : 'properties'}
          </p>
        </div>
        <label className="flex w-full flex-col gap-2 text-sm font-bold text-[#1A1A1A]">
          <span>Search properties, cities or universities</span>
          <span className="relative block">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6B6860]" />
            <input
              type="search"
              name="query"
              value={searchQuery}
              onChange={(event) => { setSearchQuery(event.currentTarget.value); setPageSize(12) }}
              placeholder="Try a campus or city"
              className="min-h-12 w-full rounded-xl border border-[#D8D5CE] bg-white pl-11 pr-4 text-sm font-medium text-[#1A1A1A] outline-none placeholder:font-normal placeholder:text-[#8A877F] focus-visible:ring-2 focus-visible:ring-[#00319D]"
            />
          </span>
        </label>
        <label className="flex w-full flex-col gap-2 text-sm font-bold text-[#1A1A1A]">
          <span>Choose a city</span>
          <select
            aria-label="Filter properties by city"
            name="city"
            value={selectedCity}
            onChange={(event) => { setSelectedCity(event.currentTarget.value); setPageSize(12) }}
            className="min-h-12 w-full rounded-xl border border-[#D8D5CE] bg-white px-4 text-sm font-semibold text-[#1A1A1A] outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
          >
            <option value="all">All cities</option>
            {selectedCity !== 'all' && !cities.includes(selectedCity) ? <option value={selectedCity}>{selectedCity}</option> : null}
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        </label>
        {advancedFiltersEnabled ? <>
        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2 xl:col-span-3 xl:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm font-bold">
            Room type
            <input name="roomType" defaultValue={filters.roomType} maxLength={80} placeholder="e.g. Studio" className="min-h-12 rounded-xl border border-[#D8D5CE] bg-white px-4 font-normal" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold">
            Price currency
            <select name="currency" defaultValue={filters.currency ?? ''} className="min-h-12 rounded-xl border border-[#D8D5CE] bg-white px-4">
              <option value="">Choose currency</option>
              <option value="GBP">GBP (£)</option>
              <option value="EUR">EUR (€)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold">
            Maximum weekly rent
            <input name="maxWeekly" type="number" min={1} max={9999999} step={1} defaultValue={filters.maxWeekly} aria-describedby="price-filter-note" className="min-h-12 rounded-xl border border-[#D8D5CE] bg-white px-4" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold">
            Sort by
            <select name="sort" defaultValue={filters.sort ?? ''} aria-describedby="price-filter-note" className="min-h-12 rounded-xl border border-[#D8D5CE] bg-white px-4">
              <option value="">Featured</option>
              <option value="price-asc">Weekly rent, low to high</option>
              <option value="price-desc">Weekly rent, high to low</option>
            </select>
          </label>
        </div>
        <p id="price-filter-note" className="text-sm text-[#6B6860] sm:col-span-2">
          Choose a currency to filter or sort by weekly rent. Ask an advisor to check move-in dates and tenancy lengths.
        </p>
        </> : null}
        {provider ? <input type="hidden" name="provider" value={provider} /> : null}
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="secondary-cta w-fit px-4 py-2">Search properties</button>
          <Link href={clearUrl} className="text-sm font-bold text-[#00319D] underline">Clear filters</Link>
        </div>
      </form>

      {visibleListings.length > 0 ? (
        <div>
          <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleListings.slice(0, pageSize).map((listing) => <PropertyCard key={listing.key} listing={listing} filters={filters} />)}
          </div>
          {hasMore ? <div ref={sentinel} className="mt-6 text-center"><button type="button" onClick={() => setPageSize((size) => size + 12)} className="secondary-cta">Load more properties</button></div> : null}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-[#E8E6E1] bg-white p-8 text-center">
          <p className="text-sm text-[#6B6860]">
            {initialCity !== 'all' ? `No properties match these filters in ${initialCity}.` : 'No properties match these filters.'}
          </p>
          <Link
            href="/get-matched"
            className="mt-4 rounded-lg px-3 py-2 text-sm font-bold text-[#00319D] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
          >
            Ask an advisor for help
          </Link>
        </div>
      )}
      {serverPage && (serverPage.previous || serverPage.next) ? <nav aria-label="Property pages" className="mt-6 flex justify-center gap-4">
        {serverPage.previous ? <Link className="secondary-cta px-4 py-2" href={serverPage.previous}>Previous</Link> : null}
        {serverPage.next ? <Link className="secondary-cta px-4 py-2" href={serverPage.next}>Next</Link> : null}
      </nav> : null}
    </div>
  )
}

