import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import Link from 'next/link'

const roleHighlights = [
  'No fixed pay',
  'Remote',
  'Flexible hours',
  'Student housing',
  '₹3,000 per successful booking',
] as const

const roleSections = [
  {
    title: 'About the role',
    description:
      'Help international students find suitable accommodation before they arrive. Understand their needs, recommend options, and guide them through the booking process.',
  },
  {
    title: 'What you will do',
    items: [
      'Understand student plans, budgets, preferences, and timelines.',
      'Recommend verified accommodation and explain key details.',
      'Coordinate with accommodation partners and internal teams.',
      'Follow up with students and keep bookings moving.',
      'Share student insights to improve HearthAway.',
    ],
  },
  {
    title: 'What we are looking for',
    items: [
      'Strong communication and the ability to simplify choices.',
      'Ownership, attention to detail, and comfort managing conversations.',
      'Empathy and patience when guiding students abroad.',
      'A practical, problem-solving mindset.',
      'Relevant experience is helpful but not required.',
    ],
  },
  {
  title: 'Compensation',
  description:
    'This is a performance-based role with no fixed pay. You will receive ₹3,000 for each successful accommodation booking you secure. The commission becomes payable once payment for the booking is received by HearthAway.' 
  },
  {
    title: 'The opportunity',
    description:
      'Join HearthAway early and help shape how international students find and book accommodation. Your work will directly influence the student experience as we grow.',
  },
  {
    title: 'Work directly with the founders',
    description:
      'Work closely with the founders on student experience, partner coordination, and operating standards. Your feedback from student conversations will directly influence how HearthAway builds its service.',
  },
] as const

export default function CareersPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-white px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-20">
              <div>
                <div className="mb-5 text-sm font-bold uppercase tracking-widest text-[#1B365D]">
                  Open role
                </div>

                <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-[#1A1A1A] text-balance">
                  Accommodation Specialist
                </h1>

                <p className="mb-8 max-w-2xl leading-relaxed text-[#6B6860]">
                  Help international students find suitable accommodation and
                  guide them through the booking process.
                </p>

                <div className="mb-10 flex flex-wrap gap-3">
                  {roleHighlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-[#E8E6E1] bg-[#F7F6F3] px-4 py-2 text-sm font-medium text-[#1A1A1A]"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="space-y-6">
                  {roleSections.map((section) => (
                    <section
                      key={section.title}
                      className="rounded-2xl border border-[#E8E6E1] bg-white p-7"
                    >
                      <h2 className="mb-4 font-heading text-2xl font-bold text-[#1A1A1A]">
                        {section.title}
                      </h2>

                      {'description' in section && (
                        <p className="leading-relaxed text-[#6B6860]">
                          {section.description}
                        </p>
                      )}

                      {'items' in section && (
                        <ul className="list-inside list-disc space-y-3 leading-relaxed text-[#6B6860]">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              </div>

              <aside className="sticky rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:top-28">
                <div
                  className="mb-5 h-1 w-10 rounded-full bg-[#FFCC00]"
                  aria-hidden="true"
                />

                <h2 className="mb-3 font-heading text-2xl font-bold text-[#1A1A1A]">
                  Interested in this role?
                </h2>

                <p className="mb-6 leading-relaxed text-[#6B6860]">
                  Send us your CV and a short note on why you want to help
                  students find accommodation.
                </p>

                <Link
                  href="mailto:faraz@hearthaway.com?subject=Accommodation%20Specialist%20Application"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#1B365D] px-6 py-3 text-center text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#24497D]"
                >
                  Apply for this role
                </Link>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
