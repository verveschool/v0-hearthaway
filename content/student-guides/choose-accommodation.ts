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
    introduction: `When choosing a student home from abroad, the easiest things to compare are the advertised rent, photos and map pin. The factors you will live with are more specific: what you hear while studying, when you can cook, how reliable your commute is and what happens if your plans change. This guide is for students starting a search and families helping to compare offers. You can use it even in a destination with few online listings.

The goal is a short list of options you would be able to live in, with enough evidence to make a commitment. Decide the requirements an offer must satisfy. Then compare everyday trade-offs among the options that meet those requirements. A good score on price or appearance cannot solve a gap in dates or an access barrier you face every day.`,
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
        title: 'Compare formats by who provides what',
        prose: `University accommodation can offer a familiar support contact and a population of students. It may also have application deadlines, allocation rules or a room-move policy you need to understand. A privately managed student residence can offer another route, with service levels set by the individual property and agreement. Ask whether there is an actual member of staff on site when you need help and which services are part of your rent. Check rules about overnight guests, stays during holidays and applicable enrolment status.

With a shared house or flat, find out whether you sign for a particular room or for a whole dwelling with others. This affects who is responsible for rent, bills and finding replacements. A studio can mean more control over cooking and quiet, but ask whether the kitchen is fully equipped, how ventilation works and what spaces and services are still shared. A homestay or room in someone's home makes house rules, meals, kitchen access and communication especially important. Learn the terms applied by your destination to the actual arrangement before you rely on any protection.

Treat the advertised category as the start of your research. For example, two managed residences might both say that utilities are included. One might include electricity and internet with a usage limit, while the other requires you to pay separately for laundry and upgrade internet access. Ask the same questions of every option so that a polished listing does not receive credit for facts you have not verified.`,
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

A walk that looks short on a map can cross a difficult junction or involve a station exit with stairs. A longer direct journey may be simpler when service is frequent and reliable for your hours. Check lighting and walking routes through maps or a live video, or ask a university contact familiar with the area about the route. If you depend on a particular lift, bus or shuttle, identify the alternate and what it will cost when the route is disrupted. Put verified fares in your housing comparison and give time its own row. You may care more about a long, unpredictable evening return than saving ten minutes in the morning.`,
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
        title: 'Resolve the unknowns and decide with your supporter',
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
    sources: [s.studyAustraliaHousing, s.irelandStudentRenting, s.englandStudentTenancies, s.hearthawayRole],
  },
}
