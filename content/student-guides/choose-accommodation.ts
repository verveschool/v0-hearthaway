import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const chooseAccommodation: ReviewedGuide = {
  slug: 'choose-accommodation',
  title: 'How to choose student accommodation that fits your week',
  description: 'Build a housing shortlist around your campus, contract, total cost, travel and the way you need to live.',
  topic: 'Choosing housing',
  reviewedOn: '2026-11-27',
  related: ['halls-vs-private', 'accommodation-costs', 'tenancy-agreement', 'avoid-scams'],
  body: {
    introduction: `Start with the room you can live in on a bad Tuesday: you have an early class, you need to cook, and you get back after reception closes. Photos and weekly rent tell you little about how that day will go.

Write down your campus, the dates you need, the most you can pay before arrival, and anything that would rule a room out. Then use the table to pick which types of housing to look at and what to ask each provider.`,
    takeaways: [
      'Confirm the campus, move-in and move-out dates, payment ceiling and any firm access or occupancy needs.',
      'Compare written terms and the full cost over the period you need housing.',
      'Test a typical week and a difficult journey from the actual building to the correct campus entrance.',
      'Keep a room on your list only if major unknowns have a clear owner and a date for an answer.',
    ],
    sections: [
      {
        id: 'set-your-requirements',
        title: 'Start with the week you will actually live',
        prose: `Write out one ordinary week. Include lectures, late labs, group work, errands and time you plan to spend at home. Add a week during exams or a placement if it looks materially different. If your course has more than one campus, ask which applies to your programme and whether there are regular trips between sites. A family member may reasonably care about check-in support or payment flexibility while the student values a quiet space. Put those preferences into concrete questions before you look at photos.

Separate strict requirements from features you would trade for something else. A maximum rent or upfront total can be a hard limit. So can step-free access, permission for an occupant, a minimum term that matches your exchange or room for an assistance animal where applicable. Define each in practical terms. If you need step-free access, check the path from public transport to the room, door and lift dimensions where relevant, bathroom layout and whether lockers and laundry can be reached. Check what happens if the main lift is out of service. A generic accessibility label cannot answer those questions.

Flexible preferences might include a gym, a private kitchen or a particular part of town. Decide why you want each one. If you want a studio because you have dietary needs, an individually assigned fridge shelf or an ensuite with a kitchen shared by two people might serve your routine, depending on what the provider confirms. When privacy and the ability to prepare food safely are both essential, record both separately.`,
      },
      {
        id: 'compare-housing-formats',
        title: 'Compare halls, shared homes, studios and homestays',
        prose: `A hall or shared house describes how the property is run. An ensuite or studio describes the space you get. An ensuite normally gives you a private bathroom, but you may still share a kitchen. A studio is usually self-contained. Ask what the floor plan and written offer actually give you.

Two privately managed student residences can offer very different support. Ask who is available after hours, which bills and services the rent covers, and what happens if your dates change.`,
        table: {
          caption: 'Which kind of student housing should you look at?',
          columns: ['Housing type', 'Worth a look if', 'Ask before paying'],
          rows: [
            ['University halls', 'You want a university housing contact and an easy way to meet other students.', 'When will I know my room? Can I stay over breaks? Who can help after hours?'],
            ['Privately managed student residence', 'You want a student building and a clear list of services.', 'Which bills have a cap? Is anyone on site at night? What if my visa is late?'],
            ['Shared flat or house', 'You want a choice of housemates or neighbourhood and can help run a household.', 'Do I sign for my room or the whole home? Who owes the rent if someone leaves?'],
            ['Studio', 'You need more privacy or control over when and how you cook.', 'Is there a usable kitchen? Who may live here? How much more does it cost for the full stay?'],
            ['Homestay', 'You want a household to help you settle in and are comfortable with shared routines.', 'Which meals are included? When can I use the kitchen? How do I give notice?'],
          ],
        },
        sources: [s.studyAustraliaHousing.id, s.irelandStudentRenting.id],
      },
      {
        id: 'understand-the-price',
        title: 'Compare the usable period, total cost and upfront cash',
        prose: `Collect the starting and ending dates, payment schedule, currency and which nights you actually need. Check when a tenancy starts versus when the room or key becomes available. Then price the whole period, including a known gap before or after the stay. Compare rent and running costs separately from the amount due before arrival. A deposit affects affordability today, even when you expect to get it back later.

For example, suppose two offers cover all 39 weeks you need. Room A charges £180 for each of 39 weeks and you estimate £12 a week for travel. That is £7,488 for rent and travel. Room B charges £166 for the same 39 weeks. It has illustrative extras of £14 a week for travel and £16 for utilities, bringing rent and those expenses to £7,644. A cheaper weekly rent becomes a slightly dearer stay. Neither calculation includes one-time fees or the reserve you would need to cover fluctuations. If Room B bills heating separately or only offers a longer period, the first calculation needs to change.

Ask for exact fee names and conditions instead of accepting a total with unexplained charges. Compare the highest simultaneous outlay, including deposit and rent at one property while you wait for another deposit to return. If someone asks for advance rent because of a guarantor issue, check whether it is permitted under the rules for that agreement first. Then compare the proposed payment schedule with what funds can actually clear on time.`,
      },
      {
        id: 'test-your-travel',
        title: 'Check travel door to door, including the journey home',
        prose: `Use an operator journey planner from the exact building to the part of campus you will enter. Check at the times you expect to travel, including an early class and your latest regular return. Allow time for getting down from the room, reaching the stop, waiting and transferring, walking through campus and taking a lift if needed. Public transport changes during weekends and holidays can matter even if you expect to spend most weekdays on campus.

In the University of Edinburgh’s Student Stories, one student explains how a timetable full of morning classes made the walk to lectures a priority in their second year. Try their test for your own course: look up the journey for the earliest class you expect to take, and check a backup route for the day it goes wrong.

A walk that looks short on a map can cross a difficult junction or involve a station exit with stairs. A longer direct journey may be simpler when service is frequent and reliable for your hours. Check lighting and walking routes through maps or a live video, or ask a university contact familiar with the area about the route. If you depend on a particular lift, bus or shuttle, identify the alternate and what it will cost when the route is disrupted. Put verified fares in your housing comparison and give time its own row. You may care more about a long, unpredictable evening return than saving ten minutes in the morning.`,
        sources: [s.edinburghStudentHousing.id],
      },
      {
        id: 'verify-the-offer',
        title: 'Verify the room and read the agreement before paying',
        prose: `Ask for a real or live virtual viewing and written details about the room offered. Distinguish the room number from a room type, and the floor plan from a sample image. Ask the provider what is guaranteed if they allocate the room later. Verify the identity of the landlord or provider, their authority to offer the unit and the payment recipient through a contact you find independently. Save the listing, agreement and any confirmation of material inclusions, then check that the names and dates match.

Review start and end dates, guests, occupants, deposits, bills, access by staff, repairs and how to end the agreement. Read what happens if enrolment, travel or your visa changes before you move. Check the specific procedure and time limits before counting a possible refund as available money. Rights and responsibilities depend on the jurisdiction and the type of housing. For example, the official England guidance distinguishes private renting from halls and private halls. It describes the significance of National Code membership for privately managed halls. Ireland's RTB distinguishes Student Specific Accommodation from ordinary private tenancies and some owner-occupied room arrangements. Start with the applicable official guidance and ask the university housing office for local help when the arrangement is unclear.`,
        sources: [s.englandStudentTenancies.id, s.irelandStudentRenting.id],
      },
      {
        id: 'make-the-final-decision',
        title: 'Ask the questions that could change your choice',
        prose: `Compare two or three evidenced options. Record each feature as confirmed, assumed or still to ask. Give the provider a short list of outstanding questions rather than asking them to confirm every line of your spreadsheet. Which occupant may live in the unit? Is fuel for heating part of the rent? When can you collect the key if a flight is late? What happens if the allocated room does not meet a written access requirement?

If the first choice relies on an unanswered question and another choice meets all your clear needs, use the cost and consequences to decide whether to wait. Keep track of how long each offer is valid and what money, if any, you would lose by stopping. For a remote decision, a HearthAway advisor can help you review your requirements and compare available information. Ask which details came directly from the provider and which you should verify before payment. Retain the provider’s signed documents and official contact details after you choose.`,
        sources: [s.hearthawayRole.id],
      },
    ],
    checklist: [
      'Record the correct teaching locations, dates and weekly routines.',
      'Set maximum total and upfront costs, and check a reasonable fallback.',
      'Write down requirements for occupants, access, room layout and sleep or study.',
      'Confirm service hours, shared spaces, furnished inventory and utility terms.',
      'Test a morning and late journey with the relevant fare and accessible route.',
      'Verify the provider, exact offer and payment instructions independently.',
      'Read the written move-in, cancellation, deposit and repair terms.',
    ],
    faq: [
      { question: 'Is housing nearest the campus always better?', answer: 'Check the entrance you use, service reliability and the route you can take after a late class. Compare door-to-door time and recurring fares with differences in price and contract.' },
      { question: 'Should I choose a studio or share?', answer: 'List the activities for which privacy matters and the facilities you are willing to share. Confirm the actual kitchen and bathroom arrangements and compare their cost over your whole stay.' },
      { question: 'Can I choose a room before I know my timetable?', answer: 'Confirm your expected teaching campus and test a plausible range of class times. If location could change, favour choices with a usable route to both sites or clear change terms.' },
      { question: 'Do I need to book if a destination has few public listings?', answer: 'Keep the same decision criteria. Ask your institution about its residence and private rental support and build a parallel short list. Verify availability and terms with the provider before paying.' },
    ],
    sources: [s.studyAustraliaHousing, s.irelandStudentRenting, s.englandStudentTenancies, s.hearthawayRole, s.edinburghStudentHousing],
  },
}
