import { Suspense } from "react"
import Footer from "@/components/footer"
import Navbar from "@/components/navigation"
import { ResourcePublication } from "@/components/moving-abroad/resource-publication"
import { movingAbroadArticles } from "@/lib/moving-abroad-data"

const articles = movingAbroadArticles.map(({ slug, title, description, category, tags, readTime }) => ({
  slug, title, description, category, tags, readTime,
}))

export default function MovingAbroadPage() {
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
          <Suspense fallback={<p role="status" className="py-4 text-sm text-muted-foreground">Loading resources…</p>}>
            <ResourcePublication articles={articles} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
