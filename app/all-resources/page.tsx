import type { Metadata } from "next"
import { connection } from "next/server"
import Footer from "@/components/footer"
import Navbar from "@/components/navigation"
import PageBanner from '@/components/page-banner'
import { getMovingAbroadHref, movingAbroadArticles } from "@/lib/moving-abroad-data"
import { ResourceLibrary } from "./resource-library"

const articles = movingAbroadArticles.map(({ slug, title, description, category, tags, readTime }) => ({
  href: getMovingAbroadHref(slug), title, description, category, tags, readTime,
}))

export const metadata: Metadata = {
  title: "Resources | HearthAway",
  description: "Practical guides for planning your move, finding student housing, and settling in abroad.",
  alternates: { canonical: "/moving-abroad" },
}

export default async function AllResourcesPage() {
  // Render the requested page and filters on the first response as well as after navigation.
  await connection()

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <PageBanner title="Guides for your move abroad" action={{ label: 'Open the pre-arrival checklist', href: '/moving-abroad/pre-arrival-checklist' }} />
        <div className="px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12">
          <div className="mx-auto w-full max-w-5xl">
            <ResourceLibrary articles={articles} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
