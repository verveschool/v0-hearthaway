'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [activePhoto, setActivePhoto] = useState(0)

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

        {/* Left-Aligned Information Stack */}
        <div className="flex flex-col gap-3 mb-10 self-start">
          {/* Row 1: Muted Trust Label (No background pill so it doesn't look like a button) */}
          <div className="flex items-center gap-2 px-1 text-white/50 text-xs font-semibold tracking-wider uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>100% Verified Properties</span>
          </div>

          {/* Row 2: Your Original Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFCC00]/15 border border-[#FFCC00]/30 max-w-max">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" aria-hidden="true" />
            <span className="text-[#FFCC00] text-xs font-semibold tracking-wide uppercase">
              UK &bull; Ireland &bull; Australia
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-white leading-[1.08] tracking-tight mb-6 text-balance" style={{ fontSize: 'clamp(2.6rem, 4.8vw, 4rem)' }}>
          Find the right accommodation
          <span className="block mt-1" style={{ color: '#FFCC00' }}>before you arrive.</span>
        </h1>

        {/* Supporting copy */}
        <p className="text-white/70 leading-relaxed mb-4 max-w-lg" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}>
          Moving abroad for university is a big decision. Choosing where to live is one too.
        </p>
        <p className="text-white/70 leading-relaxed mb-4 max-w-lg" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}>
          Tell us where you&apos;re studying, your budget, and when you&apos;re moving.
          We&apos;ll help you find accommodation near your university and within your budget.
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
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/get-matched"
            className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#FFCC00] text-[#0F2240] font-bold text-base hover:bg-[#FFD633] active:bg-[#E6B800] transition-all shadow-lg shadow-[#FFCC00]/20 hover:shadow-[#FFCC00]/40 hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Matched
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
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
      </div>

    </section>
  )
}
