import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl font-bold mb-4">Terms</h1>
          <p className="text-muted-foreground mb-6">Terms and conditions will be published here. This placeholder keeps footer links functional during development.</p>
        </section>
      </main>
      <Footer />
    </>
  )
}
