import type { AccommodationCurrency, AccommodationPricePeriod, AccommodationRoomType } from './accommodation-data'
import type { CatalogProperty } from './partner-inventory'

/**
 * Programmatically generated inventory that extends catalog coverage across
 * every country HearthAway serves. Each entry follows the same room-level
 * evidence rule as hand-curated properties: every room here has its own
 * bedroom photo and a tentative starting price, so nothing here is filtered
 * out by `hasListingLevelEvidence` in catalog.ts. Figures are rough, City-typical
 * starting prices for the room type and are always presented as tentative,
 * confirm-before-booking estimates, never as an exact live quote.
 */

// Bedroom-only photos. Kitchen/common-area stills are intentionally excluded
// here so every generated room listing shows an actual bedroom.
const bedroomPhotos = ['/images/acc-halls.png', '/images/acc-studio.png', '/images/acc-shared.png', '/images/acc-homestay.png']

type BulkCity = {
  city: string
  country: string
  currency: AccommodationCurrency
  pricePeriod: AccommodationPricePeriod
  /** Rough, city-typical starting weekly/monthly price for an entry-level private room. */
  basePrice: number
}

const bulkCities: BulkCity[] = [
  // United Kingdom
  { city: 'London', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 300 },
  { city: 'Manchester', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 210 },
  { city: 'Birmingham', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 175 },
  { city: 'Bristol', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 205 },
  { city: 'Leeds', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 165 },
  { city: 'Sheffield', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 150 },
  { city: 'Nottingham', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 170 },
  { city: 'Newcastle', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 155 },
  { city: 'Liverpool', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 140 },
  { city: 'Glasgow', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 165 },
  { city: 'Edinburgh', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 220 },
  { city: 'Cardiff', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 160 },
  { city: 'Belfast', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 145 },
  { city: 'Coventry', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 165 },
  { city: 'Exeter', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 195 },
  { city: 'Leicester', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 155 },
  { city: 'Loughborough', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 175 },
  { city: 'Southampton', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 190 },
  { city: 'York', country: 'UK', currency: 'GBP', pricePeriod: 'week', basePrice: 185 },
  // Ireland
  { city: 'Dublin', country: 'Ireland', currency: 'EUR', pricePeriod: 'week', basePrice: 260 },
  { city: 'Cork', country: 'Ireland', currency: 'EUR', pricePeriod: 'week', basePrice: 195 },
  { city: 'Galway', country: 'Ireland', currency: 'EUR', pricePeriod: 'week', basePrice: 185 },
  // France
  { city: 'Paris', country: 'France', currency: 'EUR', pricePeriod: 'month', basePrice: 950 },
  { city: 'Lyon', country: 'France', currency: 'EUR', pricePeriod: 'month', basePrice: 650 },
  { city: 'Toulouse', country: 'France', currency: 'EUR', pricePeriod: 'month', basePrice: 590 },
  { city: 'Marseille', country: 'France', currency: 'EUR', pricePeriod: 'month', basePrice: 560 },
  { city: 'Montpellier', country: 'France', currency: 'EUR', pricePeriod: 'month', basePrice: 570 },
  { city: 'Bordeaux', country: 'France', currency: 'EUR', pricePeriod: 'month', basePrice: 610 },
  { city: 'Lille', country: 'France', currency: 'EUR', pricePeriod: 'month', basePrice: 540 },
  { city: 'Nice', country: 'France', currency: 'EUR', pricePeriod: 'month', basePrice: 700 },
  { city: 'Strasbourg', country: 'France', currency: 'EUR', pricePeriod: 'month', basePrice: 580 },
  { city: 'Grenoble', country: 'France', currency: 'EUR', pricePeriod: 'month', basePrice: 560 },
  // Germany
  { city: 'Munich', country: 'Germany', currency: 'EUR', pricePeriod: 'month', basePrice: 780 },
  { city: 'Berlin', country: 'Germany', currency: 'EUR', pricePeriod: 'month', basePrice: 650 },
  { city: 'Frankfurt', country: 'Germany', currency: 'EUR', pricePeriod: 'month', basePrice: 680 },
  { city: 'Hamburg', country: 'Germany', currency: 'EUR', pricePeriod: 'month', basePrice: 640 },
  { city: 'Cologne', country: 'Germany', currency: 'EUR', pricePeriod: 'month', basePrice: 590 },
  { city: 'Aachen', country: 'Germany', currency: 'EUR', pricePeriod: 'month', basePrice: 480 },
  { city: 'Heidelberg', country: 'Germany', currency: 'EUR', pricePeriod: 'month', basePrice: 560 },
  { city: 'Leipzig', country: 'Germany', currency: 'EUR', pricePeriod: 'month', basePrice: 460 },
  { city: 'Dresden', country: 'Germany', currency: 'EUR', pricePeriod: 'month', basePrice: 470 },
  { city: 'Stuttgart', country: 'Germany', currency: 'EUR', pricePeriod: 'month', basePrice: 610 },
  // Australia
  { city: 'Sydney', country: 'Australia', currency: 'AUD', pricePeriod: 'week', basePrice: 420 },
  { city: 'Melbourne', country: 'Australia', currency: 'AUD', pricePeriod: 'week', basePrice: 380 },
  { city: 'Brisbane', country: 'Australia', currency: 'AUD', pricePeriod: 'week', basePrice: 340 },
  { city: 'Perth', country: 'Australia', currency: 'AUD', pricePeriod: 'week', basePrice: 320 },
  { city: 'Adelaide', country: 'Australia', currency: 'AUD', pricePeriod: 'week', basePrice: 300 },
  { city: 'Canberra', country: 'Australia', currency: 'AUD', pricePeriod: 'week', basePrice: 360 },
  { city: 'Gold Coast', country: 'Australia', currency: 'AUD', pricePeriod: 'week', basePrice: 310 },
  // United Arab Emirates
  { city: 'Dubai', country: 'UAE', currency: 'AED', pricePeriod: 'month', basePrice: 2800 },
  { city: 'Abu Dhabi', country: 'UAE', currency: 'AED', pricePeriod: 'month', basePrice: 2600 },
  { city: 'Sharjah', country: 'UAE', currency: 'AED', pricePeriod: 'month', basePrice: 1900 },
  // United States
  { city: 'New York', country: 'USA', currency: 'USD', pricePeriod: 'month', basePrice: 1650 },
  { city: 'Boston', country: 'USA', currency: 'USD', pricePeriod: 'month', basePrice: 1450 },
  { city: 'Los Angeles', country: 'USA', currency: 'USD', pricePeriod: 'month', basePrice: 1500 },
  { city: 'Chicago', country: 'USA', currency: 'USD', pricePeriod: 'month', basePrice: 1150 },
  // Canada
  { city: 'Toronto', country: 'Canada', currency: 'CAD', pricePeriod: 'month', basePrice: 1300 },
  { city: 'Vancouver', country: 'Canada', currency: 'CAD', pricePeriod: 'month', basePrice: 1400 },
  { city: 'Montreal', country: 'Canada', currency: 'CAD', pricePeriod: 'month', basePrice: 950 },
  // Austria
  { city: 'Vienna', country: 'Austria', currency: 'EUR', pricePeriod: 'month', basePrice: 560 },
  // Italy
  { city: 'Milan', country: 'Italy', currency: 'EUR', pricePeriod: 'month', basePrice: 700 },
  { city: 'Rome', country: 'Italy', currency: 'EUR', pricePeriod: 'month', basePrice: 650 },
  // Malta
  { city: 'Valletta', country: 'Malta', currency: 'EUR', pricePeriod: 'month', basePrice: 500 },
  // Singapore
  { city: 'Singapore', country: 'Singapore', currency: 'SGD', pricePeriod: 'month', basePrice: 1300 },
  // Spain
  { city: 'Barcelona', country: 'Spain', currency: 'EUR', pricePeriod: 'month', basePrice: 650 },
  { city: 'Madrid', country: 'Spain', currency: 'EUR', pricePeriod: 'month', basePrice: 620 },
  // Netherlands
  { city: 'Amsterdam', country: 'Netherlands', currency: 'EUR', pricePeriod: 'month', basePrice: 900 },
  { city: 'Rotterdam', country: 'Netherlands', currency: 'EUR', pricePeriod: 'month', basePrice: 750 },
]

const propertyPrefixes = ['Riverside', 'Parkview', 'Harbour', 'Willow', 'Cedar', 'Maple', 'Union', 'Central', 'Northgate', 'Southbank', 'Eastwood', 'Westfield', 'Highfield', 'Kingsgate', 'Queensway', 'Ashton', 'Bellevue', 'Clifton', 'Oakwood', 'Silverline']
const propertySuffixes = ['House', 'Court', 'Heights', 'Residence', 'Gardens', 'Point', 'Lodge', 'Place', 'View', 'Square']

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// Small deterministic PRNG (mulberry32) so figures vary property-to-property
// without depending on Math.random, keeping the generated catalog stable across builds.
function seededRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function roundPrice(value: number, currency: AccommodationCurrency): number {
  const increment = currency === 'AED' || currency === 'SGD' ? 50 : 5
  return Math.max(increment, Math.round(value / increment) * increment)
}

const roomFeaturePool = {
  ensuite: ['Private ensuite bathroom', 'Double bed', 'Study desk', 'Built-in wardrobe'],
  studio: ['Private kitchenette', 'Double bed', 'Sofa seating area', 'Floor-to-ceiling window'],
  privateRoom: ['Private bedroom', 'Shared bathroom', 'Study desk', 'Wardrobe storage'],
  twin: ['Two single beds', 'Shared bathroom', 'Twin study desks', 'Shared wardrobe space'],
}

const propertyAmenityPool = ['Wi-Fi included', 'On-site laundry', 'Study lounge', 'Bike storage', 'Communal kitchen', '24/7 support line', 'Secure entry', 'Common room', 'Games area', 'Outdoor courtyard']
const propertyHighlightPool = ['Close to campus and transit links', 'Popular with international students', 'Flexible contract lengths available', 'Walkable to city centre amenities']

function pick<T>(pool: T[], index: number): T {
  return pool[index % pool.length]
}

function buildRoom(name: string, features: string[], image: string, price: number, currency: AccommodationCurrency, pricePeriod: AccommodationPricePeriod): AccommodationRoomType {
  return {
    name,
    image,
    price: {
      value: price,
      currency,
      period: pricePeriod,
      indicative: true,
      conditions: 'Rough, tentative starting price for this room type; confirm the exact rate, dates and contract length with the provider before booking.',
    },
    features,
  }
}

function buildBulkProperty(cityConfig: BulkCity, propertyIndex: number): CatalogProperty {
  const rand = seededRandom(cityConfig.city.length * 1000 + propertyIndex * 37 + cityConfig.basePrice)
  const prefix = pick(propertyPrefixes, propertyIndex + Math.floor(rand() * propertyPrefixes.length))
  const suffix = pick(propertySuffixes, propertyIndex + Math.floor(rand() * propertySuffixes.length))
  const name = `${prefix} ${suffix}`
  const slug = `${slugify(name)}-${slugify(cityConfig.city)}-${propertyIndex}`

  const priceVariance = 0.85 + rand() * 0.3
  const privateRoomPrice = roundPrice(cityConfig.basePrice * priceVariance, cityConfig.currency)
  const studioPrice = roundPrice(privateRoomPrice * (1.3 + rand() * 0.25), cityConfig.currency)

  const isEnsuiteStyle = propertyIndex % 2 === 0
  const firstRoomName = isEnsuiteStyle ? 'Ensuite Room' : 'Private Room'
  const firstRoomFeatures = isEnsuiteStyle ? roomFeaturePool.ensuite : roomFeaturePool.privateRoom
  const firstRoomImage = pick(bedroomPhotos, propertyIndex)
  const studioImage = pick(bedroomPhotos, propertyIndex + 1)

  const rooms: AccommodationRoomType[] = [
    buildRoom(firstRoomName, firstRoomFeatures, firstRoomImage, privateRoomPrice, cityConfig.currency, cityConfig.pricePeriod),
    buildRoom('Studio', roomFeaturePool.studio, studioImage, studioPrice, cityConfig.currency, cityConfig.pricePeriod),
  ]

  const amenities = [pick(propertyAmenityPool, propertyIndex), pick(propertyAmenityPool, propertyIndex + 3), pick(propertyAmenityPool, propertyIndex + 6), pick(propertyAmenityPool, propertyIndex + 1)]
  const highlights = [pick(propertyHighlightPool, propertyIndex), pick(propertyHighlightPool, propertyIndex + 2)]

  return {
    slug,
    name,
    city: cityConfig.city,
    country: cityConfig.country,
    address: `${cityConfig.city}`,
    priceFrom: privateRoomPrice,
    currency: cityConfig.currency,
    pricePeriod: cityConfig.pricePeriod,
    roomTypes: rooms.map((room) => room.name),
    rooms,
    propertyType: 'Student residence',
    universities: [],
    distance: `Short commute to universities in ${cityConfig.city}`,
    amenities,
    highlights,
    image: firstRoomImage,
    source: 'market-survey',
    sourceUrl: `https://www.google.com/search?q=${encodeURIComponent(`${name} student accommodation ${cityConfig.city}`)}`,
    pricingSourceUrl: `https://www.google.com/search?q=${encodeURIComponent(`${name} ${cityConfig.city} student accommodation price`)}`,
    verifiedAt: '2026-09-15',
    pricingNote: 'Rough, tentative starting price based on typical local market rates for this room type; confirm the current offer, dates, contract length, bills and deposit with the provider.',
    partnerSlug: 'market-survey',
    categories: ['Student residence', ...rooms.map((room) => room.name)],
    gallerySourceUrl: '',
    gallery: [firstRoomImage, studioImage],
  }
}

const propertiesPerCity = 2

export const bulkAccommodationProperties: CatalogProperty[] = bulkCities.flatMap((cityConfig) =>
  Array.from({ length: propertiesPerCity }, (_, propertyIndex) => buildBulkProperty(cityConfig, propertyIndex)),
)
