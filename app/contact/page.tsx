import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries'
import ContactForm from '@/components/ContactForm'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact',
  description: 'For commissions, collaborations, or general inquiries.',
}

type ContactData = {
  intro?: string
  email: string
  phone?: string
  instagram?: string
  location?: string
}

export default async function ContactPage() {
  const contact: ContactData = await client.fetch(CONTACT_PAGE_QUERY)

  return (
    <article className="px-6 md:px-14 pt-16 md:pt-24 pb-24">
      {/* Top label */}
      <div className="meta-muted mb-6 md:mb-8">— Contact</div>

      {/* Display heading */}
      <h1 className="display text-[2.5rem] sm:text-5xl md:text-7xl max-w-4xl">
        Start a<br />
        <em className="italic font-light">conversation.</em>
      </h1>

      {/* Intro paragraph */}
      {contact?.intro && (
        <p className="mt-10 md:mt-12 text-base md:text-lg leading-[1.75] max-w-xl">
          {contact.intro}
        </p>
      )}

      {/* Two-column layout */}
      <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">

        {/* ── Left: contact details ── */}
        <div className="md:col-span-5">
          <div className="meta mb-6">Direct</div>
          <div className="w-8 h-px bg-ink mb-8" />

          <dl className="space-y-8">
            <div>
              <dt className="meta-muted mb-2">Email</dt>
              <dd>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-serif text-xl md:text-2xl hover:text-terracotta transition-colors"
                >
                  {contact.email}
                </a>
              </dd>
            </div>

            {contact.phone && (
              <div>
                <dt className="meta-muted mb-2">Phone</dt>
                <dd className="font-serif text-xl md:text-2xl">{contact.phone}</dd>
              </div>
            )}

            {contact.instagram && (
              <div>
                <dt className="meta-muted mb-2">Instagram</dt>
                <dd>
                  <a
                    href={`https://instagram.com/${contact.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-xl md:text-2xl hover:text-terracotta transition-colors"
                  >
                    @{contact.instagram}
                  </a>
                </dd>
              </div>
            )}

            {contact.location && (
              <div>
                <dt className="meta-muted mb-2">Studio</dt>
                <dd className="font-serif text-xl md:text-2xl">{contact.location}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* ── Right: form ── */}
        <div className="md:col-span-7 md:border-l md:border-rule md:pl-20">
          <div className="meta mb-6">Or write to us</div>
          <div className="w-8 h-px bg-ink mb-8" />
          <ContactForm recipientEmail={contact.email} />
        </div>
      </div>
    </article>
  )
}
