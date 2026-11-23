'use client'

import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import Footer from '@/components/footer'

export default function PartnershipsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F6F3]">
        <PageBanner
          title="Help your students feel at home"
          action={{ label: 'Talk to us about partnering', href: '#partner-with-us' }}
        />
        <div className="mx-auto box-content max-w-3xl px-6 pb-24 pt-12">
          <div className="mb-12">
            <p className="text-lg leading-relaxed text-[#6B6860]">
              For many students, finding housing becomes the next challenge after receiving a visa. HearthAway helps education partners support students through the housing process with confidence.
            </p>
          </div>

          <div className="mb-12 rounded-2xl border border-[#E8E6E1] bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-heading text-2xl font-bold text-[#1A1A1A]">
              What we help with.
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-[#6B6860]">
                Students compare unfamiliar cities, review lease terms, evaluate landlords, and try to avoid scams while preparing to move. We help them make informed housing decisions before they arrive.
              </p>
              <ul className="list-inside list-disc space-y-2 text-sm text-[#1A1A1A]">
                <li>Housing search and accommodation options.</li>
                <li>Area and neighbourhood guidance.</li>
                <li>Lease and deposit support.</li>
                <li>Scam prevention and verification.</li>
                <li>Ongoing support throughout the housing journey.</li>
              </ul>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-[#E8E6E1] bg-white p-8 shadow-sm">
            <h2 className="mb-3 font-heading text-xl font-bold text-[#1A1A1A]">
              Why HearthAway.
            </h2>
            <p className="text-[#6B6860]">
              HearthAway is led by Faraz Arif, who has spent the last four years in international student housing, including leadership roles at University Living and UniAcco.
            </p>
          </div>

          <div id="partner-with-us" className="scroll-mt-28 rounded-2xl bg-[#00319D] p-8 text-white">
            <h2 className="mb-3 font-heading text-2xl font-bold">
              Looking for a housing partner for your students?
            </h2>
            <p className="mb-6 text-white/80">
              We help education partners stay focused on admissions and student success while HearthAway handles the housing journey.
            </p>
            <a
              href="https://wa.me/919999965742"
              className="inline-flex rounded-xl bg-white px-8 py-4 font-bold text-[#00319D] transition hover:bg-[#F2F2F2]"
            >
              Let’s Talk
            </a>
          </div>

          <div className="mt-12 text-center text-sm text-[#6B6860]">
            <p className="font-bold text-[#1A1A1A]">Faraz Arif</p>
            <p>Co-Founder, HearthAway</p>
            <a
              href="mailto:faraz@hearthaway.com"
              className="font-bold text-[#00319D] underline"
            >
              faraz@hearthaway.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
