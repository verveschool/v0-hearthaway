import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'

const categories = [
  {
    name: 'Before you go',
    color: 'bg-[#1B365D]',
    textColor: 'text-white',
    articles: [
      { title: 'What to sort before you leave home', readTime: '6 min', href: '/moving-abroad/before-you-go' },
      { title: 'Understanding your student visa requirements', readTime: '8 min', href: '/moving-abroad/student-visa' },
      { title: 'How to open a UK bank account before you arrive', readTime: '5 min', href: '/moving-abroad/uk-bank-account' },
      { title: 'Packing list for international students', readTime: '4 min', href: '/moving-abroad/packing-list' },
    ],
  },
  {
    name: 'Accommodation',
    color: 'bg-[#FFCC00]',
    textColor: 'text-[#1B365D]',
    articles: [
      { title: 'How much does student accommodation really cost?', readTime: '8 min', href: '/moving-abroad/accommodation-costs' },
      { title: 'Student halls vs private accommodation', readTime: '6 min', href: '/moving-abroad/halls-vs-private' },
      { title: 'How to avoid accommodation scams', readTime: '5 min', href: '/moving-abroad/avoid-scams' },
      { title: 'Understanding your tenancy agreement', readTime: '9 min', href: '/moving-abroad/tenancy-agreement' },
    ],
  },
  {
    name: 'Budgeting',
    color: 'bg-[#F7F6F3]',
    textColor: 'text-[#1B365D]',
    articles: [
      { title: 'Monthly cost of living: UK, Ireland & Australia', readTime: '7 min', href: '/moving-abroad/cost-of-living' },
      { title: 'How to budget as an international student', readTime: '6 min', href: '/moving-abroad/student-budget' },
      { title: 'Hidden costs new students don\'t expect', readTime: '5 min', href: '/moving-abroad/hidden-costs' },
      { title: 'Student discounts and how to find them', readTime: '4 min', href: '/moving-abroad/student-discounts' },
    ],
  },
  {
    name: 'Arriving',
    color: 'bg-[#1B365D]',
    textColor: 'text-white',
    articles: [
      { title: 'Your first week: what to expect', readTime: '7 min', href: '/moving-abroad/first-week' },
      { title: 'Getting from the airport to your accommodation', readTime: '5 min', href: '/moving-abroad/airport-to-home' },
      { title: 'Registering with a doctor and NHS', readTime: '4 min', href: '/moving-abroad/healthcare' },
      { title: 'Making friends in a new country', readTime: '6 min', href: '/moving-abroad/making-friends' },
    ],
  },
]

const featuredGuides = [
  {
    category: 'Before you go',
    title: 'The complete pre-arrival checklist for international students',
    description: 'Everything you need to sort before you travel — from accommodation and visas to bank accounts and packing. A practical guide from students who have done it.',
    readTime: '12 min read',
    href: '/moving-abroad/pre-arrival-checklist',
  },
  {
    category: 'Accommodation',
    title: 'How to choose the right accommodation before you arrive',
    description: 'Walking through the real decisions you face: halls vs private, location tradeoffs, what to ask before signing, and how to avoid the biggest mistakes.',
    readTime: '10 min read',
    href: '/moving-abroad/choose-accommodation',
  },
  {
    category: 'Budgeting',
    title: 'The real cost of studying abroad: a country-by-country breakdown',
    description: 'Rent, transport, food, tuition, and extras — broken down honestly for students planning their move to the UK, Ireland, or Australia.',
    readTime: '14 min read',
    href: '/moving-abroad/real-cost-abroad',
  },
]

export default function MovingAbroadPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-[#1B365D] pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-4">Moving Abroad</div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Everything you need to know before you fly.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Practical, honest guidance for international students preparing to move abroad. From choosing accommodation to arriving with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Featured guides */}
        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-7">Essential guides</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group bg-[#F7F6F3] rounded-2xl p-7 border border-[#E8E6E1] hover:border-[#1B365D]/30 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <span className="text-xs font-bold text-[#1B365D] tracking-wider uppercase px-3 py-1.5 bg-[#FFCC00] rounded-full self-start mb-5">
                    {guide.category}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#1B365D] transition-colors flex-1">
                    {guide.title}
                  </h3>
                  <p className="text-[#6B6860] text-sm leading-relaxed mb-5">{guide.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B6860] text-xs">{guide.readTime}</span>
                    <span className="text-[#1B365D] font-semibold group-hover:translate-x-1 transition-transform inline-block">
                      Read guide &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Category grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category) => (
                <div key={category.name} className={`${category.color} rounded-2xl p-7`}>
                  <h3 className={`font-heading font-bold text-xl ${category.textColor} mb-5`}>
                    {category.name}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {category.articles.map((article) => (
                      <Link
                        key={article.href}
                        href={article.href}
                        className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                          category.color === 'bg-[#1B365D]'
                            ? 'hover:bg-white/10'
                            : category.color === 'bg-[#FFCC00]'
                            ? 'hover:bg-[#1B365D]/10'
                            : 'bg-white hover:bg-[#1B365D]/5 border border-[#E8E6E1]'
                        }`}
                      >
                        <span className={`text-sm font-medium ${
                          category.color === 'bg-[#1B365D]' ? 'text-white/90 group-hover:text-white' :
                          'text-[#1A1A1A] group-hover:text-[#1B365D]'
                        } transition-colors`}>
                          {article.title}
                        </span>
                        <span className={`text-xs flex-shrink-0 ml-4 ${
                          category.color === 'bg-[#1B365D]' ? 'text-white/50' : 'text-[#6B6860]'
                        }`}>
                          {article.readTime}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#F7F6F3] py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#1B365D] rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="font-heading font-bold text-2xl lg:text-3xl text-white mb-3 text-balance">
                  Ready to find your accommodation?
                </h3>
                <p className="text-white/70 text-base leading-relaxed">
                  Reading about moving abroad is one thing. Actually finding your accommodation is another. Let us help you get it sorted before you fly.
                </p>
              </div>
              <Link
                href="/get-matched"
                className="flex-shrink-0 px-8 py-4 bg-[#FFCC00] text-[#1B365D] font-bold text-base rounded-xl hover:bg-[#E6B800] transition-colors shadow-lg"
              >
                Get Matched
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
