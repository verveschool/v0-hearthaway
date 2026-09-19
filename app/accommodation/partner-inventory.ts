import type { AccommodationProperty, AccommodationRoomType } from './accommodation-data'

type CatalogMeta = {
  partnerSlug: string
  categories: string[]
  gallerySourceUrl: string
  gallery: string[]
  availabilityNote?: string
}

export type CatalogProperty = AccommodationProperty & CatalogMeta

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
  London: ['University College London', 'Kings College London', 'London School of Economics'],
  Manchester: ['University of Manchester', 'Manchester Metropolitan University'],
  Newcastle: ['Newcastle University', 'Northumbria University'],
  Nottingham: ['University of Nottingham', 'Nottingham Trent University'],
  Sheffield: ['University of Sheffield', 'Sheffield Hallam University'],
  Southampton: ['University of Southampton', 'Solent University'],
  York: ['University of York', 'York St John University'],
  Barcelona: ['University of Barcelona', 'Polytechnic University of Catalonia', 'Universitat Aut\u00f2noma de Barcelona'],
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

function makeProperty(
  property: Omit<CatalogProperty, 'currency' | 'propertyType' | 'amenities' | 'highlights' | 'image' | 'source' | 'sourceUrl' | 'gallery' | 'gallerySourceUrl'> & {
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
  },
): CatalogProperty {
  const sourceUrl = property.sourceUrl ?? sourceByPartner[property.partnerSlug] ?? '#'
  const gallery = property.gallery ?? images
  return {
    ...property,
    priceFrom: property.priceFrom ?? 0,
    currency: 'GBP',
    roomTypes: property.roomTypes ?? ['Ensuite', 'Studio'],
    propertyType: 'Student residence',
    amenities: property.amenities ?? ['Wi-Fi', 'Study spaces', 'Social spaces', 'On-site support'],
    highlights: property.highlights ?? ['Student-focused location', 'Multiple room options', 'On-site support'],
    image: property.image ?? gallery[0],
    source: property.partnerSlug,
    sourceUrl,
    gallery,
    gallerySourceUrl: sourceUrl,
    categories: property.categories ?? ['Student residence'],
    availabilityNote: property.availabilityNote,
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

/** "From £X per week" figures as published on each property's own Study Inn page. */
const studyInnFromPrice: Record<string, number> = {
  'Brotherton House': 165,
  'Reynard House': 178,
  'Talbot Street': 160,
  'Triumph House': 219,
  'Walnut Gardens': 215,
  'Lemyngton Street': 199,
}

const studyInnPriceConditions = 'Tentative price from the provider\u2019s site; rates vary by apartment tier, contract length (e.g. 44 vs 51 weeks) and current promotions. Confirm the exact rate and availability with Study Inn.'
const soldOutNote = 'Listed as sold out on the provider\u2019s site at time of review; still shown here as inventory this property offers.'

/**
 * Real per-room-type breakdowns extracted from each property's own Study Inn page,
 * including rooms the source itself marks "Sold Out" \u2014 sold-out inventory stays
 * listed rather than being removed, and unpriced rooms are marked price-on-enquiry
 * rather than guessed.
 */
const studyInnRooms: Record<string, AccommodationRoomType[]> = {
  'Brotherton House': [
    { name: 'Gold En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Platinum Plus En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', indicative: true, conditions: '51 weeks from \u00a3180/wk, or 44 weeks from \u00a3185/wk on a limited-time clearing offer.' } },
    { name: 'Diamond En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Sapphire En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Sapphire Plus En-suite Serviced Apartment', price: { value: 220, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
    { name: 'Platinum Plus Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Diamond Plus Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Sapphire Studio', price: { value: 275, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
    { name: 'Sapphire Plus Studio', price: { value: 305, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
  ],
  'Reynard House': [
    { name: 'Gold En-suite Serviced Apartment', price: { value: 178, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
    { name: 'Gold Plus En-suite Serviced Apartment', price: { value: 183, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
    { name: 'Platinum En-suite Serviced Apartment', price: { value: 179, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions }, availabilityNote: soldOutNote },
    { name: 'Platinum Plus En-suite Serviced Apartment', price: { value: 193, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions }, availabilityNote: soldOutNote },
    { name: 'Diamond En-suite Serviced Apartment', price: { value: 208, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions }, availabilityNote: soldOutNote },
    { name: 'Gold Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true }, availabilityNote: soldOutNote },
    { name: 'Gold Plus Studio', price: { value: 203, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions }, availabilityNote: soldOutNote },
    { name: 'Platinum Studio', price: { value: 213, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions }, availabilityNote: soldOutNote },
    { name: 'Platinum Plus Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true }, availabilityNote: soldOutNote },
    { name: 'Diamond Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true }, availabilityNote: soldOutNote },
    { name: 'Sapphire Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true }, availabilityNote: soldOutNote },
  ],
  'Talbot Street': [
    { name: 'Platinum En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Diamond En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Silver Studio', price: { value: 179, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
    { name: 'Silver Plus Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Gold Studio', price: { value: 209, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
    { name: 'Gold Plus Studio', price: { value: 214, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
    { name: 'Platinum Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Platinum Plus Studio', price: { value: 229, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
    { name: 'Diamond Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Sapphire Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
  ],
  'Triumph House': [
    { name: 'Platinum Plus En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Diamond En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Diamond Plus En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Platinum Studio', price: { value: 269, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
    { name: 'Platinum Plus Studio', price: { value: 319, currency: 'GBP', period: 'week', indicative: true, conditions: studyInnPriceConditions } },
    { name: 'Diamond Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
  ],
  'Walnut Gardens': [
    { name: 'Platinum En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', indicative: true, conditions: '44-week contract from \u00a3249/wk on a limited-time offer; standard-length pricing on enquiry.' } },
    { name: 'Platinum Plus En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Diamond En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Platinum Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Platinum Plus Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Diamond Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Sapphire Plus Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Sapphire Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
  ],
  'Lemyngton Street': [
    { name: 'Gold En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Gold Plus Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Platinum Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
    { name: 'Diamond Studio', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true } },
  ],
  'Marlborough House': [
    { name: 'En-suite Serviced Apartment', price: { currency: 'GBP', period: 'week', priceOnEnquiry: true }, tenancy: 'Leased to the University of Bristol; rooms are allocated and priced by the University rather than sold directly by Study Inn.', availabilityNote: 'Contact the University of Bristol for rates and availability.' },
  ],
}

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
  makeProperty({
    slug: 'luna-hatfield',
    name: 'Luna',
    city: 'Hatfield',
    country: 'UK',
    address: '301 St Albans Road, Hatfield, AL10 9RH',
    partnerSlug: 'crm-students',
    sourceUrl: 'https://crm-students.com/hatfield/luna/standard-studio-765400',
    priceFrom: 265,
    pricePeriod: 'week',
    roomTypes: ['Standard Studio'],
    categories: ['Student residence', 'Purpose-built', 'Furnished'],
    universities: ['University of Hertfordshire'],
    distance: 'Opposite the University of Hertfordshire De Havilland campus; approximately 15 minutes on foot to the College Lane campus.',
    gallery: [
      'https://www.crm-students.com/resource/image/875226/landscape_ratio16x9/1140/641/648399f1e06f02de97378985dfa27ab3/FA0A97320DA5A26C7D289B2BAE28B24E/luna-hatfield-1-.webp',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-I1APFCUsbd1zk6N02a3LsynlhDAG1G.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luna-18053-aQTdIDwNFhFV3yYLISHD2bBHAXyU4s.webp',
      'https://www.crm-students.com/resource/image/773300/landscape_ratio16x9/1140/641/a3b698c449123c6c15bbe23c113fb289/E42D4D56C1AEA1B203C421572B97F682/luna-4.webp',
      'https://www.crm-students.com/resource/image/773298/landscape_ratio16x9/1140/641/ff48542fc4a7853850e5b58e9e16632c/6E361FD7E1C1C6A8838082584D386EA7/luna-5.webp',
      'https://www.crm-students.com/resource/image/773392/landscape_ratio16x9/1140/641/39dbcb25f78b63c24eaeefe562a8ae30/C68AD0613B8327CC1153F30D24FB6F84/ktv-room.webp',
      'https://www.crm-students.com/resource/image/773390/landscape_ratio16x9/1140/641/b262b68cee7a0f2260cf47f3d9094d84/0F12DED3E42786E9EE63D8CCB06D029A/luna-reception.webp',
    ],
    amenities: ['All utilities included', 'CCTV', 'On-site maintenance', 'Bike storage', 'High-speed Wi-Fi', 'Laundry services', 'Keycard access', 'Parcel service', 'On-site management', 'Cinema room', 'Games room', 'Dining room', 'Karaoke room', 'TV lounge', 'Study rooms', 'Gym', 'Vending machines', 'Gaming room', 'Pool table', 'Piano', 'Courtyard', 'Basketball court'],
    highlights: ['Opposite De Havilland campus', '15-minute walk to College Lane campus', 'Private studio apartment', 'Room sizes from 16.4m² to 16.72m²', 'Dual occupancy available for this room type'],
    roomFeatures: ['Private en-suite bathroom', 'Small double bed with under-bed storage', 'Television', 'USB chargers', 'Large desk space', 'Double wardrobe with shelves and full-length mirror', 'Pin-board', 'Ample shelving', 'Coat hooks', 'Electronic room key', 'Radiator', 'Adjustable study chair', 'Combination microwave, oven and grill', 'Under-counter fridge/freezer', 'Four-ring induction hob', 'Breakfast bar and stools'],
    inclusions: ['All utility bills', 'High-speed Wi-Fi', 'Private studio kitchen', 'Access to communal facilities', 'On-site maintenance and management'],
    goodFor: ['University of Hertfordshire students', 'Students wanting a private studio', 'Students who value extensive communal facilities'],
    rooms: [
      {
        name: 'Standard Studio',
        image: 'https://www.crm-students.com/resource/image/875226/landscape_ratio16x9/1140/641/648399f1e06f02de97378985dfa27ab3/FA0A97320DA5A26C7D289B2BAE28B24E/luna-hatfield-1-.webp',
        price: { value: 265, currency: 'GBP', period: 'week', indicative: true, conditions: 'Starting price for this room type; confirm the exact rate for your dates and contract length with the provider.' },
        features: ['Private en-suite bathroom', 'Small double bed with under-bed storage', 'Television', 'USB chargers', 'Large desk space', 'Double wardrobe with shelves and full-length mirror', 'Combination microwave, oven and grill', 'Under-counter fridge/freezer', 'Four-ring induction hob', 'Breakfast bar and stools'],
        tenancy: 'Room sizes from 16.4m² to 16.72m²; dual occupancy available for this room type.',
      },
    ] satisfies CatalogProperty['rooms'],
  }),
  ...studyInn.map(([name, city, sourceUrl]) => makeProperty({
    slug: `study-inn-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    city,
    country: 'UK',
    address: city,
    priceFrom: studyInnFromPrice[name] ?? 0,
    roomTypes: (studyInnRooms[name] ?? []).map((room) => room.name).filter(Boolean).length ? studyInnRooms[name].map((room) => room.name) : ['Ensuite', 'Studio', 'Serviced apartment'],
    rooms: studyInnRooms[name],
    universities: cityUniversities[city] ?? [],
    distance: `Near major universities in ${city}`,
    partnerSlug: 'study-inn',
    sourceUrl,
    categories: ['Student residence', 'Serviced living', 'All-inclusive'],
    amenities: ['All bills included', 'Housekeeping', 'Superfast Wi-Fi', 'Gym', 'Wellness spaces', 'Study rooms', '24/7 security'],
    highlights: ['All-inclusive living', 'Strong wellbeing offering', 'Central university access'],
    availabilityNote: name === 'Frederick Road' ? 'Opening September 2027; availability to be confirmed.' : name === 'James Street' ? 'Opening 2027; availability to be confirmed.' : name === 'Marlborough House' ? 'Leased to the University of Bristol; contact the University for allocation and rates.' : undefined,
    gallery: images,
  })),
  ...neonWood.map(([name, city, sourceUrl], index) => makeProperty({ slug: `neon-wood-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, name, city, country: 'Germany', address: city, priceFrom: index === 0 ? 975 : 0, roomTypes: ['Single room', 'Studio', 'Double room'], universities: cityUniversities[city] ?? [], distance: `Well connected to universities in ${city}`, partnerSlug: 'neon-wood', sourceUrl, categories: ['Private apartment', 'All-inclusive', 'Furnished'], amenities: ['Furnished apartment', 'Private bathroom', 'Kitchenette', 'High-speed Wi-Fi', 'Gym', 'Lounge', 'Study rooms', 'Cinema room'], highlights: ['All-inclusive pricing', 'Private kitchenette and bathroom', 'International student community'], gallery: images })),
  ...vitaStudent.map(([name, city]) => makeProperty({ slug: `vita-student-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, name, city, country: city === 'Barcelona' || city === 'Madrid' ? 'Spain' : 'UK', address: `${name}, ${city}`, priceFrom: 0, roomTypes: ['Ensuite', 'Studio'], universities: cityUniversities[city] ?? [], distance: `Central student location in ${city}`, partnerSlug: 'vita-student', sourceUrl: `${sourceByPartner['vita-student']}${city.toLowerCase()}/`, categories: ['Premium student residence', 'All-inclusive', 'Private room'], amenities: ['Bills included', '24/7 gym', 'Study spaces', 'Housekeeping', 'Events', 'High-speed Wi-Fi', '24/7 support'], highlights: ['All-in living', 'Central locations', 'Strong resident experience'], gallery: images })),
  ...iglu.map(([name, city]) => makeProperty({ slug: `iglu-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, name, city, country: 'Australia', address: `${name}, ${city}`, priceFrom: 0, roomTypes: ['Studio', 'Ensuite', 'Shared apartment'], universities: cityUniversities[city] ?? [], distance: `Close to major universities and transport in ${city}`, partnerSlug: 'iglu', sourceUrl: 'https://iglu.com.au/compare-iglus/', categories: ['Student residence', 'Furnished', 'Purpose-built'], amenities: ['24/7 support', 'Study areas', 'Gym', 'Social spaces', 'Laundry', 'Bike storage', 'High-security access'], highlights: ['University-focused locations', 'Strong communal facilities', 'Public transport access'], gallery: images, availabilityNote: name === 'Mascot Duo' ? 'Opening January 2027; availability to be confirmed.' : undefined })),
]

