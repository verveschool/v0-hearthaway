import { redirect } from 'next/navigation'

export default function UKIndex() {
  // Redirect country hub to the universities page with preselected country
  redirect('/universities?country=UK')
}
