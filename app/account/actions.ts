'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getAccommodationRoomBySlug } from '@/app/accommodation/listing-data'

type ActionState = {
  status: 'success' | 'error'
  message: string
}

async function getAuthenticatedClient() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}

function textValue(formData: FormData, key: string, maxLength: number): string {
  return String(formData.get(key) ?? '').trim().slice(0, maxLength)
}

export async function saveProfileAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedClient()
  if (!user) return { status: 'error', message: 'Please sign in again to save your profile.' }

  const firstName = textValue(formData, 'first_name', 80)
  const lastName = textValue(formData, 'last_name', 80)
  if (!firstName || !lastName) return { status: 'error', message: 'Enter your first and last name.' }

  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    first_name: firstName,
    last_name: lastName,
    phone: textValue(formData, 'phone', 40) || null,
    country: textValue(formData, 'country', 100) || null,
    city: textValue(formData, 'city', 100) || null,
    university: textValue(formData, 'university', 160) || null,
    study_level: textValue(formData, 'study_level', 80) || null,
    move_in_window: textValue(formData, 'move_in_window', 100) || null,
    budget_range: textValue(formData, 'budget_range', 100) || null,
    accommodation_preference: textValue(formData, 'accommodation_preference', 100) || null,
  }, { onConflict: 'id' })

  if (error) return { status: 'error', message: 'Your profile could not be saved. Please try again.' }
  revalidatePath('/account')
  return { status: 'success', message: 'Your profile has been updated.' }
}

export async function saveRoomAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedClient()
  const roomSlug = textValue(formData, 'room_slug', 240)
  if (!user) return { status: 'error', message: 'Sign in to save a room.' }
  if (!getAccommodationRoomBySlug(roomSlug)) return { status: 'error', message: 'This room is no longer available.' }

  const { error } = await supabase.from('saved_rooms').insert({ student_id: user.id, room_slug: roomSlug })
  if (error?.code === '23505') return { status: 'success', message: 'This room is already in your saved rooms.' }
  if (error) return { status: 'error', message: 'We could not save this room. Please try again.' }
  revalidatePath('/account')
  return { status: 'success', message: 'Room saved to your account.' }
}

export async function removeSavedRoomAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedClient()
  const roomSlug = textValue(formData, 'room_slug', 240)
  if (!user) return { status: 'error', message: 'Please sign in again to update saved rooms.' }

  const { error } = await supabase.from('saved_rooms').delete().eq('student_id', user.id).eq('room_slug', roomSlug)
  if (error) return { status: 'error', message: 'This room could not be removed.' }
  revalidatePath('/account')
  return { status: 'success', message: 'Room removed from saved rooms.' }
}

export async function createShortlistAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedClient()
  const name = textValue(formData, 'name', 80)
  if (!user) return { status: 'error', message: 'Sign in to create a shortlist.' }
  if (!name) return { status: 'error', message: 'Enter a name for your shortlist.' }

  const { error } = await supabase.from('shortlists').insert({ student_id: user.id, name })
  if (error?.code === '23505') return { status: 'error', message: 'You already have a shortlist with that name.' }
  if (error) return { status: 'error', message: 'Your shortlist could not be created.' }
  revalidatePath('/account')
  return { status: 'success', message: 'Shortlist created.' }
}

export async function addRoomToShortlistAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedClient()
  const roomSlug = textValue(formData, 'room_slug', 240)
  const shortlistId = textValue(formData, 'shortlist_id', 80)
  if (!user) return { status: 'error', message: 'Sign in to update your shortlist.' }
  if (!getAccommodationRoomBySlug(roomSlug) || !shortlistId) return { status: 'error', message: 'Choose a valid room and shortlist.' }

  const { error } = await supabase.from('shortlist_items').insert({ shortlist_id: shortlistId, room_slug: roomSlug })
  if (error?.code === '23505') return { status: 'success', message: 'This room is already in that shortlist.' }
  if (error) return { status: 'error', message: 'This room could not be added to the shortlist.' }
  revalidatePath('/account')
  return { status: 'success', message: 'Room added to shortlist.' }
}

export async function removeShortlistItemAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedClient()
  const shortlistId = textValue(formData, 'shortlist_id', 80)
  const roomSlug = textValue(formData, 'room_slug', 240)
  if (!user) return { status: 'error', message: 'Please sign in again to update your shortlist.' }

  const { error } = await supabase.from('shortlist_items').delete().eq('shortlist_id', shortlistId).eq('room_slug', roomSlug)
  if (error) return { status: 'error', message: 'This room could not be removed from the shortlist.' }
  revalidatePath('/account')
  return { status: 'success', message: 'Room removed from shortlist.' }
}

export async function deleteShortlistAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedClient()
  const shortlistId = textValue(formData, 'shortlist_id', 80)
  if (!user) return { status: 'error', message: 'Please sign in again to manage shortlists.' }

  const { error } = await supabase.from('shortlists').delete().eq('id', shortlistId).eq('student_id', user.id)
  if (error) return { status: 'error', message: 'This shortlist could not be deleted.' }
  revalidatePath('/account')
  return { status: 'success', message: 'Shortlist deleted.' }
}

export async function requestRoomBookingAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedClient()
  const roomSlug = textValue(formData, 'room_slug', 240)
  const message = textValue(formData, 'message', 1200)
  if (!user) return { status: 'error', message: 'Sign in to request a booking.' }
  if (!getAccommodationRoomBySlug(roomSlug)) return { status: 'error', message: 'This room is no longer available.' }

  const { error } = await supabase.from('booking_requests').insert({ student_id: user.id, room_slug: roomSlug, message })
  if (error) return { status: 'error', message: 'Your booking request could not be sent. Please try again.' }
  revalidatePath('/account')
  revalidatePath('/team')
  return { status: 'success', message: 'Booking request sent. Your advisor will follow up with current availability and terms.' }
}

export async function requestServiceAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedClient()
  const serviceSlug = textValue(formData, 'service_slug', 100)
  const message = textValue(formData, 'message', 1200)
  if (!user) return { status: 'error', message: 'Sign in to request a service.' }

  const { data: service } = await supabase.from('service_catalog').select('slug').eq('slug', serviceSlug).eq('active', true).maybeSingle()
  if (!service) return { status: 'error', message: 'This service is not currently available.' }

  const { error } = await supabase.from('service_requests').insert({ student_id: user.id, service_slug: serviceSlug, message })
  if (error) return { status: 'error', message: 'Your service request could not be sent.' }
  revalidatePath('/account')
  revalidatePath('/team')
  return { status: 'success', message: 'Service request sent.' }
}

export async function uploadStudentDocumentAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedClient()
  const file = formData.get('document')
  if (!user) return { status: 'error', message: 'Sign in to upload a document.' }
  if (!(file instanceof File) || file.size === 0) return { status: 'error', message: 'Choose a document to upload.' }

  const allowedTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
  if (!allowedTypes.has(file.type) || file.size > 10 * 1024 * 1024) {
    return { status: 'error', message: 'Upload a PDF, JPG, PNG or WebP file up to 10 MB.' }
  }

  const signature = new Uint8Array(await file.slice(0, 12).arrayBuffer())
  const startsWith = (...bytes: number[]) => bytes.every((byte, index) => signature[index] === byte)
  const isValidSignature = file.type === 'application/pdf'
    ? startsWith(0x25, 0x50, 0x44, 0x46, 0x2d)
    : file.type === 'image/jpeg'
      ? startsWith(0xff, 0xd8, 0xff)
      : file.type === 'image/png'
        ? startsWith(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)
        : startsWith(0x52, 0x49, 0x46, 0x46) && signature[8] === 0x57 && signature[9] === 0x45 && signature[10] === 0x42 && signature[11] === 0x50
  if (!isValidSignature) return { status: 'error', message: 'The file contents do not match the selected document type.' }

  const safeName = file.name.split(/[\\/]/).pop()?.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'document'
  const objectPath = `${user.id}/${crypto.randomUUID()}-${safeName}`
  const { error: uploadError } = await supabase.storage.from('student-documents').upload(objectPath, file, {
    contentType: file.type,
    upsert: false,
  })
  if (uploadError) return { status: 'error', message: 'The document could not be uploaded. Please try again.' }

  const { error: recordError } = await supabase.from('student_documents').insert({
    student_id: user.id,
    file_name: safeName,
    object_path: objectPath,
    content_type: file.type,
    byte_size: file.size,
  })

  if (recordError) {
    await supabase.storage.from('student-documents').remove([objectPath])
    return { status: 'error', message: 'The document could not be saved to your account.' }
  }

  revalidatePath('/account')
  return { status: 'success', message: 'Document uploaded securely.' }
}
