import CountryHubPage from '@/app/country-hub-page'
import { getCountryBySlug } from '@/lib/country-data'

export default function AustraliaPage() {
  return <CountryHubPage country={getCountryBySlug('australia')} />
}
