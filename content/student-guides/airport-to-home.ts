import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const airportToHome: ReviewedGuide = {
  slug: 'airport-to-home',
  title: 'How to get from the airport to your student accommodation',
  description: 'Plan from the key-collection deadline backwards and compare transport, luggage, accessibility and late-arrival options.',
  topic: 'Arrival and settling in',
  reviewedOn: '2026-11-27',
  related: ['pre-arrival-checklist', 'first-week', 'healthcare'],
  body: {
    introduction: `Landing at the right airport is only the start of your arrival. You still need a way to reach the correct entrance, speak to someone who can hand over your keys and pay for the trip if your phone or card stops working. This guide helps new students and supporters choose a route and decide when to switch to a backup.

Find the latest time someone can admit you to the room and work backwards from key handover to the arrival terminal. Allow time to leave the aircraft, clear any required checks, collect bags and reach the right building with your luggage.`,
    takeaways: [
      'Use the terminal and key handover location, with times in the local time zone.',
      'Compare two workable journeys at the time you will travel.',
      'Check accessibility across the whole route and arrange assistance where needed.',
      'Save the provider, itinerary and backup contacts offline.',
    ],
    sections: [
      {
        id: 'work-back-from-the-key-deadline',
        title: 'Work back from the last confirmed key handover',
        prose: `Ask the provider to confirm check-in dates, the entrance and any identity check. A published closing time may differ from the last appointment. Ask for the official number that will be answered if you are late and an explanation of any locker, guard desk or remote procedure. Check whether it needs mobile data, a code sent to a local number or a form submitted before departure. Plan both handovers separately if you will spend the first night elsewhere.

Suppose the final handover is at 20:30. You forecast 20 minutes for the last walk, 50 for the transport leg, 15 to find the platform and get a ticket, and 75 from landing to the public terminal. A total of 160 minutes puts a planned landing of 17:50 at your forecast limit. A flight landing at 18:20 already misses it on those assumptions. Find an approved after-hours option or arrange a different stay. Include additional time for likely delays rather than assuming each part of the trip will go faster.

Use the terminal from your airline and check it again before departure. Some cities have more than one airport and some routes involve an internal shuttle. Study Australia's travel guidance recommends planning the onward trip and checking what to do outside usual check-in hours.`,
        sources: [s.australiaTravelPreparation.id],
      },
      {
        id: 'compare-feasible-routes',
        title: 'Compare the routes you can actually complete',
        prose: `Use airport and operator information. For a train or bus, compare departure frequency, the last service, ticket conditions, luggage rules, transfers and the walking route after the final stop. Check what happens to a ticket for a specific departure if you miss it. A fast airport service does not shorten a difficult onward transfer.

For a car or pickup, check how to identify the booking and where to meet it. Use an official rank or a service you arranged and verified yourself. Confirm it can carry everyone, your luggage and any equipment. Ask about charges after a delay and how you will contact the operator. If your university offers a shuttle, confirm dates, terminals, reservation and the drop-off. Work out what you will do if a shuttle is full or no longer running.

Check accessibility across the whole journey. Airport staff, local transport and the residence may each provide help for a different leg. Confirm where each service starts and ends and what happens if a lift is out. Heathrow's guidance, for example, describes airport services and advises checking accessibility for the rest of an Underground journey. Use the airport and operator serving your actual route.`,
        sources: [s.heathrowAccess.id],
      },
      {
        id: 'keep-information-accessible',
        title: 'Keep payment and contact details accessible',
        prose: `Save the address, verified provider contact, booking reference and backup location offline. Keep a paper note of the details you could safely carry if your phone is flat. Take a charger and check carriage rules for any battery. Confirm whether the route takes your payment card or requires a compatible app, ticket machine or another way to pay. A second payment method is useful if you can arrange one.

Give a trusted person your expected route and a check-in window. Agree what to do if you miss it and how they can verify the official contacts themselves. If travelling with someone else, decide where to meet after baggage and how you will stay in touch if one of you is delayed. You can share information needed to help without sharing banking credentials or circulating documents.`,
      },
      {
        id: 'use-the-backup',
        title: 'Decide when to use your backup',
        prose: `Set a point at which you check the plan again. If a delay or cancellation makes the planned handover unrealistic, contact the verified provider and ask for an approved change. Get any different instructions in writing. If nobody can receive you, use an independently checked temporary option and confirm its availability, payment, entrance and next-day journey before leaving the terminal. Repeat verification if somebody asks you to pay a different recipient.

If a late arrival depends on a key safe or a code, ask the provider to walk you through the process before you fly. Save the door or locker number and ask whether the code expires. If it only arrives by text, check how you can get it with your current phone number. Agree who can help if the code fails.

Once you are inside, check that you can leave and regain access and that you know the lockout and urgent repairs contacts. Update your supporter if you agreed to report back. Report any immediate access problem separately from your general inventory and give yourself time to document the room within the allowed window.`,
      },
    ],
    checklist: [
      'Save the terminal, room address, entrance, booking reference and verified contacts.',
      'Get the last handover time and any after-hours instructions.',
      'Compare usable routes and check ticket and luggage terms.',
      'Confirm accessibility across every leg and any assistance.',
      'Choose when to switch to your verified backup.',
      'Keep a way to pay and contact the provider.',
    ],
    faq: [
      { question: 'Should I buy a non-refundable ticket before the flight?', answer: 'Check whether a later departure or refund is possible if you miss it. Compare the saving with the cost of needing to buy another ticket.' },
      { question: 'What if the room and check-in addresses differ?', answer: 'Follow the confirmed handover instructions and ask how to reach the room with your luggage after collecting the key.' },
      { question: 'Can I assume my route is accessible if the airport station is step-free?', answer: 'Check the vehicle, intermediate transfers, your destination station and the route into the building. Confirm who provides assistance at each handover.' },
    ],
    sources: [s.heathrowAccess, s.australiaTravelPreparation],
  },
}
