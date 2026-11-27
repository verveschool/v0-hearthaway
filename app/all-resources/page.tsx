import type { Metadata } from 'next'
import { connection } from 'next/server'

import Footer from '@/components/footer'
import Navbar from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import { countries } from '@/lib/country-data'
import { getMovingAbroadHref, movingAbroadArticles } from '@/lib/moving-abroad-data'
import { ResourceLibrary } from './resource-library'

const articles = movingAbroadArticles.map((article) => ({
  href: getMovingAbroadHref(article.slug),
  title: article.title,
  description: article.description,
  topic: article.topic,
  tags: article.tags,
  countries: article.countries,
  readTime: article.readTime,
}))

const destinations = countries.map(({ slug, name }) => ({ slug, name }))
const title = 'Student housing and moving guides | HearthAway'
const description = 'Compare student housing, plan your budget, check rental terms and get ready to move. Find practical guides by topic or destination.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/moving-abroad' },
  openGraph: { type: 'website', title, description, url: '/moving-abroad', images: ['/All_Students.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/All_Students.png'] },
}

export default async function AllResourcesPage() {
  // Use the incoming URL to render the active filters on the first response.
  await connection()

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <PageBanner title="Student guides for moving abroad" action={{ label: 'Open the pre-arrival checklist', href: '/moving-abroad/pre-arrival-checklist' }} />
        <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12">
          <ResourceLibrary articles={articles} destinations={destinations} />
        </div>
      </main>
      <Footer />
    </>
  )
}
