import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const weightedHousingComparison: ReviewedGuide = {
  slug: 'weighted-housing-comparison',
  title: 'How to compare two student rooms with a weighted decision matrix',
  description: 'Score confirmed housing offers against your priorities and test whether a small change reverses the decision.',
  topic: 'Choosing housing',
  reviewedOn: '2026-11-27',
  related: ['choose-accommodation', 'accommodation-costs', 'halls-vs-private'],
  body: {
    introduction: `Once two housing offers meet your requirements, it can be surprisingly hard to choose. One has a manageable commute, the other preserves money for emergencies, and supporters may value different things. A weighted decision matrix is a simple way of making those preferences visible. It multiplies each offer's score on a criterion by the importance you place on that criterion. The exercise tells you which trade-off you are making and which facts could change the result.

Use it after you have confirmed the identity of the provider, the room or room type, included services and agreement dates. If you are still waiting for important details, the matrix can help you decide which question to ask next. Save the evidence behind each score so you can update the comparison if a written quote, timetable or access need changes.`,
    takeaways: [
      'Apply hard requirements before you score preferences.',
      'Choose a few criteria with defined scales and weights that add up to 100.',
      'Use the same evidence and scoring rules for every offer.',
      'Vary one assumption at a time and investigate a close result.',
    ],
    sections: [
      {
        id: 'screen-out-unusable-offers',
        title: 'First, rule out offers you cannot use',
        prose: `Start with pass, fail or unknown. This is where you decide if each offer covers the required dates, can be paid on time, allows everyone who will live there, and meets any access requirements. A room with a short contract that ends before your last placement fails unless you have acceptable coverage for the gap. A room with uncertain access might stay in the research stage until you can verify the route, bathroom and emergency arrangements with the provider.

Write down the facts that would turn an unknown into a pass. “Step-free room” is too broad if you need an accessible shower and a route from the accessible entrance at all hours. “Within budget” should account for rent for the whole term, mandatory fees, realistic travel expenses and upfront cash. An unaffordable deposit can make a low-cost option unusable. Only score remaining preferences after applying these screens.

Check what each housing provider actually includes. The Australian Government’s housing checklist, for example, covers rent, bonds, services, travel and proximity to essentials. It gives a starting set of questions. Your exact needs and written offer determine the criteria and the scores you use.`,
        sources: [s.studyAustraliaHousing.id],
      },
      {
        id: 'choose-weights-and-scales',
        title: 'Give each criterion its own evidence and scoring scale',
        prose: `Pick four to six important differences. Give them weights totalling 100. Weight shows the importance of improving that criterion within your remaining shortlist. If both rooms are confirmed within budget, you might give more weight to regular quiet and the route home in the evening. A student who has the same course schedule and room preferences but a tighter funding plan may weight recurring costs more heavily.

Avoid counting the same effect twice. If your term cost includes fares, the commute criterion should score the experience of travel, such as time, transfers and the evening service. You can include contract flexibility separately when late arrival or a potential exchange has a real impact. Make each criterion describe an outcome you can assess. “Common spaces I can use for a video call” is easier to check than “good facilities”.

Make a one-to-five scale before you choose scores. For commute, you might define five as a verified single journey you can use for early and late classes, three as workable with one transfer plus a credible backup, and one as a recurring difficult connection you could tolerate only for a clear benefit. Use the same scale for both properties. Define what five, three and one mean for costs, privacy and flexibility too. If a question is unanswered, mark the field unknown or give a reasonable range and show the difference it makes.`,
      },
      {
        id: 'calculate-the-scores',
        title: 'Calculate the scores for two illustrative offers',
        prose: `Say both offers pass the requirements and the student chooses four factors. Routine and backup travel get 35 points, whole-term cost gets 30, study and quiet get 20, and contract flexibility gets 15. For every criterion, divide the rating by five and multiply by its weight. A rating of four with weight 35 contributes 28 to the total on a 100-point scale.

In this example, Room A has stronger travel and study conditions. Room B costs less over the term and has better change terms. Room A earns 35 + 18 + 16 + 6 = 75. Room B earns 21 + 30 + 12 + 12 = 75. The identical total makes the decision explicit: the student is choosing between relief in daily travel and greater financial flexibility. There is little value in adding more minor criteria just to force a tie-break. Compare the likely consequences of each room's weakness and the certainty of each score.`,
        table: {
          caption: 'Illustrative ratings and weighted points',
          columns: ['Criterion', 'Weight', 'Room A rating and points', 'Room B rating and points'],
          rows: [
            ['Travel routine and backup', '35', '5 → 35', '3 → 21'],
            ['Whole-term cost', '30', '3 → 18', '5 → 30'],
            ['Study and quiet', '20', '4 → 16', '3 → 12'],
            ['Contract flexibility', '15', '2 → 6', '4 → 12'],
            ['Total', '100', '75', '75'],
          ],
        },
      },
      {
        id: 'test-the-result',
        title: 'Check whether the result holds when your week changes',
        prose: `Change one assumption and recalculate. If the student learns there is a late lab on three nights, they may shift five points from cost to travel. Room A gains five weighted travel points and loses three cost points, taking it to 77. Room B gains three travel points and loses five cost points, taking it to 73. Confirm the late timetable and homeward route before accepting that result.

If a single unanswered question could switch the winner, ask it before refining the scores. For example, if Room B only wins because you assumed a night bus runs on Fridays, look up that trip and the fare for your backup before you commit.

Repeat with evidence quality. If Room A has a high quiet rating because an advert promises “peaceful living”, check room location, window orientation, nearby communal spaces and quiet hours. If the credible score range is two to four, its contribution can vary from eight to sixteen points. That uncertainty is large enough to change the outcome. Investigate it or decide with the conservative score. A genuine accessible alternative or confirmed backup route can make a similar difference. Weight preferences separately from confidence in the facts.

Supporters can score the same offers separately. Compare which differences come from evidence and which come from priorities. Someone who worries about bills may assume a portion is excluded while the student reads it differently. Resolve what the provider includes first. Then agree whether the money saving, low-risk handover or easier week is the decisive benefit. Keep a short dated note with your decision so you can revisit it if a quote or move-in date changes.`,
      },
    ],
    checklist: [
      'Confirm hard requirements and label each as pass, fail or unknown for every offer.',
      'Define each preference and a shared scoring scale.',
      'Give the preferences weights that add up to 100.',
      'Keep written evidence behind scores and avoid double-counting.',
      'Change one uncertain score or weight and recalculate.',
      'Resolve the details that could change the decision before paying.',
    ],
    faq: [
      { question: 'Can I give the cheapest room the highest score automatically?', answer: 'Give it the highest cost rating only if it is cheapest on the metric you defined. Check whole-term costs or cash timing rather than just the advertised weekly price.' },
      { question: 'What if a property wins but fails a requirement?', answer: 'Keep it out of the weighted comparison unless new evidence shows you can use it. The screening step prevents a high score elsewhere from hiding a serious problem.' },
      { question: 'Should I set the weights after I see the scores?', answer: 'Set them from your priorities first. Recalculate with genuinely different assumptions after examining the scores to see how sensitive the decision is.' },
    ],
    sources: [s.studyAustraliaHousing],
  },
}
