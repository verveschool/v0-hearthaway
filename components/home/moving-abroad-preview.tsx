import Link from 'next/link'
import Image from 'next/image'

const featured = {
  category: 'Essential reading',
  title: 'The complete guide to finding student accommodation abroad',
  description:
    'Everything an international student needs to know — from understanding your options and setting a realistic budget, to avoiding scams and booking with confidence before you fly.',
  readTime: '12 min read',
  href: '/moving-abroad',
  image: '/images/acc-common.png',
}

const guides = [
  {
    category: 'Before you go',
    title: 'What to sort before you leave home',
    description: 'A clear checklist of everything you need to arrange before you travel.',
    readTime: '6 min read',
    href: '/moving-abroad/before-you-go',
  },
  {
    category: 'Budgeting',
    title: 'How much does student accommodation actually cost?',
    description: 'Real costs, broken down by city and type, so you can plan with confidence.',
    readTime: '8 min read',
    href: '/moving-abroad/accommodation-costs',
  },
  {
    category: 'Safety',
    title: 'How to avoid accommodation scams',
    description: 'The warning signs every international student should know.',
    readTime: '5 min read',
    href: '/moving-abroad/avoid-scams',
  },
  {
    category: 'Arriving',
    title: 'Your first week: what to expect',
    description: 'The practical reality of arriving in a new country as a student.',
    readTime: '7 min read',
    href: '/moving-abroad/first-week',
  },
]

export default function MovingAbroadPreview() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
              <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                Moving Abroad Guide
              </span>
            </div>
            <h2 className="font-heading text-4xl lg:text-[3.25rem] font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight text-balance">
              Navigate the move with confidence.
            </h2>
          </div>
          <Link
            href="/moving-abroad"
            className="flex-shrink-0 text-[#1B365D] font-semibold text-sm border-b-2 border-[#FFCC00] pb-px hover:text-[#24497D] transition-colors"
          >
            Browse all guides &rarr;
          </Link>
        </div>

        {/* Grid: featured + secondary guides */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Featured large card */}
          <Link
            href={featured.href}
            className="group lg:col-span-2 relative overflow-hidden rounded-2xl h-80 lg:h-auto min-h-72 flex flex-col justify-end hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={featured.image}
              alt="Student accommodation common room"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2240]/95 via-[#0F2240]/50 to-transparent" />
            <div className="relative z-10 p-7">
              <span className="inline-block text-xs font-extrabold text-[#1B365D] bg-[#FFCC00] px-3 py-1.5 rounded-full mb-4">
                {featured.category}
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-white leading-snug mb-3 text-balance">
                {featured.title}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed mb-4 line-clamp-2">
                {featured.description}
              </p>
              <span className="text-[#FFCC00] text-sm font-bold group-hover:gap-3 transition-all inline-flex items-center gap-2">
                Read the guide &rarr;
              </span>
            </div>
          </Link>

          {/* Secondary guide cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex flex-col bg-[#F7F6F3] rounded-2xl p-7 border border-[#E8E6E1] hover:border-[#1B365D]/25 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">
                  <span className="text-xs font-extrabold text-[#1B365D] tracking-wider uppercase px-3 py-1.5 bg-[#1B365D]/8 rounded-full">
                    {guide.category}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-lg text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#1B365D] transition-colors flex-1">
                  {guide.title}
                </h3>
                <p className="text-[#6B6860] text-sm leading-relaxed mb-5">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B6860]">{guide.readTime}</span>
                  <span className="text-[#1B365D] font-bold group-hover:translate-x-1 transition-transform inline-block">
                    Read &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
