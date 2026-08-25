```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

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

const countries = [
  'UK',
  'Ireland',
  'France',
  'Germany',
  'Italy',
  'Malta',
  'UAE',
  'Singapore',
  'Australia',
]

export default function HeroSection() {
  const [activePhoto, setActivePhoto] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const prevPhoto = () => {
    setActivePhoto((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const nextPhoto = () => {
    setActivePhoto((prev) => (prev + 1) % photos.length)
  }

  return (
    <section className="bg-[#F7F6F3] px-6 py-10 font-sans sm:px-10 lg:px-14 lg:py-12 xl:px-20 xl:py-14">
      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-10 lg:flex-row lg:gap-14">

        {/* Left copy panel */}
        <div className="relative z-10 flex w-full max-w-2xl flex-col justify-center lg:w-[50%]">

          {/* Trust badge + countries */}
          <div className="mb-6 flex max-w-xl flex-wrap items-center gap-1.5 sm:mb-8 sm:gap-2">
            <span className="shrink-0 rounded-full bg-[#00319D] px-3.5 py-1.5 text-center text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm sm:text-xs">
              100% verified
            </span>

            {countries.map((country) => (
              <span
                key={country}
                className="shrink-0 rounded-full border border-[#00319D]/20 bg-[#00319D]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#00319D] sm:text-xs"
              >
                {country}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            className="mb-6 font-heading font-extrabold leading-[1.06] tracking-tight text-balance"
            style={{ fontSize: 'clamp(3rem, 4.2vw, 3.5rem)' }}
          >
            <span className="block text-[#171717]">
              Find the right accommodation
            </span>
            <span className="block text-[#00319D]">
              before you arrive.
            </span>
          </h1>

          {/* Supporting copy */}
          <div
            className="mb-8 max-w-xl space-y-3 font-medium leading-relaxed text-[#171717]"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
          >
            <p>
              Moving abroad for university is a big decision. Choosing where to
              live is one too.
            </p>

            <p>
              We&apos;ll help you find verified accommodation near your
              university, within your budget.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-matched"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#00319D] px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-[#00319D]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00319D]/30"
            >
              Get Matched
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Right photography panel */}
        <div className="relative aspect-[4/3] max-h-[500px] w-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl lg:w-[45%] lg:aspect-[4/5]">

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
            </div>
          ))}

          {/* Photo label */}
          <div className="absolute bottom-16 left-6 right-6 z-10">
            <span className="text-sm font-bold tracking-wide text-white drop-shadow-md">
              {photos[activePhoto].label}
            </span>
          </div>

          {/* Controls */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center gap-4">
            <div
              className="flex flex-1 items-center gap-2"
              role="tablist"
              aria-label="Accommodation photos"
            >
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActivePhoto(i)}
                  role="tab"
                  aria-selected={i === activePhoto}
                  aria-label={`View photo ${i + 1}`}
                  className="relative h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  style={{
                    width: i === activePhoto ? '2.5rem' : '0.5rem',
                    background:
                      i === activePhoto
                        ? '#FFFFFF'
                        : 'rgba(255,255,255,0.55)',
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#00319D]/70 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-[#00319D]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Next photo"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#00319D]/70 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-[#00319D]"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```
