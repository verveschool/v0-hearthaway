'use client'

import { FormEvent, KeyboardEvent, useRef, useState } from 'react'
import { X } from 'lucide-react'

type EnquiryType = 'virtual-tour' | 'get-matched'

type PropertyEnquiryModalProps = {
  propertyName: string
}

export default function PropertyEnquiryModal({ propertyName }: PropertyEnquiryModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [enquiryType, setEnquiryType] = useState<EnquiryType>('get-matched')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function openEnquiry(type: EnquiryType) {
    setEnquiryType(type)
    setError('')
    setSubmitted(false)
    dialogRef.current?.showModal()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)) {
      event.preventDefault()
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const [firstName = '', ...lastNameParts] = name.split(/\s+/)
    const lastName = lastNameParts.join(' ')
    const phone = String(formData.get('phone') ?? '').trim()

    try {
      const response = await fetch('/api/get-matched', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, phone, propertyName, enquiryType }),
      })

      if (!response.ok) throw new Error('submission failed')
      setSubmitted(true)
    } catch {
      setError('We could not send your enquiry just now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const title = enquiryType === 'virtual-tour' ? 'Book a free virtual tour' : 'Get matched'

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => openEnquiry('virtual-tour')}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[#FCC20A] px-5 py-3 text-sm font-bold text-[#1A1A1A] transition-colors hover:bg-[#f5b900] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2"
        >
          Book a Free Virtual Tour
        </button>
        <button
          type="button"
          onClick={() => openEnquiry('get-matched')}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00319D]"
        >
          Get Matched
        </button>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setError('')}
        aria-labelledby="property-enquiry-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border-0 bg-white p-0 text-[#1A1A1A] shadow-2xl backdrop:bg-black/60"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E8E6E1] px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#00319D]">HearthAway enquiry</p>
            <h2 id="property-enquiry-title" className="mt-2 font-heading text-2xl font-extrabold">{title}</h2>
            <p className="mt-1 text-sm text-[#6B6860]">About {propertyName}</p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-lg p-2 text-[#6B6860] hover:bg-[#F7F6F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
            aria-label="Close enquiry form"
          >
            <X aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-8" role="status">
            <h3 className="font-heading text-xl font-extrabold">Thanks, we have your details.</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">A HearthAway advisor will be in touch about {propertyName}.</p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#00319D] px-5 py-3 text-sm font-bold text-white hover:bg-[#00277D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="flex flex-col gap-5 px-6 py-6">
            <p className="text-sm leading-relaxed text-[#6B6860]">Share your name and phone number. We will contact you about this property.</p>
            <label className="flex flex-col gap-2 text-sm font-semibold">
              <span>Your name</span>
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                className="min-h-12 rounded-xl border border-[#D8D5CE] bg-white px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold">
              <span>Phone number</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                required
                minLength={7}
                maxLength={30}
                pattern="[+0-9][0-9+(). -]{5,29}"
                title="Enter a phone number with at least 7 characters, using numbers and common phone symbols."
                className="min-h-12 rounded-xl border border-[#D8D5CE] bg-white px-4 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-[#00319D]"
              />
            </label>
            {error ? <p role="alert" className="text-sm font-medium text-red-700">{error}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#00319D] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00277D] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2"
            >
              {isSubmitting ? 'Sending…' : 'Send enquiry'}
            </button>
            <p className="text-xs leading-relaxed text-[#6B6860]">Your details will be used by HearthAway to respond to this enquiry.</p>
          </form>
        )}
      </dialog>
    </>
  )
}
