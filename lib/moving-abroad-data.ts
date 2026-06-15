export type MovingAbroadArticleCategory = 'Before you go' | 'Accommodation' | 'Budgeting' | 'Arriving'
export type MovingAbroadArticleStage = 'Planning' | 'Booking' | 'Budgeting' | 'Arrival' | 'Settling in'
export type MovingAbroadCountrySlug = 'uk' | 'ireland' | 'australia'
export type MovingAbroadCtaVariant = 'housing' | 'planning'

export type MovingAbroadArticleSection = {
  title: string
  summary: string
  keyPoints?: string[]
  warning?: string
  numbers?: string[]
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
  'slug' | 'title' | 'category' | 'description' | 'readTime' | 'countries'
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
    title: 'The Complete 2026 Pre Arrival Checklist For International Students',
    category: 'Before you go',
    description: 'Everything you need to sort before you travel. A tactical guide covering 2026 visa financial rules, accommodation locks and arrival prep.',
    readTime: '12 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      {
        title: 'Secure The Financial Holding Period',
        summary: 'Immigration departments require absolute proof of liquid capital before processing any student visa application.',
        keyPoints: [
          'Funds must sit in a standard checking or savings account',
          'The exact balance must remain untouched for 28 consecutive days prior to application',
          'Using business accounts, property valuations, or crypto will result in an instant refusal'
        ],
        warning: 'Withdrawing even a single pound below the required threshold on day 27 means you must restart the entire 28 day holding period from zero.',
      },
      {
        title: 'Lock Housing Before The Cap Hits',
        summary: 'With incoming legislative caps and structural supply shortages, booking verified housing early protects your admission status.',
        keyPoints: [
          'Target purpose built student accommodation for fixed utility rates',
          'Confirm transit lines before postcode prestige',
          'Only use verified escrow platforms or direct institutional bookings'
        ],
        numbers: [
          '295,000 limit on new international student commencements in Australia',
          '€10,000 minimum living cost proof required by Irish immigration'
        ]
      },
      {
        title: 'Plan For Digital Visa Access',
        summary: 'Physical residency permits are being rapidly phased out in favor of fully digital immigration profiles.',
        keyPoints: [
          'UK visas are moving entirely to the digital e-Visa system in 2026',
          'You will need your UKVI share code active upon arrival',
          'Retain digital copies of your Confirmation of Acceptance for Studies'
        ]
      }
    ],
    ctaVariant: 'housing',
    image: '/images/acc-common.png',
    featured: true,
  },
  {
    slug: 'choose-accommodation',
    title: 'How To Choose The Right Accommodation And Avoid The Commute Trap',
    category: 'Accommodation',
    description: 'Walking through the real decisions you face. Purpose built versus private rentals, transport line tradeoffs and how to read the contract.',
    readTime: '10 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      {
        title: 'Anchor To Rail And Tram Lines',
        summary: 'Do not just look at distance on a map. Commutes destroy student budgets and academic productivity.',
        keyPoints: [
          'Calculate the exact walking time to the nearest transit station',
          'Factor in the monthly cost of student rail passes',
          'Living slightly further away is only viable if you are directly on a high speed line'
        ]
      },
      {
        title: 'Purpose Built Versus Private Rentals',
        summary: 'Choosing between managed student blocks and private house shares dictates your entire financial risk profile for the year.',
        keyPoints: [
          'Purpose built blocks offer fixed bills, protecting you from energy price spikes',
          'Private rentals appear cheaper on base rent but leave you exposed to variable utility costs',
          'Managed blocks provide built-in security and parcel management'
        ],
        warning: 'If you rent privately, you are personally liable for setting up and paying all internet, heating, and water accounts upon arrival.'
      },
      {
        title: 'Ask About Deposit Protection',
        summary: 'Your capital must be legally protected when entering any tenancy agreement.',
        keyPoints: [
          'In the UK, deposits must legally sit in a government-backed protection scheme',
          'In Ireland, cross-check the landlord against the Residential Tenancies Board registry',
          'Australian bonds must be lodged with the relevant state residential tenancies authority'
        ],
        warning: 'If a private landlord requests a cash deposit handed over directly without a formal lodging receipt, walk away immediately.'
      }
    ],
    ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'real-cost-abroad',
    title: 'The Real Cost Of Studying Abroad Exact 2026 Capital Requirements',
    category: 'Budgeting',
    description: 'Rent and tuition are just the baseline. Here are the exact government financial proofs required for the UK, Ireland and Australia.',
    readTime: '14 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      {
        title: 'The UK Maintenance Rule',
        summary: 'The UK Home Office enforces strict, non-negotiable living cost thresholds that scale based on your campus location.',
        keyPoints: [
          'London requirements are significantly higher than regional areas',
          'These funds are in addition to your first year of tuition fees',
          'The money must be demonstrably yours or held by a parent or legal guardian'
        ],
        numbers: [
          '£1,529 per month required for London living costs',
          '£1,171 per month required outside London'
        ]
      },
      {
        title: 'The Australian Baseline',
        summary: 'Australia recently adjusted its financial capacity requirements and visa application fees to reflect current economic realities.',
        keyPoints: [
          'Proof of funds must cover travel, tuition, and living costs',
          'The visa application fee is substantial and non-refundable',
          'Financial capacity rules are strictly enforced prior to visa grant'
        ],
        numbers: [
          'AUD 29,710 base living cost proof required',
          'AUD 2,000 non-refundable visa application fee'
        ]
      },
      {
        title: 'The Irish INIS Minimum',
        summary: 'Irish immigration demands clear, upfront proof of liquid capital and tuition payments before considering any application.',
        keyPoints: [
          'You must hold immediate access to the required living cost threshold',
          'A minimum tuition payment receipt is mandatory for the first year',
          'Educational bonds are an accepted method for demonstrating financial capacity'
        ],
        numbers: [
          '€10,000 absolute minimum living cost proof',
          '€6,000 minimum first-year tuition receipt required'
        ]
      }
    ],
    ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'student-visa',
    title: 'Understanding Your 2026 Student Visa Financial Mechanics',
    category: 'Before you go',
    description: 'Plan your document trail, financial seasoning periods and biometric appointments perfectly so you do not miss your intake date.',
    readTime: '8 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      {
        title: 'Season Your Funds Early',
        summary: 'Immigration departments actively screen for sudden capital injections to prevent application fraud.',
        keyPoints: [
          'Governments want to see a stable history of clean money',
          'Sudden, unexplained large deposits will trigger immediate fraud checks',
          'Transfer and stabilize your required funds at least three months before filing'
        ]
      },
      {
        title: 'Use The Right Bank Accounts',
        summary: 'Not all financial assets are accepted by immigration officials when proving your maintenance funds.',
        keyPoints: [
          'Only standard liquid savings and current checking accounts are valid',
          'The account must allow immediate withdrawal of funds',
          'Credit cards, property valuations, and mutual funds will cause an instant refusal'
        ],
        warning: 'Do not attempt to use business accounts to prove personal maintenance funds, even if your parents own the business.'
      },
      {
        title: 'Align Housing And Arrival Dates',
        summary: 'Your visa processing timeline dictates your physical movement. Do not lock irreversible capital before approval.',
        keyPoints: [
          'Do not book non-refundable flights until your visa is officially granted',
          'Ensure your tenancy agreement allows for start date adjustments',
          'Monitor processing times closely as they spike dramatically before the autumn intake'
        ]
      }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'uk-bank-account',
    title: 'How To Open A UK Bank Account And Bridge The Gap',
    category: 'Before you go',
    description: 'Traditional banks will reject you without the right paperwork. Here is the exact playbook to get your local sort code and account number fast.',
    readTime: '5 min read',
    stage: 'Planning',
    countries: ['uk'],
    sections: [
      { title: 'The Enrollment Letter Bottleneck', summary: 'High street banks require a physical bank letter from your university. You cannot get this until you physically arrive and register on campus.' },
      { title: 'Bridge The Gap With A Neo Bank', summary: 'Operations like Monzo or Revolut allow you to open an account faster but require you to have a UK sim card and physically be in the country.' },
      { title: 'Plan Your First Rent Payment', summary: 'Your first month of rent and deposit usually needs to be paid before your UK account is open. Use an international transfer service to clear this hurdle.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'packing-list',
    title: 'The Tactical Packing List For International Students',
    category: 'Before you go',
    description: 'Pack for climate, classes, housing and your first few weeks of survival before your local bank accounts clear.',
    readTime: '4 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Carry On Essentials', summary: 'Keep your passport, visa grant notices, university offer letters and two weeks of any prescription medication strictly in your cabin bag.' },
      { title: 'Pack For Your Accommodation', summary: 'Check what is already provided before bringing bedding, kitchen items or bulky homeware. Most student beds are irregular sizes anyway.' },
      { title: 'Buy Heavy Items Locally', summary: 'Save luggage weight by planning to buy thick winter coats, toiletries and cleaning supplies after you land.' }
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'accommodation-costs',
    title: 'How Much Purpose Built Student Housing Actually Costs',
    category: 'Accommodation',
    description: 'Real costs broken down by asset type so you can plan your capital deployment with absolute confidence.',
    readTime: '8 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Compare The Total Run Rate', summary: 'Look beyond headline rent to internet speeds, utility caps, gym inclusions and commute costs. A slightly more expensive room near campus is often cheaper overall.' },
      { title: 'City Demand Changes Budgets', summary: 'Popular cities like Dublin or Sydney move extremely fast. If you wait for clearance you will be forced into premium luxury studios because the mid tier sells out first.' },
      { title: 'Match Cost To Lifestyle', summary: 'Choose the room that supports your academic routine. If you spend twelve hours a day in the library you do not need to pay a premium for a large studio kitchen.' }
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'halls-vs-private',
    title: 'Purpose Built Student Blocks Versus Private Rentals',
    category: 'Accommodation',
    description: 'Compare the two major housing formats before locking up your cash for an entire academic year.',
    readTime: '6 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Purpose Built Blocks', summary: 'These offer absolute convenience, fixed bills and built in social networks. You pay a slight premium for security and zero utility headaches.' },
      { title: 'Private Accommodation', summary: 'Renting a house with friends offers independence and often cheaper base rent but leaves you completely exposed to internet setups and heating bill spikes.' },
      { title: 'Choose By Support Needs', summary: 'If it is your first year abroad the built in support of a managed block is invaluable. Save the private house share for your second year.' }
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'avoid-scams',
    title: 'How To Identify And Avoid Rental Fraud Syndicates',
    category: 'Accommodation',
    description: 'The rental market is full of sophisticated operators preying on international students. Learn the warning signs.',
    readTime: '5 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Watch For Pressure Tactics', summary: 'Be extremely cautious if a landlord pushes for an urgent Western Union transfer or avoids providing a written contract before taking your money.' },
      { title: 'Never Wire Cash Before Viewing', summary: 'Scammers use stolen photos of premium apartments. If you cannot view it physically use a verified booking platform that holds funds in escrow.' },
      { title: 'Cross Check The Registry', summary: 'In Ireland verify the landlord on the RTB. In the UK ensure they are using a certified deposit protection scheme. Verify everything.' }
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'tenancy-agreement',
    title: 'How To Read Your Tenancy Agreement Without Getting Trapped',
    category: 'Accommodation',
    description: 'Review the hard legal terms before signing a binding contract for student housing abroad.',
    readTime: '9 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Read The Dates First', summary: 'Confirm the exact start date, end date and move in rules. Ensure the contract perfectly overlaps your academic term so you are not homeless during exams.' },
      { title: 'Understand Deposits And Guarantors', summary: 'If you do not have a local guarantor many private landlords demand six to twelve months of rent paid upfront in cash.' },
      { title: 'Know Your Exit Clauses', summary: 'Look for break clauses. If you need to return home for an emergency you need to know exactly how much it will cost to terminate the lease.' }
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'cost-of-living',
    title: 'The Exact Weekly Cost Of Living In Major Student Hubs',
    category: 'Budgeting',
    description: 'Compare the hard costs of transport, groceries and everyday survival across the UK, Ireland and Australia.',
    readTime: '7 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      {
        title: 'The Transport Tax',
        summary: 'Living far from campus looks cheap until you calculate the reality of daily travel expenses.',
        keyPoints: [
          'Calculate the exact monthly cost of student rail or bus passes',
          'Factor in the lost hours of academic productivity during long commutes',
          'Check if your university offers subsidised transport links'
        ],
        numbers: [
          'Can exceed £150 per month in major UK transport networks'
        ]
      },
      {
        title: 'Supermarket Tiering',
        summary: 'Where you execute your weekly food shop dictates your structural budget.',
        keyPoints: [
          'Discount supermarkets like Aldi or Lidl offer massive term-long savings',
          'Premium central city supermarkets carry heavy convenience markups',
          'Batch cooking and bulk buying staples reduces weekly spend significantly'
        ]
      },
      {
        title: 'Utility Bill Spikes',
        summary: 'Energy costs represent the highest variable risk in student budgeting.',
        keyPoints: [
          'If you rent privately, prepare for brutal winter heating bills',
          'Purpose built student housing fixes this cost upfront',
          'Check the exact energy efficiency rating if signing a private lease'
        ],
        warning: 'Never sign a private lease without a clear agreement on how the utility bills will be divided among housemates.'
      }
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'student-budget',
    title: 'How To Structure Your Cash Flow As An International Student',
    category: 'Budgeting',
    description: 'Build an ironclad monthly plan for rent, food, transport and emergencies.',
    readTime: '6 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Separate Fixed And Flexible Costs', summary: 'Rent, bills, insurance and transport passes come first. Eating out and retail shopping must flex strictly around your fixed baseline.' },
      { title: 'Plan Around Payment Dates', summary: 'Understand exactly when rent is deducted and when family transfers arrive so you avoid overdraft penalties or cash flow bottlenecks.' },
      { title: 'Keep A Liquid Emergency Fund', summary: 'Keep a modest buffer of at least 500 dollars or pounds completely untouched to handle delayed flights or unexpected medical costs.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'hidden-costs',
    title: 'Hidden Capital Drains New Students Never Expect',
    category: 'Budgeting',
    description: 'Spot the extra expenses beyond rent and tuition before you land and burn through your savings.',
    readTime: '5 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Move In Purchases', summary: 'Bedding, kitchen pots, adapters, cleaning products and laundry tokens can easily drain your first week budget instantly.' },
      { title: 'Admin And Setup Costs', summary: 'Budget heavily for transit cards, local sim plans, university society fees and mandatory study materials in your first month.' },
      { title: 'Social Settling In Spend', summary: 'The first month involves heavy social spending to build your network. Set a strict limit so you do not burn your term budget in October.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'student-discounts',
    title: 'How To Leverage Student Status For Structural Savings',
    category: 'Budgeting',
    description: 'Find the high leverage savings on transport, software and everyday essentials that actually move the needle.',
    readTime: '4 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Use Your Institutional Status', summary: 'Register for UNiDAYS or Student Beans immediately. Your university email address is a golden ticket for major tech and retail discounts.' },
      { title: 'Prioritise Recurring Savings', summary: 'Securing a student discount on your monthly phone plan or local rail card matters infinitely more than a one off retail coupon.' },
      { title: 'Avoid False Savings', summary: 'A discount only helps if the purchase already fits your budget. Spending money just to save twenty percent is a trap.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'first-week',
    title: 'Your First Week Playbook Registration And Survival',
    category: 'Arriving',
    description: 'Know exactly what to do after landing to clear your admin backlog and settle into your new city.',
    readTime: '7 min read',
    stage: 'Arrival',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      {
        title: 'Collect Your Biometric Permits',
        summary: 'Securing your legal residency status is the absolute priority upon arrival.',
        keyPoints: [
          'UK biometric data is digital, but collect your BRP if one was explicitly issued',
          'In Ireland, book your GNIB/IRP appointment immediately upon arrival',
          'Keep your passport secure at all times during these processes'
        ]
      },
      {
        title: 'Secure Your Tax File Number',
        summary: 'If you intend to work part-time, you must set up your local tax profile to avoid punitive emergency tax rates.',
        keyPoints: [
          'Apply for a TFN in Australia immediately',
          'Apply for a National Insurance number in the UK on day one',
          'Understand your exact legal working hour limits under your visa conditions'
        ],
        warning: 'Breaching your visa work hour limits can result in immediate deportation and cancellation of your studies.'
      },
      {
        title: 'Move In And Document Everything',
        summary: 'Protect your deposit from day one by executing a rigorous inventory check.',
        keyPoints: [
          'Check your room thoroughly against the provided inventory list',
          'Take clear, date-stamped photos of any existing damage',
          'Submit the signed inventory list back to management quickly'
        ]
      }
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'airport-to-home',
    title: 'Getting From The Arrival Terminal To Your Room Safely',
    category: 'Arriving',
    description: 'Make your arrival seamless with a tactical first journey plan straight from the baggage claim.',
    readTime: '5 min read',
    stage: 'Arrival',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Plan Before Takeoff', summary: 'Download offline maps of your destination city, check the airport express train options and know exactly what to do if your flight is delayed.' },
      { title: 'Keep Essentials Accessible', summary: 'Have your housing contract, university welcome letter, phone battery pack and a small amount of local currency ready before you land.' },
      { title: 'Confirm Key Collection Instructions', summary: 'Many student blocks close reception at night. If your flight lands late ensure you have the out of hours emergency contact number.' }
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'healthcare',
    title: 'How To Navigate Local Healthcare And Register With A Doctor',
    category: 'Arriving',
    description: 'Understand how to find medical support and lock down your health insurance after arriving.',
    readTime: '4 min read',
    stage: 'Settling in',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Pay The Immigration Health Surcharge', summary: 'In the UK you pay this upfront during the visa phase but you must still manually register with a local general practitioner to access the NHS.' },
      { title: 'Find Your Campus Clinic', summary: 'Most major universities have a dedicated health centre. Register there on day one so you are in the system before winter flu season hits.' },
      { title: 'Dental And Optical Are Private', summary: 'Understand that public health systems cover medical emergencies and doctor visits but dental work will cost you out of pocket. Get checkups before you fly.' }
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'making-friends',
    title: 'Building A High Value Network In A Foreign Country',
    category: 'Arriving',
    description: 'Practical tactics to build a support network and break out of isolation during your first term.',
    readTime: '6 min read',
    stage: 'Settling in',
    countries: ['uk', 'ireland', 'australia'],
    sections: [
      { title: 'Start With Structured Moments', summary: 'Orientation events, university societies and accommodation welcome parties are the highest leverage places to make first conversations.' },
      { title: 'Create Repeat Routines', summary: 'Friendships grow from repeated exposure. Attending the same gym classes, library hours or cooking routines builds bonds faster than random events.' },
      { title: 'Ask For Support Early', summary: 'If loneliness feels heavy contact your university support services or residential advisors immediately. Everyone struggles in the first month.' }
    ],
    ctaVariant: 'planning',
  }
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
