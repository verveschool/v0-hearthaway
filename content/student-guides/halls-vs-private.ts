import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const hallsVsPrivate: ReviewedGuide = {
  slug: 'halls-vs-private',
  title: 'Student halls, private rentals, studios and homestays explained',
  description: 'Compare housing formats by control, costs, practical support, shared facilities and the kind of agreement you sign.',
  topic: 'Choosing housing',
  reviewedOn: '2026-11-27',
  related: ['choose-accommodation', 'accommodation-costs', 'tenancy-agreement', 'accessible-student-housing'],
  body: {
    introduction: `Your housing search might start with “halls or private?” That hides several different choices. A privately operated residence can provide a private bedroom, shared flat or self-contained studio. An ordinary private rental can be furnished or unfurnished and may involve a joint agreement. A homestay can offer help settling in and also come with household routines you need to follow.

Use this guide to compare the work you take on yourself, the limits of the provider's support and the amount you commit for the dates you need. A student's year of study alone gives little information about those priorities.`,
    takeaways: [
      'Check who controls the offer, which space is yours and whom to contact for help.',
      'Use the written agreement and actual services when comparing housing types.',
      'A studio describes a layout and can be offered in several types of housing.',
      'Compare full cost, contract dates and how your household would work on a normal day.',
    ],
    sections: [
      {
        id: 'run-by-a-university-or-provider',
        title: 'Understand university halls and managed student residences',
        prose: `A hall can be provided by your university, another institution or a specialist operator. Find out whether you apply through the university or sign a separate provider contract. Ask who makes the allocation, whether you choose a room or only a preference, which type of contact is available after hours, and whether there are conditions on enrolment or occupancy. Check how the provider handles room changes or an unexpectedly late start.

A managed residence may handle internet, cleaning of shared areas or some bills, depending on the property and written terms. Ask what staff can actually help with and where to report a problem. Reception might receive parcels and still be unavailable at night. A shared kitchen may be part of the advertised room type. Confirm the number of people who use it, storage, cooking equipment and who cleans. For a studio, ask which services you still share, such as laundry, and whether permitted occupants or guest restrictions matter to you.`,
        sources: [s.studyAustraliaHousing.id],
      },
      {
        id: 'private-rentals-and-host-homes',
        title: 'Understand private room rentals, joint lets and homestays',
        prose: `If you rent a house or flat, check whether you sign for a room, take part in a joint agreement or sublet from someone who lives there or has a main tenancy. Ask who is responsible for the entire rent, who may replace a housemate and who holds utility accounts. The low advertised price of a room could exclude heating and broadband. Ask how much setup and ongoing administration you will need and whether you can handle it from overseas.

For a homestay or room in a host's home, discuss meals, kitchen use, guests, noise and time away. Ask about the space you can use privately, how to raise a disagreement and what happens if the arrangement is not working. Some offers may suit a short stay or an early transition while others require a longer commitment. If you need an accessible kitchen or a specific diet, confirm the practical arrangement. Find out what guidance and protection apply to the specific agreement. Ireland's RTB distinguishes certain owner-occupied rooms from covered private and student-specific rentals. Its definitions are useful for rooms in the Republic of Ireland and do not describe other destinations.`,
        sources: [s.irelandStudentRenting.id, s.studyAustraliaHousing.id],
      },
      {
        id: 'compare-a-normal-week',
        title: 'Compare how the room would work during a normal week',
        prose: `Picture a busy week with an early lecture, a late return and a day you need to work in your room. Where can you take a call, prepare a meal and store what you need? Who sees a problem with the heating or door first? If a housemate brings visitors, which rules apply and who can help? Include time to reach the place you spend your evenings. Then check the same questions for term breaks and move-in day, when opening hours and housemates may differ.

A higher weekly rent may be worth it if the agreement covers the period you need and removes work you cannot take on. Compare a written rent guarantee or required security with your cash calendar. Add utilities, travel and set-up costs, including any nights uncovered by the agreement. England's university-student renting guide describes differences between private renting and certain halls arrangements, including implications for a fixed period and ending the agreement. Use the rules for your actual location and classify the agreement before relying on a notice or refund.

Here is a decision example. A student on a placement with irregular hours may value a studio kitchenette and a secure building entrance after midnight. Another student on the same course who wants contact with people and can share cooking could prefer a room in a smaller residence. Give each option credit for the features the provider confirms, and discount those you would rarely use.`,
        table: {
          caption: 'What to verify by housing format',
          columns: ['Housing format', 'Likely decision', 'Ask the provider or landlord'],
          rows: [
            ['University hall', 'Campus access and an organised student community', 'Allocation, break dates and after-hours support'],
            ['Managed student residence', 'Designated student rooms and supplied services', 'Written exclusions, bills and who can live there'],
            ['Private shared rental', 'Room choice and the effect of sharing liability', 'Agreement parties, utilities and replacement process'],
            ['Studio', 'Control of study, washing and cooking space', 'Exact layout, equipment, occupancy and cost'],
            ['Homestay or digs', 'Household support and rules', 'Meals, access, notice and disagreement process'],
          ],
        },
        sources: [s.englandStudentTenancies.id, s.irelandStudentRenting.id],
      },
    ],
    checklist: [
      'Identify housing format, agreement type and who provides support.',
      'Confirm the room features, people sharing and guest or occupancy conditions.',
      'Compare the same dates and include the whole rent, bills, travel and setup.',
      'Verify which responsibilities you take on and the applicable local rules.',
      'Ask what happens if allocation, dates or enrolment change.',
    ],
    faq: [
      { question: 'Do private halls count as private renting?', answer: 'Check the actual arrangement and jurisdiction. England’s guidance distinguishes privately managed halls and explains when a landlord’s National Code membership matters.', sources: [s.englandStudentTenancies.id] },
      { question: 'Should I always choose halls in my first year?', answer: 'Choose the verified option that fits your support needs, dates, finances and daily routine. Ask who manages the building and what contact is available outside office hours.' },
      { question: 'Is a studio the same as private accommodation?', answer: 'Studio describes how the room is laid out. It may be offered in a university hall, managed residence or private rental. Check the facilities and agreement separately.' },
    ],
    sources: [s.studyAustraliaHousing, s.irelandStudentRenting, s.englandStudentTenancies],
  },
}
