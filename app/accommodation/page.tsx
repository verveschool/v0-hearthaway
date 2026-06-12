import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function AccommodationPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Accommodation</h1>
          <p className="text-muted-foreground mb-6">
            We&apos;re rolling out full accommodation pages soon. In the meantime, try our Get Matched service
            and we&apos;ll help you find verified student housing near your university.
          </p>
          <Link
            href="/get-matched"
            className="inline-block px-6 py-3 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-[var(--color-hearth-gold-dark)] transition-colors"
          >
            Get Matched
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
