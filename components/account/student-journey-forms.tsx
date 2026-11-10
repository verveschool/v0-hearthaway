'use client'

import { useActionState } from 'react'
import { submitJourneyRequestAction, type JourneyActionState } from '@/app/account/journey-actions'

const initialState: JourneyActionState = { status: 'success', message: '' }
const fieldClassName = 'min-h-11 w-full rounded-xl border border-[#D8D5CE] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]'
const labelClassName = 'flex flex-col gap-2 text-sm font-semibold text-[#333333]'

type JourneyType = 'renewal' | 'referral' | 'testimonial'

function JourneyRequestForm({ type, profileCity }: { type: JourneyType; profileCity: string | null }) {
  const [state, formAction, pending] = useActionState(submitJourneyRequestAction, initialState)

  return <form action={formAction} className="flex flex-col gap-4">
    <input type="hidden" name="journey_type" value={type} />
    {type === 'renewal' ? <>
      <label className={labelClassName}>
        <span>Next destination</span>
        <input className={fieldClassName} name="city" defaultValue={profileCity ?? ''} autoComplete="address-level2" maxLength={120} required />
      </label>
      <label className={labelClassName}>
        <span>Preferred move-in date</span>
        <input className={fieldClassName} type="date" name="move_in_date" required />
      </label>
      <label className={labelClassName}>
        <span>Anything else we should know? <span className="font-normal text-[#6B6860]">(optional)</span></span>
        <textarea className={`${fieldClassName} min-h-24 resize-y`} name="details" rows={3} maxLength={700} />
      </label>
    </> : null}
    {type === 'referral' ? <>
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
    </> : null}
    {type === 'testimonial' ? <>
      <label className={labelClassName}>
        <span>Your feedback</span>
        <textarea className={`${fieldClassName} min-h-32 resize-y`} name="testimonial" rows={5} minLength={20} maxLength={1000} required />
      </label>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-[#4C4A45]">
        <input className="mt-1 h-4 w-4 accent-[#00319D]" type="checkbox" name="publish_consent" />
        <span>HearthAway may share this feedback publicly using my first name. Leave unchecked for private feedback.</span>
      </label>
    </> : null}
    <button type="submit" disabled={pending} className="min-h-11 self-start rounded-xl bg-[#00319D] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#00277D] disabled:cursor-not-allowed disabled:opacity-60">
      {pending ? 'Sending…' : type === 'renewal' ? 'Plan my next move' : type === 'referral' ? 'Send a referral' : 'Share feedback'}
    </button>
    {state.message ? <p role={state.status === 'error' ? 'alert' : 'status'} className={`text-sm ${state.status === 'error' ? 'text-red-700' : 'text-emerald-800'}`}>{state.message}</p> : null}
  </form>
}

export function StudentJourneyForms({ profileCity }: { profileCity: string | null }) {
  return <div className="grid gap-4 lg:grid-cols-3">
    <article className="flex flex-col gap-4 rounded-2xl border border-[#E8E6E1] p-5 sm:p-6">
      <div><h3 className="font-heading text-lg font-extrabold text-[#1A1A1A]">Plan your next move</h3><p className="mt-2 text-sm leading-relaxed text-[#6B6860]">Tell your advisor where and when you are moving next.</p></div>
      <JourneyRequestForm type="renewal" profileCity={profileCity} />
    </article>
    <article className="flex flex-col gap-4 rounded-2xl border border-[#E8E6E1] p-5 sm:p-6">
      <div><h3 className="font-heading text-lg font-extrabold text-[#1A1A1A]">Refer a student</h3><p className="mt-2 text-sm leading-relaxed text-[#6B6860]">Share a referral only when you have permission to pass along their details.</p></div>
      <JourneyRequestForm type="referral" profileCity={profileCity} />
    </article>
    <article className="flex flex-col gap-4 rounded-2xl border border-[#E8E6E1] p-5 sm:p-6">
      <div><h3 className="font-heading text-lg font-extrabold text-[#1A1A1A]">Share your experience</h3><p className="mt-2 text-sm leading-relaxed text-[#6B6860]">Feedback stays private unless you explicitly opt in to public sharing.</p></div>
      <JourneyRequestForm type="testimonial" profileCity={profileCity} />
    </article>
  </div>
}
