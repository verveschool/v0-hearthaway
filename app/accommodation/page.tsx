'use client'

import Link from 'next/link'
import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, CheckCircle2, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import {
  accommodationCategories,
  accommodationCities,
  accommodationCountries,
  accommodationProperties,
  accommodationRoomTypes,
  hasVerifiedRoomPhoto,
  getAccommodationBudgetRanges,
  getAccommodationCitiesByCountry,
} from './catalog'
import { formatAccommodationPrice, formatAccommodationPricePeriod } from './formatters'

function AccommodationContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('query') ?? '')
  const [country, setCountry] = useState('All countries')
  const [city, setCity] = useState(() => {
    const cityFromQuery = searchParams.get('city')
    return cityFromQuery && accommodationCities.includes(cityFromQuery) ? cityFromQuery : 'All cities'
  })
  const [roomType, setRoomType] = useState('Any room type')
  const [category, setCategory] = useState('Any category')
  const [maxBudget, setMaxBudget] = useState('Any budget')

  const availableCities = country === 'All countries' ? accommodationCities : getAccommodationCitiesByCountry(country)
  const budgetRanges = useMemo(
    () => getAccommodationBudgetRanges(country === 'All countries' ? accommodationProperties : accommodationProperties.filter((property) => property.country === country)),
    [country],
  )
  const selectedBudget = budgetRanges.find((range) => range.value === maxBudget)

  const handleCountryChange = (nextCountry: string) => {
    setCountry(nextCountry)
    setMaxBudget('Any budget')
    const nextCities = nextCountry === 'All countries' ? accommodationCities : getAccommodationCitiesByCountry(nextCountry)
    if (city !== 'All cities' && !nextCities.includes(city)) setCity('All cities')
  }

  const filteredProperties = useMemo(() => accommodationProperties.filter((property) => {
    const normalizedQuery = query.trim().toLowerCase()
    const matchesQuery = !normalizedQuery || [property.name, property.city, ...property.universities, ...property.amenities, ...(property.goodFor ?? [])].some((value) => value.toLowerCase().includes(normalizedQuery))
    const matchesCountry = country === 'All countries' || property.country === country
    const matchesCity = city === 'All cities' || property.city === city
    const matchesRoom = roomType === 'Any room type' || property.roomTypes.includes(roomType)
    const matchesCategory = category === 'Any category' || (property.categories ?? []).includes(category)
    const matchesBudget = !selectedBudget || (
      property.currency === selectedBudget.currency
      && property.pricePeriod === selectedBudget.pricePeriod
      && property.priceFrom > 0
      && property.priceFrom <= selectedBudget.upperBound
    )
    return matchesQuery && matchesCountry && matchesCity && matchesRoom && matchesCategory && matchesBudget
  }), [category, city, country, query, roomType, selectedBudget])

  return <>
    <Navigation />
    <main>
      <section className="bg-[#00319D] px-6 py-16 text-white lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">Find your student <span className="text-[#FCC20A]">home</span>.</h1><p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">Only sourced listings with a published starting price appear here. Room-level photos are labelled separately so you can see exactly what has and has not been checked.</p></div><div className="mt-10 rounded-2xl bg-white p-4 shadow-2xl sm:p-5"><div className="space-y-4"><label htmlFor="accommodation-search" className="block text-sm font-bold text-[#1A1A1A]"><span>Search accommodation</span><span className="mt-2 flex items-center gap-3 rounded-xl border border-[#E8E6E1] px-4 py-3 text-[#1A1A1A] transition-colors focus-within:border-[#00319D] focus-within:ring-2 focus-within:ring-[#00319D]/20"><Search className="h-5 w-5 shrink-0 text-[#00319D]" /><input id="accommodation-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a city, property or university" className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:font-normal placeholder:text-[#6B6860]" /></span></label><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"><label htmlFor="accommodation-country" className="min-w-0 text-sm font-bold text-[#1A1A1A]">Country<select id="accommodation-country" value={country} onChange={(e) => handleCountryChange(e.target.value)} className="mt-2 w-full rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium text-[#1A1A1A] outline-none transition-colors focus:border-[#00319D] focus:ring-2 focus:ring-[#00319D]/20"><option>All countries</option>{accommodationCountries.map((item) => <option key={item}>{item}</option>)}</select></label><label htmlFor="accommodation-city" className="min-w-0 text-sm font-bold text-[#1A1A1A]">City<select id="accommodation-city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 w-full rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium text-[#1A1A1A] outline-none transition-colors focus:border-[#00319D] focus:ring-2 focus:ring-[#00319D]/20"><option>All cities</option>{availableCities.map((item) => <option key={item}>{item}</option>)}</select></label><label htmlFor="accommodation-room-type" className="min-w-0 text-sm font-bold text-[#1A1A1A]">Room type<select id="accommodation-room-type" value={roomType} onChange={(e) => setRoomType(e.target.value)} className="mt-2 w-full rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium text-[#1A1A1A] outline-none transition-colors focus:border-[#00319D] focus:ring-2 focus:ring-[#00319D]/20"><option>Any room type</option>{accommodationRoomTypes.map((item) => <option key={item}>{item}</option>)}</select></label><label htmlFor="accommodation-category" className="min-w-0 text-sm font-bold text-[#1A1A1A]">Category<select id="accommodation-category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium text-[#1A1A1A] outline-none transition-colors focus:border-[#00319D] focus:ring-2 focus:ring-[#00319D]/20"><option>Any category</option>{accommodationCategories.map((item) => <option key={item}>{item}</option>)}</select></label><label htmlFor="accommodation-budget" className="min-w-0 text-sm font-bold text-[#1A1A1A]">Budget<select id="accommodation-budget" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} className="mt-2 w-full rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium text-[#1A1A1A] outline-none transition-colors focus:border-[#00319D] focus:ring-2 focus:ring-[#00319D]/20"><option value="Any budget">Any budget</option>{budgetRanges.map((range) => <option key={range.value} value={range.value}>{range.label}</option>)}</select></label><Link href="/get-matched" className="inline-flex min-w-0 items-center justify-center rounded-xl bg-[#FCC20A] px-5 py-3 text-sm font-bold text-[#333333] transition-colors hover:bg-[#eab000] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00319D] sm:col-span-2 lg:col-span-1 lg:mt-6 xl:col-span-1">Get Matched</Link></div></div></div></div></section>

      <section className="bg-[#F7F6F3] px-6 py-14 lg:px-8 lg:py-20"><div className="mx-auto max-w-7xl"><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-3 inline-flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-[#00319D]" /><span className="text-sm font-bold uppercase tracking-wider text-[#00319D]">Explore</span></div><h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">Places to start with</h2><p className="mt-2 text-sm text-[#6B6860]">{filteredProperties.length} sourced listings with pricing; room-photo checks are shown on each card.</p></div><Link href="/get-matched" className="inline-flex items-center gap-2 text-sm font-bold text-[#00319D]">Prefer a recommendation? Get matched <ArrowRight className="h-4 w-4" /></Link></div>{filteredProperties.length === 0 ? <div className="rounded-2xl border border-[#E8E6E1] bg-white p-12 text-center"><h3 className="font-heading text-xl font-extrabold">No properties match those filters.</h3><p className="mt-2 text-sm text-[#6B6860]">Try a different city, category, room type or budget.</p></div> : <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filteredProperties.map((property) => { const period = property.pricePeriod ? formatAccommodationPricePeriod(property.pricePeriod) : ''; return <Link key={property.slug} href={`/accommodation/${property.slug}`} className="group overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"><div className="relative h-56 overflow-hidden bg-[#00319D]"><img src={property.image} alt={property.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#00319D]"><CheckCircle2 className="h-3.5 w-3.5" />{hasVerifiedRoomPhoto(property) ? 'Specific room photo verified' : 'Room photo to confirm'}</div><div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white"><div><p className="text-xs font-semibold uppercase tracking-wider text-white/70">{property.city}</p><h3 className="font-heading text-2xl font-extrabold leading-tight">{property.name}</h3></div><div className="shrink-0 text-right">{property.priceFrom > 0 ? <><p className="text-xs text-white/70">from</p><p className="text-lg font-extrabold">{formatAccommodationPrice(property.currency, property.priceFrom)}<span className="text-xs font-semibold">{period}</span></p></> : <p className="text-sm font-bold">Check price</p>}</div></div></div><div className="p-5"><div className="flex items-start gap-2 text-sm text-[#6B6860]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00319D]" /><span>{property.address}</span></div><div className="mt-4 flex flex-wrap gap-2">{property.roomTypes.slice(0, 3).map((type) => <span key={type} className="rounded-full bg-[#F7F6F3] px-3 py-1 text-xs font-semibold text-[#1A1A1A]">{type}</span>)}</div><div className="mt-5 border-t border-[#E8E6E1] pt-4"><p className="text-xs font-semibold uppercase tracking-wider text-[#6B6860]">Nearby</p><p className="mt-1 text-sm font-semibold text-[#1A1A1A]">{property.distance}</p></div></div></Link>})}</div>}</div></section>
    </main>
    <Footer />
  </>
}

export default function AccommodationPage() {
  return (
    <Suspense fallback={null}>
      <AccommodationContent />
    </Suspense>
  )
}
