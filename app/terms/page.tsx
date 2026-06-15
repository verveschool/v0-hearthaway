import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | HearthAway',
  description: 'Terms of Service for HearthAway, operated by Jiraiya Education LLP.',
}

export default function TermsPage() {
  return (
    <>
      <Navigation />

      <main>
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">
                Terms of Service
              </div>

              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Terms governing your use of HearthAway.
              </h1>

              <p className="text-white/70 text-lg leading-relaxed">
                HearthAway is operated by Jiraiya Education LLP. By using our website and services, you agree to these terms.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <article className="lg:col-span-2 space-y-5">

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  1. Acceptance Of Terms
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  By accessing or using HearthAway, you agree to be bound by these Terms of Service. If you do not agree, please do not use the website or related services.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  2. Our Services
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed mb-4">
                  HearthAway helps students explore housing options and accommodation guidance before studying abroad.
                </p>

                <ul className="space-y-3 text-[#6B6860] text-base leading-relaxed">
                  <li>Student accommodation guidance</li>
                  <li>Destination and university information</li>
                  <li>Housing matching assistance</li>
                  <li>Connections with accommodation providers and partners</li>
                </ul>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  3. No Guarantee Of Housing
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  Submission of information through HearthAway does not guarantee accommodation, room availability, pricing, university admission, visa approval, or any specific outcome.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  4. User Responsibilities
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed mb-4">
                  You agree to:
                </p>

                <ul className="space-y-3 text-[#6B6860] text-base leading-relaxed">
                  <li>Provide accurate information</li>
                  <li>Use the website lawfully</li>
                  <li>Not interfere with the operation of the website</li>
                  <li>Not attempt unauthorised access to systems or data</li>
                  <li>Not submit false or misleading information</li>
                </ul>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  5. Third-Party Providers
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  HearthAway may introduce users to accommodation providers, property operators, booking platforms, and other partners. Any agreement entered into with a third party is solely between you and that third party.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  6. Intellectual Property
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  All content, branding, graphics, text, designs, logos, and materials on HearthAway are owned by or licensed to Jiraiya Education LLP unless stated otherwise. They may not be copied, reproduced, or distributed without permission.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  7. Disclaimer
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  Information provided on HearthAway is for general informational purposes. While we aim for accuracy, we do not guarantee that all information is complete, current, or error free.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  8. Limitation Of Liability
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  To the maximum extent permitted by law, Jiraiya Education LLP shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from your use of the website or related services.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  9. Changes To These Terms
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  We may update these terms from time to time. Updated versions will be published on this page and become effective upon publication.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  10. Governing Law
                </h2>

                <p className="text-[#6B6860] text-base leading-relaxed">
                  These terms are governed by the laws of India. Any disputes arising from the use of HearthAway shall be subject to the jurisdiction of the courts located in Uttar Pradesh, India.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  11. Contact
                </h2>

                <div className="space-y-2 text-[#6B6860] text-base leading-relaxed">
                  <p>Jiraiya Education LLP</p>

                  <p>
                    Email:{' '}
                    <Link
                      href="mailto:faraz@hearthaway.com"
                      className="text-[#1B365D] font-semibold underline"
                    >
                      faraz@hearthaway.com
                    </Link>
                  </p>

                  <p>
                    Phone:{' '}
                    <Link
                      href="tel:+919999965742"
                      className="text-[#1B365D] font-semibold underline"
                    >
                      +91 99999 65742
                    </Link>
                  </p>

                  <p>
                    Plot No. 20, Block H-1/A, Sector 63, Noida,
                    Gautam Buddha Nagar, Uttar Pradesh 201301
                  </p>
                </div>
              </section>
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-6">
                <h2 className="font-heading font-bold text-xl text-[#1A1A1A] mb-3">
                  Questions?
                </h2>

                <p className="text-[#6B6860] text-sm leading-relaxed mb-5">
                  Contact us if you have any questions regarding these terms or our services.
                </p>

                <Link
                  href="mailto:faraz@hearthaway.com"
                  className="inline-flex w-full items-center justify-center gap-3 px-7 py-4 bg-[#1B365D] text-white font-bold text-base rounded-xl hover:bg-[#24497D] transition-colors shadow-md"
                >
                  Contact us
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
