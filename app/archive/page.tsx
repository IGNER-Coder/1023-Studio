import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ARCHIVE_LIST_QUERY } from '@/sanity/lib/queries'
import ArchiveView from '@/components/ArchiveView'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Archive',
  description:
    'Documented works — exhibitions, studio visits, and cultural moments. Nairobi and beyond.',
}

export type ArchiveProject = {
  _id: string
  projectNumber: number
  title: string
  subtitle?: string
  slug: string
  category: 'exhibitions' | 'studio-visits' | 'cultural' | 'editorial'
  venue: string
  year: string
  heroImage: {
    asset: { _ref: string }
    alt: string
  }
}

export default async function ArchivePage() {
  const projects: ArchiveProject[] = await client.fetch(ARCHIVE_LIST_QUERY)

  return (
    <article className="pt-16 md:pt-24 pb-24">
      <header className="px-6 md:px-14 mb-12 md:mb-20">
        <div className="meta-muted mb-6 md:mb-8">— Archive</div>
        <h1 className="display text-[2.5rem] sm:text-5xl md:text-7xl">
          Documented works,
          <br />
          <em className="italic font-light">2023 — present.</em>
        </h1>
        <p className="mt-10 md:mt-12 text-base md:text-lg leading-[1.75] max-w-xl">
          An evolving record of exhibitions, studio visits, performances, and
          cultural moments — Nairobi and beyond.
        </p>
      </header>

      <ArchiveView projects={projects} />
    </article>
  )
}
