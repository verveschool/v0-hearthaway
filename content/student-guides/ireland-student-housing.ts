import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const irelandStudentHousing: ReviewedGuide = {
  slug: 'ireland-student-housing',
  title: 'How to choose and rent student accommodation in Ireland',
  description: 'Compare student-specific residences, private rentals and digs in Ireland, and check deposits, RTB registration and notice rules.',
  topic: 'Destination housing',
  reviewedOn: '2026-11-27',
  related: ['halls-vs-private', 'tenancy-agreement', 'avoid-scams', 'first-week'],
  body: {
    introduction: `Two rooms near the same Irish campus can come with different rights, payment rules and notice procedures. A room offered by a college or private residence can be Student Specific Accommodation. A flat rented from an ordinary landlord can be a private residential tenancy. A room in an individual homeowner's own home may be offered as digs under another arrangement. Knowing which one is on offer gives you a better starting point than comparing prices alone.

This guide is for international students and supporters considering accommodation in the Republic of Ireland. It explains which questions to put to the provider, what the Residential Tenancies Board (RTB) says about registration and payments, and how to keep housing records separate from immigration registration. Seek local advice if the type of arrangement is disputed or unclear.`,
    takeaways: [
      'Identify the housing arrangement and who controls the property before paying.',
      'Use the RTB rules for deposits, advance rent and term that apply to your agreement.',
      'Plan the contract around the academic calendar, including placements or late assessments.',
      'Keep housing and immigration registration on separate checklists.',
    ],
    sections: [
      {
        id: 'identify-the-housing-type',
        title: 'Start with the type of housing and who lives there',
        prose: `If the housing is designated exclusively for students during the academic term, ask whether the provider registers it as Student Specific Accommodation, or SSA. Both colleges and private providers can offer registered SSA. The RTB covers the relevant SSA tenancies and licences. The mere fact that a tenant is a student does not make an ordinary private rental SSA.

In a standard private rental, establish whether you are signing for your own room or for a whole home jointly with housemates. Ask who is responsible for rent if someone moves out, whether guests can stay and who pays utilities. If you rent in a homeowner's home, find out what you can use, how meals or access work and what notice either side can give. The RTB describes an exception for certain owner-occupied arrangements involving an individual landlord. A company using the word “digs” in marketing does not necessarily meet that exception.

Keep three records for each offer: legal housing type, services included, and daily-life terms. An arrangement with limited regulatory coverage can suit a student who values family-style support. Find out how to resolve a problem if the house rules, travel or schedule stop working for you.`,
        table: {
          caption: 'Housing arrangements to check in Ireland',
          columns: ['Offer', 'First question', 'Practical check'],
          rows: [
            ['College or private student residence', 'Is this Student Specific Accommodation registered with the RTB?', 'Term, individual agreement, utilities and check-in'],
            ['Ordinary private room or flat', 'Am I renting one room or sharing responsibility for the dwelling?', 'Rent, utilities, housemates, notices and registration'],
            ['Digs or room in an owner’s home', 'Who lives there, and what kind of agreement is offered?', 'Access, meals, visitors and notice'],
          ],
        },
        sources: [s.irelandStudentRenting.id, s.irelandStudentSpecific.id],
      },
      {
        id: 'check-registration-and-authority',
        title: 'Check who is offering the room and how registration works',
        prose: `Ask who signs the agreement, who manages the property and who receives the money. Verify these details using the housing office or provider's official contact, found independently. If an agent or current tenant is offering a room, ask for evidence of their authority to let it. Where possible, arrange a viewing yourself or through someone you trust. Save the written price, deposit conditions, address and name of the person offering it.

The RTB says eligible private tenancies and SSA arrangements must be registered. Its guidance explains the provider's responsibility and how to check the specific register. A name in a register does not prove that a message came from the genuine provider or that a particular room is available. Because registration occurs after a tenancy begins, a search for a new tenancy may not find it beforehand. Ask what record applies and what the provider will do after you sign. If something does not make sense, ask the RTB or the university housing service how to interpret it.

Ask for the complete terms and get a receipt for payments. If account details change, verify them independently again. A legitimate short stay can give you time for in-person checks if a remote offer cannot be verified. Compare the dates and late-arrival options before arranging your backup.`,
        sources: [s.irelandStudentRenting.id, s.irelandStudentSpecific.id, s.irelandTenancyRegister.id],
      },
      {
        id: 'understand-deposits-and-rent',
        title: 'Check the deposit, advance rent and full commitment',
        prose: `The RTB says an SSA provider cannot require more than one month's rent as advance rent to secure the tenancy, and can request a deposit of up to one month's rent. The RTB describes a limited option to pay more advance rent by agreement where rent and tuition go to the same relevant provider. The landlord holds the deposit and should return it at the end, subject to justified deductions such as arrears, applicable unpaid bills or damage beyond normal wear and tear. Check the detailed rules for your actual agreement.

Consider an illustrative offer with €720 monthly rent. One month's advance plus a deposit of one month's rent means a €1,440 initial outlay. Check that €720 is credited towards the rent period you agree and record the other €720 under refundable cash. If the agreement adds a utility contribution and internet costs, include both in your budget. Ask for the calculation when rent is quoted weekly and initial charges are shown as a monthly amount.

For SSA, the RTB says an arrangement should be no longer than 41 weeks unless the student requests a longer stay. Check whether your term covers orientation, exams, placements and time to leave. If you need longer, ask for a confirmed extension or price a separate stay. If a form asks you to say you requested an extension when you did not, ask the RTB or a local adviser before proceeding.`,
        sources: [s.irelandStudentSpecific.id, s.irelandStudentRenting.id],
      },
      {
        id: 'plan-changes-and-move-out',
        title: 'Find the change and notice procedures before you book',
        prose: `Read the agreement for visa refusal, a late decision, a cancelled place or early departure. Check the deadline and the way you have to give notice. For fixed-term SSA, RTB guidance describes a period from 1 May to 1 October during which a student can end the tenancy by serving valid 28-day notice. Follow the instructions for your dates and circumstances and check the separate rules outside that period. Different agreement types may have different notices.

At key collection, record condition and inventory and report faults promptly. At move-out, check how to hand back the keys, where to send the final condition record and who receives the deposit. If you dispute a deduction, preserve evidence, receipts and notices and ask for an itemised explanation. Look up RTB dispute resolution when the arrangement falls within its remit. For other arrangements ask the university or a local advice service what routes are available.`,
        sources: [s.irelandEndingStudentTenancy.id, s.irelandStudentRenting.id],
      },
      {
        id: 'prepare-for-arrival',
        title: 'Match arrival and registration to your dates',
        prose: `Test the commute to your actual campus before choosing a place. Check an early class and a late return, including the final walk and a fallback service. Find the key collection location separately from your room address. Ask about late handover and arrange a verified alternative if needed. Allow enough time and money to move from any temporary housing.

Housing registration with the RTB and registration of a student's immigration permission are separate. If you need to register your immigration permission, follow Irish Immigration Service Delivery's instructions and check the evidence you have to provide. Ask the university and accommodation provider what address documentation they can supply, and store your agreement, receipts and official records securely.`,
        sources: [s.irelandRegistration.id, s.irelandStudentSpecific.id],
      },
    ],
    checklist: [
      'Identify the agreement type and whether it is within the RTB’s remit.',
      'Verify the provider, room and payment details through a separate contact.',
      'Check written deposit, rent, contract length and utility terms.',
      'Read the relevant notice rules and visa or deferral terms.',
      'Check the campus route, key handover and any bridging accommodation.',
      'Keep the agreement, receipts, condition report and registration records.',
    ],
    faq: [
      { question: 'Is a room rented by a student automatically SSA?', answer: 'No. The RTB considers the type and use of the accommodation. A student in an ordinary private rental can have a different agreement.', sources: [s.irelandStudentSpecific.id] },
      { question: 'Who holds the SSA deposit?', answer: 'The RTB explains that the landlord holds the deposit. Verify the payment recipient and get a receipt.', sources: [s.irelandStudentSpecific.id] },
      { question: 'Can an SSA provider insist on a year?', answer: 'RTB guidance limits the normal term to 41 weeks unless the student requests longer. Check that guidance and the written terms before accepting an extension.', sources: [s.irelandStudentSpecific.id] },
    ],
    sources: [s.irelandStudentRenting, s.irelandStudentSpecific, s.irelandTenancyRegister, s.irelandEndingStudentTenancy, s.irelandRegistration],
  },
}
