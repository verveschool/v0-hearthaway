import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import Footer from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import MatchedCTA from '@/components/matched-cta'

import { countries } from '@/lib/country-data'
import { groupedCities } from '@/lib/place-data'

export default function CitiesPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageBanner title="Get to know your next city" action={{ label: 'Find your university', href: '/universities' }} />

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto">
            {Object.entries(groupedCities).map(([country, countryCities]) => {
              const countrySlug = countries.find((place) => place.name === country)?.slug ?? 'uk'

              return (
                <div key={country} className="mb-16">
                  <div className="flex items-center justify-between mb-7">
                    <h2 className="font-heading font-bold text-2xl text-[#1A1A1A]">{country}</h2>
                    <Link
                      href={`/${countrySlug}`}
                      className="text-[#00319D] font-semibold text-sm border-b-2 border-[#FCC20A] pb-0.5 hover:text-[#00319D] transition-colors"
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
{city.image ? (
                          <Image
                            src={city.image}
                            alt={`View of ${city.name}`}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                          <p className="text-[#6B6860] text-sm leading-relaxed mb-3 line-clamp-2">{city.description}</p>
                          <div className="text-xs text-[#00319D] font-semibold">{city.avgRent}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* CTA */}
            <div className="mt-6">
              <MatchedCTA
                variant="compact"
                title="Not sure which city is right for you?"
                description={"Tell us your university and we'll take care of the rest."}
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
