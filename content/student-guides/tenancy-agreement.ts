import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const tenancyAgreement: ReviewedGuide = {
  slug: 'tenancy-agreement',
  title: 'How to read a student tenancy or residence agreement',
  description: 'Understand who is responsible for the rent, what the agreement includes, and how deposits, repairs, notice and cancellations work.',
  topic: 'Contracts and payments',
  reviewedOn: '2026-11-27',
  related: ['accommodation-costs', 'halls-vs-private', 'avoid-scams', 'germany-tenancy-law-deposits'],
  body: {
    introduction: `A housing agreement determines how you use the room, what you owe and what happens if either side wants the arrangement to change. Read it while you still have time to compare options. This guide helps students and supporters who are reviewing their first offer or weighing two contracts. You can work through it with a residence agreement, private tenancy or room licence.

Start by saving the complete set of documents. Include the rent schedule, house rules, inventory, guarantor form and the cancellation policy if they are separate. If a sales message promises something important, ask the provider to identify where it is recorded and clarify any inconsistency. An advisor or housing office can help you find the right questions to ask. For a dispute or an unclear legal obligation, use advice applicable to the jurisdiction and type of agreement.`,
    takeaways: [
      'Identify the parties, jurisdiction, type of agreement and exact space before comparing clauses.',
      'Look at total rent, up-front payments, conditions on refunds and who can be held responsible.',
      'Read the procedure and deadline for delay, cancellation, early exit or ordinary notice separately.',
      'Save the inventory, repair process and changes the provider confirms in writing.',
    ],
    sections: [
      {
        id: 'identify-the-agreement',
        title: 'Identify your agreement, your room and the parties',
        prose: `Find the legal name of the landlord or provider, the address, permitted occupants, and the person or organisation responsible for day-to-day management. Identify the room number or what is guaranteed if only the room type is allocated at signing. Check what you can use privately and what you share, including gardens, kitchen equipment, mail handling or a bike store if these matter. If someone other than the landlord signs, ask who has authority to let the space and who will accept rent and formal notices.

The heading on the first page can be a clue. Local law and the actual arrangement determine which protections apply. In England, GOV.UK distinguishes assured periodic tenancies, common law tenancies and licences in its university-student guidance. It explains that privately managed halls normally need National Code membership for the relevant exclusion. Check current rules for an ordinary private let and relevant halls separately. In Ireland, the Residential Tenancies Board distinguishes registered Student Specific Accommodation, ordinary private tenancies and certain arrangements in an owner's own home. An arrangement described as a licence does not automatically tell you whether the RTB covers it.

If you will share, find out who signs and what they are responsible for. An individual room agreement can assign you a share of common costs. With a joint agreement, a clause may make tenants responsible together and individually for the full obligation. Ask what happens if one person leaves or cannot pay and whether there is a release process. A friendly agreement among housemates does not itself limit what's written in the housing contract.`,
        sources: [s.englandStudentTenancies.id, s.englandRentersRights.id, s.irelandStudentRenting.id],
      },
      {
        id: 'trace-the-payments',
        title: 'Trace every payment and anyone promising to cover it',
        prose: `Look for the amount, currency, date and recipient of each payment. Check that the instalments sum to the quoted rent for the full agreement. Identify payments credited to rent and payments you must fund separately. Ask whether prices include utilities, how a cap is measured and whether it is per person, room or dwelling. Ask for the terms governing any arrears charge, cleaning charge, administrative fee or additional services, and verify whether it is permitted where you live.

If someone asks you to pay to reserve the room, find out what agreement that payment creates, when it is credited or returned and why it may be retained. A security deposit has a different purpose. Check whether a protection or lodging scheme applies to your agreement, when you receive evidence, and how to raise deductions. England's official deposit guidance covers the relevant assured periodic tenancies. The rules for specific halls and other countries differ. Ireland's RTB explains that the landlord holds an SSA deposit and describes the permitted deposit and advance payments. In Australia, consult the relevant state or territory and verify the rules for the arrangement offered.

Check the financial exposure of a guarantor, which is someone who promises to cover the obligations named in a separate agreement. Read whether it covers your rent alone, shared obligations, damage, late fees or a rolling continuation. Ask how the guarantee ends and whether the provider will accept an alternative if your supporter does not meet its requirements. Compare any alternative charge or obligation with the applicable local rules before committing. Share the entire agreement with a guarantor so they can see the terms they might be asked to cover.`,
        sources: [s.englandDeposit.id, s.irelandStudentSpecific.id, s.studyAustraliaHousing.id],
      },
      {
        id: 'check-access-and-maintenance',
        title: 'Read the provisions that shape everyday living',
        prose: `Check when you are allowed to move in, when keys can be collected and what access looks like outside reception hours. Then examine visitors, overnight guests, additional occupants, quiet hours, use of shared facilities and holiday opening. If you need a particular access feature, appliance, room set-up or parking space, ask for written confirmation that applies to the offered room and dates. Find out whether the provider can move you to a different unit and what standards the replacement has to meet.

Check who repairs supplied furniture, appliances, the heating or essential facilities. Ask how to report a fault, where to request an urgent response and when someone may enter the room. Keep an inventory and record condition at check-in. Where you disagree with an item, report it in the required channel before the stated deadline and retain proof. Check what safety procedures and emergency contacts will be available when you arrive. If a written condition conflicts with official tenant guidance, ask the local authority or a qualified adviser before deciding how to proceed.`,
      },
      {
        id: 'read-change-and-exit-terms',
        title: 'Distinguish changing the booking from ending the tenancy',
        prose: `Create a line for each risk that matters to you: a delayed offer, visa refusal, a visa still pending on move-in day, a new intake, a room that cannot be delivered and an early departure once you have moved in. Find the clause that covers each situation and record which amount you get back, what further payment might be due, and what evidence and channel you must use. A policy dealing with a refused visa does not necessarily cover one still in progress. A promised move to another room does not automatically release you from the first agreement.

In a fixed period arrangement, look for early termination or a break clause and any requirement to propose a replacement. Check whether the provider has to accept that person and when your release becomes effective. In a periodic agreement, identify the process, deadline and form of notice. Never assume that returning a key or ceasing to occupy the room ends the obligation. For example, a hypothetical agreement with a written release effective after six weeks leaves six weeks of rent to fund. At £170 per week, that is £1,020. If you also need to fund new rent during those weeks, include the overlap in your decision. This example assumes a release is available and the terms are applicable.

Before moving out, get the key return and inventory procedure, deadline and address for deposit correspondence. For a refund, learn whether it goes back to the original payer or a different account. If there is a dispute, ask for an itemised explanation and find the applicable scheme, provider complaint route or local advice service. Keep formal notices and delivery evidence until the matter is resolved.`,
        sources: [s.englandStudentTenancies.id, s.englandDeposit.id, s.irelandStudentSpecific.id],
      },
      {
        id: 'request-written-clarification',
        title: 'Ask for a written answer you can keep with the contract',
        prose: `Send exact questions with references to the clause number and offer. Ask the provider to reconcile conflicting information. For example: “My quote lists electricity as included. Can you confirm whether the fair-use amount in clause 6 is for my own room or the whole flat, and how any extra charge is split?” A useful response gives the rule and the way it will apply to that property.

Ask for the final version that contains or incorporates the answer. Compare it with what you reviewed. Save the document and date, confirmation of acceptance, payment records, and the name and contact details for questions. Give a supporter a summary of obligations, dates, and what they might have to pay. Avoid sharing identification and bank documents more widely than needed. If the answer would change whether the accommodation works for you, resolve it before committing.`,
      },
    ],
    checklist: [
      'Identify the jurisdiction, agreement type, parties and address.',
      'Confirm who will be named and what liability each person accepts.',
      'Total the written rent schedule and separate credits, fees and refundable cash.',
      'Get the rules for bills, repairs, access, occupancy and inventory.',
      'Check deposits with the relevant authority and keep payment evidence.',
      'Read exit terms for the scenarios that could change your plans.',
      'Save the final agreement, supporting documents and formal contact routes.',
    ],
    faq: [
      { question: 'Can I cancel if I find a room I prefer?', answer: 'Find the applicable cancellation, notice or break clause. If you need an agreed release, ask for written confirmation of the effective date and outstanding liability.' },
      { question: 'Does a provider have to use a deposit scheme?', answer: 'That depends on the jurisdiction and agreement. Check the official rules that apply to the specific rental and ask what evidence the provider will supply.', sources: [s.englandDeposit.id, s.irelandStudentSpecific.id] },
      { question: 'What if the clause names a payment I did not expect?', answer: 'Ask the provider to explain why it applies, how it is calculated, and whether it changes the quote. Review local rules and seek qualified help when the permitted charge is unclear.' },
    ],
    sources: [s.englandStudentTenancies, s.englandRentersRights, s.englandDeposit, s.irelandStudentRenting, s.irelandStudentSpecific, s.studyAustraliaHousing],
  },
}
