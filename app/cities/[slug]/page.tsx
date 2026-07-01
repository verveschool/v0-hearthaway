import type { Metadata } from 'next'
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

function toSentenceCase(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return trimmed
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
}

function toTitleCase(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

function countryLabel(code: string) {
  if (code === 'UK') return 'United Kingdom'
  if (code === 'IE') return 'Ireland'
  if (code === 'AU') return 'Australia'
  if (code === 'FR') return 'France'
  return code
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params
  const city = getCityBySlug(slug)

  if (!city) {
    return {
      title: 'City not found',
    }
  }

  return {
    title: `${city.name} Student Housing | HearthAway`,
    description: `Explore student housing in ${city.name}, ${city.country}. See rent ranges, student areas, and universities near campus.`,
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params
  const city = getCityBySlug(slug)

  if (!city) {
    notFound()
  }

  const cityUniversities = getUniversitiesByCity(city.name)
  const countryName = countryLabel(city.countryCode)

  return (
    <>
      <Navigation />
      <main>
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
                {countryName} student housing guide
              </div>

              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Student housing in {city.name}.
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {toSentenceCase(city.studentPositioning)}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                  {city.universities} universities
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                  {city.avgRent}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                  {countryName}
                </div>
              </div>

              <Link
                href="/get-matched"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#FFCC00] text-[#1B365D] font-extrabold text-lg rounded-xl hover:bg-[#E6B800] transition-colors shadow-xl"
              >
                Get matched in {city.name}
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
                    City Overview
                  </span>
                </div>

                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Student Housing In {city.name}
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed mb-4">
                  {toSentenceCase(city.description)}
                </p>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  {toSentenceCase(city.studentPositioning)}
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Budget Planning
                  </span>
                </div>

                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Typical Rent And Budgeting
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="rounded-2xl bg-white border border-[#E8E6E1] p-6">
                    <div className="text-xs text-[#6B6860] font-bold tracking-widest uppercase mb-2">
                      Average rent range
                    </div>
                    <div className="font-heading font-extrabold text-3xl text-[#1B365D]">
                      {city.avgRent}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border border-[#E8E6E1] p-6">
                    <div className="text-xs text-[#6B6860] font-bold tracking-widest uppercase mb-2">
                      Monthly budget anchor
                    </div>
                    <div className="font-heading font-extrabold text-3xl text-[#1B365D]">
                      {city.rentBudgeting.averageMonthlyRent}
                    </div>
                  </div>
                </div>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  {toSentenceCase(city.rentBudgeting.summary)}
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Best Areas For Students
                  </span>
                </div>

                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Student Neighbourhoods In {city.name}
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

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Universities
                  </span>
                </div>

                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-5">
                  Universities In And Near {city.name}
                </h2>

                {cityUniversities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cityUniversities.map((university) => (
                      <Link
                        key={university.slug}
                        href={`/universities/${university.slug}`}
                        className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-5 hover:border-[#FFCC00] transition-colors"
                      >
                        <div className="text-xs font-bold tracking-wider uppercase text-[#1B365D] bg-[#1B365D]/10 px-2.5 py-1 rounded-full inline-block mb-3">
                          {university.country}
                        </div>
                        <h3 className="font-heading font-bold text-[#1A1A1A] text-sm leading-snug mb-1">
                          {university.name}
                        </h3>
                        <p className="text-[#6B6860] text-xs">
                          {university.students} students
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#6B6860] text-base leading-relaxed">
                    No university entries are linked to {city.name} yet.
                  </p>
                )}
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Advisor Support
                  </span>
                </div>

                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  How HearthAway Helps
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    'Share your university, move-in date, budget, and room preferences.',
                    'Get guidance on locations and housing types that fit your study plans.',
                    'Move forward with verified options when you are ready to choose.',
                  ].map((item, index) => (
                    <div
                      key={`support-step-${index}`}
                      className="rounded-2xl bg-[#F7F6F3] border border-[#E8E6E1] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#FFCC00] text-[#1B365D] font-extrabold flex items-center justify-center mb-4">
                        {index + 1}
                      </div>
                      <p className="text-[#6B6860] text-sm leading-relaxed">
                        {item}
                      </p>
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
                  description="Tell us where you will study and we will help match your budget, commute, and arrival plans."
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
              title={
                <span>
                  Ready to plan your move to{' '}
                  <span className="text-[#FFCC00]">{city.name}</span>?
                </span>
              }
              description="Tell us your university, move-in date, and budget. An accommodation advisor will help you understand your next best steps."
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
