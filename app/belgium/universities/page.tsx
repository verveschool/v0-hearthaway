import { redirect } from 'next/navigation'

export default function BelgiumUniversities() {
  redirect('/universities?country=Belgium')
}
