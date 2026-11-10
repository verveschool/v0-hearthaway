import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

type PropertyEnquiry = {
  firstName: string
  lastName: string
  phone: string
  propertyName: string
  enquiryType: 'virtual-tour' | 'get-matched'
}

const legacyStringFields = [
  'country',
  'city',
  'university',
  'moveIn',
  'duration',
  'budget',
  'accommodation',
  'firstName',
  'lastName',
  'email',
  'phone',
  'message',
] as const
const legacyFields = new Set<string>([...legacyStringFields, 'priorities', 'intent', 'companyWebsite'])
const propertyEnquiryFields = new Set(['firstName', 'lastName', 'phone', 'propertyName', 'enquiryType'])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isValidPhone(value: string): boolean {
  const phone = value.trim()
  return phone.length >= 7
    && phone.length <= 30
    && /^[+\d][\d\s().-]*$/.test(phone)
    && phone.replace(/\D/g, '').length >= 7
}

function isPropertyEnquiry(body: Record<string, unknown>): body is Record<string, unknown> & PropertyEnquiry {
  return Object.keys(body).every((key) => propertyEnquiryFields.has(key))
    && typeof body.firstName === 'string'
    && body.firstName.trim().length > 0
    && body.firstName.trim().length <= 120
    && typeof body.lastName === 'string'
    && body.lastName.trim().length <= 120
    && typeof body.phone === 'string'
    && isValidPhone(body.phone)
    && typeof body.propertyName === 'string'
    && body.propertyName.trim().length > 0
    && body.propertyName.trim().length <= 200
    && (body.enquiryType === 'virtual-tour' || body.enquiryType === 'get-matched')
}

function isLegacyForm(body: Record<string, unknown>): boolean {
  if (!Object.keys(body).every((key) => legacyFields.has(key))) return false
  if (!legacyStringFields.every((key) => key in body)) return false
  if (!legacyStringFields.every((key) => {
    const value = body[key]
    return typeof value === 'string' && value.length <= 1200
  })) return false
  if (typeof body.firstName !== 'string' || !body.firstName.trim() || body.firstName.trim().length > 120) return false
  if (typeof body.lastName !== 'string' || !body.lastName.trim() || body.lastName.trim().length > 120) return false
  if (typeof body.phone !== 'string' || !isValidPhone(body.phone)) return false
  if (typeof body.email !== 'string' || body.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) return false
  if (body.intent !== undefined && !['exploring', 'shortlisting', 'ready-to-book'].includes(String(body.intent))) return false
  if (body.companyWebsite !== undefined && (typeof body.companyWebsite !== 'string' || body.companyWebsite.trim())) return false
  if (!Array.isArray(body.priorities) || body.priorities.length > 16) return false
  return body.priorities.every((priority) => typeof priority === 'string' && priority.length <= 100)
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 })
    } catch {
      return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 })
    }
  }

  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (new TextEncoder().encode(rawBody).byteLength > 16_000) {
    return NextResponse.json({ error: 'Request is too large.' }, { status: 413 })
  }

  let body: unknown
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const validPropertyEnquiry = isPropertyEnquiry(body)
  if (!validPropertyEnquiry && !isLegacyForm(body)) {
    return NextResponse.json({ error: 'Please check the enquiry details and try again.' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const input = body as Record<string, unknown>
  const readText = (key: string) => typeof input[key] === 'string' ? String(input[key]).trim() : ''
  const priorities = Array.isArray(input.priorities)
    ? input.priorities.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean).slice(0, 16)
    : []
  const intentLabels: Record<string, string> = {
    exploring: 'Just exploring',
    shortlisting: 'Comparing options',
    'ready-to-book': 'Ready to book',
  }
  const message = [
    validPropertyEnquiry ? '' : `Planning intent: ${intentLabels[readText('intent')] ?? intentLabels.exploring}`,
    readText('message'),
  ].filter(Boolean).join('\n\n').slice(0, 1200)
  const enquiry = {
    student_id: user?.id ?? null,
    contact_email: user?.email || readText('email') || null,
    first_name: readText('firstName').slice(0, 120),
    last_name: readText('lastName').slice(0, 120),
    phone: readText('phone').slice(0, 40) || null,
    enquiry_type: validPropertyEnquiry
      ? input.enquiryType === 'virtual-tour' ? 'virtual_tour' : 'property'
      : 'matching',
    room_slug: null,
    country: readText('country').slice(0, 120) || null,
    city: readText('city').slice(0, 120) || null,
    university: readText('university').slice(0, 200) || null,
    move_in_window: readText('moveIn').slice(0, 120) || null,
    stay_duration: readText('duration').slice(0, 120) || null,
    budget_range: readText('budget').slice(0, 120) || null,
    accommodation_preference: (readText('accommodation') || readText('propertyName')).slice(0, 200) || null,
    priorities,
    message: message || null,
    source: 'website',
  }

  let persistenceError: { message: string } | null = null
  if (user) {
    const { error } = await supabase.from('enquiries').insert(enquiry)
    persistenceError = error
  } else {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Enquiries are temporarily unavailable.' }, { status: 503 })
    }
    const adminClient = createSupabaseClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    const { error } = await adminClient.from('enquiries').insert(enquiry)
    persistenceError = error
  }

  if (persistenceError) {
    console.error('[v0] Enquiry persistence failed:', persistenceError.message)
    return NextResponse.json({ error: 'We could not save your enquiry. Please try again.' }, { status: 500 })
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
      })
      if (!response.ok) console.error('[v0] Enquiry webhook returned a non-success status:', response.status)
    } catch (error) {
      console.error('[v0] Enquiry webhook delivery failed:', error instanceof Error ? error.message : 'unknown error')
    }
  }

  return NextResponse.json({ success: true })
}
