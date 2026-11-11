import type { Metadata } from 'next'
import { UniversityDirectory } from '@/components/universities/university-directory'

export const metadata: Metadata = {
  title: 'Universities | HearthAway',
  description: 'Browse verified universities by destination and explore student accommodation options with HearthAway.',
}

export default function UniversitiesPage() {
  return (
    <main className="min-h-screen bg-[#FBFAF7]">
      <section className="bg-[#00319D] px-6 pb-24 pt-28 text-white lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">Find your university</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Explore actual universities across HearthAway destinations, compare city options, and continue to the accommodation guidance that helps you plan with confidence.</p>
        </div>
      </section>
      <UniversityDirectory />
    </main>
  )
}
