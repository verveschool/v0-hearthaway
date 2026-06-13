'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  {
    src: '/images/hero-room-1.png',
    label: 'Studio apartment, Manchester'
  },
  {
    src: '/images/hero-room-2.png',
    label: 'Shared apartment, Dublin'
  },
  {
    src: '/images/hero-room-3.png',
    label: 'En-suite room, Melbourne'
  },
  {
    src: '/images/hero-building.png',
    label: 'Purpose-built halls, London'
  }
]

const promises = [
  'Near your university',
  'Within your budget',
  'Verified and trusted'
]

export default function HeroSection() {
  const [activePhoto, setActivePhoto] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const prevPhoto = () => setActivePhoto((prev) => (prev - 1 + photos.length) % photos.length)
  const nextPhoto = () => setActivePhoto((prev) => (prev + 1) % photos.length)

  return (
    <section className="bg-[#1B365D] flex flex-col lg:flex-row items-center justify-between pt-10 lg:pt-12 pb-12 lg:pb-16 px-6 sm:px-10 lg:px-14 xl:px-20 gap-10 lg:gap-14 font-sans">

      {/* left copy panel */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[50%] max-w-2xl">

        {/* new clean trust label */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8 self-start">
          <span className="px-3.5 py-1.5 rounded-full bg-[#F2B705] text-[#1B365D] text-xs font-extrabold tracking-widest uppercase shadow-sm">
            100% verified
          </span>
          <span className="text-[#F2B705] text-xs font-bold tracking-widest uppercase">
            UK &bull; Ireland &bull; Australia
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-white leading-[1.08] tracking-tight mb-6 text-balance" style={{ fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)' }}>
          Find the right accommodation
          <span className="block mt-1 text-[#F2B705]">before you arrive.</span>
        </h1>

        <p className="text-white/90 font-medium leading-relaxed mb-4 max-w-lg" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}>
          Moving abroad for university is a big decision. Choosing where to live is one too.
        </p>
        <p className="text-white/90 font-medium leading-relaxed mb-4 max-w-lg" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}>
          Tell us where you&apos;re studying, your budget, and when you&apos;re moving.
          We&apos;ll help you find accommodation near your university and within your budget.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/get-matched"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#F2B705] text-[#111827] font-extrabold text-base hover:bg-[#D9A404] active:bg-[#B38703] transition-all shadow-lg shadow-[#F2B705]/20 hover:shadow-[#F2B705]/40 hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Matched
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* right photography panel */}
      <div className="relative w-full lg:w-[45%] aspect-[4/3] lg:aspect-[4/5] max-h-[500px] overflow-hidden rounded-3xl shadow-2xl border-4 border-white/10">
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
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1B365D]/95 via-[#1B365D]/60 to-transparent" />
          </div>
        ))}

        <div className="absolute bottom-16 left-6 right-6 z-10 flex items-end justify-between">
          <span className="text-white text-sm font-bold tracking-wide drop-shadow-md">
            {photos[activePhoto].label}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1" role="tablist" aria-label="Accommodation photos">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                role="tab"
                aria-selected={i === activePhoto}
                aria-label={`View photo ${i + 1}`}
                className="relative h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B705]"
                style={{ width: i === activePhoto ? '2.5rem' : '0.5rem', background: i === activePhoto ? '#F2B705' : 'rgba(255,255,255,0.4)' }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1B365D]/60 border border-white/30 text-white hover:bg-[#1B365D] hover:scale-105 transition-all backdrop-blur-md"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={nextPhoto}
              aria-label="Next photo"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1B365D]/60 border border-white/30 text-white hover:bg-[#1B365D] hover:scale-105 transition-all backdrop-blur-md"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}
