import type { AccommodationCurrency, AccommodationPricePeriod, AccommodationProperty } from './accommodation-data'

type CatalogMeta = { partnerSlug: string; categories: string[]; gallerySourceUrl: string; gallery: string[]; availabilityNote?: string; roomFeatures?: string[]; inclusions?: string[]; contractTerms?: string[]; depositNote?: string; goodFor?: string[] }
export type CatalogProperty = AccommodationProperty & CatalogMeta

type PropertySeed = { slug: string; name: string; city: string; country: string; address: string; universities?: string[]; distance: string; partnerSlug: string; sourceUrl?: string; priceFrom?: number; currency?: AccommodationCurrency; pricePeriod?: AccommodationPricePeriod; roomTypes?: string[]; categories?: string[]; image?: string; gallery?: string[]; amenities?: string[]; highlights?: string[]; availabilityNote?: string; roomFeatures?: string[]; inclusions?: string[]; contractTerms?: string[]; depositNote?: string; goodFor?: string[] }

const genericGallery = ['/images/acc-halls.png', '/images/acc-studio.png', '/images/acc-kitchen.png']
// Strips accents before slugifying (e.g. "Neukölln" -> "neukolln") so names with diacritics produce the same slug shape everything else keys off of — without
// this, "Neukölln" or "TÜ3" would slugify to "neuk-lln" / "t-3" and silently stop
// matching their `discoveredGalleries` / `propertyOverrides` entries.
function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
const cityUniversities: Record<string, string[]> = { Belfast: ["Queen's University Belfast", 'Ulster University'], Birmingham: ['University of Birmingham', 'Aston University', 'Birmingham City University'], Bristol: ['University of Bristol', 'University of the West of England'], Cardiff: ['Cardiff University', 'Cardiff Metropolitan University'], Coventry: ['Coventry University', 'University of Warwick'], Edinburgh: ['University of Edinburgh', 'Heriot Watt University'], Glasgow: ['University of Glasgow', 'University of Strathclyde'], Hatfield: ['University of Hertfordshire'], Leeds: ['University of Leeds', 'Leeds Beckett University'], Liverpool: ['University of Liverpool', 'Liverpool John Moores University'], Manchester: ['University of Manchester', 'Manchester Metropolitan University'], Newcastle: ['University of Newcastle', 'Northumbria University'], Nottingham: ['University of Nottingham', 'Nottingham Trent University'], Sheffield: ['University of Sheffield', 'Sheffield Hallam University'] }
// Internal research references are retained for catalogue maintenance and are never rendered in customer-facing pages.
const sourceByPartner: Record<string, string> = { 'study-inn': 'https://studyinn.com/', 'neon-wood': 'https://neonwood.com/apartments', 'vita-student': 'https://www.vitastudent.com/en/cities/', iglu: 'https://iglu.com.au/' }
const discoveredGalleries: Record<string, string[]> = { 'study-inn-brotherton-house': ['https://ecnf5ig9whg.exactdn.com/wp-content/uploads/2022/11/Platinum-APT-1-1-1024x752.jpg?lossy=0&sharp=1&ssl=1'] }

function makeProperty(seed: PropertySeed): CatalogProperty {
  const sourceUrl = seed.sourceUrl ?? sourceByPartner[seed.partnerSlug] ?? '#'
  const gallery = seed.gallery ?? discoveredGalleries[seed.slug] ?? genericGallery
  return { slug: seed.slug, name: seed.name, city: seed.city, country: seed.country, address: seed.address, priceFrom: seed.priceFrom ?? 0, currency: seed.currency ?? 'GBP', pricePeriod: seed.pricePeriod ?? 'week', roomTypes: seed.roomTypes ?? [], propertyType: seed.categories?.[0] ?? 'Student residence', universities: seed.universities ?? cityUniversities[seed.city] ?? [], distance: seed.distance, partnerSlug: seed.partnerSlug, sourceUrl, gallerySourceUrl: sourceUrl, image: seed.image ?? gallery[0], gallery, categories: seed.categories ?? [], amenities: seed.amenities ?? [], highlights: seed.highlights ?? [], availabilityNote: seed.availabilityNote, roomFeatures: seed.roomFeatures, inclusions: seed.inclusions, contractTerms: seed.contractTerms, depositNote: seed.depositNote, goodFor: seed.goodFor }
}

const studyInn = [['Brotherton House', 'Leeds', 'https://studyinn.com/student-accommodation/leeds/brotherton-house/'], ['Reynard House', 'Leicester', 'https://studyinn.com/student-accommodation/leicester/reynard-house/']] as const
const neonWood = [['Berlin Frankfurter Tor', 'Berlin', 'https://neonwood.com/cities/berlin/berlin-frankfurter-tor'], ['Berlin Mitte-Wedding', 'Berlin', 'https://neonwood.com/cities/berlin']] as const
const vitaStudent = [['Bruce Street', 'Belfast'], ['New Gough Street', 'Birmingham'], ['Pebble Mill', 'Birmingham'], ['Zed Alley', 'Bristol'], ['Park Place', 'Cardiff'], ['Copper Towers', 'Coventry']] as const
const iglu = [['Broadway', 'Sydney'], ['Central', 'Sydney'], ['Central Park', 'Sydney'], ['Chatswood', 'Sydney'], ['Redfern', 'Sydney'], ['Mascot', 'Sydney'], ['Mascot Duo', 'Sydney'], ['Summer Hill', 'Sydney']] as const

const studyInnShared = { categories: ['Student residence', 'Serviced living', 'All-inclusive'], roomTypes: ['Ensuite', 'Studio', 'Serviced apartment'], amenities: ['All bills included', 'Housekeeping', 'Gym', 'Study spaces', 'Communal areas'], highlights: ['All-inclusive living', 'Central locations', 'Furnished rooms'] }
const neonShared = { categories: ['Private apartment', 'All-inclusive', 'Furnished'], roomTypes: ['Single room', 'Studio', 'Double room'], amenities: ['Furnished apartment', 'Private bathroom', 'Kitchen', 'Wi-Fi'], highlights: ['Furnished apartments', 'Flexible city living'] }
const vitaShared = { categories: ['Premium student residence', 'All-inclusive', 'Private room'], roomTypes: ['Ensuite', 'Studio'], amenities: ['Bills included', '24/7 gym', 'Study spaces', 'Housekeeping'], highlights: ['Premium facilities', 'All-inclusive options'] }
const igluShared = { categories: ['Student residence', 'Furnished', 'Purpose-built'], roomTypes: ['Studio', 'Ensuite', 'Shared apartment'], amenities: ['Unlimited Wi-Fi', 'All utilities', '24/7 support', 'Study areas', 'Gym', 'Social spaces', 'Laundry', 'Bike storage'], highlights: ['University-focused locations', 'Strong communal facilities', 'Public transport access'] }

export const additionalAccommodationProperties: CatalogProperty[] = [
  makeProperty({
    slug: 'luna-hatfield',
    name: 'Luna',
    city: 'Hatfield',
    country: 'UK',
    address: '301 St Albans Rd, Hatfield, AL10 9RH',
    partnerSlug: 'crm-students',
    sourceUrl: 'https://crm-students.com/hatfield/luna/standard-studio-765400',
    priceFrom: 250,
    currency: 'GBP',
    pricePeriod: 'week',
    roomTypes: ['Standard Studio'],
    categories: ['Student residence', 'Purpose-built', 'Furnished'],
    universities: ['University of Hertfordshire'],
    distance: 'Opposite the University of Hertfordshire De Havilland campus; around 15 minutes on foot to College Lane campus',
    image: 'https://www.crm-students.com/resource/image/875226/landscape_ratio16x9/1140/641/648399f1e06f02de97378985dfa27ab3/FA0A97320DA5A26C7D289B2BAE28B24E/luna-hatfield-1-.webp',
    gallery: [
      'https://www.crm-students.com/resource/image/875226/landscape_ratio16x9/1140/641/648399f1e06f02de97378985dfa27ab3/FA0A97320DA5A26C7D289B2BAE28B24E/luna-hatfield-1-.webp',
      'https://www.crm-students.com/resource/image/773306/landscape_ratio16x9/1140/641/4e8a3fcc5ca74978295d5a060785c90/9F0E6B881BEE733D3114EFCBED1DC169/luna-1.webp',
      'https://www.crm-students.com/resource/image/773304/landscape_ratio16x9/1140/641/8f42b96e4170817b26c15ea4b57e9b7f/2A25281CD7FB2AFE8A11CE3072E3E736/luna-2.webp',
      'https://www.crm-students.com/resource/image/773302/landscape_ratio16x9/1140/641/fb99396951708b14662f57de638360e0/DE475FC879D4CECDE3A986903115F73A/luna-3.webp',
      'https://www.crm-students.com/resource/image/773300/landscape_ratio16x9/1140/641/a3b698c449123c6c15bbe23c113fb289/E42D4D56C1AEA1B203C421572B97F682/luna-4.webp',
      'https://www.crm-students.com/resource/image/773298/landscape_ratio16x9/1140/641/ff48542fc4a7853850e5b58e9e16632c/6E361FD7E1C1C6A8838082584D386EA7/luna-5.webp',
      'https://www.crm-students.com/resource/image/773392/landscape_ratio16x9/1140/641/39dbcb25f78b63c24eaeefe562a8ae30/C68AD0613B8327CC1153F30D24FB6F84/ktv-room.webp',
      'https://www.crm-students.com/resource/image/773390/landscape_ratio16x9/1140/641/b262b68cee7a0f2260cf47f3d9094d84/0F12DED3E42786E9EE63D8CCB06D029A/luna-reception.webp',
    ],
    amenities: ['All utilities included', 'CCTV', 'On-site maintenance', 'Bike storage', 'High-speed Wi-Fi', 'Laundry services', 'Keycard access', 'Parcel service', 'On-site management', 'Cinema room', 'Gym and sports centre', 'Study spaces', 'Social spaces'],
    highlights: ['Opposite De Havilland campus', '15-minute walk to College Lane campus', 'Standard studios', 'Free on-site sports centre', 'Extensive resident social spaces'],
    roomFeatures: ['Private en-suite bathroom', 'Small double bed', 'Study area', 'Smart TV', 'Wardrobe', 'Private kitchen area', 'Desk'],
    inclusions: ['All utility bills', 'High-speed Wi-Fi', 'Access to gym and communal spaces', 'On-site maintenance and management'],
    contractTerms: ['No Visa/Place, No Pay policy applies subject to the provider terms.', '2026–2027 tenant fees document available from the provider.'],
    goodFor: ['University of Hertfordshire students', 'Students wanting a standard studio', 'Students who value extensive communal facilities'],
    availabilityNote: 'The Standard Studio listing is currently sold out and available to join via the provider waitlist. The displayed £250 per week is an indicative starting price from the provider’s current studio listings; confirm the exact rate when this room becomes available.',
  }),
  makeProperty({ slug: 'iq-fiveways-house-manchester', name: 'iQ Fiveways House', city: 'Manchester', country: 'UK', address: '55 Chester Road, Manchester, M15 6JX', partnerSlug: 'iq-student-accommodation', sourceUrl: 'https://www.iqstudentaccommodation.com/manchester/fiveways-house', priceFrom: 0, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Studio', 'Private Room'], categories: ['Student residence', 'Purpose-built', 'Furnished'], universities: ['University of Manchester', 'Manchester Metropolitan University'], distance: 'Close to the University of Manchester and Manchester Metropolitan University', image: '/images/acc-halls.png', gallery: ['/images/acc-halls.png', '/images/acc-studio.png', '/images/acc-kitchen.png', '/images/acc-shared.png'], amenities: ['Wi-Fi', 'Study spaces', 'Gym', 'Cinema room', 'Games room', 'Laundry', 'Bike storage', '24/7 support'], highlights: ['Popular student location', 'Private room and studio options', 'Social spaces for residents'], roomFeatures: ['Private en-suite bathroom', 'Study desk and chair', 'Bed and storage', 'Fitted kitchen or kitchenette', 'High-speed internet'], inclusions: ['Wi-Fi', 'Furnished room', 'Access to shared spaces', 'On-site support'], contractTerms: ['Availability and contract length vary by room type.', 'Confirm the current offer before booking.'], depositNote: 'Deposit and advance payment requirements vary by room type; confirm before booking.', goodFor: ['Students studying in central Manchester', 'Students who want shared social facilities', 'Students comparing ensuite and studio living'] }),
  ...studyInn.map(([name, city, sourceUrl], index) => makeProperty({ slug: `study-inn-${slugify(name)}`, name, city, country: 'UK', address: city, priceFrom: index === 0 ? 165 : 0, currency: 'GBP', pricePeriod: 'week', partnerSlug: 'study-inn', sourceUrl, ...studyInnShared, universities: cityUniversities[city] })),
  ...neonWood.map(([name, city, sourceUrl]) => makeProperty({ slug: `neon-wood-${slugify(name)}`, name, city, country: 'Germany', address: city, priceFrom: 0, currency: 'EUR', pricePeriod: 'month', partnerSlug: 'neon-wood', sourceUrl, ...neonShared, universities: cityUniversities[city] })),
  ...vitaStudent.map(([name, city]) => makeProperty({ slug: `vita-student-${slugify(name)}`, name, city, country: city === 'Cardiff' ? 'UK' : 'UK', address: `${name}, ${city}`, partnerSlug: 'vita-student', ...vitaShared, universities: cityUniversities[city] })),
  ...iglu.map(([name, city]) => makeProperty({ slug: `iglu-${slugify(name)}`, name, city, country: 'Australia', address: `${name}, ${city}`, partnerSlug: 'iglu', currency: 'AUD', pricePeriod: 'week', ...igluShared })),
]
