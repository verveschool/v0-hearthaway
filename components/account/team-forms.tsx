'use client'

import { useActionState } from 'react'
import { addSalesNoteAction, type TeamActionState } from '@/app/team/actions'

const initialState: TeamActionState = { status: 'success', message: '' }

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
