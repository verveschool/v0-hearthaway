import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const costOfLiving: ReviewedGuide = {
  slug: 'cost-of-living',
  title: 'How to estimate your weekly student living costs',
  description: 'Turn a real timetable, housing quote, local fares and grocery list into a weekly budget you can update after arrival.',
  topic: 'Contracts and payments',
  reviewedOn: '2026-11-27',
  related: ['student-budget', 'real-cost-abroad', 'hidden-costs', 'student-discounts'],
  body: {
    introduction: `The most useful living-cost number comes from the routine you expect to have. Even people in the same student building can spend different amounts on travel, heating and food. An advertised rent or an immigration maintenance figure cannot show how many times you travel to campus or whether you can cook after a long day.

Use this guide to plan an ordinary week and a more expensive week. Families can check which prices came from confirmed quotes or published fares and which remain estimates. Convert the weekly plan to the actual contract or term dates only once the recurring costs make sense.`,
    takeaways: [
      'Start with written rent and included services, then add recurring costs outside rent.',
      'Use official fares and plan the actual journeys likely to qualify for a concession.',
      'Build a grocery basket around your kitchen, schedule and storage.',
      'Check seasonal costs and revise your guesses after a few weeks of receipts.',
    ],
    sections: [
      {
        id: 'start-from-housing-and-transport',
        title: 'Use a housing quote and a week of real travel',
        prose: `Copy the actual rent and dates from an offer. Record which utilities, internet or cleaning are included and ask about a cap or an end-of-term adjustment. If a bill is shared, establish who is liable and how the share is calculated. A quoted charge from someone in another property can suggest a question but is a poor substitute for the provider's policy or a utility quote. Mark separate heating or cooling as a variable cost and check how a high-use week changes it.

List the number and times of normal trips to classes, a placement, groceries and important services. Use each transport operator’s fare and eligibility page. Compare pay-as-you-go and a period pass using only the journeys you expect to take. Check whether a student pass covers the right zones, vehicles and times, and includes a transfer. Add regular late returns or another place you will travel in the same week. A cheaper rent further out can still work if transport is reasonable and predictable. Add the fare explicitly, and compare how much time and direct access affect your choice.

Use current local figures. Study Australia offers broad cost estimates to help set up a budget and explains variation across courses and locations. A national tool can help you remember a category. Quote specific rent, food and fares for the decision you are making.`,
        sources: [s.studyAustraliaHousing.id, s.australiaLivingCosts.id],
      },
      {
        id: 'price-food-and-household-use',
        title: 'Price a shopping list and the services you actually use',
        prose: `Sketch meals for the days you will be at home and food you may get at campus. Take a list of ingredients to a supermarket site or price it near the actual accommodation. Consider storage, limited freezer space, dietary needs, opening times and the cost of travelling for cheaper prices. Estimate what you will carry and use before it goes off. If you have a catered room, check exactly which meals and dates the charge covers. Include some costs for eating away from home if that is part of your routine.

Try your meal plan against the day you get home latest. If the kitchen is closed, crowded or far away when you need it, price one practical alternative on that day. A grocery basket based on cooking every meal can understate what you will actually spend.

Add recurring laundry, connectivity and insurance or health-related costs where applicable. Check any bills announced in advance so you can spread the cost over the period they cover. Include line items for supplies and ordinary social spending if you plan to use them. Put one-off purchases and deposits somewhere else. Keeping costs distinct makes it easier to see whether a shortfall comes from the weekly routine or an arrival expense you will not repeat.`,
      },
      {
        id: 'calculate-a-week-and-test-it',
        title: 'Calculate a regular week and test a higher-cost version',
        prose: `For illustration, suppose rent is £175 per charged week. Food and household basics cost £55, transport £18, separate utility charges £14, and laundry and connectivity average £8. That makes £270. In a demanding week, food outside home adds £12, travel adds £9 and utilities add £7, producing £298. If these assumptions apply for 36 regular weeks plus four more expensive weeks, spending is £270 × 36 plus £298 × 4, or £10,912. Use the appropriate number of weeks for each individual bill if your housing and study periods differ.

When you arrive, compare planned and actual costs using a small sample of receipts. If you skip several trips you had priced, update the fare estimate. If spending is higher because you cannot access a kitchen, ask where to prepare food or adjust the housing and meal plan. Keep as much margin as your funding allows for bills that only arrive later. Keep the total alongside your payment calendar so a cheaper typical week does not hide a larger instalment due before your next transfer.`,
        sources: [s.irregularIncome.id],
      },
    ],
    checklist: [
      'Price the actual room, lease dates, bills and service inclusions.',
      'Price normal and late transit trips on operator pages.',
      'Build a local grocery basket around your timetable and cooking facilities.',
      'Add everyday services and separate deposits and setup purchases.',
      'Test a higher-cost week and update the forecast after arrival.',
    ],
    faq: [
      { question: 'Is there one reliable amount for a city?', answer: 'A published average can identify a broad range. Use your confirmed rent, route and regular habits to decide what you personally need.' },
      { question: 'How do I budget a utility that only gets billed quarterly?', answer: 'Set aside an estimate in the ordinary budget and put the expected payment date on the cash calendar. Keep some margin if costs vary.' },
      { question: 'Does a transport pass always save money?', answer: 'Compare only eligible trips, including relevant times and zones. Add the pass price and fares it will not cover and compare with paying as you go.' },
    ],
    sources: [s.studyAustraliaHousing, s.australiaLivingCosts, s.irregularIncome],
  },
}
