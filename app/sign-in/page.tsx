import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { signInAction } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Sign in | HearthAway',
  description: 'Sign in to manage your HearthAway student profile and accommodation journey.',
}

type SignInPageProps = {
  searchParams: Promise<{ error?: string; message?: string; next?: string }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/account')
  const { error, message, next } = await searchParams
  const safeNext = next?.startsWith('/') && !next.startsWith('//') && !next.includes('\\') ? next : '/account'

  return (
    <>
      <Navigation />
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#F7F6F3] px-5 py-16 pt-28">
        <section className="w-full max-w-md rounded-3xl border border-[#E8E6E1] bg-white p-7 shadow-sm sm:p-9" aria-labelledby="sign-in-title">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00319D]">Your HearthAway account</p>
          <h1 id="sign-in-title" className="mt-3 font-heading text-3xl font-extrabold text-[#1A1A1A]">Welcome back</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">Sign in to manage saved rooms, requests and your support documents.</p>
          {message === 'check-email' ? <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">Check your email to confirm your account, then sign in.</p> : null}
          {message === 'signed-out' ? <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">You have signed out.</p> : null}
          {message === 'password-updated' ? <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">Your password has been updated. Sign in with your new password.</p> : null}
          {error ? <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error === 'details' ? 'Enter your email and password.' : 'We could not sign you in with those details.'}</p> : null}
          <form action={signInAction} className="mt-6 flex flex-col gap-5">
            <input type="hidden" name="next" value={safeNext} />
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" required maxLength={254} className="min-h-12 rounded-xl border border-[#D8D5CE] bg-white px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]">
              <span>Password</span>
              <input name="password" type="password" autoComplete="current-password" required className="min-h-12 rounded-xl border border-[#D8D5CE] bg-white px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" />
            </label>
            <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#00319D] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00277D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2">Sign in</button>
          </form>
          <div className="mt-5 flex flex-col gap-3 text-center text-sm">
            <Link href="/forgot-password" className="font-semibold text-[#00319D] underline-offset-4 hover:underline">Forgot your password?</Link>
            <p className="text-[#6B6860]">New to HearthAway? <Link href="/sign-up" className="font-bold text-[#00319D] underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
