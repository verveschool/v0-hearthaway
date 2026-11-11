'use client'

import { useActionState } from 'react'
import { submitJourneyRequestAction, type JourneyActionState } from '@/app/account/journey-actions'

const initialState: JourneyActionState = { status: 'success', message: '' }
const fieldClassName = 'min-h-11 w-full rounded-xl border border-[#D8D5CE] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]'
const labelClassName = 'flex flex-col gap-2 text-sm font-semibold text-[#333333]'

type JourneyType = 'referral'

function JourneyRequestForm() {
  const [state, formAction, pending] = useActionState(submitJourneyRequestAction, initialState)

  return <form action={formAction} className="flex flex-col gap-4">
    <input type="hidden" name="journey_type" value="referral" />
    <label className={labelClassName}>
      <span>Student&apos;s name</span>
      <input className={fieldClassName} name="referral_name" autoComplete="name" maxLength={120} required />
    </label>
    <label className={labelClassName}>
      <span>Student&apos;s email</span>
      <input className={fieldClassName} type="email" name="referral_email" autoComplete="email" maxLength={254} required />
    </label>
    <label className="flex items-start gap-3 text-sm leading-relaxed text-[#4C4A45]">
      <input className="mt-1 h-4 w-4 accent-[#00319D]" type="checkbox" name="permission_to_contact" required />
      <span>I have permission to share these details so HearthAway can contact them.</span>
    </label>
    <button type="submit" disabled={pending} className="min-h-11 self-start rounded-xl bg-[#00319D] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#00277D] disabled:cursor-not-allowed disabled:opacity-60">
      {pending ? 'Sending…' : 'Send a referral'}
    </button>
    {state.message ? <p role={state.status === 'error' ? 'alert' : 'status'} className={`text-sm ${state.status === 'error' ? 'text-red-700' : 'text-emerald-800'}`}>{state.message}</p> : null}
  </form>
}

export function StudentJourneyForms() {
  return <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
    <div className="pt-1">
      <p className="max-w-lg text-2xl font-bold leading-tight tracking-tight text-[#00319D] sm:text-3xl">Earn £50 for Every Successful Referral</p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4C4A45]">Know a student who needs help finding a room? Share their details with permission and our Sales team will take it from there. Existing referral tracking and eligibility rules continue to apply.</p>
      <div className="mt-5 border-t border-[#E8E6E1] pt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[#6B6860]">How it works</p>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#6B6860]">Share a student&apos;s details. We&apos;ll contact them. You&apos;ll receive £50 when the referral is successful under the programme terms.</p>
      </div>
    </div>
    <div className="rounded-xl border border-[#E8E6E1] bg-white p-5 sm:p-6">
      <h3 className="font-heading text-lg font-bold text-[#1A1A1A]">Refer a student</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[#6B6860]">Only share details when you have permission for HearthAway to contact them.</p>
      <div className="mt-4"><JourneyRequestForm /></div>
    </div>
  </div>
}
