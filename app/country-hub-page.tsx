import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import Footer from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'

import type { CountryPlace } from '@/lib/country-data'
import { cities, universities } from '@/lib/place-data'

type CountryHubPageProps = {
  country: CountryPlace
}

export default function CountryHubPage({ country }: CountryHubPageProps) {
  const countryName = ['uk', 'uae', 'usa', 'netherlands'].includes(country.slug)
    ? `the ${country.name}`
    : country.name
  const featuredCities = country.citySlugs
    .map((slug) => cities.find((city) => city.slug === slug))
    .filter((city) => city !== undefined)

  const featuredUniversities = country.universitySlugs
    .map((slug) => universities.find((university) => university.slug === slug))
    .filter((university) => university !== undefined)

  return (
    <>
      <Navigation />
      <main>
        <PageBanner
          title={`Study in ${countryName}`}
          action={{ label: 'Explore student cities', href: '#student-cities' }}
        />

        {/* Overview */}
        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#F7F6F3] rounded-2xl p-7 border border-[#E8E6E1]">
              <h2 className="font-heading font-bold text-2xl lg:text-3xl text-[#1A1A1A] mb-4 text-balance">
                Studying and finding housing in {country.name}
              </h2>
              <p className="text-[#6B6860] text-base leading-relaxed">
                {country.overview}
              </p>
              <p className="mt-4 text-sm font-semibold text-[#6B6860]">
                {country.universityCount} universities · Currency: {country.currency}
              </p>
              <Link
                href="/get-matched"
                className="brand-cta mt-6 inline-flex px-8 py-4 font-bold shadow-lg"
              >
                Get Matched
              </Link>
            </div>
            <div className="bg-[#00319D] rounded-2xl p-7">
              <h2 className="mb-4 font-heading text-lg font-extrabold text-white">Housing notes</h2>
              <p className="text-white/75 text-sm leading-relaxed">
                {country.studentHousingNotes}
              </p>
            </div>
          </div>
        </section>

        {/* Featured cities */}
        <section id="student-cities" className="scroll-mt-28 bg-[#F7F6F3] py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-7">
              <div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A]">Explore student cities</h2>
              </div>
              <Link
                href="/cities"
                className="text-[#00319D] font-semibold text-sm border-b-2 border-[#FCC20A] pb-0.5 hover:text-[#00319D] transition-colors"
              >
                View all cities
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[#E8E6E1] hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="relative h-52 overflow-hidden">
{city.image ? (
                    <Image
                      src={city.image}
                      alt={`View of ${city.name}`}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
) : <div className="flex h-full items-center justify-center bg-[#00319D] px-4 text-center text-xl font-bold text-white">{city.name}</div>}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-heading font-bold text-[#1A1A1A] text-lg group-hover:text-[#00319D] transition-colors">
                        {city.name}
                      </h3>
                      <span className="text-xs text-[#6B6860] ml-2 mt-1">{city.universities} unis</span>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-[#6B6860]">{city.description}</p>
                    <div className="text-xs text-[#00319D] font-semibold">{city.avgRent}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured universities */}
        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-7">
              <div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A]">Start near your campus</h2>
              </div>
              <Link
                href="/universities"
                className="text-[#00319D] font-semibold text-sm border-b-2 border-[#FCC20A] pb-0.5 hover:text-[#00319D] transition-colors"
              >
                View all universities
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredUniversities.map((university) => (
                <Link
                  key={university.slug}
                  href={`/universities/${university.slug}`}
                  className="group bg-[#F7F6F3] rounded-2xl p-5 border border-[#E8E6E1] hover:border-[#00319D]/30 hover:shadow-lg transition-all duration-200"
                >
                  <p className="mb-3 text-xs font-semibold text-[#00319D]">{university.city}</p>
                  <h3 className="font-heading font-bold text-[#1A1A1A] text-sm leading-snug mb-1 group-hover:text-[#00319D] transition-colors">
                    {university.name}
                  </h3>
                  <p className="text-[#6B6860] text-xs">{university.students} students</p>
                  <div className="mt-4 text-xs font-semibold text-[#00319D] group-hover:translate-x-1 transition-transform inline-block">
                    View university details &rarr;
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Moving abroad links */}
        <section className="bg-[#F7F6F3] py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-7">
              <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-3">Plan the move, not just the room</h2>
              <p className="text-[#6B6860] text-sm leading-relaxed">
                Use these guides to prepare for visas, budgeting, arrival, and accommodation decisions before you fly to {country.name}.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {country.movingAbroadLinks.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group bg-white rounded-2xl p-5 border border-[#E8E6E1] hover:border-[#00319D]/30 hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="font-heading font-bold text-[#1A1A1A] text-base leading-snug mb-2 group-hover:text-[#00319D] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-[#6B6860] text-sm leading-relaxed mb-4">{guide.description}</p>
                  <div className="text-xs font-semibold text-[#00319D] group-hover:translate-x-1 transition-transform inline-block">
                    Read guide &rarr;
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#00319D] rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="font-heading font-bold text-2xl lg:text-3xl text-white mb-3 text-balance">
                  Ready to find student accommodation in {country.name}?
                </h3>
                <p className="text-white/70 text-base leading-relaxed">
                  Tell us your university, budget, and move-in timeline. We&apos;ll help you compare suitable options before you arrive.
                </p>
              </div>
              <Link
                href="/get-matched"
                className="brand-cta flex-shrink-0 px-8 py-4 font-bold text-base shadow-lg"
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
