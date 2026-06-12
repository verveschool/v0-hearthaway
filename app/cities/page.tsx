import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'

import { groupedCities } from '@/lib/place-data'

export default function CitiesPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">Student Cities</div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Find accommodation in your city.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Whether you know your city or are still deciding, explore what each destination offers for international students.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto">
            {Object.entries(groupedCities).map(([country, countryCities]) => (
              <div key={country} className="mb-16">
                <div className="flex items-center justify-between mb-7">
                  <h2 className="font-heading font-bold text-2xl text-[#1A1A1A]">{country}</h2>
                  <Link
                    href={`/${country.toLowerCase().replace(' ', '-')}`}
                    className="text-[#1B365D] font-semibold text-sm border-b-2 border-[#FFCC00] pb-0.5 hover:text-[#24497D] transition-colors"
                  >
                    Explore {country}
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {countryCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/cities/${city.slug}`}
                      className="group overflow-hidden rounded-2xl border border-[#E8E6E1] hover:shadow-xl transition-all duration-300 bg-white"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={city.image}
                          alt={`Student accommodation in ${city.name}`}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
            ))}

            {/* CTA */}
            <div className="bg-[#F7F6F3] rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-[#E8E6E1]">
              <div>
                <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-2">Not sure which city is right for you?</h3>
                <p className="text-[#6B6860] text-sm">{"Tell us your university and we'll take care of the rest."}</p>
              </div>
              <Link
                href="/get-matched"
                className="flex-shrink-0 px-7 py-3.5 bg-[#1B365D] text-white font-bold rounded-xl hover:bg-[#24497D] transition-colors text-sm"
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
