import type { ReviewedGuide } from './model'
import { sources as s } from './sources'

export const realCostAbroad: ReviewedGuide = {
  slug: 'real-cost-abroad',
  title: 'How to work out the real cost of studying abroad',
  description: 'Build a whole-course cost estimate and a payment calendar for tuition, housing, travel, setup and emergencies.',
  topic: 'Contracts and payments',
  reviewedOn: '2026-11-27',
  related: ['student-visa', 'accommodation-costs', 'student-budget', 'hidden-costs'],
  body: {
    introduction: `This guide is for students and supporters deciding whether a course and a move are affordable, and for anyone comparing two different offers. An itemised annual total helps compare options, but it can hide the harder practical question of how much must be ready before the first week. Build two views from the same numbers: what the course costs overall and which dates you need access to money.

Start with the actual course and accommodation period. A nine-month taught programme might lead into a placement, or the accommodation agreement might end before assessments. Use the dates and currency from your documents and identify costs that fall outside the academic timetable.`,
    takeaways: [
      'List the full cost of study and everyday life over the dates you need, then confirm which items are already included.',
      'Track one-time payments and refundable cash separately from recurring expenses.',
      'Keep visa evidence distinct from spending and check how planned payments affect the evidence you need.',
      'Stress-test the dates and assumptions before accepting a contract.',
    ],
    sections: [
      {
        id: 'choose-the-period',
        title: 'Choose the period you need to cover',
        prose: `Find the earliest date you need to be on site and the latest date you may need to stay. Include induction, holiday periods when you will keep paying rent, placements and the period after exams if you are waiting for travel. For a multi-year course, estimate each year separately. Published fees or housing terms may change between years. Ask your institution whether the figure in your offer is per semester, academic year or programme and which part of the fee is due before enrolment.

Create a base sheet in the destination currency. If a supporter funds you in another currency, put the home-currency cost on a second line along with the exchange-rate assumption, fees and date. This keeps changes in local prices visible separately from changes in currency. Use a provider quote or official fee schedule for large items. Where you cannot get a quote, write a range with a note explaining what it includes and when you will replace it with a confirmed figure.

Choose one comparison period across destinations. For a course with nine months of teaching, a housing payment for eleven months remains part of the decision. A shorter room contract might require a temporary stay to cover the remaining weeks. Convert weekly or monthly figures using the precise terms and then add them up. Comparing average rent on its own can hide very different total commitments.`,
        sources: [s.australiaLivingCosts.id],
      },
      {
        id: 'make-a-cost-inventory',
        title: 'Build a cost inventory from evidence you can recheck',
        prose: `Tuition is normally the first line. Add required academic costs that are outside the quoted fee: materials, field trips, specific clothing or technology, examination charges, and any placement commute. Check the department's list and ask which items you may borrow or buy later. Where a scholarship contributes to tuition, record the gross cost, confirmed award and balance separately. If the award depends on a future result, keep a scenario without it until you have written confirmation.

For housing, start with the rent schedule. List any separately quoted broadband, electricity, water, heating, laundry and building charges. Ask what happens if usage exceeds a cap, who is named on accounts and how bills are divided. Price groceries and transport around your actual timetable and housing facilities. Students on an early placement or with a limited kitchen may buy meals at different times and places. Add communications, health cover where required, routine care you expect to pay for, and local travel outside campus.

Add one-off costs such as immigration charges applicable to your case, travel, airport transfer, temporary accommodation, essentials that are absent from the room and any official registration fees. Keep refundable security payments on a separate cash line. A deposit can require money before you have spent anything on rent and may take time to return. Excluding it from the spending total should never hide it from the cash calendar.`,
      },
      {
        id: 'work-through-a-sample',
        title: 'Work through an illustrative 40-week budget',
        prose: `Imagine a student comparing offers using pounds and needing a 40-week stay. The figures below are illustrative inputs and do not represent current prices. Suppose tuition is £9,000 and housing is £165 per week for 40 weeks, or £6,600. Budget £65 weekly for food and household supplies, times 40 weeks for £2,600. Put down £18 weekly for travel, or £720, and £12 weekly for utility and connectivity costs, or £480. Add £900 for one-time travel and setup. The planned spend is £20,300.

Also suppose the provider requests a £500 refundable deposit in an arrangement where that charge is permitted. The student needs £20,800 to fund every planned expense and deposit before any refund comes back. If they set aside an additional £700 reserve, total funding allocated rises to £21,500, but the reserve should remain available for disruptions. Do not include it in the everyday amount you can spend.

Now change one assumption. If Room B costs £152 per week for 44 weeks, its rent is £6,688, compared with £6,600 for Room A. Room B's weekly rate is lower but the actual rent commitment is higher. It could still be the better choice if its dates cover four weeks you need elsewhere or its utilities and commute save more than the extra rent. Keep the savings and the obligations visible before deciding.`,
        table: {
          caption: 'Illustrative study budget in pounds',
          columns: ['Cost', 'How it is calculated', 'Spending amount'],
          rows: [
            ['Tuition', 'Course charge in the example', '£9,000'],
            ['Rent', '£165 × 40 weeks', '£6,600'],
            ['Groceries and supplies', '£65 × 40 weeks', '£2,600'],
            ['Local travel', '£18 × 40 weeks', '£720'],
            ['Utility and connectivity costs', '£12 × 40 weeks', '£480'],
            ['One-time travel and setup', 'Combined allowance', '£900'],
            ['Total spending', 'Sum of the costs above', '£20,300'],
          ],
        },
      },
      {
        id: 'make-a-cash-calendar',
        title: 'Turn the total into a cash calendar',
        prose: `List every known payment against the date the other party has to receive it. Enter confirmed funding against the date it should be accessible to the student. Record both transfer initiation and likely settlement for overseas contributions. If a payment is due on the 10th but your loan normally clears on the 15th, the funding total alone does not solve the problem. Ask in advance whether you can change the payment date, find confirmed bridge funds or choose a lower initial commitment.

Stress-test the calendar against a slower transfer, a weaker conversion rate and higher early expenses. For an illustrative £1,000 payment, if one unit of destination currency costs 100 units at home, you need 100,000 before fees. At 105 per pound you need 105,000 before fees. Test a delay separately because adequate funds in one country may still be inaccessible at the required time. Decide what you would pause or change if you got less money than expected. Start with essentials and a deliberately cautious funding assumption, particularly if pay or family contributions fluctuate.

Keep receipts and review actual spending after the first few weeks. Change the forecast when you learn how often you use transit or how the utility bill is shared. A consistent shortfall calls for a change to the plan, such as requesting student support, reducing a recurring expense or revisiting the housing decision before deadlines pass.`,
        sources: [s.irregularIncome.id],
      },
      {
        id: 'separate-visa-finances',
        title: 'Check visa evidence in its own worksheet',
        prose: `Immigration authorities define what applicants must show and when. An amount described as maintenance, living costs or financial capacity serves the requirements of a particular immigration route. The same name in your budget means your expected spending on food, housing, transport and other needs. One number does not replace the other.

The evidence rules may distinguish personal bank funds, qualifying loans and official sponsorship. They may use a holding period, require access to the funds or apply separate conditions to accompanying family. Check whether you need to produce evidence upfront or upon request and whether fees or particular payments can reduce the amount. A plan to pay a housing deposit this week can affect the bank evidence you are arranging. Coordinate the two calendars without assuming a housing payment counts for immigration purposes.

When supporting someone, compare the evidence dates and day-to-day funding calendar together. The student should know which money can be moved or spent, when tuition needs to be paid and who to contact if a planned transfer is late. Use the institution’s written payment instructions and verify a changed payee independently.`,
        sources: [s.ukVisaFunds.id, s.australiaVisa.id],
      },
      {
        id: 'decide-before-committing',
        title: 'Decide what you can afford before making a binding commitment',
        prose: `Ask whether each proposed option works over the entire period and still works in your cautious scenario. An annual plan that needs every transfer to be punctual is sensitive to delays. Look for a manageable first payment, a term close to the dates you need and a clear route to delay or cancel if your circumstances change. Trade-offs are easier to compare if you write the actual price of each choice.

If an option fails your cash test, identify the precise reason. A gap from a late award may call for an adjusted payment schedule. A gap every month calls for a lower recurring commitment or additional reliable funding. An open-ended utilities charge calls for better evidence or headroom. Seek eligible support through the institution when funding is uncertain and avoid budgeting around hoped-for employment before you know both your right to work and likely income.`,
      },
    ],
    checklist: [
      'Record programme and housing dates, including arrival and departure gaps.',
      'Collect written tuition, housing, transit and insurance figures.',
      'Separate expected spending, refundable amounts and an accessible reserve.',
      'Add total rent and one-time costs over the same period for every offer.',
      'Check the date funds must clear and stress-test a delay and exchange-rate change.',
      'Keep a separate visa evidence worksheet, with its own amounts and dates.',
    ],
    faq: [
      { question: 'Should I include refunded deposits in my real costs?', answer: 'Record the amount as cash you need and track deductions or refunds separately. Allow for the possibility that you must fund another commitment before the refund arrives.' },
      { question: 'What if tuition includes some services?', answer: 'Ask what is included and what your course bills separately. Avoid adding an expense twice, while allowing for items such as placement travel or programme materials that are outside tuition.' },
      { question: 'How should I compare budgets for two currencies?', answer: 'Calculate each plan in its local currency first, then convert to the funding currency using a dated assumption and include fees. Test what happens if the rate worsens.' },
      { question: 'Can I include a future part-time job in the base budget?', answer: 'First check your work conditions and confirm the likely pay and start date. Test a plan for the initial period without that income so you know how long you can manage if work starts later.' },
    ],
    sources: [s.australiaLivingCosts, s.irregularIncome, s.ukVisaFunds, s.australiaVisa],
  },
}
