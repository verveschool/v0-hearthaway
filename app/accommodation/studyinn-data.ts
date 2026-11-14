import imageProvenance from '../../docs/studyinn-image-provenance.json'
import type {
  AccommodationListingRecord,
  AccommodationPricingOption,
  AccommodationRoomRecord,
} from './listing-data'

type StudyInnAsset = {
  sourceUrl: string
  localPath: string
  sourceFilename: string
  assetType: string
  altText: string
  sourcePage: string | null
}

type RoomSeed = {
  name: string
  price2026: number | null
  price2027: number | null
  format: 'serviced-apartment' | 'studio'
  soldOut2026?: boolean
  soldOut2027?: boolean
  sourcePublishedBeds?: number | null
  contracts2026?: number[]
  contracts2027?: number[]
  sourceUrl?: string
  sourceNote?: string
}

type PropertySeed = {
  slug: string
  city: string
  name: string
  propertyUrl: string
  address: string | null
  postcode: string | null
  description: string
  distance: string | null
  universities: string[]
  amenities: string[]
  inclusions: string[]
  contractTerms: string[]
  policies: string[]
  transportConnections: string[]
  landmarks: string[]
  locationInfo: string[]
  apartmentRoomRange?: string
  dataNotes?: string[]
  rooms: RoomSeed[]
}

const STUDENT_OFFERS_URL = 'https://studyinn.com/student-offers/'
const NEXT_YEAR_URL = 'https://studyinn.com/next-year-stays/'
const CURRENT_YEAR_URL = 'https://studyinn.com/current-year-stays/'
const CAPTURED_AT = '2026-11-14'

const assets = imageProvenance.assets as StudyInnAsset[]

function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function getUrlFallbackKey(sourceUrl: string): string {
  const url = new URL(sourceUrl)
  return `study-inn:${url.pathname.replace(/\/+$/, '')}`
}

function getRoomSourceUrl(propertyPath: string, propertySlug: string, roomName: string): string {
  const roomSlug = slugify(`${roomName} ${propertySlug.replace(/-/g, ' ')}`)
  return `https://studyinn.com/student-accommodation/${propertyPath}/${roomSlug}/?contract=next-year`
}

function imageLabel(asset: StudyInnAsset, propertyName: string, roomName?: string): string {
  const name = asset.sourceFilename.toLocaleLowerCase()
  if (asset.assetType === 'floorplan') {
    return roomName
      ? `Illustrative 3D floorplan for ${roomName} at ${propertyName}`
      : `Illustrative Study Inn floorplan for ${propertyName}`
  }
  if (name.includes('shared-kitchen') || name.includes('luxe-lounge')) {
    return `Shared kitchen and lounge at ${propertyName}`
  }
  if (name.includes('gym')) return `Gym at ${propertyName}`
  if (name.includes('spa') || name.includes('hot-bed')) return `Wellness spa at ${propertyName}`
  if (name.includes('bowling')) return `Bowling lanes at ${propertyName}`
  if (name.includes('cinema')) return `Cinema room at ${propertyName}`
  if (name.includes('study')) return `Study space at ${propertyName}`
  if (name.includes('yoga')) return `Yoga room at ${propertyName}`
  if (name.includes('garden') || name.includes('outdoor')) return `Outdoor space at ${propertyName}`
  if (name.includes('bathroom')) return `${roomName ?? 'Room'} bathroom at ${propertyName}`
  if (roomName) return `${roomName} room at ${propertyName}`
  return asset.altText === 'Study Inn property exterior'
    ? `${propertyName} exterior`
    : `${asset.altText} at ${propertyName}`
}

function distinctAssets(found: StudyInnAsset[]): StudyInnAsset[] {
  const unique = new Map<string, StudyInnAsset>()
  for (const asset of found) unique.set(asset.localPath, asset)
  return [...unique.values()]
}

function getPropertyAssets(propertyUrl: string): StudyInnAsset[] {
  return distinctAssets(assets.filter((asset) => asset.sourcePage === propertyUrl && asset.assetType === 'photo'))
}

function getRoomAssets(
  property: PropertySeed,
  room: RoomSeed,
  roomUrl: string,
): StudyInnAsset[] {
  const direct = assets.filter((asset) => asset.sourcePage === roomUrl && asset.assetType === 'photo')
  const filenameIdentified = property.slug === 'walnut-gardens' && /Platinum En-suite/i.test(room.name)
    ? assets.filter((asset) => asset.assetType === 'photo' && asset.sourcePage === null && /platinum-apartment-exeter/i.test(asset.sourceFilename))
    : []
  // Other unattributed media remains in the provenance inventory rather than
  // being guessed onto a property or room category.
  return distinctAssets([...direct, ...filenameIdentified])
}

function getRoomPlans(property: PropertySeed, room: RoomSeed, roomUrl: string): Array<{ asset: StudyInnAsset; label: string }> {
  const tier = room.name.match(/Sapphire Plus|Diamond Plus|Platinum Plus|Gold Plus|Silver Plus|Sapphire|Diamond|Platinum|Gold|Silver/i)?.[0]
  const expectedFormat = room.format === 'studio' ? 'studio' : 'apartment'
  const propertyToken = property.slug === 'brotherton-house' ? 'leeds'
    : property.slug === 'reynard-house' ? 'leicester'
      : property.slug === 'triumph-house' ? 'triumph-house'
        : property.slug === 'lemyngton-street' ? 'loughborough'
          : property.slug === 'walnut-gardens' ? 'exeter'
            : null
  const plans = assets.filter((asset) => {
    if (asset.assetType !== 'floorplan') return false
    const name = asset.sourceFilename.toLocaleLowerCase().replace(/damond/g, 'diamond').replace(/[^a-z0-9]+/g, ' ')
    if (name.includes('shared kitchen')) {
      return room.format === 'serviced-apartment'
        && property.slug === 'lemyngton-street'
        && asset.sourceFilename === 'INT_Loughborough_Floorplan_Shared-Kitchen.jpg.webp'
    }
    if (!tier || !new RegExp(`\\b${tier.toLocaleLowerCase().replace(' ', '\\s+')}\\b`).test(name)) return false
    if (!new RegExp(`\\b${expectedFormat}\\b`).test(name)) return false
    const propertyMatches = propertyToken ? name.includes(propertyToken.replace('-', ' ')) : false
    if (propertyMatches) return true
    // The non-location-specific INT plans are used for the matching public
    // room formats at Talbot Street; other layouts need a property identifier.
    if (['talbot-street', 'walnut-gardens'].includes(property.slug) && name.includes('int floorplan') && !/exeter|leicester|leeds|loughborough|triumph/.test(name)) return true
    if (asset.sourcePage === roomUrl) return true
    return false
  })
  const selected = distinctAssets(plans)
  return selected.map((asset) => ({
    asset,
    label: asset.sourceFilename.toLocaleLowerCase().includes('shared-kitchen')
      ? 'Shared Luxe Lounge kitchen floorplan (illustrative)'
      : `${room.name} 3D floorplan (illustrative)`,
  }))
}

function annualOption(
  academicYear: string,
  amount: number | null,
  sourceUrl: string,
  status: string | null,
  contractDurationWeeks: number[] = [],
  note?: string,
): AccommodationPricingOption[] {
  const contracts = contractDurationWeeks.length ? contractDurationWeeks : [null]
  return contracts.map((duration) => ({
    academicYear,
    amount,
    currency: 'GBP',
    billingPeriod: 'week',
    contractDurationWeeks: duration,
    offerType: 'standard',
    status,
    sourceUrl,
    ...(note ? { note } : {}),
  }))
}

function offerOption(
  amount: number | null,
  sourceUrl: string,
  contractDurationWeeks: number | null,
  note: string,
  offerType: 'semester' | 'promotional' = 'promotional',
): AccommodationPricingOption {
  return {
    academicYear: '2026/27',
    amount,
    currency: 'GBP',
    billingPeriod: 'week',
    contractDurationWeeks,
    offerType,
    status: 'Published offer; eligibility and terms apply',
    sourceUrl,
    note,
  }
}

const offerPrices: Record<string, Array<{ amount: number; weeks: number; note: string }>> = {
  'brotherton-house|Platinum En-suite Serviced Apartment': [
    { amount: 174, weeks: 44, note: 'Published 44-week offer rate.' },
    { amount: 169, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
  'brotherton-house|Platinum Plus En-suite Serviced Apartment': [
    { amount: 185, weeks: 44, note: 'Published 44-week offer rate.' },
    { amount: 180, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
  'brotherton-house|Sapphire En-suite Serviced Apartment': [
    { amount: 220, weeks: 44, note: 'Published 44-week offer rate.' },
    { amount: 215, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
  'brotherton-house|Sapphire Plus En-suite Serviced Apartment': [
    { amount: 220, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
  'brotherton-house|Sapphire Studio': [
    { amount: 275, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
  'talbot-street|Silver En-suite Serviced Apartment': [
    { amount: 165, weeks: 44, note: 'Published 44-week offer rate; source calls this a Silver apartment.' },
  ],
  'talbot-street|Silver Studio': [
    { amount: 189, weeks: 44, note: 'Published 44-week offer rate.' },
    { amount: 179, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
  'talbot-street|Gold Studio': [
    { amount: 219, weeks: 44, note: 'Published 44-week offer rate.' },
    { amount: 209, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
  'talbot-street|Gold Plus Studio': [
    { amount: 224, weeks: 44, note: 'Published 44-week offer rate.' },
    { amount: 214, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
  'triumph-house|Platinum En-suite Serviced Apartment': [
    { amount: 225, weeks: 44, note: 'Published 44-week offer rate.' },
    { amount: 215, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
  'triumph-house|Platinum Studio': [
    { amount: 279, weeks: 44, note: 'Published 44-week offer rate.' },
    { amount: 269, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
  'reynard-house|Gold En-suite Serviced Apartment': [
    { amount: 183, weeks: 44, note: 'Published 44-week offer rate.' },
  ],
  'reynard-house|Platinum Studio': [
    { amount: 223, weeks: 44, note: 'Published 44-week offer rate.' },
  ],
  'reynard-house|Platinum En-suite Serviced Apartment': [
    { amount: 179, weeks: 51, note: 'Published reduced-room offer rate.' },
  ],
}

const semesterOffers: Record<string, { amount: number; note: string }> = {
  'brotherton-house|Platinum En-suite Serviced Apartment': {
    amount: 215,
    note: 'Semester rate published for September 2026 through 1 January 2027; exact start day is not stated on the offers page.',
  },
  'talbot-street|Gold Studio': {
    amount: 250,
    note: 'Semester rate published for September 2026 through the end of December 2026; exact dates are not stated on the offers page.',
  },
  'walnut-gardens|Gold Studio': {
    amount: 269,
    note: 'Published semester 2 dates: 4 January 2027 through 28 August 2027.',
  },
}

function roomDescription(property: PropertySeed, room: RoomSeed): string {
  if (property.slug === 'marlborough-house') {
    return room.format === 'studio'
      ? 'A self-contained serviced studio at Marlborough House. The University of Bristol lists weekly fees and academic-year contract lengths; exact room dimensions are not published in the room guide.'
      : `A ${room.name.replace('Serviced En Suite — ', '').toLocaleLowerCase()} serviced en-suite room at Marlborough House. The University of Bristol describes private en-suite rooms in shared flats of up to eight rooms. Exact room dimensions are not published in the room guide.`
  }
  return room.format === 'studio'
    ? `${room.name} is a self-contained student studio at ${property.name}, with a private en-suite bathroom and fitted kitchenette. The source says room sizes and layouts may vary; published photos and 3D plans are illustrative.`
    : `${room.name} is a private en-suite bedroom in a serviced apartment at ${property.name}${property.apartmentRoomRange ? `, where apartments contain ${property.apartmentRoomRange} en-suite rooms` : ''}. Residents share the apartment's Luxe Lounge kitchen and living area. The source says room sizes and layouts may vary; published photos and 3D plans are illustrative.`
}

function roomConfiguration(property: PropertySeed, room: RoomSeed): string {
  return room.format === 'studio'
    ? 'Self-contained studio with private en-suite bathroom and kitchenette.'
    : `Private en-suite bedroom in a shared serviced apartment${property.apartmentRoomRange ? ` with ${property.apartmentRoomRange} en-suite rooms per apartment` : ''}, sharing a Luxe Lounge kitchen and living area.`
}

function getRoomFeatureFields(property: PropertySeed, room: RoomSeed) {
  const isStudio = room.format === 'studio'
  const bedroomFeatures = [
    'Bed and bedding essentials',
    'Study desk and chair',
    'Smart TV',
    'Superfast Wi-Fi',
    'Regular room cleaning and linen service',
  ]
  const bathroomFeatures = ['Private en-suite bathroom', 'Shower, toilet and wash basin']
  const kitchenFeatures = isStudio
    ? ['Private fitted kitchenette', 'Fridge/freezer', 'Hob and oven', 'Kettle and toaster', 'Pots, pans, utensils, crockery and cutlery']
    : ['Shared fully equipped Luxe Lounge kitchen', 'Private fridge/freezer and lockable cupboard for each resident', 'Hob and oven', 'Dishwasher', 'Kettle, toaster, blender and rice cooker', 'Drinks cooler and breakfast bar', 'Shared dining and living area']
  const furnishings = ['Bed', 'Wardrobe', 'Study desk and chair', 'Lighting', 'Curtains or blinds']
  const appliances = isStudio
    ? ['Fridge/freezer', 'Hob and oven', 'Kettle and toaster', 'Rice cooker']
    : ['Fridge/freezer', 'Hob and oven', 'Dishwasher', 'Kettle and toaster', 'Blender', 'Rice cooker']
  const storage = isStudio
    ? ['Wardrobe', 'Kitchen storage']
    : ['Wardrobe', 'Private lockable kitchen cupboard']
  const studyFacilities = ['In-room desk and chair', ...property.amenities.filter((item) => /study room|study area/i.test(item))]
  return { bedroomFeatures, bathroomFeatures, kitchenFeatures, furnishings, appliances, storage, studyFacilities }
}

function createRoom(property: PropertySeed, room: RoomSeed): AccommodationRoomRecord {
  const propertyPath = property.propertyUrl.split('/student-accommodation/')[1]?.replace(/\/$/, '') ?? ''
  const roomUrl = room.sourceUrl ?? getRoomSourceUrl(propertyPath, property.slug, room.name)
  const photoAssets = getRoomAssets(property, room, roomUrl.split('?')[0])
  const plans = getRoomPlans(property, room, roomUrl.split('?')[0])
  const imageLabels = Object.fromEntries(photoAssets.map((asset) => [asset.localPath, imageLabel(asset, property.name, room.name)]))
  const annual2026 = annualOption(
    '2026/27',
    room.price2026,
    room.sourceUrl === 'https://www.bristol.ac.uk/accommodation/about/residences/marlborough-house/' ? room.sourceUrl : CURRENT_YEAR_URL,
    room.soldOut2026
      ? 'Sold out on the official listing at the 14 November 2026 capture; live inventory is not otherwise exposed.'
      : room.price2026 !== null
        ? 'Published weekly rate; no live room count supplied.'
        : property.slug === 'frederick-road'
          ? 'Not applicable before the property opens in September 2027.'
          : property.slug === 'marlborough-house'
            ? 'Rate published by the University of Bristol for the 2026/27 tenancy year.'
            : 'No 2026/27 rate was visible on the official property listing at capture.',
    room.contracts2026 ?? [],
    room.sourceNote,
  )
  const annual2027 = annualOption(
    '2027/28',
    room.price2027,
    NEXT_YEAR_URL,
    room.soldOut2027
      ? 'Sold out on the official 2027/28 listing at the 14 November 2026 capture; live inventory is not otherwise exposed.'
      : room.price2027 !== null
        ? 'Published weekly starting rate; live room count and current availability are not supplied.'
        : 'No published 2027/28 weekly rate found in the official sources reviewed.',
    room.contracts2027 ?? [],
  )
  const offerKey = `${property.slug}|${room.name}`
  const promoted = (offerPrices[offerKey] ?? []).map((offer) => offerOption(
    offer.amount,
    STUDENT_OFFERS_URL,
    offer.weeks,
    offer.note,
  ))
  const semester = semesterOffers[offerKey]
  if (semester) {
    promoted.push(offerOption(semester.amount, STUDENT_OFFERS_URL, null, semester.note, 'semester'))
  }
  if (!['marlborough-house', 'james-street', 'frederick-road'].includes(property.slug)) {
    promoted.push(offerOption(null, STUDENT_OFFERS_URL, null, 'A £100 rent discount was published for eligible 44- and 51-week 2026/27 agreements when the student signs on the same day as their viewing. Offer conditions apply.'))
  }
  const featureFields = getRoomFeatureFields(property, room)
  const features = [...new Set([
    ...featureFields.bedroomFeatures,
    ...featureFields.bathroomFeatures,
    ...featureFields.kitchenFeatures,
    ...featureFields.furnishings,
    ...featureFields.appliances,
    ...featureFields.storage,
    ...featureFields.studyFacilities,
  ])]
  const primaryAmount = room.price2027 ?? room.price2026
  const primaryYear = room.price2027 !== null ? '2027/28' : room.price2026 !== null ? '2026/27' : null
  const floorplans = plans.map(({ asset, label }) => ({ image: asset.localPath, label }))

  return {
    name: room.name,
    description: roomDescription(property, room),
    accommodationFormat: room.format === 'studio' ? 'Self-contained studio' : 'En-suite serviced apartment',
    configuration: roomConfiguration(property, room),
    image: photoAssets[0]?.localPath ?? null,
    images: photoAssets.map((asset) => asset.localPath),
    imageLabels,
    priceFrom: primaryAmount,
    pricePerNight: null,
    priceLabel: primaryAmount === null
      ? null
      : `£${primaryAmount.toFixed(Number.isInteger(primaryAmount) ? 0 : 2)}/week · ${primaryYear}`,
    available: null,
    status: room.soldOut2027
      ? 'Sold out on the official 2027/28 listing at capture; room count not published.'
      : room.soldOut2026
        ? '2026/27 listing marked sold out at capture; 2027/28 rate is shown where published.'
        : room.sourcePublishedBeds !== undefined
          ? `The University of Bristol guide lists ${room.sourcePublishedBeds} bedspaces; this is a published inventory figure, not live availability.`
          : null,
    minimumOccupancy: null,
    maximumOccupancy: null,
    academicYear: primaryYear,
    features,
    priceConfidence: primaryAmount === null ? null : 'published',
    floorplan: floorplans.find((plan) => !plan.label.toLocaleLowerCase().includes('shared'))?.image ?? floorplans[0]?.image ?? null,
    floorplans,
    floorplanNote: floorplans.length ? 'Study Inn states that photographs and 3D plans are illustrative and that room dimensions and layouts may vary.' : null,
    publishedAreaSqm: null,
    sourcePublishedBeds: room.sourcePublishedBeds ?? null,
    bedroomFeatures: featureFields.bedroomFeatures,
    bathroomFeatures: featureFields.bathroomFeatures,
    kitchenFeatures: featureFields.kitchenFeatures,
    furnishings: featureFields.furnishings,
    appliances: featureFields.appliances,
    storage: featureFields.storage,
    studyFacilities: featureFields.studyFacilities,
    pricingOptions: [...annual2026, ...annual2027, ...promoted],
    sourceUrl: roomUrl,
  }
}

const propertySeeds: PropertySeed[] = [
  {
    slug: 'brotherton-house', city: 'Leeds', name: 'Brotherton House',
    propertyUrl: 'https://studyinn.com/student-accommodation/leeds/brotherton-house/',
    address: '1 Grace Street, Leeds', postcode: 'LS1 2FN',
    description: 'City-centre student accommodation with en-suite serviced apartments and self-contained studios. Study Inn lists all-inclusive weekly rates, regular housekeeping, an on-site gym and wellness facilities, and short campus walks.',
    distance: 'The property page advertises a 2–10 minute walk to campus; room cards list University of Leeds at 11 minutes and Leeds Beckett University at 10 minutes.',
    universities: ['University of Leeds', 'Leeds Beckett University', 'University of Law'],
    amenities: ['On-site gym', 'Wellness spa with sauna and steam facilities', 'Yoga room', 'Bowling lanes', 'Cinema room', 'Entertainment area', 'Social spaces', 'Study rooms', 'Laundry facilities', 'Bike storage', '24/7 on-site team and CCTV', 'Secure key-card entry'],
    inclusions: ['All utility bills', 'Superfast Wi-Fi', 'Regular bedroom and shared-area housekeeping', 'Fresh towels and bed linen', 'Kitchen and bedding essentials', 'Postal service', 'Regular social events'],
    contractTerms: ['44-week contracts', '51-week contracts', 'Semester stays are published separately; dates and eligible room types vary.'],
    policies: ['No damage deposit or UK guarantor required, as stated by Study Inn.', 'All accommodation is non-smoking.', 'The 2026/27 same-day viewing offer was £100 off eligible 44- and 51-week agreements; terms apply.'],
    transportConnections: ['Walking access to Leeds city-centre campuses; property page also lists cycle and public-transport distances.'],
    landmarks: ['Leeds city centre'],
    locationInfo: ['Study Inn describes Brotherton House as city-centre accommodation.'],
    apartmentRoomRange: '5–8',
    rooms: [
      { name: 'Gold En-suite Serviced Apartment', price2026: null, price2027: 193, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Gold Plus En-suite Serviced Apartment', price2026: null, price2027: 198, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Platinum En-suite Serviced Apartment', price2026: null, price2027: 204, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Platinum Plus En-suite Serviced Apartment', price2026: null, price2027: 209, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Diamond En-suite Serviced Apartment', price2026: null, price2027: 213, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Sapphire En-suite Serviced Apartment', price2026: 215, price2027: 238, format: 'serviced-apartment' },
      { name: 'Sapphire Plus En-suite Serviced Apartment', price2026: 220, price2027: 243, format: 'serviced-apartment' },
      { name: 'Platinum Plus Studio', price2026: null, price2027: 275, format: 'studio', soldOut2026: true },
      { name: 'Diamond Plus Studio', price2026: null, price2027: 295, format: 'studio', soldOut2026: true },
      { name: 'Sapphire Studio', price2026: null, price2027: 315, format: 'studio', soldOut2026: true },
      { name: 'Sapphire Plus Studio', price2026: null, price2027: 330, format: 'studio', soldOut2026: true },
    ],
  },
  {
    slug: 'walnut-gardens', city: 'Exeter', name: 'Walnut Gardens',
    propertyUrl: 'https://studyinn.com/student-accommodation/exeter/walnut-gardens/',
    address: '1 Walnut Gardens, Exeter', postcode: 'EX4 4DH',
    description: 'All-inclusive student accommodation in Exeter with en-suite serviced apartments and studios, a gym and wellness spa, study spaces, social areas and housekeeping.',
    distance: 'Study Inn property copy gives differing University of Exeter travel times in its overview and location sections; the source advertises a 12-minute walk in the overview.',
    universities: ['University of Exeter'],
    amenities: ['On-site gym', 'Wellness spa', 'Yoga studio', 'Movie lounge', 'Entertainment area', 'Pool table', 'Social spaces', 'Study rooms', '24/7 security and CCTV', 'Secure key-card entry'],
    inclusions: ['All utility bills', 'Superfast Wi-Fi', 'Regular housekeeping', 'Fresh towels and bed linen', 'Kitchen and bedding essentials', 'Regular social events'],
    contractTerms: ['44-week and 51-week agreements are advertised generally; room-specific 2026/27 prices were not visible for the categories at capture.', 'Semester 2 Gold Studio offer: 4 January–28 August 2027.'],
    policies: ['No damage deposit or UK guarantor required, as stated by Study Inn.', 'All accommodation is non-smoking.', 'Study Inn states room dimensions and layouts may vary and published images and plans are illustrative.'],
    transportConnections: ['Walking access to the University of Exeter; official source contains inconsistent travel-time figures.'],
    landmarks: ['Exeter city centre'],
    locationInfo: ['Official Study Inn pages identify Walnut Gardens as an Exeter property. The offers page labels one 44-week Walnut Gardens offer as Nottingham; that offer is not mapped to this property because the city label conflicts.'],
    apartmentRoomRange: '5–6',
    dataNotes: ['A 44-week Platinum apartment offer of £249/week is attributed to “Walnut Gardens, Nottingham” on Study Inn’s offers page. The official property page places Walnut Gardens in Exeter, so the offer is recorded as an unresolved property-mapping conflict and excluded from room pricing.'],
    rooms: [
      { name: 'Platinum En-suite Serviced Apartment', price2026: null, price2027: 242, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Platinum Plus En-suite Serviced Apartment', price2026: null, price2027: 247, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Diamond En-suite Serviced Apartment', price2026: null, price2027: 254, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Gold Studio', price2026: null, price2027: 289, format: 'studio', soldOut2026: true },
      { name: 'Gold Plus Studio', price2026: null, price2027: 320, format: 'studio', soldOut2026: true },
      { name: 'Platinum Studio', price2026: null, price2027: 318, format: 'studio', soldOut2026: true },
      { name: 'Platinum Plus Studio', price2026: null, price2027: 326, format: 'studio', soldOut2026: true },
      { name: 'Diamond Studio', price2026: null, price2027: 331, format: 'studio', soldOut2026: true },
      { name: 'Sapphire Studio', price2026: null, price2027: 385, format: 'studio', soldOut2026: true },
      { name: 'Sapphire Plus Studio', price2026: null, price2027: 390, format: 'studio', soldOut2026: true },
    ],
  },
  {
    slug: 'talbot-street', city: 'Nottingham', name: 'Talbot Street',
    propertyUrl: 'https://studyinn.com/student-accommodation/nottingham/talbot-street/',
    address: 'Lambert House, 80 Talbot Street, Nottingham', postcode: 'NG1 5EN',
    description: 'Nottingham city-centre student accommodation with en-suite serviced apartments and studios. Study Inn highlights its location close to Nottingham Trent University, shared apartment lounges, wellness facilities, study rooms and social spaces.',
    distance: 'Nottingham Trent University is listed at 2 minutes; the University of Nottingham is listed at 11 minutes by public transport or 13 minutes by cycle.',
    universities: ['Nottingham Trent University', 'University of Nottingham'],
    amenities: ['On-site gym', 'Wellness spa', 'Big-screen cinema', 'Entertainment area', 'Yoga studio', 'Study rooms', 'Pool tables', 'Padel court planned; subject to approvals and construction', 'Social spaces', '24/7 security and CCTV', 'Secure key-card entry'],
    inclusions: ['All utility bills', 'Superfast Wi-Fi', 'Regular housekeeping', 'Fresh towels and bed linen', 'Kitchen and bedding essentials', 'Regular social events'],
    contractTerms: ['44-week and 51-week offers are published for selected room types.', 'Semester stays are published separately.'],
    policies: ['No damage deposit or UK guarantor required, as stated by Study Inn.', 'All accommodation is non-smoking.'],
    transportConnections: ['University of Nottingham: 11 minutes by public transport or 13 minutes by cycle, according to the property room cards.'],
    landmarks: ['Nottingham city centre', 'Nottingham Trent University City Campus'],
    locationInfo: ['The official property page places Talbot Street in Nottingham city centre.'],
    apartmentRoomRange: '4–11',
    rooms: [
      { name: 'Silver En-suite Serviced Apartment', price2026: null, price2027: 179, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Gold En-suite Serviced Apartment', price2026: 185, price2027: 189, format: 'serviced-apartment' },
      { name: 'Platinum En-suite Serviced Apartment', price2026: null, price2027: 199, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Diamond En-suite Serviced Apartment', price2026: null, price2027: 209, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Silver Studio', price2026: 179, price2027: 205, format: 'studio' },
      { name: 'Silver Plus Studio', price2026: 209, price2027: 210, format: 'studio' },
      { name: 'Gold Studio', price2026: 209, price2027: 220, format: 'studio' },
      { name: 'Gold Plus Studio', price2026: 214, price2027: 225, format: 'studio' },
      { name: 'Platinum Studio', price2026: null, price2027: 230, format: 'studio', soldOut2026: true },
      { name: 'Platinum Plus Studio', price2026: 229, price2027: 235, format: 'studio' },
      { name: 'Diamond Studio', price2026: 235, price2027: 240, format: 'studio' },
      { name: 'Sapphire Studio', price2026: null, price2027: 318, format: 'studio', soldOut2026: true },
    ],
  },
  {
    slug: 'triumph-house', city: 'Nottingham', name: 'Triumph House',
    propertyUrl: 'https://studyinn.com/student-accommodation/nottingham/triumph-house/',
    address: '3 Triumph Road, Lenton, Nottingham', postcode: 'NG7 2GA',
    description: 'Student accommodation on Triumph Road beside the University of Nottingham Jubilee Campus, with en-suite serviced apartments and studios, wellness and study facilities, and social space.',
    distance: 'The University of Nottingham is listed at approximately 2 minutes from the property.',
    universities: ['University of Nottingham', 'Nottingham Trent University'],
    amenities: ['On-site gym', 'Wellness spa', 'Study rooms', 'Entertainment area', 'Social Space 360', 'Pool tables', '24/7 security and CCTV', 'Secure key-card entry'],
    inclusions: ['All utility bills', 'Superfast Wi-Fi', 'Regular housekeeping', 'Fresh towels and bed linen', 'Kitchen and bedding essentials', 'Regular social events'],
    contractTerms: ['44-week and 51-week offers are published for selected room types.'],
    policies: ['No damage deposit or UK guarantor required, as stated by Study Inn.', 'All accommodation is non-smoking.', 'The advertised padel court is planned and subject to approvals and construction.'],
    transportConnections: ['Located on Triumph Road next to the University of Nottingham Jubilee Campus.'],
    landmarks: ['University of Nottingham Jubilee Campus', 'Lenton'],
    locationInfo: ['Property address and postcode are supported by a Companies House charge filing for the property-owning company.'],
    apartmentRoomRange: '5–10',
    rooms: [
      { name: 'Platinum En-suite Serviced Apartment', price2026: 215, price2027: 240, format: 'serviced-apartment' },
      { name: 'Platinum Plus En-suite Serviced Apartment', price2026: null, price2027: null, format: 'serviced-apartment', soldOut2026: true, soldOut2027: true },
      { name: 'Diamond En-suite Serviced Apartment', price2026: 239, price2027: null, format: 'serviced-apartment', soldOut2027: true },
      { name: 'Diamond Plus En-suite Serviced Apartment', price2026: null, price2027: 258, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Platinum Studio', price2026: null, price2027: 324, format: 'studio', soldOut2026: true },
      { name: 'Platinum Plus Studio', price2026: null, price2027: 328, format: 'studio', soldOut2026: true },
      { name: 'Diamond Studio', price2026: 354, price2027: 365, format: 'studio' },
    ],
  },
  {
    slug: 'reynard-house', city: 'Leicester', name: 'Reynard House',
    propertyUrl: 'https://studyinn.com/student-accommodation/leicester/reynard-house/',
    address: '37 Welford Road, Leicester', postcode: 'LE2 7AF',
    description: 'Leicester city-centre residence with en-suite serviced apartments and private studios, an on-site gym and wellness spa, 24/7 study rooms, entertainment space and an outdoor courtyard.',
    distance: 'Room cards list De Montfort University at 7 minutes and the University of Leicester at 13 minutes; the property page contains different travel-time figures elsewhere.',
    universities: ['De Montfort University', 'University of Leicester'],
    amenities: ['On-site gym', 'Wellness spa with sauna, steam room and rainforest shower', 'Entertainment area with pool, table tennis and arcade games', 'Outdoor courtyard', '24/7 study rooms', 'Bike storage', '24/7 on-site team and CCTV', 'Secure key-card entry'],
    inclusions: ['All utility bills', 'Superfast Wi-Fi', 'Regular housekeeping', 'Fresh towels and bed linen', 'Kitchen and bedding essentials', 'Postal service', 'Regular social events'],
    contractTerms: ['44-week and 51-week offers are published for selected room types.'],
    policies: ['No damage deposit or UK guarantor required, as stated by Study Inn.', 'All accommodation is non-smoking.'],
    transportConnections: ['Walking access to De Montfort University and the University of Leicester; published time figures vary between page sections.'],
    landmarks: ['Leicester city centre', 'Welford Road'],
    locationInfo: ['Official page identifies the property on Welford Road in Leicester.'],
    apartmentRoomRange: '5–12',
    rooms: [
      { name: 'Gold En-suite Serviced Apartment', price2026: 160, price2027: 181, format: 'serviced-apartment' },
      { name: 'Gold Plus En-suite Serviced Apartment', price2026: 183, price2027: 186, format: 'serviced-apartment' },
      { name: 'Platinum En-suite Serviced Apartment', price2026: 179, price2027: 191, format: 'serviced-apartment' },
      { name: 'Platinum Plus En-suite Serviced Apartment', price2026: 193, price2027: 196, format: 'serviced-apartment' },
      { name: 'Diamond En-suite Serviced Apartment', price2026: 208, price2027: 213, format: 'serviced-apartment' },
      { name: 'Gold Studio', price2026: 193, price2027: 196, format: 'studio' },
      { name: 'Gold Plus Studio', price2026: null, price2027: 206, format: 'studio', soldOut2026: true },
      { name: 'Platinum Studio', price2026: 213, price2027: 216, format: 'studio' },
      { name: 'Platinum Plus Studio', price2026: 218, price2027: 221, format: 'studio' },
      { name: 'Diamond Studio', price2026: null, price2027: 227, format: 'studio', soldOut2026: true },
      { name: 'Sapphire Studio', price2026: null, price2027: 305, format: 'studio', soldOut2026: true },
    ],
  },
  {
    slug: 'lemyngton-street', city: 'Loughborough', name: 'Lemyngton Street',
    propertyUrl: 'https://studyinn.com/student-accommodation/loughborough/lemyngton-street/',
    address: 'Lemyngton Street, Loughborough', postcode: null,
    description: 'All-inclusive Loughborough accommodation with en-suite serviced apartments and studios, a cinema room, gym and wellness spa, study rooms, social areas and housekeeping.',
    distance: 'Study Inn describes a 16-minute walk to the University; room cards also list the University at 15 minutes and Loughborough College at 10 minutes.',
    universities: ['Loughborough University', 'Loughborough College'],
    amenities: ['On-site gym', 'Wellness spa', 'Big-screen cinema', 'Entertainment area', 'Study rooms', 'Social spaces', 'Table tennis', 'Bike storage', '24/7 security and CCTV', 'Secure key-card entry'],
    inclusions: ['All utility bills', 'Superfast Wi-Fi', 'Regular housekeeping', 'Fresh towels and bed linen', 'Kitchen and bedding essentials', 'Postal service', 'Regular social events'],
    contractTerms: ['44-week and 51-week agreements are advertised generally; room-specific 2026/27 rates were sold out at capture.'],
    policies: ['No damage deposit or UK guarantor required, as stated by Study Inn.', 'All accommodation is non-smoking.'],
    transportConnections: ['Walking access to Loughborough University and Loughborough College.'],
    landmarks: ['Loughborough town centre'],
    locationInfo: ['Study Inn identifies the property on Lemyngton Street. Different authoritative documents use different building numbers/postcodes for the address; the street is retained and the number/postcode remain unresolved.'],
    apartmentRoomRange: '6–7',
    dataNotes: ['Address-number conflict: university/college accommodation material and Companies House filings give differing Lemyngton Street numbers and postcodes. Exact building number and postcode are left null pending a definitive property address.'],
    rooms: [
      { name: 'Gold En-suite Serviced Apartment', price2026: null, price2027: 199, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Platinum En-suite Serviced Apartment', price2026: null, price2027: 230, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Diamond En-suite Serviced Apartment', price2026: null, price2027: 241, format: 'serviced-apartment', soldOut2026: true },
      { name: 'Silver Studio', price2026: null, price2027: 238, format: 'studio', soldOut2026: true },
      { name: 'Silver Plus Studio', price2026: null, price2027: 243, format: 'studio', soldOut2026: true },
      { name: 'Gold Studio', price2026: null, price2027: 249, format: 'studio', soldOut2026: true },
      { name: 'Gold Plus Studio', price2026: null, price2027: 255, format: 'studio', soldOut2026: true },
      { name: 'Platinum Studio', price2026: null, price2027: 261, format: 'studio', soldOut2026: true },
      { name: 'Diamond Studio', price2026: null, price2027: 272, format: 'studio', soldOut2026: true },
    ],
  },
  {
    slug: 'marlborough-house', city: 'Bristol', name: 'Marlborough House',
    propertyUrl: 'https://studyinn.com/student-accommodation/bristol/marlborough-house/',
    address: 'Marlborough House, Marlborough Street, Bristol', postcode: 'BS1 3NX',
    description: 'A University of Bristol residence managed in partnership with Study Inn. The University publishes five room categories, 2026/27 weekly fees and 42- or 51-week contracts. Study Inn’s own Bristol page notes that the property is leased to the University.',
    distance: 'The University of Bristol residence guide lists a 20-minute walk to Clifton Campus and a 35-minute walk to Temple Quarter Campus. Study Inn’s page has a different general campus estimate.',
    universities: ['University of Bristol'],
    amenities: ['Common room', 'Study room', 'Sports facilities', 'Laundry room (additional cost)', 'Bike storage (insurance may cost extra)', 'Reception and parcel collection'],
    inclusions: ['Bedding and towels', 'Room cleaning every two weeks', 'Daily kitchen cleaning', 'Internet access'],
    contractTerms: ['42-week undergraduate contracts and 51-week contracts are published by the University of Bristol for 2026/27.'],
    policies: ['This property is leased to the University of Bristol; the University is the landlord.', 'Laundry has an additional cost. Bike storage insurance may cost extra.', 'Study Inn directs Bristol accommodation enquiries to the University.'],
    transportConnections: ['20-minute walk to Clifton Campus; 35-minute walk to Temple Quarter Campus.'],
    landmarks: ['Marlborough Street', 'Bristol city centre'],
    locationInfo: ['Room categories, fees, contract lengths and published bedspaces are taken from the University of Bristol residence page and guide. Bedspaces are not presented as live vacancies.'],
    apartmentRoomRange: 'up to 8',
    dataNotes: ['Study Inn’s property page does not expose individual room cards; the University of Bristol partner listing supplies the five public room categories and 2026/27 price/contract details. No 2027/28 rate was found.'],
    rooms: [
      { name: 'Serviced En Suite — Basic', price2026: 266, price2027: null, format: 'serviced-apartment', sourcePublishedBeds: 6, contracts2026: [51], sourceUrl: 'https://www.bristol.ac.uk/accommodation/about/residences/marlborough-house/', sourceNote: 'University of Bristol published rate and bedspace figure; bedspaces are not live availability.' },
      { name: 'Serviced En Suite — Standard', price2026: 274.75, price2027: null, format: 'serviced-apartment', sourcePublishedBeds: 118, contracts2026: [42, 51], sourceUrl: 'https://www.bristol.ac.uk/accommodation/about/residences/marlborough-house/', sourceNote: 'University of Bristol published undergraduate 42-week and postgraduate 51-week rate; bedspaces are not live availability.' },
      { name: 'Serviced En Suite — Standard Plus', price2026: 301, price2027: null, format: 'serviced-apartment', sourcePublishedBeds: 70, contracts2026: [42, 51], sourceUrl: 'https://www.bristol.ac.uk/accommodation/about/residences/marlborough-house/', sourceNote: 'University of Bristol published undergraduate 42-week and postgraduate 51-week rate; bedspaces are not live availability.' },
      { name: 'Serviced En Suite — Premium', price2026: 311.5, price2027: null, format: 'serviced-apartment', sourcePublishedBeds: 103, contracts2026: [42, 51], sourceUrl: 'https://www.bristol.ac.uk/accommodation/about/residences/marlborough-house/', sourceNote: 'University of Bristol published undergraduate 42-week and postgraduate 51-week rate; bedspaces are not live availability.' },
      { name: 'Serviced Studio — Standard', price2026: 339.5, price2027: null, format: 'studio', sourcePublishedBeds: 3, contracts2026: [51], sourceUrl: 'https://www.bristol.ac.uk/accommodation/about/residences/marlborough-house/', sourceNote: 'University of Bristol published 51-week postgraduate rate; bedspaces are not live availability.' },
    ],
  },
  {
    slug: 'frederick-road', city: 'Birmingham', name: 'Frederick Road',
    propertyUrl: 'https://studyinn.com/student-accommodation/birmingham/frederick-road/',
    address: '9 Frederick Road, Edgbaston, Birmingham', postcode: 'B15 1JD',
    description: 'Purpose-built student accommodation scheduled to open in September 2027, with en-suite serviced apartments and studios. Study Inn lists all-inclusive rates, a gym, zen garden, sauna pods, study rooms and an entertainment area. The building is under construction and published images are illustrative.',
    distance: 'Study Inn lists nearby access to University of Birmingham, Aston University and Birmingham City University South Campus; room pages give transport times for the University of Birmingham.',
    universities: ['University of Birmingham', 'Aston University', 'Birmingham City University, South Campus'],
    amenities: ['On-site gym', 'Zen garden with sauna pods, heated beds and showers', 'Entertainment area', 'Dedicated study rooms', 'Social events', 'Bike storage', '24/7 security and CCTV', 'Secure key-card entry'],
    inclusions: ['All utility bills', 'Superfast Wi-Fi', 'Regular housekeeping', 'Fresh towels and bed linen', 'Kitchen and bedding essentials', '24/7 on-site team'],
    contractTerms: ['Opening September 2027; 2027/28 prices are published by room category. No 2026/27 contract applies before opening.'],
    policies: ['No damage deposit or UK guarantor required, as stated by Study Inn.', 'All images are illustrative while the property is under construction.', 'All accommodation is non-smoking.'],
    transportConnections: ['University of Birmingham: Study Inn lists bus and train access; Birmingham New Street and direct train connections are mentioned on the property page.'],
    landmarks: ['Birmingham New Street', 'Bullring'],
    locationInfo: ['The official property page states an opening date of September 2027.'],
    rooms: [
      { name: 'Platinum En-suite Serviced Apartment', price2026: null, price2027: 227, format: 'serviced-apartment' },
      { name: 'Platinum Plus En-suite Serviced Apartment', price2026: null, price2027: 232, format: 'serviced-apartment' },
      { name: 'Platinum Studio', price2026: null, price2027: 268, format: 'studio' },
      { name: 'Platinum Plus Studio', price2026: null, price2027: 273, format: 'studio' },
      { name: 'Diamond Studio', price2026: null, price2027: 278, format: 'studio' },
      { name: 'Diamond Plus Studio', price2026: null, price2027: 283, format: 'studio' },
      { name: 'Sapphire Studio', price2026: null, price2027: 304, format: 'studio' },
    ],
  },
  {
    slug: 'james-street', city: 'York', name: 'James Street',
    propertyUrl: 'https://studyinn.com/student-accommodation/york/james-street/',
    address: 'James Street, York', postcode: null,
    description: 'A coming-soon Study Inn residence in central York. The official page describes planned private studios and en-suite apartments with social, wellbeing and study areas, but it does not publish room-category cards or prices. The building is under construction and images are illustrative.',
    distance: null,
    universities: ['University of York', 'York St John University'],
    amenities: ['Planned gym', 'Planned wellness spa', 'Planned entertainment area', 'Planned study areas', 'Planned social space'],
    inclusions: ['All-inclusive services are described generally; specific room inclusions are not yet published.'],
    contractTerms: [],
    policies: ['Coming soon; the building is under construction.', 'Official photos and videos are illustrative.'],
    transportConnections: ['The official page says the property will have access to York’s universities and city amenities; exact routes and travel times are not published.'],
    landmarks: ['York city centre'],
    locationInfo: ['The official page mentions private studios and en-suite apartments as broad formats but does not list individual room categories. No categories are counted until they are itemized.'],
    dataNotes: ['Exact street number, postcode, opening date, room-category names, 2027/28 rates, contract durations and live availability are not published on the official page reviewed.'],
    rooms: [],
  },
]

function makeProperty(seed: PropertySeed): AccommodationListingRecord {
  const propertyAssets = getPropertyAssets(seed.propertyUrl)
  const roomTypes = seed.rooms.map((room) => createRoom(seed, room))
  const roomPhotoAssets = roomTypes.flatMap((room) => room.images.map((image) => assets.find((asset) => asset.localPath === image)).filter((asset): asset is StudyInnAsset => Boolean(asset)))
  const propertyGalleryAssets = distinctAssets([...propertyAssets, ...roomPhotoAssets])
  const gallery = propertyGalleryAssets.map((asset) => asset.localPath)
  const galleryLabels = Object.fromEntries(propertyGalleryAssets.map((asset) => [
    asset.localPath,
    seed.slug === 'james-street'
      ? `Illustrative Study Inn facility or room visual for the James Street property, which is under construction`
      : imageLabel(asset, seed.name),
  ]))
  const coverAsset = propertyGalleryAssets.find((asset) => /exterior|building|property/i.test(asset.sourceFilename)) ?? propertyGalleryAssets[0]
  const buildingName = seed.slug === 'james-street' ? 'James Street (coming soon)' : seed.name
  return {
    provider: 'study-inn',
    key: getUrlFallbackKey(seed.propertyUrl),
    slug: `study-inn-${seed.slug}`,
    city: seed.city,
    country: 'United Kingdom',
    name: seed.name,
    buildings: [{ name: buildingName, address: seed.address, postcode: seed.postcode, unitsAvailable: null }],
    address: [seed.address, seed.postcode].filter(Boolean).join(', ') || null,
    description: seed.description,
    coverImage: coverAsset?.localPath ?? null,
    photoSourceUrl: seed.propertyUrl,
    gallery,
    galleryLabels,
    highlights: [...seed.amenities.slice(0, 5), ...seed.contractTerms],
    amenities: seed.amenities,
    facilities: seed.amenities,
    inclusions: seed.inclusions,
    roomFeatures: [...new Set(roomTypes.flatMap((room) => room.features ?? []))],
    contractTerms: seed.contractTerms,
    depositNote: seed.policies.find((policy) => /deposit|guarantor/i.test(policy)) ?? null,
    distance: seed.distance,
    universities: seed.universities,
    transportConnections: seed.transportConnections,
    landmarks: seed.landmarks,
    locationInfo: seed.locationInfo,
    policies: seed.policies,
    sourceUrl: seed.propertyUrl,
    dataNotes: seed.dataNotes,
    roomTypes,
  }
}

export const studyInnListings: AccommodationListingRecord[] = propertySeeds.map(makeProperty)

export const studyInnVerifiedInventory = propertySeeds.map((property) => ({
  propertySlug: `study-inn-${property.slug}`,
  sourceId: null,
  sourceKey: getUrlFallbackKey(property.propertyUrl),
  identityBasis: 'URL path fallback; no stable public Study Inn source ID was found in the reviewed page data.',
  propertyName: property.name,
  city: property.city,
  sourceUrl: property.propertyUrl,
  roomCategories: property.rooms.map((room) => ({
    name: room.name,
    sourceId: null,
    identityBasis: room.sourceUrl?.includes('bristol.ac.uk')
      ? 'No category-level source ID or URL is published; the University room listing is the verified category source, and the internal room slug is scoped to its parent property.'
      : 'No stable public room-category ID was found; internal room slug is scoped to the verified parent property and published category name.',
    sourceUrl: room.sourceUrl ?? getRoomSourceUrl(
      property.propertyUrl.split('/student-accommodation/')[1]?.replace(/\/$/, '') ?? '',
      property.slug,
      room.name,
    ),
  })),
  unresolved: property.dataNotes ?? [],
}))

export const studyInnAssetSummary = {
  captureDate: CAPTURED_AT,
  sourceReferences: imageProvenance.sourceReferenceCount,
  locallyHostedAssets: imageProvenance.uniqueLocalAssetCount,
  propertyGalleryImageCount: 105,
  roomPhotoSceneCount: 143,
  floorplanLinkCount: 65,
}
