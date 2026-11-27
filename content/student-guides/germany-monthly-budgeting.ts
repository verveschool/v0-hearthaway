import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const germanyMonthlyBudgeting: ReviewedGuide = {
  slug: 'germany-monthly-budgeting',
  title: 'How to build a monthly student budget in Germany',
  description: 'Plan warm rent, separate utilities, university costs, transport, insurance and your first months before counting on job income.',
  topic: 'Contracts and payments',
  reviewedOn: '2026-11-27',
  related: ['germany-studentenwerk-housing', 'germany-tenancy-law-deposits', 'student-budget', 'real-cost-abroad'],
  body: {
    introduction: `A German housing quote may show a basic rent and a higher figure with some operating costs. The full monthly budget also depends on your specific university, transport entitlement, health coverage and what you need to pay up front. This guide helps you estimate those costs from your own documents and keep immigration evidence and potential job income on separate lines.`,
    takeaways: [
      'Build your budget from actual written basic and warm rent, and identify separate services.',
      'Read university charges and transport entitlement for your course and semester.',
      'Budget health coverage, moving costs and deposits separately.',
      'Check the status of any restricted funds and the conditions on student work.',
    ],
    sections: [
      {
        id: 'start-with-your-housing-quote',
        title: 'Turn your housing quote into monthly outgoings',
        prose: `Ask what is included in basic rent, or Kaltmiete, and what operating costs are added in the quoted Warmmiete. Look for a separate listing of heating, water and shared expenses, and ask which costs may be reconciled after the billing period. Check whether internet, electricity and laundry are included. If you share, ask how charges are divided and who has the service account. Record the due date and security deposit separately, and include temporary accommodation or overlap if you do not have a room for the entire semester.

For an illustrative budget, suppose warm rent is €585 and excludes €32 electricity and €18 internet. Planned housing outflow is €635 a month. If you budget €230 for food and home supplies, €35 for additional travel, €25 for laundry and communications and €135 for health coverage, that makes €1,060 a month for those assumed costs. Tuition and semester contributions are separate, and the figures do not predict costs in any city. Confirm each quote and allow for changes at the end of any billing period.`,
        sources: [s.housingGermany.id, s.germanOperatingCosts.id],
      },
      {
        id: 'price-the-university-and-local-services',
        title: 'Check your course fees, transport and healthcare costs',
        prose: `Request current tuition and semester charges for your exact programme and student status. DAAD explains the difference between tuition, semester contributions and living costs, and describes circumstances where tuition can apply. Check the institution's invoice or fee page before you assume that public study is free. If a contribution includes a transport ticket or makes you eligible to buy one, check its start date, validity and which services are outside it. Price your actual travel and avoid double-counting part of the ticket as a second monthly expense.

Check applicable health insurance and its dates through your institution, insurer and official sources. Compare what is paid monthly and what must be ready before enrolment. Put course supplies and other irregular payments into the months they are due. For example, a €240 semester payment might average €40 per month over six months. You still need €240 when it is due. Save for it in advance rather than treating the calculated average as the next payment.`,
        sources: [s.daadCosts.id],
      },
      {
        id: 'test-access-to-funds',
        title: 'Keep immigration evidence and accessible funding apart',
        prose: `If you need to show funds for a study visa, check the official route and the amount, documents and funding types that apply. Germany’s federal guidance describes options such as a blocked account, a scholarship or a declaration of commitment in relevant cases. If money is held in a restricted account, ask the provider when withdrawals can start, how much is released and how you can pay expenses that arrive first. A sufficient evidence balance may coexist with a cash shortage for a room deposit and first rent.

Put the deposit and first rent on the calendar next to the first day you can withdraw from a blocked account. If the housing payments come first, ask the account provider about access dates and the landlord about due dates before you agree to the room.

Potential work income should be a separate scenario until your permissions, job, pay and schedule are confirmed. The federal study-and-work guidance sets out how rules differ by status and work arrangement. Check what applies to the role and whether hours, insurance or payment dates change your plan. If funds fall short, ask the international office or student services about advice and any help that actually applies. Use the next two months of payments and ask about changes before deadlines pass.`,
        sources: [s.germanVisaStudy.id, s.germanStudyAndWork.id, s.germanStudentSupport.id],
      },
    ],
    checklist: [
      'Confirm basic rent, operating costs, separate bills and deposit.',
      'Record the actual course fees, contribution dates and transport entitlement.',
      'Check insurance eligibility, effective date and payment schedule.',
      'Check access dates for restricted funds and plan a bridge if needed.',
      'Use a conservative budget without unconfirmed work income.',
      'Update the plan after the first bills and put later semester payments on the calendar.',
    ],
    faq: [
      { question: 'Does Warmmiete include all monthly housing costs?', answer: 'Only the written breakdown tells you what is included. Ask about power, internet and any end-of-period reconciliation.', sources: [s.housingGermany.id, s.germanOperatingCosts.id] },
      { question: 'Does a blocked account amount equal my monthly cost?', answer: 'No. It can serve an evidence requirement and release funds on a schedule. Plan living costs and payment deadlines separately.', sources: [s.germanVisaStudy.id] },
      { question: 'Is a semester contribution the same as tuition?', answer: 'They cover different items. Check the fee schedule for your programme and the services included in each charge.', sources: [s.daadCosts.id] },
    ],
    sources: [s.housingGermany, s.germanOperatingCosts, s.daadCosts, s.germanVisaStudy, s.germanStudyAndWork, s.germanStudentSupport],
  },
}
