import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import AccommodationListings from '@/components/accommodation/accommodation-listings'
import { accommodationCities, accommodationListings } from './listing-data'

export const metadata: Metadata = {
  title: 'Student Accommodation | HearthAway',
  description: 'Explore student accommodation properties, room options, prices and availability by city.',
}

export default function AccommodationPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-[#00319D] px-6 py-16 text-white lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FCC20A]">
                HearthAway accommodation
              </p>
              <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Find your student <span className="text-[#FCC20A]">home</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                Explore accommodation options and room details by city.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-label="Accommodation listings"
          className="bg-[#F7F6F3] px-6 py-12 lg:px-8 lg:py-16"
        >
          <div className="mx-auto max-w-7xl">
            <AccommodationListings cities={accommodationCities} listings={accommodationListings} />
            <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#00319D] p-6 text-white sm:flex-row sm:items-center sm:p-8">
              <div>
                <h2 className="font-heading text-xl font-extrabold sm:text-2xl">Need help choosing?</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Our team can help you compare options near your university.
                </p>
              </div>
              <Link
                href="/get-matched"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[#FCC20A] px-5 py-3 text-sm font-bold text-[#333333] transition-colors hover:bg-[#f5b900] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00319D]"
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
