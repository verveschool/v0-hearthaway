import Link from 'next/link'
import Image from 'next/image'

const types = [
  {
    name: 'Student Halls',
    description: 'University-managed and private halls of residence. Great for your first year — social, central, and all-inclusive.',
    bestFor: 'First year & social students',
    image: '/images/acc-halls.jpg',
    href: '/accommodation/student-halls',
    tags: ['All bills included', 'Social atmosphere', 'Campus location'],
  },
  {
    name: 'Shared Houses',
    description: 'Rent a room in a shared house with other students. More independence, lower cost, and a real home feel.',
    bestFor: 'Budget-conscious students',
    image: '/images/acc-shared.jpg',
    href: '/accommodation/shared-houses',
    tags: ['Lower cost', 'More independence', 'Local area'],
  },
  {
    name: 'Studio Apartments',
    description: 'Your own self-contained space with a private kitchen and bathroom. Ideal for postgraduates or those who value privacy.',
    bestFor: 'Postgrads & professionals',
    image: '/images/acc-studio.jpg',
    href: '/accommodation/studios',
    tags: ['Privacy', 'Self-contained', 'Quiet study'],
  },
  {
    name: 'Homestay',
    description: 'Live with a local family. Build language skills, experience local culture, and have a supportive home environment.',
    bestFor: 'Language learners & nervous movers',
    image: '/images/acc-homestay.jpg',
    href: '/accommodation/homestay',
    tags: ['Cultural immersion', 'Meals included', 'Family environment'],
  },
]

export default function AccommodationTypes() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-[#1B365D] text-sm font-bold tracking-widest uppercase mb-4">
              Accommodation types
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#1A1A1A] text-balance leading-tight">
              Every student is different.
              <span className="text-[#1B365D]"> Your accommodation should match.</span>
            </h2>
          </div>
          <Link
            href="/accommodation"
            className="flex-shrink-0 text-[#1B365D] font-semibold text-sm border-b-2 border-[#FFCC00] pb-0.5 hover:text-[#24497D] transition-colors"
          >
            Explore all types
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {types.map((type) => (
            <Link
              key={type.name}
              href={type.href}
              className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-[#E8E6E1] hover:border-[#1B365D]/30 hover:shadow-xl transition-all duration-300 bg-[#F7F6F3]"
            >
              <div className="relative w-full sm:w-48 h-52 sm:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={type.image}
                  alt={type.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
              </div>
              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-heading font-bold text-xl text-[#1A1A1A]">{type.name}</h3>
                    <span className="flex-shrink-0 text-xs font-medium px-3 py-1 bg-[#1B365D]/8 text-[#1B365D] rounded-full">
                      {type.bestFor}
                    </span>
                  </div>
                  <p className="text-[#6B6860] text-sm leading-relaxed mb-4">{type.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {type.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white border border-[#E8E6E1] text-[#6B6860] text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
