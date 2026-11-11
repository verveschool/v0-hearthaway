import { countries, type CountryPlace } from '@/lib/country-data'
import { universities, type UniversityPlace, type CountryCode } from '@/lib/place-data'

const countryCodes: Record<CountryPlace['slug'], CountryCode> = {
  uk: 'UK',
  ireland: 'IE',
  france: 'FR',
  uae: 'UAE',
  germany: 'DE',
  australia: 'AU',
  usa: 'USA',
  canada: 'CA',
  spain: 'ES',
  austria: 'AT',
  belgium: 'BE',
  hungary: 'HU',
  singapore: 'SG',
  malaysia: 'MY',
  malta: 'MT',
  italy: 'IT',
  netherlands: 'NL',
}

export type UniversityDirectoryGroup = {
  country: CountryPlace
  featured: UniversityPlace[]
  all: UniversityPlace[]
}

function findUniversitiesBySlugs(slugs: string[]) {
  const universityBySlug = new Map(universities.map((university) => [university.slug, university]))
  return slugs
    .map((slug) => universityBySlug.get(slug))
    .filter((university): university is UniversityPlace => university !== undefined)
    .slice(0, 10)
}

export const universityDirectory: UniversityDirectoryGroup[] = countries.map((country) => {
  const code = countryCodes[country.slug]
  const all = universities.filter((university) => university.country === code || university.country === country.name)

  return {
    country,
    featured: findUniversitiesBySlugs(country.universitySlugs),
    all,
  }
})

export function getUniversityDirectorySearchResults(query: string) {
  const search = query.trim().toLowerCase()
  if (!search) return universityDirectory

  return universityDirectory
    .map((group) => ({
      ...group,
      featured: group.featured.filter((university) => matchesUniversity(university, search)),
      all: group.all.filter((university) => matchesUniversity(university, search)),
    }))
    .filter((group) => group.featured.length > 0 || group.all.length > 0)
}

function matchesUniversity(university: UniversityPlace, search: string) {
  return [university.name, university.city, university.slug].some((value) => value.toLowerCase().includes(search))
}
