import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const healthcare: ReviewedGuide = {
  slug: 'healthcare',
  title: 'How to find healthcare as an international student',
  description: 'Check eligibility, insurance dates, local registration, expected charges and where to seek routine or urgent care.',
  topic: 'Student life',
  reviewedOn: '2026-11-27',
  related: ['pre-arrival-checklist', 'student-visa', 'first-week', 'real-cost-abroad'],
  body: {
    introduction: `Moving abroad can change where you book a routine appointment, which services your health cover helps pay for, and what you need to show when you turn up. Make a plan before you become unwell. This guide helps you and a supporter check access and costs. It also helps you prepare for a gap in routine treatment, an unfamiliar out-of-hours system or a move from temporary to permanent housing.

Treat eligibility, registration and cost as different questions. An insurance card or immigration document may establish some cover. It may still take a separate step to enrol with a practice, and the treatment you need may have charges or require you to use a particular provider. Identify the official rules and the documents you need for your own situation.`,
    takeaways: [
      'Find the rules for your immigration status, study period, destination and any accompanying family.',
      'Check start and end dates, services, exclusions and how charges are handled.',
      'Save separate contacts for routine, urgent and emergency care.',
      'Make an early plan for continuity of medicines or treatment with qualified professionals.',
    ],
    sections: [
      {
        id: 'confirm-coverage-before-travel',
        title: 'Confirm the applicable coverage before travel',
        prose: `Start with the authority that governs your student route and the public health authority or insurer. Ask whether you need insurance or a surcharge, when coverage starts and what evidence must be accepted for your route. If an institution organises a policy, ask for the issuer, covered names and dates and the actual written terms. Compare those with your travel dates. Your arrival could be earlier than the first day of a policy intended for your course. Cover while abroad, cover for transit and a policy for cancelled travel can have different purposes.

Check the coverage of anyone travelling with you. A partner or child may need individual proof or a family policy. Ask whether the policy needs to extend beyond the last class and what happens if you defer, change your visa, suspend study or move to another location. Find out whether you need to renew cover separately from your residence permission. Record an address and a policy number you can retrieve securely.

Ask whether ineligible dates or services can be covered through another arrangement. If you receive ongoing care, raise that issue early. You need to know whether a policy excludes treatment, applies a waiting period, limits reimbursement or requires authorisation. Ask who can explain policy language and who can discuss the clinical plan. Those may be different people.`,
        sources: [s.ukHealthcare.id, s.australiaOshc.id],
      },
      {
        id: 'check-england-access',
        title: 'Checking NHS access and GP registration in England',
        prose: `GOV.UK explains when a person who has paid the immigration health surcharge, where required, can start using the NHS. Access is linked to immigration circumstances and visa dates. Payment of a surcharge is separate from registering with a general practice and some services can still carry charges. Confirm treatment costs, exemptions and relevant national rules for prescriptions, dental care and eye care. If you live elsewhere in the UK, use the health authority for that nation and the immigration guidance for your status.

The NHS in England says GP registration is free and you do not need identification, proof of address, an immigration status document or an NHS number to register. Practices usually need a way to contact you and may have a service area or other permissible reasons for declining. Consult the NHS registration guidance if you are living temporarily somewhere or a practice requests something you cannot provide. Check whether your campus has a practice or a separate wellbeing service.

Registration gives you a route for general practice care. Ask how to book, the opening hours, how to get ongoing prescriptions reviewed and what happens if you leave the area. Hospital charges or eligibility for another service are a separate question. When you are dealing with an immediate emergency, use the appropriate emergency service. Save the locally applicable urgent care number, and be ready to describe your location, symptoms and key medical information.`,
        sources: [s.ukHealthcare.id, s.englandGp.id],
      },
      {
        id: 'check-australia-cover',
        title: 'Checking Overseas Student Health Cover in Australia',
        prose: `Study Australia explains the Overseas Student Health Cover requirement for student visa holders and the exceptions that can apply. Check the Home Affairs instructions and the policy for your visa dates and any dependants. If your education provider arranged the policy, get the details and check the dates and covered names. Use the insurer's instructions for finding providers and obtaining help outside normal hours.

Ask how appointments are paid. A practice might bill an insurer directly where arrangements allow, or ask you to pay and make a claim. The amount a policy will reimburse can differ from the price the provider charges. Ask about emergency services, ambulance coverage, medicines, dental and optical care separately and check the exclusions, limits and waiting periods of your actual policy. Take note of the process for planned treatment and of any authorisation it requires. Keep the identification and proof of cover your insurer tells you to use.`,
        sources: [s.australiaOshc.id, s.australiaVisa.id],
      },
      {
        id: 'plan-for-ongoing-treatment',
        title: 'Arrange continuity if you need medication or other care',
        prose: `Before you leave, talk to the clinician managing your treatment. Ask about local prescribing rules, practical supply during travel and the effect of a delay to your first appointment. Carry a summary of your relevant conditions, generic medicine names, doses and allergies if your clinician recommends it. Use a secure, accessible format. Check the destination and any transit country's rules for bringing in a medicine, especially if it is controlled. Ask what you must declare and whether a letter, permit or original packaging is required. Check transport arrangements for equipment or temperature-sensitive supplies with your carrier.

Find a local route to an appointment before your current supply runs low. Local clinicians may need to assess you and issue a local prescription. A medicine brand, medicine strength or supplier may differ. Ask which records or translation will help and whether your insurer needs separate permission for a visit. If the first appointment will be late, ask your current clinician and the local service what legitimate options are available. Never ration or change prescribed treatment based on travel plans without appropriate advice.

If care intersects with your housing, ask what you need from the building. For example, confirm a safe place for necessary equipment, the power supply, lift access, or a way for authorised assistance to reach your room. Ask your university disability service which requests it can coordinate and which you need to raise directly with the accommodation provider.`,
      },
      {
        id: 'make-a-care-plan',
        title: 'Write down the next step for three situations',
        prose: `Plan separately for a routine appointment, help needed before the next routine slot, and an immediate emergency. Identify the practice or clinic and its booking route. Record the official local urgent-care advice and emergency contacts. Find the official instructions for interpreters or accessibility support if you need it. A residence receptionist and a university service can signpost support, but a medical emergency needs the local emergency service.

Try the plan with an example. Suppose a student arrives on a Saturday, the campus health service opens Monday and their policy starts on Sunday. Before travel, they should ask how Saturday's coverage is handled and check an out-of-hours contact, any immediate access rules and how they would travel there. Coverage confirmation alone would not tell them who is open. Use the actual times and dates from your own plan.

Keep a small record of insurance details, regular medication and medical contacts with your travel documents. Tell a supporter how you prefer to be contacted and who may have access to health information. Keep invoices and payment receipts if you need to claim. If a bill is unexpected, ask the service and insurer for the basis of the charge and the relevant review or complaint channels. Do not delay emergency help to discuss a bill.`,
      },
    ],
    checklist: [
      'Check access rules for your route, country or region, duration and accompanying family.',
      'Verify coverage dates and find out whether a gap applies before or after the course.',
      'Check registration, fees, exclusions and how to submit or authorise a claim.',
      'Plan continuity of care and check medicine or equipment rules before travel.',
      'Save verified routine, urgent and emergency contacts.',
      'Keep coverage information, receipts and important contacts accessible and secure.',
    ],
    faq: [
      { question: 'Is GP registration the same as healthcare insurance?', answer: 'No. Registration is a route to a primary-care practice. Eligibility, policy or public coverage and charges for other services need their own checks.' },
      { question: 'Is it enough to have a policy number?', answer: 'Check the actual policy dates, who is covered, how to access or pay for services and any exemptions, limitations or authorisation requirements.' },
      { question: 'Can my university help me find care?', answer: 'The international office, disability team or wellbeing service can often direct you to local information. Confirm access and cost with the actual health provider or insurer.' },
    ],
    sources: [s.ukHealthcare, s.englandGp, s.australiaOshc, s.australiaVisa],
  },
}
