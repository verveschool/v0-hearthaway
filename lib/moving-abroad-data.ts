export type MovingAbroadArticleCategory = 'Before you go' | 'Accommodation' | 'Budgeting' | 'Arriving'
export type MovingAbroadArticleStage = 'Planning' | 'Booking' | 'Budgeting' | 'Arrival' | 'Settling in'
export type MovingAbroadCountrySlug = 'uk' | 'ireland' | 'australia'
export type MovingAbroadCtaVariant = 'housing' | 'planning'

export type MovingAbroadArticleSection = {
  title: string
  summary: string
}

export type MovingAbroadArticle = {
  slug: string
  title: string
  category: MovingAbroadArticleCategory
  description: string
  readTime: string
  stage: MovingAbroadArticleStage
  countries: MovingAbroadCountrySlug[]
  sections: MovingAbroadArticleSection[]
  ctaVariant: MovingAbroadCtaVariant
  image?: string
  featured?: boolean
  preview?: boolean
}

export type MovingAbroadArticleCard = Pick<
  MovingAbroadArticle,
  'slug' | 'title' | 'category' | 'description' | 'readTime'
> & {
  href: string
}

export type MovingAbroadCategoryGroup = {
  name: MovingAbroadArticleCategory
  color: 'bg-[#1B365D]' | 'bg-[#FFCC00]' | 'bg-[#F7F6F3]'
  textColor: 'text-white' | 'text-[#1B365D]'
  articles: MovingAbroadArticleCard[]
}

export const movingAbroadArticles: MovingAbroadArticle[] = [
  {
    slug: 'pre-arrival-checklist',
    title: 'The complete pre-arrival checklist for international students',
    category: 'Before you go',
    description:
      'Everything you need to sort before you travel — from accommodation and visas to bank accounts and packing. A practical guide from students who have done it.',
    readTime: '12 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Confirm your essentials', summary: 'Line up your offer documents, passport, visa steps, insurance, and arrival dates before booking anything irreversible.' },
      { title: 'Secure accommodation early', summary: 'Compare verified student housing options around your campus, then check contract length, deposits, and move-in rules.' },
      { title: 'Prepare your first week', summary: 'Plan transport, banking, phone access, campus registration, and a small buffer budget for unexpected arrival costs.' },
    ],
    ctaVariant: 'housing',
    image: '/images/acc-common.png',
    featured: true,
  },
  {
    slug: 'choose-accommodation',
    title: 'How to choose the right accommodation before you arrive',
    category: 'Accommodation',
    description:
      'Walking through the real decisions you face: halls vs private, location tradeoffs, what to ask before signing, and how to avoid the biggest mistakes.',
    readTime: '10 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Start with your campus routine', summary: 'Map likely lecture locations, transport routes, grocery access, and how often you expect to be on campus.' },
      { title: 'Compare room types honestly', summary: 'Balance privacy, budget, included bills, social life, and support when deciding between halls, studios, and shared homes.' },
      { title: 'Ask before you sign', summary: 'Confirm deposit terms, guarantor expectations, cancellation rules, furnishings, and what happens if your visa timing changes.' },
    ],
    ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'real-cost-abroad',
    title: 'The real cost of studying abroad: a country-by-country breakdown',
    category: 'Budgeting',
    description:
      'Rent, transport, food, tuition, and extras — broken down honestly for students planning their move to the UK, Ireland, or Australia.',
    readTime: '14 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Rent is only the baseline', summary: 'Compare weekly or monthly rent alongside bills, deposits, bedding, laundry, transport, and move-in purchases.' },
      { title: 'Country-by-country planning', summary: 'Use local currency, payment frequency, and city demand to create a realistic first-term cash-flow plan.' },
      { title: 'Build a safety buffer', summary: 'Keep room for exchange-rate changes, delayed payments, emergency travel, and one-off setup costs.' },
    ],
    ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'before-you-go',
    title: 'What to sort before you leave home',
    category: 'Before you go',
    description: 'A clear checklist of everything you need to arrange before you travel.',
    readTime: '6 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Documents and deadlines', summary: 'Keep offer letters, passport details, visa evidence, accommodation confirmations, and emergency contacts together.' },
      { title: 'Money and arrival basics', summary: 'Plan payment methods, first-month funds, transport from the airport, and temporary access to mobile data.' },
      { title: 'Accommodation readiness', summary: 'Check move-in times, bedding needs, inventory lists, and who to contact if your flight is delayed.' },
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'student-visa',
    title: 'Understanding your student visa requirements',
    category: 'Before you go',
    description: 'Plan documents, timing, and arrival expectations before you travel.',
    readTime: '8 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Check the official route', summary: 'Use your destination country and institution guidance to confirm the correct visa route and application timing.' },
      { title: 'Prepare supporting evidence', summary: 'Gather offer letters, finances, identity documents, accommodation details, and any health or insurance evidence required.' },
      { title: 'Align visa and housing dates', summary: 'Make sure your arrival window, move-in date, and cancellation terms work together before you commit.' },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'uk-bank-account',
    title: 'How to open a UK bank account before you arrive',
    category: 'Before you go',
    description: 'Understand what banks may ask for and how to plan payments before your UK account is ready.',
    readTime: '5 min read',
    stage: 'Planning',
    countries: ['uk'],
    sections: [
      { title: 'Know what proof you may need', summary: 'Banks commonly ask for identity, student status, and an address, so keep digital and printed copies ready.' },
      { title: 'Bridge the first few weeks', summary: 'Have an international card or alternative payment plan until your local account is fully active.' },
      { title: 'Connect rent payments', summary: 'Ask your accommodation provider when rent is due and which payment methods are accepted.' },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'packing-list',
    title: 'Packing list for international students',
    category: 'Before you go',
    description: 'Pack for climate, classes, housing, and your first few weeks.',
    readTime: '4 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Carry-on essentials', summary: 'Keep documents, medication, chargers, valuables, and one change of clothes with you while travelling.' },
      { title: 'Pack for your accommodation', summary: 'Check what is already provided before bringing bedding, kitchen items, adapters, or bulky homeware.' },
      { title: 'Buy some items locally', summary: 'Save luggage space by planning to buy toiletries, cleaning supplies, and low-cost room basics after arrival.' },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'accommodation-costs',
    title: 'How much does student accommodation really cost?',
    category: 'Accommodation',
    description: 'Real costs, broken down by city and type, so you can plan with confidence.',
    readTime: '8 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Compare the full price', summary: 'Look beyond headline rent to bills, deposits, booking fees, laundry, commute costs, and contract length.' },
      { title: 'City demand changes budgets', summary: 'Popular cities and intake dates can move fast, so compare options early and keep a realistic backup plan.' },
      { title: 'Match cost to lifestyle', summary: 'Choose the room that supports your routine, not just the cheapest option on the first search page.' },
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'halls-vs-private',
    title: 'Student halls vs private accommodation',
    category: 'Accommodation',
    description: 'Compare housing styles before choosing where to live.',
    readTime: '6 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Student halls', summary: 'Halls can offer convenience, social opportunities, included bills, and a clearer support structure for new arrivals.' },
      { title: 'Private accommodation', summary: 'Private rentals may offer flexibility and independence, but can require more checks around bills, deposits, and location.' },
      { title: 'Choose by support needs', summary: 'Think about your first semester confidence, commute, budget, and how much help you want nearby.' },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'avoid-scams',
    title: 'How to avoid accommodation scams',
    category: 'Accommodation',
    description: 'The warning signs every international student should know.',
    readTime: '5 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Watch for pressure tactics', summary: 'Be cautious if someone pushes urgent payment, avoids written terms, or refuses basic verification.' },
      { title: 'Verify before paying', summary: 'Check provider details, contract terms, payment routes, images, reviews, and whether the room actually exists.' },
      { title: 'Use trusted support', summary: 'When in doubt, ask your university or a trusted accommodation service before sending money.' },
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'tenancy-agreement',
    title: 'Understanding your tenancy agreement',
    category: 'Accommodation',
    description: 'Review the key terms before signing for student housing.',
    readTime: '9 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Read the dates first', summary: 'Confirm start date, end date, move-in rules, rent schedule, and whether the contract fits your academic calendar.' },
      { title: 'Understand deposits and bills', summary: 'Check what is included, how deposits are protected or returned, and who handles utilities.' },
      { title: 'Know your responsibilities', summary: 'Look for guest rules, maintenance reporting, inspections, cancellation terms, and shared-space expectations.' },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'cost-of-living',
    title: 'Monthly cost of living: UK, Ireland & Australia',
    category: 'Budgeting',
    description: 'Compare rent, transport, groceries, and everyday student costs.',
    readTime: '7 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Build a monthly baseline', summary: 'Estimate rent, food, transport, study supplies, phone bills, subscriptions, and personal spending.' },
      { title: 'Account for local differences', summary: 'Currency, payment frequency, city size, and transport networks can change what a realistic budget looks like.' },
      { title: 'Review after arrival', summary: 'Track the first month closely and adjust your habits before small overspends become a term-long problem.' },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'student-budget',
    title: 'How to budget as an international student',
    category: 'Budgeting',
    description: 'Build a monthly plan for rent, food, transport, and essentials.',
    readTime: '6 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Separate fixed and flexible costs', summary: 'Rent, bills, insurance, and transport passes come first; eating out and shopping can flex around them.' },
      { title: 'Plan around payment dates', summary: 'Understand when rent, tuition, scholarships, or family transfers arrive so you avoid cash-flow surprises.' },
      { title: 'Keep a small emergency fund', summary: 'Even a modest buffer helps with delayed flights, replacement items, or unexpected health and travel costs.' },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'hidden-costs',
    title: "Hidden costs new students don't expect",
    category: 'Budgeting',
    description: 'Spot extra expenses beyond rent and tuition before you arrive.',
    readTime: '5 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Move-in purchases', summary: 'Bedding, kitchen items, adapters, cleaning products, and laundry can add up in the first week.' },
      { title: 'Admin and setup costs', summary: 'Budget for transport cards, SIM plans, printing, societies, healthcare-related costs, and ID photos.' },
      { title: 'Social settling-in spend', summary: 'The first month often includes meals, events, and trips that help you settle but need a realistic limit.' },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'student-discounts',
    title: 'Student discounts and how to find them',
    category: 'Budgeting',
    description: 'Find savings on transport, food, software, study supplies, and everyday student essentials.',
    readTime: '4 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Use your student status', summary: 'Check university emails, student cards, and recognised discount platforms for current offers.' },
      { title: 'Prioritise recurring savings', summary: 'Transport, groceries, software, and phone plans usually matter more than one-off retail discounts.' },
      { title: 'Avoid false savings', summary: 'A discount only helps if the purchase already fits your budget and your actual needs.' },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'first-week',
    title: 'Your first week: what to expect',
    category: 'Arriving',
    description: 'Know what to do after landing and how to settle into your new city.',
    readTime: '7 min read',
    stage: 'Arrival',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Move in and document everything', summary: 'Check your room, report issues quickly, save inventory photos, and learn how maintenance requests work.' },
      { title: 'Handle campus admin', summary: 'Complete registration, collect student ID, attend orientation, and learn where to ask for support.' },
      { title: 'Set up daily life', summary: 'Find groceries, transport routes, healthcare options, banking steps, and a few places that feel familiar.' },
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'airport-to-home',
    title: 'Getting from the airport to your accommodation',
    category: 'Arriving',
    description: 'Make your arrival smoother with a practical first-journey plan.',
    readTime: '5 min read',
    stage: 'Arrival',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Plan before takeoff', summary: 'Save your address, check transport options, and know what to do if your flight is delayed.' },
      { title: 'Keep essentials accessible', summary: 'Have documents, phone battery, local cash or card options, and accommodation contact details ready.' },
      { title: 'Arrive safely', summary: 'Choose reliable transport, share your route with someone you trust, and confirm key collection instructions.' },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'healthcare',
    title: 'Registering with a doctor and NHS',
    category: 'Arriving',
    description: 'Understand how to find healthcare support after arriving as an international student.',
    readTime: '4 min read',
    stage: 'Settling in',
    countries: ['uk'],
    sections: [
      { title: 'Understand local healthcare access', summary: 'Check your university guidance and destination rules for registration, insurance, and emergency care.' },
      { title: 'Register early where possible', summary: 'Do not wait until you are unwell to learn which local clinic, doctor, or student health service to contact.' },
      { title: 'Keep health documents handy', summary: 'Bring vaccination records, prescriptions, and key medical notes in case you need support quickly.' },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'making-friends',
    title: 'Making friends in a new country',
    category: 'Arriving',
    description: 'Practical ways to build a support network during your first term abroad.',
    readTime: '6 min read',
    stage: 'Settling in',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Start with structured moments', summary: 'Orientation events, societies, study groups, and accommodation socials make first conversations easier.' },
      { title: 'Create repeat routines', summary: 'Friendships often grow from repeated classes, gym times, cooking routines, or weekly campus events.' },
      { title: 'Ask for support early', summary: 'If loneliness feels heavy, contact university support services or trusted people before it becomes isolating.' },
    ],
    ctaVariant: 'planning',
  },
]

const articleBySlug = new Map(movingAbroadArticles.map((article) => [article.slug, article]))

const categoryStyles: Record<MovingAbroadArticleCategory, Pick<MovingAbroadCategoryGroup, 'color' | 'textColor'>> = {
  'Before you go': { color: 'bg-[#1B365D]', textColor: 'text-white' },
  Accommodation: { color: 'bg-[#FFCC00]', textColor: 'text-[#1B365D]' },
  Budgeting: { color: 'bg-[#F7F6F3]', textColor: 'text-[#1B365D]' },
  Arriving: { color: 'bg-[#1B365D]', textColor: 'text-white' },
}

export const movingAbroadCategoryOrder: MovingAbroadArticleCategory[] = [
  'Before you go',
  'Accommodation',
  'Budgeting',
  'Arriving',
]

export const movingAbroadCategorySlugs: Record<MovingAbroadArticleCategory, string[]> = {
  'Before you go': ['before-you-go', 'student-visa', 'uk-bank-account', 'packing-list'],
  Accommodation: ['accommodation-costs', 'halls-vs-private', 'avoid-scams', 'tenancy-agreement'],
  Budgeting: ['cost-of-living', 'student-budget', 'hidden-costs', 'student-discounts'],
  Arriving: ['first-week', 'airport-to-home', 'healthcare', 'making-friends'],
}

export const featuredGuideSlugs = ['pre-arrival-checklist', 'choose-accommodation', 'real-cost-abroad'] as const
export const homePreviewGuideSlugs = ['before-you-go', 'accommodation-costs', 'avoid-scams', 'first-week'] as const

export const countryMovingAbroadSlugs: Record<MovingAbroadCountrySlug, string[]> = {
  uk: ['student-visa', 'cost-of-living', 'first-week', 'tenancy-agreement'],
  ireland: ['student-visa', 'student-budget', 'airport-to-home', 'avoid-scams'],
  australia: ['student-visa', 'hidden-costs', 'packing-list', 'halls-vs-private'],
}

const movingAbroadCountrySlugs: MovingAbroadCountrySlug[] = ['uk', 'ireland', 'australia']

function isMovingAbroadCountrySlug(countrySlug: string): countrySlug is MovingAbroadCountrySlug {
  return movingAbroadCountrySlugs.some((validCountrySlug) => validCountrySlug === countrySlug)
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
    description: article.description,
    readTime: article.readTime,
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
    articles: movingAbroadCategorySlugs[name].map(getMovingAbroadArticleCard),
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
