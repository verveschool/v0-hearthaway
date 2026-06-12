import { redirect } from 'next/navigation'

export default function IEUniversities() {
  redirect('/universities?country=Ireland')
}
