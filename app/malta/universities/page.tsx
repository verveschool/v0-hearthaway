import { redirect } from 'next/navigation'

export default function MaltaUniversities() {
  redirect('/universities?country=Malta')
}
