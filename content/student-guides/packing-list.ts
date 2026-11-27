import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const packingList: ReviewedGuide = {
  slug: 'packing-list',
  title: 'What to pack for your first student room abroad',
  description: 'Pack for the journey and first night, check the room inventory and plan which essentials to bring or get locally.',
  topic: 'Before departure',
  reviewedOn: '2026-11-27',
  related: ['pre-arrival-checklist', 'airport-to-home', 'first-week', 'healthcare'],
  body: {
    introduction: `A good packing list starts with what you need during the journey and when you get into your room. The published word “furnished” does not guarantee sheets, cookware or a usable workspace. A family trying to send everything abroad can spend money on baggage and still leave the student without what they need on a late first night.

This guide helps you separate documents and essentials from items you can obtain after arrival. Ask the provider for its inventory and actual handover arrangements before buying supplies.`,
    takeaways: [
      'Keep travel and access documents within reach throughout your trip.',
      'Check local and carrier rules before packing medicine, batteries, food or equipment.',
      'Ask for room, bathroom and kitchen inventories and relevant measurements.',
      'Make a first-night plan and postpone purchases that depend on seeing the room.',
    ],
    sections: [
      {
        id: 'pack-for-the-journey',
        title: 'Pack for the journey and a delay',
        prose: `Set aside documents you may need for the carrier, border, key collection and university. Keep the passport and relevant travel permission accessible, along with an accessible copy of your booking and address. Be able to unlock or use the key information without internet. Pack a way to charge a phone, clothing for a delay and basic toiletries compatible with the route's security rules. Keep essential equipment and medicine as accessible as the current rules allow. Choose a place to keep documents secure that you can reach at inspection.

Read the allowances for each leg. Check dimensions, weight and what happens if your cabin bag has to go in the hold. Pay particular attention to spare batteries and medical equipment. Ask the carrier what goes in the cabin, whether it needs prior approval and which information it needs. If you use an assistive device or temperature-sensitive supply, coordinate handling with the carrier and your clinician or supplier ahead of time. Keep the confirmation accessible.

Check import and security rules separately for each destination and transit point. A recommendation about hand luggage does not tell you whether a country permits importing the medicine itself. The UK Home Office, for example, provides separate rules for travelling with medicines containing controlled drugs. The applicable amount and paperwork depend on the medicine and your circumstances. Check relevant food and plant declarations and avoid assuming food that is allowed at home can be taken through every border. Study Australia's pre-departure guidance helps identify these questions for travel to Australia.`,
        sources: [s.controlledMedicine.id, s.ukAirportMedicine.id, s.australiaTravelPreparation.id],
      },
      {
        id: 'check-the-room-inventory',
        title: 'Ask what each room actually has',
        prose: `Ask for the bedroom, bathroom and kitchen inventories, not just the word furnished. Confirm mattress size, bedding, towels, storage dimensions, supplied desk and lighting, cooking utensils, fridge and plates. Identify which equipment is reserved for your room, which is shared and whether the provider sells or supplies an arrival pack. If an item is important for accessibility or a dietary requirement, ask for the actual item or measurements. In a shared dwelling, check what housemates already provide and how shared items are replaced.

If the room is unfurnished, confirm whether that includes the bed, lighting or large appliances. Arrange a delivery only after checking access hours, the building's ability to receive it and who will assemble or remove packaging. Check whether you may install or bring heaters, cooking equipment or other electrical items. The sign on a travel adapter shows its purpose. For equipment that needs a different voltage or power capacity, check the manufacturer’s and provider's instructions before using it.

Use a three-part list. Carry the things you need before you can shop. Reserve items you cannot easily source or need installed at arrival. Buy or borrow everything else after checking the room. Asking for bed size is cheaper than replacing a new bedding set. A small shared cookware list may avoid buying several copies of things you only need once.`,
        sources: [s.studyAustraliaHousing.id],
      },
      {
        id: 'plan-the-first-night',
        title: 'Plan the first night and your first shopping trip',
        prose: `Work out how you will sleep, wash, eat, change and make a call when you arrive. If the provider confirms no bedding and you arrive after shops close, arrange an approved bedding pack or carry a basic permitted alternative. If you expect to arrive early, check whether shops will be open and whether you can bring purchases inside before key handover. Compare the cost of arrival-ready supplies with buying once you know the room. Leave room for transport and installation, not just purchase price.

After you reach the room, check the inventory and list what actually needs buying. Record any damage or missing item with the provider. Buy essentials first. Find out what can be borrowed or bought second-hand at the university or locally and what you can share. For clothing, use the city weather, heating and likely routine rather than a national stereotype. Leave enough luggage space to repack or move again if a temporary stay is involved.`,
      },
    ],
    checklist: [
      'Save the documents, access instructions and emergency contacts you will need while travelling.',
      'Check carrier allowances and official transit or destination rules for restricted items.',
      'Confirm the inventory, bed size, equipment and what can be used in the room.',
      'Arrange first-night items or delivery with the provider where necessary.',
      'Budget for local purchases and check the room before placing orders.',
    ],
    faq: [
      { question: 'Will a furnished room come with bedding and kitchen items?', answer: 'Ask for the actual inventory and bed size. A bed, bedding, shared cooking equipment and utensils can be supplied under different terms.' },
      { question: 'How much medicine can I bring?', answer: 'Check your own medicine, route and destination rules with the authorities and your clinician. Use the applicable evidence, placement and quantity requirements.', sources: [s.controlledMedicine.id, s.ukAirportMedicine.id] },
      { question: 'What if my checked bag is late?', answer: 'Keep essential travel and access information on you and carry items you need for a short delay where regulations allow. Have an accessible way to reach the airline and the provider.' },
    ],
    sources: [s.controlledMedicine, s.ukAirportMedicine, s.australiaTravelPreparation, s.studyAustraliaHousing],
  },
}
