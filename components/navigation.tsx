'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const brandWordmarkPath = '/brand/hearthaway-wordmark-light.png'

const navLinks = [
  {
    label: 'Universities',
    href: '/universities',
    dropdown: [
      { label: 'All Universities', href: '/universities' },
      { label: 'UK', href: '/uk/universities' },
      { label: 'Ireland', href: '/ireland/universities' },
      { label: 'France', href: '/france/universities' },
      { label: 'UAE', href: '/uae/universities' },
      { label: 'Germany', href: '/germany/universities' },
      { label: 'Australia', href: '/australia/universities' }
    ]
  },
  {
    label: 'Cities',
    href: '/cities',
    dropdown: [
      { label: 'All Cities', href: '/cities' }
      { label: 'London', href: '/cities/london' },
      { label: 'Manchester', href: '/cities/manchester' },
      { label: 'Dublin', href: '/cities/dublin' },
      { label: 'Paris', href: '/cities/paris' },
      { label: 'Dubai', href: '/cities/dubai' },
      { label: 'Munich', href: '/cities/munich' },
      { label: 'Sydney', href: '/cities/sydney' },
    ]
  },
  { label: 'Resources', href: '/moving-abroad' }
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null)

  const closeMobileDrawer = useCallback(() => {
    setIsOpen(false)
    setOpenMobileDropdown(null)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMobileDrawer()
        setActiveDropdown(null)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [closeMobileDrawer])

  return (
    <nav className="bg-[#00319D] text-white sticky top-0 z-50 shadow-md">
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
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00319D] transition-colors"
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
              className="px-5 py-2.5 bg-[#FCC20A] text-[#00319D] font-bold text-sm rounded-lg hover:bg-[#FCC20A] transition-colors shadow-sm"
            >
              Get Matched
            </Link>
          </div>

          {/* mobile hamburger action trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setIsOpen((currentIsOpen) => {
                  if (currentIsOpen) {
                    setOpenMobileDropdown(null)
                  }

                  return !currentIsOpen
                })
              }}
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
        <div className="md:hidden bg-[#00319D] border-t border-white/5 px-4 pt-2 pb-6 space-y-3 shadow-inner">
          {navLinks.map((link, idx) => (
            <div key={`mobile-group-${link.label}-${idx}`} className="space-y-1">
              {link.dropdown ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenMobileDropdown(openMobileDropdown === idx ? null : idx)}
                    aria-expanded={openMobileDropdown === idx}
                    aria-controls={`mobile-dropdown-${idx}`}
                    className="flex w-full items-center justify-between text-xs font-bold text-[#FCC20A] tracking-wider uppercase px-3 py-2"
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {openMobileDropdown === idx && (
                    <div id={`mobile-dropdown-${idx}`} className="pl-4 space-y-1">
                      {link.dropdown.map((subLink, subIdx) => (
                        <Link
                          key={`mobile-sub-${subLink.label}-${subIdx}`}
                          href={subLink.href}
                          onClick={closeMobileDrawer}
                          className="block px-3 py-2 rounded-md text-base font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={closeMobileDrawer}
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
              onClick={closeMobileDrawer}
              className="block w-full text-center px-4 py-3 bg-[#FCC20A] text-[#00319D] font-bold rounded-xl hover:bg-[#FCC20A] transition-colors shadow-md"
            >
              Get Matched
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
