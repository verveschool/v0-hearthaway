export const PRICE_AVAILABILITY_NOTICE =
  'Prices and availability are indicative catalogue details and may change.'

export function formatSourcePrice(value: number, minimumFractionDigits = 0): string {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatSourceAvailability(value: number): string {
  return `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(value)} available`
}

export function formatAvailabilityStatus(value: string): string {
  return /^sold out$/i.test(value) ? 'Sold out' : value
}

export function formatCurrencyAmount(
  value: number,
  symbol: string,
  minimumFractionDigits = 0,
): string {
  return `${symbol}${formatSourcePrice(value, minimumFractionDigits)}`
}

type RoomPriceFields = {
  priceFrom: number | null
  pricePerNight: number | null
  priceLabel: string | null
}

export function getRoomPriceDisplay(room: RoomPriceFields, includeFrom = false): string {
  if (room.priceLabel) return includeFrom ? `From ${room.priceLabel}` : room.priceLabel
  if (room.priceFrom !== null) {
    const price = formatSourcePrice(room.priceFrom)
    return includeFrom ? `From ${price}` : price
  }
  if (room.pricePerNight !== null) {
    const price = `${formatSourcePrice(room.pricePerNight)}/night`
    return includeFrom ? `From ${price}` : price
  }
  return 'Price not provided'
}
