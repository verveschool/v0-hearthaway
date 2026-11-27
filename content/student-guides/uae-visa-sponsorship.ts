import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const uaeVisaSponsorship: ReviewedGuide = {
  slug: 'uae-visa-sponsorship',
  title: 'Student residence sponsorship in the United Arab Emirates',
  description: 'Find out who can sponsor your student residence, which authority handles it and how to plan housing around approval or renewal.',
  topic: 'Before departure',
  reviewedOn: '2026-11-27',
  related: ['uae-housing-furnished', 'uae-tax-free-income-planning', 'student-visa', 'pre-arrival-checklist'],
  body: {
    introduction: `Receiving an offer from a university in the United Arab Emirates (UAE) does not complete your residence process. You need to confirm which route is suitable, who will act as sponsor, who issues the permission and what you must do before travel or after arrival. The need to make a housing decision can come before all of those dates are known.

This guide is for students and supporters weighing university or parent sponsorship and planning accommodation around the process. Start with official UAE guidance, then ask your university for the procedure and authority for your case. Other residence routes and individual eligibility can require separate guidance.`,
    takeaways: [
      'Confirm whether an eligible UAE-resident parent or an accredited education institution can sponsor your route.',
      'Find the authority responsible for your application and which stages happen before or after travel.',
      'Check change and refund terms before committing housing money while approvals are pending.',
      'Treat employment permission and post-study status as separate questions.',
    ],
    sections: [
      {
        id: 'identify-the-sponsor-and-authority',
        title: 'Separate the sponsor, university and issuing authority',
        prose: `The UAE Government describes student residence under sponsorship of an eligible parent who is a resident of the UAE or the accredited university or college at which the student studies. Its guidance explains that a student may need evidence from the institution about the duration of study. A sponsor takes on a role in the process. It does not replace the immigration authority responsible for issuing permission.

Ask your university which option you can use for your specific course and whether it offers sponsorship. Confirm which authority processes the application and which department within the university supplies evidence or submits paperwork. If a parent may sponsor you, check conditions for your circumstances with the official authority. If you already hold a different status, ask whether you need to do anything before enrolling, travelling or changing programmes.

For Dubai, the General Directorate of Residency and Foreigners Affairs (GDRFA) has a service page for student residence, with its own requirements and steps. Use that page where appropriate and identify the responsible authority for another emirate or route. Requirements, fees and processing can differ. Ask who can give a written update rather than relying on a process time quoted for someone else.`,
        sources: [s.uaeStudentResidence.id, s.dubaiStudentResidence.id],
      },
      {
        id: 'map-application-travel-and-arrival',
        title: 'Write down the steps before travel and after arrival',
        prose: `Ask what the university needs before it will start the application, such as confirmed admission or an institutional certificate. Get a list of documents from the relevant authority and university. Mark which party obtains each document and whether the authority needs originals, a specific format or correctly matched names and dates. Ask where a medical check, Emirates ID steps or health insurance fit if required for the route. The Dubai student residence service lists requirements including medical examination, ID-related evidence and health insurance. Confirm the sequence that applies to you.

Create one timeline with the housing start date and another with the formal immigration and enrolment steps. Mark which commitments depend on a decision and which can carry ahead safely. For example, if qualifying entry permission is not ready, paying a fixed room term may not solve the timing. Ask whether you can change the start date, whether a late arrival is possible, and what happens if the visa is still pending when rent starts.

Collect the permission and any written arrival instructions before committing to travel. Review which details you must present to the carrier or after arrival, and save the relevant records. If the dates change, ask the university what it can confirm and when the authority expects you to act. Keep the accommodation provider updated through its verified contact and retain any agreed changes.`,
        sources: [s.uaeStudentResidence.id, s.dubaiStudentResidence.id],
      },
      {
        id: 'protect-the-housing-plan',
        title: 'Protect your housing plan against changes',
        prose: `Ask which payment is refundable and what the provider requires to approve cancellation. A policy for a formal visa refusal may not cover a pending application, a missed move-in date or a programme deferral. Ask which account or address receives notice, what evidence qualifies and when a refund is processed. Include any temporary stay and second transfer in your budget.

For example, suppose a residence offers a lower-priced fixed term with an illustrative AED 1,000 retained if the booking cannot go ahead, while another offer costs AED 600 more over the whole study period but allows a defined change if permission is delayed. Compare the actual conditions on both offers. The flexible option is helpful only if it truly covers your likely change and you can meet the notice conditions. Confirm the approved accommodation and available entry dates before booking a flight or assuming a delayed handover is allowed.

Ask about renewal or change before the current permission expires. A housing application, renewal or key handover could require identity or address records on a different date. If you are moving between emirates, get the applicable details from both the provider and the responsible official service. Save an accessible copy of the accommodation and residence records that apply to you.`,
      },
      {
        id: 'separate-study-from-work',
        title: 'Check work and later residence separately',
        prose: `Studying under university or parent sponsorship does not itself establish which employment you may take. For a proposed job or training placement, ask the employer or institution which authority and permission apply, when work may start and which written terms govern the placement. Article 6 of the federal labour law sets out work-permit requirements. Confirm the applicable process with the employer and authority for the role.

When changing programmes, finishing early or graduating, ask what happens to the current sponsorship and what date you must act by. A job offer is not the same as a residence or work authorisation. Ask the employer who is responsible for the process and obtain the written details. Keep housing costs covered if the work or status transition takes longer than expected.`,
        sources: [s.uaeStudentResidence.id, s.uaeEmployment.id],
      },
    ],
    checklist: [
      'Confirm the route, sponsor and authority for your circumstances.',
      'Ask the university for its part of the process and verify the official document list.',
      'Record the timing of entry, arrival, insurance and any identification steps.',
      'Verify payment, notice and refund terms before booking housing.',
      'Track renewal or change deadlines and check employment permissions separately.',
    ],
    faq: [
      { question: 'Do all students need sponsorship by their university?', answer: 'The UAE Government describes both eligible parent and accredited institution sponsorship routes. Check which option applies to you and whether another residence route is relevant.', sources: [s.uaeStudentResidence.id] },
      { question: 'Can I rely on a fixed approval date?', answer: 'Ask about confirmed milestones and plan around possible changes. Check what a housing or travel contract lets you change if a decision takes longer.' },
      { question: 'Can I work as soon as my student residence is issued?', answer: 'Check which work or training permission applies before you start. The employer or institution and the relevant authority can explain the process for the role.', sources: [s.uaeEmployment.id] },
    ],
    sources: [s.uaeStudentResidence, s.dubaiStudentResidence, s.uaeEmployment],
  },
}
