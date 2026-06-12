import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getCityBySlug, getUniversityBySlug, universities } from '@/lib/place-data'

const planningPlaceholders = [
  'Campus locations and the buildings used by your course',
  'Neighbourhood names commonly chosen by students',
  'Walking, cycling, and public transport commute times',
  'Average rents by room type, contract length, and bills inclusion',
  'University-specific intake dates and recommended booking windows',
  'Local safety notes, late-night transport options, and arrival guidance',
]

const bookingConsiderations = [
  'Confirm which campus or teaching building you will use most often before choosing an area.',
  'Compare the full monthly cost, including bills, deposit, transport, laundry, bedding, and one-off arrival costs.',
  'Check contract length, cancellation terms, guarantor rules, and whether summer storage or early arrival is available.',
  'Prioritise verified providers and keep written records of payments, inclusions, and promised room features.',
]

const faqs = [
  {
    question: 'When should I start looking for student accommodation?',
    answer:
      'Start as soon as your offer or likely study location is clear. Availability, contract dates, and prices can change quickly near intake periods, so early planning gives you more room to compare options.',
  },
  {
    question: 'Should I choose housing closest to campus?',
    answer:
      'Not always. A slightly longer commute can be worthwhile if it improves budget fit, room quality, transport access, or lifestyle. Confirm your course building before deciding.',
  },
  {
    question: 'What budget details should I prepare?',
    answer:
      'Prepare your monthly rent limit, deposit budget, bills preference, transport budget, and move-in date. These details make it easier to compare housing fairly.',
  },
  {
    question: 'How can HearthAway help me decide?',
    answer:
      'Tell us your course, budget, and move-in date. We can help you understand the trade-offs around location, commute, contract timing, and suitable housing types.',
  },
]

export function generateStaticParams() {
  return universities.map((university) => ({ slug: university.slug }))
}

type UniversityPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { slug } = await params
  const university = getUniversityBySlug(slug)

  if (!university) {
    notFound()
  }

  const city = university.citySlug ? getCityBySlug(university.citySlug) : undefined
  const cityHref = city ? `/cities/${city.slug}` : undefined

  return (
    <>
      <Navigation />
      <main>
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">
                University housing guide
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Student accommodation near {university.name}.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {university.city}, {university.country} &middot; content-only guidance for planning your student move before comparing accommodation options.
              </p>
              <Link
                href="/get-matched"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#FFCC00] text-[#1B365D] font-extrabold text-lg rounded-xl hover:bg-[#E6B800] transition-colors shadow-xl shadow-[#FFCC00]/20"
              >
                Get matched
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Overview
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Student accommodation near {university.name}
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  Use this guide to plan location, timing, commute, and budget questions before booking student accommodation near {university.name}. This page is guidance only and does not list live inventory, room availability, or provider stock.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Placeholder guidance
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  Where students usually live
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed mb-5">
                  Placeholder guidance: add university-specific neighbourhood names after confirming campus locations, student demand patterns, transport links, and locally relevant safety or arrival notes.
                </p>
                <div className="bg-white rounded-2xl border border-[#E8E6E1] p-5">
                  <h3 className="font-heading font-bold text-[#1A1A1A] text-sm mb-3">
                    Missing inputs before publishing exact local guidance
                  </h3>
                  <ul className="space-y-2">
                    {planningPlaceholders.map((input) => (
                      <li key={input} className="flex items-start gap-2 text-[#6B6860] text-sm leading-relaxed">
                        <span className="mt-2 w-2 h-2 rounded-full bg-[#FFCC00] flex-shrink-0" aria-hidden="true" />
                        {input}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Booking guidance
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  What to consider before booking
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bookingConsiderations.map((item) => (
                    <div key={item} className="rounded-2xl bg-[#F7F6F3] border border-[#E8E6E1] p-5">
                      <p className="text-[#6B6860] text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {cityHref ? (
                <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                    <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                      City guide
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                    Planning around {university.city}
                  </h2>
                  <p className="text-[#6B6860] text-base leading-relaxed mb-5">
                    For broader city context, review student housing guidance for transport, budgeting, and area planning in {university.city}.
                  </p>
                  <Link
                    href={cityHref}
                    className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#1B365D] text-white font-bold text-base rounded-xl hover:bg-[#24497D] transition-colors shadow-md"
                  >
                    View the {university.city} city guide
                  </Link>
                </section>
              ) : null}

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                    Student housing FAQ
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-5">
                  Frequently asked questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="rounded-2xl bg-[#F7F6F3] border border-[#E8E6E1] p-5">
                      <h3 className="font-heading font-bold text-[#1A1A1A] text-base mb-2">{faq.question}</h3>
                      <p className="text-[#6B6860] text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-6">
                <h2 className="font-heading font-bold text-xl text-[#1A1A1A] mb-3">
                  Need help near {university.name}?
                </h2>
                <p className="text-[#6B6860] text-sm leading-relaxed mb-5">
                  Tell us your course, budget, and move-in date. We will help you plan location, timing, commute, and housing type.
                </p>
                <Link
                  href="/get-matched"
                  className="inline-flex w-full items-center justify-center gap-3 px-7 py-4 bg-[#1B365D] text-white font-bold text-base rounded-xl hover:bg-[#24497D] transition-colors shadow-md"
                >
                  Get Matched
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-[#F7F6F3] py-24 lg:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl bg-[#0F2240] p-10 lg:p-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-7">
                  <div className="w-2 h-2 rounded-full bg-[#FFCC00]" aria-hidden="true" />
                  <span className="text-white/70 text-sm font-semibold">Free to use &mdash; no commitment required</span>
                </div>
                <h2 className="font-heading text-4xl lg:text-[3rem] font-extrabold text-white leading-[1.08] tracking-tight text-balance mb-6">
                  Get matched near <span className="text-[#FFCC00]">{university.name}</span>.
                </h2>
                <p className="text-white/65 text-lg leading-relaxed mb-10">
                  Tell us your course, budget, and move-in date. An accommodation advisor will help you understand your next best steps.
                </p>
                <Link
                  href="/get-matched"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#FFCC00] text-[#1B365D] font-extrabold text-lg rounded-xl hover:bg-[#E6B800] transition-colors shadow-xl shadow-[#FFCC00]/20"
                >
                  Start matching
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
