import type { AccommodationCurrency, AccommodationPricePeriod, AccommodationRoomPrice } from './accommodation-data'

export const accommodationCurrencySymbols: Record<AccommodationCurrency, string> = {
  GBP: '£',
  EUR: '€',
  AUD: '$',
  USD: '$',
  CAD: 'CA$',
  AED: 'AED ',
  SGD: 'S$',
  MYR: 'RM',
}

export function formatAccommodationPrice(currency: AccommodationCurrency, amount: number): string {
  return `${accommodationCurrencySymbols[currency]}${amount}`
}

export function formatAccommodationPricePeriod(pricePeriod: AccommodationPricePeriod): string {
  return pricePeriod === 'check' ? '' : `/${pricePeriod}`
}

/**
 * Renders a room-level price exactly as confidently as the source data supports:
 * an exact figure, a range, or "Price on enquiry" when the source gave nothing
 * usable. Never composes a number that isn't already present on the price object.
 */
export function formatRoomPrice(price: AccommodationRoomPrice): string {
  if (price.label) return price.label
  if (price.priceOnEnquiry || (price.value === undefined && price.minValue === undefined && price.maxValue === undefined)) {
    return 'Price on enquiry'
  }

  const symbol = accommodationCurrencySymbols[price.currency]
  const period = price.period ? formatAccommodationPricePeriod(price.period) : ''

  if (price.minValue !== undefined && price.maxValue !== undefined && price.minValue !== price.maxValue) {
    return `${symbol}${price.minValue} to ${symbol}${price.maxValue}${period}`
  }

  const amount = price.value ?? price.minValue ?? price.maxValue
  const prefix = price.indicative ? 'From ' : ''
  return `${prefix}${symbol}${amount}${period}`
}
