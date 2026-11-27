import { ukStudentHousing } from '../content/student-guides/uk-student-housing'
import { netherlandsStudentHousing } from '../content/student-guides/netherlands-student-housing'
import { accessibleStudentHousing } from '../content/student-guides/accessible-student-housing'
import { afterRentalScam, reviewedGuides, weightedHousingComparison } from '../content/student-guides/index'
import { australiaStudentHousing } from '../content/student-guides/australia-student-housing'
import { irelandStudentHousing } from '../content/student-guides/ireland-student-housing'
import { guideWordCount, type ReviewedGuide } from '../content/student-guides/model'

export type MovingAbroadArticleCategory = 'Before you go' | 'Accommodation' | 'Budgeting' | 'Arriving'
export type MovingAbroadArticleStage = 'Planning' | 'Booking' | 'Budgeting' | 'Arrival' | 'Settling in'
export const guideDestinations = ['uk', 'ireland', 'france', 'uae', 'germany', 'australia', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'] as const
export type MovingAbroadCountrySlug = (typeof guideDestinations)[number]
export type MovingAbroadCtaVariant = 'housing' | 'planning'

type GuideMetadata = {
  slug: string
  category: MovingAbroadArticleCategory
  tags: string[]
  stage: MovingAbroadArticleStage
  countries: MovingAbroadCountrySlug[]
  ctaVariant: MovingAbroadCtaVariant
  image?: string
  featured?: boolean
  preview?: boolean
}

export type MovingAbroadArticle = GuideMetadata & ReviewedGuide & {
  wordCount: number
  readTime: string
}

export type MovingAbroadArticleCard = Pick<
  MovingAbroadArticle,
  'slug' | 'title' | 'category' | 'tags' | 'description' | 'readTime' | 'countries'
> & {
  href: string
}

export type MovingAbroadCategoryGroup = {
  name: MovingAbroadArticleCategory
  color: 'bg-[#00319D]' | 'bg-[#FCC20A]' | 'bg-[#F7F6F3]'
  textColor: 'text-white' | 'text-[#00319D]'
  articles: MovingAbroadArticleCard[]
}

const baselineGuideMetadata = [
  {
    slug: 'pre-arrival-checklist', category: 'Before you go', stage: 'Planning',
    tags: ['Pre-Arrival', 'Student Visa', 'Documentation', 'Accommodation'],
    countries: [...guideDestinations], ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'choose-accommodation', category: 'Accommodation', stage: 'Booking',
    tags: ['Accommodation', 'Renting', 'Commute', 'Tenancy Agreements'],
    countries: [...guideDestinations], ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'real-cost-abroad', category: 'Budgeting', stage: 'Budgeting',
    tags: ['Budgeting', 'Financial Requirements', 'Cost of Living', 'Student Finance'],
    countries: [...guideDestinations], ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'student-visa', category: 'Before you go', stage: 'Planning',
    tags: ['Student Visa', 'Immigration', 'Financial Requirements', 'Documentation'],
    countries: [...guideDestinations], ctaVariant: 'planning',
  },
  {
    slug: 'uk-bank-account', category: 'Before you go', stage: 'Planning',
    tags: ['Banking', 'Student Finance', 'Arrival', 'Documentation'],
    countries: ['uk'], ctaVariant: 'planning',
  },
  {
    slug: 'packing-list', category: 'Before you go', stage: 'Planning',
    tags: ['Pre-Arrival', 'Packing', 'Travel', 'Student Life'],
    countries: [...guideDestinations], ctaVariant: 'housing',
  },
  {
    slug: 'accommodation-costs', category: 'Accommodation', stage: 'Budgeting',
    tags: ['Accommodation', 'Renting', 'Cost of Living', 'Student Finance'],
    countries: [...guideDestinations], ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'halls-vs-private', category: 'Accommodation', stage: 'Booking',
    tags: ['Accommodation', 'Renting', 'Housing Options', 'Student Life'],
    countries: [...guideDestinations], ctaVariant: 'housing',
  },
  {
    slug: 'avoid-scams', category: 'Accommodation', stage: 'Booking',
    tags: ['Accommodation', 'Renting', 'Housing Safety', 'Scams'],
    countries: [...guideDestinations], ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'tenancy-agreement', category: 'Accommodation', stage: 'Booking',
    tags: ['Accommodation', 'Renting', 'Tenancy Agreements', 'Deposits'],
    countries: ['uk', 'ireland', 'australia', 'france'], ctaVariant: 'housing',
  },
  {
    slug: 'cost-of-living', category: 'Budgeting', stage: 'Budgeting',
    tags: ['Budgeting', 'Cost of Living', 'Transport', 'Student Finance'],
    countries: [...guideDestinations], ctaVariant: 'housing',
  },
  {
    slug: 'student-budget', category: 'Budgeting', stage: 'Budgeting',
    tags: ['Budgeting', 'Student Finance', 'Cash Flow', 'Cost of Living'],
    countries: [...guideDestinations], ctaVariant: 'planning',
  },
  {
    slug: 'hidden-costs', category: 'Budgeting', stage: 'Budgeting',
    tags: ['Budgeting', 'Hidden Costs', 'Student Finance', 'Cost of Living'],
    countries: [...guideDestinations], ctaVariant: 'planning',
  },
  {
    slug: 'student-discounts', category: 'Budgeting', stage: 'Budgeting',
    tags: ['Budgeting', 'Student Discounts', 'Cost of Living', 'Student Finance'],
    countries: [...guideDestinations], ctaVariant: 'planning',
  },
  {
    slug: 'first-week', category: 'Arriving', stage: 'Arrival',
    tags: ['Arrival', 'Settling In', 'Student Life', 'Orientation'],
    countries: [...guideDestinations], ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'airport-to-home', category: 'Arriving', stage: 'Arrival',
    tags: ['Arrival', 'Travel', 'Transport', 'Settling In'],
    countries: ['uk', 'ireland', 'australia', 'france'], ctaVariant: 'housing',
  },
  {
    slug: 'healthcare', category: 'Arriving', stage: 'Settling in',
    tags: ['Arrival', 'Healthcare', 'Settling In', 'Documentation'],
    countries: [...guideDestinations], ctaVariant: 'planning',
  },
  {
    slug: 'making-friends', category: 'Arriving', stage: 'Settling in',
    tags: ['Arrival', 'Student Life', 'Settling In', 'Community'],
    countries: [...guideDestinations], ctaVariant: 'planning',
  },
  {
    slug: 'uae-visa-sponsorship', category: 'Before you go', stage: 'Planning',
    tags: ['Student Visa', 'Immigration', 'Documentation', 'Sponsorship'],
    countries: ['uae'], ctaVariant: 'planning',
  },
  {
    slug: 'uae-housing-furnished', category: 'Accommodation', stage: 'Booking',
    tags: ['Accommodation', 'Renting', 'Housing Options', 'Furnished Housing'],
    countries: ['uae'], ctaVariant: 'housing',
  },
  {
    slug: 'uae-tax-free-income-planning', category: 'Budgeting', stage: 'Planning',
    tags: ['Budgeting', 'Banking', 'Financial Requirements', 'Student Finance'],
    countries: ['uae'], ctaVariant: 'planning',
  },
  {
    slug: 'germany-studentenwerk-housing', category: 'Accommodation', stage: 'Booking',
    tags: ['Accommodation', 'Renting', 'Student Housing', 'Housing Safety'],
    countries: ['germany'], ctaVariant: 'housing',
  },
  {
    slug: 'germany-monthly-budgeting', category: 'Budgeting', stage: 'Booking',
    tags: ['Budgeting', 'Cost of Living', 'Student Finance', 'Cash Flow'],
    countries: ['germany'], ctaVariant: 'planning',
  },
  {
    slug: 'germany-tenancy-law-deposits', category: 'Accommodation', stage: 'Booking',
    tags: ['Accommodation', 'Tenancy Agreements', 'Deposits', 'Housing Safety'],
    countries: ['germany'], ctaVariant: 'planning',
  },
] satisfies GuideMetadata[]

const newGuides: (ReviewedGuide & GuideMetadata)[] = [
  {
    ...weightedHousingComparison,
    category: 'Accommodation',
    tags: ['Accommodation', 'Renting', 'Commute', 'Decision matrix', 'Shortlist'],
    stage: 'Booking',
    countries: [...guideDestinations],
    ctaVariant: 'housing',
  },
  {
    ...afterRentalScam,
    category: 'Accommodation',
    tags: ['Accommodation', 'Renting', 'Fraud', 'Bank transfer', 'Payment'],
    stage: 'Booking',
    countries: [...guideDestinations],
    ctaVariant: 'planning',
  },
  {
    ...irelandStudentHousing,
    category: 'Accommodation',
    tags: ['Accommodation', 'Renting', 'Tenancy Agreements', 'Deposits', 'RTB', 'Ireland'],
    stage: 'Booking',
    countries: ['ireland'],
    ctaVariant: 'housing',
  },
  {
    ...australiaStudentHousing,
    category: 'Accommodation',
    tags: ['Accommodation', 'Renting', 'Tenancy Agreements', 'Bond', 'Queensland', 'Australia'],
    stage: 'Booking',
    countries: ['australia'],
    ctaVariant: 'housing',
  },
  {
    ...accessibleStudentHousing,
    category: 'Accommodation',
    tags: ['Accommodation', 'Renting', 'Accessibility', 'Commute', 'Access needs'],
    stage: 'Booking',
    countries: [...guideDestinations],
    ctaVariant: 'housing',
  },
  {
    ...ukStudentHousing,
    category: 'Accommodation',
    tags: ['Accommodation', 'Renting', 'Tenancy Agreements', 'Deposits', 'United Kingdom', 'Scotland', 'Wales', 'Northern Ireland'],
    stage: 'Booking',
    countries: ['uk'],
    ctaVariant: 'housing',
  },
  {
    ...netherlandsStudentHousing,
    category: 'Accommodation',
    tags: ['Accommodation', 'Renting', 'Tenancy Agreements', 'Deposits', 'BRP', 'Netherlands'],
    stage: 'Booking',
    countries: ['netherlands'],
    ctaVariant: 'housing',
  },
]

const reviewedBySlug = new Map(reviewedGuides.map((guide) => [guide.slug, guide]))

export const baselineGuideSlugs = baselineGuideMetadata.map(({ slug }) => slug)

const allGuides = [
  ...baselineGuideMetadata.map((metadata) => {
    const guide = reviewedBySlug.get(metadata.slug)
    if (!guide) throw new Error(`Missing guide content: ${metadata.slug}`)
    return { ...metadata, ...guide }
  }),
  ...newGuides,
]

export const movingAbroadArticles: MovingAbroadArticle[] = allGuides.map((guide) => {
  const wordCount = guideWordCount(guide.body)
  return { ...guide, wordCount, readTime: `${Math.max(1, Math.ceil(wordCount / 220))} min read` }
})

export function isMovingAbroadCountrySlug(countrySlug: string): countrySlug is MovingAbroadCountrySlug {
  return guideDestinations.some((slug) => slug === countrySlug)
}

const articleBySlug = new Map(movingAbroadArticles.map((article) => [article.slug, article]))

const categoryStyles: Record<MovingAbroadArticleCategory, Pick<MovingAbroadCategoryGroup, 'color' | 'textColor'>> = {
  'Before you go': { color: 'bg-[#00319D]', textColor: 'text-white' },
  Accommodation: { color: 'bg-[#FCC20A]', textColor: 'text-[#00319D]' },
  Budgeting: { color: 'bg-[#F7F6F3]', textColor: 'text-[#00319D]' },
  Arriving: { color: 'bg-[#00319D]', textColor: 'text-white' },
}

export const movingAbroadCategoryOrder: MovingAbroadArticleCategory[] = [
  'Before you go',
  'Accommodation',
  'Budgeting',
  'Arriving',
]

export const featuredGuideSlugs = ['pre-arrival-checklist', 'choose-accommodation', 'real-cost-abroad'] as const
export const homePreviewGuideSlugs = ['pre-arrival-checklist', 'accommodation-costs', 'avoid-scams', 'first-week'] as const

export const countryMovingAbroadSlugs: Record<MovingAbroadCountrySlug, string[]> = {
  uk: ['uk-student-housing', 'student-visa', 'cost-of-living', 'first-week', 'tenancy-agreement'],
  ireland: ['ireland-student-housing', 'student-visa', 'student-budget', 'airport-to-home', 'avoid-scams'],
  france: ['student-visa', 'student-budget', 'airport-to-home', 'tenancy-agreement'],
  uae: ['uae-visa-sponsorship', 'uae-housing-furnished', 'uae-tax-free-income-planning'],
  germany: ['germany-studentenwerk-housing', 'germany-monthly-budgeting', 'germany-tenancy-law-deposits'],
  australia: ['australia-student-housing', 'student-visa', 'hidden-costs', 'packing-list', 'halls-vs-private'],
  spain: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  austria: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  belgium: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  hungary: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  singapore: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  malta: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  italy: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  netherlands: ['netherlands-student-housing', 'student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  malaysia: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
}

export function getMovingAbroadArticleBySlug(slug: string): MovingAbroadArticle | undefined {
  return articleBySlug.get(slug)
}

function assertMovingAbroadArticle(article: MovingAbroadArticle | undefined, slug: string): MovingAbroadArticle {
  if (article === undefined) {
    throw new Error(`Unknown moving abroad article slug: ${slug}`)
  }
  return article
}

function toMovingAbroadArticleCard(article: MovingAbroadArticle): MovingAbroadArticleCard {
  return {
    slug: article.slug,
    title: article.title,
    category: article.category,
    tags: article.tags,
    description: article.description,
    readTime: article.readTime,
    countries: article.countries,
    href: getMovingAbroadHref(article.slug),
  }
}

export function getMovingAbroadHref(slug: string): string {
  const article = assertMovingAbroadArticle(getMovingAbroadArticleBySlug(slug), slug)
  return `/moving-abroad/${article.slug}`
}

export function getMovingAbroadArticleCard(slug: string): MovingAbroadArticleCard {
  return toMovingAbroadArticleCard(assertMovingAbroadArticle(getMovingAbroadArticleBySlug(slug), slug))
}

export function getMovingAbroadCategoryGroups(): MovingAbroadCategoryGroup[] {
  return movingAbroadCategoryOrder.map((name) => ({
    name,
    ...categoryStyles[name],
    articles: getMovingAbroadArticlesByCategory(name).map(toMovingAbroadArticleCard),
  }))
}

export function getMovingAbroadArticlesByCategory(category: string): MovingAbroadArticle[] {
  return movingAbroadArticles.filter((article) => article.category === category)
}

export function getMovingAbroadArticlesByCountry(countrySlug: string): MovingAbroadArticle[] {
  if (!isMovingAbroadCountrySlug(countrySlug)) {
    return []
  }
  return movingAbroadArticles.filter((article) => article.countries.includes(countrySlug))
}

export function getFeaturedMovingAbroadArticles(): MovingAbroadArticle[] {
  return featuredGuideSlugs.map((slug) => assertMovingAbroadArticle(getMovingAbroadArticleBySlug(slug), slug))
}

export function getFeaturedMovingAbroadGuides(): MovingAbroadArticleCard[] {
  return getFeaturedMovingAbroadArticles().map(toMovingAbroadArticleCard)
}

export function getHomeMovingAbroadGuides(): MovingAbroadArticleCard[] {
  return homePreviewGuideSlugs.map(getMovingAbroadArticleCard)
}

export function getCountryMovingAbroadLinks(countrySlug: MovingAbroadCountrySlug): MovingAbroadArticleCard[] {
  const countryArticles = getMovingAbroadArticlesByCountry(countrySlug)
  return countryMovingAbroadSlugs[countrySlug].map((slug) => {
    const article = assertMovingAbroadArticle(
      countryArticles.find((countryArticle) => countryArticle.slug === slug),
      slug,
    )
    return toMovingAbroadArticleCard(article)
  })
}

export function getRelatedGuides(article: MovingAbroadArticle): MovingAbroadArticle[] {
  return article.related.map((slug) => assertMovingAbroadArticle(articleBySlug.get(slug), slug))
}
