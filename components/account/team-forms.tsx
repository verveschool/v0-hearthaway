'use client'

import { useActionState } from 'react'
import { addSalesNoteAction, type TeamActionState } from '@/app/team/actions'
import {
  addRoomRecommendationAction,
  claimSalesCaseAction,
  updateBookingStatusAction,
  updateEnquiryStatusAction,
  updateServiceRequestStatusAction,
  type TeamWorkflowActionState,
} from '@/app/team/workflow-actions'

const initialState: TeamActionState = { status: 'success', message: '' }
const workflowInitialState: TeamWorkflowActionState = { status: 'success', message: '' }
const workflowFieldClassName = 'min-h-10 rounded-xl border border-[#D8D5CE] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]'

function WorkflowFeedback({ state }: { state: TeamWorkflowActionState }) {
  return state.message ? <p role={state.status === 'error' ? 'alert' : 'status'} className={`mt-3 text-sm ${state.status === 'error' ? 'text-red-700' : 'text-emerald-800'}`}>{state.message}</p> : null
}

export function SalesNoteForm({ enquiryId, studentId }: { enquiryId: string | null; studentId: string | null }) {
  const [state, formAction, pending] = useActionState(addSalesNoteAction, initialState)
  return <form action={formAction} className="mt-4 border-t border-[#E8E6E1] pt-4">
    <input type="hidden" name="enquiry_id" value={enquiryId ?? ''} />
    <input type="hidden" name="student_id" value={studentId ?? ''} />
    <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
      <span>Add a private case note</span>
      <textarea name="note" required maxLength={2000} rows={3} className="rounded-xl border border-[#D8D5CE] bg-white p-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
    </label>
    <button type="submit" disabled={pending} className="mt-3 min-h-10 rounded-xl bg-[#00319D] px-4 py-2 text-sm font-bold text-white hover:bg-[#00277D] disabled:opacity-60">{pending ? 'Saving…' : 'Save note'}</button>
    {state.message ? <p role={state.status === 'error' ? 'alert' : 'status'} className={`mt-3 text-sm ${state.status === 'error' ? 'text-red-700' : 'text-emerald-800'}`}>{state.message}</p> : null}
  </form>
}

export function CaseClaimForm({ enquiryId, studentId }: { enquiryId?: string | null; studentId?: string | null }) {
  const [state, formAction, pending] = useActionState(claimSalesCaseAction, workflowInitialState)
  return <form action={formAction} className="mt-4 border-t border-[#E8E6E1] pt-4">
    {enquiryId ? <input type="hidden" name="enquiry_id" value={enquiryId} /> : null}
    {!enquiryId && studentId ? <input type="hidden" name="student_id" value={studentId} /> : null}
    <button type="submit" disabled={pending} className="min-h-10 rounded-xl bg-[#00319D] px-4 py-2 text-sm font-bold text-white hover:bg-[#00277D] disabled:opacity-60">{pending ? 'Assigning…' : 'Assign to me'}</button>
    <WorkflowFeedback state={state} />
  </form>
}

export function EnquiryStatusForm({ enquiryId, status }: { enquiryId: string; status: string }) {
  const [state, formAction, pending] = useActionState(updateEnquiryStatusAction, workflowInitialState)
  return <form action={formAction} className="mt-4 flex flex-wrap items-end gap-3 border-t border-[#E8E6E1] pt-4">
    <input type="hidden" name="enquiry_id" value={enquiryId} />
    <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wide text-[#6B6860]">Enquiry status
      <select name="status" defaultValue={status} className={workflowFieldClassName}>
        <option value="new">New</option><option value="qualified">Qualified</option><option value="follow_up">Follow-up</option><option value="closed">Closed</option>
      </select>
    </label>
    <button type="submit" disabled={pending} className="min-h-10 rounded-xl border border-[#00319D] px-4 py-2 text-sm font-bold text-[#00319D] hover:bg-[#00319D]/5 disabled:opacity-60">{pending ? 'Saving…' : 'Update status'}</button>
    <WorkflowFeedback state={state} />
  </form>
}

export function BookingStatusForm({ bookingId, status }: { bookingId: string; status: string }) {
  const [state, formAction, pending] = useActionState(updateBookingStatusAction, workflowInitialState)
  return <form action={formAction} className="mt-4 flex flex-wrap items-end gap-3 border-t border-[#E8E6E1] pt-4">
    <input type="hidden" name="booking_id" value={bookingId} />
    <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wide text-[#6B6860]">Booking status
      <select name="status" defaultValue={status} className={workflowFieldClassName}>
        <option value="requested">Requested</option><option value="in_review">In review</option><option value="offer_made">Offer made</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option>
      </select>
    </label>
    <button type="submit" disabled={pending} className="min-h-10 rounded-xl border border-[#00319D] px-4 py-2 text-sm font-bold text-[#00319D] hover:bg-[#00319D]/5 disabled:opacity-60">{pending ? 'Saving…' : 'Update booking'}</button>
    <WorkflowFeedback state={state} />
  </form>
}

export function ServiceRequestStatusForm({ requestId, status }: { requestId: string; status: string }) {
  const [state, formAction, pending] = useActionState(updateServiceRequestStatusAction, workflowInitialState)
  return <form action={formAction} className="mt-4 flex flex-wrap items-end gap-3 border-t border-[#E8E6E1] pt-4">
    <input type="hidden" name="request_id" value={requestId} />
    <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wide text-[#6B6860]">Service status
      <select name="status" defaultValue={status} className={workflowFieldClassName}>
        <option value="requested">Requested</option><option value="in_review">In review</option><option value="referred">Referred</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
      </select>
    </label>
    <button type="submit" disabled={pending} className="min-h-10 rounded-xl border border-[#00319D] px-4 py-2 text-sm font-bold text-[#00319D] hover:bg-[#00319D]/5 disabled:opacity-60">{pending ? 'Saving…' : 'Update service'}</button>
    <WorkflowFeedback state={state} />
  </form>
}

export function RoomRecommendationForm({ studentId, rooms }: { studentId: string; rooms: Array<{ slug: string; name: string; city: string }> }) {
  const [state, formAction, pending] = useActionState(addRoomRecommendationAction, workflowInitialState)
  return <form action={formAction} className="mt-4 border-t border-[#E8E6E1] pt-4">
    <input type="hidden" name="student_id" value={studentId} />
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
      <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">Recommended room
        <select name="room_slug" required defaultValue="" className={workflowFieldClassName}><option value="" disabled>Select a room</option>{rooms.map((room) => <option key={room.slug} value={room.slug}>{room.name} · {room.city}</option>)}</select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">Note <span className="text-xs font-normal text-[#6B6860]">Optional</span>
        <input name="note" maxLength={500} className={workflowFieldClassName} />
      </label>
      <button type="submit" disabled={pending || !rooms.length} className="min-h-10 rounded-xl bg-[#00319D] px-4 py-2 text-sm font-bold text-white hover:bg-[#00277D] disabled:opacity-60">{pending ? 'Adding…' : 'Recommend room'}</button>
    </div>
    {!rooms.length ? <p className="mt-3 text-sm text-[#6B6860]">There are no available rooms to recommend right now.</p> : null}
    <WorkflowFeedback state={state} />
  </form>
}
