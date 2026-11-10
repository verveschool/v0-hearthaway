'use server'

import { revalidatePath } from 'next/cache'
import { getAccommodationRoomBySlug } from '@/app/accommodation/listing-data'
import { createClient } from '@/lib/supabase/server'

export type TeamWorkflowActionState = {
  status: 'success' | 'error'
  message: string
}

const enquiryStatuses = ['new', 'qualified', 'follow_up', 'closed'] as const
const bookingStatuses = ['requested', 'in_review', 'offer_made', 'confirmed', 'cancelled'] as const
const serviceStatuses = ['requested', 'in_review', 'referred', 'completed', 'cancelled'] as const

function isOneOf<const Options extends readonly string[]>(value: string, options: Options): value is Options[number] {
  return (options as readonly string[]).includes(value)
}

function readText(formData: FormData, key: string, maxLength = 120) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

async function getTeamSession() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: member } = await supabase.from('sales_team_members')
    .select('user_id')
    .eq('user_id', user.id)
    .eq('active', true)
    .maybeSingle()
  return member ? { supabase, user } : null
}

async function hasOwnerForStudent(supabase: Awaited<ReturnType<typeof createClient>>, studentId: string) {
  const { data: directAssignment } = await supabase.from('sales_case_assignments')
    .select('id')
    .eq('student_id', studentId)
    .limit(1)
  if (directAssignment?.length) return true

  const { data: enquiries } = await supabase.from('enquiries').select('id').eq('student_id', studentId)
  const enquiryIds = (enquiries ?? []).map((enquiry) => enquiry.id)
  if (!enquiryIds.length) return false

  const { data: enquiryAssignments } = await supabase.from('sales_case_assignments')
    .select('id')
    .in('enquiry_id', enquiryIds)
    .limit(1)
  return Boolean(enquiryAssignments?.length)
}

async function ownsStudent(supabase: Awaited<ReturnType<typeof createClient>>, userId: string, studentId: string) {
  const { data: directAssignment } = await supabase.from('sales_case_assignments')
    .select('id')
    .eq('owner_id', userId)
    .eq('student_id', studentId)
    .limit(1)
  if (directAssignment?.length) return true

  const { data: assignments } = await supabase.from('sales_case_assignments')
    .select('enquiry_id')
    .eq('owner_id', userId)
    .not('enquiry_id', 'is', null)
  const enquiryIds = (assignments ?? []).flatMap((assignment) => assignment.enquiry_id ? [assignment.enquiry_id] : [])
  if (!enquiryIds.length) return false

  const { data: matchingEnquiry } = await supabase.from('enquiries')
    .select('id')
    .eq('student_id', studentId)
    .in('id', enquiryIds)
    .limit(1)
  return Boolean(matchingEnquiry?.length)
}

async function ownsEnquiry(supabase: Awaited<ReturnType<typeof createClient>>, userId: string, enquiryId: string, studentId: string | null) {
  const { data: directAssignment } = await supabase.from('sales_case_assignments')
    .select('id')
    .eq('owner_id', userId)
    .eq('enquiry_id', enquiryId)
    .limit(1)
  if (directAssignment?.length) return true
  return studentId ? ownsStudent(supabase, userId, studentId) : false
}

function actionError(message: string): TeamWorkflowActionState {
  return { status: 'error', message }
}

function actionSuccess(message: string): TeamWorkflowActionState {
  return { status: 'success', message }
}

export async function claimSalesCaseAction(
  _previousState: TeamWorkflowActionState,
  formData: FormData,
): Promise<TeamWorkflowActionState> {
  const context = await getTeamSession()
  if (!context) return actionError('Your team session has expired. Please sign in again.')
  const { supabase, user } = context
  const enquiryId = readText(formData, 'enquiry_id')
  const studentId = readText(formData, 'student_id')

  if (enquiryId && isUuid(enquiryId)) {
    const { data: enquiry } = await supabase.from('enquiries').select('id,student_id').eq('id', enquiryId).maybeSingle()
    if (!enquiry) return actionError('This enquiry is no longer available.')
    if (enquiry.student_id) {
      if (await hasOwnerForStudent(supabase, enquiry.student_id)) return actionError('This student already has an assigned advisor.')
      const { error } = await supabase.from('sales_case_assignments').insert({
        student_id: enquiry.student_id,
        owner_id: user.id,
        assigned_by: user.id,
      })
      if (error) return actionError('This student was assigned by another team member. Refresh the inbox and try again.')
    } else {
      const { data: existing } = await supabase.from('sales_case_assignments').select('id').eq('enquiry_id', enquiry.id).limit(1)
      if (existing?.length) return actionError('This enquiry already has an assigned owner.')
      const { error } = await supabase.from('sales_case_assignments').insert({
        enquiry_id: enquiry.id,
        owner_id: user.id,
        assigned_by: user.id,
      })
      if (error) return actionError('This enquiry was assigned by another team member. Refresh the inbox and try again.')
    }
  } else if (studentId && isUuid(studentId)) {
    const { data: profile } = await supabase.from('profiles').select('id').eq('id', studentId).maybeSingle()
    if (!profile) return actionError('This student account is no longer available.')
    if (await hasOwnerForStudent(supabase, studentId)) return actionError('This student already has an assigned advisor.')
    const { error } = await supabase.from('sales_case_assignments').insert({
      student_id: studentId,
      owner_id: user.id,
      assigned_by: user.id,
    })
    if (error) return actionError('This student was assigned by another team member. Refresh the inbox and try again.')
  } else {
    return actionError('Choose a valid enquiry or student account.')
  }

  revalidatePath('/team')
  revalidatePath('/account')
  return actionSuccess('You are now the primary contact for this case.')
}

export async function updateEnquiryStatusAction(
  _previousState: TeamWorkflowActionState,
  formData: FormData,
): Promise<TeamWorkflowActionState> {
  const context = await getTeamSession()
  if (!context) return actionError('Your team session has expired. Please sign in again.')
  const { supabase, user } = context
  const enquiryId = readText(formData, 'enquiry_id')
  const status = readText(formData, 'status', 24)
  if (!isUuid(enquiryId) || !isOneOf(status, enquiryStatuses)) {
    return actionError('Choose a valid enquiry status.')
  }

  const { data: enquiry } = await supabase.from('enquiries').select('student_id').eq('id', enquiryId).maybeSingle()
  if (!enquiry || !await ownsEnquiry(supabase, user.id, enquiryId, enquiry.student_id)) {
    return actionError('You can only update enquiries assigned to you.')
  }
  const { error } = await supabase.from('enquiries').update({ status }).eq('id', enquiryId)
  if (error) return actionError('We could not update this enquiry. Please try again.')

  revalidatePath('/team')
  revalidatePath('/account')
  return actionSuccess('Enquiry status updated.')
}

export async function updateBookingStatusAction(
  _previousState: TeamWorkflowActionState,
  formData: FormData,
): Promise<TeamWorkflowActionState> {
  const context = await getTeamSession()
  if (!context) return actionError('Your team session has expired. Please sign in again.')
  const { supabase, user } = context
  const bookingId = readText(formData, 'booking_id')
  const status = readText(formData, 'status', 24)
  if (!isUuid(bookingId) || !isOneOf(status, bookingStatuses)) {
    return actionError('Choose a valid booking status.')
  }

  const { data: booking } = await supabase.from('booking_requests').select('student_id').eq('id', bookingId).maybeSingle()
  if (!booking || !await ownsStudent(supabase, user.id, booking.student_id)) {
    return actionError('You can only update bookings for students assigned to you.')
  }
  const { error } = await supabase.from('booking_requests').update({ status }).eq('id', bookingId)
  if (error) return actionError('We could not update this booking. Please try again.')

  revalidatePath('/team')
  revalidatePath('/account')
  return actionSuccess('Booking status updated.')
}

export async function updateServiceRequestStatusAction(
  _previousState: TeamWorkflowActionState,
  formData: FormData,
): Promise<TeamWorkflowActionState> {
  const context = await getTeamSession()
  if (!context) return actionError('Your team session has expired. Please sign in again.')
  const { supabase, user } = context
  const requestId = readText(formData, 'request_id')
  const status = readText(formData, 'status', 24)
  if (!isUuid(requestId) || !isOneOf(status, serviceStatuses)) {
    return actionError('Choose a valid service status.')
  }

  const { data: serviceRequest } = await supabase.from('service_requests').select('student_id').eq('id', requestId).maybeSingle()
  if (!serviceRequest || !await ownsStudent(supabase, user.id, serviceRequest.student_id)) {
    return actionError('You can only update service requests for students assigned to you.')
  }
  const update = status === 'referred'
    ? { status, specialist_user_id: user.id }
    : { status }
  const { error } = await supabase.from('service_requests').update(update).eq('id', requestId)
  if (error) return actionError('We could not update this service request. Please try again.')

  revalidatePath('/team')
  revalidatePath('/account')
  return actionSuccess('Service request updated.')
}

export async function addRoomRecommendationAction(
  _previousState: TeamWorkflowActionState,
  formData: FormData,
): Promise<TeamWorkflowActionState> {
  const context = await getTeamSession()
  if (!context) return actionError('Your team session has expired. Please sign in again.')
  const { supabase, user } = context
  const studentId = readText(formData, 'student_id')
  const roomSlug = readText(formData, 'room_slug', 180)
  const note = readText(formData, 'note', 500)
  if (!isUuid(studentId) || !getAccommodationRoomBySlug(roomSlug)) {
    return actionError('Choose a valid room and student account.')
  }
  if (!await ownsStudent(supabase, user.id, studentId)) {
    return actionError('You can only recommend rooms to students assigned to you.')
  }

  const { data: existing } = await supabase.from('room_recommendations')
    .select('id')
    .eq('student_id', studentId)
    .eq('room_slug', roomSlug)
    .limit(1)
  if (existing?.length) return actionError('This room is already on the student’s recommendations list.')

  const { error } = await supabase.from('room_recommendations').insert({
    student_id: studentId,
    room_slug: roomSlug,
    note,
    recommended_by: user.id,
  })
  if (error) return actionError('We could not save this recommendation. Please try again.')

  revalidatePath('/team')
  revalidatePath('/account')
  return actionSuccess('Room recommendation added to the student account.')
}
