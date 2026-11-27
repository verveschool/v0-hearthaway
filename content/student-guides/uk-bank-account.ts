import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const ukBankAccount: ReviewedGuide = {
  slug: 'uk-bank-account',
  title: 'How to open a UK bank account as an international student',
  description: 'Compare payment products, check the documents each provider accepts and plan for bills before a new account is ready.',
  topic: 'Contracts and payments',
  reviewedOn: '2026-11-27',
  related: ['student-budget', 'real-cost-abroad', 'first-week', 'avoid-scams'],
  body: {
    introduction: `Your first rent payment may be due before you can open a UK bank account. Ask the housing provider how you can pay it from your current account, then check which features you’ll need for regular bills, transfers and cash withdrawals.

This guide helps incoming international students and supporters compare accounts and choose how to make the first payment. Use the chosen provider’s current product terms and documentation rules. Your university can supply evidence if eligible students can request it. The bank makes its own decision.`,
    takeaways: [
      'Check what type of account or payment product is on offer and which services it supports.',
      'Ask the bank which proofs it accepts before requesting a university letter.',
      'Make a payment plan that still works if account opening is delayed.',
      'Verify account details and pass money and documents through separate trusted channels.',
    ],
    sections: [
      {
        id: 'identify-the-payments-you-need',
        title: 'Identify the payments you need to make and receive',
        prose: `List four weeks of payments and the sources of money. Ask the accommodation provider whether it accepts a card, international transfer or another method. Check which bills require local details and which payment features you will actually use, such as direct debits and ATM withdrawals. A UK account can be helpful for regular income or costs. A student on a short exchange may find that their existing account and a regulated transfer or card service cover the initial needs. Compare the features and cost rather than choosing based on product labels.

A current account is a bank account used for everyday transactions. A basic bank account offers a more limited set of features. A student-branded product can have different course, residency and eligibility criteria. An electronic money or payment service may support receiving and sending money but the arrangements for protecting balances differ from those for a bank account. Check the legal provider and how funds are held using the FCA’s guidance, then check access, fees and support with the provider. Paying a deposit from one product does not require you to keep all your funds there.`,
        sources: [s.ukStudentBanking.id, s.fcaPayments.id],
      },
      {
        id: 'prepare-proof-the-provider-accepts',
        title: 'Prepare evidence the provider says it will accept',
        prose: `Ask what identity, immigration and address records the bank needs for your circumstances. It may request a passport, evidence of student status and a current address. Ask what formats it accepts, whether an in-person or online identity check is needed and when the process can start. UKCISA and the University of Warwick explain common requests. Ask your own institution when it issues a letter, what address appears on it and whether it can address it to the chosen bank.

If you live in temporary housing, ask whether your evidence can be accepted and what to update when you move. If you use digital immigration evidence, follow the official process for the evidence requested. Check that your name and identifying details match the application. Submit records only through the verified route. A person offering to help you does not need your banking password or a code that authenticates a session.

If your university letter shows your temporary address but you’ve already moved, ask the bank what proof it accepts for the new address. Then ask your university whether to update your student record before requesting a new letter. Getting that order right can save a second appointment.

If you are unable to obtain a requested document, ask for a permissible alternative and how to resume the application. Record the earliest date you can complete the missing step and plan a second option. Keep an application reference and contact the provider using its published support route if you cannot find a status update.`,
        sources: [s.ukStudentBanking.id, s.warwickBanking.id],
      },
      {
        id: 'bridge-your-first-payments',
        title: 'Bridge your first rent and day-to-day costs',
        prose: `List major bills in the currency in which they must be received. Ask when money needs to clear and which methods the provider accepts. Compare the amount the recipient receives, time, exchange rate and fees at both ends. If the account is not yet open, ask whether a verified alternative is available. A housing provider may take a foreign card, an overseas transfer or another method. If the payer will be a supporter, verify what reference to use and whether the provider accepts a third-party payment.

For example, a student owes £900 before check-in. A transfer service estimates two to four business days after verification of a new recipient. If the balance must arrive on Friday, sending it on Thursday could be too late. Confirm a permitted alternate route or arrange cleared funds earlier. Keep a separate way to cover food and transport if the transfer or primary card fails.

Once an account opens, test access and confirm it can perform the tasks you chose. Get the official support contact, secure access and payment alerts. Record which bills are automatic and when each is due. Confirm payment details have actually been updated before cancelling an old instruction. Keep receipts and do not share login details or one-time codes with anyone who asks to check a payment.`,
        sources: [s.warwickBanking.id, s.fcaPayments.id],
      },
    ],
    checklist: [
      'List the payments and features you need, then compare provider terms.',
      'Find the provider’s checklist for identity, address, immigration and study.',
      'Check when your university can give you eligible records.',
      'Verify an alternative way to pay during the opening period.',
      'Record bank charges, amount received, reference and deadline.',
      'Test the account before relying on it for a major payment.',
    ],
    faq: [
      { question: 'Does every bank want a physical university letter?', answer: 'Check which formats and documents your chosen provider accepts. Ask your institution when it can issue suitable evidence.', sources: [s.ukStudentBanking.id] },
      { question: 'Can I apply before arriving?', answer: 'Some products may let you start an application. Ask when you can verify your identity, use local payment details and access money.', sources: [s.warwickBanking.id] },
      { question: 'What if my rent is due before I have a UK account?', answer: 'Ask the provider which verified payment alternatives it accepts. Compare when each will settle and keep separate money available for everyday costs.' },
    ],
    sources: [s.ukStudentBanking, s.warwickBanking, s.fcaPayments],
  },
}
