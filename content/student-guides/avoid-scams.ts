import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const avoidScams: ReviewedGuide = {
  slug: 'avoid-scams',
  title: 'How to spot and avoid student rental scams',
  description: 'Verify that the room exists, the offer is authorised and the payment instructions are genuine before you commit.',
  topic: 'Safety and verification',
  reviewedOn: '2026-11-27',
  related: ['choose-accommodation', 'tenancy-agreement', 'after-rental-scam', 'first-week'],
  body: {
    introduction: `You find a room in the right area, agree the price and are told several people are ready to pay. What can you check without losing your chance? Work through three separate questions. Does the room exist and match the offer? Can this person or organisation legally offer it? Are these the right payment instructions? A real photograph can answer only a small part of the first question.

This guide is for students arranging accommodation from overseas and people helping them check that an offer is legitimate. Use it before paying a holding amount, sending identity paperwork or signing. A real provider should be able to explain their process, which facts they can confirm and who can give you independent confirmation.`,
    takeaways: [
      'Check the property, authority to let it and payment instructions separately.',
      'Look up contact details independent of the listing and use them to confirm the offer.',
      'Treat a sudden change of payee or payment link as a reason to stop and re-verify.',
      'Save your evidence and contact your payment provider promptly if you suspect a payment fraud.',
    ],
    sections: [
      {
        id: 'confirm-the-property',
        title: 'Confirm the offer is for a real, identifiable room',
        prose: `Ask for the complete address including building name or number, room type, term and the exact date it can be occupied. Compare it with the provider website, the address you see on a map and information from your university if the offer refers to one of its residences. A match makes the offer plausible but does not establish who controls the advert.

Arrange a viewing by you or someone you trust where possible. If distance makes that difficult, ask your university housing service what checks it recommends and what accredited or managed options it can point you to. Request a live viewing of the actual accommodation and ask what parts of the viewing are representative. Someone may legitimately be unable to enter an occupied room. Ask what is guaranteed in writing and see whether an independent source can verify that offer. A photo with no room number or floor can be authentic and still be a different room.

Look for inconsistency across the listing, contract and provider confirmation. Check whether an unusually low price is for a bed, a room or an entire apartment, whether it is a short promotion and what dates it covers. Contact a real provider using details from its own site if photos or property names appear connected to it. A copied image or incorrect availability claim becomes more meaningful when you can compare it against an independent record.`,
        sources: [s.rentalFraud.id, s.irelandStudentRenting.id],
      },
      {
        id: 'verify-authority',
        title: 'Ask who is entitled to rent it out',
        prose: `Identify the legal name on the agreement and the role of the person you are speaking with. An owner, management company, campus housing office, agent and current tenant can each have different authority. Ask what evidence they can provide. If the arrangement is a sublet, check who can authorise it and whether the current tenant has permission to offer it. Do not assume that someone with a key can grant you a valid tenancy.

Look up an official record relevant to the location where one is available. For example, Ireland's Residential Tenancies Board explains which arrangements require registration, how to check and where exceptions apply. Understand what the specific record proves. A registered tenancy, a real company or a commercial directory entry does not by itself prove that the sender represents the named party or that your future room is available. If a record is missing, find out whether it should already exist before treating the absence as proof of fraud.

If the listing claims that an institution endorses it, ask the housing or international office for confirmation using contact information from the institution's website. If you are comparing offers through HearthAway, ask which details are provider-confirmed and where to obtain the official contract. HearthAway can help you understand options and ask questions. Verify the identity and payment instructions of the responsible party independently.`,
        sources: [s.irelandStudentSpecific.id, s.hearthawayRole.id],
      },
      {
        id: 'verify-payment',
        title: 'Verify the payment recipient and purpose before sending money',
        prose: `Ask for a written breakdown showing the amount, currency, purpose, recipient, reference and what happens if the booking does not go through. Look up the provider's official phone number, reception or account portal independently. Have that contact confirm the amount, payee and invoice reference. If someone gives a different payee because an agent collects fees or a provider has several legal entities, ask the verified contact to explain the arrangement in writing.

An example: you have booked a viewing and received an invoice from the established provider. A new message that appears in the same conversation says its account is temporarily unavailable and asks you to use a different bank account today. Pause. Use the number you verified when you shortlisted the room, and ask the provider's finance or reception contact to confirm the change and the correct payment route. Let a supporter know why the delay matters so they do not forward the money independently.

Ask your provider which payment options are available. The options, costs and potential recovery rights depend on the payment route and jurisdiction. A matching payee name can help but cannot tell you whether the sender is genuine or the person is entitled to let the room. If you do use an approved method, retain the invoice, verified confirmation and transaction receipt. Do not forward one-time codes or banking passwords as proof of payment.`,
        sources: [s.rentalFraud.id, s.fcaPayments.id],
      },
      {
        id: 'handle-pressure-and-documents',
        title: 'Make it easier to pause under pressure',
        prose: `A real offer can have a deadline. A warning sign is being told that you must pay immediately and cannot check details, speak to a known company representative or see the relevant paperwork. Agree ahead of time what requires a second pair of eyes. If a person changes the price, payment route or room at the last moment, ask for a new written offer and repeat the checks. A refundable temporary option can give you time to decline a suspicious offer when you are close to arrival.

Ask why identification or financial records are needed, who receives them and what secure method the provider offers. Send only the information needed for that stage. A contract or identity claim from a stranger should not cause you to share confidential documents before you have verified them. If a provider asks for a bank statement, ask whether a suitable proof with unnecessary data removed will meet its requirement. Keep the original where you can find it without circulating it.

If you already paid or sent sensitive information, contact the bank or payment provider on its independently verified channel. Record when you sent the payment or document, save the original correspondence and tell the verified provider about the impersonation. Use the applicable local reporting route and ask your university about emergency accommodation if your plans have been disrupted.`,
        sources: [s.rentalFraud.id, s.fraudReporting.id],
      },
    ],
    checklist: [
      'Confirm full address, actual room or promised room type, price and dates.',
      'Arrange a viewing and get independent advice when you cannot attend.',
      'Identify who owns, manages or is authorised to offer the space.',
      'Compare the offer, agreement and invoice before payment.',
      'Verify a changed recipient or payment link through a trusted source.',
      'Share only necessary documents and retain your evidence.',
    ],
    faq: [
      { question: 'Does an in-person viewing guarantee the arrangement is genuine?', answer: 'No. It helps you verify the room. You still need to establish the person’s authority, written offer and payment instructions.' },
      { question: 'Does a deposit scheme verify the listing?', answer: 'A scheme can confirm information within its remit. Check what it covers and independently verify the particular room, sender and transaction.' },
      { question: 'What if the offer will expire while I check?', answer: 'Ask for a short extension and take the next-best verified option if you cannot resolve an important inconsistency. Include temporary accommodation in your backup plan.' },
    ],
    sources: [s.rentalFraud, s.fraudReporting, s.irelandStudentRenting, s.irelandStudentSpecific, s.fcaPayments, s.hearthawayRole],
  },
}
