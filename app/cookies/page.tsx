import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function CookiesPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl font-bold mb-4">Cookies</h1>
          <p className="text-muted-foreground mb-6">Cookie settings and details will be available here. This is a temporary page to avoid 404s.</p>
        </section>
      </main>
      <Footer />
    </>
  )
}
