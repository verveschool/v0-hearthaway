'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Building2, MapPin, Search } from 'lucide-react'
import type { AccommodationListingRecord } from '@/app/accommodation/listing-data'

function formatSourcePrice(value: number): string {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(value)
}

function formatSourceAvailability(value: number): string {
  return `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(value)} available`
}

type AccommodationListingsProps = {
  cities: string[]
  listings: AccommodationListingRecord[]
  initialCity?: string
  initialQuery?: string
}

function PropertyCard({ listing }: { listing: AccommodationListingRecord }) {
  const previewRoom = listing.roomTypes.find((room) => room.image || room.images.length > 0)
  const previewImage = listing.coverImage ?? previewRoom?.image ?? previewRoom?.images[0] ?? listing.gallery[0] ?? null
  const previewImageRoom = previewImage
    ? listing.roomTypes.find((room) => room.images.includes(previewImage))?.name ?? null
    : null
  const startingPrices = listing.roomTypes
    .map((room) => room.priceFrom)
    .filter((price): price is number => price !== null)
  const startingPrice = startingPrices.length ? Math.min(...startingPrices) : null
  const buildingNames = [...new Set(listing.buildings.flatMap((building) => building.name ? [building.name] : []))]

  return (
    <Link
      href={`/accommodation/property/${listing.slug}`}
      aria-label={`View ${listing.name} student accommodation in ${listing.city}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F0EC]">
        {previewImage ? (
          <img
            src={previewImage}
            alt={previewImageRoom ? `${previewImageRoom} room at ${listing.name}` : `${listing.name} property photo`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-[#6B6860]">
            <Building2 aria-hidden="true" className="size-10" />
            <span className="text-sm font-semibold">Property photo not provided</span>
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
          <p className="text-sm font-semibold text-[#1A1A1A]">
            {startingPrice === null ? 'Price not provided' : <>From <span className="text-[#00319D]">{formatSourcePrice(startingPrice)}</span></>}
          </p>
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
}: AccommodationListingsProps) {
  const [selectedCity, setSelectedCity] = useState(initialCity)
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
  const visibleListings = listings.filter((listing) => {
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
  })

  const clearFilters = () => {
    setSelectedCity('all')
    setSearchQuery('')
  }

  return (
    <div>
      <div className="grid gap-5 border-b border-[#E8E6E1] pb-6 sm:grid-cols-2 sm:items-end xl:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)_minmax(200px,0.55fr)]">
        <div className="sm:col-span-2 xl:col-span-1">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-3xl">
            Available properties
          </h2>
          <p className="mt-2 text-sm text-[#6B6860]" aria-live="polite">
            {visibleListings.length} {visibleListings.length === 1 ? 'property' : 'properties'}
          </p>
        </div>
        <label className="flex w-full flex-col gap-2 text-sm font-bold text-[#1A1A1A]">
          <span>Search properties, cities or universities</span>
          <span className="relative block">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6B6860]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
              placeholder="Try a campus or city"
              className="min-h-12 w-full rounded-xl border border-[#D8D5CE] bg-white pl-11 pr-4 text-sm font-medium text-[#1A1A1A] outline-none placeholder:font-normal placeholder:text-[#8A877F] focus-visible:ring-2 focus-visible:ring-[#00319D]"
            />
          </span>
        </label>
        <label className="flex w-full flex-col gap-2 text-sm font-bold text-[#1A1A1A]">
          <span>Choose a city</span>
          <select
            aria-label="Filter accommodations by city"
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.currentTarget.value)}
            className="min-h-12 w-full rounded-xl border border-[#D8D5CE] bg-white px-4 text-sm font-semibold text-[#1A1A1A] outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
          >
            <option value="all">All cities</option>
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        </label>
      </div>

      {visibleListings.length > 0 ? (
        <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleListings.map((listing) => <PropertyCard key={listing.key} listing={listing} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-[#E8E6E1] bg-white p-8 text-center">
          <p className="text-sm text-[#6B6860]">
            No properties match these filters. Try another city or search term.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-lg px-3 py-2 text-sm font-bold text-[#00319D] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
