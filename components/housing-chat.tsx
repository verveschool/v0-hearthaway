'use client'

import { track } from '@vercel/analytics'
import { MessageCircle, Send, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'

const topics = [
  {
    label: 'Find a room',
    pattern: /\b(room|studio|shared|property|accommodation|university|campus|halls?)\b/i,
    answer: 'Start with your destination city and browse properties or room types. An advisor can help you shortlist rooms near your university.',
    href: '/accommodation',
    link: 'Browse accommodation',
  },
  {
    label: 'Prices and availability',
    pattern: /\b(price|rent|cost|budget|deposit|availab\w*|fees?|bills?|expensive|cheap)\b/i,
    answer: 'Prices and availability depend on the room and your move-in date. An advisor can check the current rate, availability and any deposit with the provider.',
    href: '/accommodation/rooms',
    link: 'Browse room types',
  },
  {
    label: 'How booking works',
    pattern: /\b(book\w*|reserve|pay\w*|process|cancel\w*|refund\w*|contract|lease)\b/i,
    answer: 'You can shortlist a room and send an enquiry. A HearthAway advisor can then guide you through the provider’s booking steps.',
    href: '/how-it-works',
    link: 'See how it works',
  },
]

type Exchange = { question: string; topic: (typeof topics)[number] | undefined }

const advisorRequest = /\b(advisor|adviser|agent|human|team|contact|call back|callback)\b/i

const housingFields = [
  { name: 'city', label: 'Destination city', type: 'text', maxLength: 120 },
  { name: 'moveIn', label: 'Move-in date or month', type: 'text', maxLength: 120 },
  { name: 'budget', label: 'Budget, currency and period', type: 'text', maxLength: 120 },
] as const

const contactFields = [
  { name: 'firstName', label: 'First name', type: 'text', maxLength: 120, autoComplete: 'given-name' },
  { name: 'email', label: 'Email', type: 'email', maxLength: 254, autoComplete: 'email' },
  { name: 'phone', label: 'Phone or WhatsApp with country code', type: 'tel', maxLength: 30, autoComplete: 'tel' },
] as const

const inputStyle = 'w-full rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-base text-[#1A1A1A] focus-visible:outline-2 focus-visible:outline-[#01329C]'

export function HousingChat() {
  const pathname = usePathname()

  if (/^\/(?:account|team|auth|sign-in|sign-up|forgot-password|reset-password|get-matched)(?:\/|$)/.test(pathname)) {
    return null
  }

  return <ChatWidget key={pathname} />
}

function ChatWidget() {
  const dialog = useRef<HTMLDialogElement>(null)
  const launcher = useRef<HTMLButtonElement>(null)
  const latestReply = useRef<HTMLDivElement>(null)
  const inFlight = useRef(false)
  const [question, setQuestion] = useState('')
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const [mode, setMode] = useState<'chat' | 'enquiry' | 'contact' | 'sent'>('chat')
  const [housingDetails, setHousingDetails] = useState({ city: '', moveIn: '', budget: '' })

  function startEnquiry() {
    track('housing_chat_shortlist_started')
    setMode('enquiry')
  }

  function saveHousingDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const details = {
      city: String(fields.get('city') ?? '').trim(),
      moveIn: String(fields.get('moveIn') ?? '').trim(),
      budget: String(fields.get('budget') ?? '').trim(),
    }
    if (!details.city) {
      setError('Enter the city where you need a room.')
      return
    }
    setError('')
    setHousingDetails(details)
    track('housing_chat_contact_step')
    setMode('contact')
  }
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (exchanges.length && mode === 'chat') latestReply.current?.scrollIntoView({ block: 'nearest' })
  }, [exchanges, mode])

  function ask(value: string, selectedTopic?: Exchange['topic']) {
    const nextQuestion = value.trim()
    if (!nextQuestion) return
    // Prefer specific pricing or booking questions over generic room words.
    const topic = selectedTopic ?? [topics[1], topics[2], topics[0]].find((item) => item.pattern.test(nextQuestion))
    setExchanges((previous) => [...previous.slice(-9), { question: nextQuestion, topic }])
    setQuestion('')
    if (!selectedTopic && advisorRequest.test(nextQuestion)) startEnquiry()
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return
    const fields = new FormData(event.currentTarget)
    const read = (name: string) => String(fields.get(name) ?? '').trim()
    const lead = Object.fromEntries(contactFields.map(({ name }) => [name, read(name)]))
    const phone = read('phone')
    if (Object.values(lead).some((value) => !value)
      || !/^[+\d][\d\s().-]*$/.test(phone)
      || phone.replace(/\D/g, '').length < 7) {
      setError('Please check your housing details and phone number.')
      return
    }

    inFlight.current = true
    setSending(true)
    setError('')
    const questions = [...new Set(exchanges.slice(-4).map((entry) => entry.question))].join('\n')
    try {
      const response = await fetch('/api/get-matched', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...housingDetails,
          ...lead,
          source: 'housing-chat',
          lastName: '',
          intent: 'shortlisting',
          country: '',
          university: '',
          duration: '',
          accommodation: '',
          priorities: [],
          companyWebsite: read('companyWebsite'),
          message: questions ? `Website housing chat. Recent questions:\n${questions}` : 'Website housing chat. Requested advisor follow-up.',
        }),
      })
      if (!response.ok) throw new Error('Enquiry failed')
      track('housing_chat_enquiry_sent')
      setMode('sent')
      setExchanges([])
      setHousingDetails({ city: '', moveIn: '', budget: '' })
    } catch {
      setError('We could not send your enquiry. Please try again.')
    } finally {
      setSending(false)
      inFlight.current = false
    }
  }

  return (
    <>
      <button
        ref={launcher}
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          dialog.current?.showModal()
          track('housing_chat_opened')
        }}
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex min-h-16 items-center gap-3 rounded-full border-2 border-[#1A1A1A] bg-[#FEBB01] py-2 pr-5 pl-2 text-left text-[#1A1A1A] shadow-xl transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01329C] sm:right-6"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#01329C] text-white">
          <MessageCircle aria-hidden="true" className="size-6" />
        </span>
        <span className="text-base font-extrabold">Chat for housing help</span>
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="housing-chat-title"
        onClose={() => launcher.current?.focus()}
        className="fixed inset-auto right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] m-0 w-[calc(100%_-_1.5rem)] max-w-[26rem] overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white text-[#1A1A1A] shadow-2xl backdrop:bg-black/25 sm:right-6"
      >
        <div className="flex max-h-[calc(100dvh_-_2rem)] flex-col sm:max-h-[min(42rem,85dvh)]">
          <header className="flex shrink-0 items-center gap-3 border-b border-[#E8E6E1] bg-white px-4 py-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#FEBB01] text-[#1A1A1A]">
              <MessageCircle aria-hidden="true" className="size-5" />
            </span>
            <h2 id="housing-chat-title" className="flex-1 font-extrabold">HearthAway housing chat</h2>
            <button type="button" aria-label="Close housing chat" className="grid min-h-11 min-w-11 place-items-center rounded-full hover:bg-[#F7F6F3] focus-visible:outline-2 focus-visible:outline-[#01329C]" onClick={() => dialog.current?.close()}>
              <X aria-hidden="true" className="size-5" />
            </button>
          </header>
          {mode === 'chat' && (
            <div className="flex min-h-0 flex-col">
              <div className="min-h-0 space-y-4 overflow-y-auto overscroll-contain bg-white p-4 text-sm">
                <div className="max-w-[92%] space-y-2 rounded-2xl rounded-tl-sm bg-[#F7F6F3] px-4 py-3 leading-relaxed">
                  <p className="font-bold">Hi! Looking for a student room?</p>
                  <p>Tell me where you’re moving and what you can spend. A HearthAway advisor can help you shortlist rooms that fit.</p>
                </div>
                <div className="flex flex-wrap gap-2" aria-label="Quick replies" role="group">
                  <Button type="button" className="min-h-10 rounded-full border-[#1A1A1A] bg-[#FEBB01] px-4 font-bold text-[#1A1A1A] hover:bg-white" onClick={startEnquiry}>Get my room shortlist</Button>
                  {topics.slice(1).map((topic) => (
                    <Button key={topic.label} type="button" variant="outline" className="min-h-10 rounded-full px-3 text-[#01329C]" onClick={() => ask(topic.label, topic)}>{topic.label}</Button>
                  ))}
                </div>
                <div role="log" aria-label="Housing conversation" className="space-y-3 empty:hidden">
                  {exchanges.map(({ question, topic }, index) => (
                    <div key={index} ref={index === exchanges.length - 1 ? latestReply : undefined} className="space-y-3">
                      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-[#01329C] px-4 py-2.5 text-white [overflow-wrap:anywhere]">{question}</p>
                      <div className="w-fit max-w-[92%] rounded-2xl rounded-tl-sm bg-[#F7F6F3] px-4 py-3 leading-relaxed">
                        <p>{topic?.answer ?? 'A HearthAway advisor can help with that. Request a shortlist and we’ll include your question.'}</p>
                        {topic && <Link href={topic.href} className="mt-1 inline-block font-semibold text-[#01329C] underline">{topic.link}</Link>}
                      </div>
                      {index === exchanges.length - 1 && (
                        <Button type="button" variant="outline" className="min-h-10 rounded-full px-3 text-[#01329C]" onClick={startEnquiry}>Talk to an advisor</Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <form className="flex shrink-0 items-center gap-2 border-t border-[#E8E6E1] bg-white p-3" onSubmit={(event) => { event.preventDefault(); ask(question) }}>
                <input aria-label="Your housing question" placeholder="Type a housing question…" className={`${inputStyle} min-w-0 rounded-full`} value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={250} />
                <Button type="submit" aria-label="Send question" size="icon" className="size-11 rounded-full bg-[#01329C] text-white" disabled={!question.trim()}>
                  <Send aria-hidden="true" className="size-5" />
                </Button>
              </form>
            </div>
          )}
          {mode !== 'chat' && (
            <div className="min-h-0 overflow-y-auto overscroll-contain p-4 text-sm">
              {mode === 'enquiry' && (
                <form key="housing-details" onSubmit={saveHousingDetails} className="space-y-3">
                  <p className="text-lg font-bold">Where are you looking?</p>
                  {housingFields.map(({ name, label, maxLength }) => (
                    <label key={name} className="block space-y-1">
                      <span className="font-semibold">{label}{name !== 'city' && ' (optional)'}</span>
                      <input className={inputStyle} name={name} maxLength={maxLength} defaultValue={housingDetails[name]} required={name === 'city'} />
                    </label>
                  ))}
                  {error && <p role="alert" className="text-red-700">{error}</p>}
                  <div className="flex gap-2">
                    <Button type="submit">Continue</Button>
                    <Button type="button" variant="outline" onClick={() => { setError(''); setMode('chat') }}>Back</Button>
                  </div>
                </form>
              )}
              {mode === 'contact' && (
                <form key="contact" onSubmit={submitEnquiry} className="space-y-3">
                  <p className="text-lg font-bold">Where can we reach you?</p>
                  <p>A HearthAway advisor can follow up on your room search in {housingDetails.city}.</p>
                  {contactFields.map((field) => (
                    <label key={field.name} className="block space-y-1">
                      <span className="font-semibold">{field.label}</span>
                      <input className={inputStyle} name={field.name} type={field.type} maxLength={field.maxLength} autoComplete={field.autoComplete} required />
                    </label>
                  ))}
                  <input type="text" name="companyWebsite" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <p className="text-xs">By sending this enquiry, you’re asking HearthAway to contact you.{exchanges.length > 0 && ' We’ll include your recent questions.'} <Link href="/privacy" className="text-[#01329C] underline">Privacy policy</Link></p>
                  {error && <p role="alert" className="text-red-700">{error}</p>}
                  <div className="flex gap-2">
                    <Button type="submit" disabled={sending}>{sending ? 'Sending…' : 'Request my shortlist'}</Button>
                    <Button type="button" variant="outline" disabled={sending} onClick={() => { setError(''); setMode('enquiry') }}>Back</Button>
                  </div>
                </form>
              )}
              {mode === 'sent' && (
                <>
                  <p role="status">Your shortlist request is in. A HearthAway advisor can follow up using the contact details you shared.</p>
                  <Button type="button" variant="outline" onClick={() => setMode('chat')}>Back to chat</Button>
                </>
              )}
            </div>
          )}
        </div>
      </dialog>
    </>
  )
}
