import { redirect } from 'next/navigation'

export default function FranceUniversities() {
  redirect('/universities?country=FR')
}
