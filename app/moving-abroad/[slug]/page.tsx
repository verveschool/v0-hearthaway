import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { countries } from '@/lib/country-data'
import {
  getCountryMovingAbroadLinks,
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
    .filter((country): country is NonNullable<(typeof countries)[number]> => country !== undefined)
}

function getRelatedGuides(slug: string, countrySlugs: MovingAbroadCountrySlug[], category: string) {
  return movingAbroadArticles
    .filter((article) => article.slug !== slug)
    .filter((article) => article.category === category || article.countries.some((country) => countrySlugs.includes(country)))
    .slice(0, 6)
}

export async function generateMetadata({ params }: MovingAbroadArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getMovingAbroadArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Guide not found',
    }
  }

  return {
    title: `${article.title} | Moving Abroad`,
    description: article.description,
  }
}

export default async function MovingAbroadArticlePage({ params }: MovingAbroadArticlePageProps) {
  const { slug } = await params
  const article = getMovingAbroadArticleBySlug(slug)

  if (article === undefined) {
    notFound()
  }

  const relevantCountries = getRelevantCountries(article.countries)
  const usesHousingCta = article.ctaVariant === 'housing'
  const relatedGuides = getRelatedGuides(article.slug, article.countries, article.category)
  const countryGuides = article.countries.flatMap((countrySlug) => getCountryMovingAbroadLinks(countrySlug))

  return (
    <>
      <Navigation />
      <main>
        <section className="bg-primary pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-8 h-px bg-accent" aria-hidden="true" />
                <span className="text-accent text-sm font-bold tracking-widest uppercase">
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
                <span className="px-3 py-1.5 rounded-full bg-accent text-primary text-xs font-extrabold">
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

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <article className="lg:col-span-2 space-y-5">
              <section className="rounded-2xl border border-[var(--color-mid-gray)] bg-[var(--color-warm-gray)] p-8 lg:p-10">
                <div className="text-primary text-sm font-bold tracking-widest uppercase mb-4">
                  What this guide covers
                </div>
                <h2 className="font-heading font-bold text-2xl text-charcoal-ink mb-4">
                  The decision this guide helps you make
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  This guide is built to help you move from broad uncertainty to a specific next step. It gives you the core tradeoffs, the common mistakes, and the practical order of work.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.sections.map((section, index) => (
                    <div key={section.title} className="rounded-2xl bg-white border border-[var(--color-mid-gray)] p-5">
                      <div className="text-xs font-bold tracking-widest uppercase text-primary mb-2">
                        Section {index + 1}
                      </div>
                      <h3 className="font-heading font-bold text-charcoal-ink text-base leading-snug mb-2">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {section.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {article.sections.map((section, index) => (
                <section
                  key={section.title}
                  className="rounded-2xl border border-[var(--color-mid-gray)] bg-white p-8 lg:p-10"
                >
                  <div className="inline-flex items-center gap-2 mb-5">
                    <div className="w-8 h-px bg-accent" aria-hidden="true" />
                    <span className="text-primary text-sm font-bold tracking-widest uppercase">
                      Guide section {index + 1}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-charcoal-ink mb-4">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {section.summary}
                  </p>
                </section>
              ))}

              {relatedGuides.length > 0 && (
                <section className="rounded-2xl border border-[var(--color-mid-gray)] bg-[var(--color-warm-gray)] p-8 lg:p-10">
                  <div className="inline-flex items-center gap-2 mb-5">
                    <div className="w-8 h-px bg-accent" aria-hidden="true" />
                    <span className="text-primary text-sm font-bold tracking-widest uppercase">
                      Related guides
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-charcoal-ink mb-5">
                    Keep going from here
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedGuides.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/moving-abroad/${guide.slug}`}
                        className="group bg-white rounded-2xl p-5 border border-[var(--color-mid-gray)] hover:border-primary/30 hover:shadow-lg transition-all duration-200 flex flex-col"
                      >
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <span className="text-xs font-bold text-primary tracking-wider uppercase px-2.5 py-1 bg-accent rounded-full">
                            {guide.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {guide.readTime}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-charcoal-ink text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                          {guide.description}
                        </p>
                        <div className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform inline-block">
                          Read guide &rarr;
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {usesHousingCta ? (
                <section className="rounded-2xl bg-primary p-8 lg:p-10">
                  <div className="text-accent text-sm font-bold tracking-widest uppercase mb-4">
                    Student housing match
                  </div>
                  <h2 className="font-heading font-bold text-2xl lg:text-3xl text-white mb-4 text-balance">
                    Want help matching your accommodation to this plan?
                  </h2>
                  <p className="text-white/70 text-base leading-relaxed mb-7">
                    Tell us your university, budget, room preference, and move-in timeline. HearthAway can help you compare suitable student accommodation before you fly.
                  </p>
                  <Link
                    href="/get-matched"
                    className="inline-flex px-8 py-4 bg-accent text-primary font-bold text-base rounded-xl hover:bg-[var(--color-hearth-gold-dark)] transition-colors shadow-lg"
                  >
                    Get matched
                  </Link>
                </section>
              ) : (
                <section className="rounded-2xl bg-primary p-8 lg:p-10">
                  <div className="text-accent text-sm font-bold tracking-widest uppercase mb-4">
                    Planning support
                  </div>
                  <h2 className="font-heading font-bold text-2xl lg:text-3xl text-white mb-4 text-balance">
                    Turn this guide into a clean next step.
                  </h2>
                  <p className="text-white/70 text-base leading-relaxed mb-7">
                    Use this guide to narrow your decision, then move into city, university, and housing pages with a sharper brief.
                  </p>
                  <Link
                    href="/get-matched"
                    className="inline-flex px-8 py-4 bg-accent text-primary font-bold text-base rounded-xl hover:bg-[var(--color-hearth-gold-dark)] transition-colors shadow-lg"
                  >
                    Get matched
                  </Link>
                </section>
              )}
            </article>

            <aside className="space-y-5">
              <section className="rounded-2xl border border-[var(--color-mid-gray)] bg-[var(--color-warm-gray)] p-6">
                <h2 className="font-heading font-bold text-xl text-charcoal-ink mb-4">
                  On this page
                </h2>
                <div className="space-y-2">
                  {article.sections.map((section, index) => (
                    <a
                      key={section.title}
                      href={`#section-${index + 1}`}
                      className="group flex items-center justify-between rounded-xl bg-white border border-[var(--color-mid-gray)] px-4 py-3 text-sm font-semibold text-primary hover:border-primary/30 transition-colors"
                    >
                      <span>{section.title}</span>
                      <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                        &rarr;
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--color-mid-gray)] bg-white p-6">
                <h2 className="font-heading font-bold text-xl text-charcoal-ink mb-4">
                  Relevant country hubs
                </h2>
                <div className="space-y-2">
                  {relevantCountries.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/${country.slug}`}
                      className="block rounded-xl bg-[var(--color-warm-gray)] border border-[var(--color-mid-gray)] px-4 py-3 hover:border-primary/30 transition-colors"
                    >
                      <span className="block text-sm font-bold text-charcoal-ink mb-1">
                        Study in {country.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {country.universityCount} universities &middot; {country.currency}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--color-mid-gray)] bg-white p-6">
                <h2 className="font-heading font-bold text-xl text-charcoal-ink mb-3">
                  Country specific guides
                </h2>
                <div className="space-y-2">
                  {countryGuides.map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      className="block rounded-xl bg-[var(--color-warm-gray)] border border-[var(--color-mid-gray)] px-4 py-3 hover:border-primary/30 transition-colors"
                    >
                      <span className="block text-sm font-bold text-charcoal-ink mb-1">
                        {guide.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {guide.category} &middot; {guide.readTime}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--color-mid-gray)] bg-white p-6">
                <h2 className="font-heading font-bold text-xl text-charcoal-ink mb-3">
                  Guide status
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {article.stage} guide for {article.category}. Use the sections above as the main reading path, then move to the matching country or housing page.
                </p>
              </section>
            </aside>
          </div>
        </section>

        <section className="bg-[var(--color-warm-gray)] py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1">
                <div className="text-primary text-sm font-bold tracking-widest uppercase mb-3">
                  Next steps
                </div>
                <h2 className="font-heading font-bold text-2xl text-charcoal-ink mb-3">
                  Move from guidance to local planning
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Once the broad move is clear, use city and university pages to narrow the housing search.
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {nextStepLinks.map((step) => (
                  <Link
                    key={step.href}
                    href={step.href}
                    className="group bg-white rounded-2xl p-6 border border-[var(--color-mid-gray)] hover:border-primary/30 hover:shadow-lg transition-all duration-200"
                  >
                    <h3 className="font-heading font-bold text-lg text-charcoal-ink mb-3 group-hover:text-primary transition-colors">
                      {step.label}
                    </h3>
                    <div className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform inline-block">
                      Continue &rarr;
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
