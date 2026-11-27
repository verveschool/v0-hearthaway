import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const germanyStudentenwerkHousing: ReviewedGuide = {
  slug: 'germany-studentenwerk-housing',
  title: 'Student residences and shared flats in Germany',
  description: 'Apply for a local student residence, compare it with a shared flat and check which address documentation the provider will supply.',
  topic: 'Destination housing',
  reviewedOn: '2026-11-27',
  related: ['germany-tenancy-law-deposits', 'germany-monthly-budgeting', 'avoid-scams', 'first-week'],
  body: {
    introduction: `A place in a student residence and a room in a private shared flat can both work for a semester or longer. The application route, contract and move-in documents are different. Start both searches while you have time to compare confirmed offers. In Germany, a Studierendenwerk is a local student services organisation, and a Wohngemeinschaft, usually abbreviated to WG, is a shared flat. Knowing which one you are dealing with helps you ask who will assign the room, who can sign and who can confirm your move-in.

This guide is for students and supporters deciding between these routes. It focuses on offers you can verify, payment and access dates, and the address records you may need soon after moving.`,
    takeaways: [
      'Find the Studierendenwerk that serves your campus and confirm its local application and allocation policy.',
      'In a shared flat, check whether you would sign with the landlord, a main tenant or other tenants.',
      'Ask who can confirm your actual address for local registration when required.',
      'Keep a genuine backup while the application or room offer is unconfirmed.',
    ],
    sections: [
      {
        id: 'apply-to-the-right-organisation',
        title: 'Work out which local student service accepts your application',
        prose: `Check the university’s housing information and identify the Studierendenwerk for your actual study location. The national association directs students to their local organisation and explains that allocation criteria vary. Some providers may consider the order of applications, use other allocation methods or have a particular procedure for incoming exchange students. Ask whether you can apply with an offer, what proof of enrolment is needed later and which dates and room formats you can request.

Ask when applications open, what happens after submitting and whether you have to respond periodically to remain on a list. An acknowledgement confirms an application step. Wait for a usable room offer with dates and costs before treating that place as confirmed. If your university offers a specific programme with housing, check its own eligibility and written terms. Find out whether you can list options across several residences and which priorities you can record, including an accessible room or family housing if available.

Compare location in relation to your timetable. Some residences may put you close to one campus and far from a placement, studio or another department. Look for the actual building, transit and service hours. Ask whether your room remains available between semesters and if there are restrictions on visitors or overnight guests. Add the written service terms to your housing comparison.`,
        sources: [s.germanResidenceApplications.id, s.housingGermany.id],
      },
      {
        id: 'check-a-shared-flat-offer',
        title: 'Read a WG offer as both a contract and a household arrangement',
        prose: `Ask who is giving you the right to live there. You might contract with the landlord for a room, sign a joint agreement or sublet from the main tenant. Establish which arrangement is offered and ask about any permissions needed for a sublet. Get the agreed room, date, charge, included facilities and notice in writing. Ask who holds the security deposit and who will give you confirmation of the address. Do not rely on the fact that someone knows the existing occupants or can show the room.

Meet the other occupants when possible. Ask how shared areas, cooking, laundry, heating and cleaning work and whose name is on the bills. Who pays first, how is the contribution measured and what changes when someone moves? Check whether you can use shared space while someone works or studies and what a normal week is like. Agree a method for common expenses without assuming the provider will enforce an informal housemate agreement.

Compare basic rent and the amount payable with operating costs. Ask which services are separately paid and which are an advance that could be reconciled later. Confirm whether the room comes furnished and who owns the inventory. If asked to pay before you have confirmed the offer and the authority of the payee, verify through an independent route. Keep the same caution when an outgoing occupant asks you to buy furniture separately from the rent.`,
        sources: [s.housingGermany.id, s.germanHousingSearch.id],
      },
      {
        id: 'prepare-address-registration',
        title: 'Plan the required address documentation before committing',
        prose: `German federal housing guidance explains Anmeldung, or address registration, with the local residents' registration office. The general rule for moving into a dwelling uses a two-week registration period. Sections 27 and 29 of the Federal Act on Registration provide different rules for some temporary arrangements and accommodation establishments. Confirm what applies to you with the relevant local office, especially if you will move between addresses or begin in short-term accommodation.

Ask which person will issue the Wohnungsgeberbestätigung, the accommodation provider's confirmation that you moved into the dwelling, and when it will be available. The lease and that confirmation serve different purposes. Check your municipality's forms and whether an appointment, online procedure or original identity document is required. If a listing says the address cannot be registered, find out the reason and check with the authority before you rely on the room for your circumstances. Never accept an offer to register at an address where you will not actually live.

Keep the registration confirmation securely and use its correct address in later administrative steps where needed. Treat it separately from university enrolment and any residence permit you need. Ask the university or its student services office how to find help if instructions are unclear.`,
        sources: [s.housingGermany.id, s.germanRegistrationLaw.id],
      },
      {
        id: 'make-a-backup-plan',
        title: 'Make a backup that covers the gap without a second obligation',
        prose: `Choose a date to act if the residence still has no offer. Check temporary accommodation, other residences or legitimate share options in parallel. Ask whether a new agreement releases you if the preferred residence later offers a place. If you need to choose quickly, compare confirmed term costs and the maximum amount you might pay if two agreements overlap.

For example, suppose eight temporary nights cost €400, moving luggage and transport cost €35, and a preferred room has an uncertain start date. You need access to at least €435 for the gap plus any deposit and first payment for the confirmed room. Ask the local authority how temporary housing affects the address process for your case. Review the new price and agreement each time dates change rather than relying on an early quotation. Keep evidence of the condition, keys, current rent terms and responsibility for repairs once you move in.`,
        sources: [s.germanHousingSearch.id, s.housingGermany.id],
      },
    ],
    checklist: [
      'Confirm the teaching campus and the local Studierendenwerk.',
      'Check application eligibility, allocation, room type and dates.',
      'Verify the person or organisation that can offer a shared room.',
      'Compare base rent, operating costs, utility arrangements and furniture.',
      'Confirm address registration needs and who will issue the confirmation.',
      'Leave an affordable, verified backup and document the room when you move in.',
    ],
    faq: [
      { question: 'Will applying to a Studierendenwerk fix my move-in date?', answer: 'Ask about the local allocation process and wait for a confirmed offer with dates. Choose a backup before booking non-flexible travel around an unconfirmed place.', sources: [s.germanResidenceApplications.id] },
      { question: 'Can I use a WG address for registration?', answer: 'Ask who can issue the accommodation confirmation and check the local registration process for the actual address and arrangement.', sources: [s.housingGermany.id, s.germanRegistrationLaw.id] },
      { question: 'Is a shared flat always cheaper?', answer: 'Compare confirmed written terms. Add operating charges, separate bills, travel, furnishing and whether you must pay for more weeks than you need.' },
    ],
    sources: [s.germanResidenceApplications, s.germanHousingSearch, s.housingGermany, s.germanRegistrationLaw],
  },
}
