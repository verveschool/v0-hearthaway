'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const countryLinks: Record<string, string> = { UK: '/uk', Ireland: '/ireland', USA: '/usa', Canada: '/canada', Australia: '/australia', Germany: '/germany', UAE: '/uae', Singapore: '/singapore', Netherlands: '/netherlands', France: '/france', Italy: '/italy', Spain: '/spain', Austria: '/austria', Belgium: '/belgium', Hungary: '/hungary', Malta: '/malta', Malaysia: '/malaysia' };

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
  'USA',
  'Canada',
  'Australia',
  'Germany',
  'UAE',
  'Singapore',
  'Netherlands',
  'France',
  'Italy',
  'Spain',
  'Austria',
  'Belgium',
  'Hungary',
  'Malta',
  'Malaysia',
];

export default function HeroSection() {
  const [activePhoto, setActivePhoto] = useState(0)
  const [slideAnnouncement, setSlideAnnouncement] = useState('')
  const pauseAutoplay = useRef(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const interval = window.setInterval(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (document.visibilityState === 'visible' && !pauseAutoplay.current && !prefersReducedMotion) {
        setActivePhoto((currentPhoto) => (currentPhoto + 1) % photos.length)
      }
    }, 5200)

    return () => window.clearInterval(interval)
  }, [])

  const selectPhoto = (index: number) => {
    setActivePhoto(index)
    setSlideAnnouncement(`Showing slide ${index + 1} of ${photos.length}: ${photos[index].label}`)
  }

  const prevPhoto = () => {
    selectPhoto((activePhoto - 1 + photos.length) % photos.length)
  }

  const nextPhoto = () => {
    selectPhoto((activePhoto + 1) % photos.length)
  }

  return (
    <section className="bg-[#F7F6F3] px-4 py-8 font-sans sm:px-6 sm:py-12 lg:px-10 lg:py-16 xl:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row lg:gap-14">

        {/* Left copy panel */}
        <div className="relative z-10 flex w-full max-w-2xl flex-col justify-center lg:w-[50%]">

          {/* Headline */}
          <h1 className="hero-enter hero-enter-delay-1 mb-5 font-heading text-[1.9rem] font-extrabold leading-[1.08] tracking-tight text-balance sm:mb-6 sm:text-[clamp(2.35rem,3.8vw,3.25rem)] sm:leading-[1.04]">
            <span className="text-[#171717]">Finding </span>
            <span className="text-[#01329C]">home</span>
            <span className="text-[#171717]">, wherever you go.</span>
          </h1>
          
          {/* Supporting copy */}
          <div
            className="hero-enter hero-enter-delay-2 mb-8 max-w-xl space-y-3 font-medium leading-relaxed text-[#171717]"
            style={{ fontSize: 'clamp(0.98rem, 1.45vw, 1.08rem)' }}
          >
            <p>
              Near your university. Within your budget.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="hero-enter hero-enter-delay-3 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-matched"
              className="brand-cta group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border-2 border-black bg-[#FEBB01] px-8 py-4 text-base font-extrabold text-black"
              style={{ border: '2px solid #000000' }}
            >
              Get Matched
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <nav
            aria-label="Browse student properties by country"
            className="mt-6 flex flex-col items-start gap-2"
          >
            {[countries.slice(0, 6), countries.slice(6, 12), countries.slice(12)].map(
              (row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {row.map((country) => (
                    <Link
                      key={country}
                      href={countryLinks[country] ?? '/universities'}
                      className="country-chip inline-flex min-h-8 items-center rounded-full border border-[#01329C]/15 bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#01329C] transition-all hover:border-[#01329C] hover:bg-[#01329C] hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01329C] focus-visible:ring-offset-2 sm:text-[11px]"
                    >
                      {country}
                    </Link>
                  ))}
                </div>
              )
            )}
          </nav>
        </div>

        {/* Right photography panel (Carousel format with A11y enhancements) */}
        <div
          className="relative aspect-[4/3] max-h-[560px] w-full touch-pan-y overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_24px_70px_rgba(1,50,156,0.14)] lg:w-[45%] lg:aspect-[0.92/1]"
          role="region"
          aria-roledescription="carousel"
          aria-label="Student property preview showcase"
          onMouseEnter={() => {
            pauseAutoplay.current = true
          }}
          onMouseLeave={(event) => {
            if (!event.currentTarget.contains(document.activeElement)) {
              pauseAutoplay.current = false
            }
          }}
          onFocusCapture={() => {
            pauseAutoplay.current = true
          }}
          onBlurCapture={(event) => {
            const nextTarget = event.relatedTarget

            if (
              (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) &&
              !event.currentTarget.matches(':hover')
            ) {
              pauseAutoplay.current = false
            }
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null
            pauseAutoplay.current = true
          }}
          onTouchEnd={(event) => {
            const startX = touchStartX.current
            const endX = event.changedTouches[0]?.clientX

            if (startX !== null && endX !== undefined && Math.abs(startX - endX) > 48) {
              if (startX > endX) {
                nextPhoto()
              } else {
                prevPhoto()
              }
            }

            touchStartX.current = null
            pauseAutoplay.current = false
          }}
          onTouchCancel={() => {
            touchStartX.current = null
            pauseAutoplay.current = false
          }}
        >
          {/* Screen reader live region announcements */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {slideAnnouncement}
          </div>

          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === activePhoto ? 1 : 0 }}
              aria-hidden={i !== activePhoto}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${photos.length}: ${photo.label}`}
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                className="object-cover object-center"
                priority={i === 0}
                sizes="(max-width: 1023px) 100vw, 45vw"
              />
            </div>
          ))}

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          />

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
              role="group"
              aria-label="Choose a student property preview image"
            >
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectPhoto(i)}
                  aria-pressed={i === activePhoto}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
                aria-label="Previous image slide"
                className="flex size-10 items-center justify-center rounded-full border border-white/40 bg-[#01329C]/80 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-[#01329C] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Next image slide"
                className="flex size-10 items-center justify-center rounded-full border border-white/40 bg-[#01329C]/80 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-[#01329C] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
