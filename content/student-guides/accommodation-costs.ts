import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const accommodationCosts: ReviewedGuide = {
  slug: 'accommodation-costs',
  title: 'How to calculate and compare the full cost of student housing',
  description: 'Use the written rent schedule, included services, one-off expenses and refundable cash to compare housing offers.',
  topic: 'Contracts and payments',
  reviewedOn: '2026-11-27',
  related: ['choose-accommodation', 'tenancy-agreement', 'real-cost-abroad', 'weighted-housing-comparison'],
  body: {
    introduction: `Two properties can advertise the same weekly rent while committing you to different amounts, dates and risks. One quote may cover your entire term and include heating. Another may charge for longer, collect money earlier or leave bills to housemates. This guide is for students and supporters comparing written housing offers. It shows how to turn each offer into three numbers you can use.

Calculate the total agreement you would sign, the cost of housing yourself over the dates you need and the most cash you must have available before any deposit comes back. These numbers answer different questions about exposure, value and affordability.`,
    takeaways: [
      'Use the actual instalment schedule and charged dates before converting rates.',
      'Calculate contract spend and costs outside it, then compare coverage over the same dates.',
      'Keep refundable cash and possible deductions visible separately.',
      'Test bills, exchange charges and timing with a cautious estimate.',
    ],
    sections: [
      {
        id: 'read-the-quote',
        title: 'Start with the exact quote and its date range',
        prose: `Request a written quote for the room, the people who will live there and your start and end dates. Check whether the price is for a person, a bed or the whole dwelling. Mark the currency, due dates, tentative rate, discount conditions and offer deadline. Confirm when the room is available, when the keys are available and which dates are charged. Use the calendar you need to cover, including induction, exams, placement and travel gaps.

Sum the rent instalments even if the headline rate appears straightforward. Where every week is actually charged, 42 weeks at £185 is £7,770. Where a contract charges 10 payments at £750, rent is £7,500 before other costs. Use any partial period amount stated on the offer and get the calculation if it is unclear. If you want to compare monthly and weekly rates as a rough benchmark, an annualised approximation is weekly price × 52 ÷ 12 for monthly or monthly price × 12 ÷ 52 for weekly. Use actual billed dates for your commitment. Four weeks and a calendar month are different units.

Check whether an amount described as a reservation charge is credited to rent, refundable or a separate expense. Keep copies showing the treatment of any payment. England's government fee guidance describes the categories and rules that apply to covered arrangements in England. Other jurisdictions and agreement types have their own rules. Confirm which local rule covers the named payment before you include it in your decision.`,
        sources: [s.englandTenantFees.id, s.irelandStudentRenting.id],
      },
      {
        id: 'compare-the-full-period',
        title: 'Compare two offers over the dates you need',
        prose: `Suppose you need 42 weeks. Residence A charges £185 for 42 weeks (£7,770), includes heating and internet in this illustration, and leaves you £11 weekly travel (£462). Offer B charges £169 for 38 weeks (£6,422). It leaves you £17 weekly utilities and internet for those 38 weeks (£646), plus £15 weekly travel over the whole 42 weeks (£630). The four-week housing gap costs £210 a week in temporary accommodation (£840), including utilities. Compare £8,232 for A with £8,538 for B before adding one-off costs or keeping refundable cash aside. B's lower advertised price does not cover all the weeks or services you need.

If B's first payment is more manageable, it may still work better for your funding schedule. Conversely, if you can stay with someone at no extra housing cost during the interruption, its illustrative spend falls to £7,698. Check that the backup will really cover the dates, transport and storage. Put uncertain rates in a separate column and ask who can confirm them. Give every option the same scheduled expenses or deliberately identify why they differ.`,
        table: {
          caption: 'Illustrative costs over the same 42 weeks',
          columns: ['Cost', 'Residence A', 'Offer B'],
          rows: [
            ['Contract rent', '£185 × 42 = £7,770', '£169 × 38 = £6,422'],
            ['Uncovered accommodation', '£0', '£210 × 4 = £840'],
            ['Utilities during contract', 'Included in example', '£17 × 38 = £646'],
            ['Travel', '£11 × 42 = £462', '£15 × 42 = £630'],
            ['Estimated spend', '£8,232', '£8,538'],
          ],
        },
      },
      {
        id: 'confirm-extras-and-usage',
        title: 'Ask how utilities, services and one-off charges are calculated',
        prose: `Make a list of electricity, water, heating, cooling, internet, laundry, cleaning and required charges. Record which are included, which have a cap, and which need separate accounts or another payment. Ask how any cap is measured and billed, which dates are covered and whether the amount is assigned to one person, one flat or the whole building. Confirm who is liable when a housemate uses more or leaves. A common charge can include only some expenses. Study Australia's accommodation guidance recommends checking rent, bonds and separately charged services before committing.

Use three quick scenarios for variable costs. First enter the provider's terms or a local quote. Then add a high-usage period or a larger utility share. Finally, include the cost of moving or extending if dates change. Do not include the same item in utilities and a building service charge. Compare the ranges, not just the precise totals. A difference of £50 matters less if one option has £300 of unresolved bills.

A furnished room may still need bedding or kitchen essentials. Ask what is supplied and which items you can safely bring, share, borrow or buy later. Include a service connection, luggage transport or a storage fee if you reasonably expect to need them. Keep a note beside each amount of where you found it and when you will verify it.`,
        sources: [s.studyAustraliaHousing.id],
      },
      {
        id: 'separate-deposits-from-spending',
        title: 'Keep refundable amounts and payment timing visible',
        prose: `Track money held as security on its own line. A confirmed £400 refundable deposit needs £400 in cleared funds today even if it is eventually returned. Ask who holds it, which deductions can be made, whether an applicable scheme lodges it, and how the refund is claimed. Local guidance can differ by arrangement. Do not include a potential refund as money available by a particular date unless you have evidence of when it will arrive.

Record what has to clear before signing, before move-in and on each payment date. If funding or guarantor arrangements affect which plans a provider offers, check the conditions, price and applicable local rules. Put fees and the exchange rate on the same row as overseas payments. For any account change, verify a separate contact through the genuine provider.

Before making a decision, compare the written cost, the cash needed first, and the amount at risk under a delay or cancellation. Pick which assumptions could change the outcome, such as a gap after exams, a capped utility allowance or a transfer arriving late. Ask those questions first and record the answer with the offer.`,
        sources: [s.englandTenantFees.id, s.irelandStudentRenting.id],
      },
    ],
    checklist: [
      'Confirm person or room basis, currency, dates and the actual rent schedule.',
      'Add unavoidable charges and compare the same dates across offers.',
      'Check utility caps, allocation and what starts separately.',
      'Add startup costs, uncovered nights and regular travel.',
      'Record refundable cash and payment deadlines outside the spend total.',
      'Use a cautious version of each assumption and resolve the biggest unknowns.',
    ],
    faq: [
      { question: 'Can I multiply weekly rent by four to get the monthly cost?', answer: 'That gives the cost of four weeks. To budget a calendar month, use the actual agreement payment schedule or label any annualised conversion as an estimate.' },
      { question: 'Does a deposit make one property cost more?', answer: 'It increases the money you need upfront. The permanent cost depends on any amount withheld and the time you have to fund both commitments.' },
      { question: 'How do I compare rent when bills are included at one property?', answer: 'Confirm which services and limits apply, then add estimates only for services paid outside rent. Include a higher-cost case for uncertain bills.' },
    ],
    sources: [s.englandTenantFees, s.irelandStudentRenting, s.studyAustraliaHousing],
  },
}
