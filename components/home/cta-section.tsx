import Link from 'next/link'
import Image from 'next/image'

export default function CtaSection() {
  return (
    <section className="bg-[#F7F6F3] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#1B365D] p-10 lg:p-16">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/cta-bg.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-15"
              aria-hidden="true"
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#FFCC00]" aria-hidden="true" />
                <span className="text-white/90 text-sm font-medium">Free matching process</span>
              </div>

              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance leading-tight mb-5">
                You&apos;ve got your place.
                <span className="text-[#FFCC00]"> Now get your home.</span>
              </h2>

              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Tell us where you&apos;re studying, your budget, and what matters to you. We&apos;ll match you with verified accommodation options near your university — before you fly.
              </p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-white/60">
                {[
                  'Takes 3 minutes',
                  'No commitment',
                  'Verified properties',
                  'UK, Ireland & Australia',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7L5.5 10.5L12 4" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-shrink-0 lg:min-w-52">
              <Link
                href="/get-matched"
                className="px-8 py-5 bg-[#FFCC00] text-[#1B365D] font-bold text-lg rounded-xl hover:bg-[#E6B800] transition-colors shadow-lg text-center"
              >
                Get Matched
              </Link>
              <Link
                href="/how-it-works"
                className="px-8 py-5 bg-white/10 border border-white/20 text-white font-semibold text-base rounded-xl hover:bg-white/20 transition-colors text-center"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
