import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const ukStudentHousing: ReviewedGuide = {
  slug: 'uk-student-housing',
  title: 'Student housing across England, Scotland, Wales and Northern Ireland',
  description: 'Compare halls and private rentals across the UK, using the correct local contract, deposit and notice guidance.',
  topic: 'Destination housing',
  reviewedOn: '2026-11-27',
  related: ['halls-vs-private', 'tenancy-agreement', 'accommodation-costs', 'uk-bank-account'],
  body: {
    introduction: `Student housing in the United Kingdom includes university halls, privately managed student residences and ordinary private homes. A similar-looking room in Cardiff, Glasgow, Manchester or Belfast can come under different rules. The agreement can also differ within one city, depending on who provides the room and what type of occupation is offered.

This guide helps international students and supporters identify the correct rules before paying. Start with the actual address, the type of accommodation, the provider’s legal name and the agreement you will sign. Use the official source for the nation where you are renting and the specific type of agreement. If your housing classification or an obligation is unclear, ask your university housing service or a local qualified adviser.`,
    takeaways: [
      'Treat the location and agreement type as separate checks.',
      'Distinguish upfront rent, a holding payment, a tenancy deposit and a guarantee.',
      'Use the relevant rules to check liability, deposit protection, notice and exemptions.',
      'Compare the actual campus route, term dates and cancellation options.',
    ],
    sections: [
      {
        id: 'identify-your-potential-agreements',
        title: 'Start with the room, legal provider and purpose of the agreement',
        prose: `Ask whether you are applying for a university allocation, a privately managed student residence or a private room or flat. Confirm the occupancy window, when you can get your keys, which people can live there and what you share. A hall can have its own guest rules, support hours, application process and policy for early departure. A private shared house can use a contract for one room or a joint agreement for the whole house. Find out how you would leave or replace a tenant, and whether any liability extends beyond your own share.

Ask whether a deposit or security is refundable, who holds it, and which proof to expect. Ask how a holding amount is treated if you proceed or if either party withdraws. If a guarantor is requested, send the guarantor the actual terms and clarify whether it covers your room or the joint obligation. Establish any acceptable alternatives and check the local rules before relying on a request for advance rent. Check the written offer even if the provider uses a familiar label in its advertising.`,
        sources: [s.englandStudentTenancies.id, s.northernIrelandStudentRenting.id],
      },
      {
        id: 'england-renting',
        title: 'Check the current private renting and halls rules in England',
        prose: `England’s official guidance distinguishes private renting from university halls and private halls. From 1 May 2026, assured periodic tenancies replaced assured shorthold tenancies under the reforms described by GOV.UK. The typical arrangement with a private landlord is different from the common law tenancy or licence normally used in qualifying halls. For privately managed halls, GOV.UK points to the importance of National Code membership when assessing the exclusion. Ask the provider which agreement it uses and check the details in the official guide. A fixed hall term can carry rent liability to the end unless the applicable rules or agreement allow you to leave earlier.

Use the Tenant Fees Act and deposit guides for the arrangement you are considering. They explain distinct payment categories and the circumstances in which deposits require protection. The Renters’ Rights Act overview describes changes that apply in England and exceptions that can affect student housing, including a specific route for landlords of certain student houses in multiple occupation. Check the rules applying to your agreement and planned dates instead of reading an older guide on assured shorthold tenancies as current general advice.`,
        sources: [s.englandStudentTenancies.id, s.englandRentersRights.id, s.englandTenantFees.id, s.englandDeposit.id],
      },
      {
        id: 'scotland-wales-northern-ireland',
        title: 'Use the separate sources for Scotland, Wales and Northern Ireland',
        prose: `In Scotland, start with the Scottish Government’s private residential tenancy guidance for an ordinary private let. It describes the model terms and treatment of deposits within its scope. Some student accommodation is excluded from the private residential tenancy regime when it meets the statutory criteria. If you are offered halls or specialist accommodation, ask which terms and protections apply rather than assuming they match a private flat.

In Wales, the Welsh Government’s guidance describes the standard occupation contract used mainly in the private rented sector. Use the actual written statement to check charges, term, permitted occupancy and how notice applies. The Welsh deposit guidance sets out when protection applies. If a provider offers a term-time contract, confirm which dates it actually lets you occupy the room and which steps apply to the type of arrangement.

In Northern Ireland, nidirect explains private student accommodation and deposit protection. Its guidance distinguishes a private tenancy from an occupation under a licence in university halls. Check the contract type, applicable scheme and evidence when paying. If you will share, ask whether licensing or other rules for the property apply. Do not use the England notice procedure for another nation just because the provider's brand is the same.`,
        table: {
          caption: 'Where to start when checking the rules for a UK student room',
          columns: ['Location', 'Private letting terminology to check', 'Question for the provider'],
          rows: [
            ['England', 'Assured periodic tenancy or other applicable agreement', 'If privately managed halls, how is the arrangement classified and does the provider meet the Code condition?'],
            ['Scotland', 'Private residential tenancy or relevant exclusion', 'Does the agreement fall within the private residential tenancy rules?'],
            ['Wales', 'Standard occupation contract where applicable', 'What do the written terms say about occupancy and deposit?'],
            ['Northern Ireland', 'Private tenancy or halls licence', 'What deposit and notice provisions apply to this arrangement?'],
          ],
        },
        sources: [s.scottishTenancy.id, s.welshStandardContract.id, s.welshDeposit.id, s.northernIrelandStudentRenting.id, s.northernIrelandDeposit.id],
      },
      {
        id: 'compare-the-cost-and-run-your-week',
        title: 'Compare contract dates, the campus route and funding',
        prose: `Get the total from the actual timetable of rent charges. Ask what is included, including heating, internet, laundry and common services. In England, full-time student households can qualify for Council Tax treatment described in the government’s guidance. Check the local rules and evidence for your address and occupancy instead of assuming what happens when a course finishes or someone who is not a full-time student moves in. Keep any decision or proof from the relevant authority.

For example, an illustrative hall at £187 for 41 weeks costs £7,667 before excluded items. A room at £170 for 46 weeks costs £7,820, even before any separately billed utilities. The second room still may work better if its longer period covers a placement or other need. Check whether you will owe or need alternative accommodation over breaks and whether a shorter offer has a later key date. Map the actual commute from the building to your campus entrance, including late and disrupted travel. Price any regular transit separately.`,
        sources: [s.englandCouncilTax.id],
      },
      {
        id: 'keep-records-and-prepare-to-move',
        title: 'Keep records you can use if dates or conditions change',
        prose: `Verify payment instructions before paying, especially if an invoice changes. Keep the entire agreement, written room promise, payment statement, relevant scheme details and provider contacts. If a visa or offer is pending, read how the contract handles late arrival, refusal, withdrawal and changing your intake. Ask what notice format, evidence and deadline apply. Compare refund timing with the cash you would need to fund temporary accommodation.

At the handover, check the written inventory, access and emergency contacts. Report defects using the required process and retain confirmation. Ask who handles repairs or disputes and how to reach them. Before leaving, follow the notice requirement for your situation and record the property condition, paid-out costs and key return. Ask a local adviser about the applicable route when a provider disputes notice or a deduction.`,
      },
    ],
    checklist: [
      'Identify the nation, legal provider, agreement type and exact occupancy dates.',
      'Check local rules for payments, deposit custody and notice.',
      'Compare rent and other charges on the dates actually covered.',
      'Check the campus journey, facilities and support you need.',
      'Keep written terms, the verified payment details and condition evidence.',
      'Check what happens if your offer, visa or stay changes.',
    ],
    faq: [
      { question: 'Do all UK halls protect deposits in the same way?', answer: 'Check the nation and the legal arrangement. The official guides distinguish private tenancies from some halls agreements and explain what applies within their scope.', sources: [s.englandDeposit.id, s.northernIrelandDeposit.id] },
      { question: 'Can I treat a cheaper weekly quote as the cheaper room?', answer: 'Compare the number of charged weeks and the included services, then price travel, uncovered dates and other expenses.' },
      { question: 'Can I leave any UK student agreement when my course ends?', answer: 'Check the actual terms and local law for notice, fixed periods and early release. The last class and the last day for which you owe rent can differ.' },
    ],
    sources: [s.englandStudentTenancies, s.englandRentersRights, s.englandTenantFees, s.englandDeposit, s.scottishTenancy, s.welshStandardContract, s.welshDeposit, s.northernIrelandStudentRenting, s.northernIrelandDeposit, s.englandCouncilTax],
  },
}
