'use client'

import Link from 'next/link'
import Image from 'next/image'

const steps = [
  {
    number: '01',
    title: 'Tell us about yourself',
    description:
      'Share your university, move-in date, budget, and what matters most to you. It takes about three minutes and helps us understand your situation properly.',
    detail: 'Takes 3 minutes',
    accent: 'Your situation, not just a search query.',
  },
  {
    number: '02',
    title: 'Your advisor reviews your needs',
    description:
      'A real member of our team reviews your details, checks verified properties near your campus, and builds a shortlist matched to your specific requirements.',
    detail: 'Real human guidance',
    accent: 'Not an algorithm. A person.',
  },
  {
    number: '03',
    title: 'Review and ask questions',
    description:
      'We present your matched options with honest, detailed information. Ask anything. We help you understand the differences so you can decide with confidence.',
    detail: 'No pressure, no rush',
    accent: 'Every question is a good question.',
  },
  {
    number: '04',
    title: 'Book before you fly',
    description:
      'Confirm your accommodation from home, before you travel. Arrive knowing exactly where you are going and what to expect on day one.',
    detail: 'Housing sorted before arrival',
    accent: 'Land. Do not search.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-24 lg:py-32" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-20">
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
              <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                How HearthAway works
              </span>
            </div>
            <h2 className="font-heading text-4xl lg:text-[3.25rem] font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight text-balance">
              You should not have to navigate this alone.
            </h2>
          </div>
          <div>
            <p className="text-[#6B6860] text-lg leading-relaxed mb-8">
              Finding accommodation abroad is one of the most important decisions you make before moving. Most platforms hand you a search bar and leave you to it. HearthAway pairs you with an advisor who guides you to the right decision.
            </p>
            <Link
              href="/get-matched"
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#FFCC00] text-[#1B365D] font-bold text-base rounded-xl hover:bg-[#E6B800] transition-colors shadow-sm"
            >
              Talk to an Accommodation Advisor
            </Link>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative bg-[#F7F6F3] rounded-2xl p-8 lg:p-10 border border-[#E8E6E1] hover:border-[#1B365D]/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Large background number */}
              <div
                className="absolute top-4 right-6 font-extrabold text-[7rem] leading-none text-[#1B365D]/5 select-none pointer-events-none group-hover:text-[#1B365D]/8 transition-colors"
                aria-hidden="true"
              >
                {step.number}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1B365D] text-white font-extrabold text-sm">
                    {parseInt(step.number)}
                  </span>
                  <span className="text-xs font-semibold text-[#6B6860] bg-white px-3 py-1.5 rounded-full border border-[#E8E6E1]">
                    {step.detail}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl text-[#1A1A1A] mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[#6B6860] text-base leading-relaxed mb-5">
                  {step.description}
                </p>
                <p className="text-[#1B365D] text-sm font-bold">
                  {step.accent}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nudge */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-10 border-t border-[#E8E6E1]">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-[#6B6860]">
            {['Free to use', 'No commitment required', 'UK, Ireland & Australia', 'Real team. Real guidance.'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7L5.5 10.5L12 4" stroke="#1B365D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </span>
            ))}
          </div>
          <Link
            href="/get-matched"
            className="flex-shrink-0 text-[#1B365D] font-bold text-sm border-b-2 border-[#FFCC00] pb-px hover:text-[#24497D] transition-colors"
          >
            Start the process &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
