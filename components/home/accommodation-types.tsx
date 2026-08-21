import Link from 'next/link'
import Image from 'next/image'

const types = [
  {
    name: 'Student Halls',
    bestFor: 'First year & social students',
    description:
      'University-managed and private halls of residence. Social, central, and usually all-inclusive — the most popular first-year choice.',
    image: '/images/acc-halls.png',
    href: '/accommodation',
    tags: ['Bills included', 'Social atmosphere', 'Campus location'],
    size: 'large',
  },
  {
    name: 'Shared Houses',
    bestFor: 'Budget-conscious students',
    description:
      'Rent a room in a shared house with other students. More independence, lower cost, and a real home feel.',
    image: '/images/acc-shared.png',
    href: '/accommodation',
    tags: ['Lower cost', 'More independence', 'Local area'],
    size: 'small',
  },
  {
    name: 'Studio Apartments',
    bestFor: 'Postgrads & those who value privacy',
    description:
      'Your own self-contained space with a private kitchen and bathroom. Quiet, focused, and completely yours.',
    image: '/images/acc-studio.png',
    href: '/accommodation',
    tags: ['Privacy', 'Self-contained', 'Quiet study'],
    size: 'small',
  },
  {
    name: 'Homestay',
    bestFor: 'Language learners & first-time movers',
    description:
      'Live with a local family. Build language skills, experience local culture, and have a warm, supportive home from day one.',
    image: '/images/acc-homestay.png',
    href: '/accommodation',
    tags: ['Cultural immersion', 'Meals included', 'Family environment'],
    size: 'small',
  },
]

export default function AccommodationTypes() {
  const [large, ...rest] = types

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-[#FCC20A]" aria-hidden="true" />
              <span className="text-[#00319D] text-sm font-bold tracking-widest uppercase">
                Types of accommodation
              </span>
            </div>
            <h2 className="font-heading text-4xl lg:text-[3.25rem] font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight text-balance">
              Every student is different.{' '}
              <br className="hidden lg:block" />
              <span className="text-[#00319D]">Your accommodation should match.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[#6B6860] text-base leading-relaxed lg:text-right">
            Not sure which type is right for you? Your accommodation advisor will help you figure it out based on your budget, lifestyle, and university location.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Large featured card */}
          <Link
            href={large.href}
            className="group lg:col-span-2 overflow-hidden rounded-2xl bg-white border border-[#E8E6E1] hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={large.image}
              alt={large.name}
              fill
              className="h-64 lg:h-72 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 67vw"
            />
            <div className="p-8">
              <span className="inline-block text-xs font-bold text-[#00319D] bg-[#FCC20A] px-3 py-1.5 rounded-full mb-4">
                {large.bestFor}
              </span>
              <h3 className="font-heading font-extrabold text-3xl text-[#1A1A1A] mb-2 group-hover:text-[#00319D] transition-colors">
                {large.name}
              </h3>
              <p className="text-[#6B6860] text-base leading-relaxed mb-5 max-w-md">
                {large.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {large.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-[#F7F6F3] border border-[#E8E6E1] text-[#6B6860] text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* Small cards column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {/* Kitchen highlight card */}
            <Link
              href="/accommodation"
              className="group overflow-hidden rounded-2xl bg-white border border-[#E8E6E1] hover:shadow-xl transition-all duration-300"
            >
              <Image
                src="/images/acc-kitchen.png"
                alt="Modern student kitchen and dining area"
                fill
                className="h-40 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="p-5">
                <p className="font-heading font-extrabold text-lg text-[#1A1A1A] leading-snug group-hover:text-[#00319D] transition-colors">
                  See how students actually live
                </p>
                <p className="text-[#6B6860] text-sm mt-1">Photo tours for every property type</p>
              </div>
            </Link>

            {rest.map((type) => (
              <Link
                key={type.name}
                href={type.href}
                className="group overflow-hidden rounded-2xl bg-white border border-[#E8E6E1] hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={type.image}
                  alt={type.name}
                  fill
                  className="h-40 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="p-5">
                  <h3 className="font-heading font-extrabold text-lg text-[#1A1A1A] group-hover:text-[#00319D] transition-colors">{type.name}</h3>
                  <p className="text-[#6B6860] text-xs mt-0.5">{type.bestFor}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Link
            href="/get-matched"
            className="inline-flex items-center gap-3 px-7 py-4 bg-[#FCC20A] text-[#00319D] font-bold text-base rounded-xl hover:bg-[#FCC20A] transition-colors shadow-sm"
          >
            Get matched to the right type for you
          </Link>
          <Link
            href="/accommodation"
            className="text-[#00319D] font-semibold text-sm border-b-2 border-[#FCC20A] pb-px hover:text-[#00319D] transition-colors"
          >
            Explore all accommodation types
          </Link>
        </div>
      </div>
    </section>
  )
}
