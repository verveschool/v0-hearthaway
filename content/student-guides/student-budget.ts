import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const studentBudget: ReviewedGuide = {
  slug: 'student-budget',
  title: 'How to budget abroad when money arrives at different times',
  description: 'Build a student cash-flow calendar around rent, scholarship releases, family transfers and a reserve you can actually use.',
  topic: 'Contracts and payments',
  reviewedOn: '2026-11-27',
  related: ['real-cost-abroad', 'hidden-costs', 'accommodation-costs', 'uk-bank-account'],
  body: {
    introduction: `A term budget can balance on paper and still leave you unable to pay rent on time. Tuition can be due in one instalment while a scholarship is released monthly. A family payment may take longer than expected, and your rent is due when the provider receives it. This guide helps you and a supporter turn funding into an operating plan that accounts for dates, currencies and access.

Use the actual funds and instalments in your own case. Keep visa financial evidence separate. Only include as a source the portion you can access for the payment you are planning.`,
    takeaways: [
      'Use dates funds actually become available, not the date they are promised or sent.',
      'Distinguish protected or restricted funds, essential costs and discretionary spending.',
      'Stress-test a missed transfer, worse exchange rate or overlapping housing obligations.',
      'Keep an accessible reserve and decide early who to speak to if the plan stops balancing.',
    ],
    sections: [
      {
        id: 'label-incoming-funds-and-outgoings',
        title: 'Write down when funds become usable and what they can cover',
        prose: `List funding from savings, support, awards and confirmed income. Record the sending account, currency, date expected, how you receive it and any restrictions. A tuition award credited directly to the university cannot pay an accommodation deposit. A loan sent twice a year may cover the year but require you to keep the next instalment of rent separate. A job that starts later than expected may not fund the first weeks. Under a cautious budget, enter dependable income and show future or variable income as a separate scenario, as suggested in MoneyHelper's irregular income guidance.

List rent, tuition contributions, insurance, utilities, food, transport and phone as separate items. Mark essentials, recurring commitments you can change with notice, and flexible spending. Enter a likely date even for less frequent items such as study materials or moving costs. Check whether bills are paid monthly, each term or in advance. Ask a provider when an amount must reach it and how you know it was received. Update the dates when a signed agreement or grant notice changes.`,
        sources: [s.irregularIncome.id],
      },
      {
        id: 'run-the-balance',
        title: 'Run the balance forward to find the earliest shortfall',
        prose: `Suppose you start a month with £540, need £670 rent on the 3rd, expect a family transfer of £600 on the 7th and need £100 for essentials before it arrives. The balance is £130 short on the rent date and £230 short after the essentials. The eventual transfer leaves £370 once all the listed costs are paid, but it arrives too late to fund them without a bridge. Move funding earlier, investigate an agreed date change or choose a commitment you can cover. If a supporter can offer the £230, agree how it will be available and when it would be paid back.

Repeat with a high-cost week and a late transfer. The lowest point tells you when you could run out, and the size of the gap tells you what to protect. When funds come from another currency, write the destination amount first. Add the sending amount and fees at the rate you expect, then compare the result at a weaker rate. Check whether the receiving bank can deduct fees or delay availability. Keep a payment schedule both the student and supporter can see without sharing bank passwords or one-time codes.`,
        sources: [s.irregularIncome.id, s.fcaPayments.id],
      },
      {
        id: 'protect-the-essentials',
        title: 'Protect rent and essentials while allowing for everyday decisions',
        prose: `Set aside the next priority payments and a separate amount for basic food, travel and an emergency. Move only what you can use towards everyday spending. If your app or bank supports saving pots, check how quickly you can access the reserve and which account a scheduled payment uses. A reserve that is held abroad, in a locked product or dependent on another person's availability may fail when your primary card stops working. Choose the amount by pricing realistic problems, such as another night's accommodation, an urgent journey or a delayed contribution.

Review actual spending after two weeks and again after the first regular bills. If a recurring cost is higher, update the next two months. Pause flexible spending if the remaining balance no longer covers essentials. Tell a provider early if a payment may not clear and get any agreement to change it in writing. Contact university student support if you need help understanding local hardship policies or cannot fund basics. Ask what evidence it wants and whether any help is available for your enrolment and circumstances.`,
        sources: [s.irregularIncome.id],
      },
    ],
    checklist: [
      'Record amounts, currencies, restrictions and the date funds become available.',
      'List each bill by its actual payment or receipt deadline.',
      'Find the lowest balance before the next regular transfer.',
      'Test a delay, higher usage or weaker exchange rate.',
      'Set aside an accessible reserve and record the plan for a shortfall.',
      'Review actual spending and costs when the schedule changes.',
    ],
    faq: [
      { question: 'Should I use expected wages to fund my deposit?', answer: 'Check when work can begin and when pay reaches you, then test the timeline without the wages. A housing obligation should have a confirmed way to be paid.' },
      { question: 'What if my family contribution is often late?', answer: 'Use a cautious arrival date for the base plan and check the smallest balance before it arrives. Agree a specific fallback, date change or lower obligation if you cannot cover it.' },
      { question: 'Should I include a future deposit refund?', answer: 'Track it separately until the amount and timing are confirmed. Keep the next payment funded without it if you cannot verify when it will clear.' },
    ],
    sources: [s.irregularIncome, s.fcaPayments],
  },
}
