import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function CanadaIndex() {
  return <CountryHubPage country={getCountryBySlug('canada')} />
}
