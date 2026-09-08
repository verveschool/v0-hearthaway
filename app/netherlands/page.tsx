import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function NetherlandsPage() {
  return <CountryHubPage country={getCountryBySlug('netherlands')} />
}
