import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const netherlandsStudentHousing: ReviewedGuide = {
  slug: 'netherlands-student-housing',
  title: 'Finding student housing in the Netherlands and registering your address',
  description: 'Plan a housing search, assess written rental terms and basic rent, and check municipal registration requirements before committing.',
  topic: 'Destination housing',
  reviewedOn: '2026-11-27',
  related: ['avoid-scams', 'choose-accommodation', 'tenancy-agreement', 'first-week'],
  body: {
    introduction: `An offer to study in the Netherlands and a place to live are separate decisions. Start the housing search early enough to assess the room, check who can let it and confirm whether the address works for your registration. Study in NL describes a housing shortage and recommends arranging a place before arriving. That guidance does not predict availability at your particular institution or in any one neighbourhood.

This guide is for students and supporters weighing university-linked accommodation, a private room or a self-contained flat. It explains how to keep the housing deadline separate from admission, what the Dutch government says about written rental terms and deposits, and when to check municipal registration.`,
    takeaways: [
      'Ask your institution what it can arrange for your programme and make a separate backup plan.',
      'Verify the exact address, provider, agreement and payment recipient.',
      'Compare basic rent, service costs, deposit and the correct rent-check category.',
      'Ask the municipality which registration route applies to the actual home and duration.',
    ],
    sections: [
      {
        id: 'plan-the-search',
        title: 'Plan a parallel search around the correct campus and dates',
        prose: `Check whether the university has its own housing, a room allocation through a separate provider or a list of places for you to research. Ask which groups can apply, when applications open, how a confirmed offer is made and when you must accept. Save the actual campus address and start date. If the university arrangement is unconfirmed or will not cover the full period, look separately for a room or an interim stay. Do not assume an admission letter or place on an allocation list reserves housing.

Compare several reachable neighbourhoods rather than relying on the city name in the advert. Check the trip to the exact campus early and late, including the cost of transport or bicycle storage if relevant. Ask whether short-term options cover registration needs and whether you can remain until the room you plan to move into is usable. Set a date before travel to decide whether you have a verified plan. If you do not, ask the institution about the consequences for your start date and what other options exist.`,
        sources: [s.dutchStudentHousing.id],
      },
      {
        id: 'check-the-agreement',
        title: 'Read the actual rental terms and verify who can offer the room',
        prose: `Confirm address, room allocation, permission to use shared areas and the legal name of the landlord or operator. For a sublet or shared home, ask who can authorise it, which other occupiers are permitted and who collects money. A genuine address and plausible pictures are not proof of authority. Where possible, arrange a viewing or ask someone you trust to see the room. Keep the exact dates, prices and included services in the written terms and verify payment details independently.

Ask whether the agreement is fixed or indefinite and what type of fixed agreement is available in your particular case. The Dutch government guidance distinguishes contracts and describes specific temporary arrangements that can apply to some international students. The notice and expiry process can differ. Read the rules for the actual agreement and its date. Check when you can leave, how notice is given and what happens if you transfer to another programme or arrive late. An advertised semester length does not settle your notice rights or responsibilities by itself.`,
        sources: [s.dutchStudentHousing.id, s.dutchRentedHousing.id],
      },
      {
        id: 'compare-basic-rent-and-charges',
        title: 'Check the basic rent, service charges and deposit',
        prose: `Ask the provider to distinguish the rent for occupation from any separately charged services or utilities. When a listing uses one total amount, request the breakdown and find out how any advance will be reconciled. The Dutch Rent Tribunal (Huurcommissie) provides distinct Rent Checks for self-contained accommodation and shared rooms. Use the one that applies to the room and its facilities. Its outcome depends on the property details and the appropriate rules. Ask the tribunal or municipality what help is available if the price or service charges are disputed.

Government.nl’s current tenant guide says agreements dated 1 July 2023 onwards have a maximum deposit of two months’ basic rent, and sets out the return and deduction rules. For an illustration, €595 basic rent plus €110 in separate service charges gives €705 per month. If the current deposit rule applies, twice €595 is €1,190. The separately agreed service charge is not the base for that calculation. If you also need €705 for the first month, the example immediate outlay is €1,895. Verify the amount, recipient and agreement date before paying. Keep an inventory and receipt and save the notice and handover terms.`,
        sources: [s.dutchTenantPlan.id, s.dutchRentCheck.id],
      },
      {
        id: 'confirm-municipal-registration',
        title: 'Confirm BRP or non-resident registration before relying on the address',
        prose: `The Dutch government describes registering as a resident in the Personal Records Database (BRP) if you will live in the Netherlands for more than four months. It says to register with the municipality within five days of arrival, and explains circumstances where registration cannot happen immediately, including residence or identity checks. It also describes non-resident registration (RNI) for people who live abroad or will stay for less than four months. Ask the municipality how the rules apply at the duration boundary, for particular residence permissions and if you will move between temporary and permanent housing.

Confirm which proof of address or occupancy is accepted and who can supply it. If a listing says registration is unavailable, ask why and take the actual details to the municipality before booking. Do not assume a correspondence address will work for you or that a room provider can resolve the official process. Check available appointment times and any coordinated university registration route. Keep the applicable appointment, documents and confirmation securely. Municipal residence registration and any immigration permission or university enrolment serve separate purposes.`,
        sources: [s.dutchMunicipalRegistration.id, s.dutchAfterArrival.id],
      },
    ],
    checklist: [
      'Check university allocation deadlines and build a verified parallel option.',
      'Test the complete commute to the teaching campus and confirm all dates.',
      'Verify the room, agreement, letting authority and payment recipient.',
      'Separate basic rent, service costs and deposit and use the correct Rent Check.',
      'Confirm the municipality’s registration requirements and usable address evidence.',
      'Keep signed terms, receipts and room condition evidence.',
    ],
    faq: [
      { question: 'Will a university offer guarantee me a room?', answer: 'Confirm the housing process with the institution. You should have a separate written allocation or housing offer before relying on occupancy.', sources: [s.dutchStudentHousing.id] },
      { question: 'Can I register through a temporary address?', answer: 'Ask the municipality what proof it needs and whether the arrangement and length of stay qualify. Confirm what applies before accepting a place advertised as unsuitable for registration.', sources: [s.dutchMunicipalRegistration.id] },
      { question: 'Is the Rent Check the same for a studio and a room in a flat?', answer: 'The Huurcommissie offers different checks for self-contained and shared accommodation. Review the actual entrances and facilities to choose the correct one.', sources: [s.dutchRentCheck.id] },
    ],
    sources: [s.dutchStudentHousing, s.dutchRentedHousing, s.dutchTenantPlan, s.dutchRentCheck, s.dutchMunicipalRegistration, s.dutchAfterArrival],
  },
}
