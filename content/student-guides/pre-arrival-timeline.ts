import type { GuideSection } from './model'

const milestones = [
  {
    when: 'As soon as you have an offer',
    action: 'Confirm your campus, offer conditions, first required university activity and latest arrival date. Find the visa instructions for your route.',
    check: 'Ask the university about any date or condition you cannot meet.',
  },
  {
    when: 'While your offer, housing or visa is pending',
    action: 'Put acceptance, visa evidence, housing and payment deadlines on one calendar. Shortlist a verified room and price a backup stay.',
    check: 'Before paying, check what you would owe if your visa is delayed or refused. Check when you can apply and what documents must be ready.',
  },
  {
    when: 'When your travel permission and dates are confirmed',
    action: 'Check passport details and the earliest date you can enter. Match your flight to the room start date and the last time you can collect your keys.',
    check: 'If you land too early or too late for the room, confirm a change or book a verified place for the first night.',
  },
  {
    when: 'In the last week before departure',
    action: 'Reconfirm the room and check-in, save documents and contacts offline, and test a backup way to pay. Arrange any medicine or travel assistance earlier.',
    check: 'Save the entrance, local handover time and out-of-hours number somewhere you can reach with no mobile data.',
  },
  {
    when: 'First night',
    action: 'Check that you can lock the room and get back in. Save the emergency contact and record any existing damage or missing items.',
    check: 'Report a safety or access problem immediately. Check the deadline for sending the condition report.',
  },
  {
    when: 'First week',
    action: 'Attend required enrolment and complete or schedule any immigration or address steps that apply. Test the campus journey and find your healthcare contact.',
    check: 'Use the official deadlines for your case, even if they fall earlier than this suggested order.',
  },
]

export const preArrivalTimeline: GuideSection = {
  id: 'pre-arrival-timeline',
  title: 'Your timeline from offer to first week',
  prose: 'Put your own dates next to these steps. Start as soon as you have an offer. Your university, immigration authority and housing provider set the actual deadlines. If you have less time, check those deadlines and the first-night plan first.',
  table: {
    caption: 'Pre-arrival and first-week timeline',
    columns: ['When', 'What to do', 'What to check'],
    rows: milestones.map(({ when, action, check }) => [when, action, check]),
  },
  worksheet: {
    label: 'Download the timeline worksheet (.txt)',
    filename: 'hearthaway-pre-arrival-timeline.txt',
    text: [
      'HearthAway student pre-arrival timeline',
      'Use the dates confirmed by your university, immigration authority and housing provider.',
      'First required university activity: ____________________',
      'Earliest permitted arrival: ____________________',
      'Last confirmed key collection (local time): ____________________',
      'First payment due: ____________________',
      '',
      ...milestones.flatMap(({ when, action, check }) => [
        when,
        '[ ] ' + action,
        '    ' + check,
        '    My date / contact / backup: ____________________',
        '',
      ]),
    ].join('\n'),
  },
}
