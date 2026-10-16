'use client'

import { useState } from 'react'
import { Building2, ExternalLink, MapPin } from 'lucide-react'
import type {
  AccommodationListingRecord,
  AccommodationRoomRecord,
} from '@/app/accommodation/listing-data'

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
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0)
  const selectedRoom = listing.roomTypes[selectedRoomIndex] ?? null
  const buildingNames = [...new Set(listing.buildings.flatMap((building) => building.name ? [building.name] : []))]

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F0EC]">
        {selectedRoom?.image ? (
          <img
            src={selectedRoom.image}
            alt={`${selectedRoom.name} room at ${listing.name}`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-[#6B6860]">
            <Building2 aria-hidden="true" className="size-10" />
            <span className="text-sm font-semibold">Room photo not provided</span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#00319D] shadow-sm">
          {listing.city}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <h2 className="font-heading text-xl font-extrabold leading-snug text-[#1A1A1A] sm:text-2xl">
            {listing.name}
          </h2>
          {buildingNames.length > 0 ? (
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#6B6860]">
              {buildingNames.join(' · ')}
            </p>
          ) : null}
          {listing.address ? (
            <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-[#6B6860]">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#00319D]" />
              <span className="whitespace-pre-line">{listing.address}</span>
            </p>
          ) : null}
          {listing.description ? (
            <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-[#4C4A45]">
              {listing.description}
            </p>
          ) : null}
        </div>

        <div className="mt-5 border-t border-[#E8E6E1] pt-4">
          {listing.roomTypes.length > 0 ? (
            <RoomDetails
              listingName={listing.name}
              roomTypes={listing.roomTypes}
              selectedRoomIndex={selectedRoomIndex}
              onRoomChange={setSelectedRoomIndex}
            />
          ) : (
            <p className="text-sm leading-relaxed text-[#6B6860]">
              Room details are not included in the supplied data.
            </p>
          )}
        </div>

        {listing.providerLinks.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {listing.providerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#00319D] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00277D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2"
              >
                Visit {link.label}
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

function RoomDetails({
  listingName,
  roomTypes,
  selectedRoomIndex,
  onRoomChange,
}: {
  listingName: string
  roomTypes: AccommodationRoomRecord[]
  selectedRoomIndex: number
  onRoomChange: (index: number) => void
}) {
  const room = roomTypes[selectedRoomIndex]
  if (!room) return null

  return (
    <div>
      {roomTypes.length > 1 ? (
        <label className="flex flex-col gap-2 text-sm font-bold text-[#1A1A1A]">
          <span>Room type</span>
          <select
            aria-label={`Room type at ${listingName}`}
            value={selectedRoomIndex}
            onChange={(event) => onRoomChange(Number(event.currentTarget.value))}
            className="min-h-11 w-full rounded-xl border border-[#D8D5CE] bg-white px-3 text-sm font-semibold text-[#1A1A1A] outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
          >
            {roomTypes.map((roomType, index) => (
              <option key={`${roomType.name}-${index}`} value={index}>
                {roomType.name}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p className="text-sm font-bold text-[#1A1A1A]">{room.name}</p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="min-w-0 rounded-xl bg-[#F7F6F3] p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Starting price</p>
          <p className="mt-1 break-words font-heading text-xl font-extrabold text-[#00319D]">
            {room.priceFrom === null ? 'Not provided' : formatSourcePrice(room.priceFrom)}
          </p>
        </div>
        <div className="min-w-0 rounded-xl bg-[#F7F6F3] p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Availability</p>
          <p className="mt-1 break-words text-sm font-bold text-[#1A1A1A]">
            {room.available === null ? 'Not provided' : formatSourceAvailability(room.available)}
          </p>
        </div>
      </div>
      {room.academicYear ? (
        <p className="mt-3 text-xs font-medium text-[#6B6860]">Academic year: {room.academicYear}</p>
      ) : null}
    </div>
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
