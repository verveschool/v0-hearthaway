import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { requestPasswordResetAction } from '@/app/auth/actions'

export const metadata: Metadata = {
  title: 'Reset your password | HearthAway',
  description: 'Request a secure password reset for your HearthAway account.',
}

type ForgotPasswordPageProps = {
  searchParams: Promise<{ sent?: string }>
}

export default async function ForgotPasswordPage({ searchParams }: ForgotPasswordPageProps) {
  const { sent } = await searchParams
  return (
    <>
      <Navigation />
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#F7F6F3] px-5 py-16 pt-28">
        <section className="w-full max-w-md rounded-3xl border border-[#E8E6E1] bg-white p-7 shadow-sm sm:p-9" aria-labelledby="forgot-password-title">
          <h1 id="forgot-password-title" className="font-heading text-3xl font-extrabold text-[#1A1A1A]">Reset your password</h1>
          {sent ? <p role="status" className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-800">If an account exists for that email, a password reset link is on its way.</p> : <>
            <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">Enter the email address on your account and we will send a secure reset link.</p>
            <form action={requestPasswordResetAction} className="mt-6 flex flex-col gap-5">
              <label className="flex flex-col gap-2 text-sm font-semibold text-[#333333]"><span>Email address</span><input name="email" type="email" autoComplete="email" required maxLength={254} className="min-h-12 rounded-xl border border-[#D8D5CE] px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]" /></label>
              <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#00319D] px-5 py-3 text-sm font-bold text-white hover:bg-[#00277D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2">Send reset link</button>
            </form>
          </>}
          <p className="mt-6 text-center text-sm text-[#6B6860]"><Link href="/sign-in" className="font-bold text-[#00319D] underline-offset-4 hover:underline">Back to sign in</Link></p>
        </section>
      </main>
      <Footer />
    </>
  )
}
