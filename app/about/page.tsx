import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import MatchedCTA from '@/components/matched-cta'

const values = [
  {
    title: 'The student is the hero.',
    description: 'Every decision we make starts with the student. Not the landlord, not the property, not the platform. The student moving abroad, making one of the biggest decisions of their life.'
  },
  {
    title: 'Guidance, not just inventory.',
    description: "Anyone can show you a list of properties. We help you decide which one is right for you. That's a different job, and it's the one we care about."
  },
  {
    title: 'Confidence before you fly.',
    description: "Our goal is simple: have your accommodation confirmed before you board the plane. Arriving with housing sorted changes everything about how a student starts their experience abroad."
  },
  {
    title: 'Verified. Always.',
    description: 'Every property in our network has been reviewed. We will never show you a listing we have not assessed. No scams. No surprises. No exceptions.'
  },
]

const team = [
  {
    photo: '/faraz-arif.jpeg',
    name: 'Faraz Arif',
    role: 'Co-Founder & CEO',
    linkedin: 'https://www.linkedin.com/in/arif-faraz/',
    description: "4 years in partnerships at UniAcco and network management at University Living, two of the largest names in global student housing. Now applies that same network to source and vet HearthAway's supply.",
  },
  {
    photo: '/a-duggal.jpeg',
    name: 'A. Duggal',
    role: 'Co-Founder & CPO',
    linkedin: 'https://www.linkedin.com/in/okduggal/',
    description: 'Designed the product and built it: the way students find a place, the system the company runs on, how it works, how it feels, how people move through it. Built the same kind of infrastructure at VerveSchool first.',
  },
  {
    photo: '/zubia-shah.jpeg',
    name: 'Zubia Shah',
    role: 'Chief of Staff',
    linkedin: 'https://www.linkedin.com/in/zubia-shah-11332a228/',
    description: '3.5 years across UniScholars and Study Smart, working admissions, visas, and student logistics directly with thousands of students. Runs the operations that keep supply, product, and student experience moving together.',
  },
]

const markets = [
  {
    flag: '🇬🇧',
    name: 'United Kingdom',
    description: "140+ universities. Dozens of cities. The world's most popular study destination for international students.",
  },
  {
    flag: '🇮🇪',
    name: 'Ireland',
    description: 'A welcoming, English-speaking country with world-class universities and a thriving international student community.',
  },
  {
    flag: '🇫🇷',
    name: 'France',
    description: 'Historic universities, specialist grandes écoles, and strong public transport across major European student cities.',
  },
  {
    flag: '🇦🇪',
    name: 'United Arab Emirates',
    description: 'International branch campuses, modern infrastructure, tax-free income, and rapid career growth in the Middle East.',
  },
  {
    flag: '🇩🇪',
    name: 'Germany',
    description: 'Tuition-free public universities, world-class engineering programs, and Europe\'s largest international student population.',
  },
  {
    flag: '🇦🇺',
    name: 'Australia',
    description: "Globally recognised qualifications, outstanding quality of life, and some of the world's best universities.",
  },
  {
    flag: '🇸🇬',
    name: 'Singapore',
    description: 'World-ranked universities, a multicultural student population, and one of the safest, most connected cities in Asia.',
  },
  {
    flag: '🇮🇹',
    name: 'Italy',
    description: "Historic universities, low-cost public tuition, and a student life built around some of Europe's most iconic cities.",
  },
  {
    flag: '🇲🇹',
    name: 'Malta',
    description: 'English-taught degrees, an English-speaking population, and one of the most affordable island destinations in the EU.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-[#00319D] pt-28 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="font-heading text-5xl lg:text-6xl font-bold text-white text-balance leading-[1.05] mb-8">
                We help students find home, before they arrive.
              </h1>
              <p className="text-white/70 text-xl leading-relaxed max-w-2xl">
                Finding accommodation abroad is one of the most important decisions a student makes before moving. Students should not have to navigate that decision alone.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white py-16 lg:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="font-heading text-4xl font-bold text-[#1A1A1A] text-balance leading-tight mb-6">
                  The category focuses on inventory.
                  <span className="text-[#00319D]"> We focus on helping students choose.</span>
                </h2>
                <div className="flex flex-col gap-5 text-[#6B6860] leading-relaxed">
                  <p>
                    Every year, hundreds of thousands of students move abroad to study. For most, finding accommodation is one of the most stressful parts of the process.
                  </p>
                  <p>
                    Inconsistent listings, unverified landlords, and confusing platform flows make finding the right place harder than it needs to be.
                  </p>
                  <p>
                    The market is full of platforms that show you listings. They compete on inventory size, bed counts, city counts. They lead with scale and expect you to search your way to a decision.
                  </p>
                  <p>
                    HearthAway exists because that is not good enough. Finding accommodation before you move abroad is a deeply personal decision.
                  </p>
                  <p>
                    We lead with judgment. With context. With help. Our job is not to show students the most options. Our job is to help them choose the right one.
                  </p>
                </div>
              </div>

              <div className="bg-[#F7F6F3] rounded-2xl p-8 lg:p-10 border border-[#E8E6E1]">
                <div className="text-[#00319D] text-sm font-bold tracking-widest uppercase mb-6">Our core promise</div>
                <blockquote className="font-heading text-3xl font-bold text-[#1A1A1A] leading-snug mb-8">
                  &ldquo;Find the right accommodation before you arrive.&rdquo;
                </blockquote>
                <div className="flex flex-col gap-3">
                  {[
                    'Near your university',
                    'Within your budget',
                    'Chosen with confidence',
                    'Sorted before you fly',
                  ].map((promise) => (
                    <div key={promise} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#FCC20A] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L4.5 8.5L10 3" stroke="#00319D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[#1A1A1A] font-medium text-sm">{promise}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#F7F6F3] py-16 lg:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading text-4xl font-bold text-[#1A1A1A] text-balance leading-tight mb-12 max-w-xl">
              The principles that guide everything we do.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="bg-white rounded-2xl p-7 border border-[#E8E6E1]">
                  <div className="w-10 h-1 bg-[#FCC20A] rounded-full mb-5" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-3">{value.title}</h3>
                  <p className="text-[#6B6860] leading-relaxed text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white py-16 lg:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-[#00319D] text-sm font-bold tracking-widest uppercase mb-4">Who&apos;s building it</div>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A1A] text-balance leading-tight mb-10 max-w-xl">
              Built by people who&apos;ve lived this problem.
              <span className="text-[#00319D]"> Not just studied it.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member) => (
                <Link
                  key={member.name}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-[#F7F6F3] rounded-2xl p-7 border border-[#E8E6E1] hover:border-[#00319D] transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-5">
                    <Image src={member.photo} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-1 group-hover:text-[#00319D] transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-[#00319D] text-xs font-bold tracking-widest uppercase mb-4">{member.role}</div>
                  <p className="text-[#6B6860] leading-relaxed text-sm">{member.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Markets */}
        <section className="bg-[#F7F6F3] py-16 lg:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading text-4xl font-bold text-[#1A1A1A] text-balance leading-tight mb-10 max-w-xl">
              Nine countries. Hundreds of universities. One platform.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {markets.map((market) => (
                <div key={market.name} className="bg-white rounded-2xl p-7 border border-[#E8E6E1]">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F7F6F3] border border-[#E8E6E1] text-2xl mb-5"
                    role="img"
                    aria-label={`${market.name} flag`}
                  >
                    {market.flag}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-3">{market.name}</h3>
                  <p className="text-[#6B6860] text-sm leading-relaxed">{market.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <MatchedCTA
                variant="full"
                title="Ready to find your home?"
                description={"Tell us where you're studying and we'll match you with verified accommodation before you arrive."}
                buttonText="Get Matched"
                buttonHref="/get-matched"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
