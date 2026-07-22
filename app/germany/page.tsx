import { redirect } from 'next/navigation'

export default function GermanyIndex() {
  // Redirect country hub to the universities page with preselected country
  redirect('/universities?country=Germany')
}
