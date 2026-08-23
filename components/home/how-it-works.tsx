'use client'

import Link from 'next/link'

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
      'We present your matched options with specific and detailed information. Ask anything. We help you understand the differences so you can decide with confidence.',
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
              <div className="w-8 h-px bg-[#FCC20A]" aria-hidden="true" />
            </div>
            <h2 className="font-heading text-4xl lg:text-[3.25rem] font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight text-balance">
              Most students find accommodation. We help them find the right one.
            </h2>
          </div>

          <div>
            <p className="text-[#6B6860] text-lg leading-relaxed mb-8">
              Finding accommodation abroad is one of the most important decisions
              you make before moving. Most platforms hand you a search bar and
              leave you to it. HearthAway pairs you with an advisor who guides you
              to the right decision.
            </p>

            <Link
              href="/get-matched"
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#FCC20A] text-[#00319D] font-bold text-base rounded-xl hover:bg-[#FCC20A] transition-colors shadow-sm"
            >
              Talk to an Accommodation Advisor
            </Link>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative bg-[#F7F6F3] rounded-2xl p-8 lg:p-10 border border-[#E8E6E1] hover:border-[#00319D]/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div
                className="absolute top-4 right-6 font-extrabold text-[7rem] leading-none text-[#00319D]/5 select-none pointer-events-none group-hover:text-[#00319D]/8 transition-colors"
                aria-hidden="true"
              >
                {step.number}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#00319D] text-white font-extrabold text-sm">
                    {parseInt(step.number, 10)}
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

                <p className="text-[#00319D] text-sm font-bold">
                  {step.accent}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
