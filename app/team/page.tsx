import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import {
  BookingStatusForm,
  CaseClaimForm,
  EnquiryStatusForm,
  RoomRecommendationForm,
  SalesNoteForm,
  ServiceRequestStatusForm,
} from '@/components/account/team-forms'
import { accommodationRoomListings } from '@/app/accommodation/listing-data'
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

  const [assignmentsResult, allAssignmentsResult, recentEnquiriesResult, allBookingsResult, allServicesResult] = await Promise.all([
    supabase.from('sales_case_assignments').select('id,student_id,enquiry_id,assigned_at').eq('owner_id', user.id).order('assigned_at', { ascending: false }),
    supabase.from('sales_case_assignments').select('student_id,enquiry_id,owner_id'),
    supabase.from('enquiries').select('id,student_id,first_name,last_name,contact_email,phone,enquiry_type,city,university,move_in_window,stay_duration,budget_range,accommodation_preference,priorities,status,message,created_at').order('created_at', { ascending: false }).limit(100),
    supabase.from('booking_requests').select('id,student_id,room_slug,status,message,created_at').order('created_at', { ascending: false }).limit(150),
    supabase.from('service_requests').select('id,student_id,service_slug,status,message,specialist_user_id,created_at').order('created_at', { ascending: false }).limit(150),
  ])

  const assignments = assignmentsResult.data ?? []
  const allAssignments = allAssignmentsResult.data ?? []
  const recentEnquiries = recentEnquiriesResult.data ?? []
  const allBookings = allBookingsResult.data ?? []
  const allServices = allServicesResult.data ?? []
  const latestCases = new Map<string, typeof assignments[number]>()
  for (const assignment of assignments) {
    const caseKey = assignment.student_id ? `student:${assignment.student_id}` : `enquiry:${assignment.enquiry_id ?? assignment.id}`
    if (!latestCases.has(caseKey)) latestCases.set(caseKey, assignment)
  }
  const cases = [...latestCases.values()]
  const enquiryIds = [...new Set(cases.flatMap((item) => item.enquiry_id ? [item.enquiry_id] : []))]
  const directStudentIds = [...new Set(cases.flatMap((item) => item.student_id ? [item.student_id] : []))]
  const assignedEnquiryIds = [...new Set(allAssignments.flatMap((item) => item.enquiry_id ? [item.enquiry_id] : []))]
  const [caseEnquiryResult, assignedEnquiryOwnersResult] = await Promise.all([
    enquiryIds.length
      ? supabase.from('enquiries').select('id,student_id,first_name,last_name,contact_email,phone,enquiry_type,city,university,move_in_window,stay_duration,budget_range,accommodation_preference,priorities,status,message,created_at').in('id', enquiryIds)
      : Promise.resolve({ data: [] }),
    assignedEnquiryIds.length
      ? supabase.from('enquiries').select('student_id').in('id', assignedEnquiryIds)
      : Promise.resolve({ data: [] }),
  ])

  const assignedStudentIds = new Set([
    ...allAssignments.flatMap((item) => item.student_id ? [item.student_id] : []),
    ...(assignedEnquiryOwnersResult.data ?? []).flatMap((item) => item.student_id ? [item.student_id] : []),
  ])
  const unassignedEnquiries = recentEnquiries.filter((item) =>
    item.status !== 'closed' &&
    !assignedEnquiryIds.includes(item.id) &&
    (!item.student_id || !assignedStudentIds.has(item.student_id))
  ).slice(0, 16)
  const queuedStudentIds = new Set(unassignedEnquiries.flatMap((item) => item.student_id ? [item.student_id] : []))
  const unassignedStudentIds = [...new Set([
    ...allBookings.map((item) => item.student_id),
    ...allServices.map((item) => item.student_id),
  ])].filter((studentId) => !assignedStudentIds.has(studentId) && !queuedStudentIds.has(studentId))

  const linkedCaseStudentIds = (caseEnquiryResult.data ?? []).flatMap((item) => item.student_id ? [item.student_id] : [])
  const caseStudentIds = [...new Set([...directStudentIds, ...linkedCaseStudentIds])]
  const [relatedEnquiriesResult, profileResult, enquiryNoteResult, studentNoteResult] = await Promise.all([
    caseStudentIds.length
      ? supabase.from('enquiries').select('id,student_id,first_name,last_name,contact_email,phone,enquiry_type,city,university,move_in_window,stay_duration,budget_range,accommodation_preference,priorities,status,message,created_at').in('student_id', caseStudentIds).order('created_at', { ascending: false })
      : Promise.resolve({ data: [] }),
    [...new Set([...caseStudentIds, ...unassignedStudentIds])].length
      ? supabase.from('profiles').select('id,first_name,last_name,phone,country,city,university').in('id', [...new Set([...caseStudentIds, ...unassignedStudentIds])])
      : Promise.resolve({ data: [] }),
    enquiryIds.length
      ? supabase.from('sales_notes').select('id,enquiry_id,student_id,note,created_at').in('enquiry_id', enquiryIds).order('created_at', { ascending: false })
      : Promise.resolve({ data: [] }),
    caseStudentIds.length
      ? supabase.from('sales_notes').select('id,enquiry_id,student_id,note,created_at').in('student_id', caseStudentIds).order('created_at', { ascending: false })
      : Promise.resolve({ data: [] }),
  ])

  const caseEnquiries = new Map([
    ...(caseEnquiryResult.data ?? []).map((item) => [item.id, item] as const),
    ...(relatedEnquiriesResult.data ?? []).map((item) => [item.id, item] as const),
  ])
  const profileById = new Map((profileResult.data ?? []).map((item) => [item.id, item]))
  const notesByEnquiry = new Map<string, Array<{ id: string; note: string; created_at: string }>>()
  const notesByStudent = new Map<string, Array<{ id: string; note: string; created_at: string }>>()
  for (const note of [...(enquiryNoteResult.data ?? []), ...(studentNoteResult.data ?? [])]) {
    if (note.enquiry_id) {
      const notes = notesByEnquiry.get(note.enquiry_id) ?? []
      if (!notes.some((existing) => existing.id === note.id)) notes.push(note)
      notesByEnquiry.set(note.enquiry_id, notes)
    }
    if (note.student_id) {
      const notes = notesByStudent.get(note.student_id) ?? []
      if (!notes.some((existing) => existing.id === note.id)) notes.push(note)
      notesByStudent.set(note.student_id, notes)
    }
  }
  const recommendationRooms = accommodationRoomListings
    .map((room) => ({ slug: room.slug, name: room.room.name, city: room.property.city }))
    .sort((first, second) => first.city.localeCompare(second.city) || first.name.localeCompare(second.name))

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
                const assignedEnquiry = assignment.enquiry_id ? caseEnquiries.get(assignment.enquiry_id) : null
                const studentId = assignment.student_id ?? assignedEnquiry?.student_id ?? null
                const profile = studentId ? profileById.get(studentId) : null
                const relatedEnquiries = studentId ? [...caseEnquiries.values()].filter((item) => item.student_id === studentId) : []
                const enquiry = assignedEnquiry ?? relatedEnquiries[0] ?? null
                if (!enquiry && !profile) return null
                const name = enquiry ? `${enquiry.first_name} ${enquiry.last_name}`.trim() : `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim() || 'Student case'
                const notes = assignment.enquiry_id
                  ? notesByEnquiry.get(assignment.enquiry_id) ?? []
                  : studentId ? notesByStudent.get(studentId) ?? [] : []
                const bookings = studentId ? allBookings.filter((item) => item.student_id === studentId) : []
                const services = studentId ? allServices.filter((item) => item.student_id === studentId) : []
                const priorities = Array.isArray(enquiry?.priorities) ? enquiry.priorities.filter((item): item is string => typeof item === 'string').join(' · ') : ''
                const history = relatedEnquiries.filter((item) => item.id !== enquiry?.id)
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
                    <div><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Move-in</dt><dd className="mt-1 text-sm text-[#333333]">{enquiry?.move_in_window ?? 'Not provided'}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Stay length</dt><dd className="mt-1 text-sm text-[#333333]">{enquiry?.stay_duration ?? 'Not provided'}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Budget</dt><dd className="mt-1 text-sm text-[#333333]">{enquiry?.budget_range ?? 'Not provided'}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Accommodation</dt><dd className="mt-1 text-sm text-[#333333]">{enquiry?.accommodation_preference ?? 'Not provided'}</dd></div>
                    {priorities ? <div className="sm:col-span-2"><dt className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Priorities</dt><dd className="mt-1 text-sm text-[#333333]">{priorities}</dd></div> : null}
                  </dl>
                  {enquiry?.message ? <p className="mt-4 whitespace-pre-wrap rounded-xl bg-[#F7F6F3] p-4 text-sm leading-relaxed text-[#4C4A45]">{enquiry.message}</p> : null}
                  {enquiry?.created_at ? <p className="mt-3 text-xs text-[#6B6860]">Enquiry received {formatDate(enquiry.created_at)}</p> : null}
                  {enquiry ? <EnquiryStatusForm enquiryId={enquiry.id} status={enquiry.status} /> : null}
                  {history.length ? <div className="mt-5 border-t border-[#E8E6E1] pt-4"><h3 className="text-sm font-bold text-[#333333]">Student requests and follow-ups</h3><ul className="mt-3 flex flex-col gap-3">{history.map((item) => <li key={item.id} className="rounded-xl bg-[#F7F6F3] p-4"><div className="flex flex-wrap items-center justify-between gap-2"><span className="font-semibold text-[#333333]">{formatStatus(item.enquiry_type)}</span><span className="text-xs font-bold text-[#00319D]">{formatStatus(item.status)}</span></div>{item.message ? <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#4C4A45]">{item.message}</p> : null}<EnquiryStatusForm enquiryId={item.id} status={item.status} /></li>)}</ul></div> : null}
                  {bookings.length ? <div className="mt-5 border-t border-[#E8E6E1] pt-4"><h3 className="text-sm font-bold text-[#333333]">Booking requests</h3><ul className="mt-3 flex flex-col gap-3">{bookings.map((booking) => <li key={booking.id} className="rounded-xl bg-[#F7F6F3] p-4"><p className="font-semibold text-[#333333]">{formatStatus(booking.status)} · {booking.room_slug}</p>{booking.message ? <p className="mt-2 text-sm text-[#4C4A45]">{booking.message}</p> : null}<p className="mt-2 text-xs text-[#6B6860]">Requested {formatDate(booking.created_at)}</p><BookingStatusForm bookingId={booking.id} status={booking.status} /></li>)}</ul></div> : null}
                  {services.length ? <div className="mt-5 border-t border-[#E8E6E1] pt-4"><h3 className="text-sm font-bold text-[#333333]">Service requests</h3><ul className="mt-3 flex flex-col gap-3">{services.map((service) => <li key={service.id} className="rounded-xl bg-[#F7F6F3] p-4"><p className="font-semibold text-[#333333]">{formatStatus(service.service_slug)} · {formatStatus(service.status)}</p>{service.message ? <p className="mt-2 text-sm text-[#4C4A45]">{service.message}</p> : null}<ServiceRequestStatusForm requestId={service.id} status={service.status} /></li>)}</ul></div> : null}
                  {studentId ? <div className="mt-5 border-t border-[#E8E6E1] pt-4"><h3 className="text-sm font-bold text-[#333333]">Room recommendations</h3><RoomRecommendationForm studentId={studentId} rooms={recommendationRooms} /></div> : null}
                  {notes.length ? <div className="mt-5 border-t border-[#E8E6E1] pt-4"><h3 className="text-sm font-bold text-[#333333]">Private notes</h3><ul className="mt-3 flex flex-col gap-3">{notes.map((note) => <li key={note.id} className="rounded-xl bg-[#F7F6F3] p-4"><p className="whitespace-pre-wrap text-sm leading-relaxed text-[#4C4A45]">{note.note}</p><p className="mt-2 text-xs text-[#6B6860]">{formatDate(note.created_at)}</p></li>)}</ul></div> : null}
                  <SalesNoteForm enquiryId={assignment.enquiry_id} studentId={studentId} />
                </article>
              })}
            </div> : <div className="rounded-2xl border border-[#E8E6E1] bg-white p-8 text-center"><h2 className="font-heading text-xl font-extrabold text-[#1A1A1A]">No cases assigned yet</h2><p className="mt-2 text-sm text-[#6B6860]">Claim an open enquiry or student request below to become the primary contact.</p></div>}
          </section>

          <section className="mt-10" aria-label="Unassigned sales intake">
            <div className="mb-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#00319D]">Team queue</p><h2 className="mt-2 font-heading text-2xl font-extrabold text-[#1A1A1A]">Unassigned enquiries and student requests</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B6860]">Assign a case to yourself to become the student’s primary contact. Existing owners and closed enquiries stay out of this queue.</p></div>
            {unassignedEnquiries.length || unassignedStudentIds.length ? <div className="grid gap-4 lg:grid-cols-2">
              {unassignedEnquiries.map((item) => <article key={item.id} className="rounded-2xl border border-[#E8E6E1] bg-white p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">{formatStatus(item.enquiry_type)} · {formatStatus(item.status)}</p><h3 className="mt-2 font-heading text-lg font-extrabold text-[#1A1A1A]">{`${item.first_name} ${item.last_name}`.trim() || 'New enquiry'}</h3><p className="mt-2 text-sm text-[#4C4A45]">{[item.contact_email, item.phone, item.city, item.university].filter(Boolean).join(' · ') || 'Contact details not provided'}</p>{item.message ? <p className="mt-3 whitespace-pre-wrap rounded-xl bg-[#F7F6F3] p-4 text-sm leading-relaxed text-[#4C4A45]">{item.message}</p> : null}<p className="mt-3 text-xs text-[#6B6860]">Received {formatDate(item.created_at)}</p><CaseClaimForm enquiryId={item.id} /></article>)}
              {unassignedStudentIds.map((studentId) => { const profile = profileById.get(studentId); return <article key={studentId} className="rounded-2xl border border-[#E8E6E1] bg-white p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">Student service request</p><h3 className="mt-2 font-heading text-lg font-extrabold text-[#1A1A1A]">{`${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim() || 'Student account'}</h3><p className="mt-2 text-sm text-[#4C4A45]">{[profile?.city, profile?.university].filter(Boolean).join(' · ') || 'Student has a booking or service request pending.'}</p><CaseClaimForm studentId={studentId} /></article>})}
            </div> : <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6 text-sm text-[#6B6860]">No unassigned enquiries or student requests right now.</div>}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
