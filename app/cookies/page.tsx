import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookies Policy | HearthAway',
  description: 'Cookies policy for HearthAway, operated by Jiraiya Education LLP.',
}

export default function CookiesPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">
                Cookies Policy
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                How we use cookies.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                HearthAway is operated by Jiraiya Education LLP. This page explains what cookies are, how we use them, and how you can manage them.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <article className="lg:col-span-2 space-y-5">
              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  1. What Cookies Are
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  Cookies are small text files stored on your device when you visit a website. They help the site work and help us understand how people use it.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  2. How We Use Cookies
                </h2>
                <ul className="space-y-3 text-[#6B6860] text-base leading-relaxed">
                  <li>Keep the website functional</li>
                  <li>Remember your settings</li>
                  <li>Understand traffic and behaviour</li>
                  <li>Improve speed and performance</li>
                  <li>Support forms and matching flows</li>
                </ul>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  3. Types Of Cookies We Use
                </h2>

                <div className="space-y-4 text-[#6B6860] text-base leading-relaxed">
                  <div>
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-base mb-1">
                      Strictly Necessary Cookies
                    </h3>
                    <p>These are needed for core site functions such as navigation, forms, and security.</p>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-base mb-1">
                      Performance Cookies
                    </h3>
                    <p>These help us understand how visitors use the site so we can improve it.</p>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-base mb-1">
                      Preference Cookies
                    </h3>
                    <p>These remember settings such as language or page choices.</p>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-base mb-1">
                      Analytics Cookies
                    </h3>
                    <p>These help us measure traffic and usage patterns.</p>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-base mb-1">
                      Marketing Cookies
                    </h3>
                    <p>These may be used to measure campaign performance or show relevant content.</p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  4. Third Party Cookies
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  Some cookies may be placed by third-party services we use for analytics, embeds, or performance tools.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  5. Managing Cookies
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  You can control cookies through your browser settings. You may also delete cookies already stored on your device. Disabling some cookies may affect site performance.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  6. Updates To This Policy
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  We may update this policy when our tools or site features change. The latest version will always be posted here.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  7. Contact
                </h2>
                <div className="space-y-2 text-[#6B6860] text-base leading-relaxed">
                  <p>Jiraiya Education LLP</p>
                  <p>
                    Email:{' '}
                    <Link href="mailto:faraz@hearthaway.com" className="text-[#1B365D] font-semibold underline">
                      faraz@hearthaway.com
                    </Link>
                  </p>
                  <p>
                    Phone:{' '}
                    <Link href="tel:+919999965742" className="text-[#1B365D] font-semibold underline">
                      +91 99999 65742
                    </Link>
                  </p>
                  <p>Plot No. 20, Block H-1/A, Sector 63, Noida, Gautam Buddha Nagar, Uttar Pradesh 201301</p>
                </div>
              </section>
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-6">
                <h2 className="font-heading font-bold text-xl text-[#1A1A1A] mb-3">
                  Cookie Control
                </h2>
                <p className="text-[#6B6860] text-sm leading-relaxed mb-5">
                  Use your browser settings to manage cookies on your device.
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
