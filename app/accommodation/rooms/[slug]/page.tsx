import RoomTerms from '@/components/accommodation/room-terms'
import { catalogueDatabaseEnabled, catalogueRoom } from '../../catalogue-server'
import CatalogueImage from '@/components/accommodation/catalogue-image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import Footer from '@/components/footer'
import { SaveRoomButton } from '@/components/account/forms'
import { createClient } from '@/lib/supabase/server'
import { getAccommodationProviderName, getAccommodationRoomBySlug } from '@/app/accommodation/listing-data'
import { PRICE_AVAILABILITY_NOTICE, getRoomPriceDisplay } from '@/app/accommodation/presentation'

type RoomPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = catalogueDatabaseEnabled() ? await catalogueRoom(slug) : getAccommodationRoomBySlug(slug)
  if (!entry) return { title: 'Room type not found | HearthAway' }
  const title = `${entry.room.name} at ${entry.property.name} | HearthAway`
  return {
    title,
    description: `Explore the ${entry.room.name} room type at ${entry.property.name} in ${entry.property.city}. Review source-provided details and ask HearthAway for current terms.`,
    ...(entry.room.image ? { openGraph: { images: [{ url: entry.room.image, alt: `${entry.room.name} room at ${entry.property.name}` }] } } : {}),
  }
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params
  const entry = catalogueDatabaseEnabled() ? await catalogueRoom(slug) : getAccommodationRoomBySlug(slug)
  if (!entry) notFound()
  const { property, room } = entry
  const featureGroups: Array<{ label: string; values?: string[] }> = [
    { label: 'Bedroom', values: room.bedroomFeatures },
    { label: 'Bathroom', values: room.bathroomFeatures },
    { label: 'Kitchen', values: room.kitchenFeatures },
    { label: 'Furnishings', values: room.furnishings },
    { label: 'Appliances', values: room.appliances },
    { label: 'Storage', values: room.storage },
    { label: 'Study facilities', values: room.studyFacilities },
  ].filter((group) => Boolean(group.values?.length))
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F6F3] pb-16">
        <PageBanner
          title={room.name}
          action={{ label: 'See the property', href: `/accommodation/property/${property.slug}` }}
        />
        <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
          <Link href="/accommodation/rooms" className="inline-flex items-center gap-2 text-sm font-bold text-[#00319D] underline-offset-4 hover:underline">All room types</Link>
          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.7fr)]">
            <section className="overflow-hidden rounded-3xl border border-[#E8E6E1] bg-white">
              {room.image ? <CatalogueImage src={room.image} alt={`${room.name} room at ${property.name}`} className="aspect-[16/9] w-full bg-[#F1F0EC] object-cover" fetchPriority="high" decoding="async" /> : property.coverImage ? <CatalogueImage src={property.coverImage} alt={`${property.name} student property`} className="aspect-[16/9] w-full bg-[#F1F0EC] object-cover" fetchPriority="high" decoding="async" /> : <div aria-hidden="true" className="aspect-[16/9] bg-[#F1F0EC]" />}
              {(property.provider === 'iglu' || property.provider === 'neonwood' || property.provider === 'study-inn') && room.images.length > 1 ? <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:p-6">{room.images.slice(1).map((image, index) => <CatalogueImage key={image} src={image} alt={room.imageLabels?.[image] ?? `${room.name} at ${property.name}, photo ${index + 2}`} className="aspect-[4/3] w-full rounded-xl bg-[#F1F0EC] object-cover" loading="lazy" decoding="async" />)}</div> : null}
              {(property.provider === 'iglu' || property.provider === 'study-inn') && (room.floorplans?.length || room.floorplan) ? <div className="border-t border-[#E8E6E1] p-5 sm:p-6">{(room.floorplans?.length ? room.floorplans : [{ image: room.floorplan!, label: `${room.name} floor plan` }]).map((plan) => <figure key={plan.image} className="mb-5 last:mb-0"><CatalogueImage src={plan.image} alt={plan.label} className="mx-auto max-h-[28rem] w-auto max-w-full object-contain" loading="lazy" decoding="async" /><figcaption className="mt-2 text-center text-xs text-[#6B6860]">{plan.label}</figcaption></figure>)}{room.floorplanNote ? <p className="mt-3 text-center text-xs text-[#6B6860]">{room.floorplanNote}</p> : null}</div> : null}
              <div className="p-6 sm:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#F7F6F3] px-3 py-1 text-xs font-bold tracking-wide text-[#00319D]">{getAccommodationProviderName(property.provider)}</span>
                  <span className="text-sm text-[#6B6860]">{property.city}{property.country ? `, ${property.country}` : ''}</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-[#00319D]">{property.name}</p>

                {room.description ? <p className="mt-5 text-sm leading-7 text-[#4C4A45]">{room.description}</p> : null}
                {property.inclusions.length ? <div className="mt-7 border-t border-[#E8E6E1] pt-6"><h2 className="font-heading text-xl font-extrabold text-[#1A1A1A]">Property inclusions</h2><ul className="mt-3 grid gap-2 sm:grid-cols-2">{property.inclusions.map((inclusion) => <li key={inclusion} className="flex items-start gap-2 text-sm text-[#4C4A45]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FCC20A]" />{inclusion}</li>)}</ul></div> : null}
                <dl><div className="py-4"><dt className="text-xs font-bold tracking-wide text-[#6B6860]">Price</dt><dd className="mt-1 font-heading text-2xl font-extrabold text-[#00319D]">{getRoomPriceDisplay(room) || "Ask for a quote"}</dd></div>
                <p className="my-4 rounded-xl bg-[#F7F6F3] p-3 text-xs leading-relaxed text-[#6B6860]">{PRICE_AVAILABILITY_NOTICE}</p>
                
                {room.minimumOccupancy !== null || room.maximumOccupancy !== null ? <div className="py-4"><dt className="text-xs font-bold tracking-wide text-[#6B6860]">Occupancy</dt><dd className="mt-1 text-sm font-semibold text-[#1A1A1A]">{room.minimumOccupancy !== null && room.maximumOccupancy !== null ? `${room.minimumOccupancy}–${room.maximumOccupancy}` : room.maximumOccupancy !== null ? `Up to ${room.maximumOccupancy}` : `At least ${room.minimumOccupancy}`}</dd></div> : null}</dl>
                <Link href={`/accommodation/property/${property.slug}`} className="mt-7 inline-flex font-bold text-[#00319D] underline-offset-4 hover:underline">View full property details</Link>
              </div>
            </section>

            <aside className="h-fit rounded-3xl border border-[#E8E6E1] bg-white p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 className="font-heading text-lg font-extrabold text-[#1A1A1A]">Room information</h2>
              <RoomTerms room={room} />
              <div className="mt-5">
                {property.amenities.length ? <div className="mt-7 border-t border-[#E8E6E1] pt-6"><h2 className="font-heading text-xl font-extrabold text-[#1A1A1A]">Property facilities</h2><ul className="mt-3 grid gap-2 sm:grid-cols-2">{property.amenities.map((amenity) => <li key={amenity} className="flex items-start gap-2 text-sm text-[#4C4A45]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FCC20A]" />{amenity}</li>)}</ul></div> : null}
                {property.contractTerms.length ? <div className="mt-7 border-t border-[#E8E6E1] pt-6"><h2 className="font-heading text-xl font-extrabold text-[#1A1A1A]">Property terms and practical details</h2><ul className="mt-3 grid gap-2">{property.contractTerms.map((term) => <li key={term} className="flex items-start gap-2 text-sm text-[#4C4A45]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C9783E]" />{term}</li>)}</ul></div> : null}
                {!featureGroups.length && !room.features?.length && !room.description ? <p className="mt-4 text-sm text-[#6B6860]">Ask an advisor to confirm the layout and features of this room.</p> : null}
                {featureGroups.length || room.features?.length ? <div className="mt-7 border-t border-[#E8E6E1] pt-6"><h2 className="font-heading text-xl font-extrabold text-[#1A1A1A]">Room features</h2>{featureGroups.length ? <div className="mt-4 grid gap-5 sm:grid-cols-2">{featureGroups.map((group) => <div key={group.label}><h3 className="text-sm font-bold text-[#1A1A1A]">{group.label}</h3><ul className="mt-2 space-y-2">{group.values?.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm text-[#4C4A45]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C9783E]" />{feature}</li>)}</ul></div>)}</div> : <ul className="mt-3 grid gap-2 sm:grid-cols-2">{room.features?.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm text-[#4C4A45]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C9783E]" />{feature}</li>)}</ul>}</div> : null}
              </div>
              <div className="mt-5"><SaveRoomButton roomSlug={slug} isAuthenticated={Boolean(user)} /></div>
              <Link href={`/get-matched?room=${encodeURIComponent(slug)}#matching-form`} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#00319D] px-5 py-3 text-sm font-bold text-white hover:bg-[#00277D]">Ask HearthAway about this room</Link>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

