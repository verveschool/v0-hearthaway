import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { countries } from '@/lib/country-data'
import {
  getMovingAbroadArticleBySlug,
  movingAbroadArticles,
  type MovingAbroadCountrySlug,
} from '@/lib/moving-abroad-data'

const countryLabels: Record<MovingAbroadCountrySlug, string> = {
  uk: 'United Kingdom',
  ireland: 'Ireland',
  australia: 'Australia',
}

const nextStepLinks = [
  { href: '/moving-abroad', label: 'Browse all moving abroad guides' },
  { href: '/cities', label: 'Explore student cities' },
  { href: '/universities', label: 'Find your university' },
  { href: '/get-matched', label: 'Get matched with accommodation' },
]

export function generateStaticParams() {
  return movingAbroadArticles.map((article) => ({ slug: article.slug }))
}

type MovingAbroadArticlePageProps = {
  params: Promise<{
    slug: string
  }>
}

function getRelevantCountries(countrySlugs: MovingAbroadCountrySlug[]) {
  return countrySlugs
    .map((slug) => countries.find((country) => country.slug === slug))
    .filter((country) => country !== undefined)
}

export default async function MovingAbroadArticlePage({ params }: MovingAbroadArticlePageProps) {
  const { slug } = await params
  const article = getMovingAbroadArticleBySlug(slug)

  if (article === undefined) {
    notFound()
  }

  const relevantCountries = getRelevantCountries(article.countries)
  const usesHousingCta = article.ctaVariant === 'housing'

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                <span className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase">
                  {article.category} &middot; {article.stage}
                </span>
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                {article.title}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-7">
                {article.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-full bg-[#FFCC00] text-[#1B365D] text-xs font-extrabold">
                  {article.readTime}
                </span>
                {article.countries.map((countrySlug) => (
                  <span
                    key={countrySlug}
                    className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-medium"
                  >
                    {countryLabels[countrySlug]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <article className="lg:col-span-2 space-y-5">
              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <div className="text-[#1B365D] text-sm font-bold tracking-widest uppercase mb-4">
                  Placeholder guide
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Full guide content is being prepared
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  This page exists so every linked moving-abroad guide has a real destination while detailed editorial content is completed. Use the outline below to plan the decisions this guide will cover.
                </p>
              </section>

              {article.sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10"
                >
                  <div className="inline-flex items-center gap-2 mb-5">
                    <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                    <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                      Guide section
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                    {section.title}
                  </h2>
                  <p className="text-[#6B6860] text-base leading-relaxed">
                    {section.summary}
                  </p>
                </section>
              ))}

              {usesHousingCta ? (
                <section className="rounded-2xl bg-[#1B365D] p-8 lg:p-10">
                  <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">
                    Student-housing match
                  </div>
                  <h2 className="font-heading font-bold text-2xl lg:text-3xl text-white mb-4 text-balance">
                    Want help matching your accommodation to this plan?
                  </h2>
                  <p className="text-white/70 text-base leading-relaxed mb-7">
                    Tell us your university, budget, room preference, and move-in timeline. HearthAway can help you compare suitable student accommodation before you fly.
                  </p>
                  <Link
                    href="/get-matched"
                    className="inline-flex px-8 py-4 bg-[#FFCC00] text-[#1B365D] font-bold text-base rounded-xl hover:bg-[#E6B800] transition-colors shadow-lg"
                  >
                    Get matched
                  </Link>
                </section>
              ) : null}
            </article>

            <aside className="space-y-5">
              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-6">
                <h2 className="font-heading font-bold text-xl text-[#1A1A1A] mb-4">
                  Keep planning
                </h2>
                <div className="space-y-2">
                  {nextStepLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between rounded-xl bg-white border border-[#E8E6E1] px-4 py-3 text-sm font-semibold text-[#1B365D] hover:border-[#1B365D]/30 transition-colors"
                    >
                      <span>{link.label}</span>
                      <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                        &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                <h2 className="font-heading font-bold text-xl text-[#1A1A1A] mb-4">
                  Relevant country hubs
                </h2>
                <div className="space-y-2">
                  {relevantCountries.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/${country.slug}`}
                      className="block rounded-xl bg-[#F7F6F3] border border-[#E8E6E1] px-4 py-3 hover:border-[#1B365D]/30 transition-colors"
                    >
                      <span className="block text-sm font-bold text-[#1A1A1A] mb-1">
                        Study in {country.name}
                      </span>
                      <span className="text-xs text-[#6B6860]">
                        {country.universityCount} universities &middot; {country.currency}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                <h2 className="font-heading font-bold text-xl text-[#1A1A1A] mb-3">
                  Guide status
                </h2>
                <p className="text-[#6B6860] text-sm leading-relaxed">
                  Category: {article.category}. Stage: {article.stage}. This article shell is ready for expanded editorial copy when final content is available.
                </p>
              </section>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
