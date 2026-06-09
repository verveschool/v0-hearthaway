'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Search, MapPin, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const photos = [
  {
    src: '/images/hero-room-1.png',
    label: 'Studio apartment, Manchester',
  },
  {
    src: '/images/hero-room-2.png',
    label: 'Shared apartment, Dublin',
  },
  {
    src: '/images/hero-room-3.png',
    label: 'En-suite room, Melbourne',
  },
  {
    src: '/images/hero-building.png',
    label: 'Purpose-built halls, London',
  },
]

const promises = [
  'Near your university',
  'Within your budget',
  'Verified and trusted',
]

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)

  const suggestions = [
    'University of Manchester',
    'University College London',
    'University of Edinburgh',
    'Trinity College Dublin',
    'University of Melbourne',
    'University of Sydney',
  ]

  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/universities?q=${encodeURIComponent(query)}`)
    }
  }

  // Auto-advance the photo carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const prevPhoto = () => setActivePhoto((prev) => (prev - 1 + photos.length) % photos.length)
  const nextPhoto = () => setActivePhoto((prev) => (prev + 1) % photos.length)

  return (
    <section className="min-h-screen bg-[#0F2240] flex flex-col lg:flex-row overflow-hidden">

      {/* ── LEFT: Copy panel ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] xl:w-[50%] px-6 sm:px-10 lg:px-14 xl:px-20 pt-32 pb-14 lg:pt-36 lg:pb-20">

        {/* Eyebrow tag */}
        <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#FFCC00]/15 border border-[#FFCC00]/30 mb-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" aria-hidden="true" />
          <span className="text-[#FFCC00] text-xs font-semibold tracking-wide uppercase">
            UK &bull; Ireland &bull; Australia
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-white leading-[1.08] tracking-tight mb-6 text-balance" style={{ fontSize: 'clamp(2.6rem, 4.8vw, 4rem)' }}>
          Find the right accommodation
          <span className="block mt-1" style={{ color: '#FFCC00' }}>before you arrive.</span>
        </h1>

        {/* Supporting copy */}
        <p className="text-white/70 leading-relaxed mb-4 max-w-lg" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}>
          Moving abroad for university is a big decision. So is choosing where to live.
          Our accommodation advisors help you find the right place — near your campus,
          within your budget — before you fly.
        </p>

        {/* Promise list */}
        <ul className="flex flex-col gap-2 mb-10" role="list">
          {promises.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FFCC00] flex-shrink-0" aria-hidden="true" />
              <span className="text-white/80 text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>

        {/* ── PRIMARY CTA ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Link
            href="/get-matched"
            className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#FFCC00] text-[#0F2240] font-bold text-base hover:bg-[#FFD633] active:bg-[#E6B800] transition-all shadow-lg shadow-[#FFCC00]/20 hover:shadow-[#FFCC00]/40 hover:shadow-xl hover:-translate-y-0.5"
          >
            Talk to an Accommodation Advisor
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/8 border border-white/15 text-white/80 font-medium text-sm hover:bg-white/12 hover:text-white transition-all"
          >
            How it works
          </Link>
        </div>

        {/* ── SECONDARY: Compact search ── */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-3">
            Or browse by university or city
          </p>
          <div className="relative">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-0 bg-white/8 border border-white/15 rounded-xl overflow-hidden hover:border-white/30 focus-within:border-white/40 transition-colors">
                <div className="flex items-center pl-4 text-white/40">
                  <Search className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
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
                  placeholder="Search university or city..."
                  className="flex-1 px-3 py-3 text-white/90 text-sm outline-none bg-transparent placeholder:text-white/35 font-medium"
                  aria-label="Search by university or city"
                />
                <button
                  type="submit"
                  className="m-1.5 px-4 py-2 bg-white/12 text-white/70 font-semibold rounded-lg hover:bg-white/20 hover:text-white transition-colors text-xs"
                >
                  Search
                </button>
              </div>
            </form>

            {showSuggestions && query && filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#1B365D] border border-white/15 rounded-xl shadow-2xl z-50 overflow-hidden">
                {filtered.map((suggestion) => (
                  <button
                    key={suggestion}
                    onMouseDown={() => {
                      setQuery(suggestion)
                      setShowSuggestions(false)
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/8 hover:text-white transition-colors font-medium"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#FFCC00] flex-shrink-0" aria-hidden="true" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {['London', 'Manchester', 'Dublin', 'Sydney', 'Melbourne'].map((city) => (
              <Link
                key={city}
                href={`/cities/${city.toLowerCase()}`}
                className="px-3 py-1 rounded-full bg-white/6 border border-white/12 text-white/55 text-xs hover:bg-white/12 hover:text-white/80 transition-all"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Photography panel ───────────────────────────────────────── */}
      <div className="relative w-full lg:w-[48%] xl:w-[50%] min-h-[55vw] lg:min-h-0 overflow-hidden">

        {/* Photos */}
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === activePhoto ? 1 : 0 }}
            aria-hidden={i !== activePhoto}
          >
            <Image
              src={photo.src}
              alt={photo.label}
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle gradient bleed on left edge so it merges with copy panel on desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2240]/60 via-[#0F2240]/10 to-transparent lg:bg-gradient-to-r" />
            {/* Bottom vignette for label legibility */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ))}

        {/* Photo caption */}
        <div className="absolute bottom-16 left-5 right-5 lg:bottom-14 lg:left-6 lg:right-6 z-10 flex items-end justify-between">
          <span className="text-white/70 text-xs font-medium tracking-wide">
            {photos[activePhoto].label}
          </span>
        </div>

        {/* Carousel nav */}
        <div className="absolute bottom-5 left-5 right-5 lg:bottom-6 lg:left-6 lg:right-6 z-10 flex items-center gap-3">
          {/* Dot indicators */}
          <div className="flex items-center gap-1.5 flex-1" role="tablist" aria-label="Accommodation photos">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                role="tab"
                aria-selected={i === activePhoto}
                aria-label={`View photo ${i + 1}`}
                className="relative h-1 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFCC00]"
                style={{ width: i === activePhoto ? '2rem' : '0.5rem', background: i === activePhoto ? '#FFCC00' : 'rgba(255,255,255,0.35)' }}
              />
            ))}
          </div>

          {/* Prev/next */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white/15 border border-white/20 text-white/70 hover:bg-white/25 hover:text-white transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              onClick={nextPhoto}
              aria-label="Next photo"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white/15 border border-white/20 text-white/70 hover:bg-white/25 hover:text-white transition-all"
            >
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Verified badge — floated over the photo */}
        <div className="absolute top-6 right-6 z-10 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/12 border border-white/20 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-[#FFCC00]" aria-hidden="true" />
          <span className="text-white/85 text-xs font-semibold">Verified properties</span>
        </div>
      </div>

      {/* ── BOTTOM STATS BAR (full-width, sits below both panels) ─────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 hidden lg:block bg-black/25 backdrop-blur-sm border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-8 lg:gap-12">
            {[
              { value: '40+', label: 'Cities' },
              { value: '200+', label: 'Universities' },
              { value: '15k+', label: 'Students helped' },
              { value: '3', label: 'Countries' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="text-[#FFCC00] font-extrabold text-base">{stat.value}</span>
                <span className="text-white/45 text-xs">{stat.label}</span>
              </div>
            ))}
            <div className="ml-auto">
              <Link
                href="/get-matched"
                className="text-[#FFCC00] text-xs font-semibold hover:text-white transition-colors flex items-center gap-1"
              >
                Get personalised recommendations
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
