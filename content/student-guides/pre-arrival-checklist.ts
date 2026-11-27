import type { ReviewedGuide } from './model'
import { preArrivalTimeline } from './pre-arrival-timeline'
import { sources as s } from './sources'

export const preArrivalChecklist: ReviewedGuide = {
  slug: 'pre-arrival-checklist',
  title: 'Pre-arrival checklist for international students',
  description: 'Use a downloadable timeline to plan your visa evidence, housing, flights and first week abroad, with a backup if your dates change.',
  topic: 'Before departure',
  reviewedOn: '2026-11-27',
  related: ['student-visa', 'choose-accommodation', 'real-cost-abroad', 'first-week'],
  body: {
    introduction: `Before you book a flight or pay for a room, write down four dates: the first time your university needs you on campus, the earliest you can enter the country, when someone can give you the keys, and when your first payment is due. A room you pay for from Monday won't help if you land on Sunday.

Use the timeline below to put those dates in order. If a visa, offer or room is still pending, decide now what you’ll do if it hasn’t come through by the day you need to act.`,
    takeaways: [
      'Build a dated plan from written university, immigration and accommodation instructions.',
      'Track the cost and conditions of changing housing and travel while decisions are pending.',
      'Plan the first night down to the key handover, a backup way to pay and a person you can contact.',
      'Keep your first-week list short and prioritise deadlines, safe housing and access to support.',
    ],
    sections: [
      preArrivalTimeline,
      {
        id: 'make-a-deadline-map',
        title: 'Write down the deadlines in your offer',
        prose: `Open the latest message from your university and write down the campus, exact programme and intake, offer conditions, acceptance date and formal enrolment steps. Distinguish a deadline to accept from a deadline to pay or arrive. If you have an academic or language condition, record the evidence the university needs, who issues it and when you can realistically send it. Save a copy of any intake change and ask the institution to confirm which documents it replaces.

Ask about orientation, the latest permitted arrival, registration and how a deferral works. If your course has placements or teaching on more than one site, get the address of the site you expect to use most. A university may have more than one accommodation allocation process even when you see all its halls under one name. Find out who decides, whether applying is binding and when you can expect an answer. While an application is pending, gather private alternatives you could verify if you need them.

For each deadline keep a line with the local date and time, time zone, person responsible, evidence you will receive and next action if you are late. A family member can help track deadlines or arrange funds while the student keeps control of their application logins. One shared list of dates and amounts is more useful than forwarding an inbox of sensitive documents.`,
      },
      {
        id: 'documents-and-entry',
        title: 'Put visa evidence, travel and arrival documents in separate folders',
        prose: `Your visa application file is evidence for a decision. Your travel file establishes what you can show your carrier or a border officer. Your enrolment file satisfies the institution. Start with the destination authority's guidance for your nationality, course, current residence and whether family members are travelling. Each process may need a different mix of originals, translations, certified copies, digital status or evidence you can access quickly.

If you need financial evidence, record the amount, who may hold it, how it must be documented and the date the evidence must cover. Personal bank funds, a qualifying student loan and official financial sponsorship can have different tests. A university grant covering part of tuition leaves a balance to plan for. Keep the application calculation separate from the money you need for flights, deposits, rent and the first weeks. Arrange payments so they do not accidentally affect your ability to meet the financial evidence rules that apply to you.

When a visa is granted, check your name, passport details, dates and conditions against your travel booking and university instructions. If you are travelling on a UK eVisa, UK Visas and Immigration asks you to check that the current travel document is linked to your UKVI account and that its details match the information you gave the carrier. UKVI also says to wait for a visa decision before booking travel. For another route, read its own instructions. Make a list of the documents that need to be accessible during travel, and store the rest safely. Keep a backup that you can open if your phone is flat or you cannot log in, without leaving passports or financial records in an open shared folder.`,
        sources: [s.ukVisaFunds.id, s.ukTravelEvisa.id, s.ukVisaTravelBooking.id],
      },
      {
        id: 'compare-housing-commitments',
        title: 'Set a housing deadline and check what a booking commits you to',
        prose: `Search using the correct campus, arrival window and maximum total housing cost. A university waiting list and a private short list can run in parallel. Record the exact room or guaranteed room type, what you share, price and currency, dates, and the provider or landlord that signs the agreement. Ask what charges are due before the first night and how to verify the recipient through a separate contact route.

Check how the agreement handles delays, visa refusal, a changed offer and late check-in. A refund clause might require you to notify a specific address by a set date with evidence. Ask what is retained and how long any refund takes, including what happens if you start the agreement before your circumstances change. Written answers help you distinguish a contractual commitment from a sales conversation. If a condition decides whether you can afford the risk, retain the complete policy and the version attached to your offer.

Choose a fallback you could genuinely use. That might be another room on your short list or a few nights of temporary housing with a confirmed late-arrival process. Include the cost of moving twice and the gap between paying for the backup and a possible refund. Check whether that temporary address meets any official or university address requirement you rely on. HearthAway can help you compare accommodation and bring questions to an advisor. The agreement and payment instructions should come from the responsible provider.`,
        sources: [s.hearthawayRole.id, s.studyAustraliaHousing.id],
      },
      {
        id: 'make-a-payment-calendar',
        title: 'Make a payment calendar with a fallback for delays',
        prose: `Write down tuition, visa costs, housing payments, travel, insurance where needed, and cash for food and local transport until your normal funding is accessible. Mark refundable deposits separately from expenses. Both require money on the due date, but a deposit might be returned later in whole or in part depending on the agreement. A promised refund or a bank transfer that has been sent cannot pay a bill until the funds are available to you.

Plan around when the recipient must receive the money. Ask for the settlement currency, payer reference and the accepted payment methods. Check whether charges appear at the sending or receiving end, who covers any shortfall, and whether the transfer could be delayed by weekends, a new beneficiary or document checks. Make sure the student can reach a reserve and use a second payment method where practical. Agree in advance who will act if the first transfer fails or a freeze blocks a card.

Suppose an illustrative housing payment of £960 is due on the 1st, travel and setup cash of £260 is needed on the 3rd and the next contribution normally clears on the 5th. You need access to £1,220 by the 3rd if those items are payable from the same pot. Sending £1,220 on the 2nd will miss the housing deadline even if it is enough in total. Move the first transfer earlier, agree a different due date in writing or choose a commitment that fits the actual funding schedule.`,
      },
      {
        id: 'plan-your-first-night',
        title: 'Plan the first night from check-in backwards',
        prose: `Ask the accommodation team which desk or entrance you should use, local check-in hours, the latest key handover and what happens if you arrive after that time. Save the exact street address, booking reference, access instructions and a working out-of-hours number. If staff need to approve late check-in in advance, find out how to get their confirmation and how long they will hold a booking after a missed arrival.

Work backwards from key collection. Check the flight's arrival terminal, baggage and border time, transport hours and the final walk. If you have large bags, a wheelchair or a child with you, test whether your route is feasible with your equipment and the assistance you have booked. Download directions and the address. Agree an arrival check-in with a supporter who knows what to do if you miss it, allowing for time zone changes and a phone running out of charge.

Ask what the room actually has on the first night. Bring or arrange only the essentials if the provider cannot supply them. Check the agreed inventory, access to a toilet and shower, and how to report a missing key or a room you cannot safely use. Take condition photos, label them by room and email or upload them within the provider's stated reporting window.`,
      },
      {
        id: 'prepare-the-first-week',
        title: 'Make time for enrolment and healthcare',
        prose: `Put required appointments and registration deadlines in your calendar before scheduling shopping, social plans or bank visits. Save your university's international student contact and the person you can ask about course access. Ask who to notify if a delay means you miss a required activity. Where a post-arrival validation, local address registration or residence appointment applies, read the authority's instructions and keep confirmation.

Prepare one way to request routine medical care, one urgent care route and the local emergency number. Check any coverage start date and whether you need to carry proof of eligibility or insurance. If you depend on a medication or accessible equipment, arrange continuity with the relevant professional and check destination, transit and carrier rules before travel. Ask the provider who handles urgent facility issues and how to open a repair ticket.

Your first normal journey to campus is worth trying when you have spare time. Find the accessible entrance or transfer you need, the nearest practical food shop and a reliable route home. Buy the remaining household items once you have seen what is supplied. A supporter can help by being available for a brief check-in or by reading an unexpectedly complicated bill with you.`,
      },
    ],
    checklist: [
      'Confirm the teaching campus, offer conditions, required arrival dates and a university contact.',
      'Check what you need to prove at application, at the border and after arrival.',
      'Verify the room offer, written cancellation terms and payment recipient before committing.',
      'Schedule cleared funds for each deadline and agree a backup you can access abroad.',
      'Confirm key collection in local time and save the instructions offline.',
      'Plan needed medication or equipment, check coverage dates and save urgent contacts.',
      'Leave space to check the inventory, report defects and complete registration.',
    ],
    faq: [
      { question: 'What if the university has not confirmed my offer or campus?', answer: 'Use the current offer to identify missing evidence and ask about the likely dates, but keep housing options flexible until the campus and intake are confirmed. Compare deposits and refund exposure before accepting an agreement.' },
      { question: 'Can I use one bank statement for the visa, housing and university?', answer: 'Each organisation sets its own evidence requirements. Check the acceptable document, date range, intended recipient and how to share it securely before sending.' },
      { question: 'What if the visa comes through but the move-in dates do not line up?', answer: 'Check the dates on your permission and talk to your university and provider. Price a verified short stay or a change to the travel booking, and arrange a confirmed key handover for the final room.' },
      { question: 'What should a parent or supporter keep?', answer: 'Agree on a copy of the itinerary, the provider’s contact details and agreed payment dates. Share sensitive documents only where you have a purpose and a secure method.' },
    ],
    sources: [s.ukVisaFunds, s.ukTravelEvisa, s.ukVisaTravelBooking, s.hearthawayRole, s.studyAustraliaHousing],
  },
}
