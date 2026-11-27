import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const afterRentalScam: ReviewedGuide = {
  slug: 'after-rental-scam',
  title: 'What to do after a suspected rental scam or misdirected payment',
  description: 'Act quickly on the payment, preserve evidence and arrange safe backup housing if an offer falls through.',
  topic: 'Safety and verification',
  reviewedOn: '2026-11-27',
  related: ['avoid-scams', 'first-week', 'choose-accommodation'],
  body: {
    introduction: `If you discover you paid someone who may have impersonated your accommodation provider, act on two problems at once. Your bank or payment provider needs enough information to respond to the transaction. You also need a safe, independently verified place to stay. If the student will arrive soon, a supporter can help with accommodation while the person who made the transfer speaks to the bank.

A suspicious message, an accidental transfer and a dispute with a genuine provider can require different responses. Start with the actions that protect you in all three cases: pause additional payments, verify the real provider through a channel you already trust, and speak directly to the service that sent the money. You can describe what happened before deciding what type of case it is.`,
    takeaways: [
      'Contact your payment provider immediately through a verified channel and ask what can be done.',
      'Keep original records and write down a short timeline while the details are fresh.',
      'Secure any account or document that may have been exposed.',
      'Arrange the next safe night independently and report through the right local channel.',
    ],
    sections: [
      {
        id: 'act-on-the-payment',
        title: 'Contact the payment provider and explain what happened',
        prose: `Call the bank, card issuer or payment service using the number on your card, its official website or its app. Avoid a number or payment link from the disputed messages. If someone else paid, ask them to call from their own account and share the legitimate transaction reference. Give the amount, currency, date and time, method and recipient details from the receipt. If the payment is still scheduled or pending, ask whether the provider can stop it. If it has left, ask about tracing, recall, a card dispute or any relevant fraud claim. Ask for a reference, what documents the provider needs and the next deadline.

Tell the provider whether you authorised a transfer after receiving false instructions, saw a transaction you did not make or chose the wrong recipient by mistake. Describe the facts plainly and let them classify the claim. Rules and available remedies can depend on the payment method, provider, countries and circumstances. Plan for the possibility that no funds come back in time to cover replacement accommodation. Do not pay twice on the assumption that someone will refund the first amount.

If you paid from a shared funding arrangement, agree who will own each follow-up. A supporter may be the named payer who can act with the bank, while the student has the provider messages. Exchange the reference and relevant receipts using a secure method. Avoid sharing account logins, personal verification codes or more identification than the verified institution requires.`,
        steps: [
          'Use your bank’s official contact and identify the disputed payment.',
          'Ask whether the payment can still be stopped or whether you need to open a case.',
          'Write down the case reference, next deadline and evidence requested.',
        ],
        sources: [s.rentalFraud.id, s.fraudReporting.id, s.fcaPayments.id],
      },
      {
        id: 'save-evidence',
        title: 'Build a small case file from the original records',
        prose: `Save the original advertisement URL, provider name as shown, alleged property address, contract, invoice, changed payment instructions and receipt. Include emails with their full addresses, screenshots with dates and times, and the transaction reference. Write a short sequence that says when you received the offer, what you checked, when the instructions changed, when you paid and how you discovered the problem. Avoid editing originals. Make a copy with sensitive details removed if you need to share the information with a housing or university contact.

Use the provider's official channel to ask whether it recognises the agreement, invoice or booking. Real addresses and real provider names can appear on fraudulent offers. Keep its reply with the evidence. If the provider says an account changed legitimately, ask it to identify your payment and explain the reconciliation before making another transfer. If it confirms impersonation, ask for written confirmation and where to report the fake listing.

Report according to the authorities and marketplace applicable to you and the location involved. For example, Report Fraud sets out the route for England, Wales and Northern Ireland and directs people in Scotland to Police Scotland. An incident involving funds sent across borders could involve more than one organisation. Ask the verified payment provider and the local reporting service which records to provide. Keep the report reference and any follow-up schedule.`,
        sources: [s.rentalFraud.id, s.fraudReporting.id],
      },
      {
        id: 'reduce-follow-on-harm',
        title: 'Secure accounts and address exposed documents',
        prose: `List what you disclosed, such as account details, email address, login information, identity documents or bank statements. If you shared a password, change it from a trusted device and remove reused copies on other services. Check account recovery information and recent activity, and ask your bank how to monitor or restrict access. If you sent identity documents, ask the appropriate issuer or local fraud support service what protective measures apply to those documents in your situation. Record any suspicious follow-up with the existing case.

People who know you lost money may approach you claiming they can recover it, sometimes in exchange for a fee or a verification code. Use the original bank and official reporting channels for updates. Ask for a new message or instruction to be checked before you act on it. Retain follow-up messages as evidence rather than continuing to negotiate with the sender.`,
        sources: [s.rentalFraud.id, s.fraudReporting.id],
      },
      {
        id: 'find-safe-housing',
        title: 'Confirm a safe place to stay while the case is investigated',
        prose: `If travel is imminent, contact your university housing or international office through official details. Ask for short-term accommodation, emergency support where available, and help understanding the local rental process. Inform the verified accommodation provider if you thought you were due to check in and their name was used. Place a hold only after checking who manages the temporary accommodation, the dates, key handover, payment terms and any costs of changing the booking. If you are already in the city, plan the route from your current location and make sure you can get through the door when you arrive.

For example, a student has sent £650 and is due in two days. The transfer service has opened an investigation but has given no repayment date. A verified short stay in this illustration costs £210, and a journey there costs £30. The immediate plan needs £240 from available funds, with the £650 tracked separately as disputed. Staying with an authorised supporter or asking for emergency university help may change that figure. The replacement housing decision should use funds that are actually accessible and avoid another rushed transfer.

Once the immediate plan is stable, check whether the dispute is with a real landlord. An unexpected fee, late deposit return or contractual disagreement might call for a housing complaint or tenancy dispute process. Keep records and ask the appropriate local housing authority or adviser which route fits. Review future offers with a supporter while the pressure to secure housing is still high.`,
        sources: [s.rentalFraud.id, s.irelandStudentRenting.id],
      },
    ],
    checklist: [
      'Pause further payments and contact the sending provider through an independently verified channel.',
      'Ask about the transaction status, available remedies, timelines and case reference.',
      'Preserve original messages, the listing, contract, receipt and a dated timeline.',
      'Verify the real provider separately and use the appropriate local reporting route.',
      'Review shared information and secure accounts or documents where necessary.',
      'Make an independently verified plan for the next night and key collection.',
    ],
    faq: [
      { question: 'Should I wait for the landlord to reply before calling my bank?', answer: 'Contact the bank or service as soon as you suspect a fraudulent or misdirected payment. You can confirm the accommodation details separately.', sources: [s.rentalFraud.id] },
      { question: 'Does making a fraud report get my money back?', answer: 'Reporting records the incident. Ask the sending provider separately about any recall, dispute or reimbursement process and its deadlines.' },
      { question: 'What if I have not paid but shared my passport?', answer: 'Record what you shared and notify the relevant issuer or local fraud support service. Check your exposed accounts and use official sources for any next step.' },
      { question: 'Can a parent call on my behalf?', answer: 'A parent can help prepare records or contact accommodation services with your agreement. Check with the bank who can act on the paying account and how it deals with authorised representatives.' },
    ],
    sources: [s.rentalFraud, s.fraudReporting, s.fcaPayments, s.irelandStudentRenting],
  },
}
