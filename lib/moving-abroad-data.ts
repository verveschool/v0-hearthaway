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
    title: 'the complete 2026 pre-arrival checklist for international students',
    category: 'Before you go',
    description: 'everything you need to sort before you travel. a tactical guide covering 2026 visa financial rules, accommodation locks and arrival prep.',
    readTime: '12 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'secure the 28 day financial holding', summary: 'before applying for any uk visa you must hold the exact maintenance funds for 28 consecutive days. do not touch this money or you will be rejected.' },
      { title: 'lock your housing before the cap hits', summary: 'with the 295,000 australian student cap and the dublin supply squeeze, booking verified housing early is the only way to protect your admission.' },
      { title: 'plan for digital visa access', summary: 'uk visas are fully digital in 2026. keep your share codes ready and prepare to use an international card until you get your physical campus enrollment letters.' }
    ],
    ctaVariant: 'housing',
    image: '/images/acc-common.png',
    featured: true,
  },
  {
    slug: 'choose-accommodation',
    title: 'how to choose the right accommodation and avoid the commute trap',
    category: 'Accommodation',
    description: 'walking through the real decisions you face. purpose built versus private rentals, transport line tradeoffs and how to read the contract.',
    readTime: '10 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'anchor to rail and tram lines', summary: 'do not just look at distance on a map. check the exact walking time to the nearest tube station, luas tram stop or train line. commutes destroy budgets.' },
      { title: 'purpose built versus private rentals', summary: 'purpose built student blocks offer fixed utility bills which protects you from energy price spikes. private rentals seem cheaper until winter heating bills arrive.' },
      { title: 'ask about deposit protection', summary: 'in the uk your deposit must legally sit in a government backed protection scheme. if a private landlord asks for cash directly walk away immediately.' }
    ],
    ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'real-cost-abroad',
    title: 'the real cost of studying abroad. exact 2026 capital requirements',
    category: 'Budgeting',
    description: 'rent and tuition are just the baseline. here are the exact government financial proofs required for the uk, ireland and australia.',
    readTime: '14 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'the uk maintenance rule', summary: 'london requires £1,529 per month and regional uk requires £1,171. this must sit completely untouched in your account before you can even file the visa.' },
      { title: 'the australian baseline', summary: 'australian immigration requires proof of aud 29,710 for basic living costs plus a non refundable aud 2,000 visa application fee paid upfront.' },
      { title: 'the irish inis minimum', summary: 'irish immigration demands liquid proof of €10,000 for living costs and a minimum €6,000 first year tuition receipt before they look at your file.' }
    ],
    ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'student-visa',
    title: 'understanding your 2026 student visa financial mechanics',
    category: 'Before you go',
    description: 'plan your document trail, financial seasoning periods and biometric appointments perfectly so you do not miss your intake date.',
    readTime: '8 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'season your funds early', summary: 'governments want to see clean money. sudden large deposits from family will trigger fraud checks. move your funds at least three months before you file.' },
      { title: 'use the right bank accounts', summary: 'only standard savings and current accounts count. property valuations, mutual funds and credit cards will cause an instant visa refusal.' },
      { title: 'align housing and arrival dates', summary: 'do not book unrefundable flights until your visa is granted. ensure your tenancy agreement allows date adjustments if immigration processing is delayed.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'uk-bank-account',
    title: 'how to open a uk bank account and bridge the gap',
    category: 'Before you go',
    description: 'traditional banks will reject you without the right paperwork. here is the exact playbook to get your local sort code and account number fast.',
    readTime: '5 min read',
    stage: 'Planning',
    countries: ['uk'],
    sections: [
      { title: 'the enrollment letter bottleneck', summary: 'high street banks require a physical bank letter from your university. you cannot get this until you physically arrive and register on campus.' },
      { title: 'bridge the gap with a neo bank', summary: 'operations like monzo or revolut allow you to open an account faster but require you to have a uk sim card and physically be in the country.' },
      { title: 'plan your first rent payment', summary: 'your first month of rent and deposit usually needs to be paid before your uk account is open. use an international transfer service to clear this hurdle.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'packing-list',
    title: 'the tactical packing list for international students',
    category: 'Before you go',
    description: 'pack for climate, classes, housing and your first few weeks of survival before your local bank accounts clear.',
    readTime: '4 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'carry on essentials', summary: 'keep your passport, visa grant notices, university offer letters and two weeks of any prescription medication strictly in your cabin bag.' },
      { title: 'pack for your accommodation', summary: 'check what is already provided before bringing bedding, kitchen items or bulky homeware. most student beds are irregular sizes anyway.' },
      { title: 'buy heavy items locally', summary: 'save luggage weight by planning to buy thick winter coats, toiletries and cleaning supplies after you land.' }
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'accommodation-costs',
    title: 'how much purpose built student housing actually costs',
    category: 'Accommodation',
    description: 'real costs broken down by asset type so you can plan your capital deployment with absolute confidence.',
    readTime: '8 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'compare the total run rate', summary: 'look beyond headline rent to internet speeds, utility caps, gym inclusions and commute costs. a slightly more expensive room near campus is often cheaper overall.' },
      { title: 'city demand changes budgets', summary: 'popular cities like dublin or sydney move extremely fast. if you wait for clearance you will be forced into premium luxury studios because the mid tier sells out first.' },
      { title: 'match cost to lifestyle', summary: 'choose the room that supports your academic routine. if you spend twelve hours a day in the library you do not need to pay a premium for a large studio kitchen.' }
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'halls-vs-private',
    title: 'purpose built student blocks versus private rentals',
    category: 'Accommodation',
    description: 'compare the two major housing formats before locking up your cash for an entire academic year.',
    readTime: '6 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'purpose built blocks', summary: 'these offer absolute convenience, fixed bills and built in social networks. you pay a slight premium for security and zero utility headaches.' },
      { title: 'private accommodation', summary: 'renting a house with friends offers independence and often cheaper base rent but leaves you completely exposed to internet setups and heating bill spikes.' },
      { title: 'choose by support needs', summary: 'if it is your first year abroad the built in support of a managed block is invaluable. save the private house share for your second year.' }
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'avoid-scams',
    title: 'how to identify and avoid rental fraud syndicates',
    category: 'Accommodation',
    description: 'the rental market is full of sophisticated operators preying on international students. learn the warning signs.',
    readTime: '5 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'watch for pressure tactics', summary: 'be extremely cautious if a landlord pushes for an urgent western union transfer or avoids providing a written contract before taking your money.' },
      { title: 'never wire cash before viewing', summary: 'scammers use stolen photos of premium apartments. if you cannot view it physically use a verified booking platform that holds funds in escrow.' },
      { title: 'cross check the registry', summary: 'in ireland verify the landlord on the rtb. in the uk ensure they are using a certified deposit protection scheme. verify everything.' }
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'tenancy-agreement',
    title: 'how to read your tenancy agreement without getting trapped',
    category: 'Accommodation',
    description: 'review the hard legal terms before signing a binding contract for student housing abroad.',
    readTime: '9 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'read the dates first', summary: 'confirm the exact start date, end date and move in rules. ensure the contract perfectly overlaps your academic term so you are not homeless during exams.' },
      { title: 'understand deposits and guarantors', summary: 'if you do not have a local guarantor many private landlords demand six to twelve months of rent paid upfront in cash.' },
      { title: 'know your exit clauses', summary: 'look for break clauses. if you need to return home for an emergency you need to know exactly how much it will cost to terminate the lease.' }
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'cost-of-living',
    title: 'the exact weekly cost of living in major student hubs',
    category: 'Budgeting',
    description: 'compare the hard costs of transport, groceries and everyday survival across the uk, ireland and australia.',
    readTime: '7 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'the transport tax', summary: 'living far from campus looks cheap until you factor in £150 a month on train tickets and lost hours of productivity.' },
      { title: 'supermarket tiering', summary: 'where you buy food dictates your budget. shopping at aldi or lidl instead of premium central city supermarkets saves hundreds a term.' },
      { title: 'utility bill spikes', summary: 'if you rent privately prepare for brutal winter heating bills. purpose built student housing fixes this cost upfront so your budget never breaks.' }
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'student-budget',
    title: 'how to structure your cash flow as an international student',
    category: 'Budgeting',
    description: 'build an ironclad monthly plan for rent, food, transport and emergencies.',
    readTime: '6 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'separate fixed and flexible costs', summary: 'rent, bills, insurance and transport passes come first. eating out and retail shopping must flex strictly around your fixed baseline.' },
      { title: 'plan around payment dates', summary: 'understand exactly when rent is deducted and when family transfers arrive so you avoid overdraft penalties or cash flow bottlenecks.' },
      { title: 'keep a liquid emergency fund', summary: 'keep a modest buffer of at least 500 dollars or pounds completely untouched to handle delayed flights or unexpected medical costs.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'hidden-costs',
    title: 'hidden capital drains new students never expect',
    category: 'Budgeting',
    description: 'spot the extra expenses beyond rent and tuition before you land and burn through your savings.',
    readTime: '5 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'move in purchases', summary: 'bedding, kitchen pots, adapters, cleaning products and laundry tokens can easily drain your first week budget instantly.' },
      { title: 'admin and setup costs', summary: 'budget heavily for transit cards, local sim plans, university society fees and mandatory study materials in your first month.' },
      { title: 'social settling in spend', summary: 'the first month involves heavy social spending to build your network. set a strict limit so you do not burn your term budget in october.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'student-discounts',
    title: 'how to leverage student status for structural savings',
    category: 'Budgeting',
    description: 'find the high leverage savings on transport, software and everyday essentials that actually move the needle.',
    readTime: '4 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'use your institutional status', summary: 'register for unidays or student beans immediately. your university email address is a golden ticket for major tech and retail discounts.' },
      { title: 'prioritise recurring savings', summary: 'securing a student discount on your monthly phone plan or local rail card matters infinitely more than a one off retail coupon.' },
      { title: 'avoid false savings', summary: 'a discount only helps if the purchase already fits your budget. spending money just to save twenty percent is a trap.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'first-week',
    title: 'your first week playbook. registration and survival',
    category: 'Arriving',
    description: 'know exactly what to do after landing to clear your admin backlog and settle into your new city.',
    readTime: '7 min read',
    stage: 'Arrival',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'collect your biometric permits', summary: 'in the uk your biometric data is digital but you may need to collect your brp if issued. in ireland you must book your gnib appointment immediately.' },
      { title: 'secure your tax file number', summary: 'if you want to work part time in australia you need a tfn immediately to avoid emergency tax rates. in the uk apply for your national insurance number on day one.' },
      { title: 'move in and document everything', summary: 'check your room, take photos of any existing damage and submit your inventory list quickly to protect your deposit.' }
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'airport-to-home',
    title: 'getting from the arrival terminal to your room safely',
    category: 'Arriving',
    description: 'make your arrival seamless with a tactical first journey plan straight from the baggage claim.',
    readTime: '5 min read',
    stage: 'Arrival',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'plan before takeoff', summary: 'download offline maps of your destination city, check the airport express train options and know exactly what to do if your flight is delayed.' },
      { title: 'keep essentials accessible', summary: 'have your housing contract, university welcome letter, phone battery pack and a small amount of local currency ready before you land.' },
      { title: 'confirm key collection instructions', summary: 'many student blocks close reception at night. if your flight lands late ensure you have the out of hours emergency contact number.' }
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'healthcare',
    title: 'how to navigate local healthcare and register with a doctor',
    category: 'Arriving',
    description: 'understand how to find medical support and lock down your health insurance after arriving.',
    readTime: '4 min read',
    stage: 'Settling in',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'pay the immigration health surcharge', summary: 'in the uk you pay this upfront during the visa phase but you must still manually register with a local general practitioner to access the nhs.' },
      { title: 'find your campus clinic', summary: 'most major universities have a dedicated health centre. register there on day one so you are in the system before winter flu season hits.' },
      { title: 'dental and optical are private', summary: 'understand that public health systems cover medical emergencies and doctor visits but dental work will cost you out of pocket. get checkups before you fly.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'making-friends',
    title: 'building a high value network in a foreign country',
    category: 'Arriving',
    description: 'practical tactics to build a support network and break out of isolation during your first term.',
    readTime: '6 min read',
    stage: 'Settling in',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'start with structured moments', summary: 'orientation events, university societies and accommodation welcome parties are the highest leverage places to make first conversations.' },
      { title: 'create repeat routines', summary: 'friendships grow from repeated exposure. attending the same gym classes, library hours or cooking routines builds bonds faster than random events.' },
      { title: 'ask for support early', summary: 'if loneliness feels heavy contact your university support services or residential advisors immediately. everyone struggles in the first month.' }
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
  'Before you go': ['pre-arrival-checklist', 'student-visa', 'uk-bank-account', 'packing-list'],
  Accommodation: ['accommodation-costs', 'halls-vs-private', 'avoid-scams', 'tenancy-agreement'],
  Budgeting: ['cost-of-living', 'student-budget', 'hidden-costs', 'student-discounts'],
  Arriving: ['first-week', 'airport-to-home', 'healthcare', 'making-friends'],
}

export const featuredGuideSlugs = ['pre-arrival-checklist', 'choose-accommodation', 'real-cost-abroad'] as const
export const homePreviewGuideSlugs = ['pre-arrival-checklist', 'accommodation-costs', 'avoid-scams', 'first-week'] as const

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
    throw new Error(`unknown moving abroad article slug: ${slug}`)
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
