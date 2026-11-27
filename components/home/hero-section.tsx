import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const countryLinks: Record<string, string> = { UK: '/uk', Ireland: '/ireland', Australia: '/australia', Germany: '/germany', UAE: '/uae', Singapore: '/singapore', Netherlands: '/netherlands', France: '/france', Italy: '/italy', Spain: '/spain', Austria: '/austria', Belgium: '/belgium', Hungary: '/hungary', Malta: '/malta', Malaysia: '/malaysia' };

const countries = [
  'UK',
  'Ireland',
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
  return (
    <section id="home-hero" className="bg-[#F7F6F3] px-4 pb-8 pt-8 font-sans sm:px-6 lg:flex lg:min-h-[calc(100svh-12rem)] lg:flex-col lg:justify-center lg:px-10 lg:pb-24 lg:pt-16 xl:px-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 lg:flex-row lg:gap-12">

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
            className="mt-6 flex flex-wrap items-center gap-1.5 sm:flex-col sm:flex-nowrap sm:items-start sm:gap-2"
          >
            {[countries.slice(0, 6), countries.slice(6, 12), countries.slice(12)].map(
              (row, rowIndex) => (
                <div key={rowIndex} className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-2">
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

        <div className="flex w-full justify-center lg:w-[46%]">
          <Image
            src="/images/hearthaway-welcome.webp"
            alt="A student with a suitcase is welcomed through an open yellow door."
            width={824}
            height={966}
            sizes="(max-width: 639px) 75vw, (max-width: 1023px) 328px, 420px"
            preload
            className="h-auto w-full max-w-[min(75vw,20.5rem)] lg:max-w-[26.25rem]"
          />
        </div>
      </div>

    </section>
  )
}
