import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const hiddenCosts: ReviewedGuide = {
  slug: 'hidden-costs',
  title: 'How to budget for the first month in student accommodation',
  description: 'Price first-night supplies, move-in travel, deposits and setup costs, and decide what to keep in an accessible reserve.',
  topic: 'Arrival and settling in',
  reviewedOn: '2026-11-27',
  related: ['packing-list', 'student-budget', 'first-week', 'airport-to-home'],
  body: {
    introduction: `The first month can require payments you will rarely make again. You might need to clear rent and a deposit, pay an airport fare and buy bedding before your first normal contribution arrives. Other expenses, such as an internet charge or laundry, will recur. Separate them so you know what you need on the day you arrive and how much will be left after buying essentials.

Use this guide to build a first-month shopping, payments and reserve plan. Start with the dates and the inventory the accommodation provider confirms.`,
    takeaways: [
      'Separate move-in expenses, recurring bills and refundable cash.',
      'Place purchases in order of when you really need them.',
      'Price disruptions based on realistic alternatives and accessible payment options.',
      'Update the plan once you see the room and know what works.',
    ],
    sections: [
      {
        id: 'confirm-what-is-included',
        title: 'Check what the rent, deposit and room inventory cover',
        prose: `Ask which payment is due before arrival and whether it counts towards rent. Record deposits separately from fees and consider what may be withheld under the arrangement. Request the actual furnished inventory and bed size. Check the kitchen, cookware, access to laundry and whether the provider supplies a starter pack. Make a small first-night list with everything you need to sleep, wash, prepare food, charge a phone and make the journey. Compare a supplied pack with a local purchase or an existing item that fits.

Make two more lists. One contains costs that can wait until you see the room, such as a storage unit, spare cookware or a larger desk lamp. The other has continuing expenses such as laundry, mobile service or electricity. Add parking or parking permits only if you actually use them. Ask who pays to set up a separate service and whether it needs a deposit or minimum term. Study Australia’s accommodation guidance lists services and bonds to verify with a provider before agreeing to a room.`,
        sources: [s.studyAustraliaHousing.id],
      },
      {
        id: 'put-first-month-costs-on-dates',
        title: 'Put expenses on the dates when you need to pay them',
        prose: `Add approved transportation, luggage handling or storage and any temporary stay. Record the date listed on the itinerary and leave time for actual payment to settle. Ask the institution whether course materials or safety equipment must be bought before a particular session or can be borrowed. For each large line, separate the item, amount, provider and due date. If a payment is in another currency, record the expected converted amount and fees.

Example figures in pounds can show how the categories differ. Suppose the first month’s rent is £690 and your refundable deposit is £400. Arrival travel costs £45, bedding and basics cost £110 and immediate groceries, toiletries and connectivity cost £90. That puts immediate spending at £935 and first funding required at £1,335 with the deposit. These are illustrative assumptions. If you need two nights of temporary accommodation at £70 each, that increases costs and initial funding by £140. Do not subtract the deposit from your next bill unless the accommodation provider confirms that treatment.`,
      },
      {
        id: 'size-a-usable-reserve',
        title: 'Protect an accessible reserve from routine setup spending',
        prose: `Choose problems you need to be able to handle. You might need another night, an alternative trip, enough food or essential supplies while a transfer clears, or a minor change to a move date. Price several realistic alternatives and work out which costs could arrive together. Agree who can help, how money can be sent, and what works outside business hours. A reserve in another country with no practical payment route does little while you are unable to check in.

If money is tight on arrival night, use the room inventory to make a short list you can act on: somewhere to sleep, a working phone, food, hygiene and a way to get to campus. Ask about a loan or used item before buying something you need only for a week.

After you have moved, revisit your records. If a charge is still pending, leave room for it. Buy optional items once you know whether they are provided and whether you have the space or permission. If you have needed to use reserve funds, set a realistic plan to restore them without missing essentials. MoneyHelper’s guidance explains why timing, high-cost months and an emergency fund matter when income varies.`,
        sources: [s.irregularIncome.id],
      },
    ],
    checklist: [
      'Collect the room inventory, agreement and payment schedule.',
      'Separate fees, deposit, running costs and one-off purchases.',
      'Price transit, temporary nights and urgent essentials.',
      'Check the longest realistic gap before the next transfer or payment method is ready.',
      'Keep necessary reserve funds accessible and review actual costs after arrival.',
    ],
    faq: [
      { question: 'How much should I keep aside for emergencies?', answer: 'Price disruptions you could plausibly face and note what support you can actually access. Set a reserve according to local costs and the length of the funding gap you need to cover.' },
      { question: 'Is the deposit a first-month expense?', answer: 'It is a first-month cash need if due then. Track it separately and treat any confirmed deduction as a cost.' },
      { question: 'What can I put off buying?', answer: 'Wait on items whose dimensions, shared availability or permission you have not confirmed, provided you can still use the room safely.' },
    ],
    sources: [s.studyAustraliaHousing, s.irregularIncome],
  },
}
