import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Contact</h1>
          <p className="text-muted-foreground mb-6">For press and partnership enquiries please email hello@hearthaway.example (placeholder).</p>
        </section>
      </main>
      <Footer />
    </>
  )
}
