import Link from 'next/link'

const footerLinks = {
  Destinations: [
    { label: 'United Kingdom', href: '/uk' },
    { label: 'Ireland', href: '/ireland' },
    { label: 'Australia', href: '/australia' },
    { label: 'All Cities', href: '/cities' },
  ],
  Universities: [
    { label: 'University of Manchester', href: '/universities/manchester' },
    { label: 'University College London', href: '/universities/ucl' },
    { label: 'University College Dublin', href: '/universities/ucd' },
    { label: 'University of Melbourne', href: '/universities/melbourne' },
    { label: 'All Universities', href: '/universities' },
  ],
  Students: [
    { label: 'Get Matched', href: '/get-matched' },
    { label: 'Moving Abroad Guide', href: '/moving-abroad' },
    { label: 'Accommodation Types', href: '/accommodation' },
    { label: 'Budget Calculator', href: '/tools/budget' },
  ],
  Company: [
    { label: 'About HearthAway', href: '/about' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Partner with us', href: '/partners' },
    { label: 'Contact', href: '/contact' },
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

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#FFCC00] mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
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
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FFCC00] flex items-center justify-center flex-shrink-0">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 2L2 8V16H7V12H11V16H16V8L9 2Z" fill="#1B365D" />
              </svg>
            </div>
            <span className="font-heading font-bold text-lg">HearthAway</span>
          </div>

          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} HearthAway. Helping students find home, before they arrive.
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
