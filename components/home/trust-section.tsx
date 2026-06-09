import Image from 'next/image'
import Link from 'next/link'

const testimonials = [
  {
    quote:
      "I was so worried about finding accommodation from India before my semester started at Manchester. HearthAway made it feel manageable. I had somewhere confirmed before I even booked my flight.",
    name: 'Priya Sharma',
    origin: 'India',
    university: 'University of Manchester',
    program: 'MSc Data Science',
    image: '/images/dest-uk.png',
  },
  {
    quote:
      "I tried other websites first. They were overwhelming — hundreds of listings, no idea what was real. HearthAway was different. They actually helped me figure out what I needed.",
    name: 'Carlos Mendes',
    origin: 'Brazil',
    university: 'University College Dublin',
    program: 'MBA',
    image: '/images/dest-ireland.png',
  },
  {
    quote:
      "My parents were nervous about me moving to the UK alone. When I showed them the verified property details and the support HearthAway offers, they felt much better about the decision.",
    name: 'Yuki Tanaka',
    origin: 'Japan',
    university: 'University of Edinburgh',
    program: 'LLM International Law',
    image: '/images/city-edinburgh.png',
  },
]

export default function TrustSection() {
  return (
    <section className="bg-[#1B365D] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
              <span className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase">
                From students like you
              </span>
            </div>
            <h2 className="font-heading text-4xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight text-balance">
              Students chose with confidence.
              <br />
              <span className="text-white/50">Before they flew.</span>
            </h2>
          </div>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            Every year, students from dozens of countries use HearthAway to find verified accommodation near their university — before they leave home.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col bg-white rounded-2xl overflow-hidden">
              {/* Photo header */}
              <div className="relative h-40 overflow-hidden flex-shrink-0">
                <Image
                  src={t.image}
                  alt={`Student accommodation in ${t.university}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#1B365D]/50" />
                <div className="absolute bottom-4 left-5">
                  <p className="text-white font-extrabold text-sm">{t.university}</p>
                  <p className="text-white/70 text-xs">{t.program}</p>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-7">
                {/* Stars */}
                <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="15" height="15" viewBox="0 0 16 16" fill="#FFCC00" aria-hidden="true">
                      <path d="M8 1L10.06 5.26L14.72 5.96L11.36 9.24L12.12 13.88L8 11.72L3.88 13.88L4.64 9.24L1.28 5.96L5.94 5.26L8 1Z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-[#1A1A1A] leading-relaxed text-[15px] flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="pt-5 border-t border-[#E8E6E1] flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-[#1A1A1A] text-sm">{t.name}</div>
                    <div className="text-[#6B6860] text-xs mt-0.5">From {t.origin}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1B365D]/8 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7L5.5 10.5L12 4" stroke="#1B365D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="border-t border-white/10 pt-12">
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase text-center mb-10">
            What every student gets with HearthAway
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { heading: 'Verified properties only', body: 'Every property is reviewed before it reaches you. No unverified listings.' },
              { heading: 'Near your campus', body: 'We only show options that make sense for your university location.' },
              { heading: 'Within your budget', body: 'Your budget is a constraint we respect, not a filter we ignore.' },
              { heading: 'Confirmed before arrival', body: 'Our goal: accommodation secured before you board the plane.' },
            ].map((item) => (
              <div key={item.heading} className="text-center lg:text-left">
                <div className="w-8 h-8 rounded-lg bg-[#FFCC00]/15 border border-[#FFCC00]/25 flex items-center justify-center mb-4 mx-auto lg:mx-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7L5.5 10.5L12 4" stroke="#FFCC00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-white text-sm mb-2">{item.heading}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
