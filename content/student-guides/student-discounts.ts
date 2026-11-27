import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const studentDiscounts: ReviewedGuide = {
  slug: 'student-discounts',
  title: 'How to check whether a student discount will save you money',
  description: 'Compare eligibility, fees and exclusions for student fares and subscriptions, and use a break-even calculation before buying.',
  topic: 'Student life',
  reviewedOn: '2026-11-27',
  related: ['cost-of-living', 'student-budget', 'hidden-costs'],
  body: {
    introduction: `A discount saves money only if you can use it on something you would otherwise buy. A discounted pass can still cost more than individual fares. A student subscription can start cheaply and renew at a different price. This guide helps you compare actual savings using your study dates, local trips and services you already need.`,
    takeaways: [
      'Verify eligibility and included purchases with the operator or service.',
      'Compare the total price, including joining fees and the items the discount excludes.',
      'Check renewal and cancellation dates before signing up.',
      'Use the institution’s existing access before buying a duplicate service.',
    ],
    sections: [
      {
        id: 'confirm-eligibility',
        title: 'Check the rule that grants the discount',
        prose: `Find the operator’s or provider’s current terms. Check age, length and type of course, full-time status, residence, participating institutions and document formats. A student email is useful in some cases, whereas other schemes need a dated letter or a particular card. Ask when the benefit starts and how long it remains valid. For public transport, check which services, zones, payment products and times are eligible. Check how to carry proof in case an inspector asks and what works if your phone is unavailable.

Transport for London’s 18+ Student Oyster information and the 16–25 Railcard FAQs explain different UK travel products and application rules. For example, the Railcard’s FAQs describe a route for eligible mature students, alongside age-based eligibility, and explain restrictions. Before choosing a product, price your actual journeys on the operator’s site. Do not assume a rail product applies to every local fare, or that a discount for a season ticket automatically applies to a one-off journey.`,
        sources: [s.londonStudentFares.id, s.ukRailcard.id],
      },
      {
        id: 'work-out-the-break-even-point',
        title: 'Calculate savings after the fee and any excluded journeys',
        prose: `Write down what you expect to buy during the validity period. Put in the full price and the price available under the stated conditions. Count only uses you can reasonably expect. Then subtract the joining or card fee, plus any extra payment created by the product. A discount of several pounds on one eligible journey may still leave the card unused during vacation. If a route combines two operators, include any transfer or second fare that the first pass does not cover.

Here is a simple hypothetical comparison. A card costs £24 and saves £3 on each eligible trip. Eight eligible uses recover the card price. If you expect only five, you save £15 on fares and pay £24 for the card, leaving a net £9 cost. If you have 11 expected eligible trips, £33 in savings minus the fee leaves £9. Make the same calculation with the dates you will actually travel. Compare a normal ticket, any cap, a pass and the discount together, and include trips outside the benefit. Treat uncertain future travel as a separate scenario.`,
      },
      {
        id: 'avoid-double-purchases-and-renewals',
        title: 'Check existing access and what happens after the student rate ends',
        prose: `Ask the university what it already supplies through the library, computer labs, course accounts or service licences. The correct tool may be available at no extra cost for a required project. A separately purchased plan might cover a feature you need, or only duplicate what you have. Check continuity after your course or after changing institutions, including how to export work or keep records. For phone plans, memberships or software, compare the minimum term, future price and notice period. Ask whether a new verification is required and mark its expiry in your calendar.

If approval is still pending for a travel discount, budget the ordinary fare for the first few weeks. Compare the pass again once you know your real timetable and when the discount begins.

In some places, student status can also affect official housing-related charges. England’s Council Tax guidance, for example, distinguishes full-time student households and mixed households, and describes eligibility and exemptions. Check your own authority and address before assuming what you will pay. Such rules have their own evidence requirements and may not align with a commercial student card. Keep the decision or reference so you can update it if your household or course status changes.`,
        sources: [s.englandCouncilTax.id],
      },
    ],
    checklist: [
      'Verify eligibility, proof, validity dates and renewal terms.',
      'Check which purchases or journeys are eligible and what they cost.',
      'Calculate the break-even point using realistic eligible uses.',
      'Check whether the university already supplies the service.',
      'Review regular payments and cancel or change plans where appropriate.',
    ],
    faq: [
      { question: 'Is a university ID enough for every discount?', answer: 'Check the specific scheme. It may accept a student ID, require an institution to certify status or use its own card and identity evidence.' },
      { question: 'What if I am an older student?', answer: 'Some schemes cover eligible mature students. Check their official terms, including course rules and acceptable evidence.', sources: [s.ukRailcard.id] },
      { question: 'Should I count the saving in my budget before buying?', answer: 'Use savings only for purchases you expect to make and where your eligibility is confirmed. Keep the full-price estimate for uncertain items.' },
    ],
    sources: [s.londonStudentFares, s.ukRailcard, s.englandCouncilTax],
  },
}
