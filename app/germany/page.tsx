import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function GermanyIndex() {
  return <CountryHubPage country={getCountryBySlug('germany')} />
}
