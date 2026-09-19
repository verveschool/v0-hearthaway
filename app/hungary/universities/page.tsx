import { redirect } from 'next/navigation'

export default function HungaryUniversities() {
  redirect('/universities?country=Hungary')
}
