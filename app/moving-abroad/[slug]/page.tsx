import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import { GuideContent, GuideContents, guideSectionHeading } from '@/components/moving-abroad/guide-content'
import { countries } from '@/lib/country-data'
import {
  getMovingAbroadArticleBySlug,
  getMovingAbroadHref,
  getRelatedGuides,
  movingAbroadArticles,
} from '@/lib/moving-abroad-data'

type Props = { params: Promise<{ slug: string }> }

const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' })
const textLink = 'rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

export function generateStaticParams() {
  return movingAbroadArticles.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getMovingAbroadArticleBySlug((await params).slug)
  if (!article) return {}

  const title = `${article.title} | HearthAway`
  const description = article.description
  const url = getMovingAbroadHref(article.slug)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'HearthAway',
      locale: 'en_GB',
      images: [{ url: '/All_Students.png', alt: 'HearthAway' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/All_Students.png'] },
  }
}

export default async function MovingAbroadArticlePage({ params }: Props) {
  const article = getMovingAbroadArticleBySlug((await params).slug)
  if (!article) notFound()

  const body = article.body
  const relevantCountries = countries.filter((country) => article.countries.some((slug) => slug === country.slug))
  const related = getRelatedGuides(article)
  const action = article.ctaVariant === 'housing'
    ? { label: 'Talk to a housing advisor', href: '/get-matched' }
    : { label: 'Browse student guides', href: '/all-resources' }

  return (
    <>
      <Navigation />
      <main>
        <PageBanner title={article.title} action={action} />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-9">
          <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <Link href="/all-resources" className={textLink}>Student guides</Link>
            <span>{article.topic}</span>
            <span>{article.readTime}</span>
            <span>Reviewed <time dateTime={article.reviewedOn}>{dateFormat.format(new Date(article.reviewedOn))}</time></span>
          </div>

          <div className="grid min-w-0 gap-8 lg:grid-cols-[15rem_minmax(0,48rem)] lg:gap-11">
            <aside className="hidden self-start lg:sticky lg:block lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:p-1">
              <GuideContents body={body} id="guide-contents-heading" />
            </aside>
            <article className="min-w-0 space-y-9 text-base text-foreground sm:space-y-11">
              <GuideContent body={body} />

              {relevantCountries.length > 0 ? (
                <section aria-labelledby="guide-destinations">
                  <h2 id="guide-destinations" className={guideSectionHeading}>Explore destinations</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {relevantCountries.map(({ slug, name }) => (
                      <li key={slug}><Link href={`/${slug}`} className={`${textLink} block rounded-lg border border-border px-3 py-2.5 text-sm`}>{name}</Link></li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {related.length > 0 ? (
                <section aria-labelledby="related-guides" className="rounded-2xl border border-border bg-muted p-5 sm:p-7">
                  <h2 id="related-guides" className={guideSectionHeading}>Related guides</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {related.map((guide) => (
                      <li key={guide.slug} className="min-w-0 rounded-xl border border-border bg-background p-4">
                        <Link href={getMovingAbroadHref(guide.slug)} className={`${textLink} block leading-snug`}>{guide.title}</Link>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{guide.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
