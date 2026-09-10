import Image from 'next/image'

type AccommodationPartnerLogo = {
  name: string
  src: `/accommodation-partners/${string}.png`
}

const accommodationPartnerLogos: readonly AccommodationPartnerLogo[] = [
  { name: 'Study Inn', src: '/accommodation-partners/Study_Inn.png' },
  { name: 'Neon Wood', src: '/accommodation-partners/Neon_Wood.png' },
  { name: 'Vita Student', src: '/accommodation-partners/Vita-Student.png' },
  { name: 'The Social Hub', src: '/accommodation-partners/The-Social-Hub.png' },
  { name: 'Homes for Students', src: '/accommodation-partners/Homes_for_Students.png' },
  { name: 'Autumn Rooms', src: '/accommodation-partners/Autumn-Rooms.png' },
  { name: 'Housing Anywhere', src: '/accommodation-partners/Housing-Anywhere.png' },
  { name: 'Uniplaces', src: '/accommodation-partners/Uniplaces.png' },
  { name: 'Studapart', src: '/accommodation-partners/Studapart.png' },
  { name: 'Scraye', src: '/accommodation-partners/Scraye.png' },
  { name: 'Iglu', src: '/accommodation-partners/Iglu.png' },
  { name: 'Cloud Student Homes', src: '/accommodation-partners/Cloud_Student_Homes.png' },
  { name: 'Campus Living Villages', src: '/accommodation-partners/Campus_Living_Villages.png' },
  { name: 'Nexity Studea', src: '/accommodation-partners/Nexity_Studea.png' },
  { name: 'Strategic Housing Group', src: '/accommodation-partners/Strategic_Housing_Group.png' },
  { name: 'The Myriad', src: '/accommodation-partners/The-Myriad.png' },
  { name: 'University of Malta', src: '/accommodation-partners/University-of-Malta.png' },
  { name: 'PfP Students', src: '/accommodation-partners/PfP_Students.png' },
  { name: 'ESAW', src: '/accommodation-partners/ESAW.png' },
  { name: 'Endsleigh Park', src: '/accommodation-partners/Endsleigh_Park.png' },
  { name: 'EOS Residence', src: '/accommodation-partners/EOS-Residence.png' },
  { name: 'KSK Homes', src: '/accommodation-partners/KSK_Homes.png' },
  { name: 'Misu Housing', src: '/accommodation-partners/Misu_Housing.png' },
  { name: 'Lota Heights', src: '/accommodation-partners/Lota_Heights.png' },
  { name: 'STACEY', src: '/accommodation-partners/STACEY.png' },
  { name: 'Vivo Living', src: '/accommodation-partners/Vivo_Living.png' },
  { name: 'Leevin Stay', src: '/accommodation-partners/Leevin-Stay.png' },
  { name: 'Acomodo', src: '/accommodation-partners/Acomodo.png' },
  { name: 'Milchel Student Hostel', src: '/accommodation-partners/Michel-Student-Hostel.png' },
  { name: 'The Haven Student Living', src: '/accommodation-partners/The-Haven-Student-Living.png' },
] as const;

export default function AccommodationPartnersSection() {
  return (
    <section className="bg-[#ffffff] py-12 lg:py-16" aria-labelledby="accommodation-partners-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-8 lg:mb-10">
          <h2 id="accommodation-partners-heading" className="font-heading text-[#1A1A1A] text-2xl lg:text-3xl font-extrabold tracking-tight text-balance">
            Trusted homes from verified providers
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 lg:gap-4">
          {accommodationPartnerLogos.map((logo) => (
            <div
              key={logo.src}
              className="flex aspect-[4/3] items-center justify-center rounded-none bg-white p-0"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} accommodation partner logo`}
                width={192}
                height={128}
                className="h-full w-full object-contain"
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
