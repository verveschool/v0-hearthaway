'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, ChevronDown, UserRound } from 'lucide-react'

const brandWordmarkPath = '/brand/  hearthaway_icon_light.png'

const navLinks = [
  {
    label: 'Universities',
    href: '/universities',
    dropdown: [
      { label: 'All Universities', href: '/universities' },
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
      { label: 'Belgium', href: '/belgium' },
      { label: 'Hungary', href: '/hungary' },
      { label: 'Malta', href: '/malta' },
      { label: 'Malaysia', href: '/malaysia' },
    ],
  },
  {
    label: 'Cities',
    href: '/cities',
    dropdown: [
      { label: 'All Cities', href: '/cities' },
      { label: 'London', href: '/cities/london' },
      { label: 'Manchester', href: '/cities/manchester' },
      { label: 'New York', href: '/cities/new-york' },
      { label: 'Sydney', href: '/cities/sydney' },
      { label: 'Melbourne', href: '/cities/melbourne' },
      { label: 'Toronto', href: '/cities/toronto' },
      { label: 'Dublin', href: '/cities/dublin' },
      { label: 'Dubai', href: '/cities/dubai' },
      { label: 'Munich', href: '/cities/munich' },
      { label: 'Paris', href: '/cities/paris' },
      { label: 'Milan', href: '/cities/milan' },
      { label: 'Singapore', href: '/cities/singapore' },
      { label: 'Amsterdam', href: '/cities/amsterdam' },
    ],
  },
  {
    label: 'Accommodation',
    href: '/accommodation',
    dropdown: [
      { label: 'All Accommodation', href: '/accommodation' },
      { label: 'Vita Student', href: '/accommodation?provider=vita-student' },
      { label: 'Stacey', href: '/accommodation?provider=stacey' },
      { label: 'Browse individual rooms', href: '/accommodation/rooms' },
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

  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const desktopNavigation = window.matchMedia('(min-width: 1280px) and (hover: hover) and (pointer: fine)')
    const closeDrawerOnDesktop = () => {
      if (desktopNavigation.matches) {
        closeMobileDrawer()
        setActiveDropdown(null)
      }
    }

    desktopNavigation.addEventListener('change', closeDrawerOnDesktop)
    closeDrawerOnDesktop()

    return () => desktopNavigation.removeEventListener('change', closeDrawerOnDesktop)
  }, [closeMobileDrawer])

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white text-[#00319D] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" aria-label="HearthAway Home" className="flex items-center">
              <Image
                src={brandWordmarkPath}
                alt="HearthAway Logo"
                width={128}
                height={57}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="nav-desktop-layout absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 xl:flex">
            {navLinks.map((link, idx) => (
              <div
                key={`desktop-main-${link.label}-${idx}`}
                className="group relative py-2"
                onMouseEnter={() => {
                  if (link.dropdown) setActiveDropdown(idx)
                }}
                onMouseLeave={() => setActiveDropdown(null)}
                onFocus={() => {
                  if (link.dropdown) setActiveDropdown(idx)
                }}
                onBlur={(event) => {
                  const nextTarget = event.relatedTarget
                  if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                    setActiveDropdown(null)
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setActiveDropdown(null)
                }}
              >
                {link.dropdown ? (
                  <>
                    <button
                      id={`desktop-button-${idx}`}
                      type="button"
                      onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                      className="flex items-center gap-1 text-sm font-bold text-[#00319D] transition-colors hover:text-[#00319D]"
                      aria-expanded={activeDropdown === idx}
                      aria-controls={`desktop-dropdown-${idx}`}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </button>

                    {activeDropdown === idx && (
                      <div
                        id={`desktop-dropdown-${idx}`}
                        aria-labelledby={`desktop-button-${idx}`}
                        className="absolute left-0 top-full mt-0 w-48 rounded-xl border border-slate-100 bg-white py-2 shadow-xl"
                        onKeyDown={(event) => {
                          if (event.key === 'Escape') setActiveDropdown(null)
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

  <div className="nav-desktop-layout hidden items-center gap-2 xl:flex">
    <Link
      href="/sign-in?next=%2Faccount"
      aria-label="Log in or create a student account"
      className="inline-flex items-center gap-2 rounded-lg border-2 border-[#00319D] px-4 py-2.5 text-sm font-bold text-[#00319D] transition-colors hover:bg-[#00319D]/5"
    >
      <UserRound className="h-4 w-4" aria-hidden="true" />
      <span>Log in / Sign up</span>
    </Link>
    <Link
      href="/get-matched"
      className="inline-flex rounded-lg bg-[#FCC20A] px-5 py-2.5 text-sm font-bold text-[#333333] shadow-sm transition-colors hover:bg-[#FCC20A]"
    >
      Get Matched
    </Link>
  </div>

  <div className="nav-mobile-layout flex items-center gap-2 xl:hidden">
    <Link
      href="/sign-in?next=%2Faccount"
      aria-label="Log in or create a student account"
      className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#00319D] px-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#00267A]"
    >
      <UserRound className="h-4 w-4" aria-hidden="true" />
      <span>Sign in</span>
    </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => {
                setIsOpen((currentIsOpen) => {
                  if (currentIsOpen) setOpenMobileDropdown(null)
                  return !currentIsOpen
                })
              }}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-controls="mobile-navigation-panel"
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center rounded-md p-2 text-[#00319D]/80 transition-colors hover:bg-[#00319D]/5 hover:text-[#00319D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation-panel"
        hidden={!isOpen}
        className="nav-mobile-panel max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-slate-100 bg-white px-4 pb-6 pt-2 shadow-inner xl:hidden"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            closeMobileDrawer()
            menuButtonRef.current?.focus()
          }
        }}
      >
          {navLinks.map((link, idx) => (
            <div key={`mobile-group-${link.label}-${idx}`} className="space-y-1">
              {link.dropdown ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenMobileDropdown(openMobileDropdown === idx ? null : idx)}
                    aria-expanded={openMobileDropdown === idx}
                    aria-controls={`mobile-dropdown-${idx}`}
                    className="flex min-h-11 w-full items-center justify-between rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#00319D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00319D]"
                  >
                    {link.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${openMobileDropdown === idx ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>

                  {openMobileDropdown === idx && (
                    <div id={`mobile-dropdown-${idx}`} className="space-y-1 pl-4">
                      {link.dropdown.map((subLink, subIdx) => (
                        <Link
                          key={`mobile-sub-${subLink.label}-${subIdx}`}
                          href={subLink.href}
                          onClick={closeMobileDrawer}
                          className="flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium text-[#00319D]/70 transition-colors hover:bg-[#00319D]/5 hover:text-[#00319D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00319D]"
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
                  className="flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium text-[#00319D]/80 transition-colors hover:bg-[#00319D]/5 hover:text-[#00319D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00319D]"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

  <div className="flex flex-col gap-3 px-3 pt-4">
    <Link
      href="/sign-in?next=%2Faccount"
      onClick={closeMobileDrawer}
      className="block w-full rounded-xl border-2 border-[#00319D] px-4 py-3 text-center font-bold text-[#00319D] transition-colors hover:bg-[#00319D]/5"
    >
      Log in / Sign up
    </Link>
    <Link
      href="/get-matched"
              onClick={closeMobileDrawer}
              className="block w-full rounded-xl bg-[#FCC20A] px-4 py-3 text-center font-bold text-[#333333] shadow-md transition-colors hover:bg-[#FCC20A]"
            >
              Get Matched
            </Link>
          </div>
        </div>
    </nav>
  )
}
