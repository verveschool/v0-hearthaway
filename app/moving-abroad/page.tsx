import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import {
  getCountryMovingAbroadLinks,
  getFeaturedMovingAbroadGuides,
  getMovingAbroadCategoryGroups,
  type MovingAbroadArticleCard,
  type MovingAbroadCountrySlug,
} from '@/lib/moving-abroad-data'
import MatchedCTA from '@/components/matched-cta'

const categories = getMovingAbroadCategoryGroups()
const featuredGuides = getFeaturedMovingAbroadGuides()
const preArrivalChecklist = featuredGuides.find((g) => g.slug === 'pre-arrival-checklist')

const preArrivalSteps = [
  'Confirm your offer, passport, visa timeline, and travel dates before booking anything irreversible.',
  'Lock accommodation with clear rent, deposit, contract, and move-in terms before you fly.',
  'Plan airport transport, payment access, mobile data, documents, and first-week essentials.',
]

const countryPathways: { country: string; slug: MovingAbroadCountrySlug; description: string }[] = [
  {
    country: 'United Kingdom',
    slug: 'uk',
    description: 'Visa timing, UK living costs, tenancy checks, and the first week around campus.',
  },
  {
    country: 'Ireland',
    slug: 'ireland',
    description: 'Budget planning, arrival routes, accommodation checks, and practical student setup.',
  },
  {
    country: 'Australia',
    slug: 'australia',
    description: 'Student visa planning, setup costs, packing, and accommodation choices.',
  },
]

const nextSteps = [
  {
    href: '/cities',
    title: 'Explore Student Cities',
    description: 'Compare the places you could live, study, commute, and settle after choosing a country.',
  },
  {
    href: '/universities',
    title: 'Find Your University',
    description: 'Move from country-level planning into campus-specific next steps and nearby student areas.',
  },
]

function titleCase(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

function GuideLink({ guide }: { guide: MovingAbroadArticleCard }) {
  const displayCountries = guide.countries
    .map((c) => (c === 'uk' ? 'UK' : c.charAt(0).toUpperCase() + c.slice(1)))
    .join(' • ')

  return (
    <Link
      href={guide.href}
      className="group bg-white rounded-2xl p-5 border border-[var(--color-mid-gray)] hover:border-primary/30 hover:shadow-lg transition-all duration-200 flex flex-col h-full"
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="text-xs font-bold text-primary tracking-wider uppercase px-2.5 py-1 bg-accent rounded-full">
          {guide.category}
        </span>
        <span className="text-xs text-muted-foreground flex-shrink-0">{guide.readTime}</span>
      </div>
      <h3 className="font-heading font-bold text-charcoal-ink text-base leading-snug mb-2 group-hover:text-primary transition-colors">
        {titleCase(guide.title)}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{guide.description}</p>
      
      <div className="mt-auto pt-4 border-t border-[var(--color-mid-gray)] flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {displayCountries}
        </span>
        <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform inline-block">
          Read guide &rarr;
        </span>
      </div>
    </Link>
  )
}

export default function MovingAbroadPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-primary pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="text-accent text-sm font-bold tracking-widest uppercase mb-4">
                Moving Abroad
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white text-balance mb-5 leading-tight">
                Plan the move with order, not panic.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Start with the essentials, then move through accommodation, budgeting, arrival, country-specific pathways, and campus next steps. This hub is built to help you make clean decisions before you book.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {preArrivalChecklist && (
                <Link
                  href={preArrivalChecklist.href}
                  className="group lg:col-span-2 bg-[var(--color-warm-gray)] rounded-2xl p-7 lg:p-8 border border-[var(--color-mid-gray)] hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <span className="text-xs font-bold text-primary tracking-wider uppercase px-3 py-1.5 bg-accent rounded-full self-start mb-5">
                    Start here
                  </span>
                  <h2 className="font-heading font-bold text-3xl text-charcoal-ink leading-tight mb-4 group-hover:text-primary transition-colors text-balance">
                    {titleCase(preArrivalChecklist.title)}
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-2xl">
                    {preArrivalChecklist.description}
                  </p>
                  <div className="flex items-center justify-between text-sm mt-auto">
                    <span className="text-muted-foreground text-xs">{preArrivalChecklist.readTime}</span>
                    <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform inline-block">
                      Open checklist &rarr;
                    </span>
                  </div>
                </Link>
              )}

              <div className="bg-primary rounded-2xl p-7">
                <div className="text-accent text-sm font-bold tracking-widest uppercase mb-4">
                  Pre-arrival checklist
                </div>
                <div className="flex flex-col gap-4">
                  {preArrivalSteps.map((step, index) => (
                    <div key={step} className="flex gap-3">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-primary text-xs font-bold">
                        {index + 1}
                      </span>
                      <p className="text-white/75 text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-warm-gray)] py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-7">
              <div className="text-primary text-sm font-bold tracking-widest uppercase mb-3">
                Essential guides
              </div>
              <h2 className="font-heading font-bold text-2xl text-charcoal-ink mb-3">
                The core decisions most students face
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                These guides carry the biggest decisions. Use them to sort the move before you go deeper into local planning.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredGuides.filter(g => g.slug !== 'pre-arrival-checklist').map((guide) => (
                <GuideLink key={guide.href} guide={guide} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-7">
              <div className="text-primary text-sm font-bold tracking-widest uppercase mb-3">
                Browse by topic
              </div>
              <h2 className="font-heading font-bold text-2xl text-charcoal-ink mb-3">
                All moving abroad guidance
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Use the topic groups to jump straight into the stage you are at now.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category) => {
                const uniqueArticles = category.articles.filter(
                  article => !featuredGuides.some(featured => featured.slug === article.slug)
                )

                if (uniqueArticles.length === 0) return null

                return (
                  <div key={category.name} className={`${category.color} rounded-2xl p-7`}>
                    <h3 className={`font-heading font-bold text-xl ${category.textColor} mb-5`}>
                      {category.name}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {uniqueArticles.map((article) => (
                        <Link
                          key={article.href}
                          href={article.href}
                          className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                            category.color === 'bg-[#1B365D]'
                              ? 'hover:bg-white/10'
                              : category.color === 'bg-[#FFCC00]'
                                ? 'hover:bg-primary/10'
                                : 'bg-white hover:bg-primary/5 border border-[var(--color-mid-gray)]'
                          }`}
                        >
                          <span
                            className={`text-sm font-medium ${
                              category.color === 'bg-[#1B365D]'
                                ? 'text-white/90 group-hover:text-white'
                                : 'text-charcoal-ink group-hover:text-primary'
                            } transition-colors`}
                          >
                            {titleCase(article.title)}
                          </span>
                          <span
                            className={`text-xs flex-shrink-0 ml-4 ${
                              category.color === 'bg-[#1B365D]' ? 'text-white/50' : 'text-muted-foreground'
                            }`}
                          >
                            {article.readTime}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-warm-gray)] py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-7">
              <div className="text-primary text-sm font-bold tracking-widest uppercase mb-3">
                Country pathways
              </div>
              <h2 className="font-heading font-bold text-2xl text-charcoal-ink mb-3">
                Plan for your destination
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Choose the country first. Then move into the steps that fit that system.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {countryPathways.map((pathway) => (
                <div key={pathway.slug} className="bg-white rounded-2xl p-7 border border-[var(--color-mid-gray)]">
                  <h3 className="font-heading font-bold text-xl text-charcoal-ink mb-3">
                    {pathway.country}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {pathway.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    {getCountryMovingAbroadLinks(pathway.slug).map((guide) => (
                      <Link
                        key={guide.href}
                        href={guide.href}
                        className="group flex items-center justify-between gap-4 bg-[var(--color-warm-gray)] px-4 py-3 rounded-xl border border-[var(--color-mid-gray)] hover:border-primary/30 hover:bg-white transition-colors"
                      >
                        <span className="text-sm font-medium text-charcoal-ink group-hover:text-primary transition-colors">
                          {titleCase(guide.title)}
                        </span>
                        <span className="text-xs flex-shrink-0 text-muted-foreground">{guide.readTime}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1">
                <div className="text-primary text-sm font-bold tracking-widest uppercase mb-3">
                  Next steps
                </div>
                <h2 className="font-heading font-bold text-2xl text-charcoal-ink mb-3">
                  Move from guidance to local planning
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Once the broad move is clear, use city and university pages to narrow the housing search.
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {nextSteps.map((step) => (
                  <Link
                    key={step.href}
                    href={step.href}
                    className="group bg-[var(--color-warm-gray)] rounded-2xl p-6 border border-[var(--color-mid-gray)] hover:border-primary/30 hover:shadow-lg hover:bg-white transition-all duration-200"
                  >
                    <h3 className="font-heading font-bold text-lg text-charcoal-ink mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{step.description}</p>
                    <div className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform inline-block">
                      Continue &rarr;
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-warm-gray)] py-14 px-6 border-t border-[var(--color-mid-gray)]">
          <div className="max-w-7xl mx-auto">
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
