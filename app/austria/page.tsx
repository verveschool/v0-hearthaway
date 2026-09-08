import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function AustriaIndex() {
  return <CountryHubPage country={getCountryBySlug('austria')} />
}
