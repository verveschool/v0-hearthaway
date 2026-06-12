import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { getFeaturedMovingAbroadGuides, getMovingAbroadCategoryGroups } from '@/lib/moving-abroad-data'

const categories = getMovingAbroadCategoryGroups()
const featuredGuides = getFeaturedMovingAbroadGuides()

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
