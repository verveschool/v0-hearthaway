import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const uaeHousingFurnished: ReviewedGuide = {
  slug: 'uae-housing-furnished',
  title: 'How to compare furnished student housing and utilities in the UAE',
  description: 'Check what is supplied, who pays for cooling and utilities, and which tenancy registration process applies to your UAE accommodation.',
  topic: 'Destination housing',
  reviewedOn: '2026-11-27',
  related: ['uae-visa-sponsorship', 'uae-tax-free-income-planning', 'accommodation-costs', 'halls-vs-private'],
  body: {
    introduction: `A room advertised as furnished can leave the student responsible for a cooling charge, furniture setup or internet, depending on the building and agreement. A campus room with a service contract and a privately rented flat can also have different registration and payment processes.

Use this guide to compare the actual room and its written costs before paying. It focuses on furnished housing and uses Dubai's official services as a local example. Ask which authority and procedure apply to the particular emirate and arrangement you are considering.`,
    takeaways: [
      'Get the actual inventory for the room or allocated room type.',
      'Confirm cooling, electricity, water, internet and maintenance line by line.',
      'Record charges, dates and any refundable amount, and verify payment instructions.',
      'Check the registration and utility setup that apply to your agreement.',
    ],
    sections: [
      {
        id: 'identify-the-offer-and-inventory',
        title: 'Identify what the provider is actually offering',
        prose: `Confirm whether the offer is for a bed in a shared room, a private room, a studio or a whole apartment. Check who will be named on the agreement, what occupancy is permitted and when your room is available. Ask whether the room is assigned now or only later, and which photos, measurements and features apply to the actual allocation. Confirm which arrangements you can make if you need privacy, a cooking facility or a practical route to your campus.

Request an inventory with the bed size, desk, storage, seating, air-conditioning controls and kitchen appliances. Ask whether bedding, towels and cooking items are supplied and which facilities are shared. Identify the provider's repair route for existing and future defects. Clarify who can enter to inspect or repair the room. At handover, check the written inventory and report missing or damaged items with dated evidence. Keep a signed or acknowledged copy and ask which deductions can be charged at move-out.`,
      },
      {
        id: 'separate-utilities-and-cooling',
        title: 'Separate electricity and water from cooling and other services',
        prose: `Ask whether the provider manages electricity, water, cooling, internet, laundry or cleaning. For each, establish who pays, who controls the account and how you learn the amount. Cooling may be included, billed separately or reflected in another charge, depending on the agreement and building. Ask whether bills are metered, fixed or subject to limits, how common charges are allocated and what happens in a high-use period. Find out who to call if cooling stops and whether the provider's support is available out of hours.

If the quote says “cooling included”, ask what happens in a high-use month. Can the provider show the charge on an anonymised sample bill or point to the cap in the agreement? Ask whether an account, deposit or activation payment is needed before the room is usable.

In Dubai, the Dubai Land Department explains how tenancy registration through Ejari works. The Dubai Electricity and Water Authority has separate instructions for activating electricity and water, including circumstances involving Ejari. Ask whether these processes apply to your accommodation and who is responsible. Check the provider's role, the relevant utility instructions and any security or activation charges directly. Other emirates and other accommodation types may have different processes and authorities.`,
        sources: [s.dubaiEjari.id, s.dubaiElectricity.id],
      },
      {
        id: 'compare-the-cost-and-dates',
        title: 'Compare the complete price and exit terms',
        prose: `Request a written schedule for the actual dates with all compulsory charges and any refundable money. For illustration, a nine-month room at AED 2,700 per month totals AED 24,300 if all services in your comparison are included. A second at AED 2,450 for nine months costs AED 22,050 before charges. Add AED 280 a month in separately paid services and its estimated total becomes AED 24,570. Those assumptions are not current rent ranges. Different utility use or contract dates can change the result.

Identify who collects rent, when the funds must arrive and what documentation you receive. For a Dubai private tenancy where registration applies, ask who will obtain the certificate and how the participants verify it. Confirm the applicable requirements before you pay. Read the terms for notice, deposit return, visa delay, a changed programme and a room that is unavailable at the promised date. If you are offered an interim room, ask who is responsible for extra costs and when the confirmed room can be used. Check those arrangements independently if they are important to your decision.`,
        sources: [s.dubaiEjari.id],
      },
    ],
    checklist: [
      'Confirm agreement, room type, occupancy and priced dates.',
      'Request a room and shared-facility inventory.',
      'Get separate written terms for cooling, utilities and support.',
      'Check local registration and account activation where applicable.',
      'Verify payments, refundable sums and notice terms.',
      'Record room condition and services when you move in.',
    ],
    faq: [
      { question: 'Does furnished mean cooling is included?', answer: 'Ask about cooling in the written quote. It may be included or billed under different terms, independently of the furniture.' },
      { question: 'Is every student room registered through Ejari?', answer: 'Ejari is a Dubai tenancy process. Ask whether it applies to the particular arrangement and check the Dubai Land Department or the appropriate authority for another location.', sources: [s.dubaiEjari.id] },
      { question: 'Should I pay to turn on power before I receive keys?', answer: 'Confirm who controls the utility account, when the service should be activated and which official charges apply. Use the verified utility or provider payment process.', sources: [s.dubaiElectricity.id] },
    ],
    sources: [s.dubaiEjari, s.dubaiElectricity],
  },
}
