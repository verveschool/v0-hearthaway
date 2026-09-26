export type AccommodationPartner = {
  slug: string
  name: string
  kind: 'operator' | 'marketplace' | 'institutional'
  website: string
  note?: string
}

export const accommodationPartners: AccommodationPartner[] = [
  { slug: 'amber-student', name: 'Amber Student', kind: 'marketplace', website: 'https://amberstudent.com/' },
  { slug: 'study-inn', name: 'Study Inn', kind: 'operator', website: 'https://studyinn.com/' },
  { slug: 'neon-wood', name: 'Neon Wood', kind: 'operator', website: 'https://neonwood.com/' },
  { slug: 'vita-student', name: 'Vita Student', kind: 'operator', website: 'https://www.vitastudent.com/en/' },
  { slug: 'the-social-hub', name: 'The Social Hub', kind: 'operator', website: 'https://www.thesocialhub.co/' },
  { slug: 'homes-for-students', name: 'Homes for Students', kind: 'operator', website: 'https://homesforstudents.co.uk/' },
  { slug: 'autumn-rooms', name: 'Autumn Rooms', kind: 'operator', website: 'https://autumnrooms.com/' },
  { slug: 'housing-anywhere', name: 'Housing Anywhere', kind: 'marketplace', website: 'https://housinganywhere.com/' },
  { slug: 'uniplaces', name: 'Uniplaces', kind: 'marketplace', website: 'https://www.uniplaces.com/' },
  { slug: 'studapart', name: 'Studapart', kind: 'marketplace', website: 'https://www.studapart.com/' },
  { slug: 'scraye', name: 'Scraye', kind: 'marketplace', website: 'https://www.scraye.com/' },
  { slug: 'iglu', name: 'Iglu', kind: 'operator', website: 'https://iglu.com.au/' },
  { slug: 'cloud-student-homes', name: 'Cloud Student Homes', kind: 'operator', website: 'https://cloudstudenthomes.com/' },
  { slug: 'campus-living-villages', name: 'Campus Living Villages', kind: 'operator', website: 'https://campuslivingvillages.com/' },
  { slug: 'nexity-studea', name: 'Nexity Studéa', kind: 'operator', website: 'https://www.nexity-studea.com/' },
  { slug: 'strategic-housing-group', name: 'Strategic Housing Group', kind: 'operator', website: 'https://strategichousinggroup.com/' },
  { slug: 'the-myriad', name: 'The Myriad', kind: 'operator', website: 'https://www.themyriad.com/' },
  { slug: 'university-of-malta', name: 'University of Malta', kind: 'institutional', website: 'https://www.um.edu.mt/' },
  { slug: 'pfp-students', name: 'PfP Students', kind: 'operator', website: 'https://www.pfpstudents.co.uk/' },
  { slug: 'esaw', name: 'ESAW', kind: 'operator', website: 'https://www.esaw.com/' },
  { slug: 'endsleigh-park', name: 'Endsleigh Park', kind: 'operator', website: 'https://www.endsleighpark.co.uk/' },
  { slug: 'eos-residence', name: 'EOS Residence', kind: 'operator', website: 'https://eosresidence.com/' },
  { slug: 'ksk-homes', name: 'KSK Homes', kind: 'operator', website: 'https://kskhomes.com/' },
  { slug: 'misu-housing', name: 'Misu Housing', kind: 'operator', website: 'https://misuhousing.com/' },
  { slug: 'lota-heights', name: 'Lota Heights', kind: 'operator', website: 'https://lotaheights.com/' },
  { slug: 'stacey', name: 'STACEY', kind: 'operator', website: 'https://www.stacey.co/' },
  { slug: 'vivo-living', name: 'Vivo Living', kind: 'operator', website: 'https://vivo-living.com/' },
  { slug: 'leevin-stay', name: 'Leevin Stay', kind: 'operator', website: 'https://leevin.com/' },
  { slug: 'acomodo', name: 'Acomodo', kind: 'operator', website: 'https://acomodo.co.uk/' },
  { slug: 'michel-student-hostel', name: 'Michel Student Hostel', kind: 'operator', website: 'https://michelstudenthostel.com/' },
  { slug: 'the-haven-student-living', name: 'The Haven Student Living', kind: 'operator', website: 'https://thehavenstudentliving.com/' },
]

export function getAccommodationPartner(slug: string) {
  return accommodationPartners.find((partner) => partner.slug === slug)
}
