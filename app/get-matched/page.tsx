'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const countries = ['United Kingdom', 'Ireland', 'Australia']

const ukCities = ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Leeds', 'Sheffield', 'Newcastle', 'Nottingham', 'Liverpool']
const irelandCities = ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford']
const australiaCities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra']

const budgetRanges = [
  { label: 'Up to £500 / mo', value: 'under-500' },
  { label: '£500 – £800 / mo', value: '500-800' },
  { label: '£800 – £1,200 / mo', value: '800-1200' },
  { label: '£1,200+ / mo', value: 'over-1200' },
]

const accommodationPrefs = [
  { label: 'Student Halls', desc: 'Social, all-inclusive, campus-based', value: 'halls' },
  { label: 'Shared House', desc: 'Rooms in a shared house with other students', value: 'shared' },
  { label: 'Studio Apartment', desc: 'Private, self-contained space', value: 'studio' },
  { label: 'Homestay', desc: 'Live with a local family', value: 'homestay' },
  { label: 'Not sure yet', desc: "Help me decide", value: 'unsure' },
]

const priorities = [
  'Close to university', 'Bills included', 'Fast internet', 'Quiet / study-focused',
  'Social environment', 'En-suite bathroom', 'Gym / facilities', 'Good transport links',
]

type FormData = {
  country: string
  city: string
  university: string
  moveIn: string
  duration: string
  budget: string
  accommodation: string
  priorities: string[]
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const TOTAL_STEPS = 4

export default function GetMatchedPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    country: '',
    city: '',
    university: '',
    moveIn: '',
    duration: '',
    budget: '',
    accommodation: '',
    priorities: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  const cities =
    form.country === 'United Kingdom' ? ukCities :
    form.country === 'Ireland' ? irelandCities :
    form.country === 'Australia' ? australiaCities : []

  const togglePriority = (p: string) => {
    setForm((f) => ({
      ...f,
      priorities: f.priorities.includes(p)
        ? f.priorities.filter((x) => x !== p)
        : [...f.priorities, p],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100

  if (submitted) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-[#F7F6F3] flex items-center justify-center pt-20 pb-20 px-6">
          <div className="max-w-lg w-full text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFCC00] flex items-center justify-center mx-auto mb-8">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M5 14L11 20L23 8" stroke="#1B365D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="font-heading text-4xl font-bold text-[#1A1A1A] mb-4">
              {"You're all set, "}{form.firstName}.
            </h1>
            <p className="text-[#6B6860] text-lg leading-relaxed mb-8">
              {"We've received your details and one of our accommodation advisors will be in touch within 24 hours with personalised options near "}
              {form.university || form.city}.
            </p>
            <div className="bg-white rounded-2xl p-6 border border-[#E8E6E1] text-left mb-8">
              <h3 className="font-heading font-bold text-[#1A1A1A] mb-4">{"What happens next"}</h3>
              <div className="flex flex-col gap-4">
                {[
                  { step: '1', text: 'Our team reviews your requirements' },
                  { step: '2', text: 'We shortlist verified properties that match your needs' },
                  { step: '3', text: "You'll receive a personalised selection within 24 hours" },
                  { step: '4', text: "We're here to answer questions and help you decide" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#1B365D] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <p className="text-[#1A1A1A] text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#6B6860] text-sm">
              {"Check your inbox at "}<strong>{form.email}</strong>{". We'll be in touch shortly."}
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F6F3] pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B365D]/8 border border-[#1B365D]/15 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#FFCC00]" aria-hidden="true" />
              <span className="text-[#1B365D] text-sm font-medium">Free matching process</span>
            </div>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-[#1A1A1A] text-balance mb-4">
              {"Let's find your home."}
            </h1>
            <p className="text-[#6B6860] text-lg">
              {"Tell us about your situation and we'll match you with the right accommodation."}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#6B6860]">Step {step} of {TOTAL_STEPS}</span>
              <span className="text-xs font-medium text-[#1B365D]">{Math.round(progress)}% complete</span>
            </div>
            <div className="h-1.5 bg-[#E8E6E1] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFCC00] rounded-full transition-all duration-500"
                style={{ width: `${progress + (100 / (TOTAL_STEPS - 1))}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl border border-[#E8E6E1] p-8 shadow-sm">

              {/* Step 1: Destination */}
              {step === 1 && (
                <div>
                  <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-2">Where are you heading?</h2>
                  <p className="text-[#6B6860] mb-7">{"Tell us your destination and we'll focus on what's available there."}</p>

                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Country</label>
                      <div className="grid grid-cols-3 gap-3">
                        {countries.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, country: c, city: '' }))}
                            className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                              form.country === c
                                ? 'border-[#1B365D] bg-[#1B365D] text-white'
                                : 'border-[#E8E6E1] text-[#6B6860] hover:border-[#1B365D]/40'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {form.country && (
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">City</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {cities.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setForm((f) => ({ ...f, city: c }))}
                              className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                                form.city === c
                                  ? 'border-[#1B365D] bg-[#1B365D]/8 text-[#1B365D]'
                                  : 'border-[#E8E6E1] text-[#6B6860] hover:border-[#1B365D]/40'
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label htmlFor="university" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                        University <span className="text-[#6B6860] font-normal">(optional)</span>
                      </label>
                      <input
                        id="university"
                        type="text"
                        value={form.university}
                        onChange={(e) => setForm((f) => ({ ...f, university: e.target.value }))}
                        placeholder="e.g. University of Manchester"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1B365D] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Timing & Budget */}
              {step === 2 && (
                <div>
                  <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-2">Timing and budget</h2>
                  <p className="text-[#6B6860] mb-7">This helps us narrow down the right options for you.</p>

                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="move-in" className="block text-sm font-semibold text-[#1A1A1A] mb-2">Move-in date</label>
                        <input
                          id="move-in"
                          type="month"
                          value={form.moveIn}
                          onChange={(e) => setForm((f) => ({ ...f, moveIn: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1B365D] transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="duration" className="block text-sm font-semibold text-[#1A1A1A] mb-2">Duration</label>
                        <select
                          id="duration"
                          value={form.duration}
                          onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1B365D] transition-colors bg-white"
                        >
                          <option value="">Select duration</option>
                          <option value="semester">One semester</option>
                          <option value="year">One academic year</option>
                          <option value="2-years">2 years</option>
                          <option value="3-years">3+ years</option>
                          <option value="unsure">Not sure yet</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Monthly budget</label>
                      <div className="grid grid-cols-2 gap-3">
                        {budgetRanges.map((b) => (
                          <button
                            key={b.value}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, budget: b.value }))}
                            className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                              form.budget === b.value
                                ? 'border-[#1B365D] bg-[#1B365D] text-white'
                                : 'border-[#E8E6E1] text-[#6B6860] hover:border-[#1B365D]/40'
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Preferences */}
              {step === 3 && (
                <div>
                  <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-2">What matters most to you?</h2>
                  <p className="text-[#6B6860] mb-7">{"We use this to match you with accommodation that fits your life, not just your budget."}</p>

                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Type of accommodation</label>
                      <div className="flex flex-col gap-2">
                        {accommodationPrefs.map((a) => (
                          <button
                            key={a.value}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, accommodation: a.value }))}
                            className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 text-left transition-all ${
                              form.accommodation === a.value
                                ? 'border-[#1B365D] bg-[#1B365D]/5'
                                : 'border-[#E8E6E1] hover:border-[#1B365D]/40'
                            }`}
                          >
                            <div>
                              <div className={`text-sm font-semibold ${form.accommodation === a.value ? 'text-[#1B365D]' : 'text-[#1A1A1A]'}`}>
                                {a.label}
                              </div>
                              <div className="text-xs text-[#6B6860] mt-0.5">{a.desc}</div>
                            </div>
                            {form.accommodation === a.value && (
                              <div className="w-5 h-5 rounded-full bg-[#1B365D] flex items-center justify-center flex-shrink-0">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                                  <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                        Key priorities <span className="text-[#6B6860] font-normal">(select all that apply)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {priorities.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => togglePriority(p)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                              form.priorities.includes(p)
                                ? 'border-[#FFCC00] bg-[#FFCC00] text-[#1B365D]'
                                : 'border-[#E8E6E1] text-[#6B6860] hover:border-[#1B365D]/40'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact */}
              {step === 4 && (
                <div>
                  <h2 className="font-heading font-bold text-2xl text-[#1A1A1A] mb-2">{"Last step — how do we reach you?"}</h2>
                  <p className="text-[#6B6860] mb-7">{"We'll send your personalised accommodation matches directly to your inbox within 24 hours."}</p>

                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">First name</label>
                        <input
                          id="first-name"
                          type="text"
                          required
                          value={form.firstName}
                          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1B365D] transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">Last name</label>
                        <input
                          id="last-name"
                          type="text"
                          required
                          value={form.lastName}
                          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1B365D] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">Email address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1B365D] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                        Phone / WhatsApp <span className="text-[#6B6860] font-normal">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+1 234 567 8901"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1B365D] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                        Anything else we should know? <span className="text-[#6B6860] font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="e.g. I'm bringing my partner, I need parking, I'm arriving in late September..."
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1B365D] transition-colors resize-none"
                      />
                    </div>

                    <p className="text-xs text-[#6B6860]">
                      By submitting, you agree to our{' '}
                      <a href="/privacy" className="underline hover:text-[#1B365D]">privacy policy</a>. We will never share your details without your permission.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E8E6E1]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E8E6E1] text-[#6B6860] font-medium text-sm hover:border-[#1B365D]/40 hover:text-[#1A1A1A] transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={step === 1 && !form.country}
                    className="flex items-center gap-2 px-7 py-3 bg-[#1B365D] text-white font-bold rounded-xl hover:bg-[#24497D] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!form.firstName || !form.email}
                    className="flex items-center gap-2 px-7 py-3 bg-[#FFCC00] text-[#1B365D] font-bold rounded-xl hover:bg-[#E6B800] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    Get my matches
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Reassurance */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-[#6B6860]">
            {['Free to use', 'No commitment required', 'Response within 24 hours', 'Verified properties only'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6L4.5 8.5L10 3" stroke="#1B365D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
