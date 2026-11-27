import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const accessibleStudentHousing: ReviewedGuide = {
  slug: 'accessible-student-housing',
  title: 'How to choose student housing that meets your accessibility needs',
  description: 'Turn your access requirements into measurements, written confirmations, daily routes and a building-specific emergency plan.',
  topic: 'Choosing housing',
  reviewedOn: '2026-11-27',
  related: ['choose-accommodation', 'weighted-housing-comparison', 'healthcare', 'first-week'],
  body: {
    introduction: `An accommodation listing can say a room is accessible without telling you whether you can use the shower, reach the laundry or get home from campus in the evening. Access depends on the room and on the route and services around it, as well as on what you personally need. This guide helps students and supporters turn an accommodation requirement into questions a provider can answer before anyone commits.

Start with what you need to be able to do. Describe the necessary feature or outcome, how often you rely on it and what could work as a backup. Focus on what the accommodation team needs to know to assess and confirm the offer. If you need a physical adjustment, continuing care or a particular emergency arrangement, speak with the relevant support team early.`,
    takeaways: [
      'Confirm access from arrival and everyday travel through the door of the actual room.',
      'Ask for measurements, photos or a live viewing where a label cannot establish that something works.',
      'Confirm support, repairs, equipment and emergency arrangements in writing.',
      'Check which organisation handles a request and which records it needs.',
    ],
    sections: [
      {
        id: 'turn-your-needs-into-checks',
        title: 'Describe the activities and features you need',
        prose: `Think through arriving, sleeping, bathing, preparing food, charging equipment, working, receiving assistance, doing laundry and leaving in an emergency. Add the times you would need each feature. A route you can use while reception is staffed might not be your normal way home after an evening class. Ask yourself what is essential every day, what would make a difficult day easier and which alternatives would actually work for you.

Give the provider an evidence request for each essential. A student might need a usable shower with a stated layout and space to transfer. Another might need a reliable way to receive alerts they can perceive, an individual kitchen, or a lower-stimulation location away from a late-night common area. If you need power or a secure place for equipment, ask what is available in the actual room and what happens when service is disrupted. The wording should let the accommodation team reply with specifics.

Ask your disability or student support office what it can coordinate, including temporary housing, adjustments, documentation or accessible travel. The University College London accommodation page, for example, lists possible additional requirements and how to submit evidence. Use the process at your own institution and with your own housing provider. A request submitted to a university team may need to be shared separately with the housing team under its own process.`,
        sources: [s.uclAccessibility.id],
      },
      {
        id: 'verify-the-room-and-routes',
        title: 'Verify the full route and the features in the exact room',
        prose: `Ask for the route from drop-off or street to entrance, reception, lift, room, shared facilities and any exits you would use. Check door thresholds, surfaces, slope, turning space and obstructions where relevant. A floor plan gives you one view. Ask for the clear space with the actual furniture and doors in place. If available, arrange a live walkthrough of the path and check the location of fixtures. If the provider only offers a room type, ask what they can guarantee about the allocated unit and who will confirm before payment or travel.

Ask about bathroom access and setup for any equipment you use. Identify the features you need in a working kitchen, including shared access, usable heights, shelves and appliances if they matter. For sensory or communication needs, check room location, predictable sources of noise, ventilation or lighting, announcement methods and ways to report a problem. Provide only the information needed to confirm a request. Ask how the provider handles sensitive evidence before sending it.

Test the route from the building to campus, including the correct exit, changes and how often services run. An accessible station at one end does not establish a usable journey. Test the evening and weekend route if you rely on it. Ask what you would use if the normal lift, automatic door, route or transport service failed. Include the cost and time of a genuine alternative in your comparison.`,
      },
      {
        id: 'ask-about-support-and-emergencies',
        title: 'Ask who can help during an outage or emergency',
        prose: `Find out how to report a fault, who responds after hours, and which alternative is available if your room or a key feature is out of use. Ask what happens if the provider needs to move you. A replacement room only helps if it meets the same requirements, so ask the provider to confirm this in writing. Check whether assistance from a person, a written plan or a particular alert is available during the hours you need it.

Ask the building manager what fire and evacuation provisions apply to your room, floor and needs. Discuss how you will receive an alert, how to get support and where the process is recorded. In England, the government has guidance on Residential Personal Emergency Evacuation Plans for specified residential buildings. Check whether the building is within scope and ask whoever is responsible for building safety what they can confirm. Follow the provider's building-specific instructions. Do not assume an ordinary lift is part of the evacuation plan.

For example, a student can use a room independently when the lift works, but cannot reach an accessible laundry or the street during an outage. They could consider a ground-floor room with a confirmed quiet location or ask the provider for an equivalent alternative and out-of-hours support. If the provider cannot confirm it, the access requirement is unresolved. Compare verified options before using a lower rent to break the tie.`,
        sources: [s.englandEvacuation.id],
      },
      {
        id: 'retain-and-confirm-adjustments',
        title: 'Record confirmed adjustments and check the room again on arrival',
        prose: `Save the specific room or allocation, confirmed features, access route, support agreement and contact. Ask whose approval is needed to install equipment or modify furniture, and when it will be in place. Check if each commitment extends to holidays, a possible move or later stages of the journey. Ask what happens if the booked room is unavailable or an adjustment is incomplete.

On arrival, test the agreed features before committing to another major payment if the terms allow. Check keys and controls, reach the essential facilities, and ask for the current operational and emergency instructions. If anything is missing or unusable, describe its effect, attach any relevant confirmation and ask for a safe immediate solution, an owner and a follow-up time. Your university support team can help to navigate the request if the accommodation team cannot resolve it. If you are comparing several providers with HearthAway, share the housing requirements you choose to disclose and ask which details you still need to verify directly.`,
        sources: [s.hearthawayRole.id],
      },
    ],
    checklist: [
      'Describe essential features in terms the provider can check.',
      'Verify the exact room or written room allocation criteria.',
      'Check the access route and facilities during normal and out-of-hours use.',
      'Confirm repairs, after-hours contact, relocation and emergency arrangements.',
      'Keep the written adjustment and handover details.',
      'Report discrepancies immediately if they affect access or safety.',
    ],
    faq: [
      { question: 'Does “step-free” mean the room will suit me?', answer: 'Check the actual path, dimensions, bathroom, controls and anywhere you will use daily. Include any necessary support at night and during outages.' },
      { question: 'Is it too early to ask if I do not have an offer yet?', answer: 'You can ask about application windows and evidence requirements early. Confirm features for the actual room before relying on them.' },
      { question: 'What if a provider does not yet know my room number?', answer: 'Ask what features it commits to across the allocation and when it will verify the specific room. Check the change or cancellation options if the allocation does not meet your requirements.' },
    ],
    sources: [s.uclAccessibility, s.englandEvacuation, s.hearthawayRole],
  },
}
