// Replace the placeholder with the SHA-256 digest of the Vercel intake token at deployment.
const intakeTokenHash = '__INTAKE_TOKEN_SHA256__'

Deno.serve(async (request) => {
  if (request.method !== 'POST') return new Response(null, { status: 405 })

  const token = request.headers.get('x-hearthaway-intake-token') ?? ''
  if (!/^[a-f0-9]{64}$/.test(token)) return new Response(null, { status: 401 })
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
  let difference = 0
  for (let i = 0; i < hash.length; i++) {
    difference |= hash.charCodeAt(i) ^ intakeTokenHash.charCodeAt(i)
  }
  if (difference !== 0) return new Response(null, { status: 401 })

  const payload = await request.json().catch(() => null)
  const name = typeof payload?.name === 'string' ? payload.name.trim() : ''
  const email = typeof payload?.email === 'string' ? payload.email.trim().toLowerCase() : ''
  const notes = typeof payload?.notes === 'string' ? payload.notes.trim() : ''
  if (notes.length > 11_000) return new Response(null, { status: 400 })
  const phone = typeof payload?.phone === 'string' ? payload.phone.trim() : ''
  if (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || phone.length > 30 || !/^[+\d][\d\s().-]*$/.test(phone) || phone.replace(/\D/g, '').length < 7) {
    return new Response(null, { status: 400 })
  }

  const url = Deno.env.get('SUPABASE_URL')
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceRole) return new Response(null, { status: 503 })

  try {
    const response = await fetch(new URL('/rest/v1/crm_leads', url), {
      method: 'POST',
      headers: {
        apikey: serviceRole,
        Authorization: `Bearer ${serviceRole}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ student_name: name, email, phone, source: 'Direct', lead_requirement_notes: notes || null }),
      signal: AbortSignal.timeout(5000),
    })
    if (response.ok) return new Response(null, { status: 204 })
    const error = await response.json().catch(() => null)
    // The unique index on lower(email) makes retries idempotent for CRM leads.
    if (error?.code === '23505' && error.message?.includes('crm_leads_email_unique_idx')) {
      return new Response(null, { status: 204 })
    }
    console.error('CRM lead insert failed', response.status, error?.code)
  } catch {
    console.error('CRM lead insert request failed')
  }

  return new Response(null, { status: 503 })
})
