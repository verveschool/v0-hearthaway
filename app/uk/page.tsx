import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function UKIndex() {
  return <CountryHubPage country={getCountryBySlug('uk')} />
}
