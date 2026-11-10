import Link from 'next/link'
import {
  ArrowUpRight,
  Building2,
  GraduationCap,
  MapPin,
  MessageCircle,
} from 'lucide-react'

const discoveryPaths = [
  {
    label: 'Start with a city',
    description: 'Explore student destinations, neighbourhoods and local housing context.',
    href: '/cities',
    icon: MapPin,
  },
  {
    label: 'Start with a university',
    description: 'Find your campus, then see the accommodation options connected to it.',
    href: '/universities',
    icon: GraduationCap,
  },
  {
    label: 'Browse available rooms',
    description: 'Go straight to property details, room types and the information available.',
    href: '/accommodation',
    icon: Building2,
  },
  {
    label: 'Talk it through',
    description: 'Share your plans and ask an accommodation advisor for guidance.',
    href: '/get-matched',
    icon: MessageCircle,
  },
]

export default function TotalHomeDiscovery() {
  return (
    <section className="bg-white px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <header className="max-w-xl">
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-[#1A1A1A] text-balance sm:text-4xl lg:text-5xl">
              One home search. Start anywhere.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#6B6860] sm:text-lg">
              You may know your university, your city, or only the kind of room you need. Choose a starting point and keep exploring from there.
            </p>
          </header>

          <nav aria-label="Ways to start your accommodation search" className="grid gap-3 sm:grid-cols-2">
            {discoveryPaths.map(({ label, description, href, icon: Icon }, index) => (
              <Link
                key={label}
                href={href}
                className="group flex min-h-40 flex-col rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00319D]/25 hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white text-[#00319D] shadow-sm transition-colors group-hover:bg-[#00319D] group-hover:text-white">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-xs font-bold tracking-[0.16em] text-[#8A877F]">
                    0{index + 1}
                  </span>
                </div>
                <span className="mt-5 flex items-center gap-2 font-heading text-lg font-extrabold text-[#1A1A1A]">
                  {label}
                  <ArrowUpRight aria-hidden="true" className="size-4 text-[#00319D] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-[#6B6860]">{description}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-5 rounded-3xl bg-[#00319D] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8 lg:mt-10">
          <div className="flex items-start gap-4 sm:items-center">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#FCC20A] text-[#1A1A1A]">
              <MessageCircle aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h3 className="font-heading text-xl font-extrabold leading-snug sm:text-2xl">Need help deciding?</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                Have questions or need a hand? Talk to our team. We&apos;re happy to help.
              </p>
            </div>
          </div>
          <Link
            href="/get-matched"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#FCC20A] px-5 py-3 text-sm font-extrabold text-[#1A1A1A] transition-colors hover:bg-[#f5b900] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00319D]"
          >
            Talk to us →
          </Link>
        </div>
      </div>
    </section>
  )
}
