import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function BelgiumIndex() {
  return <CountryHubPage country={getCountryBySlug('belgium')} />
}
