'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Building2, MapPin } from 'lucide-react'
import type { AccommodationListingRecord } from '@/app/accommodation/listing-data'

const accommodationSourceNotice =
  'Prices are shown as supplied; the source does not specify a currency or billing period.'

function formatSourcePrice(value: number): string {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(value)
}

function formatSourceAvailability(value: number): string {
  return `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(value)} available`
}

type AccommodationListingsProps = {
  cities: string[]
  listings: AccommodationListingRecord[]
}

function PropertyCard({ listing }: { listing: AccommodationListingRecord }) {
  const previewRoom = listing.roomTypes.find((room) => room.image)
  const previewImage = previewRoom?.image ?? listing.gallery[0] ?? null
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
            alt={previewRoom?.image ? `${previewRoom.name} room at ${listing.name}` : `${listing.name} property photo`}
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

export default function AccommodationListings({ cities, listings }: AccommodationListingsProps) {
  const [selectedCity, setSelectedCity] = useState('all')
  const visibleListings = selectedCity === 'all'
    ? listings
    : listings.filter((listing) => listing.city === selectedCity)

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-[#E8E6E1] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-3xl">
            Available properties
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">
            {`${visibleListings.length} ${visibleListings.length === 1 ? 'property' : 'properties'}${selectedCity === 'all' ? ' across all cities' : ` in ${selectedCity}`}`}
          </p>
        </div>
        <label className="flex w-full flex-col gap-2 text-sm font-bold text-[#1A1A1A] sm:max-w-xs">
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

      <p className="mt-5 text-sm leading-relaxed text-[#6B6860]">{accommodationSourceNotice}</p>

      {visibleListings.length > 0 ? (
        <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleListings.map((listing) => <PropertyCard key={listing.key} listing={listing} />)}
        </div>
      ) : (
        <p className="mt-8 rounded-2xl border border-[#E8E6E1] bg-white p-8 text-center text-sm text-[#6B6860]">
          No accommodation listings are present for this city in the supplied data.
        </p>
      )}
    </div>
  )
}
