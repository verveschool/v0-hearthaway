import response from './response.json'

type DataRecord = Record<string, unknown>

export type AccommodationFeedBuilding = Readonly<{
  name?: string
  address?: string
  postcode?: string
  unitsAvailable?: number
  description?: string
  externalLink?: string
}>

export type AccommodationFeedRoom = Readonly<{
  name: string
  image?: string
  priceFrom?: number
  available?: number
  academicYear?: string
}>

export type AccommodationFeedDevelopment = Readonly<{
  key: string
  name: string
  city: string
  country?: string
  brand?: string
  buildings: AccommodationFeedBuilding[]
  rooms: AccommodationFeedRoom[]
}>

function asRecord(value: unknown): DataRecord | undefined {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as DataRecord)
    : undefined
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function count(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? value
    : undefined
}

function safeWebUrl(value: unknown): string | undefined {
  const rawUrl = text(value)
  if (!rawUrl) return undefined

  try {
    const url = new URL(rawUrl)
    return url.protocol === 'https:' || url.protocol === 'http:' ? rawUrl : undefined
  } catch {
    return undefined
  }
}

function identityPart(value: string): string {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ')
}

function readBuildings(value: unknown): AccommodationFeedBuilding[] {
  if (!Array.isArray(value)) return []

  const buildings: AccommodationFeedBuilding[] = []
  const seen = new Set<string>()

  for (const item of value) {
    const record = asRecord(item)
    if (!record) continue

    const building: AccommodationFeedBuilding = {
      name: text(record.name),
      address: text(record.address),
      postcode: text(record.postcode),
      unitsAvailable: count(record.units_available),
      description: text(record.description),
      externalLink: safeWebUrl(record.external_link),
    }
    const identity = [building.name, building.address, building.postcode]
      .filter((part): part is string => Boolean(part))
      .map(identityPart)
      .join('|')

    if (!identity || seen.has(identity)) continue
    seen.add(identity)
    buildings.push(building)
  }

  return buildings
}

function readRooms(value: unknown): AccommodationFeedRoom[] {
  const record = asRecord(value)
  if (!record) return []

  const rooms: AccommodationFeedRoom[] = []
  const seenNames = new Set<string>()

  for (const [name, rawRoom] of Object.entries(record)) {
    const roomName = text(name)
    const room = asRecord(rawRoom)
    if (!roomName || !room) continue

    const identity = identityPart(roomName)
    if (seenNames.has(identity)) continue
    seenNames.add(identity)

    rooms.push({
      name: roomName,
      image: safeWebUrl(room.room_image),
      priceFrom: count(room.price_from),
      available: count(room.total_available),
      academicYear: text(room.academic_year),
    })
  }

  return rooms
}

function readDevelopments(): AccommodationFeedDevelopment[] {
  const root = asRecord(response)
  const cities = asRecord(root?.data)
  if (!cities) return []

  const developments: AccommodationFeedDevelopment[] = []
  const seen = new Set<string>()

  for (const [cityName, rawCity] of Object.entries(cities)) {
    const city = text(cityName)
    const cityRecord = asRecord(rawCity)
    if (!city || !cityRecord || !Array.isArray(cityRecord.developments)) continue

    for (const rawDevelopment of cityRecord.developments) {
      const development = asRecord(rawDevelopment)
      const name = text(development?.name)
      if (!development || !name) continue

      const buildings = readBuildings(development.buildings)
      const addressIdentity = buildings
        .map((building) => building.address)
        .filter((address): address is string => Boolean(address))
        .map(identityPart)
        .sort()
        .join('|')
      const id = text(development.id)
      const identity = [identityPart(city), identityPart(name), addressIdentity || identityPart(id ?? name)].join('::')
      if (seen.has(identity)) continue
      seen.add(identity)

      developments.push({
        key: identity,
        name,
        city,
        country: text(cityRecord.country),
        brand: text(development.brand),
        buildings,
        rooms: readRooms(development.unit_types),
      })
    }
  }

  return developments
}

export const accommodationFeedDevelopments = readDevelopments()
export const accommodationFeedCities = [...new Set(accommodationFeedDevelopments.map((development) => development.city))]
  .sort((first, second) => first.localeCompare(second))

export function formatFeedPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(price)
}

export function formatFeedCount(value: number): string {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(value)
}

export function formatFeedAddress(address: string): string {
  return address.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).join(', ')
}

export function getProviderLink(development: AccommodationFeedDevelopment): string | undefined {
  return development.buildings.find((building) => building.externalLink)?.externalLink
}

export function getDevelopmentDescription(development: AccommodationFeedDevelopment): string | undefined {
  return development.buildings.find((building) => building.description)?.description
}

export function getUniqueDevelopmentBuildings(development: AccommodationFeedDevelopment): AccommodationFeedBuilding[] {
  return development.buildings
}

export function getDevelopmentLocation(development: AccommodationFeedDevelopment): string | undefined {
  const building = development.buildings.find((candidate) => candidate.address || candidate.postcode)
  if (!building) return undefined
  return [building.address ? formatFeedAddress(building.address) : undefined, building.postcode]
    .filter(Boolean)
    .join(' · ')
}

export function getDevelopmentAvailability(development: AccommodationFeedDevelopment): number | undefined {
  const values = development.buildings
    .map((building) => building.unitsAvailable)
    .filter((value): value is number => value !== undefined)
  return values.length === 1 ? values[0] : undefined
}

export function getDevelopmentAvailableRoomCount(development: AccommodationFeedDevelopment): number | undefined {
  const values = development.rooms
    .map((room) => room.available)
    .filter((value): value is number => value !== undefined)
  return values.length ? values.reduce((sum, value) => sum + value, 0) : undefined
}

export function getDevelopmentStartingPrice(development: AccommodationFeedDevelopment): number | undefined {
  const values = development.rooms
    .map((room) => room.priceFrom)
    .filter((value): value is number => value !== undefined)
  return values.length ? Math.min(...values) : undefined
}

export function getDevelopmentExternalLinks(development: AccommodationFeedDevelopment): Array<{ building: string; href: string }> {
  const links = new Map<string, { building: string; href: string }>()
  for (const building of development.buildings) {
    if (!building.externalLink || links.has(building.externalLink)) continue
    links.set(building.externalLink, { building: building.name ?? development.name, href: building.externalLink })
  }
  return [...links.values()]
}

export function getDevelopmentBuildingIdentity(building: AccommodationFeedBuilding, index: number): string {
  return [building.name, building.address, building.postcode].filter(Boolean).join('::') || `building-${index}`
}

export function getAccommodationFeedDevelopmentCount(developments: readonly AccommodationFeedDevelopment[]): number {
  return developments.length
}

export function filterAccommodationDevelopments(city: string, developments: readonly AccommodationFeedDevelopment[]): AccommodationFeedDevelopment[] {
  return city ? developments.filter((development) => development.city === city) : [...developments]
}

export function getDevelopmentDetails(development: AccommodationFeedDevelopment): string[] {
  return development.buildings
    .map((building) => [building.address ? formatFeedAddress(building.address) : undefined, building.postcode]
      .filter(Boolean)
      .join(' · '))
    .filter((detail, index, details) => Boolean(detail) && details.indexOf(detail) === index)
}

export function getDevelopmentBrandLabel(development: AccommodationFeedDevelopment): string | undefined {
  return development.brand?.split(/[-_\s]+/).filter(Boolean).map((word) => `${word[0]?.toUpperCase() ?? ''}${word.slice(1)}`).join(' ')
}

export function getDevelopmentUnitAvailability(room: AccommodationFeedRoom): string {
  return room.available === undefined ? 'Availability not provided' : `${formatFeedCount(room.available)} available`
}

export function getDevelopmentRoomPrice(room: AccommodationFeedRoom): string {
  return room.priceFrom === undefined ? 'Price not provided' : `From ${formatFeedPrice(room.priceFrom)}`
}

export function getDevelopmentUnitYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getDevelopmentBuildingAvailability(building: AccommodationFeedBuilding): string | undefined {
  return building.unitsAvailable === undefined ? undefined : `${formatFeedCount(building.unitsAvailable)} units available`
}

export function getDevelopmentCountLabel(count: number): string {
  return `${formatFeedCount(count)} ${count === 1 ? 'property' : 'properties'}`
}

export function getRoomAvailabilityLabel(count: number): string {
  return `${formatFeedCount(count)} ${count === 1 ? 'room available' : 'rooms available'}`
}

export function getFeedRecordMessage(developments: readonly AccommodationFeedDevelopment[]): string {
  return developments.length ? 'Browse room types, availability and property details from the supplied feed.' : 'No accommodation records are available for this selection.'
}

export function getFeedCountryLabel(development: AccommodationFeedDevelopment): string | undefined {
  return development.country
}

export function getFeedBuildingName(building: AccommodationFeedBuilding, development: AccommodationFeedDevelopment): string {
  return building.name ?? development.name
}

export function getFeedRoomAlt(room: AccommodationFeedRoom, development: AccommodationFeedDevelopment): string {
  return `${room.name} room at ${development.name}`
}

export function getFeedPriceNotice(): string {
  return 'Prices are displayed as provided. Currency and billing period are not specified in this feed.'
}

export function getFeedAvailabilityNotice(): string {
  return 'Availability figures reflect the room counts supplied for each room type.'
}

export function getDevelopmentAddressLabel(building: AccommodationFeedBuilding): string | undefined {
  if (!building.address && !building.postcode) return undefined
  return [building.address ? formatFeedAddress(building.address) : undefined, building.postcode]
    .filter(Boolean)
    .join(' · ')
}

export function getDevelopmentMainImage(room: AccommodationFeedRoom): string | undefined {
  return room.image
}

export function getDevelopmentImageAlt(room: AccommodationFeedRoom, development: AccommodationFeedDevelopment): string {
  return `${room.name} room at ${development.name}`
}

export function getDevelopmentRoomCountLabel(count: number): string {
  return `${formatFeedCount(count)} room types`
}

export function getDevelopmentStartingPriceLabel(price: number): string {
  return `From ${formatFeedPrice(price)}`
}

export function getDevelopmentRoomAvailability(room: AccommodationFeedRoom): string {
  return room.available === undefined ? 'Availability not provided' : getRoomAvailabilityLabel(room.available)
}

export function getAccommodationCityOptionLabel(city: string): string {
  return city
}

export function getDevelopmentPropertyTitle(development: AccommodationFeedDevelopment): string {
  return development.name
}

export function getDevelopmentCityLabel(development: AccommodationFeedDevelopment): string {
  return development.country ? `${development.city}, ${development.country}` : development.city
}

export function getDevelopmentAvailabilitySummary(development: AccommodationFeedDevelopment): string | undefined {
  const available = getDevelopmentAvailableRoomCount(development)
  return available === undefined ? undefined : getRoomAvailabilityLabel(available)
}

export function getDevelopmentRoomTypes(development: AccommodationFeedDevelopment): AccommodationFeedRoom[] {
  return development.rooms
}

export function getDevelopmentRoomHeading(development: AccommodationFeedDevelopment): string {
  return development.rooms.length === 1 ? 'Room type' : 'Room types'
}

export function getDevelopmentBuildingHeading(development: AccommodationFeedDevelopment): string {
  return development.buildings.length === 1 ? 'Building details' : 'Building details'
}

export function getDevelopmentTitleKey(development: AccommodationFeedDevelopment): string {
  return development.key
}

export function getDevelopmentRoomKey(development: AccommodationFeedDevelopment, room: AccommodationFeedRoom): string {
  return `${development.key}::${room.name}`
}

export function getFeedUnitsAvailableLabel(value: number): string {
  return `${formatFeedCount(value)} units available`
}

export function getAccommodationFeedPageTitle(city?: string): string {
  return city ? `${city} accommodation` : 'Student accommodation'
}

export function getDevelopmentCardDescription(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentDescription(development)
}

export function getBuildingSourceLinkLabel(building: AccommodationFeedBuilding): string {
  return building.name ? `Visit ${building.name}` : 'Visit provider website'
}

export function getDevelopmentRoomImage(room: AccommodationFeedRoom): string | undefined {
  return room.image
}

export function getDevelopmentPropertyAvailability(development: AccommodationFeedDevelopment): string | undefined {
  const availability = getDevelopmentAvailability(development)
  return availability === undefined ? undefined : getFeedUnitsAvailableLabel(availability)
}

export function getDevelopmentSummary(development: AccommodationFeedDevelopment): string | undefined {
  const available = getDevelopmentAvailabilitySummary(development)
  const buildingCount = development.buildings.length
  const roomCount = development.rooms.length
  const parts = [available, buildingCount ? `${formatFeedCount(buildingCount)} ${buildingCount === 1 ? 'building' : 'buildings'}` : undefined, roomCount ? getDevelopmentRoomCountLabel(roomCount) : undefined]
    .filter((part): part is string => Boolean(part))
  return parts.length ? parts.join(' · ') : undefined
}

export function getFeedBuildingDescription(building: AccommodationFeedBuilding): string | undefined {
  return building.description
}

export function getAccommodationFeedCityNames(): string[] {
  return accommodationFeedCities
}

export function getDevelopmentRoomPriceValue(room: AccommodationFeedRoom): number | undefined {
  return room.priceFrom
}

export function getFeedDevelopmentAvailability(development: AccommodationFeedDevelopment): number | undefined {
  return getDevelopmentAvailableRoomCount(development)
}

export function getFeedPropertyLink(development: AccommodationFeedDevelopment): string | undefined {
  return getProviderLink(development)
}

export function getFeedDevelopmentAddress(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentLocation(development)
}

export function getAccommodationFeedListings(developments: readonly AccommodationFeedDevelopment[]): AccommodationFeedDevelopment[] {
  return [...developments]
}

export function getFeedUnitTypeName(room: AccommodationFeedRoom): string {
  return room.name
}

export function getFeedCurrencyNotice(): string {
  return getFeedPriceNotice()
}

export function getFeedAvailabilityValue(room: AccommodationFeedRoom): number | undefined {
  return room.available
}

export function getFeedUnitPrice(room: AccommodationFeedRoom): number | undefined {
  return room.priceFrom
}

export function getFeedExternalHref(building: AccommodationFeedBuilding): string | undefined {
  return building.externalLink
}

export function getFeedSourceDevelopmentKey(development: AccommodationFeedDevelopment): string {
  return development.key
}

export function getFeedCityLabel(city: string): string {
  return city
}

export function getFeedRoomAcademicYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedBuildings(development: AccommodationFeedDevelopment): AccommodationFeedBuilding[] {
  return development.buildings
}

export function getFeedRoomImage(room: AccommodationFeedRoom): string | undefined {
  return room.image
}

export function getFeedDevelopmentRooms(development: AccommodationFeedDevelopment): AccommodationFeedRoom[] {
  return development.rooms
}

export function getFeedDevelopmentName(development: AccommodationFeedDevelopment): string {
  return development.name
}

export function getFeedDevelopmentCity(development: AccommodationFeedDevelopment): string {
  return development.city
}

export function getFeedDevelopmentCountry(development: AccommodationFeedDevelopment): string | undefined {
  return development.country
}

export function getFeedDevelopmentBrand(development: AccommodationFeedDevelopment): string | undefined {
  return development.brand
}

export function getFeedDevelopmentCount(developments: readonly AccommodationFeedDevelopment[]): number {
  return developments.length
}

export function getFeedRoomPriceLabel(room: AccommodationFeedRoom): string {
  return getDevelopmentRoomPrice(room)
}

export function getFeedRoomAvailabilityLabel(room: AccommodationFeedRoom): string {
  return getDevelopmentUnitAvailability(room)
}

export function getFeedBuildingDetails(building: AccommodationFeedBuilding): string[] {
  const details = [getDevelopmentAddressLabel(building), getDevelopmentBuildingAvailability(building)]
  return details.filter((detail): detail is string => Boolean(detail))
}

export function getFeedBuildingsSummary(development: AccommodationFeedDevelopment): string[] {
  return getDevelopmentDetails(development)
}

export function getFeedRoomCount(development: AccommodationFeedDevelopment): number {
  return development.rooms.length
}

export function getFeedCityCount(cities: readonly string[]): number {
  return cities.length
}

export function getFeedDevelopmentLabel(development: AccommodationFeedDevelopment): string {
  return development.name
}

export function getFeedBuildingLink(building: AccommodationFeedBuilding): string | undefined {
  return building.externalLink
}

export function getFeedUnitTypeLabel(room: AccommodationFeedRoom): string {
  return room.name
}

export function getFeedBuildingLabel(building: AccommodationFeedBuilding): string | undefined {
  return building.name
}

export function getFeedDevelopmentDescription(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentDescription(development)
}

export function getFeedAvailableValue(room: AccommodationFeedRoom): number | undefined {
  return room.available
}

export function getFeedPriceValue(room: AccommodationFeedRoom): number | undefined {
  return room.priceFrom
}

export function getFeedBuildingAddress(building: AccommodationFeedBuilding): string | undefined {
  return getDevelopmentAddressLabel(building)
}

export function getFeedBuildingAvailability(building: AccommodationFeedBuilding): number | undefined {
  return building.unitsAvailable
}

export function getFeedProviderLinks(development: AccommodationFeedDevelopment): Array<{ building: string; href: string }> {
  return getDevelopmentExternalLinks(development)
}

export function getFeedDevelopmentLocation(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentLocation(development)
}

export function getFeedBuildingCount(development: AccommodationFeedDevelopment): number {
  return development.buildings.length
}

export function getFeedRoomImageUrl(room: AccommodationFeedRoom): string | undefined {
  return room.image
}

export function getFeedResponseDevelopments(): AccommodationFeedDevelopment[] {
  return accommodationFeedDevelopments
}

export function getFeedResponseCities(): string[] {
  return accommodationFeedCities
}

export function getFeedDevelopmentUnitTypes(development: AccommodationFeedDevelopment): AccommodationFeedRoom[] {
  return development.rooms
}

export function getFeedDevelopmentBuildingList(development: AccommodationFeedDevelopment): AccommodationFeedBuilding[] {
  return development.buildings
}

export function getFeedDevelopmentStartingPrice(development: AccommodationFeedDevelopment): number | undefined {
  return getDevelopmentStartingPrice(development)
}

export function getFeedDevelopmentAvailabilityCount(development: AccommodationFeedDevelopment): number | undefined {
  return getDevelopmentAvailableRoomCount(development)
}

export function getFeedDevelopmentExternalLink(development: AccommodationFeedDevelopment): string | undefined {
  return getProviderLink(development)
}

export function getFeedDevelopmentCityName(development: AccommodationFeedDevelopment): string {
  return development.city
}

export function getFeedDevelopmentCountryName(development: AccommodationFeedDevelopment): string | undefined {
  return development.country
}

export function getFeedDevelopmentCardKey(development: AccommodationFeedDevelopment): string {
  return development.key
}

export function getFeedDevelopmentRoomYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedBuildingKey(building: AccommodationFeedBuilding, index: number): string {
  return getDevelopmentBuildingIdentity(building, index)
}

export function getFeedBuildingAddressLabel(building: AccommodationFeedBuilding): string | undefined {
  return getDevelopmentAddressLabel(building)
}

export function getFeedPropertyTitle(development: AccommodationFeedDevelopment): string {
  return development.name
}

export function getFeedPropertyDescription(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentDescription(development)
}

export function getFeedPropertyAvailability(development: AccommodationFeedDevelopment): number | undefined {
  return getDevelopmentAvailableRoomCount(development)
}

export function getFeedPropertyStartingPrice(development: AccommodationFeedDevelopment): number | undefined {
  return getDevelopmentStartingPrice(development)
}

export function getFeedPropertyBuildings(development: AccommodationFeedDevelopment): AccommodationFeedBuilding[] {
  return development.buildings
}

export function getFeedPropertyRooms(development: AccommodationFeedDevelopment): AccommodationFeedRoom[] {
  return development.rooms
}

export function getFeedPropertyCity(development: AccommodationFeedDevelopment): string {
  return development.city
}

export function getFeedPropertyCountry(development: AccommodationFeedDevelopment): string | undefined {
  return development.country
}

export function getFeedPropertyBrand(development: AccommodationFeedDevelopment): string | undefined {
  return development.brand
}

export function getFeedPropertyExternalLinks(development: AccommodationFeedDevelopment): Array<{ building: string; href: string }> {
  return getDevelopmentExternalLinks(development)
}

export function getFeedPropertyAddress(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentLocation(development)
}

export function getFeedPropertyRoomCount(development: AccommodationFeedDevelopment): number {
  return development.rooms.length
}

export function getFeedPropertyBuildingCount(development: AccommodationFeedDevelopment): number {
  return development.buildings.length
}

export function getFeedPropertyCardKey(development: AccommodationFeedDevelopment): string {
  return development.key
}

export function getFeedRoomCardKey(development: AccommodationFeedDevelopment, room: AccommodationFeedRoom): string {
  return getDevelopmentRoomKey(development, room)
}

export function getFeedPropertyTitleLabel(development: AccommodationFeedDevelopment): string {
  return development.name
}

export function getFeedPropertyCityLabel(development: AccommodationFeedDevelopment): string {
  return getDevelopmentCityLabel(development)
}

export function getFeedPropertyRoomImage(room: AccommodationFeedRoom): string | undefined {
  return room.image
}

export function getFeedPropertyRoomImageAlt(room: AccommodationFeedRoom, development: AccommodationFeedDevelopment): string {
  return getFeedRoomAlt(room, development)
}

export function getFeedPropertyRoomPrice(room: AccommodationFeedRoom): string {
  return getDevelopmentRoomPrice(room)
}

export function getFeedPropertyRoomAvailability(room: AccommodationFeedRoom): string {
  return getDevelopmentRoomAvailability(room)
}

export function getFeedPropertyRoomYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedPropertyBuildingName(building: AccommodationFeedBuilding, development: AccommodationFeedDevelopment): string {
  return getFeedBuildingName(building, development)
}

export function getFeedPropertyBuildingAddress(building: AccommodationFeedBuilding): string | undefined {
  return getDevelopmentAddressLabel(building)
}

export function getFeedPropertyBuildingAvailability(building: AccommodationFeedBuilding): string | undefined {
  return getDevelopmentBuildingAvailability(building)
}

export function getFeedPropertyBuildingDescription(building: AccommodationFeedBuilding): string | undefined {
  return building.description
}

export function getFeedPropertyBuildingLinkLabel(building: AccommodationFeedBuilding): string {
  return getBuildingSourceLinkLabel(building)
}

export function getFeedPropertyBuildingLink(building: AccommodationFeedBuilding): string | undefined {
  return building.externalLink
}

export function getFeedPropertyCountLabel(count: number): string {
  return getDevelopmentCountLabel(count)
}

export function getFeedPropertyPriceNotice(): string {
  return getFeedPriceNotice()
}

export function getFeedPropertyAvailabilityNotice(): string {
  return getFeedAvailabilityNotice()
}

export function getFeedPropertyListingCount(developments: readonly AccommodationFeedDevelopment[]): number {
  return developments.length
}

export function getFeedPropertyRoomAvailabilityLabel(room: AccommodationFeedRoom): string {
  return getDevelopmentUnitAvailability(room)
}

export function getFeedPropertyRoomPriceLabel(room: AccommodationFeedRoom): string {
  return getDevelopmentRoomPrice(room)
}

export function getFeedPropertyRoomOccupancy(room: AccommodationFeedRoom): string | undefined {
  return undefined
}

export function getFeedPropertyExternalHref(development: AccommodationFeedDevelopment): string | undefined {
  return getProviderLink(development)
}

export function getFeedPropertyBuildingList(development: AccommodationFeedDevelopment): AccommodationFeedBuilding[] {
  return development.buildings
}

export function getFeedPropertyRoomList(development: AccommodationFeedDevelopment): AccommodationFeedRoom[] {
  return development.rooms
}

export function getFeedPropertyBuildingIdentity(building: AccommodationFeedBuilding, index: number): string {
  return getDevelopmentBuildingIdentity(building, index)
}

export function getFeedPropertyName(development: AccommodationFeedDevelopment): string {
  return development.name
}

export function getFeedPropertySlug(development: AccommodationFeedDevelopment): string {
  return development.key
}

export function getFeedPropertyUnitTypes(development: AccommodationFeedDevelopment): AccommodationFeedRoom[] {
  return development.rooms
}

export function getFeedPropertySourceBrand(development: AccommodationFeedDevelopment): string | undefined {
  return development.brand
}

export function getFeedPropertyMainDescription(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentDescription(development)
}

export function getFeedPropertyMainAddress(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentLocation(development)
}

export function getFeedPropertySiteLinks(development: AccommodationFeedDevelopment): Array<{ building: string; href: string }> {
  return getDevelopmentExternalLinks(development)
}

export function getFeedPropertyRoomCountText(development: AccommodationFeedDevelopment): string {
  return getDevelopmentRoomCountLabel(development.rooms.length)
}

export function getFeedPropertyBuildingCountText(development: AccommodationFeedDevelopment): string {
  return `${formatFeedCount(development.buildings.length)} ${development.buildings.length === 1 ? 'building' : 'buildings'}`
}

export function getFeedPropertyCityCountry(development: AccommodationFeedDevelopment): string {
  return getDevelopmentCityLabel(development)
}

export function getFeedPropertyAvailabilityText(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentAvailabilitySummary(development)
}

export function getFeedPropertyImageAlt(room: AccommodationFeedRoom, development: AccommodationFeedDevelopment): string {
  return getDevelopmentImageAlt(room, development)
}

export function getFeedPropertyRoomAvailabilityText(room: AccommodationFeedRoom): string {
  return getDevelopmentUnitAvailability(room)
}

export function getFeedPropertyRoomPriceText(room: AccommodationFeedRoom): string {
  return getDevelopmentRoomPrice(room)
}

export function getFeedPropertyAcademicYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedPropertyProviderLink(building: AccommodationFeedBuilding): string | undefined {
  return building.externalLink
}

export function getFeedPropertyDisplayName(development: AccommodationFeedDevelopment): string {
  return development.name
}

export function getFeedPropertySourceLinkLabel(building: AccommodationFeedBuilding): string {
  return building.name ? `Visit ${building.name}` : 'Visit provider website'
}

export function getFeedPropertyRoomTitle(room: AccommodationFeedRoom): string {
  return room.name
}

export function getFeedPropertyRoomAvailabilityCount(room: AccommodationFeedRoom): number | undefined {
  return room.available
}

export function getFeedPropertyRoomStartingPrice(room: AccommodationFeedRoom): number | undefined {
  return room.priceFrom
}

export function getFeedPropertyRoomPhoto(room: AccommodationFeedRoom): string | undefined {
  return room.image
}

export function getFeedPropertyRoomAcademicYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedPropertyDescriptionText(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentDescription(development)
}

export function getFeedPropertyLocationText(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentLocation(development)
}

export function getFeedPropertyRoomTypeCount(development: AccommodationFeedDevelopment): number {
  return development.rooms.length
}

export function getFeedPropertyBuildingRecordCount(development: AccommodationFeedDevelopment): number {
  return development.buildings.length
}

export function getFeedPropertyStartingPriceText(development: AccommodationFeedDevelopment): string | undefined {
  const price = getDevelopmentStartingPrice(development)
  return price === undefined ? undefined : getDevelopmentStartingPriceLabel(price)
}

export function getFeedPropertyExternalLinkCount(development: AccommodationFeedDevelopment): number {
  return getDevelopmentExternalLinks(development).length
}

export function getFeedPropertyMainLink(development: AccommodationFeedDevelopment): string | undefined {
  return getProviderLink(development)
}

export function getFeedPropertyLinkLabel(development: AccommodationFeedDevelopment): string {
  return development.name ? `Visit ${development.name} provider site` : 'Visit provider website'
}

export function getFeedPropertySourceLinks(development: AccommodationFeedDevelopment): Array<{ building: string; href: string }> {
  return getDevelopmentExternalLinks(development)
}

export function getFeedPropertyBuildingAddressText(building: AccommodationFeedBuilding): string | undefined {
  return getDevelopmentAddressLabel(building)
}

export function getFeedPropertyBuildingAvailabilityText(building: AccommodationFeedBuilding): string | undefined {
  return getDevelopmentBuildingAvailability(building)
}

export function getFeedPropertyBuildingDetails(building: AccommodationFeedBuilding): string[] {
  return getFeedBuildingDetails(building)
}

export function getFeedPropertyBuildingDescriptionText(building: AccommodationFeedBuilding): string | undefined {
  return building.description
}

export function getFeedPropertyRoomCountLabel(development: AccommodationFeedDevelopment): string {
  return getDevelopmentRoomCountLabel(development.rooms.length)
}

export function getFeedPropertyCityCountLabel(cities: readonly string[]): string {
  return `${formatFeedCount(cities.length)} ${cities.length === 1 ? 'city' : 'cities'}`
}

export function getFeedPropertyAvailabilityCount(development: AccommodationFeedDevelopment): number | undefined {
  return getDevelopmentAvailableRoomCount(development)
}

export function getFeedPropertyStartingPriceValue(development: AccommodationFeedDevelopment): number | undefined {
  return getDevelopmentStartingPrice(development)
}

export function getFeedPropertyTypeLabel(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentBrandLabel(development)
}

export function getFeedPropertyProviderLinks(development: AccommodationFeedDevelopment): Array<{ building: string; href: string }> {
  return getDevelopmentExternalLinks(development)
}

export function getFeedPropertyBuildingNames(development: AccommodationFeedDevelopment): string[] {
  return development.buildings.map((building) => building.name).filter((name): name is string => Boolean(name))
}

export function getFeedPropertyAddresses(development: AccommodationFeedDevelopment): string[] {
  return getDevelopmentDetails(development)
}

export function getFeedPropertyUnitAvailability(room: AccommodationFeedRoom): number | undefined {
  return room.available
}

export function getFeedPropertyUnitPrice(room: AccommodationFeedRoom): number | undefined {
  return room.priceFrom
}

export function getFeedPropertyUnitImage(room: AccommodationFeedRoom): string | undefined {
  return room.image
}

export function getFeedPropertyUnitYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedPropertyUnitName(room: AccommodationFeedRoom): string {
  return room.name
}

export function getFeedPropertyUnitAvailabilityLabel(room: AccommodationFeedRoom): string {
  return getDevelopmentUnitAvailability(room)
}

export function getFeedPropertyUnitPriceLabel(room: AccommodationFeedRoom): string {
  return getDevelopmentRoomPrice(room)
}

export function getFeedPropertyUnitPhotoAlt(room: AccommodationFeedRoom, development: AccommodationFeedDevelopment): string {
  return getDevelopmentImageAlt(room, development)
}

export function getFeedPropertyUnitAcademicYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedPropertyUnitCardKey(development: AccommodationFeedDevelopment, room: AccommodationFeedRoom): string {
  return getDevelopmentRoomKey(development, room)
}

export function getFeedPropertyContactLink(building: AccommodationFeedBuilding): string | undefined {
  return building.externalLink
}

export function getFeedPropertyContactLabel(building: AccommodationFeedBuilding): string {
  return getBuildingSourceLinkLabel(building)
}

export function getFeedPropertyCountText(developments: readonly AccommodationFeedDevelopment[]): string {
  return getDevelopmentCountLabel(developments.length)
}

export function getFeedPropertyCityOptions(cities: readonly string[]): Array<{ value: string; label: string }> {
  return cities.map((city) => ({ value: city, label: city }))
}

export function getFeedPropertyNoResultsMessage(): string {
  return 'No accommodation records are available for this selection.'
}

export function getFeedPropertyAvailableNotice(): string {
  return getFeedAvailabilityNotice()
}

export function getFeedPropertyDataNotice(): string {
  return getFeedPriceNotice()
}

export function getFeedPropertySourceDescription(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentDescription(development)
}

export function getFeedPropertySourceAvailability(development: AccommodationFeedDevelopment): number | undefined {
  return getDevelopmentAvailableRoomCount(development)
}

export function getFeedPropertySourceStartingPrice(development: AccommodationFeedDevelopment): number | undefined {
  return getDevelopmentStartingPrice(development)
}

export function getFeedPropertySourceDetails(development: AccommodationFeedDevelopment): string[] {
  return getDevelopmentDetails(development)
}

export function getFeedPropertySourceBuildings(development: AccommodationFeedDevelopment): AccommodationFeedBuilding[] {
  return development.buildings
}

export function getFeedPropertySourceRooms(development: AccommodationFeedDevelopment): AccommodationFeedRoom[] {
  return development.rooms
}

export function getFeedPropertySourceCities(): string[] {
  return accommodationFeedCities
}

export function getFeedPropertySourceListings(): AccommodationFeedDevelopment[] {
  return accommodationFeedDevelopments
}

export function getFeedPropertySourceCount(): number {
  return accommodationFeedDevelopments.length
}

export function getFeedPropertySourceCityCount(): number {
  return accommodationFeedCities.length
}

export function getFeedPropertySourceRoomCount(development: AccommodationFeedDevelopment): number {
  return development.rooms.length
}

export function getFeedPropertySourceBuildingCount(development: AccommodationFeedDevelopment): number {
  return development.buildings.length
}

export function getFeedPropertySourceStartingPriceLabel(development: AccommodationFeedDevelopment): string | undefined {
  return getFeedPropertyStartingPriceText(development)
}

export function getFeedPropertySourceRoomAvailability(room: AccommodationFeedRoom): string {
  return getDevelopmentRoomAvailability(room)
}

export function getFeedPropertySourceRoomPrice(room: AccommodationFeedRoom): string {
  return getDevelopmentRoomPrice(room)
}

export function getFeedPropertySourceRoomImage(room: AccommodationFeedRoom): string | undefined {
  return room.image
}

export function getFeedPropertySourceRoomYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedPropertySourceBuildingLink(building: AccommodationFeedBuilding): string | undefined {
  return building.externalLink
}

export function getFeedPropertySourceBuildingAddress(building: AccommodationFeedBuilding): string | undefined {
  return getDevelopmentAddressLabel(building)
}

export function getFeedPropertySourceBuildingAvailability(building: AccommodationFeedBuilding): string | undefined {
  return getDevelopmentBuildingAvailability(building)
}

export function getFeedPropertySourceBuildingDescription(building: AccommodationFeedBuilding): string | undefined {
  return building.description
}

export function getFeedPropertySourceBuildingName(building: AccommodationFeedBuilding, development: AccommodationFeedDevelopment): string {
  return getFeedBuildingName(building, development)
}

export function getFeedPropertySourceUnitType(room: AccommodationFeedRoom): string {
  return room.name
}

export function getFeedPropertySourceRoomCountLabel(development: AccommodationFeedDevelopment): string {
  return getDevelopmentRoomCountLabel(development.rooms.length)
}

export function getFeedPropertySourceLocation(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentLocation(development)
}

export function getFeedPropertySourceBrand(development: AccommodationFeedDevelopment): string | undefined {
  return development.brand
}

export function getFeedPropertySourceCity(development: AccommodationFeedDevelopment): string {
  return development.city
}

export function getFeedPropertySourceCountry(development: AccommodationFeedDevelopment): string | undefined {
  return development.country
}

export function getFeedPropertySourcePropertyName(development: AccommodationFeedDevelopment): string {
  return development.name
}

export function getFeedPropertySourcePropertyKey(development: AccommodationFeedDevelopment): string {
  return development.key
}

export function getFeedPropertySourceUnitCount(development: AccommodationFeedDevelopment): number | undefined {
  return getDevelopmentAvailableRoomCount(development)
}

export function getFeedPropertySourceProviderLinks(development: AccommodationFeedDevelopment): Array<{ building: string; href: string }> {
  return getDevelopmentExternalLinks(development)
}

export function getFeedPropertySourceRoomTitle(room: AccommodationFeedRoom): string {
  return room.name
}

export function getFeedPropertySourceRoomPriceLabel(room: AccommodationFeedRoom): string {
  return getDevelopmentRoomPrice(room)
}

export function getFeedPropertySourceRoomAvailabilityLabel(room: AccommodationFeedRoom): string {
  return getDevelopmentUnitAvailability(room)
}

export function getFeedPropertySourceRoomImageAlt(room: AccommodationFeedRoom, development: AccommodationFeedDevelopment): string {
  return getDevelopmentImageAlt(room, development)
}

export function getFeedPropertySourceRoomAcademicYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedPropertySourceAddressLabel(building: AccommodationFeedBuilding): string | undefined {
  return getDevelopmentAddressLabel(building)
}

export function getFeedPropertySourceAvailabilityLabel(building: AccommodationFeedBuilding): string | undefined {
  return getDevelopmentBuildingAvailability(building)
}

export function getFeedPropertySourceBuildingTitle(building: AccommodationFeedBuilding, development: AccommodationFeedDevelopment): string {
  return getFeedBuildingName(building, development)
}

export function getFeedPropertySourcePriceNotice(): string {
  return getFeedPriceNotice()
}

export function getFeedPropertySourceAvailabilityNotice(): string {
  return getFeedAvailabilityNotice()
}

export function getFeedPropertySourceNoResults(): string {
  return getFeedPropertyNoResultsMessage()
}

export function getFeedPropertySourceRoomTypes(development: AccommodationFeedDevelopment): AccommodationFeedRoom[] {
  return development.rooms
}

export function getFeedPropertySourceBuildingRecords(development: AccommodationFeedDevelopment): AccommodationFeedBuilding[] {
  return development.buildings
}

export function getFeedPropertySourceTitle(development: AccommodationFeedDevelopment): string {
  return development.name
}

export function getFeedPropertySourceCityName(development: AccommodationFeedDevelopment): string {
  return development.city
}

export function getFeedPropertySourceCountryName(development: AccommodationFeedDevelopment): string | undefined {
  return development.country
}

export function getFeedPropertySourceExternalLink(building: AccommodationFeedBuilding): string | undefined {
  return building.externalLink
}

export function getFeedPropertySourceExternalLinkLabel(building: AccommodationFeedBuilding): string {
  return getBuildingSourceLinkLabel(building)
}

export function getFeedPropertySourceRoomAvailabilityCount(room: AccommodationFeedRoom): number | undefined {
  return room.available
}

export function getFeedPropertySourceRoomPriceValue(room: AccommodationFeedRoom): number | undefined {
  return room.priceFrom
}

export function getFeedPropertySourceRoomImageUrl(room: AccommodationFeedRoom): string | undefined {
  return room.image
}

export function getFeedPropertySourceCountLabel(developments: readonly AccommodationFeedDevelopment[]): string {
  return getDevelopmentCountLabel(developments.length)
}

export function getFeedPropertySourceCityOptions(cities: readonly string[]): Array<{ value: string; label: string }> {
  return getFeedPropertyCityOptions(cities)
}

export function getFeedPropertySourceCityCountLabel(cities: readonly string[]): string {
  return getFeedPropertyCityCountLabel(cities)
}

export function getFeedPropertySourceUnitAvailability(room: AccommodationFeedRoom): number | undefined {
  return room.available
}

export function getFeedPropertySourceUnitPrice(room: AccommodationFeedRoom): number | undefined {
  return room.priceFrom
}

export function getFeedPropertySourceUnitImage(room: AccommodationFeedRoom): string | undefined {
  return room.image
}

export function getFeedPropertySourceUnitYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedPropertySourceUnitName(room: AccommodationFeedRoom): string {
  return room.name
}

export function getFeedPropertySourceUnitAvailabilityLabel(room: AccommodationFeedRoom): string {
  return getDevelopmentUnitAvailability(room)
}

export function getFeedPropertySourceUnitPriceLabel(room: AccommodationFeedRoom): string {
  return getDevelopmentRoomPrice(room)
}

export function getFeedPropertySourceUnitPhotoAlt(room: AccommodationFeedRoom, development: AccommodationFeedDevelopment): string {
  return getDevelopmentImageAlt(room, development)
}

export function getFeedPropertySourceUnitAcademicYear(room: AccommodationFeedRoom): string | undefined {
  return room.academicYear
}

export function getFeedPropertySourceUnitCardKey(development: AccommodationFeedDevelopment, room: AccommodationFeedRoom): string {
  return getDevelopmentRoomKey(development, room)
}

export function getFeedPropertySourceContactLink(building: AccommodationFeedBuilding): string | undefined {
  return building.externalLink
}

export function getFeedPropertySourceContactLabel(building: AccommodationFeedBuilding): string {
  return getBuildingSourceLinkLabel(building)
}

export function getFeedPropertySourceBuildingIdentity(building: AccommodationFeedBuilding, index: number): string {
  return getDevelopmentBuildingIdentity(building, index)
}

export function getFeedPropertySourceMainDescription(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentDescription(development)
}

export function getFeedPropertySourceMainAddress(development: AccommodationFeedDevelopment): string | undefined {
  return getDevelopmentLocation(development)
}

export function getFeedPropertySourceMainLink(development: AccommodationFeedDevelopment): string | undefined {
  return getProviderLink(development)
}
