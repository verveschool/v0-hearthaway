import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function ItalyIndex() {
  return <CountryHubPage country={getCountryBySlug('italy')} />
}
