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
  },
  {
    name: 'United States', slug: 'usa', currency: 'USD ($)', heroImage: '/images/dest-australia.png', badge: 'Global opportunity', universityCount: '500+',
    citySlugs: ['new-york', 'boston', 'chicago', 'los-angeles', 'austin', 'seattle'], universitySlugs: ['columbia', 'nyu', 'harvard', 'boston-university', 'chicago-university', 'ucla', 'usc', 'ut-austin', 'uw-seattle', 'northeastern'],
    summary: 'a globally influential study destination with leading universities, diverse cities, and extensive career opportunities.',
    overview: 'the united states offers international students an enormous choice of institutions, campus cultures, and regional lifestyles.',
    studentHousingNotes: 'compare university housing, verified student residences, and private rentals carefully; always budget for deposits, utilities, and health insurance.',
    movingAbroadLinks: getMovingAbroadLinksForCountry('usa')
  },
  {
    name: 'Canada', slug: 'canada', currency: 'CAD (C$)', heroImage: '/images/dest-australia.png', badge: 'Welcoming campuses', universityCount: '100+',
    citySlugs: ['toronto', 'vancouver', 'montreal', 'hamilton', 'edmonton', 'waterloo', 'london-ontario', 'ottawa'], universitySlugs: ['toronto-university', 'york-university', 'ubc', 'mcgill', 'mcmaster', 'ualberta', 'waterloo', 'western-ontario', 'uottawa'],
    summary: 'a welcoming, multicultural destination with respected universities, safe cities, and strong student support.',
    overview: 'canada combines high-quality education with practical city living and clear pathways for international graduates.',
    studentHousingNotes: 'housing demand is high in Toronto and Vancouver, so secure verified accommodation early and plan for winter utilities and transport.',
    movingAbroadLinks: getMovingAbroadLinksForCountry('canada')
  },
  {
    name: 'Spain', slug: 'spain', currency: 'EUR (€)', heroImage: '/images/hero-building.png', badge: 'Mediterranean lifestyle', universityCount: '80+',
    citySlugs: ['madrid', 'barcelona', 'valencia'], universitySlugs: ['complutense-madrid', 'uam', 'uab', 'ub-barcelona', 'upc', 'valencia-university', 'upv'],
    summary: 'a vibrant European destination combining respected universities, warm city life, and comparatively accessible living costs.',
    overview: 'spain gives international students a choice of major research universities, specialist schools, and lively regional campuses.',
    studentHousingNotes: 'shared flats are common and affordable, but demand rises sharply before September; confirm registration, deposits, and utility terms in writing.',
    movingAbroadLinks: getMovingAbroadLinksForCountry('spain')
  },
  {
    name: 'Austria', slug: 'austria', currency: 'EUR (€)', heroImage: '/images/dest-germany.png', badge: 'Central Europe', universityCount: '40+',
    citySlugs: ['vienna', 'graz', 'innsbruck'], universitySlugs: ['vienna-university', 'tu-wien', 'wu-vienna', 'meduni-vienna', 'graz-university', 'tu-graz', 'innsbruck-university'],
    summary: 'a polished Central European study destination with strong public universities, excellent transport, and rich cultural life.',
    overview: 'austria suits students who value compact, well-connected cities and a high quality of life close to the wider European network.',
    studentHousingNotes: 'student residences and shared apartments are popular; apply early, check registration requirements, and include heating in winter budgets.',
    movingAbroadLinks: getMovingAbroadLinksForCountry('austria')
  },
  {
    name: 'Singapore', slug: 'singapore', currency: 'SGD (S$)', heroImage: '/images/dest-uae.png', badge: 'Asia-Pacific hub', universityCount: '20+',
    citySlugs: ['singapore-city'], universitySlugs: ['nus', 'ntu', 'smu', 'sutd'],
    summary: 'a highly connected Asia-Pacific education hub known for leading universities, safety, and strong graduate employment networks.',
    overview: 'singapore offers globally recognised institutions in a compact, efficient city with excellent public transport.',
    studentHousingNotes: 'university halls, private residences, and shared flats all fill quickly; check lease length, air conditioning, and included utilities.',
    movingAbroadLinks: getMovingAbroadLinksForCountry('singapore')
  },
  {
    name: 'Malta', slug: 'malta', currency: 'EUR (€)', heroImage: '/images/dest-ireland.png', badge: 'English-speaking Europe', universityCount: '10+',
    citySlugs: ['valletta', 'msida', 'paola', 'cospicua'], universitySlugs: ['malta-university', 'mcast', 'aum'],
    summary: 'an English-speaking Mediterranean destination with accessible city living, international campuses, and a close-knit student community.',
    overview: 'malta is a practical choice for students seeking an English-speaking European base with a warm climate and island lifestyle.',
    studentHousingNotes: 'shared apartments are the usual route; inspect ventilation, transport connections, and summer pricing before paying a deposit.',
    movingAbroadLinks: getMovingAbroadLinksForCountry('malta')
  },
  {
    name: 'Italy', slug: 'italy', currency: 'EUR (€)', heroImage: '/images/hero-building.png', badge: 'Historic universities', universityCount: '90+',
    citySlugs: ['milan', 'rome', 'bologna', 'padua', 'turin', 'naples'], universitySlugs: ['milan-university', 'politecnico-milano', 'sapienza', 'bologna-university', 'padua', 'turin-university', 'naples-federico'],
    summary: 'a historic study destination with respected public universities, specialist schools, and distinctive student cities.',
    overview: 'italy combines centuries of academic tradition with strong design, engineering, business, arts, and research programmes.',
    studentHousingNotes: 'university residences and shared apartments vary by city; plan for codice fiscale, deposits, and local registration before arrival.',
    movingAbroadLinks: getMovingAbroadLinksForCountry('italy')
  }
]

export function getCountryBySlug(slug: CountryPlace['slug']): CountryPlace {
  return countries.find((country) => country.slug === slug) ?? countries[0]
}
