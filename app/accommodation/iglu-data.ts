/**
 * Iglu's public catalogue is kept as separate Property and Room records.
 * Property IDs are the stable public CMS IDs. Room IDs use the stable public
 * room-page path because the page inventory exposes those consistently.
 * Room.parentPropertyId always points to a Property ID.
 *
 * Prices and availability are deliberately omitted: they change frequently.
 * Source-page paths are refresh metadata, never visitor-facing links.
 */
export type IgluProperty = {
  id: string
  sourcePath: string
  slug: string
  name: string
  city: string
  country: string
  address: string | null
  description: string
  gallery: string[]
  amenities: string[]
  inclusions: string[]
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
}

const sourceImage = (path: string) => `https://iglu.com.au/wp-content/uploads/${path}`

const propertyRows: Array<[string, string, string, string, string, string]> = [
  ['18','sydney/broadway','Sydney','Broadway','2017/06/iglu-broadway-study-spaces.jpg','Situated opposite UTS and close to Notre Dame and Sydney Uni, Iglu Broadway offers a central student location in Chippendale.'],
  ['19','sydney/central','Sydney','Central','2020/08/IgluCentralPark-Gym-1400x739.jpg','Iglu Central is a boutique Sydney student accommodation in Chippendale, surrounded by cafés, restaurants and city amenities.'],
  ['20','sydney/central-park','Sydney','Central Park','2019/08/scp-hero-5.jpg','Iglu Central Park offers a city-centre student community with distinctive architecture and access to Sydney campuses.'],
  ['22','sydney/chatswood','Sydney','Chatswood','2017/06/Chatswood-courtyard-edit.jpg','Iglu Chatswood offers student accommodation near local eateries, entertainment, shopping and public transport.'],
  ['45254','sydney/mascot','Sydney','Mascot','2022/12/iglu-mascot-hero-6-1400x739-1.jpg','Iglu Mascot is located near Mascot Station and offers private studios and shared apartments for students.'],
  ['119777','sydney/mascot-duo','Sydney','Mascot Duo','2026/06/Iglu-Mascot-Duo-Hero-1400x739-2.jpg','Iglu Mascot Duo offers studio accommodation in Sydney’s Mascot neighbourhood.'],
  ['21','sydney/redfern','Sydney','Redfern','2021/03/sre-hero-13.jpg','Iglu Redfern offers a student community in Sydney’s inner city, with public transport and campuses nearby.'],
  ['38740','sydney/summer-hill','Sydney','Summer Hill','2022/02/Iglu-Summer-Hill-Gym-2.jpg','Iglu Summer Hill offers student accommodation in Sydney’s Inner West, with public transport links.'],
  ['101749','sydney/waterloo','Sydney','Waterloo','2025/08/Iglu-Waterloo-Study-Area-2-1400x739-1.jpg','Iglu Waterloo is positioned beside the metro station, with convenient connections to Sydney campuses.'],
  ['23','brisbane/brisbane-city','Brisbane','Brisbane City','2024/05/Iglu-Brisbane-City-Hero-1400x739-08.jpg','Iglu Brisbane City is in the CBD near QUT Gardens Point and central Brisbane amenities.'],
  ['24','brisbane/kelvin-grove','Brisbane','Kelvin Grove','2017/06/Iglu-Kelvin-Grove-6.jpg','Iglu Kelvin Grove offers student accommodation near QUT’s Kelvin Grove campus.'],
  ['43240','melbourne/flagstaff-gardens','Melbourne','Flagstaff Gardens','2022/08/Flagstaff-King-St-2.jpg','Iglu Flagstaff Gardens is beside its namesake park, with access to Melbourne universities and public transport.'],
  ['114718','melbourne/flagstaff-station','Melbourne','Flagstaff Station','2026/09/Iglu-Flagstaff-Station-communal-1400x739-4.jpg','Iglu Flagstaff Station offers student accommodation near central Melbourne transport and campuses.'],
  ['59651','melbourne/melbourne-central','Melbourne','Melbourne Central','2023/09/Iglu-Melbourne-Central-1400x739-07.jpg','Iglu Melbourne Central is behind the State Library, within walking distance of RMIT and central Melbourne.'],
  ['25','melbourne/melbourne-city','Melbourne','Melbourne City','2021/03/IgluMelbourneCity-Chess-1400x739.jpg.jpg','Iglu Melbourne City places students close to universities, shops and central Melbourne amenities.'],
  ['14854','melbourne/south-yarra','Melbourne','South Yarra','2020/06/iglu-south-yarra-slider-11.jpg','Iglu South Yarra offers student accommodation near trains and the neighbourhood’s local amenities.'],
]

export const igluProperties: IgluProperty[] = propertyRows.map(([id, path, city, label, image, description]) => {
  const slug = `${city}-${label}`.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return {
    id,
    sourcePath: `/properties/${path}/`,
    slug,
    name: `Iglu ${label}`,
    city,
    country: 'Australia',
    address: id === '18' ? '9 Kensington Street, Chippendale NSW 2008, Australia' : null,
    description,
    gallery: [sourceImage(image)],
    amenities: id === '18' ? ['Study spaces', 'Communal kitchen', 'Games room', 'Gym', 'On-site resident support'] : [],
    inclusions: id === '18' ? ['Unlimited Wi-Fi', 'Utilities', 'Use of communal spaces', 'Resident events'] : [],
  }
})

// Property slug, source room-page slug, and displayed room name. The parent
// relation is derived from the containing group, not inferred from the name.
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
export const igluRooms: IgluRoom[] = roomRows.flatMap(([propertySlug, roomPath, name]) => {
  const property = propertyBySlug.get(propertySlug)
  if (!property) return []
  // Broadway's detailed room gallery was captured and hosted locally already.
  const broadwayImages = name === 'Standard Studio Apartment' && property.id === '18'
    ? [
      '/iglu/broadway/Broadway-Standard-810x1215-room-1.jpg',
      '/iglu/broadway/Broadway-Standard-810x1215-room-2.jpg',
      '/iglu/broadway/Broadway-Standard-810x1215-room-3.jpg',
      '/iglu/broadway/Broadway-Standard-810x1215-room-4.jpg',
      '/iglu/broadway/Broadway-Standard-810x1215-room-5.jpg',
      '/iglu/broadway/Broadway-Standard-810x1215-room-6.jpg',
    ]
    : []
  return [{
    id: `${property.id}:${roomPath}`,
    sourcePath: `/rooms/${property.sourcePath.split('/').slice(2, 4).join('/')}/${roomPath}/`,
    parentPropertyId: property.id,
    name,
    image: broadwayImages[0] ?? property.gallery[0] ?? null,
    images: broadwayImages.length ? broadwayImages : property.gallery,
    floorplan: property.id === '18' && broadwayImages.length ? '/iglu/broadway/SBR-standard-studio.webp' : null,
    features: broadwayImages.length ? [
      'Private studio for one resident', 'King single or double bed', 'Private bathroom',
      'Air conditioning and heating', 'Study desk, chair and lamp',
      'Kitchenette with sink, convection microwave, two-burner cooktop and refrigerator',
      'Approximately 19 m²',
    ] : [],
    inclusions: broadwayImages.length ? ['Unlimited high-speed Wi-Fi', 'Smart TV with Apple TV', 'Utilities and communal spaces'] : [],
    approximateArea: broadwayImages.length ? '19 m²' : '',
  }]
})

export function getIgluPropertyForRoom(room: IgluRoom): IgluProperty | undefined {
  return igluProperties.find((property) => property.id === room.parentPropertyId)
}
