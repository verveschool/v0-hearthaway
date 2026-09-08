import { redirect } from 'next/navigation'

export default function UsaUniversities() {
  redirect('/universities?country=USA')
}
