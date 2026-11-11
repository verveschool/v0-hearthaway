import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import {
  AddRoomToShortlistForm,
  CreateShortlistForm,
  DeleteShortlistButton,
  RemoveSavedRoomButton,
  RemoveShortlistItemButton,
  RequestServiceForm,
  SaveProfileForm,
  SignOutButton,
  StudentDocumentUploadForm,
  type ProfileFormValues,
} from '@/components/account/forms'
import { createClient } from '@/lib/supabase/server'
import { StudentJourneyForms } from '@/components/account/student-journey-forms'
import { accommodationRoomListings, getAccommodationRoomBySlug } from '@/app/accommodation/listing-data'

export const metadata: Metadata = {
  title: 'My HearthAway Account',
  description: 'Manage your student profile, saved rooms, booking requests, services and documents.',
}

type AccountPageProps = {
  searchParams: Promise<{ profile?: string }>
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(value))
}

function formatStatus(value: string) {
  return value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatEnquiryTitle(type: string, message: string | null) {
  if (type !== 'service' || !message) return formatStatus(type)
  const marker = message.split('\n')[0]
  if (marker === '[Renewal planning request]') return 'Renewal planning'
  if (marker === '[Student referral]') return 'Student referral'
  if (marker === '[Student feedback]') return 'Student feedback'
  return formatStatus(type)
}

function readOptionalString(value: unknown, key: string): string | null {
  if (typeof value !== 'object' || value === null) return null
  const field = Reflect.get(value, key)
  return typeof field === 'string' ? field : null
}

function formatPayment(amountMinor: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(amountMinor / 100)
  } catch {
    return `${currency} ${new Intl.NumberFormat('en-GB').format(amountMinor / 100)}`
  }
}

function SectionHeading({ title, detail }: { title: string; detail?: string }) {
  return <div className="mb-6">
    <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">{title}</h2>
    {detail ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B6860]">{detail}</p> : null}
  </div>
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in?next=%2Faccount')

  await supabase.rpc('link_my_unclaimed_enquiries')

  const [profileResult, savedResult, shortlistResult, shortlistItemsResult, enquiryResult, bookingResult, paymentResult, serviceCatalogResult, serviceRequestResult, recommendationResult, documentResult, advisorResult, teamMemberResult] = await Promise.all([
    supabase.from('profiles').select('first_name,last_name,phone,country,city,university,study_level,move_in_window,budget_range,accommodation_preference').eq('id', user.id).maybeSingle(),
    supabase.from('saved_rooms').select('room_slug,created_at').eq('student_id', user.id).order('created_at', { ascending: false }),
    supabase.from('shortlists').select('id,name,created_at').eq('student_id', user.id).order('created_at', { ascending: false }),
    supabase.from('shortlist_items').select('shortlist_id,room_slug,created_at').order('created_at', { ascending: false }),
    supabase.from('enquiries').select('id,enquiry_type,room_slug,status,city,university,message,created_at').eq('student_id', user.id).order('created_at', { ascending: false }),
    supabase.from('booking_requests').select('id,room_slug,status,message,created_at,updated_at').eq('student_id', user.id).order('created_at', { ascending: false }),
    supabase.from('payment_records').select('id,booking_request_id,amount_minor,currency,status,provider,created_at').eq('student_id', user.id).order('created_at', { ascending: false }),
    supabase.from('service_catalog').select('slug,name,description').eq('active', true).order('sort_order', { ascending: true }),
    supabase.from('service_requests').select('id,service_slug,status,message,created_at,updated_at').eq('student_id', user.id).order('created_at', { ascending: false }),
    supabase.from('room_recommendations').select('id,room_slug,note,created_at').eq('student_id', user.id).order('created_at', { ascending: false }),
    supabase.from('student_documents').select('id,file_name,object_path,content_type,byte_size,created_at').eq('student_id', user.id).order('created_at', { ascending: false }),
    supabase.rpc('get_my_sales_owner'),
    supabase.from('sales_team_members').select('role').eq('user_id', user.id).eq('active', true).maybeSingle(),
  ])

  const [search] = await Promise.all([searchParams])
  const profileData: unknown = profileResult.data
  const profile: ProfileFormValues = {
    first_name: readOptionalString(profileData, 'first_name') ?? user.user_metadata?.first_name ?? null,
    last_name: readOptionalString(profileData, 'last_name') ?? user.user_metadata?.last_name ?? null,
    phone: readOptionalString(profileData, 'phone') ?? user.user_metadata?.phone ?? null,
    country: readOptionalString(profileData, 'country'),
    city: readOptionalString(profileData, 'city'),
    university: readOptionalString(profileData, 'university'),
    study_level: readOptionalString(profileData, 'study_level'),
    move_in_window: readOptionalString(profileData, 'move_in_window'),
    budget_range: readOptionalString(profileData, 'budget_range'),
    accommodation_preference: readOptionalString(profileData, 'accommodation_preference'),
  }
  const savedRooms = (savedResult.data ?? []).map((saved) => ({ ...saved, room: getAccommodationRoomBySlug(saved.room_slug) })).filter((item) => item.room)
  const shortlists = shortlistResult.data ?? []
  const shortlistItems = shortlistItemsResult.data ?? []
  const enquiries = enquiryResult.data ?? []
  const bookings = bookingResult.data ?? []
  const payments = paymentResult.data ?? []
  const serviceCatalog = serviceCatalogResult.data ?? []
  const serviceRequests = serviceRequestResult.data ?? []
  const recommendations = (recommendationResult.data ?? []).map((item) => ({ ...item, room: getAccommodationRoomBySlug(item.room_slug) })).filter((item) => item.room)
  const documentRows = documentResult.data ?? []
  const documents = await Promise.all(documentRows.map(async (document) => {
    const { data } = await supabase.storage.from('student-documents').createSignedUrl(document.object_path, 300)
    return { ...document, signedUrl: data?.signedUrl ?? null }
  }))
  const advisor = advisorResult.data?.[0] ?? null
  const roomBySlug = new Map(accommodationRoomListings.map((room) => [room.slug, room]))
  const serviceNames = new Map(serviceCatalog.map((service) => [service.slug, service.name]))
  const itemsByShortlist = new Map<string, typeof shortlistItems>()
  for (const item of shortlistItems) {
    const list = itemsByShortlist.get(item.shortlist_id) ?? []
    list.push(item)
    itemsByShortlist.set(item.shortlist_id, list)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F6F3] pb-16 pt-20 sm:pt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <header className="flex flex-col gap-4 rounded-2xl bg-[#00319D] px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
            <div className="min-w-0">
              <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">My HearthAway Account</h1>
              <p className="mt-1.5 truncate text-sm text-white/75">{user.email}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {teamMemberResult.data ? <Link href="/team" className="inline-flex min-h-10 items-center rounded-lg border border-white/35 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10">Team inbox</Link> : null}
              <SignOutButton />
            </div>
          </header>

          {search.profile === 'updated' ? <p role="status" className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">Profile updated.</p> : null}

          <nav aria-label="Account sections" className="mt-5 flex gap-2 overflow-x-auto pb-2 text-sm font-semibold">
            {[
              ['profile', 'Profile'], ['saved', 'Saved rooms'], ['shortlists', 'Shortlists'],
              ['bookings', 'Bookings'], ['services', 'Services'], ['referrals', 'Refer and earn'], ['support', 'Your support'],
            ].map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-[#D8D5CE] bg-white px-4 py-2 text-[#00319D] hover:border-[#00319D]">{label}</a>)}
          </nav>

          <section id="profile" className="mt-8 scroll-mt-28 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
            <SectionHeading title="Student profile" detail="Keep your preferences current so your advisor can focus on relevant homes and support." />
            <SaveProfileForm profile={profile} />
          </section>

          {recommendations.length > 0 ? <section className="mt-8 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
            <SectionHeading title="Advisor room recommendations" />
            <div className="grid gap-3 sm:grid-cols-2">
              {recommendations.map(({ id, room_slug, note, room, created_at }) => <article key={id} className="rounded-xl bg-[#F7F6F3] p-4">
                <Link href={`/accommodation/rooms/${room_slug}`} className="font-bold text-[#00319D] underline-offset-4 hover:underline">{room?.room.name} at {room?.property.name}</Link>
                <p className="mt-2 text-sm leading-relaxed text-[#4C4A45]">{note}</p>
                <p className="mt-2 text-xs text-[#6B6860]">Recommended {formatDate(created_at)}</p>
              </article>)}
            </div>
          </section> : null}

          <section id="saved" className="mt-8 scroll-mt-28 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
            <SectionHeading title="Saved rooms" detail="Save rooms from the inventory and return to them whenever you need." />
            {savedRooms.length ? <div className="grid gap-4 md:grid-cols-2">
              {savedRooms.map(({ room_slug, created_at, room }) => <article key={room_slug} className="flex gap-4 rounded-xl border border-[#E8E6E1] p-4">
                {room?.room.image ? <img src={room.room.image} alt={`${room.room.name} at ${room.property.name}`} className="size-24 shrink-0 rounded-lg object-cover" loading="lazy" decoding="async" /> : <div aria-hidden="true" className="size-24 shrink-0 rounded-lg bg-[#F1F0EC]" />}
                <div className="min-w-0 flex-1">
                  <Link href={`/accommodation/rooms/${room_slug}`} className="font-bold text-[#00319D] underline-offset-4 hover:underline">{room?.room.name} at {room?.property.name}</Link>
                  <p className="mt-1 text-sm text-[#6B6860]">{room?.property.city} · Saved {formatDate(created_at)}</p>
                  <div className="mt-3"><RemoveSavedRoomButton roomSlug={room_slug} /></div>
                </div>
              </article>)}
            </div> : <p className="rounded-xl bg-[#F7F6F3] p-4 text-sm text-[#6B6860]">No saved rooms yet. <Link href="/accommodation/rooms" className="font-bold text-[#00319D] underline-offset-4 hover:underline">Browse the room inventory</Link>.</p>}
          </section>

          <section id="shortlists" className="mt-8 scroll-mt-28 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
            <SectionHeading title="Your shortlists" detail="Create named groups and add saved rooms to compare your favourites." />
            <CreateShortlistForm />
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {shortlists.map((shortlist) => {
                const items = (itemsByShortlist.get(shortlist.id) ?? []).filter((item) => roomBySlug.has(item.room_slug))
                return <article key={shortlist.id} className="rounded-xl border border-[#E8E6E1] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div><h3 className="font-heading text-lg font-extrabold text-[#1A1A1A]">{shortlist.name}</h3><p className="mt-1 text-xs text-[#6B6860]">Created {formatDate(shortlist.created_at)}</p></div>
                    <DeleteShortlistButton shortlistId={shortlist.id} />
                  </div>
                  {items.length ? <ul className="mt-4 divide-y divide-[#E8E6E1]">
                    {items.map((item) => {
                      const room = roomBySlug.get(item.room_slug)
                      return <li key={item.room_slug} className="flex items-center justify-between gap-3 py-3">
                        <Link href={`/accommodation/rooms/${item.room_slug}`} className="text-sm font-semibold text-[#00319D] underline-offset-4 hover:underline">{room?.room.name} · {room?.property.name}</Link>
                        <RemoveShortlistItemButton shortlistId={shortlist.id} roomSlug={item.room_slug} />
                      </li>
                    })}
                  </ul> : <p className="mt-4 text-sm text-[#6B6860]">No rooms in this shortlist yet. Add a room from your saved list below.</p>}
                </article>
              })}
            </div>
            {shortlists.length && savedRooms.length ? <div className="mt-6">
              <h3 className="font-semibold text-[#1A1A1A]">Add a saved room to a shortlist</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {savedRooms.map(({ room_slug, room }) => <div key={room_slug} className="rounded-xl bg-[#F7F6F3] p-4">
                  <p className="mb-3 text-sm font-semibold text-[#333333]">{room?.room.name} · {room?.property.name}</p>
                  <AddRoomToShortlistForm roomSlug={room_slug} shortlists={shortlists} />
                </div>)}
              </div>
            </div> : null}
            {!shortlists.length ? <p className="mt-5 text-sm text-[#6B6860]">Create your first shortlist to organize rooms by city, budget or move-in date.</p> : null}
          </section>

          <section id="bookings" className="mt-8 scroll-mt-28 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
            <SectionHeading title="Booking and payment history" detail="Requests and payment records appear here as your advisor updates your case." />
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="font-semibold text-[#1A1A1A]">Booking requests</h3>
                {bookings.length ? <ul className="mt-3 flex flex-col gap-3">
                  {bookings.map((booking) => {
                    const room = roomBySlug.get(booking.room_slug)
                    return <li key={booking.id} className="rounded-xl bg-[#F7F6F3] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2"><Link href={`/accommodation/rooms/${booking.room_slug}`} className="font-bold text-[#00319D] underline-offset-4 hover:underline">{room?.room.name ?? booking.room_slug}</Link><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#00319D]">{formatStatus(booking.status)}</span></div>
                      <p className="mt-2 text-xs text-[#6B6860]">Requested {formatDate(booking.created_at)}</p>
                      {booking.message ? <p className="mt-2 text-sm text-[#4C4A45]">{booking.message}</p> : null}
                    </li>
                  })}
                </ul> : <p className="mt-3 text-sm text-[#6B6860]">You have not requested a booking yet.</p>}
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A]">Payments</h3>
                {payments.length ? <ul className="mt-3 flex flex-col gap-3">
                  {payments.map((payment) => <li key={payment.id} className="flex items-center justify-between gap-4 rounded-xl bg-[#F7F6F3] p-4"><div><p className="font-bold text-[#1A1A1A]">{formatPayment(Number(payment.amount_minor), payment.currency)}</p><p className="mt-1 text-xs text-[#6B6860]">{payment.provider} · {formatDate(payment.created_at)}</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#00319D]">{formatStatus(payment.status)}</span></li>)}
                </ul> : <p className="mt-3 text-sm text-[#6B6860]">No payment records have been added to your account.</p>}
              </div>
            </div>
            {enquiries.length ? <div className="mt-6 border-t border-[#E8E6E1] pt-5">
              <h3 className="font-semibold text-[#1A1A1A]">Enquiry history</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {enquiries.map((enquiry) => <li key={enquiry.id} className="rounded-xl bg-[#F7F6F3] p-4"><div className="flex items-center justify-between gap-3"><span className="font-semibold text-[#333333]">{formatEnquiryTitle(enquiry.enquiry_type, enquiry.message)}</span><span className="text-xs text-[#6B6860]">{formatStatus(enquiry.status)}</span></div><p className="mt-2 text-sm text-[#6B6860]">{[enquiry.city, enquiry.university].filter(Boolean).join(' · ') || 'HearthAway enquiry'} · {formatDate(enquiry.created_at)}</p>{enquiry.message ? <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#4C4A45]">{enquiry.message.slice(0, 320)}{enquiry.message.length > 320 ? '…' : ''}</p> : null}</li>)}
              </ul>
            </div> : null}
          </section>

          <section id="services" className="mt-8 scroll-mt-28 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
            <SectionHeading title="Services" detail="Send a request to the HearthAway team. They will confirm availability, timing and any applicable fees." />
            {serviceCatalog.length ? <div className="grid gap-4 lg:grid-cols-2">
              {serviceCatalog.map((service) => <article key={service.slug} className="rounded-xl border border-[#E8E6E1] p-5">
                <h3 className="font-heading text-lg font-extrabold text-[#1A1A1A]">{service.name}</h3>
                {service.description ? <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">{service.description}</p> : null}
                <RequestServiceForm serviceSlug={service.slug} />
              </article>)}
            </div> : <p className="rounded-xl bg-[#F7F6F3] p-4 text-sm text-[#6B6860]">Service options will appear here when they are available.</p>}
            {serviceRequests.length ? <div className="mt-6 border-t border-[#E8E6E1] pt-5">
              <h3 className="font-semibold text-[#1A1A1A]">Your service requests</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">{serviceRequests.map((request) => <li key={request.id} className="rounded-xl bg-[#F7F6F3] p-4"><div className="flex items-center justify-between gap-3"><span className="font-semibold text-[#333333]">{serviceNames.get(request.service_slug) ?? request.service_slug}</span><span className="text-xs font-bold text-[#00319D]">{formatStatus(request.status)}</span></div><p className="mt-2 text-xs text-[#6B6860]">Requested {formatDate(request.created_at)}</p>{request.message ? <p className="mt-2 text-sm text-[#4C4A45]">{request.message}</p> : null}</li>)}</ul>
            </div> : null}
          </section>

          <section id="referrals" className="mt-8 scroll-mt-28 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
            <SectionHeading title="Refer and earn" detail="Share HearthAway with a student who is planning their move." />
            <StudentJourneyForms />
          </section>

          <section id="support" className="mt-7 scroll-mt-28 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-7">
            <SectionHeading title="Your support" detail="Your advisor and your documents, together in one place." />
            <div className="grid gap-5 lg:grid-cols-2">
              <article id="advisor" className="scroll-mt-28 rounded-xl border border-[#E8E6E1] p-5">
                <div className="mb-4">
                  <h3 className="font-heading text-lg font-bold text-[#1A1A1A]">Your HearthAway advisor</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6B6860]">Your assigned advisor is your contact for room search and booking questions.</p>
                </div>
                {advisor ? <div className="flex flex-col gap-3 rounded-lg bg-[#F7F6F3] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div><p className="font-semibold text-[#1A1A1A]">{advisor.display_name}</p><p className="mt-1 text-sm text-[#6B6860]">{formatStatus(advisor.role)}</p></div>
                  {advisor.phone ? <a href={`tel:${advisor.phone}`} className="inline-flex min-h-9 items-center justify-center self-start rounded-lg bg-[#00319D] px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#00277D]">Call advisor</a> : <p className="text-sm text-[#6B6860]">Your advisor will contact you through your enquiry.</p>}
                </div> : <p className="rounded-lg bg-[#F7F6F3] p-4 text-sm leading-relaxed text-[#6B6860]">Your advisor will appear here once your enquiry has been assigned.</p>}
              </article>

              <article id="documents" className="scroll-mt-28 rounded-xl border border-[#E8E6E1] p-5">
                <div className="mb-4">
                  <h3 className="font-heading text-lg font-bold text-[#1A1A1A]">Your documents</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6B6860]">Upload documents requested by your advisor. Files remain private to your account and support team.</p>
                </div>
                <StudentDocumentUploadForm />
                {documents.length ? <ul className="mt-5 divide-y divide-[#E8E6E1] border-t border-[#E8E6E1]">
                  {documents.map((document) => <li key={document.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div className="min-w-0"><p className="break-all text-sm font-semibold text-[#333333]">{document.file_name}</p><p className="mt-1 text-xs text-[#6B6860]">{(document.byte_size / 1024 / 1024).toFixed(2)} MB · Uploaded {formatDate(document.created_at)}</p></div>
                    {document.signedUrl ? <a href={document.signedUrl} target="_blank" rel="noreferrer" className="shrink-0 text-sm font-semibold text-[#00319D] underline-offset-4 hover:underline">Open securely</a> : <span className="text-xs text-[#6B6860]">Link unavailable</span>}
                  </li>)}
                </ul> : <p className="mt-4 text-sm text-[#6B6860]">No documents uploaded yet.</p>}
              </article>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
