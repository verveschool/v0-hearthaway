export type AccommodationCurrency = 'GBP' | 'EUR' | 'AUD' | 'USD' | 'CAD' | 'AED' | 'SGD' | 'MYR'
export type AccommodationPricePeriod = 'week' | 'month' | 'term' | 'night' | 'check'

/**
 * A room type's pricing is stored separately from whether the room is currently
 * bookable. The source may only offer an exact figure, a range, or nothing at
 * all — this shape can represent all three without inventing a number that
 * was never on the source page.
 */
export type AccommodationRoomPrice = {
  /** Exact figure when the source gives a single confirmed price. */
  value?: number
  /** Lower bound when the source gives a range instead of one figure. */
  minValue?: number
  /** Upper bound when the source gives a range instead of one figure. */
  maxValue?: number
  currency: AccommodationCurrency
  period?: AccommodationPricePeriod
  /** Pre-formatted label to use verbatim instead of composing one from the numeric fields. */
  label?: string
  /** True when the source frames this figure as a starting point, estimate or typical rate rather than a fixed guaranteed price. */
  indicative?: boolean
  /** Preserves why the price varies, e.g. "Depends on tenancy length and contract dates." */
  conditions?: string
  /** The pricing text as it appeared on the source page, kept for maintenance and transparency. */
  sourceText?: string
  /** True when the source lists the room type but gives no usable price at all. */
  priceOnEnquiry?: boolean
}

/**
 * A single room type offered by a property. Inventory (this room type exists at
 * this property) is completely independent from live availability — a room type
 * must stay in this list even when it is currently unavailable, sold out, or its
 * booking status is unknown. `availabilityNote` is optional supporting context
 * only and must never be used to remove a room type from the catalogue.
 */
export type AccommodationRoomType = {
  name: string
  /** The room-specific photo from the source, when the source provides one. Falls back to no image rather than reusing an unrelated property photo. */
  image?: string
  gallery?: string[]
  price: AccommodationRoomPrice
  features?: string[]
  /** Tenancy length, contract type or occupancy details specific to this room type. */
  tenancy?: string
  /** Informational only, e.g. "Opening 2027; availability to be confirmed." Never used to hide the room type. */
  availabilityNote?: string
}

export type AccommodationProperty = {
  slug: string
  name: string
  city: string
  country: string
  address: string
  priceFrom: number
  currency: AccommodationCurrency
  pricePeriod?: AccommodationPricePeriod
  roomTypes: string[]
  /** Rich per-room-type catalogue entries. When omitted, the catalogue layer synthesizes one entry per name in `roomTypes` without inventing pricing. */
  rooms?: AccommodationRoomType[]
  propertyType: string
  universities: string[]
  distance: string
  amenities: string[]
  highlights: string[]
  image: string
  source: string
  sourceUrl: string
  availabilityNote?: string
  roomFeatures?: string[]
  inclusions?: string[]
  contractTerms?: string[]
  depositNote?: string
  goodFor?: string[]
  verifiedAt?: string
  /** Pricing is indicative only; confirm the live room offer, dates and contract with the provider. */
  pricingNote?: string
  pricingSourceUrl?: string
  locationMapUrl?: string
}

export const accommodationProperties: AccommodationProperty[] = [
  { slug: 'atlantic-point-liverpool', name: 'Atlantic Point', city: 'Liverpool', country: 'UK', address: 'Naylor St, Liverpool, L3 6LS', priceFrom: 123, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Liverpool', 'Liverpool John Moores University', 'SAE Institute'], distance: '0.33 mi from SAE Institute', amenities: ['Bike storage', 'Laundry', 'Wi-Fi', 'Common areas', 'Pool table', 'CCTV', '24/7 assistance'], highlights: ['Central location', 'Multiple room options', 'On-site support'], image: '/images/acc-halls.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/liverpool-1811029039831' },
  { slug: 'europa-liverpool', name: 'Europa', city: 'Liverpool', country: 'UK', address: 'Erskine St, Liverpool, L6 1AH', priceFrom: 125, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Liverpool', 'Liverpool John Moores University'], distance: '0.28 mi from Liverpool School of Tropical Medicine', amenities: ['Bills included', 'Study area', 'Laundry', 'Lounge', 'Cycle store', 'Wi-Fi', 'Games area'], highlights: ['Bills included', 'Strong communal spaces', 'Close to universities'], image: '/images/acc-shared.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/liverpool-1811029039831' },
  { slug: 'albert-court-liverpool', name: 'Albert Court', city: 'Liverpool', country: 'UK', address: 'London Rd, Liverpool, L3 8JD', priceFrom: 135, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Liverpool', 'Liverpool John Moores University'], distance: '0.13 mi from Liverpool School of Tropical Medicine', amenities: ['Gym', 'Laundry', 'Study spaces', 'Bike storage', 'Free Wi-Fi', 'CCTV', 'Reception'], highlights: ['Gym on site', 'Dedicated study spaces', 'Central Liverpool location'], image: '/images/acc-studio.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/liverpool-1811029039831' },
  { slug: 'haigh-court-liverpool', name: 'Haigh Court', city: 'Liverpool', country: 'UK', address: 'S Hunter St, Liverpool, L1 9JG', priceFrom: 124, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room'], propertyType: 'Student residence', universities: ['University of Liverpool', 'Liverpool John Moores University'], distance: '0.13 mi from Liverpool School of Tropical Medicine', amenities: ['Bike storage', 'Laundry', 'Ultra-fast Wi-Fi', 'Common room', 'Secure entry', 'CCTV', 'On-site team'], highlights: ['Very close to university facilities', 'Secure access', 'Outdoor green areas'], image: '/images/acc-homestay.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/liverpool-1811029039831' },
  { slug: 'iq-chandos-house-manchester', name: 'iQ Chandos House', city: 'Manchester', country: 'UK', address: 'Granby Row, Manchester, M1 3QJ', priceFrom: 293, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Manchester', 'Manchester Metropolitan University'], distance: '0.27 mi from International House Manchester', amenities: ['Gym', 'Laundry', 'Study area', 'Free Wi-Fi', 'Cinema room', 'Games room', 'Fitness studio'], highlights: ['Extensive social spaces', 'City-centre location', 'Strong amenity package'], image: '/images/acc-halls.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/manchester-1811021510595?p=prev' },
  { slug: 'kincardine-court-manchester', name: 'Kincardine Court', city: 'Manchester', country: 'UK', address: 'Kincardine Rd, Manchester, M13 9JA', priceFrom: 268, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Manchester', 'Manchester Metropolitan University'], distance: '0.29 mi from Alliance Manchester Business School', amenities: ['Study area', 'Bike storage', 'Cinema room', 'Gym', 'Pool table', 'Outdoor social space', '24/7 assistance'], highlights: ['Near Alliance Manchester Business School', 'Large amenity mix', 'Outdoor social areas'], image: '/images/acc-shared.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/manchester-1811021510595?p=prev' },
  { slug: 'canvas-manchester', name: 'Canvas Manchester', city: 'Manchester', country: 'UK', address: 'River St, Manchester, M15 5GJ', priceFrom: 232, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['Manchester Metropolitan University', 'University of Manchester'], distance: '0.44 mi from Manchester Metropolitan University', amenities: ['Gym', 'Cinema', 'Study area', 'Games room', 'Bike storage', 'Free Wi-Fi', 'Wellbeing support'], highlights: ['Wellbeing support', 'Social spaces', 'Close to MMU'], image: '/images/acc-studio.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/manchester-1811021510595?p=prev' },
  { slug: 'manchester-court', name: 'Manchester Court', city: 'Manchester', country: 'UK', address: 'Dantzic St, Manchester, M4 4DW', priceFrom: 179, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room'], propertyType: 'Student residence', universities: ['University of Manchester', 'Manchester Metropolitan University', 'BPP University'], distance: '0.14 mi from dBs Institute Manchester', amenities: ['Bills included', 'Ultra-fast Wi-Fi', 'Study area', 'Social lounges', 'Games area', 'CCTV', 'Outdoor courtyard'], highlights: ['Lower entry price', 'Bills included', 'Central location'], image: '/images/acc-homestay.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/manchester-1811021510595?p=prev' },
  { slug: 'bridgewater-heights-manchester', name: 'Bridgewater Heights', city: 'Manchester', country: 'UK', address: 'Great Marlborough St, Manchester, M1 5NR', priceFrom: 280, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Manchester', 'Manchester Metropolitan University', 'INTO Manchester'], distance: '0.14 mi from INTO Manchester', amenities: ['Gym', 'Laundry', 'Study area', 'Cinema room', 'Pool table', 'Wi-Fi', 'Bike storage'], highlights: ['Excellent amenity mix', 'Close to INTO Manchester', 'Central location'], image: '/images/acc-kitchen.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/manchester-1811021510595?p=prev' },
  { slug: 'emily-bowes-court-london', name: 'Emily Bowes Court', city: 'London', country: 'UK', address: 'London', priceFrom: 287, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University College London', 'Kings College London', 'London School of Economics'], distance: 'London location', amenities: ['Private bathroom', 'Shared kitchen options', 'Private kitchens in studios', 'Study-friendly rooms'], highlights: ['Multiple room formats', 'En-suite options', 'Studio options'], image: '/images/acc-halls.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/emily-bowes-court-london-1710110276271' },
  { slug: 'pacific-court-london', name: 'Pacific Court', city: 'London', country: 'UK', address: 'London', priceFrom: 352, currency: 'GBP', pricePeriod: 'week', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University College London', 'Kings College London', 'London School of Economics'], distance: 'London location', amenities: ['Private bathroom', 'Shared kitchen options', 'Private kitchens in studios', 'Accessible studio options'], highlights: ['En-suite options', 'Premium studio options', 'Wheelchair-accessible studio listed'], image: '/images/acc-studio.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/pacific-court-london-1710240121954' },
]

export const accommodationCities = [...new Set(accommodationProperties.map((property) => property.city))]
export function getAccommodationBySlug(slug: string) { return accommodationProperties.find((property) => property.slug === slug) }
