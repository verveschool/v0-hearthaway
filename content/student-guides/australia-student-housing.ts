import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const australiaStudentHousing: ReviewedGuide = {
  slug: 'australia-student-housing',
  title: 'Student accommodation in Australia and which rental rules to check',
  description: 'Compare residential colleges, managed residences, private rentals and homestays, and find the rules for your state and agreement.',
  topic: 'Destination housing',
  reviewedOn: '2026-11-27',
  related: ['halls-vs-private', 'choose-accommodation', 'tenancy-agreement', 'first-week'],
  body: {
    introduction: `Australian student housing includes campus colleges, privately managed buildings, share houses and homestays. The best match depends on your teaching location, finances and how much support you need. The rules can differ with the state or territory and the type of arrangement.

Start with the address and actual agreement. If you know which authority regulates the type of housing you are considering, you can ask better questions about a bond, a condition report and leaving early. This guide uses Queensland examples to show how two offers in the same state can still need different checks.`,
    takeaways: [
      'Start with your teaching location, dates and the actual form of housing agreement.',
      'Check bond, fees and condition reporting using the correct state or territory authority.',
      'Compare what the contract includes over the full dates.',
      'Verify the room, key handover and what you would do if you arrive late.',
    ],
    sections: [
      {
        id: 'identify-the-arrangement',
        title: 'Compare formats by support, space and responsibility',
        prose: `Ask the education provider which campus you will use and what options it offers or recommends for research. A residential college or university residence can offer common facilities and an organised campus community. Ask what meals, cleaning and internet are included, how allocation works and whether you can stay over breaks. A privately managed student residence may offer a different location or room format. Confirm service hours and cancellation terms by property.

For a house or flat, distinguish renting a room, signing for the whole dwelling with others and subletting from a tenant. Ask who is responsible if a housemate leaves. Check who organises electricity and internet and how charges are split. Ask whether a sublet is authorised and what notice applies. Talk through cooking, noise and use of common space while you can still choose another place.

For homestay, ask about meals, laundry, guest rules and how to request a change. If you are under 18, check any accommodation and welfare requirements with your education provider and the Department of Home Affairs. An interim room must also fit any approved arrangements that apply to you.`,
        sources: [s.studyAustraliaHousing.id, s.australiaVisa.id],
      },
      {
        id: 'find-the-local-authority',
        title: 'Look up both the state or territory and the agreement type',
        prose: `Use Study Australia’s accommodation guide to find the current state and territory rental resources. Look for the guidance for the actual agreement, such as general tenancy, rooming accommodation or campus residence. Check what the authority can help with before relying on a refund, complaint or notice process. Rules from another state may serve a useful question but cannot establish your rights.

Queensland shows the distinction. The Residential Tenancies Authority (RTA) says on-campus student accommodation is outside the main renting legislation it administers, but a rental bond paid for on-campus accommodation must still be lodged with the RTA. Off-campus accommodation may come under different categories. For Queensland rooming accommodation covered by the relevant rules, the RTA says a bond taken must be lodged within 10 days and a condition report is required if a bond is taken. Consult the relevant rooming or general tenancy guidance before acting.

In another jurisdiction, use the official guidance for the address. Ask the provider to identify the correct bond process, permissible fees, written agreement, rent changes, condition report and dispute route. If an agreement looks different from the official description, ask the applicable authority or a local advice service before paying.`,
        sources: [s.studyAustraliaHousing.id, s.queenslandStudentHousing.id, s.queenslandRooming.id],
      },
      {
        id: 'compare-bond-rent-and-utilities',
        title: 'Compare the complete quote and the cash you need up front',
        prose: `Write down the actual charged dates, payment due dates and whether each amount is per room, person or dwelling. Confirm charges during breaks and ask for itemised utilities and internet when they are not included. Budget for a refundable bond as up-front cash, recorded separately from permanent spending. Ask for evidence of lodgement if it applies and keep your receipt.

For an illustrative 38-week comparison, a residence at A$325 per week costs A$12,350 in rent. A share-house room at A$290 per week costs A$11,020 in rent. If the share house excludes utilities of A$22 per week and you need A$14 more each week for travel, its adjusted total is A$12,388. Bond timing, starter purchases and whether the exact dates fit can still change the decision. These figures illustrate the arithmetic and are independent of current prices.

Ask which amount is needed first and whether it will be credited to rent. Verify the destination account or official payment portal using details you find independently. If you will pay from another currency, check exchange charges and when the funds will arrive. Price what a visa delay, change of enrolment or early exit would cost if it happened.`,
        sources: [s.studyAustraliaHousing.id, s.queenslandStudentHousing.id],
      },
      {
        id: 'plan-travel-and-handover',
        title: 'Check the campus journey and how you will get in',
        prose: `Test an early trip and an evening return from the building to the correct teaching or placement site. Look for the actual transport route, fares and concession terms. Check the final walk and an alternative journey, especially if you rely on step-free access. When comparing a homestay or share house, ask how you will get in after evening classes and where you can store what you need for the trip.

Plan your first journey from the terminal with luggage. Study Australia recommends finding out how to reach accommodation and how to check in outside ordinary hours. Save the address, reference and verified contact offline. If you need a few nights elsewhere, check that the temporary provider accepts your arrival time and that the address and dates work with your other obligations.`,
        sources: [s.studyAustraliaHousing.id, s.australiaTravelPreparation.id],
      },
      {
        id: 'document-move-in-and-exit',
        title: 'Record condition at move-in and put the exit date in your calendar',
        prose: `At handover, confirm keys, emergency contacts and repair reporting. Review the provider's inventory and applicable condition report. Take pictures of problems and keep your dated response. Ask how shared-area damage is recorded and how any costs are decided. If you are responsible for utility accounts, arrange a record of meter readings or the billing start date.

Check how the agreement ends, whether notice is required and what happens if you leave a fixed period early. Ask how to retrieve the bond through the applicable process and how to handle a deduction. If your study plan changes, ask the university and housing provider early. Get any confirmed release, outstanding amount and key return terms in writing before booking another room.`,
        sources: [s.queenslandStudentHousing.id, s.studyAustraliaHousing.id],
      },
    ],
    checklist: [
      'Check the correct campus, dates and any welfare or accessibility requirements.',
      'Identify the actual agreement and the correct state or territory authority.',
      'Compare written rent, utilities, bond and upfront cash across the actual dates.',
      'Verify the provider, room and payment recipient.',
      'Confirm key handover and a backup if you cannot arrive on time.',
      'Complete and retain condition and bond records.',
    ],
    faq: [
      { question: 'Does all Australian student accommodation use the same bond rules?', answer: 'Check the state or territory and agreement type. Use the official sources for your location and the form of accommodation you are being offered.', sources: [s.studyAustraliaHousing.id, s.queenslandStudentHousing.id] },
      { question: 'Can I compare weekly prices directly?', answer: 'First confirm the agreement dates and charges. Add total rent, utilities, travel and any required fees, and keep a separate line for refundable cash.' },
      { question: 'Do I need an inventory for campus housing?', answer: 'Ask for the provider’s procedure and any official form that applies. Keep dated records of condition and discrepancies when you move in.' },
    ],
    sources: [s.studyAustraliaHousing, s.australiaTravelPreparation, s.australiaVisa, s.queenslandStudentHousing, s.queenslandRooming],
  },
}
