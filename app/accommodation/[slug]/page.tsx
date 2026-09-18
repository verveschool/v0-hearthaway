import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { accommodationProperties, getAccommodationBySlug } from '../catalog'
import { getUniversitiesByCity } from '@/lib/place-data'
import WhatsAppLink from '@/components/accommodation/whatsapp-link'
import { formatAccommodationPrice, formatAccommodationPricePeriod } from '../formatters'

export function generateStaticParams() { return accommodationProperties.map((property) => ({ slug: property.slug })) }
type PropertyPageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = getAccommodationBySlug(slug)
  if (!property) return { title: 'Accommodation | HearthAway' }

  const mainImage = property.gallery[0] ?? property.image
  const title = `${property.name} | ${property.city} accommodation | HearthAway`
  const description = `Explore ${property.name} student accommodation in ${property.city}, including rooms, facilities, location and nearby universities.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: mainImage, alt: `${property.name} student accommodation` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [mainImage],
    },
  }
}

export default async function AccommodationPropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = getAccommodationBySlug(slug)
  if (!property) return <><Navigation /><main className="min-h-[60vh] bg-[#F7F6F3] px-6 py-24"><div className="mx-auto max-w-3xl text-center"><h1 className="font-heading text-4xl font-extrabold text-[#1A1A1A]">Property not found</h1><p className="mt-4 text-[#6B6860]">Explore other student accommodation options and request help finding the right fit.</p><Link href="/accommodation" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FCC20A] px-6 py-3 font-bold text-[#00319D]">Back to accommodation <ArrowRight className="h-4 w-4" /></Link></div></main><Footer /></>
  const price = property.priceFrom > 0 ? formatAccommodationPrice(property.currency, property.priceFrom) : 'Contact us'
  const periodLabel = property.priceFrom > 0 && property.pricePeriod ? formatAccommodationPricePeriod(property.pricePeriod) : ''
  const gallery = property.gallery.length ? property.gallery : [property.image]
  const cityUniversities = getUniversitiesByCity(property.city)
  const nearbyUniversities = property.universities.map((name) => cityUniversities.find((university) => university.name.toLowerCase() === name.toLowerCase()) ?? cityUniversities.find((university) => university.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(university.name.toLowerCase()))).filter((university, index, universities): university is NonNullable<typeof university> => Boolean(university) && universities.findIndex((candidate) => candidate?.slug === university?.slug) === index)

  return <>
    <Navigation /><main className="bg-[#F7F6F3]">
      <section className="px-6 py-8 lg:px-8 lg:py-12"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <div className="overflow-hidden rounded-2xl bg-[#00319D] shadow-xl"><div className="relative h-[360px] sm:h-[500px]"><img src={gallery[0]} alt={property.name} className="h-full w-full object-cover" /><div className="absolute bottom-7 left-7 right-7 text-white sm:bottom-9 sm:left-9 sm:right-9"><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FCC20A]"><Link href={`/cities/${property.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="hover:underline">{property.city}</Link>, {property.country}</p><h1 className="mt-2 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">{property.name}</h1></div></div></div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{gallery.slice(1, 9).map((image, index) => <div key={`${image}-${index}`} className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white"><img src={image} alt={`${property.name} photo ${index + 2}`} className="h-32 w-full object-cover sm:h-36" loading="lazy" /></div>)}</div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2"><div className="rounded-2xl border border-[#E8E6E1] bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">Tentative starting price</p><p className="mt-2 font-heading text-3xl font-extrabold text-[#00319D]">{price}{periodLabel && <span className="text-sm font-semibold text-[#6B6860]">{periodLabel}</span>}</p><p className="mt-2 text-xs leading-relaxed text-[#6B6860]">Use this as a starting point, then request a consultation for guidance on the right option.</p></div><div className="rounded-2xl border border-[#E8E6E1] bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">Location</p><div className="mt-2 flex items-start gap-2 text-sm font-semibold text-[#1A1A1A]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00319D]" />{property.address}</div><p className="mt-2 text-xs leading-relaxed text-[#6B6860]">{property.distance}</p></div></div>
          {property.goodFor?.length ? <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8"><h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">Good for</h2><div className="mt-5 flex flex-wrap gap-2">{property.goodFor.map((item) => <span key={item} className="rounded-full bg-[#F7F6F3] px-4 py-2 text-sm font-semibold text-[#1A1A1A]">{item}</span>)}</div></div> : null}
          <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8"><h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">Room types</h2><div className="mt-5 flex flex-wrap gap-2">{property.roomTypes.map((type) => <span key={type} className="rounded-full bg-[#F7F6F3] px-4 py-2 text-sm font-semibold text-[#1A1A1A]">{type}</span>)}</div></div>
          {property.roomFeatures?.length ? <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8"><h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">Room details</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{property.roomFeatures.map((item) => <div key={item} className="flex items-center gap-3 text-sm text-[#1A1A1A]"><span className="h-1.5 w-1.5 rounded-full bg-[#FCC20A]" />{item}</div>)}</div></div> : null}
          {property.inclusions?.length ? <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8"><h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">What is included</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{property.inclusions.map((item) => <div key={item} className="flex items-start gap-3 text-sm text-[#1A1A1A]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00319D]" />{item}</div>)}</div></div> : null}
          <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8"><h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">Categories</h2><div className="mt-5 flex flex-wrap gap-2">{(property.categories ?? []).map((category) => <span key={category} className="rounded-full border border-[#E8E6E1] bg-white px-4 py-2 text-sm font-semibold text-[#00319D]">{category}</span>)}</div></div>
          <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8"><h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">Amenities</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{property.amenities.map((item) => <div key={item} className="flex items-center gap-3 text-sm text-[#1A1A1A]"><span className="h-1.5 w-1.5 rounded-full bg-[#FCC20A]" />{item}</div>)}</div></div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:h-fit"><div className="rounded-2xl bg-white p-6 shadow-xl sm:p-7"><h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight text-[#1A1A1A]">Want help deciding whether this is the right fit?</h2><p className="mt-3 text-sm leading-relaxed text-[#6B6860]">Tell us your university, budget and preferences. An advisor can help compare this with other options before you commit.</p><Link href="/get-matched" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FCC20A] px-5 py-3.5 text-sm font-bold text-white">Get Matched <ArrowRight className="h-4 w-4" /></Link><WhatsAppLink className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-[#00319D] px-5 py-3.5 text-sm font-bold text-[#00319D]">WhatsApp Us</WhatsAppLink></div><div className="mt-4 rounded-2xl border border-[#E8E6E1] bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">Nearby universities</p><div className="mt-4 space-y-3">{nearbyUniversities.length ? nearbyUniversities.map((university) => <Link key={university.slug} href={`/universities/${university.slug}`} className="block text-sm font-semibold leading-relaxed text-[#00319D] underline-offset-4 hover:underline">{university.name}</Link>) : <p className="text-sm leading-relaxed text-[#6B6860]">Nearby university links will be added as this city guide expands.</p>}</div></div>{property.contractTerms?.length ? <div className="mt-4 rounded-2xl border border-[#E8E6E1] bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">Contract</p><div className="mt-4 space-y-2">{property.contractTerms.map((item) => <p key={item} className="text-sm leading-relaxed text-[#1A1A1A]">{item}</p>)}</div></div> : null}{property.depositNote ? <div className="mt-4 rounded-2xl border border-[#E8E6E1] bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">Deposit</p><p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]">{property.depositNote}</p></div> : null}{property.availabilityNote ? <div className="mt-4 rounded-2xl border border-[#FCC20A]/40 bg-[#FCC20A]/10 p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#00319D]">Availability note</p><p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]">{property.availabilityNote}</p></div> : null}</aside>
      </div></section>
    </main><Footer />
  </>
}
