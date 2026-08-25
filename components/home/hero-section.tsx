'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

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
    <div className="font-sans">

      {/* HEADER */}
      <header className="bg-white border-b border-black/5">
        <div className="mx-auto flex h-20 items-center justify-between px-6 sm:px-10 lg:px-14 xl:px-20">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="HearthAway"
              width={170}
              height={42}
              priority
              className="h-auto w-[150px] sm:w-[165px]"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/universities"
              className="inline-flex items-center gap-1 text-[#00319D] text-[15px] font-bold transition-opacity hover:opacity-70"
            >
              Universities
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/cities"
              className="inline-flex items-center gap-1 text-[#00319D] text-[15px] font-bold transition-opacity hover:opacity-70"
            >
              Cities
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/resources"
              className="text-[#00319D] text-[15px] font-bold transition-opacity hover:opacity-70"
            >
              Resources
            </Link>

            <Link
              href="/about"
              className="text-[#00319D] text-[15px] font-bold transition-opacity hover:opacity-70"
            >
              About
            </Link>

            <Link
              href="/get-matched"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FCC20A] px-7 py-3.5 text-[15px] font-extrabold text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              Get Matched
            </Link>
          </nav>

          {/* Mobile CTA */}
          <Link
            href="/get-matched"
            className="lg:hidden inline-flex items-center justify-center rounded-xl bg-[#FCC20A] px-5 py-3 text-sm font-extrabold text-white"
          >
            Get Matched
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#00319D] flex flex-col lg:flex-row items-center justify-between pt-10 lg:pt-12 pb-12 lg:pb-16 px-6 sm:px-10 lg:px-14 xl:px-20 gap-10 lg:gap-14">

        {/* LEFT COPY */}
        <div className="relative z-10 flex w-full max-w-2xl flex-col justify-center lg:w-[50%]">

          {/* Trust + countries */}
          <div className="mb-6 sm:mb-8 flex max-w-xl flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="shrink-0 rounded-full bg-[#FCC20A] px-3.5 py-1.5 text-center text-[10px] font-extrabold uppercase tracking-widest text-[#00319D] shadow-sm sm:text-xs">
              100% verified
            </span>

            {countries.map((country) => (
              <span
                key={country}
                className="shrink-0 rounded-full border border-[#FCC20A]/50 bg-[#FCC20A]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#FCC20A] sm:text-xs"
              >
                {country}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            className="font-heading font-extrabold leading-[1.06] tracking-tight text-white text-balance mb-6"
            style={{ fontSize: 'clamp(2.6rem, 4.8vw, 4rem)' }}
          >
            Find the right accommodation
            <span className="mt-1 block text-[#FCC20A]">
              before you arrive.
            </span>
          </h1>

          {/* Shortened copy */}
          <p
            className="mb-8 max-w-xl font-medium leading-relaxed text-white/90"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
          >
            Moving abroad for university is a big decision. We&apos;ll help you
            find verified accommodation near your university and within your budget.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-matched"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#FCC20A] px-8 py-4 text-base font-extrabold text-[#00319D] shadow-lg shadow-[#FCC20A]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#FCC20A]/40 active:bg-[#FCC20A]"
            >
              Get Matched
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* RIGHT PHOTO */}
        <div className="relative aspect-[4/3] max-h-[500px] w-full overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl lg:w-[45%] lg:aspect-[4/5]">

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
          <div className="absolute bottom-16 left-6 right-6 z-10 flex items-end justify-between">
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
                  onClick={() => setActivePhoto(i)}
                  role="tab"
                  aria-selected={i === activePhoto}
                  aria-label={`View photo ${i + 1}`}
                  className="relative h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FCC20A]"
                  style={{
                    width: i === activePhoto ? '2.5rem' : '0.5rem',
                    background:
                      i === activePhoto
                        ? '#FCC20A'
                        : 'rgba(255,255,255,0.4)',
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#00319D]/60 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-[#00319D]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#00319D]/60 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-[#00319D]"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
