'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { accommodationCities, accommodationProperties } from './accommodation-data'

const imageByType: Record<string, string> = {
  'Student residence': 'Student accommodation',
}

export default function AccommodationPage() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('All cities')
  const [roomType, setRoomType] = useState('Any room type')
  const [maxBudget, setMaxBudget] = useState('Any budget')

  const filteredProperties = useMemo(() => {
    return accommodationProperties.filter((property) => {
      const normalizedQuery = query.trim().toLowerCase()
      const matchesQuery = !normalizedQuery || [
        property.name,
        property.city,
        ...property.universities,
        ...property.amenities,
      ].some((value) => value.toLowerCase().includes(normalizedQuery))

      const matchesCity = city === 'All cities' || property.city === city
      const matchesRoom = roomType === 'Any room type' || property.roomTypes.includes(roomType)
      const matchesBudget =
        maxBudget === 'Any budget' ||
        (maxBudget === 'Under £200' && property.priceFrom < 200) ||
        (maxBudget === 'Under £250' && property.priceFrom < 250) ||
        (maxBudget === 'Under £300' && property.priceFrom < 300)

      return matchesQuery && matchesCity && matchesRoom && matchesBudget
    })
  }, [city, maxBudget, query, roomType])

  return (
    <>
      <Navigation />

      <main>
        <section className="bg-[#00319D] px-6 py-16 text-white lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2">
                <div className="h-px w-8 bg-[#FCC20A]" aria-hidden="true" />
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#FCC20A]">
                  Student accommodation
                </span>
              </div>
              <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Find a place that makes sense for where you&apos;re going.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                Explore student homes by city, university and budget. We&apos;ll help you compare the options, understand the location and get the right place confirmed before you travel.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-white p-4 shadow-2xl sm:p-5">
              <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_auto]">
                <label className="flex items-center gap-3 rounded-xl border border-[#E8E6E1] px-4 py-3 text-[#1A1A1A] focus-within:border-[#00319D]">
                  <Search className="h-5 w-5 shrink-0 text-[#00319D]" aria-hidden="true" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search a city, property or university"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#6B6860]"
                    aria-label="Search accommodation"
                  />
                </label>

                <select
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium text-[#1A1A1A] outline-none focus:border-[#00319D]"
                  aria-label="Filter by city"
                >
                  <option>All cities</option>
                  {accommodationCities.map((item) => <option key={item}>{item}</option>)}
                </select>

                <select
                  value={roomType}
                  onChange={(event) => setRoomType(event.target.value)}
                  className="rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium text-[#1A1A1A] outline-none focus:border-[#00319D]"
                  aria-label="Filter by room type"
                >
                  <option>Any room type</option>
                  <option>Ensuite</option>
                  <option>Private Room</option>
                  <option>Studio</option>
                </select>

                <select
                  value={maxBudget}
                  onChange={(event) => setMaxBudget(event.target.value)}
                  className="rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium text-[#1A1A1A] outline-none focus:border-[#00319D]"
                  aria-label="Filter by weekly budget"
                >
                  <option>Any budget</option>
                  <option>Under £200</option>
                  <option>Under £250</option>
                  <option>Under £300</option>
                </select>

                <Link
                  href="/get-matched"
                  className="inline-flex items-center justify-center rounded-xl bg-[#FCC20A] px-5 py-3 text-sm font-bold text-[#00319D] transition-transform hover:-translate-y-0.5"
                >
                  Get Matched
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F6F3] px-6 py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#00319D]" aria-hidden="true" />
                  <span className="text-sm font-bold uppercase tracking-wider text-[#00319D]">Explore</span>
                </div>
                <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
                  Places to start with
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">
                  {filteredProperties.length} properties in our first UK catalogue.
                </p>
              </div>
              <Link href="/get-matched" className="inline-flex items-center gap-2 text-sm font-bold text-[#00319D]">
                Prefer a recommendation? Get matched <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="rounded-2xl border border-[#E8E6E1] bg-white p-12 text-center">
                <h3 className="font-heading text-xl font-extrabold text-[#1A1A1A]">No properties match those filters.</h3>
                <p className="mt-2 text-sm text-[#6B6860]">Try a different city, room type or budget.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredProperties.map((property) => (
                  <Link
                    key={property.slug}
                    href={`/accommodation/${property.slug}`}
                    className="group overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-56 overflow-hidden bg-[#00319D]">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00319D]/80 via-[#00319D]/10 to-transparent" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#00319D]">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Seed listing
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{property.city}</p>
                          <h3 className="font-heading text-2xl font-extrabold leading-tight">{property.name}</h3>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-xs text-white/70">from</p>
                          <p className="text-lg font-extrabold">£{property.priceFrom}<span className="text-xs font-semibold">/wk</span></p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start gap-2 text-sm text-[#6B6860]">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00319D]" aria-hidden="true" />
                        <span>{property.address}</span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {property.roomTypes.slice(0, 3).map((type) => (
                          <span key={type} className="rounded-full bg-[#F7F6F3] px-3 py-1 text-xs font-semibold text-[#1A1A1A]">
                            {type}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 border-t border-[#E8E6E1] pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6860]">Nearby</p>
                        <p className="mt-1 text-sm font-semibold text-[#1A1A1A]">{property.distance}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-white px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2">
                <div className="h-px w-8 bg-[#FCC20A]" aria-hidden="true" />
                <span className="text-sm font-bold uppercase tracking-widest text-[#00319D]">How HearthAway fits in</span>
              </div>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
                Browse the market. Then get human help where it matters.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6B6860]">
                This catalogue gives students a place to compare options before the conversation starts. Our advisors can then help narrow the list, check fit with the university, and guide the booking process.
              </p>
            </div>
            <div className="rounded-2xl bg-[#00319D] p-7 text-white shadow-lg sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#FCC20A]">Need a shortlist?</p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold">Tell us where you&apos;re going and what matters to you.</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">We can help turn a broad catalogue into a small set of options worth considering.</p>
              <Link
                href="/get-matched"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FCC20A] px-5 py-3 text-sm font-bold text-[#00319D]"
              >
                Get Matched <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-7xl border-t border-[#E8E6E1] pt-6">
            <p className="max-w-4xl text-xs leading-relaxed text-[#6B6860]">
              Initial catalogue data is seeded from publicly listed accommodation information, including Amber Student listings. HearthAway does not represent these listings as partnerships through this catalogue. Prices, availability, room types and property details change and must be confirmed before booking.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
