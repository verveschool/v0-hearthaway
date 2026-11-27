import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const germanyTenancyLawDeposits: ReviewedGuide = {
  slug: 'germany-tenancy-law-deposits',
  title: 'How to check a German rental agreement and security deposit',
  description: 'Understand the rent breakdown, deposit handling, handover, repairs and notice for the type of accommodation offered.',
  topic: 'Contracts and payments',
  reviewedOn: '2026-11-27',
  related: ['germany-studentenwerk-housing', 'germany-monthly-budgeting', 'tenancy-agreement', 'avoid-scams'],
  body: {
    introduction: `German housing listings may mention a Kaltmiete, Warmmiete and Kaution, and the agreement may be with a landlord, a residence provider or the main tenant of a shared flat. If you are reading your first agreement in German, establish what each figure covers and who is actually authorised to offer the room. This guide explains the checks to make before you sign, and the records that help at handover and move-out.

The German Civil Code, the BGB, contains residential rental provisions, including rules on security deposits. Some provisions differ for student residences or other types of arrangements. Check the official law and seek local help if classification or the terms are disputed.`,
    takeaways: [
      'Identify the legal parties, the exact space and the type of agreement.',
      'Check base rent, operating costs, separate utilities and the complete instalment schedule.',
      'For a covered cash deposit, compare the amount, instalments and holding arrangements with section 551.',
      'Keep the signed terms, address confirmation, receipts and handover records.',
    ],
    sections: [
      {
        id: 'identify-the-agreement',
        title: 'Identify the agreement and the person you are paying',
        prose: `Confirm which room or dwelling you are getting, which areas you can use, who has authority to let it and when you can collect the keys. If it is a sublet, find out whether the person making the offer is the main tenant, what the primary agreement allows and which permissions are in place. Ask who can give the confirmation needed for address registration. Do not accept an offer solely because the name or address appears in an advert or portal.

Get the terms you rely on in writing. Ask for a reliable translation or local advice if you do not understand the German agreement. A summary of rent and dates does not explain the contract's approach to guests, repairs, signed notices or replacement residents. The BGB treats some kinds of accommodation differently. For example, section 549 lists provisions that do not apply to student or youth hostels. Find out which terms and protections apply to the room itself, rather than assuming a private-flat checklist answers every point.`,
        sources: [s.housingGermany.id, s.germanLeaseScope.id],
      },
      {
        id: 'separate-the-rent-and-operating-costs',
        title: 'Separate basic rent, operating costs and utility accounts',
        prose: `Kaltmiete generally refers to basic rent. An offer advertised as Warmmiete often includes certain operating costs and heating. Get the itemised breakdown. Ask whether operating charges are paid as an advance subject to later reconciliation or as another agreed arrangement. Consider what you pay yourself for electricity, internet, a parking space or another service. In a shared flat, find out which person receives each bill and how changes in household size or usage affect your share. Keep a separate estimate for any bill you pay after the occupancy ends.

For an illustrative quote, €480 in base rent plus €110 in operating-cost advances makes €590 due monthly to the landlord. If the student pays a further €35 for electricity and €15 for internet, planned monthly outflow is €640. An annual reconciliation for costs paid in advance may change the eventual amount, depending on the agreement and applicable rules. Before accepting, ask which costs the advance covers and what evidence you will receive. The rent figure used for the deposit calculation can differ from what you pay each month.

Ask the provider whether amounts displayed on a listing match the actual schedule. Check which date rent must reach the recipient and what a partial month costs. Obtain payment instructions from a verified source. Keep the initial quote and receipts showing how payments were allocated.`,
        sources: [s.germanOperatingCosts.id, s.housingGermany.id],
      },
      {
        id: 'check-the-deposit',
        title: 'Review the deposit amount, instalments and custody',
        prose: `For residential arrangements within section 551 of the BGB, the cap is generally three months of rent excluding operating costs stated separately as a lump sum or advance. In the preceding example, three times €480 is €1,440. The €110 operating-cost advance is excluded from that calculation. The statute gives a tenant providing a cash sum the option to pay in three equal monthly instalments. The first is due when the tenancy begins and the next two come with the following rent payments.

The statute also sets out how a monetary deposit is held separately from the landlord's assets and how interest is handled, with an interest exception for student and youth hostels. Ask the provider how it will handle the deposit and what record you will receive. Check the statutory wording and get local advice where your arrangement or the proposed security falls outside the simple cash example. Requirements on how money is held do not mean that an online platform holds the money on your behalf.

Ask what evidence and process the provider uses to record return or deductions. Get a receipt and retain it alongside the inventory and handover record. At move-out, request an itemised explanation for any amount withheld and keep access to the reply. A promised return within an assumed number of days should not be used as money for a new deposit unless you know it will arrive in time.`,
        sources: [s.germanDeposit.id],
      },
      {
        id: 'prepare-handover-repairs-and-notice',
        title: 'Confirm handover, repairs and how the agreement ends',
        prose: `Walk through the room or have the agreed representative do so. Record keys, furniture, existing damage and meter readings where relevant. If the provider has a written handover protocol, add any missing issues before confirming it and keep a copy. Report defects through the agreed process. Ask which contact handles urgent problems, who is responsible for a repair and whether arrangements for access are documented. Seek local advice before deciding how to use a legal remedy for a repair or rent dispute.

Check whether the agreement has a fixed date or runs until notice. Find the exact notice form, recipient, periods and proof of delivery. Check the circumstances in which you may change room, end the stay early, or propose a replacement. Ask what happens to liability if the arrangement is a shared tenancy or sublet and one person wants to move. Confirm your move-out and key handover and provide a secure forwarding contact for the deposit. If you will move within Germany or leave the country, check separately whether an address update or deregistration applies.`,
        sources: [s.housingGermany.id, s.germanLeaseScope.id],
      },
    ],
    checklist: [
      'Check the legal parties, exact room and, where relevant, sublet authority.',
      'Confirm Kaltmiete, included operating costs and separate accounts.',
      'Review the deposit cap, payment schedule, custody and receipt for your agreement.',
      'Confirm who supplies the address registration document.',
      'Record room condition and find the repairs and emergency processes.',
      'Save written notice, release or move-out requirements before committing.',
    ],
    faq: [
      { question: 'Does the three-month deposit example use the warm rent?', answer: 'Section 551 generally excludes separately stated operating costs. Check which amounts in your actual quote are base rent and which are identified as operating costs.', sources: [s.germanDeposit.id] },
      { question: 'Must my covered cash deposit be paid in full before move-in?', answer: 'Section 551 provides for three equal monthly instalments, with the first due at the start of the tenancy. Confirm the rule applies to your agreement before relying on it.', sources: [s.germanDeposit.id] },
      { question: 'What if I cannot understand the German terms?', answer: 'Obtain a reliable translation and local advice on clauses you are unsure about. Request written clarification from the verified provider before paying.' },
    ],
    sources: [s.housingGermany, s.germanLeaseScope, s.germanOperatingCosts, s.germanDeposit],
  },
}
