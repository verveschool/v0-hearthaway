export type MovingAbroadArticleCategory = 'Before you go' | 'Accommodation' | 'Budgeting' | 'Arriving'
export type MovingAbroadArticleStage = 'Planning' | 'Booking' | 'Budgeting' | 'Arrival' | 'Settling in'
export type MovingAbroadCountrySlug = 'uk' | 'ireland' | 'france' | 'uae' | 'germany' | 'australia' | 'usa' | 'canada' | 'spain' | 'austria' | 'belgium' | 'hungary' | 'singapore' | 'malta' | 'italy' | 'netherlands' | 'malaysia'
export type MovingAbroadCtaVariant = 'housing' | 'planning'

export type MovingAbroadArticleSection = {
  title: string
  summary: string
  keyPoints?: string[]
  warning?: string
  numbers?: string[]
  source?: { label: string; href: string }
}

export type MovingAbroadArticle = {
  slug: string
  title: string
  category: MovingAbroadArticleCategory
  tags: string[]
  description: string
  readTime: string
  stage: MovingAbroadArticleStage
  countries: MovingAbroadCountrySlug[]
  sections: MovingAbroadArticleSection[]
  ctaVariant: MovingAbroadCtaVariant
  image?: string
  featured?: boolean
  preview?: boolean
  reviewedOn?: string
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

export const movingAbroadArticles: MovingAbroadArticle[] = [
  {
    slug: 'pre-arrival-checklist',
    tags: ['Pre-Arrival', 'Student Visa', 'Documentation', 'Accommodation'],
    title: "Pre-arrival checklist for international students",
    category: 'Before you go',
    description: "A practical guide to documents, money, accommodation and the first week before studying abroad.",
    readTime: '2 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Start with your official documents",
        summary: "Check your passport validity, university instructions and the immigration authority’s current process for your nationality and course. Keep accessible copies of your offer, travel documents and accommodation confirmation, and store sensitive files securely. Make a list of deadlines with enough time to correct a missing document.",
        keyPoints: ["Confirm that your travel document matches the information in your visa or digital status. Check entry requirements again before departure.", "Keep your university and accommodation contacts available offline.", "Ask the university what original documents it needs to see at enrolment."],
        source: { label: "UK eVisa guidance", href: "https://www.gov.uk/evisa" },
      },
      {
        title: "Plan money and payment timing",
        summary: "Make a calendar of tuition, rent, deposit and day-to-day expenses, including the period before a local account becomes available. Immigration financial evidence rules are separate from your real living budget and vary by country and individual circumstances.",
        keyPoints: ["Review the official evidence requirements for your own application, including acceptable funding sources and any required holding period.", "Allow for exchange rates and transfer times when paying overseas.", "Keep a reserve you can access if your flight or initial accommodation plans change."],
        source: { label: "UK student visa financial evidence", href: "https://www.gov.uk/guidance/financial-evidence-for-student-and-child-student-route-applicants" },
      },
      {
        title: "Confirm where and how you will arrive",
        summary: "Before paying for housing, identify the provider and check the contract, refund conditions and payment recipient. Ask when you can collect keys, what to do if reception is closed and whether bedding or basic kitchen equipment is supplied.",
        keyPoints: ["Save the full address, booking reference and an out-of-hours contact.", "Plan a route from the airport that takes account of luggage and your arrival time.", "Ask how delayed visas or flights affect your booking before committing to non-refundable costs."],
      },
      {
        title: "Prepare your first week",
        summary: "Build a short first-week list rather than trying to solve everything on arrival. Include university registration, local communications, transport, healthcare information and a check of the room inventory.",
        keyPoints: ["Photograph any existing damage and report it through the provider’s stated process.", "Ask your university which registration and orientation steps apply to you.", "Keep receipts and copies of important correspondence until outstanding questions are resolved."],
      },
    ],
    ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'choose-accommodation',
    tags: ['Accommodation', 'Renting', 'Commute', 'Tenancy Agreements'],
    title: 'How To Choose The Right Accommodation And Avoid The Commute Trap',
    category: 'Accommodation',
    description: 'Walking through the real decisions you face. Purpose built versus private rentals, transport line tradeoffs and how to read the contract.',
    readTime: '2 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Define what a good week looks like",
        summary: "Begin with the campus you will attend most often, your budget, move-in date and how you prefer to live. A room can be attractive in photographs but inconvenient if you regularly travel between campuses or need quiet hours for study.",
        keyPoints: ["List non-negotiables such as accessibility, a private bathroom or a maximum commute.", "Identify flexible preferences such as a gym or a particular neighbourhood.", "Ask what support is available outside normal office hours."],
      },
      {
        title: "Compare total costs and contract dates",
        summary: "Use the full agreement period when comparing rooms. Add rent instalments, deposit, required fees, utilities not included, travel, laundry and any expected move-in purchases. Check the currency and the dates on which payments are due.",
        keyPoints: ["Weekly rent × the number of contracted weeks gives a useful rent estimate; add other charges separately.", "Ask whether utility bills have a usage cap, whether the deposit is refundable and what deductions may apply.", "Compare the cost of the complete stay, not only a promotional starting rate."],
      },
      {
        title: "Compare the journey, not just distance",
        summary: "Check the actual route to your campus at the time you will travel. A nearby property may involve several changes or infrequent late services, while a longer journey on a direct route may be more convenient.",
        keyPoints: ["Look up walking distance to the stop, service frequency, accessibility and the last journey home.", "Include the regular transport cost in your budget.", "Ask what alternative route is available when services are disrupted."],
      },
      {
        title: "Read the terms before paying",
        summary: "Ask who provides the accommodation, the type of agreement, cancellation rules, payment schedule and the process for reporting repairs. Rights vary by country, region and contract type. In England, for example, deposit protection requirements apply to relevant tenancy types; other arrangements can differ.",
        keyPoints: ["Ask for the complete agreement before paying and keep a copy of signed documents.", "Check how the deposit is handled and when it is returned.", "Ask what happens if your visa, university place or arrival is delayed."],
        source: { label: "GOV.UK tenancy deposit protection", href: "https://www.gov.uk/tenancy-deposit-protection" },
      },
    ],
    ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'real-cost-abroad',
    tags: ['Budgeting', 'Financial Requirements', 'Cost of Living', 'Student Finance'],
    title: "Understanding the real cost of studying abroad",
    category: 'Budgeting',
    description: "Build a realistic budget for tuition, housing and living costs, and check visa evidence rules separately.",
    readTime: '2 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Build a complete study budget",
        summary: "Your real budget is the total of tuition, housing, food, transport, communications, healthcare, supplies and an accessible contingency fund. It can be higher than the financial amount specified for a visa. Start with your own course dates, location and quoted accommodation terms.",
        keyPoints: ["List one-off costs such as flights, deposits, insurance and initial household purchases separately from recurring expenses.", "Confirm who pays each bill and when money needs to be available.", "Keep a small reserve based on your own circumstances and access to support."],
      },
      {
        title: "Separate visa evidence from living costs",
        summary: "Immigration authorities set evidence rules for particular applications. The amount, type of accepted funds and documentation depend on the destination and the applicant. Check the primary guidance for your route before arranging funds.",
        keyPoints: ["UK student applicants may be able to use qualifying loans or official sponsorship as well as personal funds; the evidence required differs.", "Where the UK bank-funds rule applies, the required amount generally needs to be held for 28 consecutive days and the evidence must meet the current date rules.", "Check whether an exemption or different evidence requirement applies to you."],
        source: { label: "UK student visa financial evidence", href: "https://www.gov.uk/guidance/financial-evidence-for-student-and-child-student-route-applicants" },
      },
      {
        title: "Check Australia and Ireland separately",
        summary: "Do not transfer a UK rule to another country. Australia’s student visa guidance sets out financial-capacity evidence and the relevant document checklist. Ireland explains that when evidence is checked depends partly on whether you require a visa.",
        keyPoints: ["For Australia, inspect the current subclass 500 guidance and your document checklist; the authority can request evidence during processing.", "For Ireland, review the student immigration guidance relevant to your visa and course.", "Rates and requirements can change. Check the official page again before applying."],
        source: { label: "Australian student visa guidance", href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
      },
      {
        title: "Turn estimates into a payment calendar",
        summary: "Use the prices and dates in your own course and housing documents. If an amount is indicative, mark it as such and ask for confirmation before you make a payment. Add a line for currency conversion and international transfer charges.",
        keyPoints: ["Separate money needed before travel from expenses you will pay monthly after arrival.", "Record who will send money, the transfer route and how long it is expected to take.", "If a payment depends on a visa decision, ask the provider for its refund and deferral terms in writing."],
      },
    ],
    ctaVariant: 'housing',
    featured: true,
  },
  {
    slug: 'student-visa',
    tags: ['Student Visa', 'Immigration', 'Financial Requirements', 'Documentation'],
    title: 'How to check student visa financial requirements',
    category: 'Before you go',
    description: 'Find the official financial evidence requirements for your destination and plan your housing around your application timeline.',
    readTime: '2 min read',
    reviewedOn: '2026-11-26',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia', 'france', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    sections: [
      {
        title: 'United Kingdom',
        summary: 'For the UK Student visa, applicants who rely on personal bank funds and need to meet the financial requirement generally need to hold the required amount for 28 consecutive days. The evidence must be dated within 31 days of applying.',
        keyPoints: ['Qualifying student loans and official financial sponsorship are also accepted and have separate evidence requirements.'],
        source: { label: 'UK Visas and Immigration financial evidence guidance', href: 'https://www.gov.uk/guidance/financial-evidence-for-student-and-child-student-route-applicants' },
      },
      {
        title: 'Ireland',
        summary: 'Check Immigration Service Delivery’s requirements for your course and visa status. Where you show financial evidence depends in part on whether you need a visa to travel to Ireland.',
        source: { label: 'Immigration Service Delivery guidance for students', href: 'https://www.irishimmigration.ie/coming-to-study-in-ireland/frequently-asked-questions-for-students/' },
      },
      {
        title: 'Australia',
        summary: 'For a subclass 500 visa, use the official document checklist. Where financial evidence is required, examples include qualifying deposits, loans and scholarships. Home Affairs may ask for evidence during processing.',
        source: { label: 'Australian Department of Home Affairs Student visa guidance', href: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500' },
      },
      {
        title: 'France',
        summary: 'Use France-Visas to check the documents for your nationality, place of application and course.',
        source: { label: 'France-Visas student guidance', href: 'https://www.france-visas.gouv.fr/en/etudiant' },
      },
      {
        title: 'Other destinations and planning your arrival',
        summary: 'Check the immigration authority or consulate for your destination before moving money or applying. Ask about accepted evidence, timing and any exceptions that apply to you.',
        keyPoints: ['Before paying a housing deposit, ask the provider what happens if your visa is delayed or refused. Get the terms in writing.'],
      },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'uk-bank-account',
    tags: ['Banking', 'Student Finance', 'Arrival', 'Documentation'],
    title: "Opening a UK bank account as an international student",
    category: 'Before you go',
    description: "Compare account requirements and plan access to money during your first weeks.",
    readTime: '2 min read',
    stage: 'Planning',
    countries: ['uk'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Choose an account for your circumstances",
        summary: "Banks and electronic money providers have different eligibility criteria, identification checks, fees and protections. Compare the provider’s current requirements before applying; some applications may begin before arrival, while others need additional documents or verification.",
        keyPoints: ["Check whether you can receive transfers, make local payments and access support when you need it.", "Compare exchange rates, account fees, transfer charges and any cash withdrawal costs.", "Confirm whether the product is a bank account or another type of financial service."],
      },
      {
        title: "Prepare identification and address evidence",
        summary: "Ask the provider for its accepted documents rather than assuming every bank requires the same letter or a physical visit. Your university may be able to provide an enrolment or bank letter once you meet its conditions.",
        keyPoints: ["Have your passport or other accepted identification ready.", "Ask what can be used to prove your UK address and whether digital documents are accepted.", "Check if your provider requires an appointment, an app or additional identity checks."],
      },
      {
        title: "Plan the gap between arrival and account access",
        summary: "Your first rent instalment, transport and essentials may be due before a local account is ready. Make a short-term payment plan and check any international card or transfer fees in advance.",
        keyPoints: ["Confirm the housing provider’s accepted payment methods and verify account details independently.", "Keep access to funds through more than one practical route where possible.", "Never share a password or verification code with someone who claims to be helping you open an account."],
      },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'packing-list',
    tags: ['Pre-Arrival', 'Packing', 'Travel', 'Student Life'],
    title: "Packing for your move abroad",
    category: 'Before you go',
    description: "Prepare documents, clothing and practical essentials for your journey and accommodation.",
    readTime: '2 min read',
    stage: 'Planning',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Check the accommodation inventory",
        summary: "Ask your provider what is supplied in your room, bathroom and shared kitchen. A furnished room may include a bed and desk but not bedding, towels or cooking equipment. Confirm the bed size before buying sheets.",
        keyPoints: ["Request a list of supplied items and check whether a bedding pack is available.", "Ask about restrictions on electrical appliances and shared kitchen storage.", "Plan to buy bulky items after arrival if carrying them would use too much luggage space."],
      },
      {
        title: "Keep essentials accessible",
        summary: "Carry your travel documents, admission information, accommodation address, key-collection instructions and medication in a place you can reach during the journey. Check airline and destination rules for liquids, medication and batteries.",
        keyPoints: ["Keep digital and offline copies of important contact details.", "Carry enough essential medication for the journey and ask your clinician about continuity of care.", "Pack a change of clothes and a charger in your cabin bag."],
      },
      {
        title: "Pack for the first few days",
        summary: "Choose clothing for the season and local weather rather than an assumed national climate. A small set of toiletries, a travel adapter compatible with your devices and basic personal items can make your first night easier.",
        keyPoints: ["Label luggage and check your airline’s current weight and size limits.", "Leave room in your budget for local purchases.", "Keep valuables and documents secure and avoid carrying unnecessary sensitive paperwork."],
      },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'accommodation-costs',
    tags: ['Accommodation', 'Renting', 'Cost of Living', 'Student Finance'],
    title: "Understanding the cost of student accommodation",
    category: 'Accommodation',
    description: "Calculate the full contract cost and check which services are included.",
    readTime: '2 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "List every housing cost",
        summary: "A purpose-built residence can quote a weekly or monthly rent with a particular contract length. The full cost depends on the room, term and services included. Ask for a written quotation that applies to your dates.",
        keyPoints: ["Multiply the quoted rent by the number of charged periods, then add deposits and any compulsory fees.", "Check whether the displayed price is a starting estimate or an offer available for your chosen term.", "Record the currency, payment dates and any exchange or bank charges."],
      },
      {
        title: "Check what is included",
        summary: "Utilities, internet, cleaning and access to facilities may be included, partly included or charged separately. Ask the provider which services apply to your room and whether a usage cap or fair-use policy exists.",
        keyPoints: ["Ask about laundry, contents insurance, parking and optional services.", "Check whether cleaning covers your private room or only shared spaces.", "Compare transport and food costs as well as rent."],
      },
      {
        title: "Compare offers over the same period",
        summary: "A cheaper weekly rate on a longer agreement may cost more in total than another room that matches your dates. Calculate the full contracted period for each option, including any time outside your academic term.",
        keyPoints: ["Ask whether a shorter contract is offered and how it changes the price.", "Check deposit return, cancellation and visa-refusal terms before paying.", "Keep the written offer and confirm current availability with the provider or advisor."],
      },
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'halls-vs-private',
    tags: ['Accommodation', 'Renting', 'Housing Options', 'Student Life'],
    title: "Student residences and private rentals",
    category: 'Accommodation',
    description: "Compare housing types, costs, responsibilities and contract terms.",
    readTime: '2 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Understand your choices",
        summary: "University halls, managed student residences and private rentals can differ in location, support, flexibility and contract terms. Neither category guarantees a particular price or set of services. Check the individual offer.",
        keyPoints: ["Ask who manages the property and which contact handles urgent issues.", "Check whether you would have a private room, shared facilities or a self-contained studio.", "Confirm your occupancy dates and whether the contract is individual or joint."],
      },
      {
        title: "Compare costs and responsibilities",
        summary: "A managed residence may combine rent and some bills, while a private rental may allocate charges differently. Check each agreement rather than assuming one housing type always includes utilities or costs less.",
        keyPoints: ["Include the deposit, fees, transport, laundry and charges excluded from rent.", "Ask who sets up electricity, heating, water and internet where relevant.", "Compare the cost for the full contracted period."],
      },
      {
        title: "Choose for your daily routine",
        summary: "Consider commute, privacy, accessibility, noise and the support you need. Ask current residents or the provider how shared spaces and maintenance requests work, while recognising that individual experiences differ.",
        keyPoints: ["List your non-negotiables before comparing photographs.", "Check visitor policies, common areas and options for quiet study.", "Read cancellation and early departure terms before paying."],
      },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'avoid-scams',
    tags: ['Accommodation', 'Renting', 'Housing Safety', 'Scams'],
    title: "How to recognise and respond to rental scams",
    category: 'Accommodation',
    description: "Verify a housing offer and payment instructions, and know where to seek help if something goes wrong.",
    readTime: '2 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Slow down and verify the property",
        summary: "A genuine-looking listing, photo or message is not proof that the person offering the room is authorised to let it. Contact the accommodation provider through details you found independently and ask them to confirm the property, offer and payment instructions.",
        keyPoints: ["Be cautious when a person refuses ordinary questions or pressures you to pay immediately.", "Check the full address, provider name and written agreement before transferring money.", "If you cannot attend in person, ask for a live viewing and independent confirmation of the offer."],
      },
      {
        title: "Check the agreement and payment recipient",
        summary: "Ask for the contract, the total amount due, deposit terms and refund conditions. Verify the recipient using contact information you have independently checked, especially if account details change unexpectedly.",
        keyPoints: ["Be cautious of requests to pay an individual or use a payment route that offers little recourse.", "Keep screenshots, invoices and payment confirmations.", "Do not assume that a platform holds funds in escrow unless its published terms specifically say so."],
      },
      {
        title: "If you think you have been targeted",
        summary: "Stop communicating with the suspected scammer and contact your bank or payment provider promptly using its official number. Ask about available recovery steps and preserve the evidence. Report the incident through the official fraud reporting route for the country concerned.",
        keyPoints: ["Keep the advert, messages, recipient details, receipts and dates.", "Tell your university accommodation or international support team if you need help finding a safe alternative.", "Check official local guidance for reporting fraud; procedures vary by location."],
        source: { label: "UK government fraud reporting guidance", href: "https://www.gov.uk/report-suspicious-emails-websites-phishing" },
      },
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'tenancy-agreement',
    tags: ['Accommodation', 'Renting', 'Tenancy Agreements', 'Deposits'],
    title: "How to read a student tenancy agreement",
    category: 'Accommodation',
    description: "Review payments, deposit terms, responsibilities and cancellation provisions before signing.",
    readTime: '2 min read',
    stage: 'Booking',
    countries: ['uk', 'ireland', 'australia', 'france'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Identify the parties and the accommodation",
        summary: "The agreement should identify the housing provider, the resident, the address and the accommodation covered. Establish whether you are signing an individual room agreement or a joint agreement with others; liability and rights can differ.",
        keyPoints: ["Check that the named room or room type matches the offer and that occupancy rules suit your circumstances.", "Ask who manages repairs and whom you contact in an emergency.", "Where the agreement is unclear, request an explanation in writing before signing."],
      },
      {
        title: "Understand payments and the full term",
        summary: "Record the start and end dates, rent instalments, deposit, any guarantor requirement and what is included. A low weekly headline price may exclude charges or require a longer term.",
        keyPoints: ["Add rent over the full contract to any required charges and compare it with your available funds.", "Check payment methods and verify the recipient independently before transferring money.", "Ask about late-payment terms, permitted deductions and whether bills have limits."],
      },
      {
        title: "Ask about deposits and protection",
        summary: "Deposit rules are local and depend on the type of arrangement. In England, government-approved protection applies to deposits for the relevant assured periodic tenancy arrangements, with details and timing in official guidance. University accommodation or a different arrangement may be governed differently.",
        keyPoints: ["Ask how the deposit is held, what evidence you will receive and the conditions for its return.", "Check the applicable rules for your country and region rather than assuming one scheme covers every property.", "Keep an inventory and report existing damage when you move in."],
        source: { label: "GOV.UK tenancy deposit protection", href: "https://www.gov.uk/tenancy-deposit-protection" },
      },
      {
        title: "Read cancellation, repairs and house rules",
        summary: "Check what happens if your visa or university offer is delayed or refused, or if you need to leave early. Ask whether any release, replacement tenant or refund conditions apply, and get the answer in writing.",
        keyPoints: ["Review clauses on visitors, shared spaces, cleaning and access for repairs.", "Ask how to report a fault and what happens if it is not resolved.", "If you do not understand a clause, seek help from your university housing service or a qualified local adviser."],
      },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'cost-of-living',
    tags: ['Budgeting', 'Cost of Living', 'Transport', 'Student Finance'],
    title: "How to estimate student living costs",
    category: 'Budgeting',
    description: "Build a location-specific estimate for housing, transport, food and everyday spending.",
    readTime: '2 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Build a location-specific estimate",
        summary: "Living costs change by city, neighbourhood and individual lifestyle. Start with current local prices and your own housing offer rather than relying on a single national figure. Separate the money needed for immigration evidence from your practical living budget.",
        keyPoints: ["Include rent, utilities, groceries, transport, healthcare or insurance, phone and study costs.", "Add initial purchases and deposits as one-off expenses.", "Review estimates when your course location or accommodation changes."],
      },
      {
        title: "Calculate routine travel and food costs",
        summary: "Check the actual journey between home and campus using the local transport operator’s current fares and timetable. Estimate grocery spending from a realistic shopping list and allow for occasional meals outside.",
        keyPoints: ["Compare a student pass with the journeys you expect to make.", "Include walking time, service frequency and the cost of late travel.", "Do not count a discount until you confirm you are eligible."],
      },
      {
        title: "Plan for variability",
        summary: "Some bills are fixed while others change with use, season and circumstances. Make a conservative estimate and leave a reserve you can access if a cost is higher than expected.",
        keyPoints: ["Check whether rent includes heating, electricity and internet and whether caps apply.", "Add exchange-rate and transfer fees if funds come from another currency.", "Review actual spending after the first month and adjust your plan."],
      },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'student-budget',
    tags: ['Budgeting', 'Student Finance', 'Cash Flow', 'Cost of Living'],
    title: "Planning a student budget abroad",
    category: 'Budgeting',
    description: "Build a practical budget and payment calendar for your circumstances.",
    readTime: '2 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia', 'france', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Separate fixed and flexible costs",
        summary: "Start with reliable income or support, then list rent, mandatory bills, transport and insurance. Use the remaining amount to plan food, household purchases and social spending. Your plan should reflect your own payment dates.",
        keyPoints: ["Record the due date and currency for each major payment.", "Distinguish confirmed support from income you hope to earn.", "Keep one-off setup costs separate from recurring spending."],
      },
      {
        title: "Match cash flow to instalments",
        summary: "A budget can balance over a year while leaving a shortfall in the month a large rent instalment is due. Build a calendar that shows when money arrives and when each payment must clear.",
        keyPoints: ["Allow for bank processing and overseas transfer times.", "Check fees and the exchange rate on the payment method you will use.", "Confirm cancellation and refund terms before making a non-refundable payment."],
      },
      {
        title: "Set a reserve and review it",
        summary: "Choose a reserve based on your circumstances, the help available to you and possible unexpected costs. Track actual spending for the first month and revise estimates that were too low or high.",
        keyPoints: ["Keep emergency funds accessible using a safe payment method.", "Speak with your university support team early if your finances change.", "Ask about hardship support using the eligibility rules published by your own institution."],
      },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'hidden-costs',
    tags: ['Budgeting', 'Hidden Costs', 'Student Finance', 'Cost of Living'],
    title: "Student expenses beyond rent and tuition",
    category: 'Budgeting',
    description: "Plan for deposits, move-in purchases and everyday recurring expenses.",
    readTime: '2 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Before you travel",
        summary: "The first payment may involve more than a headline rent. Review any deposit, transfer charges, insurance, documentation costs and travel to the accommodation. Ask the provider for a complete written breakdown.",
        keyPoints: ["Check whether the deposit is refundable and what deductions may apply.", "Budget for bank transfer fees and currency conversion.", "Keep receipts and verify the payment recipient independently."],
      },
      {
        title: "During move-in",
        summary: "A furnished room may not include sheets, pillows, towels, cooking supplies, cleaning products or a travel adapter. The exact list depends on your accommodation.",
        keyPoints: ["Request an inventory and bed dimensions before buying supplies.", "Ask if starter packs are provided or sold separately.", "Allow for transport from the airport and any temporary accommodation."],
      },
      {
        title: "Over the term",
        summary: "Smaller recurring costs can accumulate. Check laundry, printing, mobile data, transport outside a pass, course materials and social activities against your own expected use.",
        keyPoints: ["Check whether utility bills or internet are included and subject to limits.", "Set a flexible amount for discretionary spending.", "Review actual costs after your first month and adjust."],
      },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'student-discounts',
    tags: ['Budgeting', 'Student Discounts', 'Cost of Living', 'Student Finance'],
    title: "Finding and comparing student discounts",
    category: 'Budgeting',
    description: "Check eligibility and compare the full costs of transport, software and other services.",
    readTime: '2 min read',
    stage: 'Budgeting',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Check eligibility before budgeting",
        summary: "Universities, transport operators and retailers may offer student rates, but eligibility, geographic coverage and duration vary. Use the organisation’s current published terms to see whether your course and age qualify.",
        keyPoints: ["Check what identification is accepted and when access expires.", "Review renewal requirements and any administration fee.", "Avoid sharing more personal information than is needed for verification."],
      },
      {
        title: "Prioritise recurring costs",
        summary: "A saving on a service you already use each month may have more impact than an occasional retail offer. Compare the full price and contract terms, not only the discount percentage.",
        keyPoints: ["Compare transport passes against your expected journeys.", "Check phone plans, software and cultural services offered through your university.", "Look for cancellation fees, minimum terms and automatic renewals."],
      },
      {
        title: "Avoid spending to save",
        summary: "A discount is useful when the purchase meets a real need and fits your budget. Compare the discounted cost with alternatives and decide whether you would buy the item without the promotion.",
        keyPoints: ["Check whether an offer applies to the exact product or route you need.", "Set a limit for discretionary spending before browsing.", "Keep confirmation of eligibility for use when requested."],
      },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'first-week',
    tags: ['Arrival', 'Settling In', 'Student Life', 'Orientation'],
    title: "Your first week as an international student",
    category: 'Arriving',
    description: "Settle into your accommodation and organise university enrolment, transport and essential services.",
    readTime: '2 min read',
    stage: 'Arrival',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Confirm your arrival and accommodation",
        summary: "Keep the accommodation address, arrival instructions and an out-of-hours contact available without mobile data. At check-in, collect the keys, learn how to access the building and ask how maintenance and emergencies are reported.",
        keyPoints: ["Photograph existing damage and compare the room with the supplied inventory.", "Submit any discrepancies within the provider’s stated timeframe.", "Keep the confirmation that your report was received."],
      },
      {
        title: "Complete university enrolment",
        summary: "Follow the enrolment instructions for your university and course. They may include identity checks, document review, course registration and orientation. Do not assume every campus follows the same schedule.",
        keyPoints: ["Find the deadline and the office to contact if a flight or document is delayed.", "Keep your student number and university support contacts accessible.", "Check your timetable, campus location and any course-specific induction."],
      },
      {
        title: "Check your immigration record",
        summary: "Your next step depends on the destination and the form of status issued to you. In the UK, eVisas provide an online immigration record; check that you can access your UKVI account and that your travel document details are correct.",
        keyPoints: ["Read the grant instructions for your own circumstances and retain any valid documents you were issued.", "Use official guidance to check how you can show your status when requested.", "Ask your university’s international student team if your record contains an error."],
        source: { label: "UK government eVisa guidance", href: "https://www.gov.uk/evisa" },
      },
      {
        title: "Set up daily essentials",
        summary: "Arrange a way to communicate, find your route to campus, and check how you will access money for the first few weeks. Find out what healthcare or insurance applies to your status before you need it.",
        keyPoints: ["Check SIM or eSIM compatibility and compare the full plan cost.", "Learn the building’s emergency procedures and save local emergency contacts.", "Visit the university’s student support services if you need practical or wellbeing help."],
      },
    ],
    ctaVariant: 'housing',
    preview: true,
  },
  {
    slug: 'airport-to-home',
    tags: ['Arrival', 'Travel', 'Transport', 'Settling In'],
    title: "Getting from the airport to your accommodation",
    category: 'Arriving',
    description: "Plan a practical route, key collection and a backup for travel delays.",
    readTime: '2 min read',
    stage: 'Arrival',
    countries: ['uk', 'ireland', 'australia', 'france'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Plan the journey before departure",
        summary: "Find your accommodation address and key-collection instructions, then compare routes that operate at your arrival time. Allow for immigration checks, baggage collection, possible flight delays and the amount of luggage you can manage.",
        keyPoints: ["Check official airport and transport operator information for current services and fares.", "Save an offline map and the provider’s contact number.", "Ask how to reach your accommodation if reception is closed."],
      },
      {
        title: "Choose a route that fits your needs",
        summary: "A direct taxi, public transport route or pre-arranged pickup can each be suitable depending on budget, accessibility and arrival time. Check total cost and the provider’s official booking process.",
        keyPoints: ["Check step-free access and luggage restrictions if needed.", "Use an official taxi rank or a verified pre-booked service.", "Avoid accepting an unexpected payment request from an unverified person."],
      },
      {
        title: "Prepare for a disruption",
        summary: "Share your arrival plan with someone you trust and keep a backup way to contact your provider. If your flight is delayed, update the person responsible for check-in as soon as practical.",
        keyPoints: ["Keep your phone charged and carry a compatible charger.", "Keep your booking confirmation and address accessible offline.", "Identify a safe temporary option if you cannot collect keys that night."],
      },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'healthcare',
    tags: ['Arrival', 'Healthcare', 'Settling In', 'Documentation'],
    title: "Finding healthcare as an international student",
    category: 'Arriving',
    description: "Check local healthcare access, insurance and registration before you need care.",
    readTime: '2 min read',
    stage: 'Settling in',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Check your access before you need care",
        summary: "Healthcare access depends on your destination, immigration status, length of stay and any insurance or surcharge requirements. Your university’s international office can help you identify the correct local process. Start with the official health authority and your own visa conditions.",
        keyPoints: ["Check what services your coverage includes, when it starts and any exclusions.", "Keep your policy or health-system registration details accessible.", "For urgent emergencies use the emergency service number for the country you are in."],
      },
      {
        title: "Find and register with a local doctor",
        summary: "In the UK, a general practice can be a starting point for routine care. Check the NHS guidance for the nation where you live and contact a practice about registration. Other destinations may use different doctors, insurers or registration systems.",
        keyPoints: ["Ask how to make an appointment, obtain repeat medication and get help outside opening hours.", "Do not wait until you are unwell to identify a suitable service.", "Tell the practice about ongoing treatment so you can discuss continuity of care."],
        source: { label: "NHS guide to registering with a GP", href: "https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/" },
      },
      {
        title: "Budget for dental, optical and other costs",
        summary: "Do not assume every service is free or private. Charges and assistance depend on the service, location and your eligibility. Ask the provider whether treatment is public or private and request a written estimate before agreeing to non-emergency treatment.",
        keyPoints: ["Check official rules for dental charges and any low-income support available where you live.", "Ask your insurer what is covered and whether approval is needed before treatment.", "If you take prescribed medication, plan enough time to discuss a local supply with an appropriate clinician."],
        source: { label: "NHS help with dental costs", href: "https://www.nhs.uk/nhs-services/dentists/who-can-get-free-nhs-dental-treatment/" },
      },
      {
        title: "Know where to ask for support",
        summary: "University wellbeing teams, disability services and international student advisers can help you find appropriate local resources. For a medical decision, a qualified clinician can assess your personal circumstances.",
        keyPoints: ["Save contact details for your local healthcare provider and university support team.", "Keep important medical information and insurance details secure but accessible.", "Ask for language or accessibility support when arranging care if you need it."],
      },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'making-friends',
    tags: ['Arrival', 'Student Life', 'Settling In', 'Community'],
    title: "Making friends and finding support abroad",
    category: 'Arriving',
    description: "Practical, low-pressure ways to meet people and find support while settling in.",
    readTime: '2 min read',
    stage: 'Settling in',
    countries: ['uk', 'ireland', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Start with low-pressure opportunities",
        summary: "Orientation, a class introduction, a residence event or a student society can offer a natural reason to speak with someone. Choose activities that suit your interests and budget; you do not need to attend everything.",
        keyPoints: ["Ask a classmate a practical question about the course or campus.", "Try an event more than once if the first meeting feels unfamiliar.", "Check accessibility and costs before joining an activity."],
      },
      {
        title: "Build routines that leave room for connection",
        summary: "Repeated everyday contact can make conversations easier. A shared meal, study group or regular society meeting can help you get to know people gradually, without treating every interaction as networking.",
        keyPoints: ["Respect housemates’ privacy and agree on shared-space expectations.", "Suggest a specific, manageable activity such as a short walk or shared study session.", "Stay in touch with family and existing friends in ways that work for you."],
      },
      {
        title: "Use support when you need it",
        summary: "Settling into a new place can take time, and experiences differ. If loneliness or stress is affecting you, the university’s wellbeing team, student services or a trusted person can help you identify support.",
        keyPoints: ["Find out how to contact your university’s support services.", "Ask the accommodation team about community events or a practical concern.", "Seek a qualified clinician if you need individual healthcare advice."],
      },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'uae-visa-sponsorship',
    tags: ['Student Visa', 'Immigration', 'Documentation', 'Sponsorship'],
    title: "UAE student visas and work permissions",
    category: 'Before you go',
    description: "Questions to ask your university and the relevant authorities about residence, sponsorship and work.",
    readTime: '2 min read',
    stage: 'Planning',
    countries: ['uae'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Find the correct route",
        summary: "Residence and sponsorship arrangements depend on your institution, status and the relevant authority. Ask your university’s international office which process applies to your admission and consult the current UAE government guidance.",
        keyPoints: ["Ask who sponsors your residence, which authority issues it, the applicable fees and what the university will handle.", "Check the current document list directly with the institution and authority.", "Allow time for additional checks and keep copies of all confirmations."],
        source: { label: "UAE government student visa guidance", href: "https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/residence-visa-for-studying-in-the-uae" },
      },
      {
        title: "Understand work permission",
        summary: "A student residence permission should not be treated as automatic permission to take any job. Work and training can require a permit and specific conditions. The employer and relevant authority can confirm the current process for the role.",
        keyPoints: ["Ask about a written contract, working hours, pay and the applicable permit before starting.", "Check how employment may interact with study and sponsorship.", "Keep a copy of the permit and contract once issued."],
        source: { label: "UAE employment legislation", href: "https://www.mohre.gov.ae/assets/download/7b5f3974/Federal%20Decree-Law%20No.%2033%20of%202021%20Regarding%20the%20Regulation%20of%20Employment%20Relationship%20and%20its%20amendments_638990571068264034.pdf.aspx" },
      },
      {
        title: "Plan beyond graduation",
        summary: "A job offer does not itself establish a residence or work status. Requirements can differ by visa route, employer and individual situation, and may change.",
        keyPoints: ["Ask the employer which permits it intends to arrange and when employment may begin.", "Confirm when your existing residence permission expires and what steps apply if your circumstances change.", "Seek current official or qualified advice before making commitments."],
      },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'uae-housing-furnished',
    tags: ['Accommodation', 'Renting', 'Housing Options', 'Furnished Housing'],
    title: "Furnished housing and utilities in the UAE",
    category: 'Accommodation',
    description: "Compare furnishing, utilities, contracts and the full cost of accommodation in the UAE.",
    readTime: '2 min read',
    stage: 'Booking',
    countries: ['uae'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Compare what is provided",
        summary: "Furnishing and utility arrangements vary between residences and private rentals. Ask for an inventory and the exact room or room type included in your offer. A furnished label alone does not establish which appliances, bedding or kitchen items are supplied.",
        keyPoints: ["Ask whether the photographs show your exact room or an example.", "Check whether electricity, water, cooling, internet and maintenance are included or billed separately.", "Ask about usage caps and any setup or disconnection charges."],
      },
      {
        title: "Understand the full cost",
        summary: "Request a written quotation covering the length of stay, payment dates, deposit and additional charges. Costs vary substantially by location, building, occupancy and contract.",
        keyPoints: ["Calculate the total for the period you will actually occupy the accommodation.", "Check whether the price is per room, bed or apartment, and whether a roommate is included.", "Ask when and how a deposit is returned and what deductions may apply."],
      },
      {
        title: "Check the agreement and local process",
        summary: "Read the contract carefully and confirm who owns or manages the property and is authorised to receive payment. The applicable process and tenant rights can vary by emirate and contract type.",
        keyPoints: ["Ask whether the lease must be registered and which authority handles disputes in the relevant emirate.", "Review cancellation, visitor, maintenance and early-exit terms.", "Keep a signed copy of the agreement and payment receipts."],
      },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'uae-tax-free-income-planning',
    tags: ['Budgeting', 'Banking', 'Financial Requirements', 'Student Finance'],
    title: "Budgeting and student work in the UAE",
    category: 'Budgeting',
    description: "Plan your study budget and check applicable work, tax and reporting requirements.",
    readTime: '2 min read',
    stage: 'Planning',
    countries: ['uae'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Start with a complete budget",
        summary: "Estimate tuition, accommodation, food, transport, healthcare, connectivity and an accessible emergency reserve. Use written provider quotations and distinguish guaranteed funding from possible employment income.",
        keyPoints: ["List payments due before arrival and recurring monthly costs separately.", "Include exchange rates, transfer fees and insurance in your calculations.", "Revisit your budget if your housing or course dates change."],
      },
      {
        title: "Check work permissions before accepting a role",
        summary: "Your residence status, employer and the type of work affect which permits and conditions apply. Consult your university and the relevant UAE authority before starting work.",
        keyPoints: ["Ask the prospective employer which permit is needed and request a written contract.", "Confirm hours and pay in the offer rather than relying on advertised examples.", "Do not make essential rent payments depend on a job you have not secured."],
        source: { label: "UAE employment legislation", href: "https://www.mohre.gov.ae/assets/download/7b5f3974/Federal%20Decree-Law%20No.%2033%20of%202021%20Regarding%20the%20Regulation%20of%20Employment%20Relationship%20and%20its%20amendments_638990571068264034.pdf.aspx" },
      },
      {
        title: "Consider taxes and reporting in all relevant countries",
        summary: "Tax treatment depends on your residence, income and obligations in each applicable jurisdiction. Do not assume that money earned or held abroad is automatically exempt from reporting in your home country.",
        keyPoints: ["Check the official rules for your circumstances and the applicable tax year.", "Consider seeking advice from a qualified tax professional if you have cross-border income.", "Compare banking and transfer costs before choosing where to receive or send funds."],
      },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'germany-studentenwerk-housing',
    tags: ['Accommodation', 'Renting', 'Student Housing', 'Housing Safety'],
    title: "Student residences and shared flats in Germany",
    category: 'Accommodation',
    description: "Compare student residences and shared flats, verify an offer and plan address registration.",
    readTime: '2 min read',
    stage: 'Booking',
    countries: ['germany'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Understand the available options",
        summary: "Student services organisations may offer residences, while a Wohngemeinschaft, or WG, is a shared flat. Availability, application requirements and waiting times vary by city and provider. Apply using the responsible organisation’s instructions and keep alternatives open.",
        keyPoints: ["Check whether you are eligible and which documents the residence requires.", "Ask whether the room is furnished and which charges are included.", "If a waiting list is long, consider temporary accommodation while you continue searching."],
        source: { label: "German government housing guidance", href: "https://www.make-it-in-germany.com/en/arriving-living/getting-started/housing-registration" },
      },
      {
        title: "Compare a shared flat",
        summary: "In a WG you generally have a private room and share some facilities, but the precise agreement matters. Establish whether your contract is directly with the landlord, with a main tenant, or with a housing provider.",
        keyPoints: ["Ask how rent, utilities, internet and shared household costs are divided.", "Discuss guest rules, cleaning and notice before agreeing.", "Ask who can authorise a sublet and whether the room can be used for address registration."],
      },
      {
        title: "Check the housing offer",
        summary: "Verify the address, identity and authority of the person offering accommodation. A photo or online advert alone does not establish that a room is available or that the payment instructions are genuine.",
        keyPoints: ["Ask for an agreement and an inventory before paying.", "Use a viewing or live video to ask about the actual space, while independently verifying the provider.", "Keep copies of correspondence and receipts."],
      },
      {
        title: "Plan address registration",
        summary: "The official housing guidance explains that residents generally need to register when moving into a home in Germany. Ask the local registration office what deadlines and documents apply in your circumstances.",
        keyPoints: ["Ask the landlord or provider for the required confirmation of moving in.", "Check appointment availability with the local office.", "Keep your registration confirmation with your important documents."],
        source: { label: "German government housing and registration", href: "https://www.make-it-in-germany.com/en/arriving-living/getting-started/housing-registration" },
      },
    ],
    ctaVariant: 'housing',
  },
  {
    slug: 'germany-monthly-budgeting',
    tags: ['Budgeting', 'Cost of Living', 'Student Finance', 'Cash Flow'],
    title: "Planning a student budget in Germany",
    category: 'Budgeting',
    description: "Estimate housing and living costs and understand what is included in the rent.",
    readTime: '2 min read',
    stage: 'Booking',
    countries: ['germany'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Estimate the monthly essentials",
        summary: "Start with the actual rent in your offer and add food, insurance, transport, phone, study materials and an emergency reserve. Costs vary by city, accommodation and individual needs, so use current quotations for your circumstances.",
        keyPoints: ["Check whether the rent includes heating, electricity and internet.", "Add any semester contributions or university charges shown in your own course documents.", "Separate the deposit and one-off setup expenses from recurring monthly spending."],
      },
      {
        title: "Understand warm and cold rent",
        summary: "Housing offers may describe Kaltmiete, or base rent, and Warmmiete, which commonly adds certain operating costs. Ask for a written breakdown rather than assuming every utility is included in the warm rent.",
        keyPoints: ["Check what is paid as an advance and whether it can be reconciled later.", "Ask who arranges electricity and internet and how shared charges are divided.", "Compare complete monthly costs, not a base-rent figure alone."],
        source: { label: "German government housing guide", href: "https://www.make-it-in-germany.com/en/arriving-living/getting-started/housing-registration" },
      },
      {
        title: "Check employment and funding separately",
        summary: "Work rights, tax, insurance and university conditions depend on your citizenship and status. Do not rely on a single annual or weekly limit without checking the current official rules applicable to you.",
        keyPoints: ["Ask the university’s international office and check the relevant authority before accepting work.", "Treat expected income as uncertain until a role and its conditions are confirmed.", "Check student transport or other discounts directly with the issuing organisation."],
      },
    ],
    ctaVariant: 'planning',
  },
  {
    slug: 'germany-tenancy-law-deposits',
    tags: ['Accommodation', 'Tenancy Agreements', 'Deposits', 'Housing Safety'],
    title: "German tenancy agreements and deposits",
    category: 'Accommodation',
    description: "Questions to ask about a German rental agreement, deposits, repairs and registration.",
    readTime: '2 min read',
    stage: 'Booking',
    countries: ['germany'],
    reviewedOn: '2026-11-27',
    sections: [
      {
        title: "Read the agreement in context",
        summary: "Identify the landlord, the accommodation, the rent and the start date. Check which operating costs are included, who holds the contract and whether your room is part of a shared flat or student residence. Different arrangements can have different terms.",
        keyPoints: ["Ask for a breakdown of base rent, operating-cost advances and separately billed utilities.", "Understand notice and early departure terms before signing.", "If you do not understand the German text, obtain a reliable translation and independent advice."],
      },
      {
        title: "Understand the deposit",
        summary: "For residential tenancies covered by section 551 of the German Civil Code, the security deposit is generally limited to three months of rent excluding separately stated operating costs. The law addresses instalments and how a cash deposit is held, with specific provisions for student hostels.",
        keyPoints: ["Check what kind of accommodation agreement you have and which rules apply.", "Ask how the deposit will be held, what deductions may be made and how any dispute is handled.", "Document the condition of the room at move-in and retain the handover report."],
        source: { label: "German Civil Code, section 551", href: "https://www.gesetze-im-internet.de/englisch_bgb/englisch_bgb.html" },
      },
      {
        title: "Discuss repairs, notice and registration",
        summary: "Keep the provider’s repair reporting route and emergency contact. Notice periods, rent adjustments and remedies depend on the agreement and applicable law; avoid assuming a standard response time or a single cap applies to every tenancy.",
        keyPoints: ["Ask whether you can register the address and how the landlord’s confirmation is supplied.", "Report defects promptly in writing and keep records of correspondence.", "Contact a local tenant advice service or qualified adviser for a dispute."],
        source: { label: "German government housing guidance", href: "https://www.make-it-in-germany.com/en/arriving-living/getting-started/housing-registration" },
      },
    ],
    ctaVariant: 'planning',
  }
]

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

export const movingAbroadCategorySlugs: Record<MovingAbroadArticleCategory, string[]> = {
  'Before you go': ['pre-arrival-checklist', 'student-visa', 'uk-bank-account', 'packing-list', 'uae-visa-sponsorship'],
  Accommodation: ['choose-accommodation', 'accommodation-costs', 'halls-vs-private', 'avoid-scams', 'tenancy-agreement', 'uae-housing-furnished', 'germany-studentenwerk-housing', 'germany-tenancy-law-deposits'],
  Budgeting: ['real-cost-abroad', 'cost-of-living', 'student-budget', 'hidden-costs', 'student-discounts', 'uae-tax-free-income-planning', 'germany-monthly-budgeting'],
  Arriving: ['first-week', 'airport-to-home', 'healthcare', 'making-friends'],
}

export const featuredGuideSlugs = ['pre-arrival-checklist', 'choose-accommodation', 'real-cost-abroad'] as const
export const homePreviewGuideSlugs = ['pre-arrival-checklist', 'accommodation-costs', 'avoid-scams', 'first-week'] as const

export const countryMovingAbroadSlugs: Record<MovingAbroadCountrySlug, string[]> = {
  uk: ['student-visa', 'cost-of-living', 'first-week', 'tenancy-agreement'],
  ireland: ['student-visa', 'student-budget', 'airport-to-home', 'avoid-scams'],
  france: ['student-visa', 'student-budget', 'airport-to-home', 'tenancy-agreement'],
  uae: ['uae-visa-sponsorship', 'uae-housing-furnished', 'uae-tax-free-income-planning'],
  germany: ['germany-studentenwerk-housing', 'germany-monthly-budgeting', 'germany-tenancy-law-deposits'],
  australia: ['student-visa', 'hidden-costs', 'packing-list', 'halls-vs-private'],
  usa: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  canada: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  spain: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  austria: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  belgium: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  hungary: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  singapore: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  malta: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  italy: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  netherlands: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
  malaysia: ['student-visa', 'student-budget', 'avoid-scams', 'first-week'],
}

  const movingAbroadCountrySlugs: MovingAbroadCountrySlug[] = ['uk', 'ireland', 'france', 'uae', 'germany', 'australia', 'usa', 'canada', 'spain', 'austria', 'belgium', 'hungary', 'singapore', 'malta', 'italy', 'netherlands', 'malaysia']

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
