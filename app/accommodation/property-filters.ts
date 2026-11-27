import type { AccommodationListingRecord } from './listing-data'

export const weeklyCurrencies = { GBP: '£', EUR: '€', AUD: 'A$' }
export type WeeklyCurrency = keyof typeof weeklyCurrencies

export function getWeeklyCurrency(value?: string): WeeklyCurrency | undefined {
  return value === 'GBP' || value === 'EUR' || value === 'AUD' ? value : undefined
}

export type PropertyFilters = {
  currency?: WeeklyCurrency
  maxWeekly?: number
  roomType?: string
  sort?: 'price-asc' | 'price-desc'
}

export function filterProperties(listings: AccommodationListingRecord[], filters: PropertyFilters) {
  const { currency, maxWeekly, roomType, sort } = filters
  const roomQuery = roomType?.toLowerCase()
  const symbol = currency ? weeklyCurrencies[currency] : undefined

  const matches = listings.flatMap((listing) => {
    const rooms = listing.roomTypes.filter((room) =>
      !roomQuery || [room.name, room.accommodationFormat, room.configuration].join(' ').toLowerCase().includes(roomQuery)
    )
    if (roomQuery && !rooms.length) return []

    const roomPrices = rooms.flatMap((room) =>
      symbol && room.priceLabel?.startsWith(symbol) && room.priceLabel.includes('/week') && room.priceFrom != null
        ? [Math.round(room.priceFrom / 10) * 10] : []
    )
    const propertyPrice = !roomQuery && symbol && listing.propertyPriceLabel?.startsWith(symbol)
      && listing.propertyPriceLabel.includes('/week') ? listing.propertyPriceFrom == null ? null : Math.round(listing.propertyPriceFrom / 10) * 10 : null
    const weeklyPrice = roomPrices.length ? Math.min(...roomPrices) : propertyPrice
    if (symbol && (sort || maxWeekly !== undefined) && weeklyPrice == null) return []
    if (maxWeekly !== undefined && (weeklyPrice == null || weeklyPrice > maxWeekly)) return []
    return [{ listing: roomQuery ? { ...listing, roomTypes: rooms } : listing, weeklyPrice }]
  })
  if (currency && sort) {
    matches.sort((a, b) => {
      if (a.weeklyPrice == null) return b.weeklyPrice == null ? 0 : 1
      if (b.weeklyPrice == null) return -1
      return sort === 'price-asc' ? a.weeklyPrice - b.weeklyPrice : b.weeklyPrice - a.weeklyPrice
    })
  }
  return matches.map(({ listing }) => listing)
}
