import { redirect } from 'next/navigation'

export default function GermanyUniversities() {
  redirect('/universities?country=Germany')
}
