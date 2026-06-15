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
      { label: 'Australia', href: '/australia/universities' }
    ]
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
      { label: 'All Cities', href: '/cities' }
    ]
  },
  {
    label: 'How it Works',
    href: '/about'
  },
  {
    label: 'Resources',
    href: '/moving-abroad'
  } 
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
        setActiveDropdown(null)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className="bg-[#1B365D] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* logo brand segment */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="HearthAway Home" className="flex items-center">
              <Image
                src={brandWordmarkPath}
                alt="HearthAway Logo"
                width={128}
                height={57}
                className="h-9 w-auto"
                priority
              />
            </Link>
          </div>

          {/* desktop navigation links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <div 
                key={`desktop-main-${link.label}-${idx}`} 
                className="relative group py-2"
                onMouseEnter={() => link.dropdown && setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <button className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium transition-colors">
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link href={link.href} className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                    {link.label}
                  </Link>
                )}

                {/* submenu dropdown rendering */}
                {link.dropdown && activeDropdown === idx && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-slate-100">
                    {link.dropdown.map((subLink, subIdx) => (
                      <Link
                        key={`desktop-sub-${subLink.label}-${subIdx}`}
                        href={subLink.href}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1B365D] transition-colors"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <Link
              href="/get-matched"
              className="px-5 py-2.5 bg-[#F2B705] text-[#1B365D] font-bold text-sm rounded-lg hover:bg-[#D9A404] transition-colors shadow-sm"
            >
              Get Matched
            </Link>
          </div>

          {/* mobile hamburger action trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer panel */}
      {isOpen && (
        <div className="md:hidden bg-[#162e50] border-t border-white/5 px-4 pt-2 pb-6 space-y-3 shadow-inner">
          {navLinks.map((link, idx) => (
            <div key={`mobile-group-${link.label}-${idx}`} className="space-y-1">
              {link.dropdown ? (
                <div>
                  <div className="text-xs font-bold text-[#F2B705] tracking-wider uppercase px-3 py-2">
                    {link.label}
                  </div>
                  <div className="pl-4 space-y-1">
                    {link.dropdown.map((subLink, subIdx) => (
                      <Link
                        key={`mobile-sub-${subLink.label}-${subIdx}`}
                        href={subLink.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 px-3">
            <Link
              href="/get-matched"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 bg-[#F2B705] text-[#1B365D] font-bold rounded-xl hover:bg-[#D9A404] transition-colors shadow-md"
            >
              Get Matched
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
