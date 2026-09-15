export type AccommodationCurrency = 'GBP' | 'EUR' | 'AUD' | 'USD' | 'CAD' | 'AED' | 'SGD' | 'MYR' | 'MTL'

export type AccommodationProperty = {
  slug: string
  name: string
  city: string
  country: string
  address: string
  priceFrom: number
  currency: AccommodationCurrency
  roomTypes: string[]
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
}

// Seed inventory for the first accommodation portal release.
// Pricing, room availability and property details change frequently and must be reconfirmed before booking.
export const accommodationProperties: AccommodationProperty[] = [
  {
    slug: 'atlantic-point-liverpool', name: 'Atlantic Point', city: 'Liverpool', country: 'UK', address: 'Naylor St, Liverpool, L3 6LS', priceFrom: 123, currency: 'GBP',
    roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Liverpool', 'Liverpool John Moores University', 'SAE Institute'], distance: '0.33 mi from SAE Institute',
    amenities: ['Bike storage', 'Laundry', 'Wi-Fi', 'Common areas', 'Pool table', 'CCTV', '24/7 assistance'], highlights: ['Central location', 'Multiple room options', 'On-site support'], image: '/images/acc-halls.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/liverpool-1811029039831',
  },
  {
    slug: 'europa-liverpool', name: 'Europa', city: 'Liverpool', country: 'UK', address: 'Erskine St, Liverpool, L6 1AH', priceFrom: 125, currency: 'GBP',
    roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Liverpool', 'Liverpool John Moores University'], distance: '0.28 mi from Liverpool School of Tropical Medicine',
    amenities: ['Bills included', 'Study area', 'Laundry', 'Lounge', 'Cycle store', 'Wi-Fi', 'Games area'], highlights: ['Bills included', 'Strong communal spaces', 'Close to universities'], image: '/images/acc-shared.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/liverpool-1811029039831',
  },
  {
    slug: 'albert-court-liverpool', name: 'Albert Court', city: 'Liverpool', country: 'UK', address: 'London Rd, Liverpool, L3 8JD', priceFrom: 135, currency: 'GBP',
    roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Liverpool', 'Liverpool John Moores University'], distance: '0.13 mi from Liverpool School of Tropical Medicine',
    amenities: ['Gym', 'Laundry', 'Study spaces', 'Bike storage', 'Free Wi-Fi', 'CCTV', 'Reception'], highlights: ['Gym on site', 'Dedicated study spaces', 'Central Liverpool location'], image: '/images/acc-studio.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/liverpool-1811029039831',
  },
  {
    slug: 'haigh-court-liverpool', name: 'Haigh Court', city: 'Liverpool', country: 'UK', address: 'S Hunter St, Liverpool, L1 9JG', priceFrom: 124, currency: 'GBP',
    roomTypes: ['Ensuite', 'Private Room'], propertyType: 'Student residence', universities: ['University of Liverpool', 'Liverpool John Moores University'], distance: '0.13 mi from Liverpool School of Tropical Medicine',
    amenities: ['Bike storage', 'Laundry', 'Ultra-fast Wi-Fi', 'Common room', 'Secure entry', 'CCTV', 'On-site team'], highlights: ['Very close to university facilities', 'Secure access', 'Outdoor green areas'], image: '/images/acc-homestay.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/liverpool-1811029039831',
  },
  {
    slug: 'iq-chandos-house-manchester', name: 'iQ Chandos House', city: 'Manchester', country: 'UK', address: 'Granby Row, Manchester, M1 3QJ', priceFrom: 293, currency: 'GBP',
    roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Manchester', 'Manchester Metropolitan University'], distance: '0.27 mi from International House Manchester',
    amenities: ['Gym', 'Laundry', 'Study area', 'Free Wi-Fi', 'Cinema room', 'Games room', 'Fitness studio'], highlights: ['Extensive social spaces', 'City-centre location', 'Strong amenity package'], image: '/images/acc-halls.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/manchester-1811021510595?p=prev',
  },
  {
    slug: 'kincardine-court-manchester', name: 'Kincardine Court', city: 'Manchester', country: 'UK', address: 'Kincardine Rd, Manchester, M13 9JA', priceFrom: 268, currency: 'GBP',
    roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Manchester', 'Manchester Metropolitan University'], distance: '0.29 mi from Alliance Manchester Business School',
    amenities: ['Study area', 'Bike storage', 'Cinema room', 'Gym', 'Pool table', 'Outdoor social space', '24/7 assistance'], highlights: ['Near Alliance Manchester Business School', 'Large amenity mix', 'Outdoor social areas'], image: '/images/acc-shared.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/manchester-1811021510595?p=prev',
  },
  {
    slug: 'canvas-manchester', name: 'Canvas Manchester', city: 'Manchester', country: 'UK', address: 'River St, Manchester, M15 5GJ', priceFrom: 232, currency: 'GBP',
    roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['Manchester Metropolitan University', 'University of Manchester'], distance: '0.44 mi from Manchester Metropolitan University',
    amenities: ['Gym', 'Cinema', 'Study area', 'Games room', 'Bike storage', 'Free Wi-Fi', 'Wellbeing support'], highlights: ['Wellbeing support', 'Social spaces', 'Close to MMU'], image: '/images/acc-studio.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/manchester-1811021510595?p=prev',
  },
  {
    slug: 'manchester-court', name: 'Manchester Court', city: 'Manchester', country: 'UK', address: 'Dantzic St, Manchester, M4 4DW', priceFrom: 179, currency: 'GBP',
    roomTypes: ['Ensuite', 'Private Room'], propertyType: 'Student residence', universities: ['University of Manchester', 'Manchester Metropolitan University', 'BPP University'], distance: '0.14 mi from dBs Institute Manchester',
    amenities: ['Bills included', 'Ultra-fast Wi-Fi', 'Study area', 'Social lounges', 'Games area', 'CCTV', 'Outdoor courtyard'], highlights: ['Lower entry price', 'Bills included', 'Central location'], image: '/images/acc-homestay.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/manchester-1811021510595?p=prev',
  },
  {
    slug: 'bridgewater-heights-manchester', name: 'Bridgewater Heights', city: 'Manchester', country: 'UK', address: 'Great Marlborough St, Manchester, M1 5NR', priceFrom: 280, currency: 'GBP',
    roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['University of Manchester', 'Manchester Metropolitan University', 'INTO Manchester'], distance: '0.14 mi from INTO Manchester',
    amenities: ['Gym', 'Laundry', 'Study area', 'Cinema room', 'Pool table', 'Wi-Fi', 'Bike storage'], highlights: ['Excellent amenity mix', 'Close to INTO Manchester', 'Central location'], image: '/images/acc-kitchen.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/search/manchester-1811021510595?p=prev',
  },
  {
    slug: 'emily-bowes-court-london', name: 'Emily Bowes Court', city: 'London', country: 'UK', address: 'London', priceFrom: 287, currency: 'GBP', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['London universities'], distance: 'London location', amenities: ['Private bathroom', 'Shared kitchen options', 'Private kitchens in studios', 'Study-friendly rooms'], highlights: ['Multiple room formats', 'En-suite options', 'Studio options'], image: '/images/acc-halls.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/emily-bowes-court-london-1710110276271',
  },
  {
    slug: 'pacific-court-london', name: 'Pacific Court', city: 'London', country: 'UK', address: 'London', priceFrom: 352, currency: 'GBP', roomTypes: ['Ensuite', 'Private Room', 'Studio'], propertyType: 'Student residence', universities: ['London universities'], distance: 'London location', amenities: ['Private bathroom', 'Shared kitchen options', 'Private kitchens in studios', 'Accessible studio options'], highlights: ['En-suite options', 'Premium studio options', 'Wheelchair-accessible studio listed'], image: '/images/acc-studio.png', source: 'Amber Student', sourceUrl: 'https://amberstudent.com/places/pacific-court-london-1710240121954',
  },
]

export const accommodationCities = [...new Set(accommodationProperties.map((property) => property.city))]
export function getAccommodationBySlug(slug: string) { return accommodationProperties.find((property) => property.slug === slug) }
