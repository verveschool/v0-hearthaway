import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getCityBySlug, getUniversityBySlug, universities } from '@/lib/place-data'

export function generateStaticParams() {
  return universities.map((university) => ({ slug: university.slug }))
}

type UniversityPageProps = {
  params: Promise<{
    slug: string
  }>
}

function toSentenceCase(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return trimmed
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
}

function toTitleCase(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function countryLabel(code: string) {
  if (code === 'UK') return 'United Kingdom'
  if (code === 'IE') return 'Ireland'
  if (code === 'AU') return 'Australia'
  if (code === 'FR') return 'France'
  return code
}

export async function generateMetadata({ params }: UniversityPageProps): Promise<Metadata> {
  const { slug } = await params
  const university = getUniversityBySlug(slug)

  if (!university) {
    return {
      title: 'University not found',
    }
  }

  const city = university.citySlug ? getCityBySlug(university.citySlug) : undefined
  const cityName = city?.name ?? university.city
  const countryName = city?.country ?? countryLabel(university.country)

  return {
    title: `${university.name} Student Accommodation | HearthAway`,
    description: `Find student accommodation near ${university.name} in ${cityName}, ${countryName}. Explore housing costs, best student areas, and related universities.`,
  }
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { slug } = await params
  const university = getUniversityBySlug(slug)

  if (!university) {
    notFound()
  }

  const city = university.citySlug ? getCityBySlug(university.citySlug) : undefined
  const cityHref = city ? `/cities/${city.slug}` : undefined

  const relatedUniversities = universities.filter(
    (u) => u.city === university.city && u.slug !== university.slug,
  )

  const countryName = city?.country ?? countryLabel(university.country)

  return (
    <>
      <Navigation />
      <main>
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">
                University housing guide
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Student accommodation near {university.name}.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Find student accommodation near {university.name}. Explore housing costs, popular student neighbourhoods, and practical guidance for living in {university.city}.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                  {university.city}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                  {countryName}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                  {university.students} students
                </div>
              </div>

              <Link
                href="/get-matched"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#FFCC00] text-[#1B365D] font-extrabold text-lg rounded-xl hover:bg-[#E6B800] transition-colors shadow-xl shadow-[#FFCC00]/20"
              >
                Get matched
              </Link>
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
                    University Overview
                  </span>
                </div>

                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Student Accommodation Near {university.name}
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed mb-4">
                  {university.name} is located in {university.city}, {countryName}, and is home to more than {university.students} students.
                </p>

                {city && (
                  <>
                    <p className="text-[#6B6860] text-base leading-relaxed mb-4">
                      {toSentenceCase(city.description)}
                    </p>

                    <p className="text-[#6B6860] text-base leading-relaxed">
                      {toSentenceCase(city.studentPositioning)}
                    </p>
                  </>
                )}
              </section>

              {city && (
                <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                    <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                      Housing Costs
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-6">
                    Student Housing Costs in {city.name}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white border border-[#E8E6E1] rounded-2xl p-5">
                      <div className="text-sm text-[#6B6860] mb-2">
                        Typical Rent Range
                      </div>
                      <div className="text-2xl font-bold text-[#1B365D]">
                        {city.avgRent}
                      </div>
                    </div>

                    <div className="bg-white border border-[#E8E6E1] rounded-2xl p-5">
                      <div className="text-sm text-[#6B6860] mb-2">
                        Average Monthly Rent
                      </div>
                      <div className="text-2xl font-bold text-[#1B365D]">
                        {city.rentBudgeting.averageMonthlyRent}
                      </div>
                    </div>
                  </div>

                  <p className="text-[#6B6860] text-base leading-relaxed">
                    {toSentenceCase(city.rentBudgeting.summary)}
                  </p>
                </section>
              )}

              {city && (
                <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                    <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                      Best Areas For Students
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                    Student Neighbourhoods in {city.name}
                  </h2>

                  <p className="text-[#6B6860] text-base leading-relaxed mb-6">
                    {toSentenceCase(city.bestAreasForStudents.summary)}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {city.bestAreasForStudents.topNeighbourhoods.map((area) => (
                      <div
                        key={area}
                        className="px-4 py-3 rounded-xl bg-[#F7F6F3] border border-[#E8E6E1] text-[#1B365D] font-medium"
                      >
                        {toTitleCase(area)}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {relatedUniversities.length > 0 && (
                <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                    <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                      Other Universities
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-6">
                    Other Universities in {university.city}
                  </h2>

                  <div className="grid gap-4">
                    {relatedUniversities.map((u) => (
                      <Link
                        key={u.slug}
                        href={`/universities/${u.slug}`}
                        className="rounded-2xl border border-[#E8E6E1] p-5 hover:border-[#FFCC00] transition-colors"
                      >
                        <div className="font-bold text-[#1A1A1A] mb-1">
                          {u.name}
                        </div>
                        <div className="text-sm text-[#6B6860]">
                          {u.students} students
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Student Housing FAQ
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-5">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#F7F6F3] border border-[#E8E6E1] p-5">
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-base mb-2">
                      When should I start looking for student accommodation?
                    </h3>
                    <p className="text-[#6B6860] text-sm leading-relaxed">
                      Start as soon as your offer or likely study location is clear. Availability, contract dates, and prices can change quickly near intake periods, so early planning gives you more room to compare options.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F7F6F3] border border-[#E8E6E1] p-5">
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-base mb-2">
                      Should I choose housing closest to campus?
                    </h3>
                    <p className="text-[#6B6860] text-sm leading-relaxed">
                      Not always. A slightly longer commute can be worthwhile if it improves budget fit, room quality, transport access, or lifestyle. Confirm your course building before deciding.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F7F6F3] border border-[#E8E6E1] p-5">
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-base mb-2">
                      What budget details should I prepare?
                    </h3>
                    <p className="text-[#6B6860] text-sm leading-relaxed">
                      Prepare your monthly rent limit, deposit budget, bills preference, transport budget, and move-in date. These details make it easier to compare housing fairly.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F7F6F3] border border-[#E8E6E1] p-5">
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-base mb-2">
                      How can HearthAway help me decide?
                    </h3>
                    <p className="text-[#6B6860] text-sm leading-relaxed">
                      Tell us your course, budget, and move-in date. We can help you understand the trade-offs around location, commute, contract timing, and suitable housing types.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-6">
                <h2 className="font-heading font-bold text-xl text-[#1A1A1A] mb-3">
                  Need help near {university.name}?
                </h2>
                <p className="text-[#6B6860] text-sm leading-relaxed mb-5">
                  Tell us your course, budget, and move-in date. We will help you plan location, timing, commute, and housing type.
                </p>

                {cityHref && (
                  <Link
                    href={cityHref}
                    className="inline-flex w-full items-center justify-center gap-3 px-7 py-4 bg-white text-[#1B365D] border border-[#E8E6E1] font-bold text-base rounded-xl hover:border-[#1B365D]/30 transition-colors shadow-sm mb-3"
                  >
                    View the {university.city} city guide
                  </Link>
                )}

                <Link
                  href="/get-matched"
                  className="inline-flex w-full items-center justify-center gap-3 px-7 py-4 bg-[#1B365D] text-white font-bold text-base rounded-xl hover:bg-[#24497D] transition-colors shadow-md"
                >
                  Get matched
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-[#F7F6F3] py-24 lg:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl bg-[#0F2240] p-10 lg:p-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-7">
                  <div className="w-2 h-2 rounded-full bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-white/70 text-sm font-semibold">
                    Free to use and no commitment required
                  </span>
                </div>
                <h2 className="font-heading text-4xl lg:text-[3rem] font-extrabold text-white leading-[1.08] tracking-tight text-balance mb-6">
                  Get matched near <span className="text-[#FFCC00]">{university.name}</span>.
                </h2>
                <p className="text-white/65 text-lg leading-relaxed mb-10">
                  Tell us your course, budget, and move-in date. An accommodation advisor will help you understand your next best steps.
                </p>
                <Link
                  href="/get-matched"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#FFCC00] text-[#1B365D] font-extrabold text-lg rounded-xl hover:bg-[#E6B800] transition-colors shadow-xl shadow-[#FFCC00]/20"
                >
                  Start matching
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
