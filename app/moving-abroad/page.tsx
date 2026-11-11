import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import {
  getMovingAbroadCategoryGroups,
  type MovingAbroadArticleCard,
  type MovingAbroadCategoryGroup,
} from '@/lib/moving-abroad-data'
import MatchedCTA from '@/components/matched-cta'

const categories = getMovingAbroadCategoryGroups()

function GuideLink({ guide, category }: { guide: MovingAbroadArticleCard; category: MovingAbroadCategoryGroup }) {
  const isDarkCard = category.color === 'bg-[#00319D]'
  const isYellowCard = category.color === 'bg-[#FCC20A]'

  return (
    <Link
      href={guide.href}
      className={`group flex items-center justify-between gap-5 rounded-2xl border px-5 py-4 transition-all duration-200 ${
        isDarkCard
          ? 'border-white/15 bg-white/10 hover:bg-white/15'
          : isYellowCard
            ? 'border-primary/10 bg-white/80 hover:bg-white'
            : 'border-[var(--color-mid-gray)] bg-white hover:border-primary/30 hover:shadow-md'
      }`}
    >
      <span
        className={`font-heading text-sm font-bold leading-snug transition-colors ${
          isDarkCard ? 'text-white group-hover:text-accent' : 'text-charcoal-ink group-hover:text-primary'
        }`}
      >
        {guide.title}
      </span>
      <span className="flex flex-shrink-0 items-center gap-3 text-xs">
        <span className={isDarkCard ? 'text-white/60' : 'text-muted-foreground'}>{guide.readTime}</span>
        <span
          aria-hidden="true"
          className={`font-semibold transition-transform group-hover:translate-x-1 ${
            isDarkCard ? 'text-accent' : 'text-primary'
          }`}
        >
          &rarr;
        </span>
      </span>
    </Link>
  )
}

export default function MovingAbroadPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-primary px-6 pb-16 pt-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="mb-5 font-heading text-4xl font-bold leading-tight text-white text-balance lg:text-5xl">
                Plan the move with order, not panic.
              </h1>
              <p className="text-lg leading-relaxed text-white/70">
                Start with the essentials, then move through accommodation, budgeting, arrival, country-specific pathways, and campus next steps. This hub is built to help you make clean decisions before you book.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-warm-gray)] px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 font-heading text-2xl font-bold text-charcoal-ink lg:text-3xl">
              The Core Decisions Most Students Face
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {categories.map((category) => (
                <section key={category.name} className={`${category.color} rounded-3xl p-6 lg:p-7`}>
                  <h3 className={`mb-5 font-heading text-xl font-bold ${category.textColor}`}>
                    {category.name}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {category.articles.map((guide) => (
                      <GuideLink key={guide.slug} guide={guide} category={category} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--color-mid-gray)] bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <MatchedCTA
              variant="full"
              title="Ready to turn your plan into an accommodation shortlist?"
              description="Tell us your university, budget, and move-in timeline. We'll help you compare suitable accommodation options before you arrive."
              buttonText="Get Matched"
              buttonHref="/get-matched"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
