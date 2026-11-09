import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { signUpAction } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Create an account | HearthAway',
  description: 'Create a private HearthAway account to save rooms and manage your student housing journey.',
}

type SignUpPageProps = {
  searchParams: Promise<{ error?: string }>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/account')
  const { error } = await searchParams

  return (
    <>
      <Navigation />
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#F7F6F3] px-5 py-16 pt-28">
        <section className="w-full max-w-lg rounded-3xl border border-[#E8E6E1] bg-white p-7 shadow-sm sm:p-9" aria-labelledby="sign-up-title">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00319D]">Start planning</p>
          <h1 id="sign-up-title" className="mt-3 font-heading text-3xl font-extrabold text-[#1A1A1A]">Create your account</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">Save room options, track requests and keep your support documents together.</p>
          {error ? <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-800">Check that your details are complete, your password is at least 12 characters, and both password fields match. If you already registered, sign in instead.</p> : null}
          <form action={signUpAction} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
              <span>First name</span>
              <input name="first_name" autoComplete="given-name" required maxLength={80} className="min-h-12 rounded-xl border border-[#D8D5CE] px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
              <span>Last name</span>
              <input name="last_name" autoComplete="family-name" required maxLength={80} className="min-h-12 rounded-xl border border-[#D8D5CE] px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333] sm:col-span-2">
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" required maxLength={254} className="min-h-12 rounded-xl border border-[#D8D5CE] px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333] sm:col-span-2">
              <span>Phone number <span className="font-normal text-[#6B6860]">(optional)</span></span>
              <input name="phone" type="tel" autoComplete="tel" maxLength={40} className="min-h-12 rounded-xl border border-[#D8D5CE] px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
              <span>Password</span>
              <input name="password" type="password" autoComplete="new-password" required minLength={12} className="min-h-12 rounded-xl border border-[#D8D5CE] px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
              <span>Confirm password</span>
              <input name="confirm_password" type="password" autoComplete="new-password" required minLength={12} className="min-h-12 rounded-xl border border-[#D8D5CE] px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
            </label>
            <p className="text-xs leading-relaxed text-[#6B6860] sm:col-span-2">Use at least 12 characters. By creating an account, you agree to our <Link href="/terms" className="font-semibold text-[#00319D] underline">Terms</Link> and <Link href="/privacy" className="font-semibold text-[#00319D] underline">Privacy Policy</Link>.</p>
            <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#00319D] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00277D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2 sm:col-span-2">Create account</button>
          </form>
          <p className="mt-6 text-center text-sm text-[#6B6860]">Already have an account? <Link href="/sign-in" className="font-bold text-[#00319D] underline-offset-4 hover:underline">Sign in</Link></p>
        </section>
      </main>
      <Footer />
    </>
  )
}
