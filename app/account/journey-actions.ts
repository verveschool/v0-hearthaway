'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type JourneyActionState = {
  status: 'success' | 'error'
  message: string
}

function readText(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function submitJourneyRequestAction(
  _previousState: JourneyActionState,
  formData: FormData,
): Promise<JourneyActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { status: 'error', message: 'Please sign in to send a request.' }

  const journeyType = readText(formData, 'journey_type', 24)
  if (!['renewal', 'referral', 'testimonial'].includes(journeyType)) {
    return { status: 'error', message: 'Choose a valid request type.' }
  }

  const { data: profile } = await supabase.from('profiles')
    .select('first_name,last_name,phone,city')
    .eq('id', user.id)
    .maybeSingle()
  const metadataFirstName = typeof user.user_metadata?.first_name === 'string' ? user.user_metadata.first_name : ''
  const metadataLastName = typeof user.user_metadata?.last_name === 'string' ? user.user_metadata.last_name : ''
  const firstName = profile?.first_name?.trim() || metadataFirstName.trim()
  const lastName = profile?.last_name?.trim() || metadataLastName.trim()
  if (!firstName || !lastName) {
    return { status: 'error', message: 'Add your name to your profile before sending a request.' }
  }

  let message = ''
  let city: string | null = profile?.city ?? null
  let moveInWindow: string | null = null

  if (journeyType === 'renewal') {
    city = readText(formData, 'city', 120)
    moveInWindow = readText(formData, 'move_in_date', 120)
    const details = readText(formData, 'details', 700)
    if (!city || !moveInWindow) {
      return { status: 'error', message: 'Add your next destination and preferred move-in date.' }
    }
    message = [
      '[Renewal planning request]',
      `Next destination: ${city}`,
      `Preferred move-in: ${moveInWindow}`,
      details ? `Notes: ${details}` : '',
    ].filter(Boolean).join('\n')
  } else if (journeyType === 'referral') {
    const referralName = readText(formData, 'referral_name', 120)
    const referralEmail = readText(formData, 'referral_email', 254).toLowerCase()
    const hasPermission = formData.get('permission_to_contact') === 'on'
    if (!referralName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(referralEmail) || !hasPermission) {
      return { status: 'error', message: 'Add your referral’s name and a valid email, and confirm you have permission to share it.' }
    }
    message = [
      '[Student referral]',
      `Referral name: ${referralName}`,
      `Referral email: ${referralEmail}`,
      'Permission to share contact details: confirmed',
      'Referral reward: £50 for a successful referral under the existing programme terms',
    ].join('\n')
  } else if (journeyType === 'testimonial') {
    const testimonial = readText(formData, 'testimonial', 1000)
    if (testimonial.length < 20) {
      return { status: 'error', message: 'Please share at least 20 characters of feedback.' }
    }
    const publishConsent = formData.get('publish_consent') === 'on'
    message = [
      '[Student feedback]',
      testimonial,
      `Permission to publish with first name: ${publishConsent ? 'yes' : 'no — private feedback only'}`,
    ].join('\n')
  } else {
    return { status: 'error', message: 'Choose a valid request type.' }
  }

  const { error } = await supabase.from('enquiries').insert({
    student_id: user.id,
    contact_email: user.email || null,
    first_name: firstName.slice(0, 120),
    last_name: lastName.slice(0, 120),
    phone: profile?.phone?.trim().slice(0, 40) || null,
    enquiry_type: 'service',
    room_slug: null,
    country: null,
    city,
    university: null,
    move_in_window: moveInWindow,
    stay_duration: null,
    budget_range: null,
    accommodation_preference: null,
    priorities: [],
    message: message.slice(0, 1200),
    source: 'website',
  })

  if (error) {
    return { status: 'error', message: 'We could not send your request. Please try again.' }
  }

  revalidatePath('/account')
  revalidatePath('/team')
  return { status: 'success', message: 'Your request has been sent to the HearthAway team.' }
}
