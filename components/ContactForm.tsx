'use client'

import { useState } from 'react'

const INQUIRY_TYPES = ['Commission', 'Collaboration', 'Press / Interview', 'Other']

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm({ recipientEmail }: { recipientEmail: string }) {
  const [state, setState] = useState<FormState>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0])
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, inquiryType, message, recipientEmail }),
      })

      if (!res.ok) throw new Error('Failed to send')

      setState('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="py-12">
        <p className="font-serif text-2xl md:text-3xl font-light leading-tight">
          Thank you. <em className="italic">We&apos;ll be in touch.</em>
        </p>
        <p className="mt-6 text-sm leading-relaxed text-dust max-w-md">
          Your message has been received. We typically respond within two working days.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-transparent border-b border-ink/30 focus:border-ink py-2 outline-none transition-colors text-base'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name */}
      <div>
        <label htmlFor="name" className="meta-muted block mb-2">Name</label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="meta-muted block mb-2">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Inquiry type chips */}
      <div>
        <label className="meta-muted block mb-3">Nature of inquiry</label>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setInquiryType(type)}
              className={[
                'px-4 py-2 text-[10px] tracking-meta uppercase border transition-colors',
                inquiryType === type
                  ? 'bg-ink text-paper border-ink'
                  : 'border-rule hover:border-ink text-dust hover:text-ink',
              ].join(' ')}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="meta-muted block mb-2">Message</label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="meta border border-ink px-8 py-4 hover:bg-ink hover:text-paper transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          {state === 'submitting' ? 'Sending…' : 'Send message →'}
        </button>

        {state === 'error' && (
          <p className="meta-muted mt-4" style={{ color: 'var(--color-terracotta)' }}>
            Something went wrong. Please try emailing us directly.
          </p>
        )}
      </div>
    </form>
  )
}
