import propertyImageCatalog from './iglu-images.json'
import broadwayRoomImageCatalog from './iglu-room-images.json'
import propertyDetails from './iglu-property-details.json'
import publishedOffers from './iglu-offers.json'

export type IgluProperty = {
  id: string
  sourcePath: string
  slug: string
  name: string
  city: string
  country: string
  address: string
  description: string
  gallery: string[]
  amenities: string[]
  inclusions: string[]
  distance: string
  universities: string[]
  illustrativeImages?: boolean
}

export type IgluRoom = {
  id: string
  sourcePath: string
  parentPropertyId: string
  name: string
  image: string | null
  images: string[]
  floorplan: string | null
  features: string[]
  inclusions: string[]
  approximateArea: string
  priceFrom: number
  priceLabel: string
  priceConfidence: 'published' | 'indicative'
  available: number | null
  status: string
  minimumOccupancy: number
  maximumOccupancy: number
}

type PropertySourceRow = [string, string, string, string]
const propertyRows: PropertySourceRow[] = [
  ['18','sydney/broadway','Sydney','Broadway'],
  ['19','sydney/central','Sydney','Central'],
  ['20','sydney/central-park','Sydney','Central Park'],
  ['22','sydney/chatswood','Sydney','Chatswood'],
  ['45254','sydney/mascot','Sydney','Mascot'],
  ['119777','sydney/mascot-duo','Sydney','Mascot Duo'],
  ['21','sydney/redfern','Sydney','Redfern'],
  ['38740','sydney/summer-hill','Sydney','Summer Hill'],
  ['101749','sydney/waterloo','Sydney','Waterloo'],
  ['23','brisbane/brisbane-city','Brisbane','Brisbane City'],
  ['24','brisbane/kelvin-grove','Brisbane','Kelvin Grove'],
  ['43240','melbourne/flagstaff-gardens','Melbourne','Flagstaff Gardens'],
  ['114718','melbourne/flagstaff-station','Melbourne','Flagstaff Station'],
  ['59651','melbourne/melbourne-central','Melbourne','Melbourne Central'],
  ['25','melbourne/melbourne-city','Melbourne','Melbourne City'],
  ['14854','melbourne/south-yarra','Melbourne','South Yarra'],
]
const slugify = (value: string) => value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const imageFilesBySourceSlug = new Map(propertyImageCatalog.map((item) => [item.slug, item.assets]))
const detailByPropertySlug = propertyDetails as Record<string, {
  address: string; description: string; distance: string; universities: string[]; amenities: string[]; inclusions: string[]; illustrativeImages?: boolean
}>
const publishedOffersBySlug = publishedOffers as Record<string, Array<{ name: string; amount: number; status?: string }>>
const roomGalleryBySlug = new Map(broadwayRoomImageCatalog.map((item) => [item.slug, item.images]))

function getPropertyImages(propertySlug: string): Array<{ name: string; src: string }> {
  const files = imageFilesBySourceSlug.get(propertySlug.replace(/^sydney-|^brisbane-|^melbourne-/, '')) ?? []
  return files
    .filter((asset) => !/380x460|608x230|short-stay|scholarship|IgluCentralPark-(?:Gym|SpinClass)/i.test(asset.name))
    .map((asset) => ({ name: asset.name, src: asset.src }))
}

export const igluProperties: IgluProperty[] = propertyRows.map(([id, path, city, label]) => {
  const slug = slugify(`${city}-${label}`)
  const details = detailByPropertySlug[slug]
  const images = getPropertyImages(slug)
  const sourcePath = `/properties/${path}/`
  return {
    id, sourcePath, slug, name: `Iglu ${label}`, city, country: 'Australia',
    address: details.address, description: details.description,
    gallery: images.map((image) => image.src),
    amenities: details.amenities, inclusions: details.inclusions,
    distance: details.distance, universities: details.universities,
    illustrativeImages: details.illustrativeImages,
  }
})

const roomRows: Array<[string, string, string]> = [
  ['sydney-broadway','standard-studio-apartment-nras-br','Standard Studio Apartment (NRAS)'],
  ['sydney-broadway','single-bedroom-6-share-apt-br','Single Bedroom – 6 Share Apt'],
  ['sydney-broadway','single-bedroom-5-share-apt-br','Single Bedroom – 5 Share Apt'],
  ['sydney-broadway','single-bedroom-4-share-apt-br','Single Bedroom – 4 Share Apt'],
  ['sydney-broadway','standard-studio-apartment-br','Standard Studio Apartment'],
  ['sydney-broadway','superior-studio-apartment-br','Superior Studio Apartment'],
  ['sydney-broadway','premium-studio-apartment-br','Premium Studio Apartment'],
  ['sydney-central','sce-6-bedroom-share-bathroom-u18-female','U18 6 Bedroom Share Bathroom Female'],
  ['sydney-central','sce-6-bedroom-share-bathroom-u18-male','U18 6 Bedroom Share Bathroom Male'],
  ['sydney-central','sce-6-bedroom-u18-female','U18 6 Bedroom Female'],
  ['sydney-central','sce-6-bedroom-u18-male','U18 6 Bedroom Male'],
  ['sydney-central','sce-5-bedroom-u18-female','U18 5 Bedroom Female'],
  ['sydney-central','sce-5-bedroom-u18-male','U18 5 Bedroom Male'],
  ['sydney-central','sce-standard-studio-u18','U18 Standard Studio'],
  ['sydney-central','sce-2-bedroom-studio-u18-female','U18 2 Bedroom Studio Female'],
  ['sydney-central','sce-2-bedroom-studio-u18-male','U18 2 Bedroom Studio Male'],
  ['sydney-central','single-bedroom-share-bathroom-ce','Single Room, Share Bath – 6 Share'],
  ['sydney-central','single-bedroom-6-share-apt-ce','Single Bedroom – 6 Share Apt'],
  ['sydney-central','single-bedroom-5-share-apt-ce','Single Bedroom – 5 Share Apt'],
  ['sydney-central','standard-studio-apartment-ce','Standard Studio Apartment'],
  ['sydney-central','student-room-shared-bathroom','Single Bedroom – 2 Bedroom Studio'],
  ['sydney-central-park','standard-studio-apartment-cp','Standard Studio Apartment'],
  ['sydney-central-park','superior-studio-apartment-cp','Superior Studio Apartment'],
  ['sydney-central-park','premium-studio-apartment','Premium Studio Apartment'],
  ['sydney-central-park','single-bed-6-share-apt-usyd-saex','Central Park 6 Bedroom (USYD SAEX)'],
  ['sydney-central-park','premium-corner-studio-apartment-cp','Premium Corner Studio Apartment'],
  ['sydney-central-park','single-bedroom-6-share-apt-cp','Single Bedroom – 6 Share Apt'],
  ['sydney-central-park','premium-single-room-6-share-cp','Premium Single Room – 6 Share Apt'],
  ['sydney-central-park','single-bedroom-4-share-apt-cp','Single Bedroom – 4 Share Apt'],
  ['sydney-central-park','single-bedroom-3-share-apt-cp','Single Bedroom – 3 Share Apt'],
  ['sydney-chatswood','single-bedroom-6-share-apt-ch','Single Bedroom – 6 Share Apt'],
  ['sydney-chatswood','single-bed-6-share-apt-mqu-saex','Chatswood 6 Bedroom (MQU SAEX)'],
  ['sydney-chatswood','single-bedroom-5-share-apt-ch','Single Bedroom – 5 Share Apt'],
  ['sydney-chatswood','single-bedroom-4-share-apt-ch','Single Bedroom – 4 Share Apt'],
  ['sydney-chatswood','standard-studio-apartment-ch','Standard Studio Apartment'],
  ['sydney-chatswood','superior-studio-apartment-ch','Superior Studio Apartment'],
  ['sydney-chatswood','premium-studio-apartment-ch','Premium Studio Apartment'],
  ['sydney-mascot','single-bedroom-6-share-apt-ma','Single Bedroom – 6 Share Apt'],
  ['sydney-mascot','single-bed-6-share-apt-unsw-saex','Mascot 6 Bedroom (UNSW SAEX)'],
  ['sydney-mascot','premium-single-bedroom-6-share-ma','Premium Single Room – 6 Share'],
  ['sydney-mascot','standard-studio-apartment-ma','Standard Studio Apartment'],
  ['sydney-mascot','premium-studio-apartment-ma','Premium Studio Apartment'],
  ['sydney-mascot','standard-studio-apartment-queen','Standard Studio Apartment (Queen)'],
  ['sydney-mascot-duo','standard-studio-apartment-md','Standard Studio Apartment'],
  ['sydney-mascot-duo','superior-studio-apartment-md','Superior Studio Apartment'],
  ['sydney-mascot-duo','premium-studio-apartment-md','Premium Studio Apartment'],
  ['sydney-redfern','single-bed-6-share-apt-saex-sre','Iglu Redfern 6 Bedroom (USYD SAEX)'],
  ['sydney-redfern','single-bedroom-6-share-apt-re','Single Bedroom – 6 Share Apt'],
  ['sydney-redfern','single-bedroom-5-share-apt-re','Single Bedroom – 5 Share Apt'],
  ['sydney-redfern','single-bedroom-4-share-apt-re','Single Bedroom – 4 Share Apt'],
  ['sydney-redfern','single-studio-apartment-re','Single Studio Apartment'],
  ['sydney-redfern','standard-studio-apartment-re','Standard Studio Apartment'],
  ['sydney-redfern','premium-studio-apartment-re','Premium Studio Apartment'],
  ['sydney-redfern','single-bedroom-6-share-nras','Single Bedroom – 6 Share (NRAS)'],
  ['sydney-redfern','single-studio-apartment-nras','Single Studio Apartment (NRAS)'],
  ['sydney-redfern','standard-studio-apartment-nras','Standard Studio Apartment (NRAS)'],
  ['sydney-redfern','sre-6-bedroom-u18-female','U18 6 Bedroom Female'],
  ['sydney-redfern','sre-6-bedroom-u18-male','U18 6 Bedroom Male'],
  ['sydney-redfern','sre-4-bedroom-u18-male','U18 4 Bedroom Male'],
  ['sydney-redfern','sre-4-bedroom-u18-female','U18 4 Bedroom Female'],
  ['sydney-redfern','u18-standard-studio','U18 Standard Studio'],
  ['sydney-redfern','sre-premium-studio-u18','U18 Premium Studio'],
  ['sydney-summer-hill','standard-studio-apartment-sh','Standard Studio Apartment'],
  ['sydney-summer-hill','premium-studio-apartment-sh','Premium Studio Apartment'],
  ['sydney-waterloo','single-bedroom-2-share-apt-wa','Single Bedroom – 2 Share Apt'],
  ['sydney-waterloo','standard-studio-apartment-wa','Standard Studio Apartment'],
  ['sydney-waterloo','standard-studio-apartment-mqu-saex','Waterloo Standard Studio (MQU SAEX)'],
  ['sydney-waterloo','standard-studio-unsw-saex','Waterloo Standard Studio (UNSW SAEX)'],
  ['sydney-waterloo','superior-studio-apartment-wa','Superior Studio Apartment'],
  ['sydney-waterloo','premium-studio-apartment-wa','Premium Studio Apartment'],
  ['sydney-waterloo','premium-corner-studio-apartment-wa','Premium Corner Studio Apartment'],
  ['brisbane-brisbane-city','student-room-shared-bathroom-bc','Single Room, Share Bath – 6 Share'],
  ['brisbane-brisbane-city','single-bed-6-share-apt-uq-saex','Brisbane City 6 Bedroom (UQ SAEX)'],
  ['brisbane-brisbane-city','single-bedroom-6-share-apt-bc','Single Bedroom – 6 Share Apt'],
  ['brisbane-brisbane-city','single-bedroom-5-share-apt-bc','Single Bedroom – 5 Share Apt'],
  ['brisbane-brisbane-city','standard-studio-apartment-bc','Standard Studio Apartment'],
  ['brisbane-brisbane-city','premium-studio-apartment-bc','Premium Studio Apartment'],
  ['brisbane-kelvin-grove','single-bedroom-6-share-apt-kg','Single Bedroom – 6 Share Apt'],
  ['brisbane-kelvin-grove','single-bedroom-5-share-apt-kg','Single Bedroom – 5 Share Apt'],
  ['brisbane-kelvin-grove','single-bedroom-3-share-apt-kg','Single Bedroom – 3 Share Apt'],
  ['brisbane-kelvin-grove','single-bedroom-2-share-apt-kg','Single Bedroom – 2 Share Apt'],
  ['brisbane-kelvin-grove','1-bedroom-apartment-kg','1 Bedroom Apartment'],
  ['brisbane-kelvin-grove','bkg-5-bedroom-u18-female','U18 5 Bedroom Female'],
  ['brisbane-kelvin-grove','bkg-5-bedroom-u18-male','U18 5 Bedroom Male'],
  ['melbourne-flagstaff-gardens','single-studio-apartment','Single Studio Apartment'],
  ['melbourne-flagstaff-gardens','standard-studio-apartment-fg','Standard Studio Apartment'],
  ['melbourne-flagstaff-gardens','premium-studio-apartment-fg','Premium Studio Apartment'],
  ['melbourne-flagstaff-gardens','premium-corner-studio-apartment-fg','Premium Corner Studio Apartment'],
  ['melbourne-flagstaff-gardens','single-bedroom-2-share-apt-fg','Single Bedroom – 2 Share Apt'],
  ['melbourne-flagstaff-gardens','premium-single-bedroom-2-share-fg','Premium Single Bedroom – 2 Share'],
  ['melbourne-flagstaff-station','standard-studio-apartment-fs','Standard Studio Apartment'],
  ['melbourne-flagstaff-station','premium-studio-apartment-fs','Premium Studio Apartment'],
  ['melbourne-flagstaff-station','premium-studio-apartment-cnr-fs','Premium Corner Studio Apartment'],
  ['melbourne-flagstaff-station','single-bedroom-2-share-apt-fs','Single Bedroom – 2 Share Apt'],
  ['melbourne-melbourne-central','standard-studio-apartment-mce','Standard Studio Apartment'],
  ['melbourne-melbourne-central','premium-studio-apartment-mce','Premium Studio Apartment'],
  ['melbourne-melbourne-central','premium-studio-apartment-rmit-saex','Melbourne Central Premium Studio (RMIT SAEX)'],
  ['melbourne-melbourne-city','single-bedroom-6-share-apt-mc','Single Bedroom – 6 Share Apt'],
  ['melbourne-melbourne-city','single-bed-6-share-apt-rmit-saex','Melbourne City 6 Bed (RMIT SAEX)'],
  ['melbourne-melbourne-city','single-bed-6-share-apt-monash-saex','Melbourne City 6 Bed (Monash SAEX)'],
  ['melbourne-melbourne-city','single-bedroom-5-share-apt-mc','Single Bedroom – 5 Share Apt'],
  ['melbourne-melbourne-city','standard-studio-apartment-mc','Standard Studio Apartment'],
  ['melbourne-melbourne-city','premium-studio-apartment-mc','Premium Studio Apartment'],
  ['melbourne-melbourne-city','mce-6-bedroom-u18-female','U18 6 Bedroom Female'],
  ['melbourne-melbourne-city','mce-6-bedroom-u18-male','U18 6 Bedroom Male'],
  ['melbourne-melbourne-city','mce-5-bedroom-u18-female','U18 5 Bedroom Female'],
  ['melbourne-melbourne-city','mce-5-bedroom-u18-male','U18 5 Bedroom Male'],
  ['melbourne-melbourne-city','mce-standard-studio-u18','U18 Standard Studio'],
  ['melbourne-melbourne-city','mce-premium-studio-u18','U18 Premium Studio'],
  ['melbourne-south-yarra','premium-single-bedroom-6-share-apt-sy','Premium Single Bedroom – 6 Share'],
  ['melbourne-south-yarra','single-bedroom-6-share-apt-sy','Single Bedroom – 6 Share Apt'],
  ['melbourne-south-yarra','south-yarra-6-bed-monash-saex','South Yarra 6 Bed (Monash SAEX)'],
  ['melbourne-south-yarra','premium-single-bedroom-5-share-apt-sy','Premium Single Bedroom – 5 Share'],
  ['melbourne-south-yarra','single-bedroom-5-share-apt-sy','Single Bedroom – 5 Share Apt'],
  ['melbourne-south-yarra','single-studio-apartment-sy','Single Studio Apartment'],
  ['melbourne-south-yarra','standard-studio-apartment-sy','Standard Studio Apartment'],
  ['melbourne-south-yarra','premium-studio-apartment-sy','Premium Studio Apartment'],
]

const propertyBySlug = new Map(igluProperties.map((property) => [property.slug, property]))
const normalizeWords = (value: string) => value.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()

function getRoomAssets(property: IgluProperty, roomPath: string, name: string): { images: string[]; floorplan: string | null } {
  if (property.id === '18') {
    const roomAssets = roomGalleryBySlug.get(roomPath) ?? []
    const photos = roomAssets.filter((asset) => !asset.name.toLocaleLowerCase().endsWith('.png')).map((asset) => asset.src)
    const floorplan = name === 'Standard Studio Apartment' ? '/iglu/broadway/SBR-standard-studio.webp' : null
    if (photos.length) return { images: [...new Set(photos)], floorplan }
  }

  const assets = imageFilesBySourceSlug.get(property.sourcePath.split('/').filter(Boolean).slice(-1)[0]) ?? []
  const roomTiles = assets.filter((asset) => /380x460/i.test(asset.name))
  const tokens = normalizeWords(name).split(' ').filter((token) => token && !['iglu','apartment','apt','the','room','bedroom','single','female','male','nras','saex','u18'].includes(token))
  const scored = roomTiles.map((asset) => {
    const filename = normalizeWords(asset.name)
    let score = tokens.reduce((sum, token) => sum + (filename.includes(token) ? 2 : 0), 0)
    if (/studio/i.test(name) && /studio/i.test(filename)) score += 5
    if (/premium/i.test(name) && /premium|prem/i.test(filename)) score += 5
    if (/superior/i.test(name) && /superior/i.test(filename)) score += 5
    if (/corner/i.test(name) && /corner/i.test(filename)) score += 5
    const shareCount = name.match(/\b([1-6])\s*(?:bed(?:room)?|share)/i)?.[1]
    if (shareCount && filename.includes(shareCount)) score += 4
    if (/share/i.test(name) && /share|bed/i.test(filename)) score += 2
    return { asset, score }
  }).sort((a, b) => b.score - a.score)
  const selected = scored[0]?.asset
  return { images: selected ? [selected.src] : (property.gallery[0] ? [property.gallery[0]] : []), floorplan: null }
}

function inferredRoomFeatures(name: string, propertyId: string, roomPath: string): { features: string[]; approximateArea: string } {
  if (propertyId === '18') {
    if (roomPath.includes('share-apt')) {
      const features = ['Private bedroom for one resident', 'King single bed', 'Study desk, chair and lamp', 'Pin board and shelves', 'Built-in wardrobe, storage and full-length mirror', 'Air conditioning, acoustic windows and block-out blinds', 'Shared apartment living area with sofa and dining table', 'Full shared kitchen with oven, microwave, cooktop, refrigerator and freezer']
      return { features, approximateArea: 'Approximately 17 m² (bedroom)' }
    }
    const size = roomPath.includes('nras') ? 'Approximately 18–20 m²' : roomPath.includes('superior') ? 'Approximately 23 m²' : roomPath.includes('premium') ? 'Approximately 30 m²' : 'Approximately 19 m²'
    const bed = /superior|premium/i.test(roomPath) ? 'Double bed' : 'King single or double bed'
    const extra = roomPath.includes('nras') ? 'NRAS-supported room; eligibility criteria apply' : roomPath.includes('premium') ? 'Some rooms are accessible; allocation depends on availability' : null
    return { features: ['Private studio for one resident', bed, 'Private bathroom', 'Air conditioning and heating', 'Study desk, chair and lamp', 'Built-in wardrobe and full-length mirror', 'Kitchenette with sink, convection microwave, two-burner cooktop and refrigerator', 'Acoustic windows and block-out blinds', ...(extra ? [extra] : [])], approximateArea: size }
  }

  const share = /share|bed(?:room)?/i.test(name) && !/studio/i.test(name) && !/1 bedroom apartment/i.test(name)
  const sharedBathroom = /share bath/i.test(name)
  const n = name.match(/\b([1-6])\s*(?:bed(?:room)?|share)/i)?.[1]
  const features = share
    ? ['Private furnished bedroom for one resident', sharedBathroom ? 'Bathroom shared within the apartment' : 'Private bathroom', `Shared apartment with up to ${n ?? 'several'} bedrooms`, 'Shared kitchen and living area', 'Study desk and storage', 'Room configuration and furnishings vary by specific room']
    : ['Private furnished room for one resident', 'Private bathroom', 'Study and storage area', 'Kitchenette or apartment kitchen according to room type', 'Room configuration and furnishings vary by specific room']
  return { features, approximateArea: '' }
}

function findComparableOffer(propertySlug: string, roomName: string): { amount: number; exact: boolean; sourceStatus?: string } | null {
  const offers = publishedOffersBySlug[propertySlug] ?? []
  const exact = offers.find((offer) => offer.name === roomName)
  if (exact) return { amount: exact.amount, exact: true, sourceStatus: exact.status }

  const lower = roomName.toLocaleLowerCase()
  const shared = /share|bed(?:room)?/i.test(lower) && !/studio/i.test(lower) && !/1 bedroom apartment/i.test(lower)
  const targetCount = lower.match(/\b([1-6])\s*(?:bed(?:room)?|share)/i)?.[1]
  const targetStyle = /corner/.test(lower) ? 'corner' : /premium/.test(lower) ? 'premium' : /superior/.test(lower) ? 'superior' : /single studio/.test(lower) ? 'single' : /studio/.test(lower) ? 'standard' : ''
  const targetSharedBathroom = /share bath/.test(lower)
  const roomType = /studio/.test(lower) ? 'studio' : shared ? 'share' : /1 bedroom apartment/.test(lower) ? 'one-bedroom' : 'other'
  const score = (offer: { name: string }) => {
    const item = offer.name.toLocaleLowerCase()
    const itemType = /studio/.test(item) ? 'studio' : /share|bed(?:room)?/i.test(item) && !/1 bedroom apartment/i.test(item) ? 'share' : /1 bedroom apartment/i.test(item) ? 'one-bedroom' : 'other'
    let value = itemType === roomType ? 100 : 0
    const itemCount = item.match(/\b([1-6])\s*(?:bed(?:room)?|share)/i)?.[1]
    if (targetCount && itemCount) value += Math.max(0, 50 - Math.abs(Number(targetCount) - Number(itemCount)) * 15)
    if (targetStyle && item.includes(targetStyle)) value += 35
    if (targetSharedBathroom && /share bath/.test(item)) value += 25
    if (!targetSharedBathroom && /share bath/.test(item)) value -= 40
    if (/nras/.test(lower) && /nras/.test(item)) value += 10
    return value
  }
  const candidate = [...offers].sort((a, b) => score(b) - score(a))[0] ?? offers[0]
  return candidate ? { amount: candidate.amount, exact: false } : null
}

export const igluRooms: IgluRoom[] = roomRows.flatMap(([propertySlug, roomPath, name]) => {
  const property = propertyBySlug.get(propertySlug)
  if (!property) return []
  const visuals = getRoomAssets(property, roomPath, name)
  const roomInfo = inferredRoomFeatures(name, property.id, roomPath)
  const offer = findComparableOffer(property.slug, name)
  if (!offer) throw new Error(`Iglu room ${property.id}:${roomPath} has no published or comparable room rate`)
  const numericAvailability = offer.sourceStatus?.match(/about (\d+)/i)?.[1]
  const soldOut = /sold out/i.test(offer.sourceStatus ?? '')
  const status = offer.sourceStatus ?? 'Live availability has not been verified; confirm with HearthAway.'
  const images = visuals.images
  return [{
    id: `${property.id}:${roomPath}`,
    sourcePath: `/rooms/${property.sourcePath.split('/').slice(2, 4).join('/')}/${roomPath}/`,
    parentPropertyId: property.id,
    name,
    image: images[0] ?? property.gallery[0] ?? null,
    images,
    floorplan: visuals.floorplan,
    features: roomInfo.features,
    inclusions: ['Unlimited high-speed Wi-Fi', 'Furnished room', 'Access to property communal facilities'],
    approximateArea: roomInfo.approximateArea,
    priceFrom: offer.amount,
    priceLabel: `A$${offer.amount.toLocaleString('en-AU')} / week · ${offer.exact ? 'Iglu published' : 'indicative estimate'}`,
    priceConfidence: offer.exact ? 'published' : 'indicative',
    available: soldOut ? 0 : (numericAvailability ? Number(numericAvailability) : null),
    status,
    minimumOccupancy: 1,
    maximumOccupancy: /\bqueen\b/i.test(name) ? 2 : 1,
  }]
})

export function getIgluPropertyForRoom(room: IgluRoom): IgluProperty | undefined {
  return igluProperties.find((property) => property.id === room.parentPropertyId)
}
