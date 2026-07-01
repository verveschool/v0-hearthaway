import Link from 'next/link'

import Footer from '@/components/footer'
import MatchedCTA from '@/components/matched-cta'
import Navigation from '@/components/navigation'
import { universities } from '@/lib/place-data'

export default function FranceUniversities() {
  const franceUniversities = universities.filter((university) => university.country === 'FR')

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">France universities</div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Find accommodation near your university in France.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Select your university and we&apos;ll show you verified accommodation options within walking and commuting distance.
              </p>
            </div>
          </div>
        </section>

        {/* University list */}
        <section className="bg-[#F7F6F3] py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {franceUniversities.map((university) => (
                <Link
                  key={university.slug}
                  href={`/universities/${university.slug}`}
                  className="group bg-white rounded-2xl p-5 border border-[#E8E6E1] hover:border-[#1B365D]/30 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#1B365D] bg-[#1B365D]/8 px-2.5 py-1 rounded-full">
                      {university.country}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-[#1A1A1A] text-sm leading-snug mb-1 group-hover:text-[#1B365D] transition-colors">
                    {university.name}
                  </h3>
                  <p className="text-[#6B6860] text-xs">{university.city} &middot; {university.students} students</p>
                  <div className="mt-4 text-xs font-semibold text-[#1B365D] group-hover:translate-x-1 transition-transform inline-block">
                    View accommodation &rarr;
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div>
              <MatchedCTA
                variant="full"
                title={"Can't find your university?"}
                description={"Tell us where you're studying and we'll find the right options for you."}
                buttonText="Get Matched"
                buttonHref="/get-matched"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
