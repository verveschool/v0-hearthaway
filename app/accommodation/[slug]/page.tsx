import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { getAccommodationPartner } from '../partner-directory'
import { accommodationProperties, getAccommodationBySlug } from '../catalog'

export function generateStaticParams() {
  return accommodationProperties.map((property) => ({ slug: property.slug }))
}

type PropertyPageProps = {
  params: Promise<{ slug: string }>
}

export default async function AccommodationPropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = getAccommodationBySlug(slug)
  const partner = property ? getAccommodationPartner(property.partnerSlug ?? property.source) : undefined

  if (!property) {
    return (
      <>
        <Navigation />
        <main className="min-h-[60vh] bg-[#F7F6F3] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-extrabold text-[#1A1A1A]">Property not found</h1>
            <p className="mt-4 text-[#6B6860]">This property is no longer in the current HearthAway catalogue.</p>
            <Link href="/accommodation" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FCC20A] px-6 py-3 font-bold text-[#00319D]">
              Back to accommodation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="bg-[#F7F6F3]">
        <section className="bg-[#00319D] px-6 py-8 text-white lg:px-8 lg:py-10">
          <div className="mx-auto max-w-7xl">
            <Link href="/accommodation" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All accommodation
            </Link>
          </div>
        </section>

        <section className="px-6 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <div className="overflow-hidden rounded-2xl bg-[#00319D] shadow-xl">
                <div className="relative h-[360px] sm:h-[460px]">
                  <img src={property.image} alt={property.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00319D]/85 via-[#00319D]/20 to-transparent" />
                  <div className="absolute bottom-7 left-7 right-7 text-white sm:bottom-9 sm:left-9 sm:right-9">
                    <div className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#FCC20A]">
                      <span>{property.city}, {property.country}</span>
                      {partner && <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] tracking-wider text-white">{partner.name}</span>}
                    </div>
                    <h1 className="mt-2 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">{property.name}</h1>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {property.gallery.map((image, index) => (
                  <div key={`${image}-${index}`} className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
                    <img src={image} alt={`${property.name} gallery image ${index + 1}`} className="h-28 w-full object-cover sm:h-36" loading="lazy" />
                  </div>
                ))}
              </div>
              <a href={property.gallerySourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs font-bold text-[#00319D] underline underline-offset-4">View the full photo set on the partner site</a>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">Starting price</p>
                  {property.priceFrom > 0 ? (
                    <p className="mt-2 font-heading text-3xl font-extrabold text-[#00319D]">£{property.priceFrom}<span className="text-sm font-semibold text-[#6B6860]">/week</span></p>
                  ) : (
                    <p className="mt-2 font-heading text-2xl font-extrabold text-[#00319D]">Check current price</p>
                  )}
                  <p className="mt-2 text-xs leading-relaxed text-[#6B6860]">Prices, room availability and contract terms change. Confirm current details before booking.</p>
                </div>
                <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">Location</p>
                  <div className="mt-2 flex items-start gap-2 text-sm font-semibold text-[#1A1A1A]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00319D]" aria-hidden="true" />
                    {property.address}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#6B6860]">{property.distance}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">What stands out</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {property.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3 rounded-xl bg-[#F7F6F3] p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00319D]" aria-hidden="true" />
                      <span className="text-sm font-semibold leading-relaxed text-[#1A1A1A]">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">Room types</h2>
                    <p className="mt-1 text-sm text-[#6B6860]">The categories students compare most often.</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {property.roomTypes.map((type) => (
                    <span key={type} className="rounded-full bg-[#F7F6F3] px-4 py-2 text-sm font-semibold text-[#1A1A1A]">{type}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">Categories</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(property.categories ?? []).map((category) => (
                    <span key={category} className="rounded-full border border-[#E8E6E1] bg-white px-4 py-2 text-sm font-semibold text-[#00319D]">{category}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">Amenities</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 text-sm text-[#1A1A1A]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FCC20A]" aria-hidden="true" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00319D]">HearthAway</p>
                <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight text-[#1A1A1A]">Want help deciding whether this is the right fit?</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#6B6860]">Tell us your university, budget and preferences. An advisor can help compare this with other options before you commit.</p>
                <Link href="/get-matched" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FCC20A] px-5 py-3.5 text-sm font-bold text-[#00319D]">
                  Get Matched <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/contact" className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-[#00319D] px-5 py-3.5 text-sm font-bold text-[#00319D]">
                  Speak to HearthAway
                </Link>
              </div>

              <div className="mt-4 rounded-2xl border border-[#E8E6E1] bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">Nearby universities</p>
                <div className="mt-4 space-y-3">
                  {property.universities.map((university) => (
                    <p key={university} className="text-sm font-semibold leading-relaxed text-[#1A1A1A]">{university}</p>
                  ))}
                </div>
              </div>

              {property.availabilityNote && (
                <div className="mt-4 rounded-2xl border border-[#FCC20A]/40 bg-[#FCC20A]/10 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#00319D]">Availability note</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]">{property.availabilityNote}</p>
                </div>
              )}

              <div className="mt-4 rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-5">
                <p className="text-xs leading-relaxed text-[#6B6860]">Catalogue source: {partner?.name ?? property.source}. This listing uses publicly discoverable inventory as a reference and does not imply additional commercial rights beyond HearthAway's existing relationship. Confirm availability, pricing, room details and photo usage rights before booking or publishing final assets.</p>
                <a href={property.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs font-bold text-[#00319D] underline underline-offset-4">View source listing</a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
