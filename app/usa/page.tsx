import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function UsaIndex() {
  return <CountryHubPage country={getCountryBySlug('usa')} />
}
