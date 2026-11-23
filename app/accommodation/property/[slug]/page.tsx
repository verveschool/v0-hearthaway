import { catalogueDatabaseEnabled, catalogueProperty } from '../../catalogue-server'

import CatalogueImage from '@/components/accommodation/catalogue-image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Building2, MapPin } from 'lucide-react'
import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import Footer from '@/components/footer'
import { getUniversitiesByCity } from '@/lib/place-data'
import {
  accommodationListings,
  getAccommodationRoomSlug,
} from '../../listing-data'
import { PRICE_AVAILABILITY_NOTICE } from '../../presentation'

export function generateStaticParams() {
  return accommodationListings.map((property) => ({ slug: property.slug }))
}

type PropertyPageProps = {
  params: Promise<{ slug: string }>
}

async function getProperty(slug: string) {
  if (catalogueDatabaseEnabled()) return catalogueProperty(slug)
  return accommodationListings.find((property) => property.slug === slug)
}

function getPropertyImages(property: (typeof accommodationListings)[number]): string[] {
  return [
    ...new Set([
      ...(property.coverImage ? [property.coverImage] : []),
      ...property.gallery,
      ...property.roomTypes.flatMap((room) => room.images),
    ]),
  ]
}

function getDisplayAddress(property: (typeof accommodationListings)[number]): string {
  const parts = [property.address].filter((part): part is string => Boolean(part))
  const currentAddress = parts.join(', ').toLocaleLowerCase()

  if (!currentAddress.includes(property.city.toLocaleLowerCase())) {
    parts.push(property.city)
  }

  if (
    property.country &&
    !currentAddress.includes(property.country.toLocaleLowerCase())
  ) {
    parts.push(property.country)
  }

  return parts.join(', ')
}

function hasExplicitDistance(text: string): boolean {
  return /\b\d+(?:\.\d+)?\s*(?:mi|miles?|km|kilomet(?:er|re)s?|minutes?|mins?|met(?:er|re)s?)\b|\b(?:a|one|two|three|four|five|six|ten|fifteen|twenty|half an)\s+(?:mile|kilomet(?:er|re)|minute|met(?:er|re))\b/i.test(
    text
  )
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = await getProperty(slug)

  if (!property) {
    return { title: 'Accommodation | HearthAway' }
  }

  const title = `${property.name} student accommodation in ${property.city} | HearthAway`
  const description =
    property.description ??
    `Compare room types, prices and property details at ${property.name} in ${property.city}. Get help from HearthAway before you book.`
  const images = getPropertyImages(property)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(images.length
        ? {
            images: [
              {
                url: images[0],
                alt: `${property.name} student accommodation`,
              },
            ],
          }
        : {}),
    },
  }
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8"
    >
      <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A] sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default async function PropertyDetailPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params
  const property = await getProperty(slug)

  if (!property) notFound()

  const gallery = getPropertyImages(property)
  const primaryImage = gallery[0] ?? null

  const primaryImageRoom = primaryImage
    ? property.roomTypes.find((room) => room.images.includes(primaryImage))?.name ?? null
    : null

  const additionalImages = gallery.slice(1)
  const mapQuery = getDisplayAddress(property)
  const cityUniversities = getUniversitiesByCity(property.city)

  const mentionedUniversityNames = cityUniversities
    .filter((university) =>
      property.description
        ?.toLocaleLowerCase()
        .includes(university.name.toLocaleLowerCase())
    )
    .map((university) => university.name)

  const universityNames = [
    ...new Set([...property.universities, ...mentionedUniversityNames]),
  ]

  const universities = universityNames.map((name) => {
    const match = cityUniversities.find(
      (university) =>
        university.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    )

    return {
      name,
      href: match ? `/universities/${match.slug}` : null,
    }
  })

  const sourceLocationSentences = (property.description ?? '')
    .split(/(?<=[.!?])\s+/)
    .filter(
      (sentence) =>
        hasExplicitDistance(sentence) &&
        universityNames.some((name) =>
          sentence.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        )
    )

  const locationNotes = [
    ...new Set([
      ...(property.distance && hasExplicitDistance(property.distance)
        ? [property.distance]
        : []),
      ...sourceLocationSentences,
    ]),
  ]

  const pageLinks = [
    ['overview', 'Property overview'],
    ['rooms', 'Room types and pricing'],
    ...(property.amenities.length || property.inclusions.length || property.contractTerms.length
      ? [['amenities', 'Amenities and inclusions']]
      : []),
    ...(property.policies?.length || property.contractTerms.length
      ? [['policies', 'Policies and contract information']]
      : []),
    ['location', 'Location'],
  ]

  return (
    <>
      <Navigation />

      <main className="bg-[#F7F6F3]">
        <PageBanner title={property.name} />
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-6 lg:px-8 lg:py-12">

          {/* Back navigation */}
          <Link
            href="/accommodation"
            className="inline-flex min-h-10 w-fit items-center gap-2 text-sm font-bold text-[#00319D] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All properties
          </Link>

          {/* Property location and price */}
          <header>
            <p className="text-sm font-semibold text-[#00319D]">
              {[property.city, property.country].filter(Boolean).join(', ')}
            </p>

            <p className="mt-3 text-lg font-bold text-[#00319D]">From {property.propertyPriceLabel}</p>

            {property.address ? (
              <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-[#6B6860] sm:text-base">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-[#00319D]"
                />
                <span>{getDisplayAddress(property)}</span>
              </p>
            ) : null}
          </header>

          {/* Primary property image */}
          {primaryImage ? (
            <figure className="overflow-hidden rounded-2xl bg-[#E8E6E1]">
              <CatalogueImage
                src={primaryImage}
                alt={
                  primaryImageRoom
                    ? `${primaryImageRoom} room at ${property.name}`
                    : `${property.name} property photo`
                }
                className="aspect-[16/8] max-h-[560px] w-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          ) : (
            <div className="flex aspect-[16/8] max-h-[560px] flex-col items-center justify-center gap-3 rounded-2xl bg-[#E8E6E1] text-[#6B6860]">
              <Building2 aria-hidden="true" className="size-12" />
              <p className="text-sm font-semibold">
                Property photos coming soon.
              </p>
            </div>
          )}

          {/* Property content and sticky sidebar */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)]">

            {/* Main property content */}
            <div className="flex flex-col gap-6">

              {/* Property overview */}
              <Section id="overview" title="Property overview">
                {property.description ? (
                  <p className="whitespace-pre-line text-sm leading-7 text-[#4C4A45] sm:text-base">
                    {property.description}
                  </p>
                ) : (
                  <p className="text-sm leading-relaxed text-[#6B6860]">
                    Explore the room options and practical details for this property.
                  </p>
                )}

                {property.highlights?.length ? <ul className="mt-5 grid gap-2 sm:grid-cols-2">{property.highlights.map((highlight) => <li key={highlight} className="rounded-xl bg-[#F7F6F3] px-4 py-3 text-sm font-semibold text-[#1A1A1A]">{highlight}</li>)}</ul> : null}

                {additionalImages.length ? (
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {additionalImages.map((image, index) => {
                      const room = property.roomTypes.find((roomType) =>
                        roomType.images.includes(image)
                      )

                      const photoLabel = room
                        ? room.imageLabels?.[image] ?? `${room.name} room${room.priceLabel ? ` · ${room.priceLabel}` : ''}`
                        : property.galleryLabels?.[image] ??
                          `${property.name} property photo`

                      return (
                        <figure
                          key={`${image}-${index}`}
                          className={`${index === 0 ? 'col-span-2 row-span-2' : ''} overflow-hidden rounded-xl bg-[#F7F6F3]`}
                        >
                          <CatalogueImage
                            src={image}
                            alt={
                              room
                                ? `${photoLabel} at ${property.name}`
                                : photoLabel
                            }
                            className={`${index === 0 ? 'aspect-[4/3] h-full' : 'aspect-[4/3]'} w-full object-cover`}
                            loading="lazy"
                            decoding="async"
                          />

                          {index > 0 ? (
                            <figcaption className="px-3 py-2 text-xs font-semibold text-[#4C4A45]">
                              {photoLabel}
                            </figcaption>
                          ) : null}
                        </figure>
                      )
                    })}
                  </div>
                ) : null}
              </Section>

              {/* Room types and pricing */}
              <Section id="rooms" title="Room types and pricing">
                {property.roomTypes.length ? (
                  <>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      {property.roomTypes.map((room) => (
                        <article
                          key={room.catalogueId ?? room.name}
                          className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white"
                        >
                          {room.image ? (
                            <CatalogueImage
                              src={room.image}
                              alt={`${room.name} sample suite at ${property.name}`}
                              className="aspect-[16/10] w-full bg-[#F7F6F3] object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="flex aspect-[16/10] items-center justify-center bg-[#F7F6F3] px-4 text-center text-sm text-[#6B6860]">
                              Room photos coming soon
                            </div>
                          )}

                          <div className="p-5">
                            <h3 className="font-heading text-lg font-extrabold text-[#1A1A1A]">
                              {room.name}
                            </h3>

                            <Link
                              href={`/accommodation/rooms/${room.catalogueSlug ?? getAccommodationRoomSlug(property.slug, room.name)}`}
                              className="mt-1 inline-flex text-sm font-semibold text-[#00319D] underline-offset-4 hover:underline"
                            >
                              View room details
                            </Link>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                              <div className="rounded-lg bg-[#F7F6F3] p-3">
                                <p className="text-xs font-bold tracking-wide text-[#6B6860]">Price</p>
                                <p className="mt-1 font-heading text-xl font-extrabold text-[#00319D]">{room.priceLabel}</p>
                              </div>

                              <div className="rounded-lg bg-[#F7F6F3] p-3">
                                <p className="mt-2 text-xs leading-relaxed text-[#6B6860]">{PRICE_AVAILABILITY_NOTICE}</p>
                              </div>
                            </div>


                            {room.minimumOccupancy !== null ||
                            room.maximumOccupancy !== null ? (
                              <p className="mt-3 text-sm text-[#4C4A45]">
                                Occupancy:{' '}
                                {room.minimumOccupancy !== null &&
                                room.maximumOccupancy !== null
                                  ? `${room.minimumOccupancy}–${room.maximumOccupancy}`
                                  : room.maximumOccupancy !== null
                                    ? `Up to ${room.maximumOccupancy}`
                                    : `At least ${room.minimumOccupancy}`}
                              </p>
                            ) : null}

                            {room.features?.length ? (
                              <ul className="mt-3 flex flex-col gap-2 border-t border-[#E8E6E1] pt-3">
                                {room.features.map((feature) => (
                                  <li key={feature} className="flex items-start gap-2 text-sm text-[#4C4A45]">
                                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C9783E]" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            ) : null}


                          </div>
                        </article>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl bg-[#F7F6F3] p-4">
                    <p className="text-sm text-[#6B6860]">Room categories have not been published for this property.</p>
                    <p className="mt-3 text-xs leading-relaxed text-[#6B6860]">{PRICE_AVAILABILITY_NOTICE}</p>
                  </div>
                )}
              </Section>

              {/* Property-specific comparison CTA */}
              <section className="flex flex-col gap-5 rounded-2xl bg-[#00319D] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <p className="text-sm leading-relaxed text-white/80">
                    Want help comparing this property with your study plans?
                  </p>
                </div>
                <Link href="/get-matched" className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center rounded-xl bg-[#FEBB01] px-5 py-3 text-sm font-bold text-[#171717]">Ask HearthAway</Link>
              </section>

              {/* Amenities and inclusions */}
              {property.amenities.length || property.inclusions.length || property.contractTerms.length ? (
                <Section id="amenities" title="Amenities and inclusions">
                  {property.amenities.length ? (
                    <>
                      <h3 className="font-semibold text-[#1A1A1A]">
                        Facilities and amenities
                      </h3>

                      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                        {property.amenities.map((amenity) => (
                          <li
                            key={amenity}
                            className="flex items-start gap-2 text-sm leading-relaxed text-[#4C4A45]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FCC20A]"
                            />
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {property.inclusions.length ? (
                    <div
                      className={
                        property.amenities.length
                          ? 'mt-6 border-t border-[#E8E6E1] pt-5'
                          : ''
                      }
                    >
                      <h3 className="font-semibold text-[#1A1A1A]">
                        Included services
                      </h3>

                      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                        {property.inclusions.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm leading-relaxed text-[#4C4A45]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FCC20A]"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {property.contractTerms.length ? (
                    <div className="mt-6 border-t border-[#E8E6E1] pt-5">
                      <h3 className="font-semibold text-[#1A1A1A]">Lease terms</h3>
                      <ul className="mt-3 grid gap-3">
                        {property.contractTerms.map((term) => (
                          <li key={term} className="flex items-start gap-2 text-sm leading-relaxed text-[#4C4A45]">
                            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FCC20A]" />
                            {term}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </Section>
              ) : null}

              {property.policies?.length || property.contractTerms.length ? (
                <Section id="policies" title="Policies and contract information">
                  {property.contractTerms.length ? <div><h3 className="font-semibold text-[#1A1A1A]">Contract terms</h3><ul className="mt-3 grid gap-2 sm:grid-cols-2">{property.contractTerms.map((term) => <li key={term} className="text-sm leading-relaxed text-[#4C4A45]">{term}</li>)}</ul></div> : null}
                  {property.policies?.length ? <div className="mt-5"><h3 className="font-semibold text-[#1A1A1A]">Property policies</h3><ul className="mt-3 grid gap-2">{property.policies.map((policy) => <li key={policy} className="text-sm leading-relaxed text-[#4C4A45]">{policy}</li>)}</ul></div> : null}
                </Section>
              ) : null}

              {/* Location */}
              <Section id="location" title="Location">
                {property.address ? (
                  <p className="flex items-start gap-2 text-sm leading-relaxed text-[#4C4A45]">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-[#00319D]"
                    />
                    {getDisplayAddress(property)}
                  </p>
                ) : (
                  <p className="text-sm text-[#4C4A45]">
                    {property.city}
                    {property.country ? `, ${property.country}` : ''}
                  </p>
                )}

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
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#00319D] underline-offset-4 hover:underline"
                      >
                        Open map in a new tab
                      </a>
                    </div>
                  </div>
                ) : null}

                {universities.length || locationNotes.length ? (
                  <div className="mt-6">
                    {universities.length ? (
                      <>
                        <h3 className="font-semibold text-[#1A1A1A]">
                          Nearby universities
                        </h3>

                        <ul className="mt-3 flex flex-col gap-2">
                          {universities.map((university) => (
                            <li key={university.name}>
                              {university.href ? (
                                <Link
                                  href={university.href}
                                  className="text-sm font-semibold text-[#00319D] underline-offset-4 hover:underline"
                                >
                                  {university.name}
                                </Link>
                              ) : (
                                <span className="text-sm text-[#4C4A45]">
                                  {university.name}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    {locationNotes.map((note) => (
                      <p
                        key={note}
                        className="mt-4 text-sm leading-relaxed text-[#6B6860]"
                      >
                        Distance information from the source: {note}
                      </p>
                    ))}
                  </div>
                ) : null}
                {property.transportConnections?.length ? <div className="mt-6"><h3 className="font-semibold text-[#1A1A1A]">Transport connections</h3><ul className="mt-3 grid gap-2">{property.transportConnections.map((item) => <li key={item} className="text-sm leading-relaxed text-[#4C4A45]">{item}</li>)}</ul></div> : null}
                {property.landmarks?.length ? <div className="mt-6"><h3 className="font-semibold text-[#1A1A1A]">Nearby landmarks</h3><ul className="mt-3 flex flex-wrap gap-2">{property.landmarks.map((item) => <li key={item} className="rounded-full bg-[#F7F6F3] px-3 py-1 text-sm text-[#4C4A45]">{item}</li>)}</ul></div> : null}
                {property.locationInfo?.length ? <div className="mt-6"><h3 className="font-semibold text-[#1A1A1A]">Location details</h3>{property.locationInfo.map((item) => <p key={item} className="mt-2 text-sm leading-relaxed text-[#4C4A45]">{item}</p>)}</div> : null}
              </Section>

            </div>

            {/* Sticky sidebar */}
            <aside className="h-fit space-y-5 lg:sticky lg:top-28">

              {/* On this page navigation */}
              <nav
                aria-label="On this page"
                className="rounded-2xl border border-[#E8E6E1] bg-white p-5"
              >
                <p className="text-sm font-semibold text-[#6B6860]">
                  On this page
                </p>

                <ul className="mt-3 flex flex-col gap-2 text-sm font-semibold">
                  {pageLinks.map(([id, label]) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="text-[#00319D] underline-offset-4 hover:underline"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
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

