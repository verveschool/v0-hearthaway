import type { AccommodationCurrency, AccommodationProperty, AccommodationRoomType } from './accommodation-data'

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
    currency?: AccommodationCurrency
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
    currency: property.currency ?? 'GBP',
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

const neonWoodLongLeaseConditions = 'Starting monthly all-inclusive rent for this room size as published on Neon Wood\u2019s apartments page; the exact rent depends on floor, exact size and lease length. Confirm with Neon Wood.'
const neonWoodPromoConditions = `${neonWoodLongLeaseConditions} Advertised as a limited-time rate available from a 3-month lease.`

/**
 * Real per-room-type breakdowns extracted from Neon Wood's own apartments listing page,
 * which publishes a starting monthly all-inclusive rent for every room type at every property.
 */
const neonWoodRooms: Record<string, AccommodationRoomType[]> = {
  'Berlin Frankfurter Tor': [
    { name: 'Classic (18m\u00b2)', price: { value: 895, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
    { name: 'Deluxe (24m\u00b2)', price: { value: 1166, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
    { name: 'Double (29\u201335m\u00b2)', price: { value: 1309, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
    { name: 'Neon Silver / Gold (24\u201331m\u00b2)', price: { value: 1364, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
  ],
  'Berlin Mitte-Wedding': [
    { name: 'Classic (17\u201318m\u00b2)', price: { value: 895, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
    { name: 'Deluxe (21\u201323m\u00b2)', price: { value: 1102, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
    { name: 'Neon Gold (27\u201331m\u00b2)', price: { value: 1364, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
    { name: 'Penthouse (17\u201330m\u00b2)', price: { value: 1081, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
  ],
  'Tannhaus Berlin Neukölln': [
    { name: 'Pine (27\u201331m\u00b2)', price: { value: 1070, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Cedar (40m\u00b2)', price: { value: 1200, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Fir (30\u201342m\u00b2)', price: { value: 1310, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Sequoia (50\u201367m\u00b2)', price: { value: 1510, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
  ],
  'Berlin Adlershof': [
    { name: 'Classic (17m\u00b2)', price: { value: 798, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
    { name: 'Deluxe (22\u201335m\u00b2)', price: { value: 866, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
    { name: 'Double Deluxe (22\u201335m\u00b2)', price: { value: 925, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodPromoConditions } },
  ],
  'Cologne K115': [
    { name: 'Cozy (20\u201321m\u00b2)', price: { value: 915, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Comfort (23m\u00b2)', price: { value: 966, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Double (28\u201332m\u00b2)', price: { value: 1090, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
  ],
  'Frankfurt Riedberg': [
    { name: 'Classic (17\u201319m\u00b2)', price: { value: 838, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Penthouse (23\u201335m\u00b2)', price: { value: 1040, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Deluxe (37m\u00b2)', price: { value: 1305, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Double (31m\u00b2)', price: { value: 1325, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
  ],
  'TÜ3': [
    { name: 'Cozy (28m\u00b2)', price: { value: 835, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Comfort (32m\u00b2)', price: { value: 995, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Superior (41\u201343m\u00b2)', price: { value: 1145, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
    { name: 'Double (51m\u00b2)', price: { value: 1269, currency: 'EUR', period: 'month', indicative: true, conditions: neonWoodLongLeaseConditions } },
  ],
}

const vitaStudent = [
  ['Bruce Street', 'Belfast'], ['Gough Street', 'Birmingham'], ['Pebble Mill', 'Birmingham'],
  ['Zed Alley', 'Bristol'], ['Park Place', 'Cardiff'], ['Copper Towers', 'Coventry'], ['Warwick Cannon Park', 'Coventry'],
  ['New Waverley', 'Edinburgh'], ['Iona Street', 'Edinburgh'], ['Fountainbridge', 'Edinburgh'], ['Portland House', 'Exeter'],
  ['West End', 'Glasgow'], ['Portland Crescent', 'Leeds'], ['St Albans', 'Leeds'],
  ['Crosshall St.', 'Liverpool'], ['Lewisham Exchange', 'London'], ['First Street', 'Manchester'], ['Circle Square', 'Manchester'],
  ['Leazes Park', 'Newcastle'], ['Westgate', 'Newcastle'], ['Strawberry Place', 'Newcastle'], ['Station Street', 'Nottingham'],
  ['Telephone House', 'Sheffield'], ['Richmond House', 'Southampton'], ['Lawrence Street', 'York'],
  ['Poblenou', 'Barcelona'], ['Pedralbes', 'Barcelona'], ['Oria', 'Madrid'],
] as const

type VitaBuildingDetail = {
  address: string
  floors: number
  rooms: number
  walkToUni: string
  walkToCentre: string
  roomTypes?: string[]
  availabilityNote?: string
}

/** Address, floor/room counts, transit times and published room-type names, all taken from each building's own Vita Student city page. */
const vitaStudentDetails: Record<string, VitaBuildingDetail> = {
  'Bruce Street': { address: 'Vita Student Bruce Street, 27 Bruce Street, Belfast, BT2 7JD', floors: 14, rooms: 269, walkToUni: '14-minute walk to Queen\u2019s University Belfast', walkToCentre: '9-minute walk to Belfast city centre' },
  'Gough Street': { address: 'Vita Student, 8 Gough Street, Birmingham, B1 1GJ', floors: 25, rooms: 540, walkToUni: '10-minute train to the University of Birmingham', walkToCentre: '1-minute walk to Birmingham city centre', availabilityNote: 'Opening September 2026; availability to be confirmed.' },
  'Pebble Mill': { address: 'Pebble Mill Studios, Pershore Road, Birmingham, B29 7ES', floors: 5, rooms: 360, walkToUni: '25-minute walk to the University of Birmingham', walkToCentre: '15-minute train to Birmingham city centre', roomTypes: ['Classic', 'Classic Courtyard', 'Premium', 'Deluxe', 'Accessible'] },
  'Zed Alley': { address: 'Vita Student Zed Alley, 35 Colston Avenue, Bristol, BS1 4TT', floors: 6, rooms: 131, walkToUni: '13-minute walk to the University of Bristol', walkToCentre: '13-minute walk to Bristol city centre' },
  'Park Place': { address: 'Vita Student Park Place, Park Place, Cathays, Cardiff, CF10 3FH', floors: 18, rooms: 401, walkToUni: '5-minute walk to Cardiff University', walkToCentre: '9-minute walk to Cardiff city centre' },
  'Copper Towers': { address: 'Vita Student Copper Towers, 25 Warwick Rd, Coventry, CV1 2EZ', floors: 13, rooms: 496, walkToUni: '10-minute Vita shuttle bus to the University of Warwick', walkToCentre: '5-minute walk to Coventry city centre', roomTypes: ['Lite', 'Classic', 'Premium', 'Deluxe', 'Ultimate'] },
  'Warwick Cannon Park': { address: 'Vita Student Cannon Park, DeMontfort Way, Coventry, CV4 7FA', floors: 5, rooms: 764, walkToUni: '4-minute walk to the University of Warwick', walkToCentre: '20-minute bus to Coventry city centre', roomTypes: ['Lite', 'Classic', 'Premium', 'Deluxe', 'Ultimate', 'Shared'] },
  'New Waverley': { address: 'Vita Student New Waverley, No 14 Sibbald Walk, Edinburgh, EH8 8GG', floors: 7, rooms: 275, walkToUni: '10-minute walk to the University of Edinburgh', walkToCentre: '5-minute walk to Edinburgh city centre' },
  'Iona Street': { address: 'Vita Student Iona Street, 50 Iona Street, Edinburgh, EH6 8FN', floors: 4, rooms: 259, walkToUni: '20-minute bus to the University of Edinburgh', walkToCentre: '15-minute tram to Edinburgh city centre' },
  'Fountainbridge': { address: 'Vita Student Fountainbridge, 125a Fountainbridge, Tollcross, Edinburgh, EH3 9QG', floors: 9, rooms: 250, walkToUni: '15-minute walk to the University of Edinburgh', walkToCentre: '15-minute walk to Edinburgh city centre' },
  'Portland House': { address: 'Vita Student Portland House, Longbrook St, Exeter, EX4 6AH', floors: 7, rooms: 156, walkToUni: '15-minute walk to the University of Exeter', walkToCentre: '1-minute walk to Exeter city centre', roomTypes: ['Classic', 'Premium', 'Deluxe', 'Ultimate', 'Accessible'] },
  'West End': { address: 'Vita Student West End, 21 Beith Street, Glasgow, G11 6BZ', floors: 11, rooms: 501, walkToUni: '11-minute walk to the University of Glasgow', walkToCentre: '8-minute train to Glasgow city centre', roomTypes: ['Classic', 'Premium', 'Deluxe', 'Accessible', 'Shared'] },
  'Portland Crescent': { address: 'Vita Student Leeds Portland Crescent, 93 Portland Crescent, Leeds, LS1 3AY', floors: 16, rooms: 308, walkToUni: '5-minute walk to the University of Leeds', walkToCentre: '6-minute walk to Leeds city centre' },
  'St Albans': { address: 'Vita Student St Albans, St Albans Place, Cross Belgrave Street, Leeds, LS2 8JP', floors: 18, rooms: 376, walkToUni: '14-minute walk to the University of Leeds', walkToCentre: '8-minute walk to Leeds city centre' },
  'Crosshall St.': { address: 'Vita Student Crosshall Street, 5-7 Crosshall Street, Liverpool, L1 6DQ', floors: 6, rooms: 358, walkToUni: '15-minute walk to the University of Liverpool', walkToCentre: '8-minute walk to Liverpool city centre' },
  'Lewisham Exchange': { address: 'Exchange Point, Loampit Vale, London, SE13 7NX', floors: 35, rooms: 758, walkToUni: '13-minute bus to Goldsmiths University', walkToCentre: '30-second walk to London Lewisham DLR', roomTypes: ['Classic', 'Classic Plus', 'Premium', 'Deluxe', 'Ultimate', 'Cluster'] },
  'First Street': { address: 'Vita Student First Street, 13 Jack Rosenthal Street, Manchester, M15 4RB', floors: 10, rooms: 279, walkToUni: '13-minute walk to the University of Manchester', walkToCentre: '10-minute walk to Manchester city centre' },
  'Circle Square': { address: 'Vita Student Circle Square, 8 Nobel Way, just off Oxford Road, Manchester, M1 7FA', floors: 16, rooms: 1100, walkToUni: '10-minute walk to the University of Manchester', walkToCentre: '5-minute walk to Manchester city centre' },
  'Leazes Park': { address: 'Vita Student Leazes Park, Strawberry Place, Newcastle Upon Tyne, NE1 4DS', floors: 6, rooms: 260, walkToUni: '3-minute walk to Newcastle University', walkToCentre: '1-minute walk to Newcastle city centre' },
  'Westgate': { address: 'Vita Student Westgate, Westgate Road, Newcastle upon Tyne, NE1 1TT', floors: 7, rooms: 259, walkToUni: '12-minute walk to Newcastle University', walkToCentre: '6-minute walk to Newcastle city centre' },
  'Strawberry Place': { address: 'Vita Student Strawberry Place, Newcastle upon Tyne, NE1 4PQ', floors: 8, rooms: 332, walkToUni: '3-minute walk to Newcastle University', walkToCentre: '1-minute walk to Newcastle city centre' },
  'Station Street': { address: 'Vita Student Station Street, 23 Station Street, Nottingham, NG2 3EQ', floors: 8, rooms: 321, walkToUni: '16-minute tram to the University of Nottingham', walkToCentre: '5-minute walk to Nottingham city centre', roomTypes: ['Lite', 'Lite Plus', 'Classic', 'Classic Plus', 'Premium', 'Deluxe'] },
  'Telephone House': { address: 'Vita Student Telephone House, 40 Charter Square, Sheffield City Centre, Sheffield, S1 1BA', floors: 15, rooms: 366, walkToUni: '11-minute walk to the University of Sheffield', walkToCentre: '3-minute walk to Sheffield city centre', roomTypes: ['Classic', 'Premium', 'Deluxe', 'Ultimate', 'Accessible', 'Shared'] },
  'Richmond House': { address: 'Vita Student Richmond House, 3 Terminus Terrace, Southampton, SO14 3EU', floors: 11, rooms: 214, walkToUni: '12-minute walk to Southampton Solent University', walkToCentre: '10-minute walk to Southampton city centre', roomTypes: ['Classic', 'Premium', 'Deluxe', 'Accessible'] },
  'Lawrence Street': { address: 'Vita Student Lawrence Street, Lawrence Street, York, YO10 3FT', floors: 3, rooms: 644, walkToUni: '13-minute walk to the University of York', walkToCentre: '15-minute walk to York city centre' },
  'Poblenou': { address: 'Vita Student Poblenou, Carrer de Sancho de \u00c1vila, 2-10, 08018 Barcelona', floors: 12, rooms: 349, walkToUni: '10-minute walk to Pompeu Fabra University', walkToCentre: '26-minute walk to Barcelona city centre' },
  'Pedralbes': { address: 'Vita Student Pedralbes, Av Esplugues 102, 08034 Barcelona', floors: 5, rooms: 275, walkToUni: '5-minute walk to ESADE Business School', walkToCentre: '25-minute bus to Barcelona city centre', roomTypes: ['Lite 1', 'Lite 2', 'Lite Plus', 'Classic', 'Classic Plus', 'Classic Courtyard', 'Deluxe 1', 'Deluxe 2', 'Accessible'] },
  'Oria': { address: 'Vita Student Oria, C/ La Estrada, 3, Fuencarral-El Pardo, 28034 Madrid', floors: 15, rooms: 585, walkToUni: '5-minute shuttle bus to IE Tower', walkToCentre: '30-minute train to Madrid city centre' },
}

const iglu = [
  ['Broadway', 'Sydney'], ['Central', 'Sydney'], ['Central Park', 'Sydney'], ['Chatswood', 'Sydney'], ['Redfern', 'Sydney'],
  ['Mascot', 'Sydney'], ['Mascot Duo', 'Sydney'], ['Summer Hill', 'Sydney'], ['Waterloo', 'Sydney'],
  ['Brisbane City', 'Brisbane'], ['Kelvin Grove', 'Brisbane'], ['Melbourne City', 'Melbourne'], ['South Yarra', 'Melbourne'],
  ['Flagstaff Gardens', 'Melbourne'], ['Melbourne Central', 'Melbourne'], ['Flagstaff Station', 'Melbourne'],
] as const

const igluComingSoonNote = 'Opening January 2027; availability to be confirmed.'

type IgluPropertyDetail = {
  address: string
  rooms?: AccommodationRoomType[]
  availabilityNote?: string
}

/** Address and real per-room-type weekly "From $X/wk" rates, taken from each property's own Iglu page (or, where the page didn't load, Iglu's published room rates for that property). */
const igluDetails: Record<string, IgluPropertyDetail> = {
  Broadway: {
    address: '9 Kensington Street, Chippendale, NSW 2008',
    rooms: [
      { name: 'Single Bedroom \u2013 6 Share Apt', price: { value: 865, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 5 Share Apt', price: { value: 875, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 4 Share Apt', price: { value: 855, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Standard Studio Apartment', price: { value: 885, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Superior Studio Apartment', price: { value: 700, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 750, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  Central: {
    address: '1 Regent Street, Chippendale, NSW 2008',
    rooms: [
      { name: 'Single Bedroom \u2013 Share Bathroom', price: { value: 755, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 6 Share Apt', price: { value: 805, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 5 Share Apt', price: { value: 875, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Standard Studio Apartment', price: { value: 800, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  'Central Park': {
    address: '6 Central Park Avenue, Chippendale, NSW 2008',
    rooms: [
      { name: 'Single Bedroom \u2013 6 Share Apt', price: { value: 855, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 4 Share Apt', price: { value: 905, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' }, availabilityNote: 'Sold out on the provider\u2019s site at time of review.' },
      { name: 'Single Bedroom \u2013 3 Share Apt', price: { value: 925, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' }, availabilityNote: 'Sold out on the provider\u2019s site at time of review.' },
      { name: 'Standard Studio Apartment', price: { value: 925, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Superior Studio Apartment', price: { value: 1005, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 1045, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' }, availabilityNote: 'Wait list only on the provider\u2019s site at time of review.' },
    ],
  },
  Chatswood: {
    address: '73 Albert Avenue, Chatswood, NSW 2067',
    rooms: [
      { name: 'Single Bedroom \u2013 6 Share Apt', price: { value: 585, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 5 Share Apt', price: { value: 605, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 4 Share Apt', price: { value: 625, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Standard Studio Apartment', price: { value: 795, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Superior Studio Apartment', price: { value: 805, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 835, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  Redfern: {
    address: '66 Regent Street, Redfern, NSW 2016',
    rooms: [
      { name: 'Single Bedroom \u2013 6 Share Apt', price: { value: 745, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 5 Share Apt', price: { value: 755, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' }, availabilityNote: 'Sold out on the provider\u2019s site at time of review.' },
      { name: 'Single Bedroom \u2013 4 Share Apt', price: { value: 775, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Studio Apartment', price: { value: 865, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' }, availabilityNote: 'Sold out on the provider\u2019s site at time of review.' },
      { name: 'Standard Studio Apartment', price: { value: 885, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' }, availabilityNote: 'Wait list only on the provider\u2019s site at time of review.' },
      { name: 'Premium Studio Apartment', price: { value: 945, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  Mascot: {
    address: '8 John Street, Mascot, NSW 2020',
    rooms: [
      { name: 'Single Bedroom \u2013 6 Share Apt', price: { value: 685, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Single Bedroom \u2013 6 Share Apt', price: { value: 705, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Standard Studio Apartment', price: { value: 805, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 825, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  'Mascot Duo': {
    address: '13A Church Avenue, Mascot, NSW 2020',
    availabilityNote: igluComingSoonNote,
  },
  'Summer Hill': {
    address: '74 Carlton Crescent, Summer Hill, NSW 2130',
    rooms: [
      { name: 'Standard Studio Apartment', price: { value: 745, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 775, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  Waterloo: {
    address: '111 Botany Road, Waterloo, NSW 2017',
    rooms: [
      { name: 'Single Bedroom \u2013 2 Share Apt', price: { value: 705, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Standard Studio Apartment', price: { value: 835, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Superior Studio Apartment', price: { value: 855, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 885, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  'Brisbane City': {
    address: '65 Mary Street, Brisbane, QLD 4000',
    rooms: [
      { name: 'Single Bedroom \u2013 Share Bathroom', price: { value: 449, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 6 Share Apt', price: { value: 539, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 5 Share Apt', price: { value: 559, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Standard Studio Apartment', price: { value: 739, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 759, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  'Kelvin Grove': {
    address: '62 Blamey Street, Kelvin Grove, QLD 4059',
    rooms: [
      { name: 'Single Bedroom \u2013 6 Share Apt', price: { value: 399, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 5 Share Apt', price: { value: 399, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 3 Share Apt', price: { value: 449, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 2 Share Apt', price: { value: 479, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: '1 Bedroom Apartment', price: { value: 699, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  'Melbourne City': {
    address: '229 Franklin Street, Melbourne, VIC 3000',
    rooms: [
      { name: 'Single Bedroom \u2013 6 Share Apt', price: { value: 515, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 5 Share Apt', price: { value: 525, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Standard Studio Apartment', price: { value: 665, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 705, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  'South Yarra': {
    address: '8 Claremont Street, South Yarra, VIC 3141',
    rooms: [
      { name: 'Single Bedroom \u2013 6 Share Apt', price: { value: 555, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Single Bedroom \u2013 6 Share', price: { value: 575, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 5 Share Apt', price: { value: 565, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Single Bedroom \u2013 5 Share', price: { value: 585, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Studio Apartment', price: { value: 665, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Standard Studio Apartment', price: { value: 685, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 715, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  'Flagstaff Gardens': {
    address: '7 Batman Street, West Melbourne, VIC 3003',
  },
  'Melbourne Central': {
    address: '167 Little Lonsdale Street, Melbourne, VIC 3000',
    rooms: [
      { name: 'Standard Studio Apartment', price: { value: 635, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 665, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
    ],
  },
  'Flagstaff Station': {
    address: '356 William Street, Melbourne, VIC 3000',
    rooms: [
      { name: 'Standard Studio Apartment', price: { value: 665, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Studio Apartment', price: { value: 695, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Premium Corner Studio Apartment', price: { value: 735, currency: 'AUD', period: 'week', indicative: true, conditions: 'Starting weekly rate as published on Iglu\u2019s site; confirm current availability and exact rate with Iglu.' } },
      { name: 'Single Bedroom \u2013 2 Share Apt', price: { currency: 'AUD', period: 'week', priceOnEnquiry: true } },
    ],
  },
}

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
  ...neonWood.map(([name, city, sourceUrl]) => {
    const rooms = neonWoodRooms[name]
    const priceFrom = rooms?.length ? Math.min(...rooms.map((room) => room.price.value ?? Infinity).filter((value) => Number.isFinite(value))) : 0
    return makeProperty({
      slug: `neon-wood-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name,
      city,
      country: 'Germany',
      address: `Neon Wood ${name}, ${city}`,
      priceFrom,
      currency: 'EUR',
      pricePeriod: 'month',
      roomTypes: rooms?.map((room) => room.name) ?? ['Single room', 'Studio', 'Double room'],
      rooms,
      universities: cityUniversities[city] ?? [],
      distance: `Well connected to universities in ${city}`,
      partnerSlug: 'neon-wood',
      sourceUrl,
      categories: ['Private apartment', 'All-inclusive', 'Furnished'],
      amenities: ['Furnished apartment', 'Private bathroom', 'Kitchenette', 'High-speed Wi-Fi', 'Gym', 'Lounge', 'Study rooms', 'Cinema room'],
      highlights: ['All-inclusive pricing', 'Private kitchenette and bathroom', 'International student community'],
      gallery: images,
    })
  }),
  ...vitaStudent.map(([name, city]) => {
    const detail = vitaStudentDetails[name]
    return makeProperty({
      slug: `vita-student-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name,
      city,
      country: city === 'Barcelona' || city === 'Madrid' ? 'Spain' : 'UK',
      address: detail?.address ?? `${name}, ${city}`,
      priceFrom: 0,
      roomTypes: detail?.roomTypes ?? ['Classic', 'Premium', 'Deluxe'],
      rooms: (detail?.roomTypes ?? ['Classic', 'Premium', 'Deluxe']).map((roomName) => ({
        name: roomName,
        price: { currency: 'GBP' as const, period: 'week' as const, priceOnEnquiry: true },
      })),
      universities: cityUniversities[city] ?? [],
      distance: detail ? `${detail.walkToUni}; ${detail.walkToCentre}. ${detail.floors} floors, ${detail.rooms} rooms.` : `Central student location in ${city}`,
      partnerSlug: 'vita-student',
      sourceUrl: `${sourceByPartner['vita-student']}${city.toLowerCase()}/`,
      categories: ['Premium student residence', 'All-inclusive', 'Private room'],
      amenities: ['Bills included', '24/7 gym', 'Study spaces', 'Housekeeping', 'Events', 'High-speed Wi-Fi', '24/7 support'],
      highlights: ['All-in living', 'Central locations', 'Strong resident experience'],
      gallery: images,
      availabilityNote: detail?.availabilityNote,
    })
  }),
  ...iglu.map(([name, city]) => {
    const detail = igluDetails[name]
    const rooms = detail?.rooms
    const priceFrom = rooms?.length ? Math.min(...rooms.map((room) => room.price.value ?? Infinity).filter((value) => Number.isFinite(value))) : 0
    return makeProperty({
      slug: `iglu-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name,
      city,
      country: 'Australia',
      address: detail?.address ?? `${name}, ${city}`,
      priceFrom,
      currency: 'AUD',
      pricePeriod: 'week',
      roomTypes: rooms?.map((room) => room.name) ?? ['Studio', 'Ensuite', 'Shared apartment'],
      rooms,
      universities: cityUniversities[city] ?? [],
      distance: `Close to major universities and transport in ${city}`,
      partnerSlug: 'iglu',
      sourceUrl: 'https://iglu.com.au/compare-iglus/',
      categories: ['Student residence', 'Furnished', 'Purpose-built'],
      amenities: ['24/7 support', 'Study areas', 'Gym', 'Social spaces', 'Laundry', 'Bike storage', 'High-security access'],
      highlights: ['University-focused locations', 'Strong communal facilities', 'Public transport access'],
      gallery: images,
      availabilityNote: detail?.availabilityNote,
    })
  }),
]

