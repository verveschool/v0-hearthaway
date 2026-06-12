import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'

import type { CountryPlace } from '@/lib/country-data'
import { cities, universities } from '@/lib/place-data'

type CountryHubPageProps = {
  country: CountryPlace
}

export default function CountryHubPage({ country }: CountryHubPageProps) {
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
        {/* Hero */}
        <section className="relative bg-[#1B365D] pt-28 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-25" aria-hidden="true">
            <Image
              src={country.heroImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2240]/95 via-[#0F2240]/80 to-[#0F2240]/50" />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                <span className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase">
                  Study in {country.name}
                </span>
              </div>
              <h1 className="font-heading text-4xl lg:text-6xl font-extrabold text-white text-balance mb-5 leading-tight tracking-tight">
                International student guide to {country.name}.
              </h1>
              <p className="text-white/75 text-lg leading-relaxed max-w-2xl mb-8">
                {country.summary}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1.5 rounded-full bg-[#FFCC00] text-[#1B365D] text-xs font-extrabold">
                  {country.badge}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-medium">
                  {country.universityCount} universities
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-medium">
                  Currency: {country.currency}
                </span>
              </div>
              <Link
                href="/get-matched"
                className="inline-flex px-8 py-4 bg-[#FFCC00] text-[#1B365D] font-bold text-base rounded-xl hover:bg-[#E6B800] transition-colors shadow-lg"
              >
                Get Matched
              </Link>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#F7F6F3] rounded-2xl p-7 border border-[#E8E6E1]">
              <div className="text-[#1B365D] text-sm font-bold tracking-widest uppercase mb-4">Country overview</div>
              <h2 className="font-heading font-bold text-2xl lg:text-3xl text-[#1A1A1A] mb-4 text-balance">
                Studying and finding housing in {country.name}
              </h2>
              <p className="text-[#6B6860] text-base leading-relaxed">
                {country.overview}
              </p>
            </div>
            <div className="bg-[#1B365D] rounded-2xl p-7">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">Housing notes</div>
              <p className="text-white/75 text-sm leading-relaxed">
                {country.studentHousingNotes}
              </p>
            </div>
          </div>
        </section>

        {/* Featured cities */}
        <section className="bg-[#F7F6F3] py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-7">
              <div>
                <div className="text-[#1B365D] text-sm font-bold tracking-widest uppercase mb-3">Featured cities</div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A]">Explore student cities</h2>
              </div>
              <Link
                href="/cities"
                className="text-[#1B365D] font-semibold text-sm border-b-2 border-[#FFCC00] pb-0.5 hover:text-[#24497D] transition-colors"
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
                    <Image
                      src={city.image}
                      alt={`Student accommodation in ${city.name}`}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-heading font-bold text-[#1A1A1A] text-lg group-hover:text-[#1B365D] transition-colors">
                        {city.name}
                      </h3>
                      <span className="text-xs text-[#6B6860] ml-2 mt-1">{city.universities} unis</span>
                    </div>
                    <p className="text-[#6B6860] text-sm leading-relaxed mb-3 line-clamp-2">{city.description}</p>
                    <div className="text-xs text-[#1B365D] font-semibold">{city.avgRent}</div>
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
                <div className="text-[#1B365D] text-sm font-bold tracking-widest uppercase mb-3">Featured universities</div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A]">Start near your campus</h2>
              </div>
              <Link
                href="/universities"
                className="text-[#1B365D] font-semibold text-sm border-b-2 border-[#FFCC00] pb-0.5 hover:text-[#24497D] transition-colors"
              >
                View all universities
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredUniversities.map((university) => (
                <Link
                  key={university.slug}
                  href={`/universities/${university.slug}`}
                  className="group bg-[#F7F6F3] rounded-2xl p-5 border border-[#E8E6E1] hover:border-[#1B365D]/30 hover:shadow-lg transition-all duration-200"
                >
                  <span className="text-xs font-bold tracking-wider uppercase text-[#1B365D] bg-[#1B365D]/8 px-2.5 py-1 rounded-full inline-block mb-3">
                    {university.city}
                  </span>
                  <h3 className="font-heading font-bold text-[#1A1A1A] text-sm leading-snug mb-1 group-hover:text-[#1B365D] transition-colors">
                    {university.name}
                  </h3>
                  <p className="text-[#6B6860] text-xs">{university.students} students</p>
                  <div className="mt-4 text-xs font-semibold text-[#1B365D] group-hover:translate-x-1 transition-transform inline-block">
                    View accommodation &rarr;
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
              <div className="text-[#1B365D] text-sm font-bold tracking-widest uppercase mb-3">Moving abroad</div>
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
                  className="group bg-white rounded-2xl p-5 border border-[#E8E6E1] hover:border-[#1B365D]/30 hover:shadow-lg transition-all duration-200"
                >
                  <span className="text-xs font-bold text-[#1B365D] tracking-wider uppercase px-2.5 py-1 bg-[#FFCC00] rounded-full inline-block mb-4">
                    {guide.category}
                  </span>
                  <h3 className="font-heading font-bold text-[#1A1A1A] text-base leading-snug mb-2 group-hover:text-[#1B365D] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-[#6B6860] text-sm leading-relaxed mb-4">{guide.description}</p>
                  <div className="text-xs font-semibold text-[#1B365D] group-hover:translate-x-1 transition-transform inline-block">
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
            <div className="bg-[#1B365D] rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
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
                className="flex-shrink-0 px-8 py-4 bg-[#FFCC00] text-[#1B365D] font-bold text-base rounded-xl hover:bg-[#E6B800] transition-colors shadow-lg"
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
