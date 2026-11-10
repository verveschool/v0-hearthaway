import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, MapPin, MessageCircle } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'How HearthAway Works | Student Accommodation Support',
  description:
    'Explore student accommodation, save rooms to a shortlist, and get practical guidance from the HearthAway team.',
}

const steps = [
  {
    number: '01',
    title: 'Explore places and rooms',
    description:
      'Start with a destination, university, or room type. Compare current partner listings and the details available for each option.',
    href: '/accommodation',
    linkLabel: 'Explore accommodation',
    icon: MapPin,
  },
  {
    number: '02',
    title: 'Keep your options together',
    description:
      'Create an account to save rooms to a shortlist, revisit their details, and keep your housing plans in one place.',
    href: '/accommodation/rooms',
    linkLabel: 'Browse room types',
    icon: Bookmark,
  },
  {
    number: '03',
    title: 'Get help choosing your next step',
    description:
      'Share your destination, timing, budget, and priorities. Our team can help you compare suitable options and request the next step when you are ready.',
    href: '/get-matched',
    linkLabel: 'Talk to our team',
    icon: MessageCircle,
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F6F3]">
        <section className="bg-[#00319D] px-6 py-16 text-white sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#FCC20A]">
              How HearthAway works
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
              A clearer path to finding your student home.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Explore at your own pace, save the rooms that stand out, and bring in our team whenever you want a hand.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/accommodation"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/35 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCC20A]"
              >
                Explore accommodation
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/get-matched"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FCC20A] px-5 py-3 text-sm font-extrabold text-[#1A1A1A] transition-colors hover:bg-[#f5b900] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00319D]"
              >
                Get matched
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="journey-heading" className="px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8 max-w-2xl sm:mb-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#00319D]">
                Your search, supported
              </p>
              <h2 id="journey-heading" className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-3xl">
                Three steps, with room to make your own decision.
              </h2>
            </header>

            <ol className="grid gap-4 md:grid-cols-3">
              {steps.map(({ number, title, description, href, linkLabel, icon: Icon }) => (
                <li key={number} className="flex min-h-full flex-col rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-[#F7F6F3] text-[#00319D]">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-xs font-extrabold tracking-[0.16em] text-[#8A877F]">{number}</span>
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-extrabold leading-snug text-[#1A1A1A]">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6B6860]">{description}</p>
                  <Link
                    href={href}
                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#00319D] underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2"
                  >
                    {linkLabel}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
