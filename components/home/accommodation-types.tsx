import Link from 'next/link'
import Image from 'next/image'

const types = [
  {
    name: 'Student Halls',
    bestFor: 'First year & social students',
    description:
      'University-managed and private halls of residence. Social, central, and usually all-inclusive — the most popular first-year choice.',
    image: '/images/acc-halls.png',
    href: '/accommodation/student-halls',
    tags: ['Bills included', 'Social atmosphere', 'Campus location'],
    size: 'large',
  },
  {
    name: 'Shared Houses',
    bestFor: 'Budget-conscious students',
    description:
      'Rent a room in a shared house with other students. More independence, lower cost, and a real home feel.',
    image: '/images/acc-shared.png',
    href: '/accommodation/shared-houses',
    tags: ['Lower cost', 'More independence', 'Local area'],
    size: 'small',
  },
  {
    name: 'Studio Apartments',
    bestFor: 'Postgrads & those who value privacy',
    description:
      'Your own self-contained space with a private kitchen and bathroom. Quiet, focused, and completely yours.',
    image: '/images/acc-studio.png',
    href: '/accommodation/studios',
    tags: ['Privacy', 'Self-contained', 'Quiet study'],
    size: 'small',
  },
  {
    name: 'Homestay',
    bestFor: 'Language learners & first-time movers',
    description:
      'Live with a local family. Build language skills, experience local culture, and have a warm, supportive home from day one.',
    image: '/images/acc-homestay.png',
    href: '/accommodation/homestay',
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
              <div className="w-8 h-px bg-[#FFCC00]" aria-hidden="true" />
              <span className="text-[#1B365D] text-sm font-bold tracking-widest uppercase">
                Types of accommodation
              </span>
            </div>
            <h2 className="font-heading text-4xl lg:text-[3.25rem] font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight text-balance">
              Every student is different.{' '}
              <br className="hidden lg:block" />
              <span className="text-[#1B365D]">Your accommodation should match.</span>
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
            className="group relative lg:col-span-2 h-96 lg:h-[480px] rounded-2xl overflow-hidden flex flex-col justify-end"
          >
            <Image
              src={large.image}
              alt={large.name}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 67vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12243E]/90 via-[#12243E]/40 to-transparent" />
            <div className="relative z-10 p-8">
              <span className="inline-block text-xs font-bold text-[#1B365D] bg-[#FFCC00] px-3 py-1.5 rounded-full mb-4">
                {large.bestFor}
              </span>
              <h3 className="font-heading font-extrabold text-3xl text-white mb-2">
                {large.name}
              </h3>
              <p className="text-white/75 text-base leading-relaxed mb-5 max-w-md">
                {large.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {large.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs font-medium">
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
              className="group relative h-56 lg:h-auto rounded-2xl overflow-hidden flex flex-col justify-end"
            >
              <Image
                src="/images/acc-kitchen.png"
                alt="Modern student kitchen and dining area"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12243E]/80 via-transparent to-transparent" />
              <div className="relative z-10 p-5">
                <p className="font-heading font-extrabold text-lg text-white leading-snug">
                  See how students actually live
                </p>
                <p className="text-white/70 text-sm mt-1">Photo tours for every property type</p>
              </div>
            </Link>

            {rest.map((type) => (
              <Link
                key={type.name}
                href={type.href}
                className="group relative h-56 lg:h-auto rounded-2xl overflow-hidden flex flex-col justify-end"
              >
                <Image
                  src={type.image}
                  alt={type.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12243E]/85 via-[#12243E]/20 to-transparent" />
                <div className="relative z-10 p-5">
                  <h3 className="font-heading font-extrabold text-lg text-white">{type.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{type.bestFor}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Link
            href="/get-matched"
            className="inline-flex items-center gap-3 px-7 py-4 bg-[#FFCC00] text-[#1B365D] font-bold text-base rounded-xl hover:bg-[#E6B800] transition-colors shadow-sm"
          >
            Get matched to the right type for you
          </Link>
          <Link
            href="/accommodation"
            className="text-[#1B365D] font-semibold text-sm border-b-2 border-[#FFCC00] pb-px hover:text-[#24497D] transition-colors"
          >
            Explore all accommodation types
          </Link>
        </div>
      </div>
    </section>
  )
}
