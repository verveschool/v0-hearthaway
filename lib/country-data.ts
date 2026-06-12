export type MovingAbroadLink = {
  title: string
  description: string
  href: string
  category: 'Visas' | 'Cost of living' | 'Arrival' | 'Accommodation'
}

export type CountryPlace = {
  name: string
  slug: 'uk' | 'ireland' | 'australia'
  currency: string
  heroImage: string
  badge: string
  universityCount: string
  citySlugs: string[]
  universitySlugs: string[]
  summary: string
  overview: string
  studentHousingNotes: string
  movingAbroadLinks: MovingAbroadLink[]
}

export const countries: CountryPlace[] = [
  {
    name: 'United Kingdom',
    slug: 'uk',
    currency: 'GBP (£)',
    heroImage: '/images/dest-uk.png',
    badge: 'Most popular',
    universityCount: '140+',
    citySlugs: ['london', 'manchester', 'edinburgh', 'birmingham', 'bristol', 'leeds'],
    universitySlugs: ['manchester', 'ucl', 'edinburgh', 'birmingham', 'bristol', 'leeds'],
    summary: 'A globally recognised study destination with historic universities, diverse student cities, and a broad range of accommodation options for every stage of your move.',
    overview: 'Studying in the UK gives international students access to compact academic terms, strong transport links, and city choices that range from London scale to smaller, campus-led communities. Housing demand can move quickly around major intakes, so it helps to compare location, commute, contract length, and bills before you arrive.',
    studentHousingNotes: 'Placeholder housing guidance: prioritise verified accommodation close to your campus or a direct transport route, and check whether bills, tenancy length, deposits, and guarantor requirements match your visa timeline.',
    movingAbroadLinks: [
      { category: 'Visas', title: 'Understanding your student visa requirements', description: 'Plan documents, timing, and arrival expectations before you travel.', href: '/moving-abroad/student-visa' },
      { category: 'Cost of living', title: 'Monthly cost of living: UK, Ireland & Australia', description: 'Compare rent, transport, groceries, and everyday student costs.', href: '/moving-abroad/cost-of-living' },
      { category: 'Arrival', title: 'Your first week: what to expect', description: 'Know what to do after landing and how to settle into your new city.', href: '/moving-abroad/first-week' },
      { category: 'Accommodation', title: 'Understanding your tenancy agreement', description: 'Review the key terms before signing for student housing.', href: '/moving-abroad/tenancy-agreement' },
    ],
  },
  {
    name: 'Ireland',
    slug: 'ireland',
    currency: 'EUR (€)',
    heroImage: '/images/dest-ireland.png',
    badge: 'Rising in popularity',
    universityCount: '30+',
    citySlugs: ['dublin', 'cork'],
    universitySlugs: ['tcd', 'ucd', 'ucc', 'galway'],
    summary: 'A welcoming English-speaking destination with respected universities, a close-knit international student community, and strong city-centre student life.',
    overview: 'Ireland is popular with students who want an English-speaking study experience, friendly campus communities, and access to technology, business, culture, and research networks. Housing is often competitive in Dublin and other student cities, so start with campus location and realistic commute options before narrowing your search.',
    studentHousingNotes: 'Placeholder housing guidance: focus on verified listings, commute reliability, utility inclusions, and whether the neighbourhood gives you convenient access to campus, groceries, and late-evening transport.',
    movingAbroadLinks: [
      { category: 'Visas', title: 'Understanding your student visa requirements', description: 'Prepare visa documents and pre-arrival steps with confidence.', href: '/moving-abroad/student-visa' },
      { category: 'Cost of living', title: 'How to budget as an international student', description: 'Build a monthly plan for rent, food, transport, and essentials.', href: '/moving-abroad/student-budget' },
      { category: 'Arrival', title: 'Getting from the airport to your accommodation', description: 'Make your arrival smoother with a practical first-journey plan.', href: '/moving-abroad/airport-to-home' },
      { category: 'Accommodation', title: 'How to avoid accommodation scams', description: 'Learn warning signs and safer ways to secure student housing.', href: '/moving-abroad/avoid-scams' },
    ],
  },
  {
    name: 'Australia',
    slug: 'australia',
    currency: 'AUD (A$)',
    heroImage: '/images/dest-australia.png',
    badge: 'Excellent quality of life',
    universityCount: '40+',
    citySlugs: ['sydney', 'melbourne', 'brisbane'],
    universitySlugs: ['melbourne', 'sydney', 'monash', 'uq'],
    summary: 'A high-quality study destination known for major research universities, outdoor lifestyles, multicultural cities, and flexible accommodation choices.',
    overview: 'Australia suits international students looking for globally recognised qualifications, warmer climates, and city lifestyles shaped by beaches, food, public transport, and large university networks. Because distances can be bigger than they look, housing decisions should weigh commute routes, weekly rent, bills, and how close you want to be to campus life.',
    studentHousingNotes: 'Placeholder housing guidance: compare weekly rent with transport time, check bond and contract terms, and confirm whether utilities, furnishing, and student support are included before committing.',
    movingAbroadLinks: [
      { category: 'Visas', title: 'Understanding your student visa requirements', description: 'Get ready for document checks and pre-departure planning.', href: '/moving-abroad/student-visa' },
      { category: 'Cost of living', title: 'Hidden costs new students don\'t expect', description: 'Spot extra expenses beyond rent and tuition before you arrive.', href: '/moving-abroad/hidden-costs' },
      { category: 'Arrival', title: 'Packing list for international students', description: 'Pack for climate, classes, housing, and your first few weeks.', href: '/moving-abroad/packing-list' },
      { category: 'Accommodation', title: 'Student halls vs private accommodation', description: 'Compare housing styles before choosing where to live.', href: '/moving-abroad/halls-vs-private' },
    ],
  },
]

export function getCountryBySlug(slug: CountryPlace['slug']): CountryPlace {
  return countries.find((country) => country.slug === slug) ?? countries[0]
}
