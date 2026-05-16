import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { INITIATIVES_LIST_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Ongoing initiatives, long-form documentation projects, and collaborations.',
}

type Initiative = {
  _id: string
  title: string
  slug: string
  status: 'ongoing' | 'forthcoming' | 'completed'
  startYear: number
  summary?: string
}

const STATUS_LABELS: Record<string, string> = {
  ongoing: 'Ongoing',
  forthcoming: 'Forthcoming',
  completed: 'Completed',
}

export default async function ProjectsPage() {
  const initiatives: Initiative[] = await client.fetch(INITIATIVES_LIST_QUERY)

  return (
    <article className="px-6 md:px-14 pt-16 md:pt-24 pb-24">
      {/* Top label */}
      <div className="meta-muted mb-6 md:mb-8">— Projects</div>

      {/* Display heading */}
      <h1 className="display text-[2.5rem] sm:text-5xl md:text-7xl max-w-4xl">
        Ongoing
        <br />
        <em className="italic font-light">initiatives.</em>
      </h1>

      {/* Intro */}
      <p className="mt-10 md:mt-12 text-base md:text-lg leading-[1.75] max-w-xl">
        Long-form documentation projects, collaborations, and platforms we are
        building — together with artists, curators, and institutions.
      </p>

      {/* ── INITIATIVES LIST ──────────────────────────────── */}
      <div className="mt-20 md:mt-28 border-t border-ink">
        {initiatives && initiatives.length > 0 ? (
          initiatives.map((initiative, i) => (
            <Link
              key={initiative._id}
              href={`/projects/${initiative.slug}`}
              className="group block py-10 md:py-12 border-b border-rule hover:bg-ink/[0.02] transition-colors -mx-6 px-6 md:-mx-14 md:px-14"
            >
              <div className="grid grid-cols-12 gap-4 md:gap-8 items-baseline">
                {/* Number */}
                <div className="col-span-12 md:col-span-1">
                  <span className="meta-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title + summary */}
                <div className="col-span-12 md:col-span-7">
                  <h2 className="font-serif text-2xl md:text-4xl font-light leading-tight">
                    {initiative.title}
                  </h2>
                  {initiative.summary && (
                    <p className="mt-4 text-sm md:text-base leading-[1.7] text-ink-soft max-w-2xl">
                      {initiative.summary}
                    </p>
                  )}
                </div>

                {/* Status + year */}
                <div className="col-span-12 md:col-span-3 mt-4 md:mt-0">
                  <div className="meta">
                    {STATUS_LABELS[initiative.status] ?? initiative.status}
                  </div>
                  <div className="meta-muted mt-1">Since {initiative.startYear}</div>
                </div>

                {/* Arrow */}
                <div className="col-span-12 md:col-span-1 mt-4 md:mt-0 md:text-right">
                  <span className="meta-muted group-hover:text-ink transition-colors">→</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-24 md:py-32">
            <p className="font-serif text-2xl md:text-3xl font-light italic text-dust max-w-xl">
              Initiatives forthcoming.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-dust max-w-md">
              We are developing several long-form projects. Details will be
              published here as they take shape.
            </p>
          </div>
        )}
      </div>
    </article>
  )
}
