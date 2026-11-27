import { catalogueSearchParam, type CatalogueSearchParams } from '../accommodation/catalogue-server'
import { getEnquiryContext } from '../accommodation/enquiry-context'
import { getCityBySlug } from '@/lib/place-data'
import MatchingForm from './matching-form'

export default async function GetMatchedPage({ searchParams }: { searchParams: Promise<CatalogueSearchParams> }) {
  const params = await searchParams
  const property = catalogueSearchParam(params.property)
  const room = catalogueSearchParam(params.room)
  const citySlug = catalogueSearchParam(params.city)
  const context = await getEnquiryContext(property, room)
  const city = citySlug ? getCityBySlug(citySlug) : undefined

  return <MatchingForm
    key={context?.roomSlug ?? context?.propertySlug ?? citySlug}
    context={context}
    destination={city ? { country: city.country, city: city.name } : undefined}
  />
}
