import Link from 'next/link'
import Image from 'next/image'

export default function CtaSection() {
  return (
    <section className="bg-[#F7F6F3] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0F2240] min-h-[480px] flex flex-col lg:flex-row">

          {/* Text side */}
          <div className="relative z-10 flex-1 flex flex-col justify-center p-10 lg:p-16 xl:p-20">
            <div className="inline-flex items-center gap-2 mb-7">
              <div className="w-2 h-2 rounded-full bg-[#FFCC00]" aria-hidden="true" />
              <span className="text-white/70 text-sm font-semibold">Free to use &mdash; no commitment required</span>
            </div>

            <h2 className="font-heading text-4xl lg:text-[3rem] xl:text-[3.5rem] font-extrabold text-white leading-[1.08] tracking-tight text-balance mb-6 max-w-xl">
              You&apos;ve got your place.{' '}
              <span className="text-[#FFCC00]">Now get your home.</span>
            </h2>

            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-lg">
              Tell us your university, move-in date, and budget. An accommodation advisor will match you with verified options near your campus — before you fly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/get-matched"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#FFCC00] text-[#1B365D] font-extrabold text-lg rounded-xl hover:bg-[#E6B800] transition-colors shadow-xl shadow-[#FFCC00]/20"
              >
                Talk to an Accommodation Advisor
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-white/8 border border-white/15 text-white font-bold text-base rounded-xl hover:bg-white/15 transition-colors"
              >
                How it works
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/50">
              {[
                'Takes 3 minutes',
                'No commitment',
                'Verified properties',
                'UK, Ireland & Australia',
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7L5.5 10.5L12 4" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Photo side */}
          <div className="relative lg:w-[45%] h-64 lg:h-auto overflow-hidden flex-shrink-0 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
            <Image
              src="/images/hero-room-1.png"
              alt="A bright modern student studio apartment ready for arrival"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2240]/80 via-[#0F2240]/30 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2240]/60 via-[#0F2240]/20 to-transparent lg:hidden" />

            {/* Floating stat */}
            <div className="absolute top-6 right-6 bg-white rounded-2xl p-5 shadow-2xl max-w-[200px]">
              <div className="font-extrabold text-3xl text-[#1B365D] mb-0.5">40+</div>
              <div className="text-[#6B6860] text-sm leading-snug">cities across UK, Ireland & Australia</div>
            </div>

            <div className="absolute bottom-6 right-6 bg-white/95 rounded-xl px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                <span className="text-[#1A1A1A] text-sm font-bold">Advisors available now</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
