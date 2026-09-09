'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const brandWordmarkPath = '/brand/  hearthaway_icon_light.png'

const navLinks = [
  {
    label: 'Universities',
    href: '/universities',
    dropdown: [
      { label: 'UK', href: '/uk' },
      { label: 'Ireland', href: '/ireland' },
      { label: 'USA', href: '/usa' },
      { label: 'Canada', href: '/canada' },
      { label: 'Australia', href: '/australia' },
      { label: 'Germany', href: '/germany' },
      { label: 'UAE', href: '/uae' },
      { label: 'Singapore', href: '/singapore' },
      { label: 'Netherlands', href: '/netherlands' },
      { label: 'France', href: '/france' },
      { label: 'Italy', href: '/italy' },
      { label: 'Spain', href: '/spain' },
      { label: 'Austria', href: '/austria' },
      { label: 'Malta', href: '/malta' },
    ],
  },
  {
    label: 'Cities',
    href: '/cities',
    dropdown: [
      { label: 'All Cities', href: '/cities' },
      { label: 'London', href: '/cities/london' },
      { label: 'Manchester', href: '/cities/manchester' },
      { label: 'New York', href: '/cities/new-york' }, // Added for USA
      { label: 'Sydney', href: '/cities/sydney' },
      { label: 'Melbourne', href: '/cities/melbourne' }, // Added high-volume Aus hub
      { label: 'Toronto', href: '/cities/toronto' }, // Added for Canada
      { label: 'Dublin', href: '/cities/dublin' },
      { label: 'Dubai', href: '/cities/dubai' },
      { label: 'Munich', href: '/cities/munich' },
      { label: 'Paris', href: '/cities/paris' },
      { label: 'Milan', href: '/cities/milan' }, // Added for Italy
      { label: 'Singapore', href: '/cities/singapore' }, // Added for Singapore
      { label: 'Amsterdam', href: '/cities/amsterdam' }, // Added for Netherlands
    ],
  },
  {
    label: 'Resources',
    href: '/moving-abroad',
  },
  {
    label: 'About',
    href: '/about',
  },
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
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white text-[#00319D] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              aria-label="HearthAway Home"
              className="flex items-center"
            >
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

          {/* Desktop navigation - visually centered */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            {navLinks.map((link, idx) => (
              <div
                key={`desktop-main-${link.label}-${idx}`}
                className="group relative py-2"
                onMouseEnter={() => {
                  if (link.dropdown) {
                    setActiveDropdown(idx)
                  }
                }}
                onMouseLeave={() => setActiveDropdown(null)}
                onFocus={() => {
                  if (link.dropdown) {
                    setActiveDropdown(idx)
                  }
                }}
                onBlur={(e: any) => {
                  // Close the dropdown when focus leaves the whole group (button + menu)
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setActiveDropdown(null)
                  }
                }}
                onKeyDown={(e: any) => {
                  if (e.key === 'Escape') setActiveDropdown(null)
                }}
              >
                {link.dropdown ? (
                  <>
                    <button
                      id={`desktop-button-${idx}`}
                      type="button"
                      onClick={() =>
                        setActiveDropdown(activeDropdown === idx ? null : idx)
                      }
                      className="flex items-center gap-1 text-sm font-bold text-[#00319D] transition-colors hover:text-[#00319D]"
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === idx}
                      aria-controls={`desktop-dropdown-${idx}`}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </button>

                    {/* Desktop dropdown */}
                    {activeDropdown === idx && (
                      <div
                        id={`desktop-dropdown-${idx}`}
                        role="menu"
                        aria-labelledby={`desktop-button-${idx}`}
                        className="absolute left-0 top-full mt-0 w-48 rounded-xl border border-slate-100 bg-white py-2 shadow-xl"
                        onKeyDown={(e: any) => {
                          if (e.key === 'Escape') setActiveDropdown(null)
                        }}
                      >
                        {link.dropdown.map((subLink, subIdx) => (
                          <Link
                            key={`desktop-sub-${subLink.label}-${subIdx}`}
                            href={subLink.href}
                            className="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#00319D]"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-[#00319D] transition-colors hover:text-[#00319D]"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/get-matched"
            className="hidden rounded-lg bg-[#FCC20A] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#FCC20A] md:inline-flex"
          >
            Get Matched
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => {
                setIsOpen((currentIsOpen) => {
                  if (currentIsOpen) {
                    setOpenMobileDropdown(null)
                  }

                  return !currentIsOpen
                })
              }}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center rounded-md p-2 text-[#00319D]/80 transition-colors hover:bg-[#00319D]/5 hover:text-[#00319D]"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="space-y-3 border-t border-slate-100 bg-white px-4 pb-6 pt-2 shadow-inner md:hidden">
          {navLinks.map((link, idx) => (
            <div
              key={`mobile-group-${link.label}-${idx}`}
              className="space-y-1"
            >
              {link.dropdown ? (
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileDropdown(
                        openMobileDropdown === idx ? null : idx
                      )
                    }
                    aria-expanded={openMobileDropdown === idx}
                    aria-controls={`mobile-dropdown-${idx}`}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#00319D]"
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openMobileDropdown === idx ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {openMobileDropdown === idx && (
                    <div
                      id={`mobile-dropdown-${idx}`}
                      className="space-y-1 pl-4"
                    >
                      {link.dropdown.map((subLink, subIdx) => (
                        <Link
                          key={`mobile-sub-${subLink.label}-${subIdx}`}
                          href={subLink.href}
                          onClick={closeMobileDrawer}
                          className="block rounded-md px-3 py-2 text-base font-medium text-[#00319D]/70 transition-all hover:bg-[#00319D]/5 hover:text-[#00319D]"
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
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#00319D]/80 transition-all hover:bg-[#00319D]/5 hover:text-[#00319D]"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          <div className="px-3 pt-4">
            <Link
              href="/get-matched"
              onClick={closeMobileDrawer}
              className="block w-full rounded-xl bg-[#FCC20A] px-4 py-3 text-center font-bold text-white shadow-md transition-colors hover:bg-[#FCC20A]"
            >
              Get Matched
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
