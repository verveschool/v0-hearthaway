'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Search } from 'lucide-react'
import MatchedCTA from '@/components/matched-cta'

import { universities } from '@/lib/place-data'

const countryFilters = ['All', 'UK', 'Ireland', 'Australia']

export default function UniversitiesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCountry = searchParams.get('country') || 'All'
  const initialSearch = searchParams.get('search') || ''

  const [search, setSearch] = useState<string>(initialSearch)

  // Keep search in URL in sync (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams()
      if (initialCountry && initialCountry !== 'All') params.set('country', initialCountry)
      if (search.trim() !== '') params.set('search', search.trim())
      const href = `/universities${params.toString() ? `?${params.toString()}` : ''}`
      // Use replace to avoid polluting history for every keystroke
      router.replace(href)
    }, 260)

    return () => clearTimeout(t)
  }, [search, router, initialCountry])

  const handleCountryFilter = (country: string) => {
    const params = new URLSearchParams()
    if (country && country !== 'All') params.set('country', country)
    if (search.trim() !== '') params.set('search', search.trim())
    const href = `/universities${params.toString() ? `?${params.toString()}` : ''}`
    router.push(href)
  }

  const selectedCountry = initialCountry

  const searchLower = search.trim().toLowerCase()

  const filteredUniversities = universities
    .filter((uni) => (selectedCountry === 'All' ? true : uni.country === selectedCountry))
    .filter((uni) => {
      if (!searchLower) return true
      return (
        uni.name.toLowerCase().includes(searchLower) ||
        uni.city.toLowerCase().includes(searchLower) ||
        (uni.slug && uni.slug.toLowerCase().includes(searchLower))
      )
    })

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">Universities</div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Find accommodation near your university.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Select your university and we&apos;ll show you verified accommodation options within walking and commuting distance.
              </p>
            </div>
          </div>
        </section>

        {/* Filters + List */}
        <section className="bg-[#F7F6F3] py-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Search + Country Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6860]" aria-hidden="true" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search universities..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8E6E1] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1B365D] transition-colors"
                  aria-label="Search universities"
                />
              </div>

              <div className="flex gap-2">
                {countryFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => handleCountryFilter(f)}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      f === selectedCountry
                        ? 'bg-[#1B365D] border-[#1B365D] text-white'
                        : 'bg-white border-[#E8E6E1] text-[#6B6860] hover:border-[#1B365D]/40'
                    }`}
                    aria-current={f === selectedCountry ? 'page' : undefined}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* University grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {filteredUniversities.length > 0 ? (
                filteredUniversities.map((uni) => (
                  <Link
                    key={uni.slug}
                    href={`/universities/${uni.slug}`}
                    className="group bg-white rounded-2xl p-5 border border-[#E8E6E1] hover:border-[#1B365D]/30 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-bold tracking-wider uppercase text-[#1B365D] bg-[#1B365D]/8 px-2.5 py-1 rounded-full">
                        {uni.country}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-sm leading-snug mb-1 group-hover:text-[#1B365D] transition-colors">
                      {uni.name}
                    </h3>
                    <p className="text-[#6B6860] text-xs">{uni.city} &middot; {uni.students} students</p>
                    <div className="mt-4 text-xs font-semibold text-[#1B365D] group-hover:translate-x-1 transition-transform inline-block">
                      View accommodation &rarr;
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-[#6B6860]">
                  No universities found.
                </div>
              )}
            </div>

            {/* CTA */}
            <div>
              <MatchedCTA
                variant="full"
                title={"Can't find your university?"}
                description={"Tell us where you're studying and we'll find the right options for you."}
                buttonText="Get Matched"
                buttonHref="/get-matched"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
