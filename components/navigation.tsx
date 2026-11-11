
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, ChevronDown, UserRound } from 'lucide-react'

const brandIconPath = '/brand/hearthaway_icon_light.png'
const brandWordmarkPath = '/brand/hearthaway_branding.png'

type NavSubLink = {
  label: string
  href: string
  dividerAfter?: boolean
}

type NavLink = {
  label: string
  href: string
  dropdown?: NavSubLink[]
}

const navLinks: NavLink[] = [
  {
    label: 'Destinations',
    href: '/universities',
    dropdown: [
      { label: 'All Universities', href: '/universities' },
      { label: 'All Cities', href: '/cities', dividerAfter: true },
      { label: 'United Kingdom', href: '/uk' },
      { label: 'Australia', href: '/australia' },
      { label: 'Germany', href: '/germany' },
      { label: 'France', href: '/france' },
      { label: 'Ireland', href: '/ireland' },
      { label: 'Dubai', href: '/uae' },
      { label: 'Spain', href: '/spain' },
      { label: 'Italy', href: '/italy' },
    ],
  },
  {
    label: 'Accommodation',
    href: '/accommodation',
    dropdown: [
      { label: 'All Properties', href: '/accommodation' },
      { label: 'All Rooms', href: '/accommodation/rooms' },
      { label: 'Vita Student', href: '/accommodation?provider=vita-student' },
      { label: 'Stacey', href: '/accommodation?provider=stacey' },
    ],
  },
  {
    label: 'Resources',
    href: '/moving-abroad',
    dropdown: [
      { label: 'All Resources', href: '/moving-abroad' },
      {
        label: 'Pre-Arrival Checklist',
        href: '/moving-abroad/pre-arrival-checklist',
      },
      { label: 'Student Visa', href: '/moving-abroad/student-visa' },
      {
        label: 'Accommodation Guide',
        href: '/moving-abroad/accommodation-guide',
      },
      { label: 'Budget Planning', href: '/moving-abroad/budget-planning' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'About Us', href: '/about-us' },
    ],
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null)

  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMobileDrawer = useCallback(() => {
    setIsOpen(false)
    setOpenMobileDropdown(null)
  }, [])

  useEffect(() => {
    const desktopNavigation = window.matchMedia(
      '(min-width: 1280px) and (hover: hover) and (pointer: fine)'
    )

    const closeDrawerOnDesktop = () => {
      if (desktopNavigation.matches) {
        closeMobileDrawer()
        setActiveDropdown(null)
      }
    }

    desktopNavigation.addEventListener('change', closeDrawerOnDesktop)
    closeDrawerOnDesktop()

    return () => {
      desktopNavigation.removeEventListener('change', closeDrawerOnDesktop)
    }
  }, [closeMobileDrawer])

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8E6E1] bg-white text-[#01329C] shadow-[0_1px_0_rgba(1,50,156,0.03)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-[4.5rem] items-center justify-between sm:h-20">

          {/* Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              aria-label="HearthAway home"
              className="inline-flex shrink-0 items-center"
            >
              {/* Symbol-only logo for mobile and tablet */}
              <Image
                src={brandIconPath}
                alt=""
                width={128}
                height={128}
                className="size-12 sm:size-14 xl:hidden"
                priority
              />

              {/* Full wordmark for desktop */}
              <Image
                src={brandWordmarkPath}
                alt="HearthAway"
                width={336}
                height={100}
                className="hidden h-auto w-[13rem] translate-y-1 xl:block 2xl:w-[15rem]"
                priority
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="nav-desktop-layout hidden min-w-0 flex-1 items-center justify-center gap-1.5 xl:flex 2xl:gap-2">
            {navLinks.map((link, idx) => (
              <div
                key={`desktop-main-${link.label}`}
                className="group relative py-2"
                onMouseEnter={() => {
                  if (link.dropdown) setActiveDropdown(idx)
                }}
                onMouseLeave={(event) => {
                  if (!event.currentTarget.contains(document.activeElement)) {
                    setActiveDropdown(null)
                  }
                }}
                onFocus={() => {
                  if (link.dropdown) setActiveDropdown(idx)
                }}
                onBlur={(event) => {
                  const nextTarget = event.relatedTarget

                  if (
                    !(nextTarget instanceof Node) ||
                    !event.currentTarget.contains(nextTarget)
                  ) {
                    setActiveDropdown(null)
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    event.preventDefault()
                    setActiveDropdown(null)

                    event.currentTarget
                      .querySelector<HTMLButtonElement>('button')
                      ?.focus()
                  }
                }}
              >
                {link.dropdown ? (
                  <>
                    <button
                      id={`desktop-button-${idx}`}
                      type="button"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === idx ? null : idx
                        )
                      }
                      className="nav-link flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-bold text-[#01329C]"
                      aria-expanded={activeDropdown === idx}
                      aria-controls={`desktop-dropdown-${idx}`}
                    >
                      {link.label}

                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === idx ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id={`desktop-dropdown-${idx}`}
                      aria-labelledby={`desktop-button-${idx}`}
                      aria-hidden={activeDropdown !== idx}
                      inert={activeDropdown !== idx}
                      data-open={activeDropdown === idx}
                      className="nav-dropdown absolute left-0 top-full z-50 w-60 pt-2"
                    >
                      <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-[#E8E6E1] bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.label}
                            href={subLink.href}
                            className={`flex min-h-10 items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-[#F7F6F3] hover:text-[#01329C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01329C] ${
                              subLink.dividerAfter
                                ? 'mb-2 border-b border-[#E8E6E1] pb-3'
                                : ''
                            }`}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="nav-link rounded-lg px-2.5 py-2 text-sm font-bold text-[#01329C]"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="nav-desktop-layout hidden items-center gap-2 xl:flex">
            <Link
              href="/account"
              className="secondary-cta inline-flex min-h-11 items-center gap-2 px-4 py-2.5 text-sm font-bold"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              <span>My Account</span>
            </Link>

            <Link
              href="/get-matched"
              className="brand-cta inline-flex min-h-11 items-center justify-center rounded-lg bg-[#FEBB01] px-5 py-2.5 text-sm font-bold text-[#333333]"
            >
              Get Matched
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="nav-mobile-layout flex items-center gap-2 xl:hidden">
            <Link
              href="/account"
              className="secondary-cta inline-flex min-h-11 items-center gap-2 px-4 py-2.5 text-sm font-bold"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              <span>My Account</span>
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
              aria-label={
                isOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-controls="mobile-navigation-panel"
              aria-expanded={isOpen}
              className="inline-flex size-11 items-center justify-center rounded-xl text-[#01329C]/80 transition-all hover:bg-[#01329C]/5 hover:text-[#01329C] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01329C]"
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

      {/* Mobile navigation drawer */}
      <div
        id="mobile-navigation-panel"
        aria-hidden={!isOpen}
        inert={!isOpen}
        data-open={isOpen}
        className="nav-mobile-panel overscroll-contain border-t border-[#E8E6E1] bg-white px-4 pb-6 pt-2 shadow-[0_18px_40px_rgba(15,23,42,0.08)] xl:hidden"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            closeMobileDrawer()
            menuButtonRef.current?.focus()
          }
        }}
      >
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto">
          {navLinks.map((link, idx) => (
            <div
              key={`mobile-group-${link.label}`}
              className="flex flex-col gap-1"
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
                    className="nav-link flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-bold text-[#01329C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#01329C]"
                  >
                    {link.label}

                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openMobileDropdown === idx ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`mobile-dropdown-${idx}`}
                    aria-hidden={openMobileDropdown !== idx}
                    inert={openMobileDropdown !== idx}
                    data-open={openMobileDropdown === idx}
                    className="nav-mobile-submenu flex flex-col gap-1 pl-4"
                  >
                    {link.dropdown.map((subLink) => (
                      <Link
                        key={subLink.label}
                        href={subLink.href}
                        onClick={closeMobileDrawer}
                        className={`nav-link flex min-h-11 items-center rounded-lg px-3 py-2 text-base font-medium text-[#01329C]/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#01329C] ${
                          subLink.dividerAfter
                            ? 'mb-2 border-b border-[#E8E6E1] pb-3'
                            : ''
                        }`}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={closeMobileDrawer}
                  className="nav-link flex min-h-11 items-center rounded-lg px-3 py-2 text-base font-medium text-[#01329C]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#01329C]"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA actions */}
          <div className="flex flex-col gap-3 px-3 pt-4">
            <Link
              href="/account"
              onClick={closeMobileDrawer}
              className="secondary-cta flex min-h-11 w-full items-center justify-center px-4 py-2.5 text-center text-sm font-bold"
            >
              My Account
            </Link>

            <Link
              href="/get-matched"
              onClick={closeMobileDrawer}
              className="brand-cta flex min-h-12 w-full items-center justify-center rounded-xl bg-[#FEBB01] px-4 py-3 text-center font-bold text-[#333333]"
            >
              Get Matched
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
