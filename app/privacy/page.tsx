import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | HearthAway',
  description: 'Privacy policy for HearthAway, operated by Jiraiya Education LLP.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">
                Privacy Policy
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                How we handle your data.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                HearthAway is operated by Jiraiya Education LLP. This page explains what data we collect, how we use it, and the choices you have when you use our site and services.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <article className="lg:col-span-2 space-y-5">
              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  1. Introduction
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  HearthAway, operated by Jiraiya Education LLP, respects your privacy. This policy explains what data we collect, how we use it, and the choices you have when you use our website and services.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  2. Information We Collect
                </h2>
                <ul className="space-y-3 text-[#6B6860] text-base leading-relaxed">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>University name</li>
                  <li>City and country of study</li>
                  <li>Budget and accommodation preferences</li>
                  <li>Messages you send through forms</li>
                  <li>Device and browser data</li>
                  <li>Pages you view on our website</li>
                  <li>Cookie and tracking data</li>
                </ul>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  3. How We Use Your Information
                </h2>
                <ul className="space-y-3 text-[#6B6860] text-base leading-relaxed">
                  <li>Respond to your enquiries</li>
                  <li>Match you with suitable accommodation</li>
                  <li>Improve our website and services</li>
                  <li>Send service updates</li>
                  <li>Analyse site usage</li>
                  <li>Prevent fraud and misuse</li>
                  <li>Comply with legal duties</li>
                </ul>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  4. Sharing Your Information
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed mb-4">
                  We may share data with:
                </p>
                <ul className="space-y-3 text-[#6B6860] text-base leading-relaxed">
                  <li>Service providers that help us run the website</li>
                  <li>Accommodation partners or advisors, where needed to support your request</li>
                  <li>Legal or regulatory authorities, when required</li>
                </ul>
                <p className="text-[#6B6860] text-base leading-relaxed mt-4">
                  We do not sell your personal data.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  5. Cookies And Tracking
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  We use cookies and similar tools to keep the site working, understand traffic and usage, improve performance, and remember preferences. For more detail, see our Cookies Policy.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  6. Data Retention
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  We keep personal data only for as long as needed for the purpose it was collected, unless a longer period is required by law.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  7. Your Rights
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed mb-4">
                  Depending on where you live, you may have rights to:
                </p>
                <ul className="space-y-3 text-[#6B6860] text-base leading-relaxed">
                  <li>Access your data</li>
                  <li>Correct your data</li>
                  <li>Delete your data</li>
                  <li>Restrict or object to processing</li>
                  <li>Withdraw consent</li>
                  <li>Request a copy of your data</li>
                </ul>
                <p className="text-[#6B6860] text-base leading-relaxed mt-4">
                  To use any of these rights, contact us at{' '}
                  <Link href="mailto:faraz@hearthaway.com" className="text-[#1B365D] font-semibold underline">
                    faraz@hearthaway.com
                  </Link>
                  .
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  8. Security
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  We use reasonable technical and organisational measures to protect your data. No system is perfect, so we cannot promise absolute security.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-white p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  9. International Users
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  If you use our site from outside our main operating region, your data may be processed in other countries.
                </p>
              </section>

              <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:p-10">
                <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">
                  10. Changes To This Policy
                </h2>
                <p className="text-[#6B6860] text-base leading-relaxed">
                  We may update this policy from time to time. The latest version will always be posted on this page.
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
                  Need help?
                </h2>
                <p className="text-[#6B6860] text-sm leading-relaxed mb-5">
                  Contact us if you want a copy of your data or have a question on how we handle personal information.
                </p>
                <Link
                  href="mailto:faraz@hearthaway.com"
                  className="inline-flex w-full items-center justify-center gap-3 px-7 py-4 bg-[#1B365D] text-white font-bold text-base rounded-xl hover:bg-[#24497D] transition-colors shadow-md"
                >
                  Email us
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
