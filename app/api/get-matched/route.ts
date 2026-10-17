import { NextResponse } from 'next/server'

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
const legacyFields = new Set<string>([...legacyStringFields, 'priorities'])
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
  if (!Array.isArray(body.priorities) || body.priorities.length > 16) return false
  return body.priorities.every((priority) => typeof priority === 'string' && priority.length <= 100)
}

export async function POST(request: Request) {
  if (Number(request.headers.get('content-length') ?? 0) > 16_000) {
    return NextResponse.json({ error: 'Request is too large.' }, { status: 413 })
  }

  let body: unknown
  try {
    body = await request.json()
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

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Enquiries are temporarily unavailable.' }, { status: 503 })
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'We could not send your enquiry. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'We could not send your enquiry. Please try again.' }, { status: 502 })
  }
}
