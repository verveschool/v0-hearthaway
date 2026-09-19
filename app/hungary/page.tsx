import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function HungaryIndex() {
  return <CountryHubPage country={getCountryBySlug('hungary')} />
}
