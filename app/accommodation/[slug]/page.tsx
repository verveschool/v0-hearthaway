import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { accommodationProperties, getAccommodationBySlug } from "../catalog";
import { getUniversitiesByCity } from "@/lib/place-data";
import WhatsAppLink from "@/components/accommodation/whatsapp-link";
import PropertyGallery from "@/components/accommodation/property-gallery";
import {
  formatAccommodationPrice,
  formatAccommodationPricePeriod,
} from "../formatters";

export function generateStaticParams() {
  return accommodationProperties.map((property) => ({ slug: property.slug }));
}
type ListingPageProps = { params: Promise<{ slug: string }> };
export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const property = getAccommodationBySlug((await params).slug);
  if (!property) return { title: "Accommodation | HearthAway" };
  const title = `${property.name} | ${property.city} accommodation | HearthAway`;
  const description = `Explore ${property.name} in ${property.city}, including tentative pricing, property photos, room types, amenities and nearby universities.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: property.image, alt: property.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [property.image],
    },
  };
}
export default async function AccommodationPropertyPage({
  params,
}: ListingPageProps) {
  const property = getAccommodationBySlug((await params).slug);
  if (!property) notFound();
  const cityUniversities = getUniversitiesByCity(property.city);
  const nearbyUniversities = property.universities
    .map((name) =>
      cityUniversities.find(
        (university) => university.name.toLowerCase() === name.toLowerCase(),
      ),
    )
    .filter((university): university is NonNullable<typeof university> =>
      Boolean(university),
    );
  const price = `${formatAccommodationPrice(property.currency, property.priceFrom)}${formatAccommodationPricePeriod(property.pricePeriod ?? "month")}`;
  return (
    <>
      <Navigation />
      <main className="bg-[#F7F6F3]">
        <section className="px-6 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <PropertyGallery
                images={property.gallery}
                rooms={property.rooms ?? []}
                name={property.name}
                city={property.city}
                country={property.country}
                cityHref={`/cities/${property.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              />
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">
                    Tentative starting price
                  </p>
                  <p className="mt-2 font-heading text-3xl font-extrabold text-[#00319D]">
                    {price}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#6B6860]">
                    {property.pricingNote}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">
                    Location & mapping
                  </p>
                  <div className="mt-2 flex items-start gap-2 text-sm font-semibold text-[#1A1A1A]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00319D]" />
                    {property.address}
                  </div>
                  <p className="mt-2 text-xs text-[#6B6860]">
                    {property.distance}
                  </p>
                </div>
              </div>
              {property.inclusions?.length ? (
                <InfoSection
                  title="What is included"
                  items={property.inclusions}
                />
              ) : null}
              <InfoSection
                title="Property amenities"
                items={property.amenities}
              />
              <InfoSection title="Categories" items={property.categories} />
            </div>
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">
                  Want help deciding?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#6B6860]">
                  Tell us your university, budget and preferences. An advisor
                  can help compare property options before you commit.
                </p>
                <Link
                  href="/get-matched"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FCC20A] px-5 py-3.5 text-sm font-bold text-[#333333]"
                >
                  Get Matched <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppLink className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-[#00319D] px-5 py-3.5 text-sm font-bold text-[#00319D]">
                  WhatsApp Us
                </WhatsAppLink>
              </div>
              <div className="mt-4 rounded-2xl border border-[#E8E6E1] bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#6B6860]">
                  Nearby universities
                </p>
                <div className="mt-4 space-y-3">
                  {nearbyUniversities.map((university) => (
                    <Link
                      key={university.slug}
                      href={`/universities/${university.slug}`}
                      className="block text-sm font-semibold text-[#00319D] hover:underline"
                    >
                      {university.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
function InfoSection({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
      <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">
        {title}
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 text-sm text-[#1A1A1A]"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00319D]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
