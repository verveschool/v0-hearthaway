import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const makingFriends: ReviewedGuide = {
  slug: 'making-friends',
  title: 'Making friends and building a support network abroad',
  description: 'Find low-pressure ways to meet people, keep in touch with home and ask for help when settling in feels difficult.',
  topic: 'Student life',
  reviewedOn: '2026-11-27',
  related: ['first-week', 'healthcare', 'halls-vs-private'],
  body: {
    introduction: `A new timetable, crowded residence or unfamiliar language can make it hard to decide how to meet people after moving. It is possible to take small steps even if you are tired, busy or unsure about a large event. This guide is for students who want regular contact and a practical support plan. Families can help by asking what kind of contact the student wants and being available for the changes they have agreed to discuss.

Start by separating people you enjoy spending time with from the places you can seek practical help. Both can matter. One person does not need to cover every part of your academic, home and social life.`,
    takeaways: [
      'Choose one manageable group or routine you can repeat.',
      'Make specific invitations that leave room for either person to decline.',
      'Understand the housing and campus routes for practical or wellbeing support.',
      'Keep contact with people at home in a way that fits your new routine.',
    ],
    sections: [
      {
        id: 'find-a-repeatable-setting',
        title: 'Find a small setting you can return to',
        prose: `Pick a repeated activity around something you already need or want to do. It can be a course exercise, a group walk, conversation practice, a faith community, a gaming society or dinner with a housemate. Ask about cost, time, access and where the group meets before committing. Some activities have quieter or smaller sessions. A structured event gives you something specific to do together and a natural point at which to leave.

Try a small practical exchange first. Ask someone which room a seminar is in or whether they want to check a problem set together. Offer a specific invitation such as “I’m getting lunch on Thursday after class. Would you like to join?” If the answer is no or the schedule does not match, move on politely. Showing up at a time that works for you gives you more chances to recognise people and build on an earlier conversation.

Study Australia lists orientation, student clubs and societies among the settings that can help students settle in. Check the activities and support at your own institution. A course, city or building can have different groups, and there is no need to join everything during welcome week.`,
        sources: [s.australiaStudentSupport.id],
      },
      {
        id: 'balance-home-and-new-connections',
        title: 'Agree on time with housemates and people at home',
        prose: `If you live with others, ask about the times they usually cook, study or have guests. Offer a shared task if all are comfortable, such as planning a store trip or working out how recycling is organised. Give each person permission to be quiet or keep their own meals. A household can work well even when its members have different friends. Talk privately and clearly about disagreements over noise, cleaning or money and ask the provider's designated contact for help if a practical problem persists.

Keep relationships at home on a rhythm that fits both time zones. A regular message or call can help supporters stay in touch without interrupting study or evenings out. Tell them what kind of update you want to give, and what you would want them to do if you miss an agreed check-in. If they ask how you are settling in, it is fine to share one specific difficulty you want help with and one thing you are trying. Avoid giving a repeated report you cannot sustain when your schedule changes.`,
      },
      {
        id: 'find-the-right-support',
        title: 'Find someone who can help with the particular difficulty',
        prose: `It can take time to feel comfortable. If isolation, stress or practical problems are making sleep, study or ordinary tasks hard to manage, you can contact a wellbeing, international or disability service and ask where to start. Find out how appointments, accessibility and language support work. If an accommodation problem is the immediate cause, use the residence’s appropriate contact as well. The national German student services association describes local advisory services for international students and examples of practical support. Your own institution can tell you what services are actually available.

Prepare a short explanation of what has been difficult and what you would like to change. For example, you might want a quieter study space, help finding a small activity you can afford, or advice on speaking to the accommodation team. Ask what the contact can keep private, whether there are costs and who to contact between appointments. Seek qualified medical care if you need it. If any situation is an immediate emergency, use the official local emergency service.`,
        sources: [s.australiaStudentSupport.id, s.germanStudentSupport.id],
      },
    ],
    checklist: [
      'Pick one repeated activity and check when and how to join.',
      'Make one specific, manageable invitation.',
      'Agree practical household expectations and a comfortable contact rhythm with home.',
      'Save campus, residence and wellbeing contacts.',
      'Ask for support with a specific next step when you need it.',
    ],
    faq: [
      { question: 'What if welcome week is over?', answer: 'Look for repeated course, society or local events. Ask the organiser whether new people can join later and how to find the next session.' },
      { question: 'Do I have to socialise with everyone I live with?', answer: 'Agree respectful household routines. You can choose which activities you share and look for friendships in other settings.' },
      { question: 'Who can help if a room problem makes it hard to settle?', answer: 'Contact the provider through its formal process for the practical issue. Ask a university housing or wellbeing service what additional support is available.' },
    ],
    sources: [s.australiaStudentSupport, s.germanStudentSupport],
  },
}
