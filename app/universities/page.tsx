import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
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
        <PageBanner title="Start with your university" action={{ label: 'Explore student cities', href: '/cities' }} />

        {/* University Directory Section */}
        <section
          aria-label="University directory"
          className="bg-[#FBFAF7] pt-8"
        >
          <UniversityDirectory />
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
