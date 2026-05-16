import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PROJECT_BY_SLUG_QUERY, ALL_PROJECT_SLUGS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

type GalleryItem = {
  image: { asset: { _ref: string }; alt: string }
  caption?: string
  layout: 'full' | 'pair-left' | 'pair-right' | 'centered'
}

type Project = {
  _id: string
  projectNumber: number
  title: string
  subtitle?: string
  venue: string
  dateDisplay: string
  format?: string
  participants?: string[]
  heroImage: { asset: { _ref: string }; alt: string; caption?: string }
  contextNote?: PortableTextBlock[]
  gallery?: GalleryItem[]
  next?: { title: string; slug: string; projectNumber: number }
}

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(ALL_PROJECT_SLUGS_QUERY)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project: Project | null = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })
  if (!project) return { title: 'Not found' }
  return {
    title: `${project.title}${project.subtitle ? ' ' + project.subtitle : ''}`,
    description: project.venue,
  }
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 last:mb-0 leading-[1.85]">{children}</p>
    ),
  },
  marks: {
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic font-serif">{children}</em>
    ),
  },
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project: Project | null = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })

  if (!project) notFound()

  const galleryBlocks = groupGallery(project.gallery ?? [])

  return (
    <article className="pb-24">
      {/* ── BREADCRUMB ─────────────────────────────────────── */}
      <div className="px-6 md:px-14 pt-8 md:pt-12 pb-4">
        <Link href="/archive" className="meta-muted hover:text-ink transition-colors">
          ← Archive / {String(project.projectNumber).padStart(3, '0')}
        </Link>
      </div>

      {/* ── TITLE BLOCK ────────────────────────────────────── */}
      <header className="px-6 md:px-14 pt-8 md:pt-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
          <div className="md:col-span-7">
            <h1 className="display text-[2.5rem] sm:text-5xl md:text-7xl">
              {project.title}
            </h1>
            {project.subtitle && (
              <h2 className="font-serif italic font-light text-2xl md:text-4xl text-dust mt-2">
                {project.subtitle}
              </h2>
            )}
          </div>

          <div className="md:col-span-5 md:pb-2">
            <div className="w-8 h-px bg-ink mb-5" />
            <dl className="space-y-4">
              <div>
                <dt className="meta-muted mb-1">Venue</dt>
                <dd className="text-base">{project.venue}</dd>
              </div>
              <div>
                <dt className="meta-muted mb-1">Date</dt>
                <dd className="text-base">{project.dateDisplay}</dd>
              </div>
              {project.format && (
                <div>
                  <dt className="meta-muted mb-1">Format</dt>
                  <dd className="text-base">{project.format}</dd>
                </div>
              )}
              {project.participants && project.participants.length > 0 && (
                <div>
                  <dt className="meta-muted mb-1">
                    {project.participants.length === 1 ? 'Artist' : 'Participants'}
                  </dt>
                  <dd className="text-base">{project.participants.join(', ')}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </header>

      {/* ── HERO IMAGE ─────────────────────────────────────── */}
      <section className="px-6 md:px-14 mb-20 md:mb-28">
        <div className="relative w-full aspect-[3/2] bg-ink/5 overflow-hidden">
          <Image
            src={urlFor(project.heroImage).width(2400).quality(85).auto('format').url()}
            alt={project.heroImage.alt ?? project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
          />
        </div>
        {project.heroImage.caption && (
          <div className="meta-muted mt-3">{project.heroImage.caption}</div>
        )}
      </section>

      {/* ── CONTEXT NOTE ───────────────────────────────────── */}
      {project.contextNote && (
        <section className="px-6 md:px-14 mb-20 md:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-2">
              <div className="meta">Context</div>
            </div>
            <div className="md:col-span-7 text-base md:text-lg leading-[1.8]">
              <PortableText value={project.contextNote} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* ── GALLERY ────────────────────────────────────────── */}
      {galleryBlocks.length > 0 && (
        <section className="space-y-16 md:space-y-24">
          {galleryBlocks.map((block, i) => (
            <GalleryBlock key={i} block={block} />
          ))}
        </section>
      )}

      {/* ── NEXT PROJECT ───────────────────────────────────── */}
      {project.next && (
        <section className="mt-24 md:mt-32 pt-12 md:pt-16 border-t border-rule px-6 md:px-14">
          <Link
            href={`/archive/${project.next.slug}`}
            className="group flex justify-between items-baseline gap-6 hover:opacity-80 transition-opacity"
          >
            <div>
              <div className="meta-muted mb-2">Next in archive</div>
              <div className="font-serif text-2xl md:text-4xl font-light leading-tight">
                {project.next.title}{' '}
                <span className="text-dust">→</span>
              </div>
            </div>
            <div className="meta-muted shrink-0">
              {String(project.next.projectNumber).padStart(3, '0')}
            </div>
          </Link>
        </section>
      )}
    </article>
  )
}

// =================================================================
// GALLERY LAYOUT HELPERS
// =================================================================

type GalleryBlockType =
  | { type: 'single'; item: GalleryItem; layout: 'full' | 'centered' }
  | { type: 'pair'; left: GalleryItem; right: GalleryItem }

function groupGallery(items: GalleryItem[]): GalleryBlockType[] {
  const blocks: GalleryBlockType[] = []
  let i = 0

  while (i < items.length) {
    const current = items[i]

    if (current.layout === 'pair-left') {
      const next = items[i + 1]
      if (next?.layout === 'pair-right') {
        blocks.push({ type: 'pair', left: current, right: next })
        i += 2
        continue
      }
      // Unpaired — fall through to full
      blocks.push({ type: 'single', item: current, layout: 'full' })
      i++
      continue
    }

    if (current.layout === 'pair-right') {
      // Orphaned right — treat as full
      blocks.push({ type: 'single', item: current, layout: 'full' })
      i++
      continue
    }

    blocks.push({ type: 'single', item: current, layout: current.layout })
    i++
  }

  return blocks
}

function GalleryBlock({ block }: { block: GalleryBlockType }) {
  if (block.type === 'pair') {
    return (
      <div className="px-6 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left — portrait, 5 cols */}
          <figure className="md:col-span-5">
            <div className="relative w-full aspect-[3/4] bg-ink/5 overflow-hidden">
              <Image
                src={urlFor(block.left.image).width(1200).quality(85).auto('format').url()}
                alt={block.left.image.alt ?? ''}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            {block.left.caption && (
              <figcaption className="meta-muted mt-3">{block.left.caption}</figcaption>
            )}
          </figure>

          {/* Right — nudged down 64px for asymmetric rhythm, 7 cols */}
          <figure className="md:col-span-7 md:pt-16">
            <div className="relative w-full aspect-[4/5] bg-ink/5 overflow-hidden">
              <Image
                src={urlFor(block.right.image).width(1600).quality(85).auto('format').url()}
                alt={block.right.image.alt ?? ''}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            {block.right.caption && (
              <figcaption className="meta-muted mt-3">{block.right.caption}</figcaption>
            )}
          </figure>
        </div>
      </div>
    )
  }

  if (block.layout === 'centered') {
    return (
      <figure className="px-6 md:px-14">
        <div className="max-w-3xl mx-auto">
          <div className="relative w-full aspect-[4/5] bg-ink/5 overflow-hidden">
            <Image
              src={urlFor(block.item.image).width(1600).quality(85).auto('format').url()}
              alt={block.item.image.alt ?? ''}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          {block.item.caption && (
            <figcaption className="meta-muted mt-3 text-center">
              {block.item.caption}
            </figcaption>
          )}
        </div>
      </figure>
    )
  }

  // Full width (default)
  return (
    <figure className="px-6 md:px-14">
      <div className="relative w-full aspect-[16/10] bg-ink/5 overflow-hidden">
        <Image
          src={urlFor(block.item.image).width(2400).quality(85).auto('format').url()}
          alt={block.item.image.alt ?? ''}
          fill
          sizes="(max-width: 768px) 100vw, 90vw"
          className="object-cover"
        />
      </div>
      {block.item.caption && (
        <figcaption className="meta-muted mt-3">{block.item.caption}</figcaption>
      )}
    </figure>
  )
}
