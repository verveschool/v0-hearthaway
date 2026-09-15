import type { AccommodationCurrency, AccommodationPricePeriod } from './accommodation-data'

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
