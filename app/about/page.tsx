import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About',
  description:
    '1023 Studios is a cultural platform documenting contemporary artistic life in Nairobi and beyond.',
}

type AboutData = {
  mainText?: PortableTextBlock[]
  practiceAreas?: string[]
  collaborators?: string[]
  team?: Array<{
    name: string
    role: string
    portrait?: { asset: { _ref: string } }
  }>
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 last:mb-0">{children}</p>
    ),
  },
  marks: {
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic font-serif">{children}</em>
    ),
  },
}

export default async function AboutPage() {
  const about: AboutData = await client.fetch(ABOUT_PAGE_QUERY)

  return (
    <article className="px-6 md:px-14 pt-16 md:pt-24 pb-24">
      {/* Top label */}
      <div className="meta-muted mb-6 md:mb-8">— About</div>

      {/* Display heading */}
      <h1 className="display text-[2.5rem] sm:text-5xl md:text-7xl max-w-4xl">
        A practice <em className="italic font-light">of</em>
        <br />
        paying attention.
      </h1>

      {/* ── STATEMENT ──────────────────────────────────────── */}
      {about?.mainText && (
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="hidden md:block md:col-span-2">
            <div className="meta">Statement</div>
          </div>
          <div className="md:col-span-8 text-base md:text-lg leading-[1.85]">
            <PortableText value={about.mainText} components={portableTextComponents} />
          </div>
        </div>
      )}

      {/* ── PRACTICE AREAS ─────────────────────────────────── */}
      {about?.practiceAreas && about.practiceAreas.length > 0 && (
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 pt-16 border-t border-rule">
          <div className="md:col-span-2">
            <div className="meta">Practice</div>
          </div>
          <div className="md:col-span-8">
            <ul className="space-y-4">
              {about.practiceAreas.map((area, i) => (
                <li
                  key={area}
                  className="font-serif text-2xl md:text-3xl font-light leading-tight flex items-baseline gap-4"
                >
                  <span className="meta-muted shrink-0 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── TEAM ───────────────────────────────────────────── */}
      {about?.team && about.team.length > 0 && (
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 pt-16 border-t border-rule">
          <div className="md:col-span-2">
            <div className="meta">Team</div>
          </div>
          <div className="md:col-span-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {about.team.map((person) => (
                <div key={person.name}>
                  {person.portrait && (
                    <div className="relative w-full aspect-[4/5] mb-4 bg-ink/5 overflow-hidden">
                      <Image
                        src={urlFor(person.portrait)
                          .width(600)
                          .quality(85)
                          .auto('format')
                          .url()}
                        alt={person.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="font-serif text-xl">{person.name}</div>
                  <div className="meta-muted mt-1">{person.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── COLLABORATORS ──────────────────────────────────── */}
      {about?.collaborators && about.collaborators.length > 0 && (
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 pt-16 border-t border-rule">
          <div className="md:col-span-2">
            <div className="meta">Selected collaborators</div>
          </div>
          <div className="md:col-span-8">
            <p className="text-base md:text-lg leading-[1.85] text-ink-soft">
              {about.collaborators.join(' · ')}
            </p>
          </div>
        </div>
      )}
    </article>
  )
}
