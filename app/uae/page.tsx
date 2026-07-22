import { redirect } from 'next/navigation'

export default function UAEIndex() {
  // Redirect country hub to the universities page with preselected country
  redirect('/universities?country=United+Arab+Emirates')
}
