import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">How it works</h1>
          <p className="text-[#6B6860] mb-6">
            A short guide on how HearthAway helps students find accommodation is coming soon. For personalised help, use
            our Get Matched tool.
          </p>
          <Link
            href="/get-matched"
            className="inline-block px-6 py-3 bg-[#FFCC00] text-[#1B365D] font-bold rounded-xl hover:bg-[#E6B800] transition-colors"
          >
            Get Matched
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
