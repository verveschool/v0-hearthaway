import Footer from "@/components/footer"
import Navbar from "@/components/navigation"
import { ResourcePublication } from "@/components/moving-abroad/resource-publication"
import { movingAbroadArticles } from "@/lib/moving-abroad-data"

export default function MovingAbroadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <ResourcePublication articles={movingAbroadArticles} />
      </main>
      <Footer />
    </>
  )
}
