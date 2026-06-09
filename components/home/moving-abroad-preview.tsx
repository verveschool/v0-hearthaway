import Link from 'next/link'

const guides = [
  {
    category: 'Before you go',
    title: 'What to sort before you leave home',
    description: 'A clear checklist of everything you need to arrange before you travel — from visas to bank accounts to accommodation.',
    readTime: '6 min read',
    href: '/moving-abroad/before-you-go',
  },
  {
    category: 'Budgeting',
    title: 'How much does student accommodation actually cost?',
    description: 'Real costs, broken down by city and accommodation type, so you can plan your budget with confidence.',
    readTime: '8 min read',
    href: '/moving-abroad/accommodation-costs',
  },
  {
    category: 'Safety',
    title: 'How to avoid accommodation scams',
    description: 'The warning signs every international student should know before sending money or signing anything.',
    readTime: '5 min read',
    href: '/moving-abroad/avoid-scams',
  },
  {
    category: 'Arriving',
    title: 'Your first week: what to expect',
    description: 'The practical reality of arriving in a new country as a student — and how to make the first week go smoothly.',
    readTime: '7 min read',
    href: '/moving-abroad/first-week',
  },
]

export default function MovingAbroadPreview() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="text-[#1B365D] text-sm font-bold tracking-widest uppercase mb-4">
              Moving Abroad Guide
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#1A1A1A] text-balance leading-tight">
              Navigate the move with confidence.
            </h2>
          </div>
          <Link
            href="/moving-abroad"
            className="flex-shrink-0 text-[#1B365D] font-semibold text-sm border-b-2 border-[#FFCC00] pb-0.5 hover:text-[#24497D] transition-colors"
          >
            Browse all guides
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex flex-col bg-[#F7F6F3] rounded-2xl p-6 border border-[#E8E6E1] hover:border-[#1B365D]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <span className="text-xs font-bold text-[#1B365D] tracking-wider uppercase px-3 py-1.5 bg-[#1B365D]/8 rounded-full">
                  {guide.category}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#1B365D] transition-colors">
                {guide.title}
              </h3>
              <p className="text-[#6B6860] text-sm leading-relaxed flex-1 mb-5">
                {guide.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6B6860]">{guide.readTime}</span>
                <span className="text-[#1B365D] font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  Read &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
