'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const brandWordmarkPath = '/brand/hearthaway-wordmark-light.png'

const navLinks = [
  {
    label: 'Universities',
    href: '/universities',
    dropdown: [
      { label: 'All Universities', href: '/universities' },
      { label: 'United Kingdom', href: '/uk/universities' },
      { label: 'Ireland', href: '/ireland/universities' },
      { label: 'Australia', href: '/australia/universities' },
    ],
  },
  {
    label: 'Cities',
    href: '/cities',
    dropdown: [
      { label: 'London', href: '/cities/london' },
      { label: 'Manchester', href: '/cities/manchester' },
      { label: 'Dublin', href: '/cities/dublin' },
      { label: 'Sydney', href: '/cities/sydney' },
      { label: 'Melbourne', href: '/cities/melbourne' },
      { label: 'All Cities', href: '/cities' },
    ],
  },
  {
    label: 'Moving Abroad',
    href: '/moving-abroad',
  },
  {
    // Visible label changed from "About" to "How it Works" per spec, routing unchanged
    label: 'How it Works',
    href: '/about',
  },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1B365D]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="HearthAway home">
            <Image
              src={brandWordmarkPath}
              alt="HearthAway"
              width={150}
              height={67}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-150"
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                    />
                  )}
                </Link>

                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl border border-[#E8E6E1] py-2 z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#F7F6F3] hover:text-[#1B365D] transition-colors font-medium"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/get-matched"
              className="px-5 py-2.5 bg-[#FFCC00] text-[#1B365D] text-sm font-bold rounded-xl hover:bg-[#E6B800] transition-all duration-150 shadow-md hover:shadow-lg"
            >
              Get Matched
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1B365D] border-t border-white/10 px-6 pb-6">
          <div className="pt-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-matched"
              className="mt-3 px-5 py-3 bg-[#FFCC00] text-[#1B365D] font-bold rounded-xl text-center hover:bg-[#E6B800] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get Matched
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
