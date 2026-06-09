const testimonials = [
  {
    quote:
      "I was so worried about finding accommodation from India before my semester started at Manchester. HearthAway made it feel manageable. I had somewhere confirmed before I even booked my flight.",
    name: 'Priya Sharma',
    origin: 'India',
    university: 'University of Manchester',
    program: 'MSc Data Science',
  },
  {
    quote:
      "I tried other websites first. They were overwhelming — hundreds of listings, no idea what was real. HearthAway was different. They actually helped me figure out what I needed.",
    name: 'Carlos Mendes',
    origin: 'Brazil',
    university: 'University College Dublin',
    program: 'MBA',
  },
  {
    quote:
      "My parents were nervous about me moving to the UK alone. When I showed them the verified property details and the support HearthAway offers, they felt much better about the decision.",
    name: 'Yuki Tanaka',
    origin: 'Japan',
    university: 'University of Edinburgh',
    program: 'LLM International Law',
  },
]

const trustMarkers = [
  {
    title: 'Verified properties only',
    description: 'Every property in our network is reviewed before it reaches you. No unverified listings, no surprises.',
  },
  {
    title: 'Near your university',
    description: 'We only show you options that make sense for your campus location and daily commute.',
  },
  {
    title: 'Within your budget',
    description: 'Your budget is a real constraint, not a filter. We help you find the best option at your price point.',
  },
  {
    title: 'Booked before you fly',
    description: 'Our goal is to have your accommodation confirmed before you board the plane. That\'s the plan.',
  },
]

export default function TrustSection() {
  return (
    <section className="bg-[#1B365D] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Trust markers */}
        <div className="mb-20">
          <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4 text-center">
            What makes HearthAway different
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white text-center text-balance mb-12 leading-tight">
            Most platforms help you search.
            <br />
            <span className="text-[#FFCC00]">We help you choose.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustMarkers.map((marker) => (
              <div
                key={marker.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFCC00] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9L7 13L15 5" stroke="#1B365D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-3">{marker.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{marker.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-10 text-center">
            From students like you
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 16 16" fill="#FFCC00" aria-hidden="true">
                      <path d="M8 1L10.06 5.26L14.72 5.96L11.36 9.24L12.12 13.88L8 11.72L3.88 13.88L4.64 9.24L1.28 5.96L5.94 5.26L8 1Z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-[#1A1A1A] leading-relaxed text-[15px] flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="pt-5 border-t border-[#E8E6E1]">
                  <div className="font-heading font-bold text-[#1A1A1A] text-sm">{t.name}</div>
                  <div className="text-[#6B6860] text-xs mt-0.5">{t.program}</div>
                  <div className="text-[#1B365D] text-xs font-medium mt-0.5">{t.university}</div>
                  <div className="text-[#6B6860] text-xs">From {t.origin}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
