import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

import type { CountryPlace } from '@/lib/country-data'
import { isMovingAbroadCountrySlug } from '@/lib/moving-abroad-data'

export default function DestinationGuideLink({ country }: { country?: CountryPlace }) {
  const destination = country && isMovingAbroadCountrySlug(country.slug) ? country : undefined
  const href = destination ? `/moving-abroad?country=${destination.slug}` : '/moving-abroad'

  return (
    <div className="border-b border-[#E8E6E1] bg-[#F7F6F3] px-6 py-2 max-[360px]:px-4 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href={href}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm py-2 text-sm font-bold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-base"
        >
          <BookOpen aria-hidden="true" className="size-5 shrink-0" />
          <span>{destination ? `Student guides for ${destination.name}` : 'Browse student guides'}</span>
          <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
        </Link>
      </div>
    </div>
  )
}
