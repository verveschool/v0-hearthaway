import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function SpainIndex() {
  return <CountryHubPage country={getCountryBySlug('spain')} />
}
