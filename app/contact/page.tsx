import type { Metadata } from 'next'
import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import PageBanner from '@/components/page-banner'
import { hearthAwayContact } from '@/lib/contact-details'

export const metadata: Metadata = {
  title: 'Contact | HearthAway',
  description: 'Contact HearthAway by email or phone.',
  alternates: { canonical: '/contact' },
}

const contactLink = 'break-words font-semibold text-brand-blue underline underline-offset-4'

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="bg-warm-gray">
        <PageBanner title="Contact" />

        <section aria-label="Contact details" className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <dl className="grid gap-6 rounded-2xl border border-mid-gray bg-white p-6 sm:grid-cols-3 sm:p-8">
            <div>
              <dt className="mb-2 text-sm font-bold text-charcoal-ink">Email</dt>
              <dd><a href={`mailto:${hearthAwayContact.email}`} className={contactLink}>{hearthAwayContact.email}</a></dd>
            </div>
            <div>
              <dt className="mb-2 text-sm font-bold text-charcoal-ink">Phone</dt>
              <dd><a href={hearthAwayContact.phone.href} className={contactLink}>{hearthAwayContact.phone.label}</a></dd>
            </div>
            <div>
              <dt className="mb-2 text-sm font-bold text-charcoal-ink">Address</dt>
              <dd>{hearthAwayContact.address}</dd>
            </div>
          </dl>
        </section>
      </main>
      <Footer />
    </>
  )
}
