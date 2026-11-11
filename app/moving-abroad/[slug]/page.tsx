
import type { Metadata } from 'next'
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

type MovingAbroadArticlePageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return movingAbroadArticles.map((article) => ({ slug: article.slug }))
}

function getRelevantCountries(countrySlugs: MovingAbroadCountrySlug[]) {
  return countrySlugs
    .map((slug) => countries.find((country) => country.slug === slug))
    .filter(
      (country): country is NonNullable<(typeof countries)[number]> =>
        country !== undefined
    )
}

function titleCase(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

function relatedGuidesForArticle(
  articleSlug: string,
  countrySlugs: MovingAbroadCountrySlug[],
  category: string,
  stage: string
) {
  return movingAbroadArticles
    .filter((article) => article.slug !== articleSlug)
    .map((article, index) => {
      const sameCategory = article.category === category
      const sameStage = article.stage === stage
      const sharedCountry = article.countries.some((country) =>
        countrySlugs.includes(country)
      )

      return {
        article,
        index,
        score:
          (sameCategory ? 6 : 0) +
          (sameStage ? 3 : 0) +
          (sharedCountry ? 1 : 0),
        isTopicallyRelevant: sameCategory || sameStage,
      }
    })
    .filter((match) => match.isTopicallyRelevant)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 4)
    .map((match) => match.article)
}

export async function generateMetadata({
  params,
}: MovingAbroadArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getMovingAbroadArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Guide not found',
    }
  }

  return {
    title: `${titleCase(article.title)} | Moving Abroad`,
    description: article.description,
  }
}

export default async function MovingAbroadArticlePage({
  params,
}: MovingAbroadArticlePageProps) {
  const { slug } = await params
  const article = getMovingAbroadArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const relevantCountries = getRelevantCountries(article.countries)

  const relatedGuides = relatedGuidesForArticle(
    article.slug,
    article.countries,
    article.category,
    article.stage
  )

  const keyTakeaways = article.sections.slice(0, 3)

  return (
    <>
      <Navigation />

      <main>
        {/* Minimal article header */}
        <section className="bg-white px-6 pt-10 pb-9 sm:pt-12 sm:pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <span className="inline-flex items-center rounded-full border border-primary/25 bg-white px-3 py-1.5 text-xs font-semibold text-primary mb-5">
                {article.readTime}
              </span>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.625rem] font-bold text-charcoal-ink text-balance leading-[1.15] tracking-tight">
                {titleCase(article.title)}
              </h1>

              <p className="max-w-3xl text-muted-foreground text-base sm:text-lg leading-relaxed mt-4">
                {article.description}
              </p>
            </div>
          </div>
        </section>

        {/* Article content */}
        <section className="bg-white px-6 pt-5 pb-12 lg:pb-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

            <article className="lg:col-span-2 space-y-5">

              {/* Key takeaways */}
              <section className="rounded-2xl border border-[var(--color-mid-gray)] bg-[var(--color-warm-gray)] p-7 sm:p-8 lg:p-10">
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-charcoal-ink mb-3">
                  The main decisions in this guide
                </h2>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  Use these points to understand the key decisions before
                  exploring the full guide.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {keyTakeaways.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-xl bg-white border border-[var(--color-mid-gray)] p-5"
                    >
                      <h3 className="font-heading font-bold text-charcoal-ink text-base leading-snug mb-2">
                        {titleCase(section.title)}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {section.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Main article sections */}
              {article.sections.map((section) => (
                <section
                  key={section.title}
                  id={`section-${section.title}`}
                  className="rounded-2xl border border-[var(--color-mid-gray)] bg-white p-7 sm:p-8 lg:p-10"
                >
                  <h2 className="font-heading font-bold text-xl sm:text-2xl text-charcoal-ink mb-4">
                    {titleCase(section.title)}
                  </h2>

                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    {section.summary}
                  </p>

                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-charcoal-ink mb-3">
                        Key Points
                      </h3>

                      <ul className="space-y-2">
                        {section.keyPoints.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-muted-foreground text-base leading-relaxed"
                          >
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.numbers && section.numbers.length > 0 && (
                    <div className="mb-6 rounded-xl bg-[var(--color-warm-gray)] p-5 border border-[var(--color-mid-gray)]">
                      <h3 className="text-sm font-bold text-primary mb-3">
                        Critical Numbers
                      </h3>

                      <ul className="space-y-3">
                        {section.numbers.map((num, idx) => (
                          <li
                            key={idx}
                            className="font-heading font-bold text-lg text-charcoal-ink"
                          >
                            {num}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.warning && (
                    <div className="rounded-xl bg-red-50 p-5 border border-red-100 mt-2">
                      <h3 className="text-sm font-bold text-red-800 mb-2 flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        Important Warning
                      </h3>

                      <p className="text-red-900 text-sm leading-relaxed">
                        {section.warning}
                      </p>
                    </div>
                  )}
                </section>
              ))}

              {/* Related guides */}
              {relatedGuides.length > 0 && (
                <section className="rounded-2xl border border-[var(--color-mid-gray)] bg-[var(--color-warm-gray)] p-7 sm:p-8 lg:p-10">
                  <h2 className="font-heading font-bold text-xl sm:text-2xl text-charcoal-ink mb-5">
                    Keep moving in the right order
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedGuides.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/moving-abroad/${guide.slug}`}
                        className="group bg-white rounded-xl p-5 border border-[var(--color-mid-gray)] hover:border-primary/30 hover:shadow-lg transition-all duration-200 flex flex-col"
                      >
                        <div className="flex items-center justify-end mb-4">
                          <span className="text-xs text-muted-foreground">
                            {guide.readTime}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-charcoal-ink text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                          {titleCase(guide.title)}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                          {guide.description}
                        </p>

                        <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform inline-block">
                          Read guide &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

            </article>

            {/* Sidebar */}
            <aside className="space-y-5">

              {/* Country links */}
              <section className="rounded-2xl border border-[var(--color-mid-gray)] bg-[var(--color-warm-gray)] p-6">
                <h2 className="font-heading font-bold text-xl text-charcoal-ink mb-4">
                  Country links
                </h2>

                <div className="space-y-2">
                  {relevantCountries.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/${country.slug}`}
                      className="block rounded-xl bg-white border border-[var(--color-mid-gray)] px-4 py-3 hover:border-primary/30 transition-colors"
                    >
                      <span className="block text-sm font-bold text-charcoal-ink mb-1">
                        Study in {country.name}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {country.universityCount} universities &middot;{' '}
                        {country.currency}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Guide details */}
              <section className="rounded-2xl border border-[var(--color-mid-gray)] bg-white p-6">
                <h2 className="font-heading font-bold text-xl text-charcoal-ink mb-3">
                  Guide details
                </h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  Category: {article.category}. Stage: {article.stage}. This
                  guide is designed to help you move from broad planning into
                  a specific decision.
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
