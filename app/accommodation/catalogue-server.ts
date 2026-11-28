import { sourceRentDisplay } from './presentation'
import { createClient } from '@supabase/supabase-js'
import type { AccommodationListingRecord, AccommodationRoomListing, AccommodationRoomRecord } from './listing-data'

export function catalogueDatabaseEnabled() {
  return process.env.HEARTHAWAY_CATALOGUE_MODE === 'database'
}

function catalogueClient() {
  const url = process.env.HEARTHAWAY_CATALOGUE_URL
  const key = process.env.HEARTHAWAY_CATALOGUE_PUBLISHABLE_KEY
  if (!url || !key) throw new Error('Catalogue database settings are incomplete')
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })
}

type Property = { id: string; slug: string; payload: Omit<AccommodationListingRecord, 'roomTypes'> }
type Room = { id: string; slug: string; property_id: string; payload: AccommodationRoomRecord }
const properties = 'ha_catalogue_properties'
const rooms = 'ha_catalogue_rooms'
const propertyColumns = 'id,slug,payload'
const roomColumns = 'id,slug,property_id,payload'
export const cataloguePageSize = 12

function displayRoom(row: Pick<Room, 'id' | 'slug' | 'payload'>): AccommodationRoomRecord {
  const room = { ...row.payload, catalogueId: row.id, catalogueSlug: row.slug }
  const rent = room.sourceRent
  if (!rent) return room
  const display = sourceRentDisplay(rent)
  return { ...room, priceFrom: display?.amount ?? null, pricePerNight: rent.period === 'night' ? display?.amount ?? null : null, priceLabel: display?.label ?? null }
}

async function propertyRecords(rows: Property[]) {
  if (!rows.length) return []
  const { data, error } = await catalogueClient().from(rooms)
    .select(roomColumns).in('property_id', rows.map(row => row.id)).order('ordinal').returns<Room[]>()
  if (error) throw error
  return rows.map(row => ({ ...row.payload, catalogueId: row.id,
    roomTypes: (data ?? []).filter(room => room.property_id === row.id)
      .map(displayRoom) }))
}

export async function catalogueProperty(slug: string) {
  const { data, error } = await catalogueClient().from(properties).select(propertyColumns).eq('slug', slug).maybeSingle<Property>()
  if (error) throw error
  return data ? (await propertyRecords([data]))[0] : undefined
}

export async function catalogueRoom(slug: string): Promise<AccommodationRoomListing | null> {
  const { data, error } = await catalogueClient().from(rooms).select(roomColumns).eq('slug', slug).maybeSingle<Room>()
  if (error) throw error
  if (!data) return null
  const parent = await catalogueClient().from(properties).select(propertyColumns).eq('id', data.property_id).single<Property>()
  if (parent.error) throw parent.error
  return {
    slug,
    property: { ...parent.data.payload, catalogueId: parent.data.id, roomTypes: [] },
    room: displayRoom(data),
  }
}

function contains(query: string) {
  return '%' + query.trim().slice(0, 100).toLowerCase().replace(/[\\%_*]/g, '\\$&') + '%'
}

type Filters = { provider?: string; city?: string; query?: string; page?: string }

export type CatalogueSearchParams = Record<string, string | string[] | undefined>

export function catalogueSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

async function boundedPage(page: string | undefined, countRows: () => PromiseLike<{ count: number | null; error: unknown }>) {
  if (!page || !/^\d+$/.test(page)) return 1
  const requested = Number(page)
  if (requested <= 1) return 1
  const { count, error } = await countRows()
  if (error) throw error
  return Math.min(requested, Math.max(1, Math.ceil((count ?? 0) / cataloguePageSize)))
}

export async function cataloguePropertyPage({ provider, city, query, page }: Filters) {
  const client = catalogueClient()
  const filtered = (head = false) => {
    let request = client.from(properties).select(propertyColumns, { count: 'exact', head })
    if (provider) request = request.eq('provider', provider)
    if (city) request = request.eq('city', city)
    if (query) request = request.like('search_text', contains(query))
    return request
  }
  const current = await boundedPage(page, () => filtered(true))
  const start = (current - 1) * cataloguePageSize
  const { data, error, count } = await filtered().order('sort_order')
    .range(start, start + cataloguePageSize - 1).returns<Property[]>()
  if (error) throw error
  return { current, total: count ?? 0, listings: await propertyRecords(data ?? []) }
}

export async function catalogueRoomPage({ city, query, page }: Filters) {
  const client = catalogueClient()
  const filtered = (head = false) => {
    let request = client.from(rooms)
      .select('id,slug,payload,ha_catalogue_properties!inner(id,payload,city)', { count: 'exact', head })
    if (city) request = request.eq('ha_catalogue_properties.city', city)
    if (query) request = request.like('search_text', contains(query))
    return request
  }
  const current = await boundedPage(page, () => filtered(true))
  const start = (current - 1) * cataloguePageSize
  const { data, error, count } = await filtered().order('sort_order')
    .range(start, start + cataloguePageSize - 1).returns<(Pick<Room, 'id' | 'slug' | 'payload'> & {
      ha_catalogue_properties: Pick<Property, 'id' | 'payload'>
    })[]>()
  if (error) throw error
  const listings: AccommodationRoomListing[] = (data ?? []).map(row => ({
    slug: row.slug, room: displayRoom(row),
    property: { ...row.ha_catalogue_properties.payload, catalogueId: row.ha_catalogue_properties.id, roomTypes: [] },
  }))
  return { current, total: count ?? 0, listings }
}
