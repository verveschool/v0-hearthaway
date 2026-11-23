import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function BudgetToolPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageBanner title="Plan your student budget" action={{ label: 'Browse budgeting guides', href: '/all-resources?topic=Budgeting' }} />
        <section className="mx-auto max-w-3xl px-6 py-12 text-center">
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
