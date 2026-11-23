import Footer from "@/components/footer"
import Navbar from "@/components/navigation"
import PageBanner from '@/components/page-banner'
import { ResourcePublication } from "@/components/moving-abroad/resource-publication"
import { movingAbroadArticles } from "@/lib/moving-abroad-data"

export default function MovingAbroadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <PageBanner title="Resources" />
        <div className="px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <ResourcePublication articles={movingAbroadArticles} />
        </div>
      </main>
      <Footer />
    </>
  )
}
