import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { accommodationCities, accommodationRoomListings, formatSourceAvailability, formatSourcePrice } from '@/app/accommodation/listing-data'

export const metadata: Metadata = {
  title: 'Browse Student Room Types | HearthAway',
  description: 'Browse room types from the current Vita Student and Stacey accommodation inventory.',
}

type RoomsPageProps = {
  searchParams: Promise<{ city?: string; query?: string }>
}

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
  const { city = '', query = '' } = await searchParams
  const normalizedQuery = query.trim().slice(0, 100).toLocaleLowerCase()
  const selectedCity = accommodationCities.includes(city) ? city : ''
  const rooms = accommodationRoomListings.filter(({ property, room }) => {
    if (selectedCity && property.city !== selectedCity) return false
    if (!normalizedQuery) return true
    return [room.name, property.name, property.city, property.country ?? '', property.provider].join(' ').toLocaleLowerCase().includes(normalizedQuery)
  })

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F6F3] pb-16 pt-28">
        <header className="bg-[#00319D] px-5 py-12 text-white sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FCC20A]">Current partner inventory</p>
            <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Browse individual room types</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">Explore the live Vita Student and Stacey room inventory. Prices, availability and details are shown only when provided by the source.</p>
          </div>
        </header>

        <section aria-label="Room inventory" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
          <form method="get" className="grid gap-3 rounded-2xl border border-[#E8E6E1] bg-white p-4 sm:grid-cols-[minmax(0,1fr)_220px_auto] sm:items-end sm:p-5">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
              <span>Search rooms</span>
              <input name="query" defaultValue={query} placeholder="Room, property, city or provider" className="min-h-11 rounded-xl border border-[#D8D5CE] px-3 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
              <span>City</span>
              <select name="city" defaultValue={selectedCity} className="min-h-11 rounded-xl border border-[#D8D5CE] bg-white px-3 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]">
                <option value="">All cities</option>
                {accommodationCities.map((availableCity) => <option key={availableCity} value={availableCity}>{availableCity}</option>)}
              </select>
            </label>
            <div className="flex gap-2">
              <button type="submit" className="min-h-11 flex-1 rounded-xl bg-[#00319D] px-5 py-2 text-sm font-bold text-white hover:bg-[#00277D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]">Search</button>
              <Link href="/accommodation/rooms" className="inline-flex min-h-11 items-center rounded-xl border border-[#D8D5CE] px-4 py-2 text-sm font-semibold text-[#00319D] hover:bg-[#F7F6F3]">Clear</Link>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-sm text-[#6B6860]">{rooms.length} room {rooms.length === 1 ? 'type' : 'types'}</p>
            <Link href="/accommodation" className="text-sm font-bold text-[#00319D] underline-offset-4 hover:underline">View all properties</Link>
          </div>

          {rooms.length ? <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {rooms.map(({ slug, property, room }) => <article key={slug} className="overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white transition-shadow hover:shadow-md">
              <Link href={`/accommodation/rooms/${slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00319D]">
                {room.image || property.coverImage ? <img src={room.image ?? property.coverImage ?? ''} alt={`${room.name} room at ${property.name}`} className="aspect-[4/3] w-full bg-[#F1F0EC] object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" decoding="async" /> : <div aria-hidden="true" className="aspect-[4/3] bg-[#F1F0EC]" />}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#F7F6F3] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#00319D]">{property.provider === 'vita-student' ? 'Vita Student' : 'Stacey'}</span>
                    <span className="text-xs text-[#6B6860]">{property.city}</span>
                  </div>
                  <h2 className="mt-4 font-heading text-xl font-extrabold text-[#1A1A1A] group-hover:text-[#00319D]">{room.name}</h2>
                  <p className="mt-1 text-sm text-[#6B6860]">{property.name}</p>
                  <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#E8E6E1] pt-4">
                    <div><p className="text-[11px] font-bold uppercase tracking-wide text-[#6B6860]">Price</p><p className="mt-1 text-sm font-bold text-[#00319D]">{room.priceLabel ?? (room.priceFrom !== null ? `From ${formatSourcePrice(room.priceFrom)}` : room.pricePerNight !== null ? `From ${formatSourcePrice(room.pricePerNight)} per night` : 'Not provided')}</p></div>
                    <div className="text-right"><p className="text-[11px] font-bold uppercase tracking-wide text-[#6B6860]">Availability</p><p className="mt-1 text-sm font-semibold text-[#333333]">{room.status ?? (room.available !== null ? formatSourceAvailability(room.available) : 'Not provided')}</p></div>
                  </div>
                </div>
              </Link>
            </article>)}
          </div> : <div className="mt-5 rounded-2xl border border-[#E8E6E1] bg-white p-8 text-center">
            <h2 className="font-heading text-xl font-extrabold text-[#1A1A1A]">No room types match those filters</h2>
            <p className="mt-2 text-sm text-[#6B6860]">Try another city or search term.</p>
          </div>}
        </section>
      </main>
      <Footer />
    </>
  )
}
