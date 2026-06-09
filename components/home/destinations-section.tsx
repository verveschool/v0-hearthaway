import Link from 'next/link'
import Image from 'next/image'

const countries = [
  {
    name: 'United Kingdom',
    slug: 'uk',
    image: '/images/dest-uk.png',
    cities: ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Bristol'],
    universities: '140+ universities',
    description: 'Home to some of the world\'s most respected universities, from the Russell Group to specialist institutions.',
    highlight: 'Most popular destination',
  },
  {
    name: 'Ireland',
    slug: 'ireland',
    image: '/images/dest-ireland.png',
    cities: ['Dublin', 'Cork', 'Galway', 'Limerick'],
    universities: '30+ universities',
    description: 'A welcoming, English-speaking destination with world-class universities and a thriving student community.',
    highlight: 'Rising in popularity',
  },
  {
    name: 'Australia',
    slug: 'australia',
    image: '/images/dest-australia.png',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    universities: '40+ universities',
    description: 'World-renowned for its quality of life, diverse culture, and globally recognised university qualifications.',
    highlight: 'Excellent quality of life',
  },
]

const popularCities = [
  { name: 'London', country: 'UK', slug: 'london', image: '/images/city-london.png', unis: '40+' },
  { name: 'Manchester', country: 'UK', slug: 'manchester', image: '/images/city-manchester.png', unis: '5+' },
  { name: 'Dublin', country: 'Ireland', slug: 'dublin', image: '/images/city-dublin.png', unis: '8+' },
  { name: 'Sydney', country: 'Australia', slug: 'sydney', image: '/images/city-sydney.png', unis: '6+' },
  { name: 'Melbourne', country: 'Australia', slug: 'melbourne', image: '/images/city-melbourne.png', unis: '8+' },
  { name: 'Edinburgh', country: 'UK', slug: 'edinburgh', image: '/images/city-edinburgh.png', unis: '4+' },
]

export default function DestinationsSection() {
  return (
    <section className="bg-white py-20 lg:py-28" id="destinations">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-[#1B365D] text-sm font-bold tracking-widest uppercase mb-4">
              Where are you heading?
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#1A1A1A] text-balance leading-tight">
              Three countries. Hundreds of universities. One place to find your home.
            </h2>
          </div>
          <Link
            href="/cities"
            className="flex-shrink-0 text-[#1B365D] font-semibold text-sm border-b-2 border-[#FFCC00] pb-0.5 hover:text-[#24497D] transition-colors"
          >
            Browse all cities
          </Link>
        </div>

        {/* Country cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/${country.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-[#1B365D] h-96 flex flex-col justify-end hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={country.image}
                alt={`Student accommodation in ${country.name}`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12243E]/90 via-[#1B365D]/30 to-transparent" />

              <div className="relative z-10 p-7">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FFCC00] text-[#1B365D] text-xs font-bold mb-3">
                  {country.highlight}
                </span>
                <h3 className="font-heading font-bold text-2xl text-white mb-2">{country.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">{country.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">{country.universities}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {country.cities.slice(0, 3).map((city) => (
                      <span key={city} className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-xs">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular cities grid */}
        <div>
          <h3 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-7">
            Popular student cities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCities.map((city) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="group relative overflow-hidden rounded-xl h-44 flex flex-col justify-end hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={city.image}
                  alt={`Student accommodation in ${city.name}`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D]/80 via-[#1B365D]/20 to-transparent" />
                <div className="relative z-10 p-3">
                  <div className="font-heading font-bold text-sm text-white">{city.name}</div>
                  <div className="text-white/60 text-xs">{city.unis} unis</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
