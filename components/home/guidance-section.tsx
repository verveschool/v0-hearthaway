import Link from 'next/link'
import Image from 'next/image'

const pillars = [
  {
    title: 'Near your university',
    description:
      'We only recommend accommodation that makes sense for your campus location. Commute time, transport links, and proximity to your department — all considered.',
  },
  {
    title: 'Within your budget',
    description:
      'Your budget is a real constraint, not a filter to be bypassed. We find the best possible option at your price point, not the most expensive one that barely fits.',
  },
  {
    title: 'Sorted before you fly',
    description:
      'Our goal is simple: have your accommodation confirmed before you board the plane. No searching on arrival. No temporary fixes.',
  },
  {
    title: 'Support throughout',
    description:
      'Questions before you arrive? We are here. Uncertainty about a contract clause? We help. You are not alone in this process.',
  },
]

export default function GuidanceSection() {
  return (
    <section className="bg-[#F7F6F3] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top editorial statement */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
            <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
              Why HearthAway exists
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-[3.25rem] font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight text-balance">
            Most platforms help students{' '}
            <span className="italic text-[#6B6860]">search.</span>
            <br />
            HearthAway helps students{' '}
            <span className="text-[#1B365D]">choose.</span>
          </h2>
        </div>

        {/* Split panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* Photo */}
          <div className="relative h-[480px] lg:h-[560px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/guidance-panel.png"
              alt="A well-appointed student apartment bedroom with warm afternoon light"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Floating callout */}
            <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-5 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B365D] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 2C5.13 2 2 5.13 2 9s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-1.75 0-3.29-.9-4.2-2.26.02-.65 2.8-1.01 4.2-1.01 1.41 0 4.18.36 4.2 1.01C12.29 12.1 10.75 13 9 13z" fill="#FFCC00"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-sm leading-snug mb-0.5">
                    Matched to a verified studio in Manchester
                  </p>
                  <p className="text-[#6B6860] text-xs leading-relaxed">
                    &ldquo;I had three options reviewed for me within 24 hours. I chose without leaving India.&rdquo; — Kabir, MSc Data Science
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="flex flex-col gap-8">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="flex gap-5 items-start group"
              >
                <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-lg bg-[#1B365D] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7L5.5 10.5L12 4" stroke="#FFCC00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-[#1A1A1A] mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-[#6B6860] text-base leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link
                href="/get-matched"
                className="inline-flex items-center gap-3 px-7 py-4 bg-[#1B365D] text-white font-bold text-base rounded-xl hover:bg-[#24497D] transition-colors shadow-md"
              >
                Talk to an Accommodation Advisor
              </Link>
            </div>
          </div>
        </div>

        {/* Neighbourhood photo strip */}
        <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
          <Image
            src="/images/neighbourhood.png"
            alt="A tree-lined university neighbourhood street with student housing"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12243E]/80 via-[#12243E]/40 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 lg:px-14">
            <div className="max-w-lg">
              <p className="font-heading font-extrabold text-2xl lg:text-3xl text-white leading-snug mb-4 text-balance">
                The right neighbourhood makes university life significantly better.
              </p>
              <Link
                href="/cities"
                className="inline-flex items-center gap-2 text-[#FFCC00] font-bold text-sm hover:gap-3 transition-all"
              >
                Explore student cities &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
