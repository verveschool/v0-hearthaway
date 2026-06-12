import { redirect } from 'next/navigation'

export default function UKUniversities() {
  redirect('/universities?country=UK')
}
