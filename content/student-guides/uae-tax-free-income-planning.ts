import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const uaeTaxFreeIncomePlanning: ReviewedGuide = {
  slug: 'uae-tax-free-income-planning',
  title: 'Planning a UAE student budget around work, fees and transfers',
  description: 'Build a plan from confirmed funds, estimate actual living costs and check work permits and tax responsibilities before counting on wages.',
  topic: 'Contracts and payments',
  reviewedOn: '2026-11-27',
  related: ['uae-visa-sponsorship', 'uae-housing-furnished', 'student-budget', 'real-cost-abroad'],
  body: {
    introduction: `A claim about tax says little about what will be in your account on rent day. Students planning to live in the United Arab Emirates need a budget that covers confirmed costs even if work starts later than expected. Use this guide to separate dependable funding, local payments, work permission and any financial responsibilities in another jurisdiction.`,
    takeaways: [
      'Build the base budget from confirmed funds and written charges.',
      'Verify the work permission and contract for the specific job before counting its income.',
      'Check tax and reporting obligations that apply to your situation in each relevant jurisdiction.',
      'Plan transfer dates and fees around when the provider must receive local currency.',
    ],
    sections: [
      {
        id: 'make-a-base-budget',
        title: 'Build a base budget without unconfirmed work',
        prose: `Verify the course and fees with your institution. Ask when payments are due, what is included and whether any visa, health or insurance payments are separate. For accommodation, check the dates, upfront amount, whether cooling or utility charges are covered, transport and a short stay if key dates do not line up. Add food, communications, local travel and ordinary expenses using local prices and your own estimates.

As an illustration, suppose monthly rent is AED 2,650, housing services cost AED 260, local travel AED 220, essentials AED 800 and communications AED 100. The example requires AED 4,030 a month before course and one-time costs. If confirmed support gives you AED 3,750 a month, the monthly gap is AED 280. Before taking on the obligation, adjust the confirmed funding or costs, or choose another arrangement you can afford. An award that arrives monthly may still leave a shortfall if rent is due in fewer, larger instalments.

Keep the initial deposit and a reserve on separate lines. A deposit you could get back later still requires cleared funds at the start. Set an amount you can reach if a flight, work start or family payment slips. Check how payments sent in a different currency reach the provider and which party pays fees. A supporter can help track amount, access and timing without a shared account login.`,
      },
      {
        id: 'verify-work-permission-and-costs',
        title: 'Verify work permission, hours and the net effect on your budget',
        prose: `Ask the university and prospective employer which authority and process apply to the role. Article 6 of the UAE federal labour law sets out work-permit requirements. Ask which process applies to the employment or training on offer. Student residence, a written offer and permission to begin work are separate. Check which steps are required and who submits documents. Verify permission before starting, and check how hours fit actual teaching, placement and travel.

Use a written offer to assess what can reliably go into your budget. Check the pay period, first payment date, guaranteed hours and costs associated with the work. A student who must pay for a late return or eat away from home should subtract those expected costs when estimating what is left. Keep income that depends on a job you have not secured as a separate scenario. Check what happens to the housing budget if work ends or your study dates change.`,
        sources: [s.uaeEmployment.id, s.uaeStudentResidence.id],
      },
      {
        id: 'check-tax-and-transfer-terms',
        title: 'Check tax and payments for your actual circumstances',
        prose: `The UAE Government says it does not levy income tax on individuals and describes other taxes that can affect prices or other activities. That general statement does not settle your position in another country. Consider whether tax residence or reporting requirements elsewhere apply. Check the official information for each relevant jurisdiction and seek qualified help if your circumstances include cross-border earnings, self-employment, investments or uncertainty about tax residence. A housing or work adviser cannot establish tax treatment from a rent or job offer alone.

For transfers, compare the AED amount received, any fee deducted by the sender or receiver and the time at which funds can be used. Ask the provider whether it accepts the proposed method or will credit the amount paid against your rent. Verify changes in the payee separately. Save receipts and use a cautious rate assumption when someone pays from another currency. Revisit the budget when you know the actual amount, instead of assuming a lower cost based on an advertisement about exchange fees or tax.`,
        sources: [s.uaeTaxation.id],
      },
    ],
    checklist: [
      'Collect confirmed course, housing, utility and travel amounts.',
      'List incoming funds on the day they become accessible.',
      'Set aside up-front payments and an accessible reserve.',
      'Check role-specific permissions, pay and timing before including wages.',
      'Verify any relevant cross-border obligations and transfer charges.',
    ],
    faq: [
      { question: 'Can I assume every student can take a part-time job?', answer: 'No. Check the role, employer, status and relevant authority before accepting or starting work.', sources: [s.uaeEmployment.id] },
      { question: 'Does studying in the UAE remove reporting duties abroad?', answer: 'Check the obligations for your actual tax residence and circumstances. The UAE’s approach to individual income tax does not establish the rules of another jurisdiction.', sources: [s.uaeTaxation.id] },
      { question: 'What if I cannot cover the rent until the first salary?', answer: 'Ask when the first payment will actually be available. Find confirmed funding or a housing schedule you can afford without relying on unconfirmed wages.' },
    ],
    sources: [s.uaeEmployment, s.uaeStudentResidence, s.uaeTaxation],
  },
}
