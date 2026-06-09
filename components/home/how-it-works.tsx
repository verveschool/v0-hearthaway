import Link from 'next/link'

const steps = [
  {
    number: '01',
    title: 'Tell us about your situation',
    description:
      'Share your university, move-in date, budget, and what matters most to you. The more we know, the better we can help.',
    detail: 'Takes about 3 minutes',
  },
  {
    number: '02',
    title: 'We find options that fit',
    description:
      'Our team reviews verified properties near your university and shortlists options that match your needs — not just any available listing.',
    detail: 'Tailored to you',
  },
  {
    number: '03',
    title: 'Choose with confidence',
    description:
      "Review your matched properties, ask questions, and decide. We're here to help you understand the differences and make the right call.",
    detail: 'No pressure, no rush',
  },
  {
    number: '04',
    title: 'Book before you fly',
    description:
      "Secure your accommodation from home, before you travel. Arrive knowing exactly where you're going.",
    detail: 'Arrive with housing sorted',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-[#F7F6F3] py-20 lg:py-28" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-[#1B365D] text-sm font-bold tracking-widest uppercase mb-4">
            How HearthAway works
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#1A1A1A] text-balance leading-tight mb-5">
            We don&apos;t just help you search.
            <span className="text-[#1B365D]"> We help you choose.</span>
          </h2>
          <p className="text-[#6B6860] text-lg leading-relaxed">
            Most platforms show you listings. HearthAway helps you decide. From your first question to your confirmed booking, we guide you every step of the way.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl p-7 border border-[#E8E6E1] hover:border-[#1B365D]/30 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-8 border-t-2 border-dashed border-[#E8E6E1] z-10" />
              )}

              <div className="flex items-start justify-between mb-5">
                <span className="font-heading font-bold text-5xl text-[#1B365D]/10 leading-none select-none group-hover:text-[#1B365D]/20 transition-colors">
                  {step.number}
                </span>
                <span className="text-xs font-medium text-[#6B6860] bg-[#F7F6F3] px-3 py-1.5 rounded-full mt-1">
                  {step.detail}
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-[#6B6860] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/get-matched"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B365D] text-white font-bold rounded-xl hover:bg-[#24497D] transition-colors shadow-md text-base"
          >
            Start your matching process
          </Link>
          <p className="mt-3 text-[#6B6860] text-sm">Free to use. No commitment required.</p>
        </div>
      </div>
    </section>
  )
}
