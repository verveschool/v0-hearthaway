import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { UniversityDirectory } from '@/components/universities/university-directory'

export const metadata: Metadata = {
  title: 'Universities | HearthAway',
  description:
    'Browse verified universities by destination and explore student accommodation options with HearthAway.',
}

export default function UniversitiesPage() {
  return (
    <>
      {/* Header */}
      <Navigation />

      <main className="min-h-screen bg-[#FBFAF7]">

        {/* Hero Section */}
        <section className="bg-[#00319D] px-6 pb-24 pt-28 text-white lg:px-8 lg:pt-36">
          <div className="mx-auto max-w-7xl">

            <div className="max-w-3xl">

              <h1 className="font-heading text-4xl font-bold tracking-tight leading-tight text-white md:text-5xl lg:text-6xl">
                Find your university
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                Explore universities across HearthAway destinations,
                compare city options, and discover student accommodation
                guidance to help you plan your next move with confidence.
              </p>

            </div>

          </div>
        </section>

        {/* University Directory Section */}
        <section
          aria-label="University directory"
          className="bg-[#FBFAF7]"
        >
          <UniversityDirectory />
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
