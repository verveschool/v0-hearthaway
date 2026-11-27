import Link from 'next/link'

import { getFeaturedMovingAbroadGuides } from '@/lib/moving-abroad-data'

const guides = getFeaturedMovingAbroadGuides()

export default function MovingAbroadPreview() {
  return (
    <section aria-labelledby="home-student-guides" className="bg-muted px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="home-student-guides" className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Student guides for moving abroad
          </h2>
          <Link href="/moving-abroad" className="rounded-sm py-2 font-semibold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            Browse all student guides
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {guides.map((guide) => (
            <li key={guide.slug} className="min-w-0">
              <Link href={guide.href} className="block h-full rounded-xl border border-border bg-card p-5 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                <h3 className="text-lg font-bold leading-snug text-primary">{guide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{guide.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
