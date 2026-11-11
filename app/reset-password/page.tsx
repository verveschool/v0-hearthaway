import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { updatePasswordAction } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Choose a new password | HearthAway',
  description: 'Choose a new secure password for your HearthAway account.',
}

type ResetPasswordPageProps = {
  searchParams: Promise<{ error?: string }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/forgot-password?sent=1')
  const { error } = await searchParams

  return (
    <>
      <Navigation />
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#F7F6F3] px-5 py-16 pt-28">
        <section className="w-full max-w-md rounded-3xl border border-[#E8E6E1] bg-white p-7 shadow-sm sm:p-9" aria-labelledby="reset-password-title">
          <h1 id="reset-password-title" className="font-heading text-3xl font-extrabold text-[#1A1A1A]">Choose a new password</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">Use at least 12 characters and choose a password you have not used elsewhere.</p>
          {error ? <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error === 'details' ? 'Passwords must be at least 12 characters and match.' : 'We could not update your password. Request a new reset link and try again.'}</p> : null}
          <form action={updatePasswordAction} className="mt-6 flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]"><span>New password</span><input name="password" type="password" autoComplete="new-password" minLength={12} required className="min-h-12 rounded-xl border border-[#D8D5CE] px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" /></label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]"><span>Confirm new password</span><input name="confirm_password" type="password" autoComplete="new-password" minLength={12} required className="min-h-12 rounded-xl border border-[#D8D5CE] px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" /></label>
            <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#00319D] px-5 py-3 text-sm font-bold text-white hover:bg-[#00277D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2">Update password</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
