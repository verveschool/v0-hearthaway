import type { AccommodationProperty } from './accommodation-data'

type CatalogMeta = {
  partnerSlug: string
  categories: string[]
  gallerySourceUrl: string
  gallery: string[]
  availabilityNote?: string
}

export type CatalogProperty = AccommodationProperty & CatalogMeta

type PropertySeed = {
  slug: string
  name: string
  city: string
  country: string
  address: string
  universities: string[]
  distance: string
  partnerSlug: string
  sourceUrl?: string
  priceFrom?: number
  roomTypes?: string[]
  categories?: string[]
  amenities?: string[]
  highlights?: string[]
  image?: string
  gallery?: string[]
  availabilityNote?: string
}

const images = ['/images/acc-halls.png', '/images/acc-studio.png', '/images/acc-kitchen.png']

const cityUniversities: Record<string, string[]> = {
  Belfast: ["Queen's University Belfast", 'Ulster University'],
  Birmingham: ['University of Birmingham', 'Aston University', 'Birmingham City University'],
  Bristol: ['University of Bristol', 'University of the West of England'],
  Cardiff: ['Cardiff University', 'Cardiff Metropolitan University'],
  Coventry: ['University of Warwick', 'Coventry University'],
  Edinburgh: ['University of Edinburgh', 'Edinburgh Napier University'],
  Exeter: ['University of Exeter'],
  Glasgow: ['University of Glasgow', 'University of Strathclyde'],
  Leeds: ['University of Leeds', 'Leeds Beckett University'],
  Leicester: ['University of Leicester', 'De Montfort University'],
  Loughborough: ['Loughborough University'],
  Liverpool: ['University of Liverpool', 'Liverpool John Moores University'],
  London: ['University College London', "King's College London", 'London School of Economics'],
  Manchester: ['University of Manchester', 'Manchester Metropolitan University'],
  Newcastle: ['Newcastle University', 'Northumbria University'],
  Nottingham: ['University of Nottingham', 'Nottingham Trent University'],
  Sheffield: ['University of Sheffield', 'Sheffield Hallam University'],
  Southampton: ['University of Southampton', 'Solent University'],
  York: ['University of York', 'York St John University'],
  Barcelona: ['Universitat de Barcelona', 'Pompeu Fabra University'],
  Madrid: ['Complutense University of Madrid', 'Autonomous University of Madrid'],
  Sydney: ['University of Sydney', 'UTS', 'UNSW Sydney'],
  Brisbane: ['QUT', 'University of Queensland', 'Griffith University'],
  Melbourne: ['University of Melbourne', 'RMIT University', 'Monash University'],
  Berlin: ['Humboldt University of Berlin', 'TU Berlin', 'Freie Universität Berlin'],
  Cologne: ['University of Cologne', 'TH Köln'],
  Frankfurt: ['Goethe University Frankfurt'],
  Tübingen: ['University of Tübingen'],
}

const sourceByPartner: Record<string, string> = {
  'study-inn': 'https://studyinn.com/',
  'neon-wood': 'https://neonwood.com/apartments',
  'vita-student': 'https://www.vitastudent.com/en/cities/',
  iglu: 'https://iglu.com.au/compare-iglus/',
}

function makeProperty(seed: PropertySeed): CatalogProperty {
  const sourceUrl = seed.sourceUrl ?? sourceByPartner[seed.partnerSlug] ?? '#'
  const gallery = seed.gallery ?? images
  return {
    slug: seed.slug,
    name: seed.name,
    city: seed.city,
    country: seed.country,
    address: seed.address,
    priceFrom: seed.priceFrom ?? 0,
    currency: 'GBP',
    roomTypes: seed.roomTypes ?? ['Ensuite', 'Studio'],
    propertyType: 'Student residence',
    universities: seed.universities,
    distance: seed.distance,
    amenities: seed.amenities ?? ['Wi-Fi', 'Study spaces', 'Social spaces', 'On-site support'],
    highlights: seed.highlights ?? ['Student-focused location', 'Multiple room options', 'On-site support'],
    image: seed.image ?? gallery[0],
    source: seed.partnerSlug,
    sourceUrl,
    availabilityNote: seed.availabilityNote,
    partnerSlug: seed.partnerSlug,
    categories: seed.categories ?? ['Student residence'],
    gallerySourceUrl: sourceUrl,
    gallery,
  }
}

const studyInn = [
  ['Brotherton House', 'Leeds', 'https://studyinn.com/student-accommodation/leeds/brotherton-house/'],
  ['Reynard House', 'Leicester', 'https://studyinn.com/student-accommodation/leicester/reynard-house/'],
  ['Talbot Street', 'Nottingham', 'https://studyinn.com/student-accommodation/nottingham/talbot-street/'],
  ['Triumph House', 'Nottingham', 'https://studyinn.com/student-accommodation/nottingham/triumph-house/'],
  ['Walnut Gardens', 'Exeter', 'https://studyinn.com/student-accommodation/exeter/walnut-gardens/'],
  ['Lemyngton Street', 'Loughborough', 'https://studyinn.com/student-accommodation/loughborough/lemyngton-street/'],
  ['Marlborough House', 'Bristol', 'https://studyinn.com/student-accommodation/bristol/marlborough-house/'],
  ['Frederick Road', 'Birmingham', 'https://studyinn.com/student-accommodation/birmingham/frederick-road/'],
  ['James Street', 'York', 'https://studyinn.com/student-accommodation/york/james-street/'],
] as const

const neonWood = [
  ['Berlin Frankfurter Tor', 'Berlin', 'https://neonwood.com/cities/berlin/berlin-frankfurter-tor'],
  ['Berlin Mitte-Wedding', 'Berlin', 'https://neonwood.com/cities/berlin'],
  ['Tannhaus Berlin Neukölln', 'Berlin', 'https://neonwood.com/cities/berlin/berlin-neukoelln'],
  ['Berlin Adlershof', 'Berlin', 'https://neonwood.com/cities/berlin/berlin-adlershof'],
  ['Cologne K115', 'Cologne', 'https://neonwood.com/apartments'],
  ['Frankfurt Riedberg', 'Frankfurt', 'https://neonwood.com/apartments'],
  ['TÜ3', 'Tübingen', 'https://neonwood.com/apartments'],
] as const

const vitaStudent = [
  ['Bruce Street', 'Belfast'], ['New Gough Street', 'Birmingham'], ['Pebble Mill', 'Birmingham'],
  ['Zed Alley', 'Bristol'], ['Park Place', 'Cardiff'], ['Copper Towers', 'Coventry'], ['Warwick Cannon Park', 'Coventry'],
  ['New Waverley', 'Edinburgh'], ['Iona Street', 'Edinburgh'], ['Fountainbridge', 'Edinburgh'], ['Portland House', 'Exeter'],
  ['New India Street', 'Glasgow'], ['West End', 'Glasgow'], ['Portland Crescent', 'Leeds'], ['St Albans', 'Leeds'],
  ['Crosshall St.', 'Liverpool'], ['Lewisham Exchange', 'London'], ['First Street', 'Manchester'], ['Circle Square', 'Manchester'],
  ['New Leazes Park', 'Newcastle'], ['Westgate', 'Newcastle'], ['Strawberry Place', 'Newcastle'], ['Station Street', 'Nottingham'],
  ['Telephone House', 'Sheffield'], ['Richmond House', 'Southampton'], ['Lawrence Street', 'York'],
  ['Poblenou', 'Barcelona'], ['Pedralbes', 'Barcelona'], ['New Oria', 'Madrid'],
] as const

const iglu = [
  ['Broadway', 'Sydney'], ['Central', 'Sydney'], ['Central Park', 'Sydney'], ['Chatswood', 'Sydney'], ['Redfern', 'Sydney'],
  ['Mascot', 'Sydney'], ['Mascot Duo', 'Sydney'], ['Summer Hill', 'Sydney'], ['Waterloo', 'Sydney'],
  ['Brisbane City', 'Brisbane'], ['Kelvin Grove', 'Brisbane'], ['Melbourne City', 'Melbourne'], ['South Yarra', 'Melbourne'],
  ['Flagstaff Gardens', 'Melbourne'], ['Melbourne Central', 'Melbourne'], ['Flagstaff Station', 'Melbourne'],
] as const

export const additionalAccommodationProperties: CatalogProperty[] = [
  ...studyInn.map(([name, city, sourceUrl], index) => makeProperty({
    slug: `study-inn-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    city,
    country: 'UK',
    address: city,
    priceFrom: index === 0 ? 174 : 0,
    roomTypes: ['Ensuite', 'Studio', 'Serviced apartment'],
    universities: cityUniversities[city] ?? [],
    distance: `Near major universities in ${city}`,
    partnerSlug: 'study-inn',
    sourceUrl,
    categories: ['Student residence', 'Serviced living', 'All-inclusive'],
    amenities: ['All bills included', 'Housekeeping', 'Superfast Wi-Fi', 'Gym', 'Wellness spaces', 'Study rooms', '24/7 security'],
    highlights: ['All-inclusive living', 'Strong wellbeing offering', 'Central university access'],
    availabilityNote: name === 'Frederick Road' || name === 'James Street' ? 'Opening 2027; availability to be confirmed.' : undefined,
  })),
  ...neonWood.map(([name, city, sourceUrl], index) => makeProperty({
    slug: `neon-wood-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    city,
    country: 'Germany',
    address: city,
    priceFrom: index === 0 ? 975 : 0,
    roomTypes: ['Single room', 'Studio', 'Double room'],
    universities: cityUniversities[city] ?? [],
    distance: `Well connected to universities in ${city}`,
    partnerSlug: 'neon-wood',
    sourceUrl,
    categories: ['Private apartment', 'All-inclusive', 'Furnished'],
    amenities: ['Furnished apartment', 'Private bathroom', 'Kitchenette', 'High-speed Wi-Fi', 'Gym', 'Lounge', 'Study rooms', 'Cinema room'],
    highlights: ['All-inclusive pricing', 'Private kitchenette and bathroom', 'International student community'],
  })),
  ...vitaStudent.map(([name, city]) => makeProperty({
    slug: `vita-student-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    city,
    country: city === 'Barcelona' || city === 'Madrid' ? 'Spain' : 'UK',
    address: `${name}, ${city}`,
    roomTypes: ['Ensuite', 'Studio'],
    universities: cityUniversities[city] ?? [],
    distance: `Central student location in ${city}`,
    partnerSlug: 'vita-student',
    sourceUrl: `${sourceByPartner['vita-student']}${city.toLowerCase()}/`,
    categories: ['Premium student residence', 'All-inclusive', 'Private room'],
    amenities: ['Bills included', '24/7 gym', 'Study spaces', 'Housekeeping', 'Events', 'High-speed Wi-Fi', '24/7 support'],
    highlights: ['All-in living', 'Central locations', 'Strong resident experience'],
  })),
  ...iglu.map(([name, city]) => makeProperty({
    slug: `iglu-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    city,
    country: 'Australia',
    address: `${name}, ${city}`,
    roomTypes: ['Studio', 'Ensuite', 'Shared apartment'],
    universities: cityUniversities[city] ?? [],
    distance: `Close to major universities and transport in ${city}`,
    partnerSlug: 'iglu',
    sourceUrl: 'https://iglu.com.au/compare-iglus/',
    categories: ['Student residence', 'Furnished', 'Purpose-built'],
    amenities: ['24/7 support', 'Study areas', 'Gym', 'Social spaces', 'Laundry', 'Bike storage', 'High-security access'],
    highlights: ['University-focused locations', 'Strong communal facilities', 'Public transport access'],
    availabilityNote: name === 'Mascot Duo' ? 'Opening January 2027; availability to be confirmed.' : undefined,
  })),
]
