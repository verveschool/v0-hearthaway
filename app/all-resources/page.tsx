import type { Metadata } from "next"
import { connection } from "next/server"
import Footer from "@/components/footer"
import Navbar from "@/components/navigation"
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
      <main className="bg-background px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12">
        <div className="mx-auto w-full max-w-5xl">
          <header className="mb-6">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Resources
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Practical guides for planning your move, finding student housing, and settling in abroad.
            </p>
          </header>
          <ResourceLibrary articles={articles} />
        </div>
      </main>
      <Footer />
    </>
  )
}
