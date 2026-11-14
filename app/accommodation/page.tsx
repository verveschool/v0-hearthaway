
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import AccommodationListings from '@/components/accommodation/accommodation-listings'
import { accommodationListings } from './listing-data'

export const metadata: Metadata = {
  title: 'Student Properties | HearthAway',
  description:
    'Explore student properties by city, compare their details, and browse available rooms.',
}

type AccommodationPageProps = {
  searchParams: Promise<{ provider?: string; city?: string; query?: string }>
}

export default async function AccommodationPage({
  searchParams,
}: AccommodationPageProps) {
  const { provider, city, query } = await searchParams

  const visibleListings =
    provider === 'stacey' || provider === 'vita-student' || provider === 'iglu' || provider === 'neonwood' || provider === 'tannhaus'
      ? accommodationListings.filter((listing) => listing.provider === provider)
      : accommodationListings

  const cities = [...new Set(visibleListings.map((listing) => listing.city))].sort()
  const initialCity = city && cities.includes(city) ? city : 'all'
  const initialQuery = query?.trim().slice(0, 100) ?? ''

  return (
    <>
      <Navigation />

      <main>
        <section className="flex min-h-[210px] items-center bg-[#00319D] px-6 py-8 text-white lg:min-h-[230px] lg:px-8 lg:py-10">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Explore Student Properties
              </h1>

              <Link
                href="/accommodation/rooms"
                className="secondary-cta mt-6 inline-flex min-h-11 items-center gap-2 px-4 py-2.5 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCC20A]"
              >
                Browse Available Rooms
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section
          aria-label="Property listings"
          className="bg-[#F7F6F3] px-6 py-12 lg:px-8 lg:py-16"
        >
          <div className="mx-auto max-w-7xl">
            <AccommodationListings
              key={`${provider ?? 'all'}:${initialCity}:${initialQuery}`}
              cities={cities}
              listings={visibleListings}
              initialCity={initialCity}
              initialQuery={initialQuery}
            />

            <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#00319D] p-6 text-white sm:flex-row sm:items-center sm:p-8">
              <div>
                <h2 className="font-heading text-xl font-extrabold sm:text-2xl">
                  Need help choosing?
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Our team can help you compare options near your university.
                </p>
              </div>

              <Link
                href="/get-matched"
                className="brand-cta inline-flex min-h-11 shrink-0 items-center gap-2 px-5 py-3 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00319D]"
              >
                Get matched
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
