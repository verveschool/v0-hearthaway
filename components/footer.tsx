import Image from 'next/image'
import Link from 'next/link'

// Paths are case-sensitive matching your public/brand/ folder structure perfectly
const brandWordmarkPath = '/brand/hearthaway-wordmark-light.png'

const footerLinks = {
  Destinations: [
    { label: 'United Kingdom', href: '/uk' },
    { label: 'Ireland', href: '/ireland' },
    { label: 'Australia', href: '/australia' },
    { label: 'All Cities', href: '/cities' },
  ],
  Universities: [
    { label: 'All Universities', href: '/universities' },
  ],
  Students: [
    { label: 'Get Matched', href: '/get-matched' },
    { label: 'Moving Abroad Guide', href: '/moving-abroad' },
    { label: 'How it works', href: '/about' },
  ],
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
                Ready to find your home away from home?
              </h2>
              <p className="text-white/70 text-lg max-w-xl">
                Tell us about your situation and we&apos;ll help you find the right accommodation near your university.
              </p>
            </div>
            <Link
              href="/get-matched"
              className="flex-shrink-0 px-8 py-4 bg-[#FFCC00] text-[#1B365D] font-bold text-lg rounded-xl hover:bg-[#E6B800] transition-colors shadow-lg"
            >
              Get Matched
            </Link>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#FFCC00] mb-4">
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
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#FFCC00] mb-4">Company</h3>
            <div className="text-sm text-white/70 space-y-3">
                <a href="mailto:faraz@hearthaway.com" className="hover:text-white underline">
                  faraz@hearthaway.com
                </a>
              </p>
              <p>
                <a href="tel:+919999965742" className="hover:text-white underline">
                  +91 99999 65742
                </a>
              </p>
              <p className="text-sm">1st Floor, H-20, Sector 63, Noida, UP 201301</p>
            </div>
          </div>
        </div>

        {/* Bottom branding and metadata segment */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Link href="/" aria-label="HearthAway home" className="flex items-center">
            <Image
              src={brandWordmarkPath}
              alt="HearthAway"
              width={128}
              height={57}
              className="h-9 w-auto"
            />
          </Link>

          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Jiraiya Education LLP. Helping students find home, before they arrive.
          </p>

          <div className="flex gap-4 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-white/80 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/80 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-white/80 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
