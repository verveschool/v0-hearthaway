import Image from 'next/image'
import Link from 'next/link'

const brandWordmarkPath = '/brand/  hearthaway_icon_light.png'

const footerLinks = {
  Destinations: [
    { label: 'UK', href: '/uk' },
    { label: 'Ireland', href: '/ireland' },
    { label: 'France', href: '/france' },
    { label: 'UAE', href: '/uae' },
    { label: 'Germany', href: '/germany' },
    { label: 'Australia', href: '/australia' },
  ],

  Students: [
    { label: 'All Cities', href: '/cities' },
    { label: 'All Universities', href: '/universities' },
    { label: 'Resources', href: '/moving-abroad' },
    { label: 'About', href: '/about' },
    { label: 'Get Matched', href: '/get-matched' },
  ],

  Guides: [
    { label: 'Pre-Arrival Checklist', href: '/moving-abroad/pre-arrival-checklist' },
    { label: 'Student Visa', href: '/moving-abroad/student-visa' },
    { label: 'Accommodation Guide', href: '/moving-abroad/choose-accommodation' },
    { label: 'Budget Planning', href: '/moving-abroad/real-cost-abroad' },
  ],
}

export default function Footer() {
  return (
    <footer className="font-sans">

      {/* CTA section */}
      <section className="bg-[#00319D] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8 lg:py-14">
          <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                Finding home, wherever you go.
              </h2>

              <p className="max-w-xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
                Tell us about your situation and we&apos;ll help you find the
                right accommodation near your university.
              </p>
            </div>

            <Link
              href="/get-matched"
              className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-xl bg-[#FCC20A] px-8 py-4 text-center text-base font-bold text-[#00319D] shadow-lg transition-colors hover:bg-[#FCC20A] sm:w-auto"
            >
              Get Matched
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-white text-[#171717]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8 lg:py-14">

          {/* Navigation + contact */}
          <div className="flex flex-col gap-10 sm:flex-row sm:flex-nowrap sm:items-start sm:justify-between sm:gap-8">

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="sm:flex-shrink-0">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00319D]">
                  {category}
                </h3>

                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={`${category}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-sm font-semibold text-[#171717] transition-colors hover:text-[#00319D]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div className="sm:flex-shrink-0">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00319D]">
                Contact
              </h3>

              <div className="space-y-3 text-sm font-medium text-[#6B6B6B]">
                <p>
                  <a
                    href="mailto:faraz@hearthaway.com"
                    className="underline transition-colors hover:text-[#00319D]"
                  >
                    faraz@hearthaway.com
                  </a>
                </p>

                <p>
                  <a
                    href="tel:+919999965742"
                    className="underline transition-colors hover:text-[#00319D]"
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
                    className="font-semibold text-[#171717] transition-colors hover:text-[#00319D]"
                  >
                    For Partners
                  </Link>
                </p>

                <p>
                  <Link
                    href="/careers"
                    className="font-semibold text-[#171717] transition-colors hover:text-[#00319D]"
                  >
                    Careers
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-10 flex flex-col gap-6 border-t border-[#E5E5E5] pt-7 md:flex-row md:items-center md:justify-between">

            {/* Logo + socials */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/"
                aria-label="HearthAway home"
                className="flex items-center"
              >
                <Image
                  src={brandWordmarkPath}
                  alt="HearthAway"
                  width={128}
                  height={57}
                  className="h-9 w-auto"
                  priority
                />
              </Link>

              <div className="flex items-center gap-5 sm:border-l sm:border-[#E5E5E5] sm:pl-6">

                <a
                  href="https://www.linkedin.com/company/hearthaway"
                  aria-label="LinkedIn"
                  className="text-[#00319D]/60 transition-colors hover:text-[#00319D]"
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
                  className="text-[#00319D]/60 transition-colors hover:text-[#00319D]"
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
                className="transition-colors hover:text-[#00319D]"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-[#00319D]"
              >
                Terms
              </Link>

              <Link
                href="/cookies"
                className="transition-colors hover:text-[#00319D]"
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
