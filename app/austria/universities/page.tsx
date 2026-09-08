import { redirect } from 'next/navigation'

export default function AustriaUniversities() {
  redirect('/universities?country=Austria')
}
