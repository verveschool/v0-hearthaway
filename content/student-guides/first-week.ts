import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const firstWeek: ReviewedGuide = {
  slug: 'first-week',
  title: 'Your first week abroad as an international student',
  description: 'Settle into your accommodation, complete registration and make a workable plan for travel, healthcare and money.',
  topic: 'Arrival and settling in',
  reviewedOn: '2026-11-27',
  related: ['pre-arrival-checklist', 'airport-to-home', 'healthcare', 'uk-bank-account'],
  body: {
    introduction: `The first week starts with getting through the right door and knowing how to reach help. It can also contain deadlines for university registration, immigration follow-up and reporting the condition of your room. This guide helps students and supporters decide what to do in the first hours and what to schedule later in the week.

Start with the deadlines that are actually attached to your circumstances. Your agreement might ask for an inventory response within two days, your university may have an in-person enrolment appointment, and your permission may require a specific post-arrival step. Find the documents and read the stated dates. Then create a short list you can manage even if your flight was delayed or your phone is not connected.`,
    takeaways: [
      'Set up a safe first night with access, essentials and reliable contacts.',
      'Record room condition and report defects within the applicable window.',
      'Keep university enrolment, housing paperwork and immigration registration on separate lines.',
      'Schedule money, connectivity, travel and healthcare tasks around those deadlines.',
    ],
    sections: [
      {
        id: 'arrive-and-get-inside',
        title: 'Check in and make sure you can use your room',
        prose: `At key collection, ask what the keys, codes and cards open. Confirm which route works after hours and who handles a lockout. Get the emergency procedure, work out how to reach the building after dark and locate the basic facilities. If an access feature you were promised is unusable, report it to the provider immediately with the offer details, and ask for a safe temporary arrangement and written next steps.

If your accommodation cannot be accessed, use the verified provider number. Notify a supporter if the arrival plan changes. Use a pre-checked alternative or ask your university about emergency support where available. In a shared home, meet the responsible person and agree how to handle basic needs. Keep food, water, sleep and any required care in view while you resolve administrative tasks.

Once inside, save the verified contacts and put the address somewhere you can find it without data. If you need assistance to evacuate, ask the provider how arrangements are recorded and how to get help. Learn the address and entrance that emergency personnel would need. Give a trusted person your local contact, time zone and a sensible check-in plan.`,
      },
      {
        id: 'inventory-and-defects',
        title: 'Check the inventory and report anything that affects your stay',
        prose: `Read the move-in instructions and find your deadline for returning a condition report. Before unpacking completely, compare the room and equipment with the written inventory. Take photos of existing damage, both a wide image to show where it is and a close-up. Make sure dates and room details are recorded. Check keys, locks, furniture and visibly damaged items, and flag problems you cannot safely inspect. If you are responsible for utilities and have access to meters, agree how to record readings at the start.

Submit the report through the method specified by the provider and keep proof. Treat a lost key, serious leak, lack of access or hazard as a separate repair or emergency notification. Include where it is, when you found it, whether you can safely use the room and what response you need. A slow-draining shared sink and a front door you cannot lock may need different routes and urgency.

In Queensland, the Residential Tenancies Authority explains which condition reports apply to general tenancies and rooming accommodation. University accommodation and other arrangements may use different documents and rules. Use your provider's actual process and the applicable local guidance even if someone in another building was asked to do something different.`,
        sources: [s.queenslandStudentHousing.id],
      },
      {
        id: 'university-and-immigration',
        title: 'Follow your university timetable and any immigration instructions separately',
        prose: `University registration can cover identity checks, campus access, enrolment and course systems. Put the required activities in your calendar, record the correct campus and bring the documents the institution asks for. If you cannot attend, notify the institution through its official route and ask what alternative it can offer. In a shared inbox or portal, save the confirmation that tells you what has been done and what remains.

Check post-arrival immigration or address registration against your own route. In Ireland, students who need first-time registration should follow the instructions from Immigration Service Delivery. In France, a person holding a VLS-TS follows the validation process described by France-Visas. In Germany, the federal housing guidance explains local address registration and the accommodation provider's confirmation. These are separate processes serving different purposes. Keep only the applicable ones on your calendar and note the supporting documents.

If you plan to work, confirm the conditions that apply to your status before accepting work. An employment identifier or tax registration is a separate process from having the right to work. Ask the institution to help you find current instructions if you are unsure. Put discretionary administration after safety, deadlines and access to your studies unless one of those tasks is required first for your situation.`,
        sources: [s.irelandRegistration.id, s.franceArrival.id, s.housingGermany.id],
      },
      {
        id: 'set-up-daily-essentials',
        title: 'Get one reliable way to pay, connect, travel and seek help',
        prose: `Connectivity can be as simple as verified building Wi-Fi and a backup way to call. Confirm the access instructions and test a call from your room. Keep a charger accessible. If you are opening an account, check the documents needed and when you will get access. In the meantime, use an agreed payment route for food, travel and any rent that falls due. Review the next two payment dates and ask about anything unclear before a last-minute transfer is necessary.

Test the trip to your campus before a required event. Use the correct door, travel times and transfer locations. Check accessibility across the full route and identify a plan for a missing bus or lift. Work out which food shop, pharmacy and other services you can reach. Before buying household items, check the existing inventory, bed size and any restrictions. Start with essentials and leave time for routine tasks.

Keep the number you can use for local emergency services and a separate route for urgent health advice. Ask the local health provider or insurer about routine appointments, registration and charges. Find your university wellbeing and disability contacts even if you do not need them immediately. If you have a supporter, a short agreed update can cover your room, first payment, and any urgent issues without making you relay every detail of the week.`,
      },
    ],
    checklist: [
      'Test daytime and after-hours access and save emergency and repairs contacts.',
      'Complete the condition report and record necessary repairs.',
      'Confirm the teaching campus and attend required university checks.',
      'Complete or schedule any post-arrival immigration or address steps that apply.',
      'Test a payment method, internet connection and route to campus.',
      'Identify the local routes for routine and urgent healthcare.',
    ],
    faq: [
      { question: 'What if I cannot find my exact room on arrival?', answer: 'Use the official reception contact and show the booking reference. If the room promised is unavailable or unusable, ask for a documented temporary arrangement or access to another safe option.' },
      { question: 'Can my university registration complete immigration registration too?', answer: 'Check the instructions for both. An enrolment step and official residence or address registration serve different purposes and may require separate evidence.' },
      { question: 'What if I cannot buy everything in the first week?', answer: 'Start with things you need for safe sleep, hygiene, food, travel and participation in classes. Follow up on the inventory and plan the rest once you know what the accommodation provides.' },
    ],
    sources: [s.queenslandStudentHousing, s.irelandRegistration, s.franceArrival, s.housingGermany],
  },
}
