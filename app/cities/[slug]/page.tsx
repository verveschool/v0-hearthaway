import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cities, getCityBySlug, getUniversitiesByCity } from '@/lib/place-data'
import MatchedCTA from '@/components/matched-cta'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }))
}

type CityPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params
  const city = getCityBySlug(slug)

  if (!city) {
    notFound()
  }

  const cityUniversities = getUniversitiesByCity(city.name)

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative bg-[#1B365D] pt-28 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <Image
              src={city.image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2240]/95 via-[#0F2240]/80 to-[#0F2240]/30" />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">
                {city.country} student housing guide
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Student housing in {city.name}.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {city.studentPositioning}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/get-matched"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#FFCC00] text-[#1B365D] font-extrabold text-lg rounded-xl hover:bg-[#E6B800] transition-colors shadow-xl"
                >
                  Get matched in {city.name}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    City overview
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Student housing in {city.name}
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  {city.description} HearthAway helps students understand the city before comparing suitable housing routes, so this guide focuses on planning decisions rather than live room inventory.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Placeholder guidance
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Best areas for students
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed mb-5">
                  {city.bestAreasForStudents?.summary}
                </p>
                {city.bestAreasForStudents?.requiredInputs && (
                  <div className="bg-white rounded-2xl border border-[#E8E6E1] p-5">
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-sm mb-3">
                      Required inputs before publishing exact area guidance
                    </h3>
                    <ul className="space-y-2">
                      {city.bestAreasForStudents.requiredInputs.map((input, idx) => (
                        <li key={`area-input-${idx}`} className="flex items-start gap-2 text-[#6B6860] text-sm leading-relaxed">
                          <span className="mt-2 w-2 h-2 rounded-full bg-[#FFCC00] flex-shrink-0" aria-hidden="true" />
                          {input}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Budget planning
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Typical rent and budgeting
                </h2>
                <div className="rounded-2xl bg-[#F7F6F3] border border-[#E8E6E1] p-6 mb-5">
                  <div className="text-xs text-[#6B6860] font-bold tracking-widest uppercase mb-2">Average rent guide</div>
                  <div className="font-heading font-extrabold text-3xl text-[#1B365D]">{city.avgRent}</div>
                </div>
                <p className="text-[#6B6860] text-base leading-relaxed mb-5">
                  Use this as an early planning range, then add utilities, deposits, transport, groceries, bedding, and arrival costs. Your actual monthly budget will depend on room type, contract length, and included bills.
                </p>
                {city.rentBudgeting?.requiredInputs && (
                  <div className="bg-white rounded-2xl border border-[#E8E6E1] p-5">
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-sm mb-3">
                      Required inputs for a more exact budget
                    </h3>
                    <ul className="space-y-2">
                      {city.rentBudgeting.requiredInputs.map((input, idx) => (
                        <li key={`budget-input-${idx}`} className="flex items-start gap-2 text-[#6B6860] text-sm leading-relaxed">
                          <span className="mt-2 w-2 h-2 rounded-full bg-[#FFCC00] flex-shrink-0" aria-hidden="true" />
                          {input}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Campus access
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-5">
                  Universities in/near {city.name}
                </h2>
                {cityUniversities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cityUniversities.map((university, idx) => (
                      <div key={`uni-${university.slug || idx}`} className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-5">
                        <div className="text-xs font-bold tracking-wider uppercase text-[#1B365D] bg-[#1B365D]/10 px-2.5 py-1 rounded-full inline-block mb-3">
                          {university.country}
                        </div>
                        <h3 className="font-heading font-bold text-[#1A1A1A] text-sm leading-snug mb-1">
                          {university.name}
                        </h3>
                        <p className="text-[#6B6860] text-xs">{university.students} students</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#6B6860] text-base leading-relaxed">
                    Placeholder guidance: add named universities near {city.name} before publishing a complete campus list.
                  </p>
                )}
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Advisor support
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  How HearthAway helps
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    'Share your university, dates, budget, and preferences.',
                    'Get guidance on locations and housing types that fit your study plans.',
                    'Move forward with verified options when you are ready to choose.'
                  ].map((item, index) => (
                    <div key={`support-step-${index}`} className="rounded-2xl bg-[#F7F6F3] border border-[#E8E6E1] p-5">
                      <div className="w-8 h-8 rounded-full bg-[#FFCC00] text-[#1B365D] font-extrabold flex items-center justify-center mb-4">
                        {index + 1}
                      </div>
                      <p className="text-[#6B6860] text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <MatchedCTA
                  variant="compact"
                  title={`Planning for ${city.name}?`}
                  description={"Tell us where you will study and we will help match your budget, commute, and arrival plans."}
                  buttonText="Get Matched"
                  buttonHref="/get-matched"
                />
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-[#F7F6F3] py-24 lg:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <MatchedCTA
              variant="full"
              title={<span>Ready to plan your move to <span className="text-[#FFCC00]">{city.name}</span>?</span>}
              description={"Tell us your university, move-in date, and budget. An accommodation advisor will help you understand your next best steps."}
              buttonText={`Get matched for ${city.name}`}
              buttonHref="/get-matched"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
