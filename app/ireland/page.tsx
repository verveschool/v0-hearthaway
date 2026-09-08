import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function IEIndex() {
  return <CountryHubPage country={getCountryBySlug('ireland')} />
}
