import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import Link from 'next/link'

const roleHighlights = ['Full-time', 'Student housing', 'Founder-led team'] as const

const roleSections = [
  {
    title: 'About the role',
    description:
      'As an Accommodation Specialist at HearthAway, you will help international students make confident housing decisions before they arrive. You will guide students through their options, explain trade-offs clearly, and make sure every recommendation feels practical, safe, and aligned with their university, budget, and arrival timeline.',
  },
  {
    title: 'What you will do',
    items: [
      'Speak with students and families to understand their study plans, budgets, accommodation preferences, and move-in timelines.',
      'Recommend verified housing options near universities and explain neighbourhood, commute, lease, and deposit considerations.',
      'Coordinate with accommodation partners and internal teams to keep each student journey moving smoothly.',
      'Track student conversations carefully and follow up with clear next steps until accommodation is sorted.',
      'Share frontline insights that help improve HearthAway content, processes, and student guidance.',
    ],
  },
  {
    title: 'What we are looking for',
    items: [
      'Strong communication skills and the ability to make complex choices feel simple for students and parents.',
      'High ownership, attention to detail, and comfort managing multiple student conversations at once.',
      'Empathy for students moving abroad and the patience to guide them through an unfamiliar process.',
      'A practical, problem-solving mindset with confidence using structured information to make recommendations.',
      'Experience in student accommodation, study abroad, admissions, counselling, or customer success is helpful but not required.',
    ],
  },
  {
    title: 'The opportunity',
    description:
      'HearthAway is building a student-first accommodation company for the study abroad journey. This role is an opportunity to join early, shape how students are supported, and grow with a brand focused on guidance rather than just inventory.',
  },
  {
    title: 'Work directly with the founders',
    description:
      'You will work closely with the founders on student experience, partner coordination, and operating standards. Your feedback from real student conversations will directly influence how HearthAway builds its service and scales its support.',
  },
] as const

export default function CareersPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-[#1B365D] pt-28 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="text-[#FFCC00] text-sm font-bold tracking-widest uppercase mb-5">Careers</div>
              <h1 className="font-heading text-5xl lg:text-6xl font-bold text-white text-balance leading-[1.05] mb-8">
                Help students find home, before they arrive.
              </h1>
              <p className="text-white/70 text-xl leading-relaxed max-w-2xl">
                Join HearthAway as an Accommodation Specialist and support students through one of the most important decisions in their study abroad journey.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] gap-12 lg:gap-20 items-start">
              <div>
                <div className="text-[#1B365D] text-sm font-bold tracking-widest uppercase mb-5">Open role</div>
                <h2 className="font-heading text-4xl font-bold text-[#1A1A1A] text-balance leading-tight mb-6">
                  Accommodation Specialist
                </h2>
                <p className="text-[#6B6860] leading-relaxed mb-8 max-w-2xl">
                  This is one available role for someone who wants to combine student support, housing knowledge, and careful execution in a fast-moving founder-led team.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
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
                    <section key={section.title} className="rounded-2xl border border-[#E8E6E1] bg-white p-7">
                      <h3 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-4">{section.title}</h3>
                      {'description' in section && (
                        <p className="text-[#6B6860] leading-relaxed">{section.description}</p>
                      )}
                      {'items' in section && (
                        <ul className="list-inside list-disc space-y-3 text-[#6B6860] leading-relaxed">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              </div>

              <aside className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-8 lg:sticky lg:top-28">
                <div className="w-10 h-1 bg-[#FFCC00] rounded-full mb-5" aria-hidden="true" />
                <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-3">
                  Interested in this role?
                </h2>
                <p className="text-[#6B6860] leading-relaxed mb-6">
                  Email us with your CV and a short note on why you want to help students find accommodation with confidence.
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
