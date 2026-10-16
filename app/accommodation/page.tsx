import Link from 'next/link'
import { ArrowRight, Building2 } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

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
                We’re preparing a dedicated place to explore student accommodation options.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="accommodations-heading"
          className="bg-[#F7F6F3] px-6 py-16 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-[#E8E6E1] bg-white px-6 py-14 text-center shadow-sm sm:px-12 sm:py-16">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-[#00319D]/[0.06] text-[#00319D]">
                <Building2 aria-hidden="true" className="size-8" />
              </div>
              <h2
                id="accommodations-heading"
                className="mt-6 font-heading text-2xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-3xl"
              >
                Accommodations will be available soon.
              </h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-[#6B6860]">
                In the meantime, our team can help you find options near your university.
              </p>
              <Link
                href="/get-matched"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#00319D] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#00277d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2"
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
