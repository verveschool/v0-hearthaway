import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { RequestRoomBookingForm, SaveRoomButton } from '@/components/account/forms'
import { createClient } from '@/lib/supabase/server'
import { getAccommodationRoomBySlug, formatSourceAvailability, formatSourcePrice } from '@/app/accommodation/listing-data'

type RoomPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getAccommodationRoomBySlug(slug)
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
  const entry = getAccommodationRoomBySlug(slug)
  if (!entry) notFound()
  const { property, room } = entry
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F6F3] pb-16 pt-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link href="/accommodation/rooms" className="inline-flex items-center gap-2 text-sm font-bold text-[#00319D] underline-offset-4 hover:underline">Available Rooms</Link>
          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.7fr)]">
            <section className="overflow-hidden rounded-3xl border border-[#E8E6E1] bg-white">
              {room.image ? <img src={room.image} alt={`${room.name} room at ${property.name}`} className="aspect-[16/9] w-full bg-[#F1F0EC] object-cover" fetchPriority="high" decoding="async" /> : property.coverImage ? <img src={property.coverImage} alt={`${property.name} student property`} className="aspect-[16/9] w-full bg-[#F1F0EC] object-cover" fetchPriority="high" decoding="async" /> : <div aria-hidden="true" className="aspect-[16/9] bg-[#F1F0EC]" />}
              <div className="p-6 sm:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#F7F6F3] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#00319D]">{property.provider === 'vita-student' ? 'Vita Student' : 'Stacey'}</span>
                  <span className="text-sm text-[#6B6860]">{property.city}{property.country ? `, ${property.country}` : ''}</span>
                </div>
                <h1 className="mt-4 font-heading text-3xl font-extrabold text-[#1A1A1A] sm:text-4xl">{room.name}</h1>
                <p className="mt-2 text-lg font-semibold text-[#00319D]">{property.name}</p>
                {property.description ? <p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#4C4A45]">{property.description}</p> : <p className="mt-5 text-sm leading-7 text-[#6B6860]">Room and property information shown here is limited to the current partner source.</p>}
                {property.inclusions.length ? <div className="mt-7 border-t border-[#E8E6E1] pt-6"><h2 className="font-heading text-xl font-extrabold text-[#1A1A1A]">Source-listed inclusions</h2><ul className="mt-3 grid gap-2 sm:grid-cols-2">{property.inclusions.map((inclusion) => <li key={inclusion} className="flex items-start gap-2 text-sm text-[#4C4A45]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FCC20A]" />{inclusion}</li>)}</ul></div> : null}
                <Link href={`/accommodation/property/${property.slug}`} className="mt-7 inline-flex font-bold text-[#00319D] underline-offset-4 hover:underline">View full property details</Link>
              </div>
            </section>

            <aside className="h-fit rounded-3xl border border-[#E8E6E1] bg-white p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 className="font-heading text-lg font-extrabold text-[#1A1A1A]">Room information</h2>
              <dl className="mt-5 divide-y divide-[#E8E6E1]">
                <div className="py-4"><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Price</dt><dd className="mt-1 font-heading text-2xl font-extrabold text-[#00319D]">{room.priceLabel ?? (room.priceFrom !== null ? `From ${formatSourcePrice(room.priceFrom)}` : room.pricePerNight !== null ? `From ${formatSourcePrice(room.pricePerNight)} per night` : 'Not provided')}</dd></div>
                <div className="py-4"><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Availability</dt><dd className="mt-1 font-semibold text-[#1A1A1A]">{room.status ?? (room.available !== null ? formatSourceAvailability(room.available) : 'Not provided')}</dd></div>
                {room.academicYear ? <div className="py-4"><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Academic year</dt><dd className="mt-1 text-sm font-semibold text-[#1A1A1A]">{room.academicYear}</dd></div> : null}
                {room.minimumOccupancy !== null || room.maximumOccupancy !== null ? <div className="py-4"><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Occupancy</dt><dd className="mt-1 text-sm font-semibold text-[#1A1A1A]">{room.minimumOccupancy ?? 'Not specified'}–{room.maximumOccupancy ?? 'Not specified'}</dd></div> : null}
              </dl>
              <p className="mt-4 rounded-xl bg-[#F7F6F3] p-4 text-xs leading-relaxed text-[#6B6860]">Prices, currency, billing period and availability can change. Ask an advisor to confirm the current terms before booking.</p>
              <div className="mt-5"><SaveRoomButton roomSlug={slug} isAuthenticated={Boolean(user)} /></div>
              <div className="mt-6 border-t border-[#E8E6E1] pt-6">
                <h2 className="font-heading text-xl font-extrabold text-[#1A1A1A]">Request a booking</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">Send a request to your advisor. This does not reserve or charge for the room.</p>
                <div className="mt-4"><RequestRoomBookingForm roomSlug={slug} isAuthenticated={Boolean(user)} /></div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
