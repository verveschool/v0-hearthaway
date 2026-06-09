'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

const suggestions = [
  'University of Manchester',
  'University College London',
  'University of Edinburgh',
  'Trinity College Dublin',
  'University of Melbourne',
  'University of Sydney',
]

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/universities?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1B365D]">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Student accommodation in a vibrant university city"
          fill
          className="object-cover object-center opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B365D]/60 via-[#1B365D]/50 to-[#12243E]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-[#FFCC00]" aria-hidden="true" />
            <span className="text-white/90 text-sm font-medium">
              For international students in the UK, Ireland &amp; Australia
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold text-white text-pretty mb-6 leading-[1.1]" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Find the right accommodation
            <span className="block text-[#FFCC00]">before you arrive.</span>
          </h1>

          {/* Sub */}
          <p className="text-white/80 text-xl leading-relaxed mb-10 max-w-xl">
            You&apos;ve got your place. Now find your home. HearthAway helps you choose the right accommodation near your university — with confidence, before you fly.
          </p>

          {/* Search */}
          <div className="relative mb-8 max-w-2xl">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center pl-5 text-[#6B6860]">
                  <Search className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onFocus={() => query && setShowSuggestions(true)}
                  placeholder="Search by university or city..."
                  className="flex-1 px-4 py-5 text-[#1A1A1A] text-base outline-none bg-transparent placeholder:text-[#6B6860] font-medium"
                  aria-label="Search by university or city"
                />
                <button
                  type="submit"
                  className="m-2 px-6 py-3 bg-[#1B365D] text-white font-bold rounded-xl hover:bg-[#24497D] transition-colors text-sm"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Suggestions dropdown */}
            {showSuggestions && query && filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[#E8E6E1] z-50 overflow-hidden">
                {filtered.map((suggestion) => (
                  <button
                    key={suggestion}
                    onMouseDown={() => {
                      setQuery(suggestion)
                      setShowSuggestions(false)
                    }}
                    className="flex items-center gap-3 w-full px-5 py-3.5 text-left text-sm text-[#1A1A1A] hover:bg-[#F7F6F3] transition-colors font-medium"
                  >
                    <MapPin className="w-4 h-4 text-[#1B365D] flex-shrink-0" aria-hidden="true" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/50 text-sm">Popular:</span>
            {['Manchester', 'London', 'Dublin', 'Sydney', 'Melbourne'].map((city) => (
              <Link
                key={city}
                href={`/cities/${city.toLowerCase()}`}
                className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm hover:bg-white/20 hover:text-white transition-all"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '40+', label: 'Cities served' },
              { value: '200+', label: 'Universities supported' },
              { value: '15k+', label: 'Students helped' },
              { value: 'Verified', label: 'Properties only' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[#FFCC00] font-heading font-bold text-xl lg:text-2xl">{stat.value}</div>
                <div className="text-white/60 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
