import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function AUIndex() {
  return <CountryHubPage country={getCountryBySlug('australia')} />
}
