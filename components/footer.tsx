
import Image from 'next/image'
import Link from 'next/link'
import ReviewCollector from '@/components/home/review-collector'

const brandWordmarkPath = '/brand/hearthaway_branding.png'

const priorityDestinations = [
  { label: 'United Kingdom', href: '/uk' },
  { label: 'Australia', href: '/australia' },
  { label: 'Germany', href: '/germany' },
  { label: 'France', href: '/france' },
  { label: 'Ireland', href: '/ireland' },
  { label: 'Dubai', href: '/uae' },
  { label: 'Spain', href: '/spain' },
  { label: 'Italy', href: '/italy' },
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
  { label: 'Stacey', href: '/accommodation?provider=stacey' },
]

const resourceLinks = [
  { label: 'All Resources', href: '/moving-abroad' },
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
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8 lg:py-14">
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
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8 lg:py-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">

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
                Contact
              </h3>

              <div className="space-y-3 text-sm font-medium text-[#6B6B6B]">
                <p>
                  <a
                    href="mailto:faraz@hearthaway.com"
                    className="underline transition-colors hover:text-[#01329C]"
                  >
                    faraz@hearthaway.com
                  </a>
                </p>

                <p>
                  <a
                    href="tel:+919999965742"
                    className="underline transition-colors hover:text-[#01329C]"
                  >
                    +91 99999 65742
                  </a>
                </p>

                <p className="max-w-[220px] text-sm font-medium leading-relaxed">
                  20, H-1/A, Sec 63, Noida 201301
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
        <div className="mx-auto mt-10 max-w-7xl px-6 sm:px-10 lg:px-8">
          <div className="flex flex-col gap-6 border-t border-[#E5E5E5] py-7 md:flex-row md:items-center md:justify-between">

            {/* Logo and social links */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
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
                  className="h-auto w-[13rem] translate-y-1 sm:w-[14rem]"
                />
              </Link>

              <div className="flex items-center gap-5 sm:border-l sm:border-[#E5E5E5] sm:pl-6">
                <a
                  href="https://www.linkedin.com/company/hearthaway"
                  aria-label="LinkedIn"
                  className="text-[#01329C]/60 transition-colors hover:text-[#01329C]"
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
                  className="text-[#01329C]/60 transition-colors hover:text-[#01329C]"
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
            <p className="text-xs font-normal text-[#6B6B6B] md:text-sm">
              © 2026 JIRAIYA EDUCATION LLP
            </p>

            {/* Legal */}
            <div className="flex gap-5 text-xs font-normal text-[#6B6B6B] md:text-sm">
              <Link
                href="/privacy"
                className="transition-colors hover:text-[#01329C]"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-[#01329C]"
              >
                Terms
              </Link>

              <Link
                href="/cookies"
                className="transition-colors hover:text-[#01329C]"
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
