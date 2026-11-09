import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { SalesNoteForm } from '@/components/account/team-forms'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Team Case Inbox | HearthAway',
  description: 'View assigned HearthAway student enquiries and keep private case notes.',
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function formatStatus(value: string) {
  return value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export default async function TeamPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in?next=%2Fteam')

  const { data: member } = await supabase.from('sales_team_members').select('role').eq('user_id', user.id).eq('active', true).maybeSingle()
  if (!member) notFound()

  const { data: assignments } = await supabase.from('sales_case_assignments')
    .select('id,student_id,enquiry_id,assigned_at')
    .eq('owner_id', user.id)
    .order('assigned_at', { ascending: false })

  const latestCases = new Map<string, NonNullable<typeof assignments>[number]>()
  for (const assignment of assignments ?? []) {
    const caseKey = assignment.enquiry_id ? `enquiry:${assignment.enquiry_id}` : `student:${assignment.student_id ?? assignment.id}`
    if (!latestCases.has(caseKey)) latestCases.set(caseKey, assignment)
  }
  const cases = [...latestCases.values()]
  const enquiryIds = [...new Set(cases.flatMap((item) => item.enquiry_id ? [item.enquiry_id] : []))]
  const studentIds = [...new Set(cases.flatMap((item) => item.student_id ? [item.student_id] : []))]
  const [enquiryResult, profileResult, noteResult] = await Promise.all([
    enquiryIds.length
      ? supabase.from('enquiries').select('id,student_id,first_name,last_name,contact_email,phone,enquiry_type,city,university,status,message,created_at').in('id', enquiryIds)
      : Promise.resolve({ data: [] }),
    studentIds.length
      ? supabase.from('profiles').select('id,first_name,last_name,phone,country,city,university').in('id', studentIds)
      : Promise.resolve({ data: [] }),
    enquiryIds.length
      ? supabase.from('sales_notes').select('id,enquiry_id,note,created_at').in('enquiry_id', enquiryIds).order('created_at', { ascending: false })
      : Promise.resolve({ data: [] }),
  ])
  const enquiryById = new Map((enquiryResult.data ?? []).map((item) => [item.id, item]))
  const profileById = new Map((profileResult.data ?? []).map((item) => [item.id, item]))
  const notesByEnquiry = new Map<string, Array<{ id: string; note: string; created_at: string }>>()
  for (const note of noteResult.data ?? []) {
    if (!note.enquiry_id) continue
    const notes = notesByEnquiry.get(note.enquiry_id) ?? []
    notes.push(note)
    notesByEnquiry.set(note.enquiry_id, notes)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F6F3] pb-16 pt-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <header className="rounded-3xl bg-[#00319D] p-7 text-white sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FCC20A]">HearthAway team</p>
            <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Assigned case inbox</h1>
            <p className="mt-3 text-sm text-white/75">Signed in as {user.email} · {formatStatus(member.role)}</p>
          </header>

          <section className="mt-8" aria-label="Assigned student enquiries">
            {cases.length ? <div className="grid gap-5 lg:grid-cols-2">
              {cases.map((assignment) => {
                const enquiry = assignment.enquiry_id ? enquiryById.get(assignment.enquiry_id) : null
                const profile = assignment.student_id ? profileById.get(assignment.student_id) : null
                if (!enquiry && !profile) return null
                const name = enquiry ? `${enquiry.first_name} ${enquiry.last_name}`.trim() : `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim() || 'Student case'
                const studentId = enquiry?.student_id ?? assignment.student_id ?? null
                const notes = assignment.enquiry_id ? notesByEnquiry.get(assignment.enquiry_id) ?? [] : []
                return <article key={assignment.id} className="rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div><p className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">{enquiry?.enquiry_type ? formatStatus(enquiry.enquiry_type) : 'Student support'}</p><h2 className="mt-2 font-heading text-xl font-extrabold text-[#1A1A1A]">{name}</h2></div>
                    {enquiry?.status ? <span className="rounded-full bg-[#F7F6F3] px-3 py-1 text-xs font-bold text-[#00319D]">{formatStatus(enquiry.status)}</span> : null}
                  </div>
                  <dl className="mt-5 grid gap-3 border-t border-[#E8E6E1] pt-4 sm:grid-cols-2">
                    <div><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Email</dt><dd className="mt-1 break-all text-sm text-[#333333]">{enquiry?.contact_email ?? 'Not provided'}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Phone</dt><dd className="mt-1 text-sm text-[#333333]">{enquiry?.phone ?? profile?.phone ?? 'Not provided'}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">City</dt><dd className="mt-1 text-sm text-[#333333]">{enquiry?.city ?? profile?.city ?? 'Not provided'}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">University</dt><dd className="mt-1 text-sm text-[#333333]">{enquiry?.university ?? profile?.university ?? 'Not provided'}</dd></div>
                  </dl>
                  {enquiry?.message ? <p className="mt-4 rounded-xl bg-[#F7F6F3] p-4 text-sm leading-relaxed text-[#4C4A45]">{enquiry.message}</p> : null}
                  {enquiry?.created_at ? <p className="mt-3 text-xs text-[#6B6860]">Enquiry received {formatDate(enquiry.created_at)}</p> : null}
                  {notes.length ? <div className="mt-5 border-t border-[#E8E6E1] pt-4"><h3 className="text-sm font-bold text-[#333333]">Private notes</h3><ul className="mt-3 flex flex-col gap-3">{notes.map((note) => <li key={note.id} className="rounded-xl bg-[#F7F6F3] p-4"><p className="whitespace-pre-wrap text-sm leading-relaxed text-[#4C4A45]">{note.note}</p><p className="mt-2 text-xs text-[#6B6860]">{formatDate(note.created_at)}</p></li>)}</ul></div> : null}
                  <SalesNoteForm enquiryId={assignment.enquiry_id} studentId={studentId} />
                </article>
              })}
            </div> : <div className="rounded-2xl border border-[#E8E6E1] bg-white p-8 text-center"><h2 className="font-heading text-xl font-extrabold text-[#1A1A1A]">No cases assigned yet</h2><p className="mt-2 text-sm text-[#6B6860]">Assigned enquiries will appear here.</p></div>}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
