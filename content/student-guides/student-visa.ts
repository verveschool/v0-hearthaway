import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const studentVisa: ReviewedGuide = {
  slug: 'student-visa',
  title: 'How to check financial evidence for a student visa',
  description: 'Separate visa evidence from your living budget and check the right application and arrival steps for your route.',
  topic: 'Before departure',
  reviewedOn: '2026-11-27',
  related: ['pre-arrival-checklist', 'real-cost-abroad', 'first-week', 'uae-visa-sponsorship'],
  body: {
    introduction: `A family might have enough money to pay tuition and living expenses but still lack the type of record an immigration authority asks for. The reverse is also possible: an applicant might meet the published visa requirement and have too little left after paying deposits, flights and the first month abroad. Treat those as separate decisions.

This guide is for students and supporters deciding when to arrange funds or submit an application. It explains how to build an evidence file and uses examples from the United Kingdom, Ireland, Australia and France. Use the authority's instructions for your nationality, place of application and exact route. Your university can explain how its documents and payments work. A question about your individual immigration eligibility may need qualified advice.`,
    takeaways: [
      'Check whether your specific route requires evidence at application, at entry, or during residence registration.',
      'Record the accepted funding type, account holder, dates, currency and proof you need for each part of the requirement.',
      'Keep payable living costs, commitments made before travel and any restricted evidence funds in separate plans.',
      'Follow visa grant and arrival instructions even when you did not need to attach financial documents to the application.',
    ],
    sections: [
      {
        id: 'identify-the-route',
        title: 'Find the right instructions before moving money',
        prose: `Confirm the name of the immigration route and what gives you permission to study. Treatment can vary with your nationality, current residence, length and level of study, prior immigration permission, and any partner or child applying with you. The official guide, route-specific document tool and any instructions from the consulate handling your case are more useful than a general search for visa bank balance.

Build a short evidence worksheet. Give tuition, living costs, travel and accompanying family members separate rows if your route includes them. Under each amount, record the authority's rule, the date you checked it and where the money can come from. Mark what the university has already recorded as paid. If the authority allows credits for particular payments, verify the kind, limit and required proof. A receipt from a private landlord may be valid housing documentation without reducing a financial requirement.

Record when the proof must be produced and who will supply it. Identify any deadline for requesting a signed bank printout, loan letter, institutional funding statement or translation. Keep the official instructions with your worksheet. Revisit them before sending the application, especially if your course, sponsor, family plans or filing date changes.`,
      },
      {
        id: 'compare-funding-types',
        title: 'Match the evidence to the way you are funded',
        prose: `Bank funds require a trail that shows who holds them, when they were available and whether you can use them. Some routes specify which relatives can hold money for a student and what relationship and consent evidence to submit. A general promise from someone who wants to help may need documentary support or may fall outside the permitted routes. Check how an authority treats recently moved funds, accounts with withdrawal restrictions and investments. Keep ordinary records that explain genuine transfers.

A qualifying student loan is assessed on its own terms. Ask the lender for the contents required by the destination, including the amount, who receives it, when it is available and any release conditions. A loan approval email and a signed lender letter may serve different purposes. Official sponsorship involves an eligible organisation and confirmation of precisely what it covers. If funding pays fees only or covers some months, calculate the uncovered amount and check how you can document it. Do not count the same pot twice across tuition, dependants or living costs.

For cash flow, note the date the loan or award will be released, where it will go and how you will pay for essentials before then. A loan accepted for visa evidence can have a disbursement schedule that does not match the provider's deposit deadline. Discuss a feasible plan with the accommodation provider and university rather than committing based on the total award alone.`,
        sources: [s.ukVisaFunds.id, s.australiaVisa.id, s.irelandVisaFunds.id],
      },
      {
        id: 'uk-student-route',
        title: 'United Kingdom: check the CAS and the bank-fund dates',
        prose: `For the UK Student route, start with the Confirmation of Acceptance for Studies (CAS), which records relevant course fees and study details. GOV.UK sets distinct monthly maintenance amounts for study in London and outside London, for up to nine months. Use the official amount for your course location. Check allowed offsets and any separate requirements if dependants can apply. The route includes circumstances in which you need not submit financial evidence upfront. The nationality-based document arrangement can still allow UKVI to ask for evidence, so read the eligibility and evidence instructions rather than assuming the underlying requirement disappears.

Where the personal bank-funds rule applies, the required balance usually has to be held for at least 28 consecutive days and the end of the evidence period must be within 31 days before the application. The lowest balance in the relevant period matters, rather than just the last day's balance. Keep a cushion for routine deductions and currency changes. Check exactly what the official guidance accepts from a parent or other account holder and which documents accompany the statement.

Illustration using the published outside-London rate checked on the review date: if nine months of maintenance apply, £1,171 × 9 is £10,539. If the relevant outstanding tuition shown on the CAS is £6,000, the example total is £16,539 before any allowed offset or additional requirement. Paying £1,000 from the account towards an unrelated accommodation deposit could take the balance below the intended evidence amount. Recheck the official rule before treating a housing receipt as an offset. This arithmetic illustrates the evidence calculation, while the separate personal budget still needs full rent, utilities and other costs.`,
        sources: [s.ukVisaAmounts.id, s.ukVisaFunds.id],
      },
      {
        id: 'ireland-student-finances',
        title: 'Ireland: separate the visa step from registration',
        prose: `Immigration Service Delivery explains when a student must show access to funds, including how the evidence stage differs for students who need a visa and those who do not. Check the course duration and the guidance for your situation. The finance page also covers statements, support from other people and the education bond alternative for eligible degree students. A bond used for immigration evidence has a different purpose from a security deposit for renting a room.

Build the next step into the plan even if you did not need an entry visa. Students required to register first-time permission should follow the instructions they are given and the procedure from Immigration Service Delivery. Keep the approved entry and enrolment evidence, proof of finance or insurance where needed and evidence of the registration appointment. If you are unsure what applies to a short course or a change of immigration status, check the authority's route before paying or making travel commitments.`,
        sources: [s.irelandVisaFunds.id, s.irelandRegistration.id],
      },
      {
        id: 'australia-financial-capacity',
        title: 'Australia: use the subclass 500 document checklist',
        prose: `Use the Department of Home Affairs document checklist with your details and educational provider to identify documents to attach. If the checklist requires financial-capacity evidence, include it when you apply. Home Affairs can request it during processing. The subclass 500 guidance explains accepted categories such as deposits with a financial institution, qualifying loans and scholarships, and how to show genuine access. Check the current rule for travel, course fees, living expenses, and family or school costs where applicable, using the rule's duration and treatment of payments already made.

Confirm your enrolment and health-cover documentation separately. Review the current guidance for the applicant and any family members on the application. A person joining later may have additional evidence requirements. Keep enough time to request the correct payment or loan records rather than relying on a screenshot with no account or issuer details.`,
        sources: [s.australiaVisa.id, s.australiaVisaChecklist.id],
      },
      {
        id: 'france-student-route',
        title: 'France: use the local document list and the visa endorsement',
        prose: `Start on France-Visas and check the process for your nationality, application location and course. For applicants within the relevant Études en France procedure, follow its institution and application sequence. Use the document list for your own application. A short course can have a different route and longer stays can carry different post-arrival formalities.

Read the wording of the visa you receive. France-Visas says a long-stay visa equivalent to a residence permit, or VLS-TS, must be validated within three months of arriving in France. A long-stay visa with an instruction to apply for a residence permit follows a different procedure, which the same arrival guide explains. Obtain an address record you can use for the required process and retain the confirmation. Avoid assuming one student's sequence or document list applies to you because you study at the same institution.`,
        sources: [s.franceVisa.id, s.franceArrival.id],
      },
      {
        id: 'protect-travel-and-housing',
        title: 'After submitting, keep housing and travel adaptable',
        prose: `Separate decisions you can reverse from those that commit you to rent or a flight. Read the exact cancellation clause for refusal, a late decision or a change of intake. A policy covering a refusal may still leave you liable if the result is pending at the start date. Ask what evidence, channel and deadline the provider uses and keep their answer with the agreement.

Keep a simple decision date: if you have no grant by that date, notify your university, check arrival alternatives and reprice housing and flights. Once permission comes through, check your passport and grant details against the booking. For UK eVisa travel, UKVI says to check your current travel document and the matching passenger details. In every destination, distinguish what the grant allows from what your carrier or border authority asks you to produce. Keep access to supportive documents while you travel and save the post-arrival instructions separately.`,
        sources: [s.ukTravelEvisa.id, s.franceArrival.id],
      },
    ],
    checklist: [
      'Identify the exact immigration route and confirm the instructions for your circumstances.',
      'List amounts, allowable funds, document format and evidence dates.',
      'Check eligibility for exemptions and what an exemption removes.',
      'Compare application evidence with an independent cash-flow plan.',
      'Verify the effect of paying rent or tuition before your evidence window ends.',
      'Record the travel checks, entry conditions and any post-arrival steps.',
    ],
    faq: [
      { question: 'Do all students have to keep bank funds for 28 days?', answer: 'No. The 28-day example applies to the relevant UK Student bank-funds route. Qualifying loans and official sponsorship have their own evidence requirements. Other destinations use their own rules.', sources: [s.ukVisaFunds.id] },
      { question: 'What if a family member has promised to pay but the money is still in their account?', answer: 'Check whether your route accepts funds held by that person, what consent and relationship evidence it needs, and how to demonstrate access to the funds.' },
      { question: 'Can a deposit count towards the visa amount?', answer: 'Only rely on an offset if your authority lists that payment as eligible for your route and you have the required proof. A room deposit can also reduce the balance available to show.' },
      { question: 'Is my visa maintenance figure a monthly spending target?', answer: 'Use the amount for its stated immigration purpose. Build your living budget using your own rent, travel, healthcare, food and arrival costs.' },
    ],
    sources: [s.ukVisaFunds, s.ukVisaAmounts, s.ukTravelEvisa, s.irelandVisaFunds, s.irelandRegistration, s.australiaVisa, s.australiaVisaChecklist, s.franceVisa, s.franceArrival],
  },
}
