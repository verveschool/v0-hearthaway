import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function BudgetToolPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Budget calculator</h1>
          <p className="text-muted-foreground mb-6">
            The budget calculator is under development. If you need budgeting help now, our team can help when you
            get matched.
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
