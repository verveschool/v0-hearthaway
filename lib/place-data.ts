export type CountryCode = 'UK' | 'IE' | 'AU'

export type CityPlace = {
  name: string
  country: string
  countryCode: CountryCode
  universities: string
  image: string
  slug: string
  description: string
  avgRent: string
  studentPositioning: string
  bestAreasForStudents: {
    status: 'placeholder'
    summary: string
    requiredInputs: string[]
  }
  rentBudgeting: {
    status: 'range'
    requiredInputs: string[]
  }
}

export type UniversityPlace = {
  name: string
  city: string
  country: string
  students: string
  slug: string
  citySlug?: string
}

export const cities: CityPlace[] = [
  {
    name: 'London',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '40+',
    image: '/images/city-london.png',
    slug: 'london',
    description: 'The world\'s greatest student city. Diverse, exciting, and full of opportunity.',
    avgRent: '£900–£1,400 / mo',
    studentPositioning: 'A global student capital for learners who want choice, culture, and strong university access across every corner of the city.',
    bestAreasForStudents: {
      status: 'placeholder',
      summary: 'Placeholder guidance: the best London areas depend heavily on campus location, commute tolerance, weekly budget, and preferred student lifestyle.',
      requiredInputs: ['Campus or university building location', 'Preferred maximum commute time', 'Monthly rent budget', 'Room type preference'],
    },
    rentBudgeting: {
      status: 'range',
      requiredInputs: ['Preferred room type', 'Contract length', 'Bills and utilities inclusion', 'Maximum commute budget'],
    },
  },
  {
    name: 'Manchester',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '5',
    image: '/images/city-manchester.png',
    slug: 'manchester',
    description: 'Vibrant, affordable, and home to two world-class universities.',
    avgRent: '£550–£850 / mo',
    studentPositioning: 'A high-energy student city with strong transport links, a large student community, and comparatively approachable budgets.',
    bestAreasForStudents: {
      status: 'placeholder',
      summary: 'Placeholder guidance: area recommendations should be matched to your campus, commute preferences, and whether you want quieter or more social surroundings.',
      requiredInputs: ['University campus', 'Maximum walking or transit commute', 'Monthly rent budget', 'Lifestyle preference'],
    },
    rentBudgeting: {
      status: 'range',
      requiredInputs: ['Preferred room type', 'Contract length', 'Bills and utilities inclusion', 'Maximum commute budget'],
    },
  },
  {
    name: 'Edinburgh',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '4',
    image: '/images/city-edinburgh.png',
    slug: 'edinburgh',
    description: 'One of Europe\'s most beautiful cities with a rich academic tradition.',
    avgRent: '£650–£950 / mo',
    studentPositioning: 'A historic academic city for students who want walkable neighbourhoods, culture, and a strong international community.',
    bestAreasForStudents: {
      status: 'placeholder',
      summary: 'Placeholder guidance: suitable areas vary by campus and hill-to-campus commute, so confirm exact study location before choosing a neighbourhood.',
      requiredInputs: ['Exact campus or faculty location', 'Maximum commute time', 'Monthly rent budget', 'Accessibility needs'],
    },
    rentBudgeting: {
      status: 'range',
      requiredInputs: ['Preferred room type', 'Contract length', 'Bills and utilities inclusion', 'Maximum commute budget'],
    },
  },
  {
    name: 'Birmingham',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '5',
    image: '/images/city-birmingham.png',
    slug: 'birmingham',
    description: 'England\'s second city — diverse, affordable, and centrally located.',
    avgRent: '£500–£750 / mo',
    studentPositioning: 'A practical, well-connected student base with broad accommodation options and easy access to other UK cities.',
    bestAreasForStudents: {
      status: 'placeholder',
      summary: 'Placeholder guidance: the right Birmingham area depends on campus proximity, local rail access, and whether you prefer city-centre or residential living.',
      requiredInputs: ['University or campus', 'Transport preference', 'Monthly rent budget', 'Preferred neighbourhood feel'],
    },
    rentBudgeting: {
      status: 'range',
      requiredInputs: ['Preferred room type', 'Contract length', 'Bills and utilities inclusion', 'Maximum commute budget'],
    },
  },
  {
    name: 'Bristol',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '2',
    image: '/images/city-bristol.png',
    slug: 'bristol',
    description: 'Creative, compact, and consistently ranked among the best student cities.',
    avgRent: '£600–£900 / mo',
    studentPositioning: 'A creative and compact student city for students who value independent culture, walkability, and a strong social scene.',
    bestAreasForStudents: {
      status: 'placeholder',
      summary: 'Placeholder guidance: Bristol area choices should be based on campus location, hill routes, bus access, and desired balance between nightlife and quiet study.',
      requiredInputs: ['Campus location', 'Walking and bus commute preference', 'Monthly rent budget', 'Quiet or social accommodation preference'],
    },
    rentBudgeting: {
      status: 'range',
      requiredInputs: ['Preferred room type', 'Contract length', 'Bills and utilities inclusion', 'Maximum commute budget'],
    },
  },
  {
    name: 'Dublin',
    country: 'Ireland',
    countryCode: 'IE',
    universities: '8',
    image: '/images/city-dublin.png',
    slug: 'dublin',
    description: 'A warm, welcoming capital with world-class universities and a vibrant culture.',
    avgRent: '€900–€1,400 / mo',
    studentPositioning: 'A welcoming capital for international students who want an English-speaking destination with strong academic and career opportunities.',
    bestAreasForStudents: {
      status: 'placeholder',
      summary: 'Placeholder guidance: Dublin area suitability changes by campus side of the city, public transport route, and availability at your budget.',
      requiredInputs: ['University campus', 'Public transport route preference', 'Monthly rent budget', 'Move-in date'],
    },
    rentBudgeting: {
      status: 'range',
      requiredInputs: ['Preferred room type', 'Contract length', 'Bills and utilities inclusion', 'Maximum commute budget'],
    },
  },
  {
    name: 'Cork',
    country: 'Ireland',
    countryCode: 'IE',
    universities: '3',
    image: '/images/city-cork.png',
    slug: 'cork',
    description: 'Ireland\'s second city — lively, affordable, and a growing student destination.',
    avgRent: '€700–€1,000 / mo',
    studentPositioning: 'A lively, friendly option for students seeking a smaller Irish city with a growing international student community.',
    bestAreasForStudents: {
      status: 'placeholder',
      summary: 'Placeholder guidance: Cork recommendations should be confirmed against campus location, bus routes, and how close you want to be to the city centre.',
      requiredInputs: ['Campus location', 'Maximum commute time', 'Monthly rent budget', 'City-centre proximity preference'],
    },
    rentBudgeting: {
      status: 'range',
      requiredInputs: ['Preferred room type', 'Contract length', 'Bills and utilities inclusion', 'Maximum commute budget'],
    },
  },
  {
    name: 'Sydney',
    country: 'Australia',
    countryCode: 'AU',
    universities: '6',
    image: '/images/city-sydney.png',
    slug: 'sydney',
    description: 'Iconic, international, and home to some of Australia\'s top universities.',
    avgRent: 'A$1,200–1,800 / mo',
    studentPositioning: 'An iconic international city for students who want major universities, beaches, career access, and diverse neighbourhood options.',
    bestAreasForStudents: {
      status: 'placeholder',
      summary: 'Placeholder guidance: Sydney area fit depends on campus location, train or bus access, and whether beach, city, or quieter residential living matters most.',
      requiredInputs: ['Campus location', 'Transport line preference', 'Monthly rent budget', 'Lifestyle priority'],
    },
    rentBudgeting: {
      status: 'range',
      requiredInputs: ['Preferred room type', 'Contract length', 'Bills and utilities inclusion', 'Maximum commute budget'],
    },
  },
  {
    name: 'Melbourne',
    country: 'Australia',
    countryCode: 'AU',
    universities: '8',
    image: '/images/city-melbourne.png',
    slug: 'melbourne',
    description: 'Consistently ranked the world\'s most liveable city. A favourite for students.',
    avgRent: 'A$1,100–1,600 / mo',
    studentPositioning: 'A student favourite with strong universities, arts, food, transport, and neighbourhood variety for different budgets.',
    bestAreasForStudents: {
      status: 'placeholder',
      summary: 'Placeholder guidance: Melbourne area recommendations should consider tram and train access, campus location, and whether you prefer inner-city or suburban living.',
      requiredInputs: ['Campus location', 'Tram or train commute preference', 'Monthly rent budget', 'Preferred neighbourhood pace'],
    },
    rentBudgeting: {
      status: 'range',
      requiredInputs: ['Preferred room type', 'Contract length', 'Bills and utilities inclusion', 'Maximum commute budget'],
    },
  },
  {
    name: 'Brisbane',
    country: 'Australia',
    countryCode: 'AU',
    universities: '4',
    image: '/images/city-brisbane.png',
    slug: 'brisbane',
    description: 'Sunny, affordable, and rapidly growing as a student destination.',
    avgRent: 'A$900–1,300 / mo',
    studentPositioning: 'A sunny and growing student destination with strong universities, outdoor living, and comparatively accessible budgets.',
    bestAreasForStudents: {
      status: 'placeholder',
      summary: 'Placeholder guidance: Brisbane area choices should be checked against campus side of the river, bus or train access, and summer comfort preferences.',
      requiredInputs: ['Campus location', 'Public transport preference', 'Monthly rent budget', 'Housing type preference'],
    },
    rentBudgeting: {
      status: 'range',
      requiredInputs: ['Preferred room type', 'Contract length', 'Bills and utilities inclusion', 'Maximum commute budget'],
    },
  },
]

export const universities: UniversityPlace[] = [
  { name: 'University of Manchester', city: 'Manchester', country: 'UK', students: '40,000+', slug: 'manchester', citySlug: 'manchester' },
  { name: 'University College London', city: 'London', country: 'UK', students: '42,000+', slug: 'ucl', citySlug: 'london' },
  { name: 'University of Edinburgh', city: 'Edinburgh', country: 'UK', students: '35,000+', slug: 'edinburgh', citySlug: 'edinburgh' },
  { name: 'University of Birmingham', city: 'Birmingham', country: 'UK', students: '38,000+', slug: 'birmingham', citySlug: 'birmingham' },
  { name: 'University of Bristol', city: 'Bristol', country: 'UK', students: '25,000+', slug: 'bristol', citySlug: 'bristol' },
  { name: 'University of Leeds', city: 'Leeds', country: 'UK', students: '36,000+', slug: 'leeds' },
  { name: 'University of Sheffield', city: 'Sheffield', country: 'UK', students: '29,000+', slug: 'sheffield' },
  { name: "King's College London", city: 'London', country: 'UK', students: '31,000+', slug: 'kcl', citySlug: 'london' },
  { name: 'Trinity College Dublin', city: 'Dublin', country: 'Ireland', students: '18,000+', slug: 'tcd', citySlug: 'dublin' },
  { name: 'University College Dublin', city: 'Dublin', country: 'Ireland', students: '32,000+', slug: 'ucd', citySlug: 'dublin' },
  { name: 'University College Cork', city: 'Cork', country: 'Ireland', students: '21,000+', slug: 'ucc', citySlug: 'cork' },
  { name: 'University of Galway', city: 'Galway', country: 'Ireland', students: '18,000+', slug: 'galway' },
  { name: 'University of Melbourne', city: 'Melbourne', country: 'Australia', students: '52,000+', slug: 'melbourne', citySlug: 'melbourne' },
  { name: 'University of Sydney', city: 'Sydney', country: 'Australia', students: '60,000+', slug: 'sydney', citySlug: 'sydney' },
  { name: 'Monash University', city: 'Melbourne', country: 'Australia', students: '86,000+', slug: 'monash', citySlug: 'melbourne' },
  { name: 'University of Queensland', city: 'Brisbane', country: 'Australia', students: '54,000+', slug: 'uq', citySlug: 'brisbane' },
]

export const groupedCities: Record<string, CityPlace[]> = {
  'United Kingdom': cities.filter((city) => city.countryCode === 'UK'),
  Ireland: cities.filter((city) => city.countryCode === 'IE'),
  Australia: cities.filter((city) => city.countryCode === 'AU'),
}

export function getCityBySlug(slug: string): CityPlace | undefined {
  return cities.find((city) => city.slug === slug)
}

export function getUniversitiesByCity(cityName: string): UniversityPlace[] {
  return universities.filter((university) => university.city === cityName)
}

export function getUniversityBySlug(slug: string): UniversityPlace | undefined {
  return universities.find((university) => university.slug === slug)
}
