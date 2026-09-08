import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function SingaporeIndex() {
  return <CountryHubPage country={getCountryBySlug('singapore')} />
}
