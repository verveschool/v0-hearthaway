import { redirect } from 'next/navigation'

export default function CanadaUniversities() {
  redirect('/universities?country=Canada')
}
