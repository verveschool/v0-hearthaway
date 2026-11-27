
import Image from 'next/image'
import Link from 'next/link'
import ReviewCollector from '@/components/home/review-collector'
import { hearthAwayContact } from '@/lib/contact-details'

const brandWordmarkPath = '/brand-optimized/wordmark.png'

const priorityDestinations = [
  { label: 'United Kingdom', href: '/uk' },
  { label: 'Australia', href: '/australia' },
  { label: 'Germany', href: '/germany' },
  { label: 'Ireland', href: '/ireland' },
  { label: 'Italy', href: '/italy' },
  { label: 'Spain', href: '/spain' },
]

const destinationLinks = [
  { label: 'All Universities', href: '/universities' },
  { label: 'All Cities', href: '/cities' },
  ...priorityDestinations,
]

const accommodationLinks = [
  { label: 'All Properties', href: '/accommodation' },
  { label: 'All Rooms', href: '/accommodation/rooms' },
  { label: 'Vita Student', href: '/accommodation?provider=vita-student' },
  { label: 'STACEY', href: '/accommodation?provider=stacey' },
  { label: 'Iglu', href: '/accommodation?provider=iglu' },
  { label: 'Neon Wood', href: '/accommodation?provider=neon-wood' },  { label: 'Study Inn', href: '/accommodation?provider=study-inn' },
]

const resourceLinks = [
  { label: 'All Resources', href: '/all-resources' },
  {
    label: 'Pre-Arrival Checklist',
    href: '/moving-abroad/pre-arrival-checklist',
  },
  { label: 'Student Visa', href: '/moving-abroad/student-visa' },
  {
    label: 'Accommodation Guide',
    href: '/moving-abroad/choose-accommodation',
  },
  {
    label: 'Budget Planning',
    href: '/moving-abroad/real-cost-abroad',
  },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About Us', href: '/about' },
]

const linkClass =
  'text-sm font-semibold text-[#171717] transition-colors hover:text-[#01329C]'

function FooterLinkGroup({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="min-w-0">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#01329C]">
        {title}
      </h3>

      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="font-sans">
      {/* CTA section */}
      <section className="bg-[#01329C] text-white">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-8 lg:py-9">
          <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                Finding home, wherever you go.
              </h2>

              <p className="max-w-xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
                Tell us about your situation and we&apos;ll help you find the
                right property near your university.
              </p>
            </div>

            <Link
              href="/get-matched"
              className="brand-cta inline-flex min-h-12 w-full flex-shrink-0 items-center justify-center rounded-xl bg-[#FEBB01] px-8 py-4 text-center text-base font-bold text-[#333333] sm:w-auto"
            >
              Get Matched
            </Link>
          </div>
        </div>
      </section>

      {/* Footer navigation */}
      <section className="bg-white text-[#171717]">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 sm:py-10 lg:px-8 lg:py-12">
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-10 xl:grid-cols-4 xl:gap-8">

            {/* Destinations */}
            <FooterLinkGroup
              title="Destinations"
              links={destinationLinks}
            />

            {/* Accommodation */}
            <FooterLinkGroup
              title="Accommodation"
              links={accommodationLinks}
            />

            {/* Resources */}
            <FooterLinkGroup
              title="Resources"
              links={resourceLinks}
            />

            {/* Contact */}
            <div className="min-w-0">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#01329C]">
                <Link href="/contact" className="underline-offset-4 hover:underline">Contact</Link>
              </h3>

              <div className="space-y-3 text-sm font-medium text-[#6B6B6B]">
                <p>
                  <a
                    href={`mailto:${hearthAwayContact.email}`}
                    className="break-words underline transition-colors hover:text-[#01329C]"
                  >
                    {hearthAwayContact.email}
                  </a>
                </p>

                <p>
                  <a
                    href={hearthAwayContact.phone.href}
                    className="underline transition-colors hover:text-[#01329C]"
                  >
                    {hearthAwayContact.phone.label}
                  </a>
                </p>

                <p className="max-w-[220px] text-sm font-medium leading-relaxed">
                  {hearthAwayContact.address}
                </p>

                <p>
                  <Link
                    href="/partners"
                    className="font-semibold text-[#171717] transition-colors hover:text-[#01329C]"
                  >
                    For Partners
                  </Link>
                </p>

                <p>
                  <Link
                    href="/careers"
                    className="font-semibold text-[#171717] transition-colors hover:text-[#01329C]"
                  >
                    Careers
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width review section */}
        <ReviewCollector />

        {/* Bottom row */}
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8">
          <div className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-center lg:grid-cols-[auto_1fr_auto] lg:gap-x-6">

            {/* Logo and social links */}
            <div className="flex items-center justify-between gap-4 sm:col-span-2 lg:col-span-1">
              <Link
                href="/"
                aria-label="HearthAway home"
                className="inline-flex items-center"
              >
                <Image
                  src={brandWordmarkPath}
                  alt="HearthAway"
                  width={336}
                  height={100}
                  className="h-auto w-36 sm:w-44 lg:w-40 xl:w-44"
                />
              </Link>

              <div className="flex shrink-0 items-center gap-1">
                <a
                  href="https://www.linkedin.com/company/hearthaway"
                  aria-label="LinkedIn"
                  className="inline-flex size-11 items-center justify-center rounded-lg text-[#01329C]/60 transition-colors hover:text-[#01329C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01329C]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/hearthaway_official"
                  aria-label="Instagram"
                  className="inline-flex size-11 items-center justify-center rounded-lg text-[#01329C]/60 transition-colors hover:text-[#01329C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01329C]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-xs font-normal text-[#6B6B6B] lg:text-center">
              © 2026 JIRAIYA EDUCATION LLP
            </p>

            {/* Legal */}
            <div className="flex flex-wrap items-center gap-x-5 text-xs font-normal text-[#6B6B6B]">
              <Link
                href="/privacy"
                className="inline-flex min-h-11 items-center transition-colors hover:text-[#01329C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01329C]"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="inline-flex min-h-11 items-center transition-colors hover:text-[#01329C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01329C]"
              >
                Terms
              </Link>

              <Link
                href="/cookies"
                className="inline-flex min-h-11 items-center transition-colors hover:text-[#01329C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01329C]"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
