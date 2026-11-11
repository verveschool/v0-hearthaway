'use client'

import Link from 'next/link'
import { useMemo, useState, type ChangeEvent } from 'react'
import { ArrowRight, Building2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getUniversityDirectorySearchResults, universityDirectory } from '@/lib/university-directory'
import type { UniversityDirectoryGroup } from '@/lib/university-directory'

function UniversityCard({ university }: { university: UniversityDirectoryGroup['all'][number] }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#E8E4DC] bg-white p-5 shadow-[0_8px_24px_rgba(0,49,157,0.04)] transition-shadow hover:shadow-[0_12px_30px_rgba(0,49,157,0.1)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F0FF] text-[#00319D]" aria-hidden="true">
          <Building2 data-icon="inline-start" />
        </div>
        <span className="rounded-full bg-[#F7F4EE] px-2.5 py-1 text-xs font-semibold text-[#6B6860]">{university.city}</span>
      </div>
      <h3 className="text-lg font-bold leading-snug text-[#181817]">{university.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">{university.students} students · {university.city}</p>
      <Link href={`/universities/${university.slug}`} className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-[#00319D] hover:underline">
        View university <ArrowRight data-icon="inline-end" />
      </Link>
    </article>
  )
}

function CountryDirectorySection({ group }: { group: UniversityDirectoryGroup }) {
  return (
    <section id={group.country.slug} className="scroll-mt-28 border-t border-[#E8E4DC] py-12 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#181817]">{group.country.name}</h2>
          <p className="mt-2 max-w-2xl text-[#6B6860]">{group.all.length} universities in the directory</p>
        </div>
        <Link href={`/moving-abroad/${group.country.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#00319D] hover:underline">
          Explore {group.country.name} <ArrowRight data-icon="inline-end" />
        </Link>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-bold text-[#181817]">Featured Universities</h3>
        {group.featured.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.featured.map((university) => <UniversityCard key={university.slug} university={university} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#CFC9BD] bg-[#FBFAF7] p-6 text-sm text-[#6B6860]">
            Featured university information for this destination is pending.
          </div>
        )}
      </div>

      {group.all.length > 0 && (
        <details className="group mt-8 rounded-2xl border border-[#E8E4DC] bg-[#FBFAF7] p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#181817] [&::-webkit-details-marker]:hidden">
            <span>Complete {group.country.name} listing</span>
            <span className="text-sm font-semibold text-[#00319D] group-open:hidden">Show all</span>
            <span className="hidden text-sm font-semibold text-[#00319D] group-open:inline">Hide list</span>
          </summary>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {group.all.map((university) => (
              <Link key={university.slug} href={`/universities/${university.slug}`} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#00319D] transition-colors hover:bg-[#E8F0FF]">
                <span>{university.name}</span>
                <ArrowRight data-icon="inline-end" />
              </Link>
            ))}
          </div>
        </details>
      )}
    </section>
  )
}

export function UniversityDirectory() {
  const [query, setQuery] = useState('')
  const groups = useMemo(() => getUniversityDirectorySearchResults(query), [query])

  return (
    <>
      <div className="relative mx-auto -mt-10 max-w-3xl rounded-2xl border border-[#E8E4DC] bg-white p-3 shadow-[0_18px_45px_rgba(0,49,157,0.12)]">
        <label htmlFor="university-search" className="sr-only">Search universities</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6860]" aria-hidden="true" />
          <input id="university-search" value={query} onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} placeholder="Search by university or city" className="h-12 w-full rounded-lg border-0 bg-transparent pl-12 text-base text-[#181817] outline-none placeholder:text-[#6B6860] focus-visible:ring-2 focus-visible:ring-[#00319D]" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8">
        {groups.length > 0 ? groups.map((group) => <CountryDirectorySection key={group.country.slug} group={group} />) : (
          <div className="rounded-2xl border border-dashed border-[#CFC9BD] bg-[#FBFAF7] p-10 text-center">
            <h2 className="text-xl font-bold text-[#181817]">No universities found</h2>
            <p className="mt-2 text-[#6B6860]">Try a different university or city.</p>
            <Button type="button" variant="outline" className="mt-5" onClick={() => setQuery('')}>Clear search</Button>
          </div>
        )}
        {!query && universityDirectory.some((group) => group.featured.length < 10) && (
          <p className="mt-8 border-t border-[#E8E4DC] pt-6 text-sm text-[#6B6860]">Featured listings will expand as the HearthAway university dataset is supplied. This directory only shows verified entries currently available.</p>
        )}
      </div>
    </>
  )
}
