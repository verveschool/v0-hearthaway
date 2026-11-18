import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cities, getCityBySlug, getUniversitiesByCity } from '@/lib/place-data'
import { accommodationListings } from '@/app/accommodation/listing-data'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { PRICE_AVAILABILITY_NOTICE } from '@/app/accommodation/presentation'

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
  const cityProperties = accommodationListings
    .filter((property) => property.city.toLowerCase() === city.name.toLowerCase())
    .map((property) => ({
      ...property,
      primaryListingSlug: property.slug,
      image: property.coverImage ?? property.roomTypes.find((room) => room.image)?.image ?? '',
      roomTypes: property.roomTypes.map((room) => room.name),
    }))
  const countryName = city.country

  return (
    <>
      <Navigation />
      <main>
        {/* Compact, text-only city hero */}
        <section className="bg-[#00319D] px-6 pt-24 pb-10 lg:pt-28 lg:pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold text-white/80">
                {city.name}, {countryName}
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance mb-4 leading-tight">
                Student properties in {city.name}.
              </h1>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-5">
                {toSentenceCase(city.studentPositioning)}
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
                  {city.universities} universities
                </div>
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
                  {city.avgRent}
                </div>
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
                  {countryName}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-5">
              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Student housing in {city.name}
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed mb-4">
                  {toSentenceCase(city.description)}
                </p>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  {toSentenceCase(city.studentPositioning)}
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Typical Rent And Budgeting
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="rounded-2xl bg-white border border-[#E8E6E1] p-6">
                    <div className="text-xs text-[#6B6860] font-bold tracking-widest uppercase mb-2">
                      Average rent range
                    </div>
                    <div className="font-heading font-extrabold text-3xl text-[#00319D]">
                      {city.avgRent}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border border-[#E8E6E1] p-6">
                    <div className="text-xs text-[#6B6860] font-bold tracking-widest uppercase mb-2">
                      Monthly budget anchor
                    </div>
                    <div className="font-heading font-extrabold text-3xl text-[#00319D]">
                      {city.rentBudgeting.averageMonthlyRent}
                    </div>
                  </div>
                </div>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  {toSentenceCase(city.rentBudgeting.summary)}
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
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
                      className="px-4 py-3 rounded-xl bg-[#F7F6F3] border border-[#E8E6E1] text-[#00319D] font-medium"
                    >
                      {toTitleCase(area)}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-5">
                  Universities In And Near {city.name}
                </h2>

                {cityUniversities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cityUniversities.map((university) => (
                      <Link
                        key={university.slug}
                        href={`/universities/${university.slug}`}
                        className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-5 hover:border-[#FCC20A] transition-colors"
                      >
                        <div className="text-xs font-bold tracking-wider uppercase text-[#00319D] bg-[#00319D]/10 px-2.5 py-1 rounded-full inline-block mb-3">
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
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-2">Student properties in {city.name}</h2>
                    <p className="text-[#6B6860] text-base leading-relaxed">Browse {cityProperties.length} linked {cityProperties.length === 1 ? 'property' : 'properties'} with images, room types and current listing details.</p>
                  </div>
                  <Link href={`/accommodation?city=${encodeURIComponent(city.name)}`} className="shrink-0 text-sm font-bold text-[#00319D] hover:underline">View all in {city.name}</Link>
                </div>
                {cityProperties.length > 0 ? <div className="mt-6 grid gap-4 sm:grid-cols-2">{cityProperties.map((property) => <Link key={property.slug} href={`/accommodation/property/${property.primaryListingSlug}`} className="group overflow-hidden rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] hover:border-[#FCC20A] transition-colors"><div className="h-32 overflow-hidden bg-[#00319D]">{property.image ? <img src={property.image} alt={property.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" /> : <div aria-hidden="true" className="h-full w-full bg-[#E8E6E1]" />}</div><div className="p-4"><h3 className="font-heading font-bold text-[#1A1A1A]">{property.name}</h3><p className="mt-1 text-xs text-[#6B6860]">{property.roomTypes.slice(0, 2).join(' · ')}</p><p className="mt-3 text-sm font-bold text-[#00319D]">From {property.propertyPriceLabel}</p><p className="mt-2 text-xs leading-relaxed text-[#6B6860]">{PRICE_AVAILABILITY_NOTICE}</p></div></Link>)}</div> : <p className="mt-5 text-[#6B6860]">No property listings are linked to {city.name} yet.</p>}
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
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
                      <div className="w-8 h-8 rounded-full bg-[#FCC20A] text-[#333333] font-extrabold flex items-center justify-center mb-4">
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

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
