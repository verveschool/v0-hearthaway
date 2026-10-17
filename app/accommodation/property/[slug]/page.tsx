import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import PropertyEnquiryModal from '@/components/accommodation/property-enquiry-modal'
import { getUniversitiesByCity } from '@/lib/place-data'
import { accommodationListings, formatSourceAvailability, formatSourcePrice } from '../../listing-data'

export function generateStaticParams() {
  return accommodationListings.map((property) => ({ slug: property.slug }))
}

type PropertyPageProps = {
  params: Promise<{ slug: string }>
}

function getProperty(slug: string) {
  return accommodationListings.find((property) => property.slug === slug)
}

function getDisplayAddress(property: (typeof accommodationListings)[number]): string {
  const parts = [property.address].filter((part): part is string => Boolean(part))
  const currentAddress = parts.join(', ').toLocaleLowerCase()
  if (!currentAddress.includes(property.city.toLocaleLowerCase())) parts.push(property.city)
  if (property.country && !currentAddress.includes(property.country.toLocaleLowerCase())) parts.push(property.country)
  return parts.join(', ')
}

function hasExplicitDistance(text: string): boolean {
  return /\b\d+(?:\.\d+)?\s*(?:mi|miles?|km|kilomet(?:er|re)s?|minutes?|mins?|met(?:er|re)s?)\b|\b(?:a|one|two|three|four|five|six|ten|fifteen|twenty|half an)\s+(?:mile|kilomet(?:er|re)|minute|met(?:er|re))\b/i.test(text)
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = getProperty(slug)
  if (!property) return { title: 'Accommodation | HearthAway' }

  const title = `${property.name} student accommodation in ${property.city} | HearthAway`
  const description = property.description ?? `Compare room types, prices and availability at ${property.name} in ${property.city}. Get help from HearthAway before you book.`
  const images = [...property.gallery, ...property.roomTypes.flatMap((room) => room.image ? [room.image] : [])]

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(images.length ? { images: [{ url: images[0], alt: `${property.name} student accommodation` }] } : {}),
    },
  }
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
      <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A] sm:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = getProperty(slug)
  if (!property) notFound()

  const gallery = [...new Set([
    ...property.gallery,
    ...property.roomTypes.flatMap((room) => room.image ? [room.image] : []),
  ])]
  const mapQuery = getDisplayAddress(property)
  const cityUniversities = getUniversitiesByCity(property.city)
  const mentionedUniversityNames = cityUniversities
    .filter((university) => property.description?.toLocaleLowerCase().includes(university.name.toLocaleLowerCase()))
    .map((university) => university.name)
  const universityNames = [...new Set([...property.universities, ...mentionedUniversityNames])]
  const universities = universityNames.map((name) => {
    const match = cityUniversities.find((university) => university.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    return { name, href: match ? `/universities/${match.slug}` : null }
  })
  const sourceLocationSentences = (property.description ?? '')
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => hasExplicitDistance(sentence) && universityNames.some((name) => sentence.toLocaleLowerCase().includes(name.toLocaleLowerCase())))
  const locationNotes = [...new Set([
    ...(property.distance && hasExplicitDistance(property.distance) ? [property.distance] : []),
    ...sourceLocationSentences,
  ])]
  const buildingsWithAvailability = property.buildings.filter((building) => building.unitsAvailable !== null)
  const sourceNotice = 'Prices and availability are shown as supplied by the source. The source does not specify a price currency or billing period.'

  return (
    <>
      <Navigation />
      <main className="bg-[#F7F6F3]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
          <Link href="/accommodation" className="inline-flex min-h-10 w-fit items-center gap-2 text-sm font-bold text-[#00319D] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]">
            <ArrowLeft aria-hidden="true" className="size-4" /> All accommodation
          </Link>

          <header className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.45fr)] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#00319D]">{[property.city, property.country].filter(Boolean).join(', ')}</p>
              <h1 className="mt-2 font-heading text-3xl font-extrabold leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">{property.name}</h1>
              {property.address ? (
                <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-[#6B6860] sm:text-base">
                  <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#00319D]" />
                  <span>{getDisplayAddress(property)}</span>
                </p>
              ) : null}
            </div>
            <div className="rounded-2xl bg-[#00319D] p-5 text-white sm:p-6">
              <p className="text-sm leading-relaxed text-white/80">Want to ask a question or see the property before deciding?</p>
              <div className="mt-4"><PropertyEnquiryModal propertyName={property.name} /></div>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)]">
            <div className="flex flex-col gap-6">
              <Section id="overview" title="Property overview">
                {property.description ? <p className="whitespace-pre-line text-sm leading-7 text-[#4C4A45] sm:text-base">{property.description}</p> : <p className="text-sm leading-relaxed text-[#6B6860]">Explore the room options and practical details currently available for this property.</p>}
                {gallery.length ? (
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {gallery.map((image, index) => {
                      const roomName = property.roomTypes.find((room) => room.image === image)?.name
                      return (
                        <figure key={`${image}-${index}`} className={`${index === 0 ? 'col-span-2 row-span-2' : ''} overflow-hidden rounded-xl bg-[#F7F6F3]`}>
                          <img
                            src={image}
                            alt={roomName ? `${roomName} at ${property.name}` : `${property.name} ${index === 0 ? 'property photo' : `photo ${index + 1}`}`}
                            className={`${index === 0 ? 'aspect-[4/3] h-full' : 'aspect-[4/3]'} w-full object-cover`}
                            loading={index < 2 ? 'eager' : 'lazy'}
                            decoding="async"
                          />
                          {roomName ? <figcaption className="px-3 py-2 text-xs font-semibold text-[#4C4A45]">{roomName} room</figcaption> : null}
                        </figure>
                      )
                    })}
                  </div>
                ) : null}
              </Section>

              <Section id="rooms" title="Room types and pricing">
                {property.roomTypes.length ? (
                  <>
                    <p className="text-sm leading-relaxed text-[#6B6860]">{sourceNotice}</p>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      {property.roomTypes.map((room) => (
                        <article key={room.name} className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
                          {room.image ? (
                            <img src={room.image} alt={`${room.name} at ${property.name}`} className="aspect-[16/10] w-full bg-[#F7F6F3] object-cover" loading="lazy" decoding="async" />
                          ) : (
                            <div className="flex aspect-[16/10] items-center justify-center bg-[#F7F6F3] px-4 text-center text-sm text-[#6B6860]">No room image provided for this type</div>
                          )}
                          <div className="p-5">
                            <h3 className="font-heading text-lg font-extrabold text-[#1A1A1A]">{room.name}</h3>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                              <div className="rounded-lg bg-[#F7F6F3] p-3">
                                <p className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Starting price</p>
                                <p className="mt-1 font-heading text-xl font-extrabold text-[#00319D]">{room.priceFrom === null ? 'Not provided' : formatSourcePrice(room.priceFrom)}</p>
                              </div>
                              <div className="rounded-lg bg-[#F7F6F3] p-3">
                                <p className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Availability</p>
                                <p className="mt-1 text-sm font-bold text-[#1A1A1A]">{room.available === null ? 'Not provided' : formatSourceAvailability(room.available)}</p>
                              </div>
                            </div>
                            {room.minimumOccupancy !== null || room.maximumOccupancy !== null ? (
                              <p className="mt-3 text-sm text-[#4C4A45]">
                                Occupancy: {room.minimumOccupancy ?? 'Not specified'}–{room.maximumOccupancy ?? 'Not specified'}
                              </p>
                            ) : null}
                            {room.academicYear ? <p className="mt-2 text-sm text-[#4C4A45]">Academic year: {room.academicYear}</p> : null}
                            {property.roomFeatures.length ? (
                              <ul className="mt-4 flex flex-col gap-2 border-t border-[#E8E6E1] pt-4">
                                {property.roomFeatures.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm text-[#4C4A45]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FCC20A]" />{feature}</li>)}
                              </ul>
                            ) : null}
                          </div>
                        </article>
                      ))}
                    </div>
                  </>
                ) : <p className="text-sm text-[#6B6860]">Room types have not been provided for this property.</p>}
              </Section>

              {property.amenities.length || property.inclusions.length ? (
                <Section id="amenities" title="Amenities and inclusions">
                  {property.amenities.length ? (
                    <>
                      <h3 className="font-semibold text-[#1A1A1A]">Facilities and amenities</h3>
                      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                        {property.amenities.map((amenity) => <li key={amenity} className="flex items-start gap-2 text-sm leading-relaxed text-[#4C4A45]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FCC20A]" />{amenity}</li>)}
                      </ul>
                    </>
                  ) : null}
                  {property.inclusions.length ? (
                    <div className={property.amenities.length ? 'mt-6 border-t border-[#E8E6E1] pt-5' : ''}>
                      <h3 className="font-semibold text-[#1A1A1A]">Included services</h3>
                      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                        {property.inclusions.map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#4C4A45]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FCC20A]" />{item}</li>)}
                      </ul>
                    </div>
                  ) : null}
                </Section>
              ) : null}

              <Section id="location" title="Location">
                {property.address ? <p className="flex items-start gap-2 text-sm leading-relaxed text-[#4C4A45]"><MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#00319D]" />{getDisplayAddress(property)}</p> : <p className="text-sm text-[#4C4A45]">{property.city}{property.country ? `, ${property.country}` : ''}</p>}
                {mapQuery ? (
                  <div className="mt-4 overflow-hidden rounded-xl border border-[#E8E6E1]">
                    <iframe
                      title={`Map for ${property.name}`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                      className="h-64 w-full border-0 sm:h-80"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="border-t border-[#E8E6E1] px-4 py-3">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#00319D] underline-offset-4 hover:underline">Open map in a new tab</a>
                    </div>
                  </div>
                ) : null}
                {universities.length || locationNotes.length ? (
                  <div className="mt-6">
                    {universities.length ? (
                      <>
                        <h3 className="font-semibold text-[#1A1A1A]">Nearby universities</h3>
                        <ul className="mt-3 flex flex-col gap-2">
                          {universities.map((university) => (
                            <li key={university.name}>
                              {university.href ? <Link href={university.href} className="text-sm font-semibold text-[#00319D] underline-offset-4 hover:underline">{university.name}</Link> : <span className="text-sm text-[#4C4A45]">{university.name}</span>}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                    {locationNotes.map((note) => <p key={note} className="mt-4 text-sm leading-relaxed text-[#6B6860]">Distance information from the source: {note}</p>)}
                  </div>
                ) : null}
              </Section>

              {property.contractTerms.length || property.depositNote || property.roomTypes.some((room) => room.priceFrom !== null) ? (
                <Section id="booking" title="Booking information">
                  {property.contractTerms.length ? <ul className="flex flex-col gap-2">{property.contractTerms.map((term) => <li key={term} className="text-sm leading-relaxed text-[#4C4A45]">{term}</li>)}</ul> : null}
                  {property.depositNote ? <p className="mt-3 text-sm leading-relaxed text-[#4C4A45]">{property.depositNote}</p> : null}
                  <p className="mt-3 text-sm leading-relaxed text-[#6B6860]">Before booking, confirm the current price, currency, billing period, contract length, availability, any additional costs and required documents with a HearthAway advisor.</p>
                </Section>
              ) : null}

              {buildingsWithAvailability.length ? (
                <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
                  <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">Building availability</h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {buildingsWithAvailability.map((building, index) => <li key={`${building.name ?? 'building'}-${index}`} className="flex items-center justify-between gap-4 text-sm"><span className="font-medium text-[#4C4A45]">{building.name ?? `Building ${index + 1}`}</span><span className="font-bold text-[#00319D]">{building.unitsAvailable === null ? 'Not provided' : formatSourceAvailability(building.unitsAvailable)}</span></li>)}
                  </ul>
                </div>
              ) : null}
            </div>

            <aside className="h-fit lg:sticky lg:top-28">
              <nav aria-label="On this page" className="rounded-2xl border border-[#E8E6E1] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B6860]">On this page</p>
                <ul className="mt-3 flex flex-col gap-2 text-sm font-semibold">
                  {[
                    ['overview', 'Property overview'],
                    ['rooms', 'Room types and pricing'],
                    ...(property.amenities.length || property.inclusions.length ? [['amenities', 'Amenities and inclusions']] : []),
                    ['location', 'Location'],
                    ...(property.contractTerms.length || property.depositNote || property.roomTypes.some((room) => room.priceFrom !== null) ? [['booking', 'Booking information']] : []),
                  ].map(([id, label]) => <li key={id}><a href={`#${id}`} className="text-[#00319D] underline-offset-4 hover:underline">{label}</a></li>)}
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
