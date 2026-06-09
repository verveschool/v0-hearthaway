import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Search } from 'lucide-react'

const universities = [
  { name: 'University of Manchester', city: 'Manchester', country: 'UK', students: '40,000+', slug: 'manchester' },
  { name: 'University College London', city: 'London', country: 'UK', students: '42,000+', slug: 'ucl' },
  { name: 'University of Edinburgh', city: 'Edinburgh', country: 'UK', students: '35,000+', slug: 'edinburgh' },
  { name: 'University of Birmingham', city: 'Birmingham', country: 'UK', students: '38,000+', slug: 'birmingham' },
  { name: 'University of Bristol', city: 'Bristol', country: 'UK', students: '25,000+', slug: 'bristol' },
  { name: 'University of Leeds', city: 'Leeds', country: 'UK', students: '36,000+', slug: 'leeds' },
  { name: 'University of Sheffield', city: 'Sheffield', country: 'UK', students: '29,000+', slug: 'sheffield' },
  { name: "King's College London", city: 'London', country: 'UK', students: '31,000+', slug: 'kcl' },
  { name: 'Trinity College Dublin', city: 'Dublin', country: 'Ireland', students: '18,000+', slug: 'tcd' },
  { name: 'University College Dublin', city: 'Dublin', country: 'Ireland', students: '32,000+', slug: 'ucd' },
  { name: 'University College Cork', city: 'Cork', country: 'Ireland', students: '21,000+', slug: 'ucc' },
  { name: 'University of Galway', city: 'Galway', country: 'Ireland', students: '18,000+', slug: 'galway' },
  { name: 'University of Melbourne', city: 'Melbourne', country: 'Australia', students: '52,000+', slug: 'melbourne' },
  { name: 'University of Sydney', city: 'Sydney', country: 'Australia', students: '60,000+', slug: 'sydney' },
  { name: 'Monash University', city: 'Melbourne', country: 'Australia', students: '86,000+', slug: 'monash' },
  { name: 'University of Queensland', city: 'Brisbane', country: 'Australia', students: '54,000+', slug: 'uq' },
]

const countryFilters = ['All', 'UK', 'Ireland', 'Australia']

export default function UniversitiesPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">Universities</div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Find accommodation near your university.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Select your university and we&apos;ll show you verified accommodation options within walking and commuting distance.
              </p>
            </div>
          </div>
        </section>

        {/* Search + List */}
        <section className="bg-[#F7F6F3] py-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6860]" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8E6E1] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1B365D] transition-colors"
                  aria-label="Search universities"
                />
              </div>
              <div className="flex gap-2">
                {countryFilters.map((f) => (
                  <button
                    key={f}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      f === 'All'
                        ? 'bg-[#1B365D] border-[#1B365D] text-white'
                        : 'bg-white border-[#E8E6E1] text-[#6B6860] hover:border-[#1B365D]/40'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* University grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {universities.map((uni) => (
                <Link
                  key={uni.slug}
                  href={`/universities/${uni.slug}`}
                  className="group bg-white rounded-2xl p-5 border border-[#E8E6E1] hover:border-[#1B365D]/30 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#1B365D] bg-[#1B365D]/8 px-2.5 py-1 rounded-full">
                      {uni.country}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-[#1A1A1A] text-sm leading-snug mb-1 group-hover:text-[#1B365D] transition-colors">
                    {uni.name}
                  </h3>
                  <p className="text-[#6B6860] text-xs">{uni.city} &middot; {uni.students} students</p>
                  <div className="mt-4 text-xs font-semibold text-[#1B365D] group-hover:translate-x-1 transition-transform inline-block">
                    View accommodation &rarr;
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-[#1B365D] rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">{"Can't find your university?"}</h3>
                <p className="text-white/70 text-sm">Tell us where you&apos;re studying and we&apos;ll find the right options for you.</p>
              </div>
              <Link
                href="/get-matched"
                className="flex-shrink-0 px-7 py-3.5 bg-[#FFCC00] text-[#1B365D] font-bold rounded-xl hover:bg-[#E6B800] transition-colors text-sm"
              >
                Get Matched
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
