'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

function safeNextPath(value: string): string {
  return value.startsWith('/') && !value.startsWith('//') && !value.includes('\\') ? value : '/account'
}

async function getOrigin(): Promise<string> {
  const requestHeaders = await headers()
  const explicitOrigin = requestHeaders.get('origin')
  if (explicitOrigin) return explicitOrigin
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host')
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'https'
  return host ? `${protocol}://${host}` : 'https://www.hearthaway.com'
}

export async function signInAction(formData: FormData): Promise<void> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const next = safeNextPath(String(formData.get('next') ?? '/account'))
  if (!email || !password) redirect('/sign-in?error=details')

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect('/sign-in?error=credentials')
  redirect(next)
}

export async function signUpAction(formData: FormData): Promise<void> {
  const firstName = String(formData.get('first_name') ?? '').trim().slice(0, 80)
  const lastName = String(formData.get('last_name') ?? '').trim().slice(0, 80)
  const phone = String(formData.get('phone') ?? '').trim().slice(0, 40)
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const confirmPassword = String(formData.get('confirm_password') ?? '')

  if (!firstName || !lastName || !email || password.length < 12 || password !== confirmPassword) {
    redirect('/sign-up?error=details')
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName, phone },
      emailRedirectTo: `${await getOrigin()}/auth/callback?next=${encodeURIComponent('/account')}`,
    },
  })

  if (error) redirect('/sign-up?error=signup')
  if (data.session) redirect('/account')
  redirect('/sign-in?message=check-email')
}

export async function requestPasswordResetAction(formData: FormData): Promise<void> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  if (!email) redirect('/forgot-password?sent=1')

  const supabase = await createClient()
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await getOrigin()}/auth/callback?next=${encodeURIComponent('/reset-password')}`,
  })
  redirect('/forgot-password?sent=1')
}

export async function updatePasswordAction(formData: FormData): Promise<void> {
  const password = String(formData.get('password') ?? '')
  const confirmation = String(formData.get('confirm_password') ?? '')
  if (password.length < 12 || password !== confirmation) redirect('/reset-password?error=details')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/forgot-password?sent=1')
  const { error } = await supabase.auth.updateUser({ password })
  if (error) redirect('/reset-password?error=save')
  redirect('/sign-in?message=password-updated')
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/sign-in?message=signed-out')
}
