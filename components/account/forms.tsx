'use client'

import { useActionState, type ReactNode } from 'react'
import Link from 'next/link'
import {
  addRoomToShortlistAction,
  createShortlistAction,
  deleteShortlistAction,
  removeSavedRoomAction,
  removeShortlistItemAction,
  requestRoomBookingAction,
  requestServiceAction,
  saveProfileAction,
  saveRoomAction,
  uploadStudentDocumentAction,
} from '@/app/account/actions'
import { signOutAction } from '@/app/auth/actions'

export type ProfileFormValues = {
  first_name: string | null
  last_name: string | null
  phone: string | null
  country: string | null
  city: string | null
  university: string | null
  study_level: string | null
  move_in_window: string | null
  budget_range: string | null
  accommodation_preference: string | null
}

type ActionState = { status: 'success' | 'error'; message: string }
const initialState: ActionState = { status: 'success', message: '' }

function Feedback({ state }: { state: ActionState }) {
  if (!state.message) return null
  return <p role={state.status === 'error' ? 'alert' : 'status'} className={`mt-3 text-sm ${state.status === 'error' ? 'text-red-700' : 'text-emerald-800'}`}>{state.message}</p>
}

function SubmitButton({ children, pending, className = '' }: { children: ReactNode; pending: boolean; className?: string }) {
  return <button type="submit" disabled={pending} className={`inline-flex min-h-10 items-center justify-center rounded-xl bg-[#00319D] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#00277D] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2 ${className}`}>{pending ? 'Saving…' : children}</button>
}

export function SaveProfileForm({ profile }: { profile: ProfileFormValues }) {
  const [state, formAction, pending] = useActionState(saveProfileAction, initialState)
  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      {[
        ['first_name', 'First name', profile.first_name ?? '', true],
        ['last_name', 'Last name', profile.last_name ?? '', true],
        ['phone', 'Phone', profile.phone ?? '', false],
        ['country', 'Country', profile.country ?? '', false],
        ['city', 'City', profile.city ?? '', false],
        ['university', 'University', profile.university ?? '', false],
        ['study_level', 'Study level', profile.study_level ?? '', false],
        ['move_in_window', 'Move-in window', profile.move_in_window ?? '', false],
        ['budget_range', 'Budget range', profile.budget_range ?? '', false],
        ['accommodation_preference', 'Room preference', profile.accommodation_preference ?? '', false],
      ].map(([name, label, value, required]) => (
        <label key={String(name)} className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
          <span>{label}</span>
          <input name={String(name)} defaultValue={String(value)} required={Boolean(required)} maxLength={160} className="min-h-11 rounded-xl border border-[#D8D5CE] bg-white px-3 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
        </label>
      ))}
      <div className="sm:col-span-2">
        <SubmitButton pending={pending}>Save profile</SubmitButton>
        <Feedback state={state} />
      </div>
    </form>
  )
}

export function SaveRoomButton({ roomSlug, isAuthenticated }: { roomSlug: string; isAuthenticated: boolean }) {
  const [state, formAction, pending] = useActionState(saveRoomAction, initialState)
  if (!isAuthenticated) return <Link href={`/sign-in?next=${encodeURIComponent(`/accommodation/rooms/${roomSlug}`)}`} className="inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-[#00319D] px-4 py-2 text-sm font-bold text-[#00319D] hover:bg-[#F7F6F3]">Sign in to save this room</Link>
  return <form action={formAction}>
    <input type="hidden" name="room_slug" value={roomSlug} />
    <SubmitButton pending={pending} className="w-full">Save room</SubmitButton>
    <Feedback state={state} />
  </form>
}

export function RemoveSavedRoomButton({ roomSlug }: { roomSlug: string }) {
  const [state, formAction, pending] = useActionState(removeSavedRoomAction, initialState)
  return <form action={formAction}>
    <input type="hidden" name="room_slug" value={roomSlug} />
    <button type="submit" disabled={pending} className="text-sm font-semibold text-[#6B6860] underline-offset-4 hover:text-red-700 hover:underline disabled:opacity-60">{pending ? 'Removing…' : 'Remove saved room'}</button>
    <Feedback state={state} />
  </form>
}

export function CreateShortlistForm() {
  const [state, formAction, pending] = useActionState(createShortlistAction, initialState)
  return <form action={formAction} className="flex flex-col gap-3 sm:flex-row">
    <label className="sr-only" htmlFor="new-shortlist-name">Shortlist name</label>
    <input id="new-shortlist-name" name="name" required maxLength={80} placeholder="e.g. Near campus" className="min-h-11 flex-1 rounded-xl border border-[#D8D5CE] bg-white px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
    <SubmitButton pending={pending}>Create shortlist</SubmitButton>
    <Feedback state={state} />
  </form>
}

export function AddRoomToShortlistForm({ roomSlug, shortlists }: { roomSlug: string; shortlists: Array<{ id: string; name: string }> }) {
  const [state, formAction, pending] = useActionState(addRoomToShortlistAction, initialState)
  if (!shortlists.length) return null
  return <form action={formAction} className="flex items-center gap-2">
    <input type="hidden" name="room_slug" value={roomSlug} />
    <label className="sr-only" htmlFor={`shortlist-${roomSlug}`}>Add room to shortlist</label>
    <select id={`shortlist-${roomSlug}`} name="shortlist_id" required defaultValue="" className="min-h-10 min-w-0 flex-1 rounded-lg border border-[#D8D5CE] bg-white px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]">
      <option value="" disabled>Choose a shortlist</option>
      {shortlists.map((shortlist) => <option key={shortlist.id} value={shortlist.id}>{shortlist.name}</option>)}
    </select>
    <button type="submit" disabled={pending} className="min-h-10 rounded-lg border border-[#00319D] px-3 text-xs font-bold text-[#00319D] hover:bg-[#00319D] hover:text-white disabled:opacity-60">{pending ? 'Adding…' : 'Add'}</button>
    <Feedback state={state} />
  </form>
}

export function RemoveShortlistItemButton({ shortlistId, roomSlug }: { shortlistId: string; roomSlug: string }) {
  const [state, formAction, pending] = useActionState(removeShortlistItemAction, initialState)
  return <form action={formAction}>
    <input type="hidden" name="shortlist_id" value={shortlistId} />
    <input type="hidden" name="room_slug" value={roomSlug} />
    <button type="submit" disabled={pending} className="text-xs font-semibold text-[#6B6860] underline-offset-4 hover:text-red-700 hover:underline disabled:opacity-60">{pending ? 'Removing…' : 'Remove'}</button>
    <Feedback state={state} />
  </form>
}

export function DeleteShortlistButton({ shortlistId }: { shortlistId: string }) {
  const [state, formAction, pending] = useActionState(deleteShortlistAction, initialState)
  return <form action={formAction}>
    <input type="hidden" name="shortlist_id" value={shortlistId} />
    <button type="submit" disabled={pending} className="text-sm font-semibold text-red-700 underline-offset-4 hover:underline disabled:opacity-60">{pending ? 'Deleting…' : 'Delete shortlist'}</button>
    <Feedback state={state} />
  </form>
}

export function RequestRoomBookingForm({ roomSlug, isAuthenticated }: { roomSlug: string; isAuthenticated: boolean }) {
  const [state, formAction, pending] = useActionState(requestRoomBookingAction, initialState)
  if (!isAuthenticated) return <Link href={`/sign-in?next=${encodeURIComponent(`/accommodation/rooms/${roomSlug}`)}`} className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#00319D] px-4 py-3 text-sm font-bold text-white hover:bg-[#00277D]">Sign in to request a booking</Link>
  return <form action={formAction} className="flex flex-col gap-3">
    <input type="hidden" name="room_slug" value={roomSlug} />
    <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
      <span>Anything your advisor should know? <span className="font-normal text-[#6B6860]">(optional)</span></span>
      <textarea name="message" maxLength={1200} rows={3} className="rounded-xl border border-[#D8D5CE] bg-white p-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
    </label>
    <SubmitButton pending={pending}>Request booking</SubmitButton>
    <Feedback state={state} />
  </form>
}

export function RequestServiceForm({ serviceSlug }: { serviceSlug: string }) {
  const [state, formAction, pending] = useActionState(requestServiceAction, initialState)
  return <form action={formAction} className="mt-4 flex flex-col gap-3">
    <input type="hidden" name="service_slug" value={serviceSlug} />
    <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
      <span>Request details <span className="font-normal text-[#6B6860]">(optional)</span></span>
      <textarea name="message" maxLength={1200} rows={2} className="rounded-xl border border-[#D8D5CE] bg-white p-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
    </label>
    <SubmitButton pending={pending}>Request service</SubmitButton>
    <Feedback state={state} />
  </form>
}

export function StudentDocumentUploadForm() {
  const [state, formAction, pending] = useActionState(uploadStudentDocumentAction, initialState)
  return <form action={formAction} className="flex flex-col gap-4">
    <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
      <span>Choose a document</span>
      <input name="document" type="file" accept="application/pdf,image/jpeg,image/png,image/webp" required className="block w-full text-sm text-[#4C4A45] file:mr-4 file:min-h-10 file:rounded-lg file:border-0 file:bg-[#F7F6F3] file:px-4 file:font-semibold file:text-[#00319D]" />
    </label>
    <p className="text-xs leading-relaxed text-[#6B6860]">PDF, JPG, PNG or WebP, up to 10 MB. Documents are private to your account and your assigned support team.</p>
    <SubmitButton pending={pending}>Upload securely</SubmitButton>
    <Feedback state={state} />
  </form>
}

export function SignOutButton() {
  return <form action={signOutAction}><button type="submit" className="rounded-xl border border-[#D8D5CE] px-4 py-2 text-sm font-bold text-[#00319D] hover:bg-[#F7F6F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]">Sign out</button></form>
}
