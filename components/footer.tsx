import Image from 'next/image'
import Link from 'next/link'

// Paths are case-sensitive matching your public/brand/ folder structure perfectly
const brandWordmarkPath = '/brand/hearthaway-wordmark-light.png'

const footerLinks = {
  Destinations: [
    { label: 'United Kingdom', href: '/uk' },
    { label: 'Ireland', href: '/ireland' },
    { label: 'France', href: '/france' },
    { label: 'Australia', href: '/australia' },
    { label: 'All Cities', href: '/cities' },
    { label: 'All Universities', href: '/universities' }
  ],
  Students: [
    { label: 'Get Matched', href: '/get-matched' },
    { label: 'How it works', href: '/about' },
    { label: 'Resources', href: '/moving-abroad' },

  ]
}

export default function Footer() {
  return (
    <footer className="bg-[#1B365D] text-white">
      {/* Top CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-3 text-pretty">
                {"Finding home, wherever you go."}
              </h2>
              <p className="text-white/70 text-lg max-w-xl">
                {"Tell us about your situation and we'll help you find the right accommodation near your university."}
              </p>
            </div>
            <Link
              href="/get-matched"
              className="flex-shrink-0 px-8 py-4 bg-[#F2B705] text-[#1B365D] font-bold text-lg rounded-xl hover:bg-[#D9A404] transition-colors shadow-lg"
            >
              {"Get Matched"}
            </Link>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#F2B705] mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link, idx) => (
                  // Using composite mapping keys ensures Next.js linter passes without duplication errors
                  <li key={`${category}-${link.href}-${idx}`}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Company / Contact info Block */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#F2B705] mb-4">{"Company"}</h3>
            <div className="text-sm text-white/70 space-y-3 mb-8">
              <p>
                <a href="mailto:faraz@hearthaway.com" className="hover:text-white underline">
                  {"faraz@hearthaway.com"}
                </a>
              </p>
              <p>
                <a href="tel:+919999965742" className="hover:text-white underline">
                  {"+91 99999 65742"}
                </a>
              </p>
              <p>{"H-20, Sector 63, Noida, UP 201301"}</p>
            </div>

            {/* Trustpilot Native SVG Placeholder */}
            <a href="#" aria-label="View our reviews on Trustpilot" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors px-4 py-3 rounded-xl border border-white/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#00B67A" className="w-6 h-6 flex-shrink-0">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-sm leading-none mb-1">{"Excellent"}</span>
                <span className="text-white/50 text-[10px] leading-none uppercase tracking-wider">{"Trustpilot"}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom branding and metadata segment */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Link href="/" aria-label="HearthAway home" className="flex items-center">
              <Image
                src={brandWordmarkPath}
                alt="HearthAway"
                width={128}
                height={57}
                className="h-9 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            
            {/* Native SVG Social Links */}
            <div className="flex items-center gap-5 sm:border-l sm:border-white/20 sm:pl-6">
              <a href="https://www.linkedin.com/company/hearthaway" aria-label="LinkedIn" className="text-white/50 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.instagram.com/hearthaway_official" aria-label="Instagram" className="text-white/50 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <p className="text-white/40 text-xs md:text-sm">
            {"© 2026 Jiraiya Education LLP. Helping students find home, before they arrive."}
          </p>

          <div className="flex gap-5 text-xs md:text-sm text-white/40">
            <Link href="/partners" className="hover:text-white font-medium transition-colors">{"For Partners"}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{"Privacy"}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{"Terms"}</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">{"Cookies"}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
