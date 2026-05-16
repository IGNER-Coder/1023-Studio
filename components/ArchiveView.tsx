'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { ArchiveProject } from '@/app/archive/page'

type Category = 'all' | 'exhibitions' | 'studio-visits' | 'cultural' | 'editorial'
type ViewMode = 'index' | 'grid'

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'exhibitions', label: 'Exhibitions' },
  { value: 'studio-visits', label: 'Studio Visits' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'editorial', label: 'Editorial' },
]

export default function ArchiveView({ projects }: { projects: ArchiveProject[] }) {
  const [category, setCategory] = useState<Category>('all')
  const [view, setView] = useState<ViewMode>('index')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = useMemo(
    () => (category === 'all' ? projects : projects.filter((p) => p.category === category)),
    [projects, category],
  )

  return (
    <>
      {/* ── FILTER + VIEW TOGGLE ─────────────────────────── */}
      <div className="px-6 md:px-14 border-t border-b border-ink py-4 md:py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Categories — horizontally scrollable on mobile */}
          <div className="flex gap-6 md:gap-8 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={[
                  'meta whitespace-nowrap pb-1 border-b transition-colors',
                  category === cat.value
                    ? 'text-ink border-ink'
                    : 'text-dust border-transparent hover:text-ink',
                ].join(' ')}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="inline-flex border border-ink self-end md:self-auto shrink-0">
            {(['index', 'grid'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={[
                  'meta px-4 py-2 capitalize transition-colors',
                  view === v ? 'bg-ink text-paper' : 'text-ink hover:bg-ink/5',
                ].join(' ')}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── COUNT ────────────────────────────────────────── */}
      <div className="px-6 md:px-14 pt-6 pb-2">
        <div className="meta-muted">
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
        </div>
      </div>

      {/* ── EMPTY STATE ──────────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="px-6 md:px-14 py-24 md:py-32 text-center">
          <p className="font-serif text-2xl md:text-3xl font-light italic text-dust">
            No entries in this category yet.
          </p>
        </div>
      )}

      {/* ── INDEX VIEW ───────────────────────────────────── */}
      {view === 'index' && filtered.length > 0 && (
        <div className="px-6 md:px-14 mt-4">
          {filtered.map((project) => (
            <Link
              key={project._id}
              href={`/archive/${project.slug}`}
              onMouseEnter={() => setHoveredId(project._id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group block border-b border-rule py-5 md:py-6 -mx-6 px-6 md:-mx-14 md:px-14 hover:bg-ink/[0.02] transition-colors"
            >
              <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="meta-muted">
                    {String(project.projectNumber).padStart(3, '0')}
                  </span>
                </div>

                {/* Thumbnail + title */}
                <div className="col-span-10 md:col-span-7 flex items-center gap-4 md:gap-6">
                  {/* Hover-reveal thumbnail — desktop only */}
                  <div
                    className={[
                      'hidden md:block relative w-20 h-24 bg-ink/5 shrink-0 transition-opacity duration-300',
                      hoveredId === project._id ? 'opacity-100' : 'opacity-0',
                    ].join(' ')}
                  >
                    <Image
                      src={urlFor(project.heroImage)
                        .width(200)
                        .quality(80)
                        .auto('format')
                        .url()}
                      alt={project.heroImage.alt ?? project.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-serif text-lg md:text-2xl font-normal leading-tight">
                      {project.title}
                      {project.subtitle && (
                        <em className="italic text-dust font-light"> {project.subtitle}</em>
                      )}
                    </h2>
                    <div className="md:hidden meta-muted mt-2">{project.venue}</div>
                  </div>
                </div>

                {/* Venue — desktop */}
                <div className="hidden md:block md:col-span-3 meta-muted truncate">
                  {project.venue}
                </div>

                {/* Year — desktop */}
                <div className="hidden md:block md:col-span-1 meta-muted text-right">
                  {project.year}
                </div>

                {/* Year — mobile */}
                <div className="md:hidden col-span-12 meta-muted -mt-2">{project.year}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ── GRID VIEW ────────────────────────────────────── */}
      {view === 'grid' && filtered.length > 0 && (
        <div className="px-6 md:px-14 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {filtered.map((project) => (
              <Link
                key={project._id}
                href={`/archive/${project.slug}`}
                className="group block"
              >
                <div className="relative w-full aspect-[4/5] bg-ink/5 overflow-hidden">
                  <Image
                    src={urlFor(project.heroImage)
                      .width(800)
                      .quality(85)
                      .auto('format')
                      .url()}
                    alt={project.heroImage.alt ?? project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-opacity duration-500 group-hover:opacity-90"
                  />
                  <div className="absolute top-3 left-3 meta text-paper bg-ink/40 px-2 py-1 backdrop-blur-sm">
                    {String(project.projectNumber).padStart(3, '0')}
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="font-serif text-lg md:text-xl font-normal leading-tight">
                    {project.title}
                    {project.subtitle && (
                      <em className="italic text-dust font-light"> {project.subtitle}</em>
                    )}
                  </h2>
                  <div className="meta-muted mt-2">
                    {project.venue} · {project.year}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
