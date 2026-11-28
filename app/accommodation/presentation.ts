import type { PartnerRent } from './listing-data'

export const PRICE_AVAILABILITY_NOTICE =
  'Prices and availability are indicative catalogue details and may change.'

export function getProviderAvailabilityNotice(): string {
  return PRICE_AVAILABILITY_NOTICE
}

export function formatSourcePrice(value: number, minimumFractionDigits = 0): string {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatSourceAvailability(value: number): string {
  void value
  return PRICE_AVAILABILITY_NOTICE
}

export function formatAvailabilityStatus(value: string): string {
  void value
  return PRICE_AVAILABILITY_NOTICE
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
  void includeFrom
  return room.priceLabel ?? ''
}


export function sourceRentDisplay(rent: PartnerRent) {
  if (!['week', 'month', 'night', 'term'].includes(rent.period) || !/^[A-Z]{3}$/.test(rent.currency)
      || !Number.isSafeInteger(rent.amountMinor) || rent.amountMinor < 0) return null
  const formatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: rent.currency })
  const digits = formatter.resolvedOptions().maximumFractionDigits ?? 2
  const amount = rent.amountMinor / 10 ** digits
  const label = new Intl.NumberFormat('en-GB', { style: 'currency', currency: rent.currency, minimumFractionDigits: 0 }).format(amount)
  return { amount, label: `${label}/${rent.period}` }
}
