import Image from 'next/image'

type AccommodationPartnerLogo = {
  name: string
  src: `/accommodation-partners/${string}.png`
}

const accommodationPartnerLogos: readonly AccommodationPartnerLogo[] = [
  { name: 'ESAW', src: '/accommodation-partners/ESAW.png' },
  { name: 'Vivo Living', src: '/accommodation-partners/Vivo_Living.png' },
  { name: 'Strategic Housing Group', src: '/accommodation-partners/Strategic_Housing_Group.png' },
  { name: 'Neon Wood', src: '/accommodation-partners/Neon_Wood.png' },
  { name: 'Study Inn', src: '/accommodation-partners/Study_Inn.png' },
  { name: 'Iglu', src: '/accommodation-partners/Iglu.png' },
  { name: 'Uniplaces', src: '/accommodation-partners/Uniplaces.png' },
  { name: 'Cloud Student Homes', src: '/accommodation-partners/Cloud_Student_Homes.png' },
  { name: 'Homes for Students', src: '/accommodation-partners/Homes_for_Students.png' },
  { name: 'Misu Housing', src: '/accommodation-partners/Misu_Housing.png' },
  { name: 'Campus Living Villages', src: '/accommodation-partners/Campus_Living_Villages.png' },
  { name: 'Scraye', src: '/accommodation-partners/Scraye.png' },
  { name: 'PfP Students', src: '/accommodation-partners/PfP_Students.png' },
  { name: 'Nexity Studea', src: '/accommodation-partners/Nexity_Studea.png' },
  { name: 'KSK Homes', src: '/accommodation-partners/KSK_Homes.png' },
  { name: 'Lota Heights', src: '/accommodation-partners/Lota_Heights.png' },
] as const

export default function AccommodationPartnersSection() {
  return (
    <section className="bg-[#ffffff] py-12 lg:py-16" aria-labelledby="accommodation-partners-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-8 lg:mb-10">
          <p className="text-[#6B6860] text-xs font-bold tracking-widest uppercase mb-3">
            Accommodation partners
          </p>
          <h2 id="accommodation-partners-heading" className="font-heading text-[#1A1A1A] text-2xl lg:text-3xl font-extrabold tracking-tight text-balance">
            Trusted homes from verified providers
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 lg:gap-4">
          {accommodationPartnerLogos.map((logo) => (
            <div
              key={logo.src}
              className="flex aspect-[4/3] items-center justify-center rounded-none border border-[#E8E6E1] bg-white p-0"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} accommodation partner logo`}
                width={192}
                height={128}
                className="h-16 w-full object-contain sm:h-20"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16.666vw"
                quality={70}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
