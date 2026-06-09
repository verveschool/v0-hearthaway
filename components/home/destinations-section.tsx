import Link from 'next/link'
import Image from 'next/image'

const countries = [
  {
    name: 'United Kingdom',
    slug: 'uk',
    image: '/images/dest-uk.png',
    cities: ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Bristol', 'Leeds'],
    universities: '140+',
    badge: 'Most popular',
    description: 'Home to some of the world\'s most respected universities, from the Russell Group to specialist institutions across every major city.',
  },
  {
    name: 'Ireland',
    slug: 'ireland',
    image: '/images/dest-ireland.png',
    cities: ['Dublin', 'Cork', 'Galway', 'Limerick'],
    universities: '30+',
    badge: 'Rising in popularity',
    description: 'A welcoming English-speaking destination with world-class universities and a close-knit, thriving international student community.',
  },
  {
    name: 'Australia',
    slug: 'australia',
    image: '/images/dest-australia.png',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    universities: '40+',
    badge: 'Excellent quality of life',
    description: 'Globally recognised qualifications, outstanding weather, diverse culture, and some of the world\'s best university campuses.',
  },
]

const popularCities = [
  { name: 'London', country: 'UK', slug: 'london', image: '/images/city-london.png', rent: 'from £180/wk' },
  { name: 'Manchester', country: 'UK', slug: 'manchester', image: '/images/city-manchester.png', rent: 'from £120/wk' },
  { name: 'Edinburgh', country: 'UK', slug: 'edinburgh', image: '/images/city-edinburgh.png', rent: 'from £130/wk' },
  { name: 'Dublin', country: 'Ireland', slug: 'dublin', image: '/images/city-dublin.png', rent: 'from €160/wk' },
  { name: 'Sydney', country: 'Australia', slug: 'sydney', image: '/images/city-sydney.png', rent: 'from A$280/wk' },
  { name: 'Melbourne', country: 'Australia', slug: 'melbourne', image: '/images/city-melbourne.png', rent: 'from A$250/wk' },
]

export default function DestinationsSection() {
  return (
    <section className="bg-[#F7F6F3] py-24 lg:py-32" id="destinations">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
            <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
              Where are you heading?
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-[3.25rem] font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight text-balance">
            Three countries. One trusted guide.
          </h2>
        </div>

        {/* Country cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/${country.slug}`}
              className="group relative overflow-hidden rounded-2xl h-[420px] flex flex-col justify-end hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={country.image}
                alt={`Student accommodation in ${country.name}`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2240]/95 via-[#0F2240]/40 to-transparent" />

              <div className="relative z-10 p-7">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-[#FFCC00] text-[#1B365D] text-xs font-extrabold">
                    {country.badge}
                  </span>
                  <span className="text-white/60 text-xs font-medium bg-white/10 px-3 py-1.5 rounded-full">
                    {country.universities} universities
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-white mb-2">{country.name}</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-5 line-clamp-2">{country.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {country.cities.slice(0, 4).map((city) => (
                    <span key={city} className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-medium">
                      {city}
                    </span>
                  ))}
                  {country.cities.length > 4 && (
                    <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/60 text-xs">
                      +{country.cities.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular cities grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {popularCities.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="group relative overflow-hidden rounded-xl h-48 flex flex-col justify-end hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={city.image}
                alt={`Student accommodation in ${city.name}`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2240]/85 via-[#0F2240]/20 to-transparent" />
              <div className="relative z-10 p-3.5">
                <div className="font-extrabold text-sm text-white leading-none mb-1">{city.name}</div>
                <div className="text-white/60 text-xs">{city.rent}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <Link
            href="/get-matched"
            className="inline-flex items-center gap-3 px-7 py-4 bg-[#1B365D] text-white font-bold text-base rounded-xl hover:bg-[#24497D] transition-colors shadow-md"
          >
            Find accommodation near my university
          </Link>
          <Link
            href="/cities"
            className="text-[#1B365D] font-semibold text-sm border-b-2 border-[#FFCC00] pb-px hover:text-[#24497D] transition-colors"
          >
            Browse all cities
          </Link>
        </div>
      </div>
    </section>
  )
}
