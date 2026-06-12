import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function UkPage() {
  return <CountryHubPage country={getCountryBySlug('uk')} />
}
