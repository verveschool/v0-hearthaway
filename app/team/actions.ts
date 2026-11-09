'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type TeamActionState = { status: 'success' | 'error'; message: string }

export async function addSalesNoteAction(_previous: TeamActionState, formData: FormData): Promise<TeamActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { status: 'error', message: 'Sign in to add a case note.' }

  const note = String(formData.get('note') ?? '').trim().slice(0, 2000)
  const enquiryId = String(formData.get('enquiry_id') ?? '').trim()
  const requestedStudentId = String(formData.get('student_id') ?? '').trim()
  if (!note) return { status: 'error', message: 'Enter a note before saving.' }

  const { data: member } = await supabase.from('sales_team_members').select('user_id').eq('user_id', user.id).eq('active', true).maybeSingle()
  if (!member) return { status: 'error', message: 'You do not have access to sales cases.' }

  let assignmentQuery = supabase.from('sales_case_assignments').select('student_id,enquiry_id').eq('owner_id', user.id)
  if (enquiryId) assignmentQuery = assignmentQuery.eq('enquiry_id', enquiryId)
  else if (requestedStudentId) assignmentQuery = assignmentQuery.eq('student_id', requestedStudentId).is('enquiry_id', null)
  else return { status: 'error', message: 'This case could not be identified.' }

  const { data: assignment } = await assignmentQuery.order('assigned_at', { ascending: false }).limit(1).maybeSingle()
  if (!assignment) return { status: 'error', message: 'This case is not assigned to your account.' }

  const { error } = await supabase.from('sales_notes').insert({
    student_id: (assignment.student_id ?? requestedStudentId) || null,
    enquiry_id: assignment.enquiry_id,
    author_id: user.id,
    note,
  })

  if (error) return { status: 'error', message: 'The note could not be saved.' }
  revalidatePath('/team')
  return { status: 'success', message: 'Case note saved.' }
}
