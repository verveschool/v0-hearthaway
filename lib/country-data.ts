import type { MovingAbroadArticleCard, MovingAbroadCountrySlug } from '@/lib/moving-abroad-data'
import {
  countryMovingAbroadSlugs,
  getMovingAbroadArticleCard,
  getMovingAbroadArticlesByCountry
} from '@/lib/moving-abroad-data'

export type MovingAbroadLink = MovingAbroadArticleCard

function getMovingAbroadLinksForCountry(countrySlug: MovingAbroadCountrySlug): MovingAbroadLink[] {
  const countryArticleSlugs = new Set(
    getMovingAbroadArticlesByCountry(countrySlug).map((article) => article.slug)
  )

  return countryMovingAbroadSlugs[countrySlug].map((articleSlug) => {
    if (!countryArticleSlugs.has(articleSlug)) {
      throw new Error(`moving abroad article ${articleSlug} is not valid for ${countrySlug}`)
    }

    return getMovingAbroadArticleCard(articleSlug)
  })
}

export type CountryPlace = {
  name: string
  slug: MovingAbroadCountrySlug
  currency: string
  heroImage: string
  badge: string
  universityCount: string
  citySlugs: string[]
  universitySlugs: string[]
  summary: string
  overview: string
  studentHousingNotes: string
  movingAbroadLinks: MovingAbroadLink[]
}

export const countries: CountryPlace[] = [
  {
    name: 'United Kingdom',
    slug: 'uk',
    currency: 'GBP (£)',
    heroImage: '/images/dest-uk.png',
    badge: 'Most popular',
    universityCount: '140+',
    citySlugs: [
      'london', 'manchester', 'edinburgh', 'birmingham', 'bristol', 
      'leeds', 'sheffield', 'nottingham', 'newcastle', 'liverpool', 
      'glasgow', 'cardiff', 'belfast', 'coventry'
    ],
    universitySlugs: [
      'ucl', 'kcl', 'imperial', 'lse', 'qmul', 'manchester', 'mmu', 
      'edinburgh', 'heriot-watt', 'birmingham', 'aston', 'bristol', 
      'uwe-bristol', 'leeds', 'leeds-beckett', 'sheffield', 'sheffield-hallam', 
      'nottingham', 'nottingham-trent', 'newcastle', 'northumbria', 'liverpool', 
      'ljmu', 'glasgow', 'strathclyde', 'cardiff', 'cardiff-met', 'queens-belfast', 
      'ulster', 'coventry', 'warwick'
    ],
    summary: 'a globally recognised study destination with historic universities, diverse student cities, and a broad range of accommodation options for every stage of your move.',
    overview: 'studying in the uk gives international students access to compact academic terms, strong transport links, and city choices that range from london scale to smaller campus led communi[...]',
    studentHousingNotes: 'the 2026 visa regulations now require proving £1,529 per month for london living costs or £1,171 outside the capital. with the complete shift to digital e-visas and str[...]',
    movingAbroadLinks: getMovingAbroadLinksForCountry('uk')
  },
  {
    name: 'Ireland',
    slug: 'ireland',
    currency: 'EUR (€)',
    heroImage: '/images/dest-ireland.png',
    badge: 'Rising in popularity',
    universityCount: '30+',
    citySlugs: ['dublin', 'cork', 'galway'],
    universitySlugs: ['tcd', 'ucd', 'dcu', 'tud', 'ucc', 'mtu', 'galway', 'atu'],
    summary: 'a welcoming english speaking destination with respected universities, a close knit international student community, and strong city centre student life.',
    overview: 'ireland is popular with students who want an english speaking study experience, friendly campus communities, and access to technology, business, culture, and research networks. hous[...]',
    studentHousingNotes: 'ireland faces a structural housing supply squeeze. international students must secure housing before arrival. rely entirely on verified operators and public transit lines[...]',
    movingAbroadLinks: getMovingAbroadLinksForCountry('ireland')
  },
  {
    name: 'France',
    slug: 'france',
    currency: 'EUR (€)',
    heroImage: '/images/hero-building.png',
    badge: 'Continental Europe hub',
    universityCount: '70+',
    citySlugs: ['paris', 'lyon', 'toulouse', 'marseille', 'montpellier', 'bordeaux', 'lille', 'nice', 'strasbourg', 'grenoble'],
    universitySlugs: ['sorbonne', 'sciences-po', 'psl', 'lyon-univ', 'toulouse-univ', 'marseille-univ', 'montpellier-univ', 'bordeaux-univ', 'lille-univ', 'nice-univ', 'strasbourg-univ', 'grenoble-univ'],
    summary: 'a globally respected european study destination with historic universities, specialist grandes ecoles, and strong public transport links across major student cities.',
    overview: 'studying in france gives international students access to research led public universities, specialist business and engineering schools, and student life shaped by dense urban trans[...]',
    studentHousingNotes: 'france offers a mix of CROUS residences, private student residences, shared apartments, and homestays. demand is especially intense in paris, lyon, and toulouse before th[...]',
    movingAbroadLinks: getMovingAbroadLinksForCountry('france')
  },
  {
    name: 'United Arab Emirates',
    slug: 'uae',
    currency: 'AED (د.إ)',
    heroImage: '/images/dest-uae.png',
    badge: 'Emerging tech hub',
    universityCount: '50+',
    citySlugs: ['dubai', 'abu-dhabi', 'sharjah'],
    universitySlugs: [
      'heriot-watt-dubai', 'birmingham-dubai', 'middlesex-dubai', 'aiu-dubai', 'uow-dubai', 
      'uae-univ', 'khalifa-univ', 'zayed-univ', 'nyu-abu-dhabi', 'sharjah-univ'
    ],
    summary: 'a rapidly growing global education hub with international branch campuses, tax-free income, and a fast-track post-study runway for ambitious students.',
    overview: 'the uae attracts international students seeking quality western education brands, modern infrastructure, safety, and career opportunities in the middle east. dubai and abu dhabi host ma[...]',
    studentHousingNotes: 'uae student housing spans luxury apartment compounds, university residences, and shared villas. furnished accommodation with utilities is standard. note: uae visa sponsorship[...]',
    movingAbroadLinks: getMovingAbroadLinksForCountry('uae')
  },
  {
    name: 'Germany',
    slug: 'germany',
    currency: 'EUR (€)',
    heroImage: '/images/dest-germany.png',
    badge: 'Tuition-free education',
    universityCount: '300+',
    citySlugs: ['munich', 'berlin', 'frankfurt', 'hamburg', 'cologne', 'aachen', 'heidelberg', 'leipzig', 'dresden', 'stuttgart'],
    universitySlugs: [
      'tum-munich', 'lmu-munich', 'humboldt-berlin', 'heidelberg-univ', 'rwth-aachen', 
      'hamburg-univ', 'goethe-frankfurt', 'gottingen-univ', 'tubingen-univ', 'stuttgart-univ'
    ],
    summary: 'world-class tuition-free public universities, leading engineering programs, and one of europe&apos;s largest international student populations.',
    overview: 'germany attracts international students with essentially free higher education at public universities, world-leading research, and strong industry partnerships. housing through student[...]',
    studentHousingNotes: 'germany&apos;s housing model differs from uk/australia: public studentenwerk dorms dominate with lengthy waitlists, shared wgs (flats) are cultural norm, and rent quoted monthl[...]',
    movingAbroadLinks: getMovingAbroadLinksForCountry('germany')
  },
  {
    name: 'Australia',
    slug: 'australia',
    currency: 'AUD (A$)',
    heroImage: '/images/dest-australia.png',
    badge: 'Excellent quality of life',
    universityCount: '40+',
    citySlugs: ['sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'canberra', 'gold-coast'],
    universitySlugs: [
      'sydney', 'unsw', 'uts', 'macquarie', 'melbourne', 'monash', 'rmit', 'deakin', 
      'uq', 'qut', 'griffith', 'uwa', 'curtin', 'ecu', 'adelaide', 'unisa', 'flinders', 
      'anu', 'uc', 'bond', 'griffith-gc'
    ],
    summary: 'a high quality study destination known for major research universities, outdoor lifestyles, multicultural cities, and flexible accommodation choices.',
    overview: 'australia suits international students looking for globally recognised qualifications, warmer climates, and city lifestyles shaped by beaches, food, public transport, and large uni[...]',
    studentHousingNotes: 'the 2026 national cap of 295,000 international students heavily favors universities that provide guaranteed housing. competition for private rentals in major hubs is fie[...]',
    movingAbroadLinks: getMovingAbroadLinksForCountry('australia')
  }
]

export function getCountryBySlug(slug: CountryPlace['slug']): CountryPlace {
  return countries.find((country) => country.slug === slug) ?? countries[0]
}
