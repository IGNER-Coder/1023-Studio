import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { INITIATIVE_BY_SLUG_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

type Initiative = {
  title: string
  status: 'ongoing' | 'forthcoming' | 'completed'
  startYear: number
  summary?: string
  body?: PortableTextBlock[]
  externalLink?: string
}

const STATUS_LABELS: Record<string, string> = {
  ongoing: 'Ongoing',
  forthcoming: 'Forthcoming',
  completed: 'Completed',
}

export async function generateStaticParams() {
  const initiatives: { slug: string }[] = await client.fetch(
    `*[_type == "initiative" && defined(slug.current)]{ "slug": slug.current }`,
  )
  return initiatives.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const initiative: Initiative | null = await client.fetch(INITIATIVE_BY_SLUG_QUERY, { slug })
  if (!initiative) return { title: 'Not found' }
  return {
    title: initiative.title,
    description: initiative.summary,
  }
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 last:mb-0 leading-[1.85]">{children}</p>
    ),
  },
  marks: {
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic font-serif">{children}</em>
    ),
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode
      value?: { href: string }
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-terracotta transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => (
      <figure className="my-12 -mx-6 md:mx-0">
        <div className="relative w-full aspect-[16/10] bg-ink/5">
          <Image
            src={urlFor(value).width(1800).quality(85).auto('format').url()}
            alt={value.alt ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
          />
        </div>
      </figure>
    ),
  },
}

export default async function InitiativePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const initiative: Initiative | null = await client.fetch(INITIATIVE_BY_SLUG_QUERY, { slug })

  if (!initiative) notFound()

  return (
    <article className="px-6 md:px-14 pt-12 md:pt-16 pb-24">
      {/* Breadcrumb */}
      <div className="mb-8 md:mb-12">
        <Link href="/projects" className="meta-muted hover:text-ink transition-colors">
          ← Projects
        </Link>
      </div>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end mb-16 md:mb-24">
        <div className="md:col-span-8">
          <h1 className="display text-[2.5rem] sm:text-5xl md:text-7xl">
            {initiative.title}
          </h1>
        </div>
        <div className="md:col-span-4 md:pb-2">
          <div className="w-8 h-px bg-ink mb-5" />
          <dl className="space-y-4">
            <div>
              <dt className="meta-muted mb-1">Status</dt>
              <dd className="text-base">
                {STATUS_LABELS[initiative.status] ?? initiative.status}
              </dd>
            </div>
            <div>
              <dt className="meta-muted mb-1">Started</dt>
              <dd className="text-base">{initiative.startYear}</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ── SUMMARY ────────────────────────────────────────── */}
      {initiative.summary && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 md:mb-20">
          <div className="hidden md:block md:col-span-2">
            <div className="meta">Summary</div>
          </div>
          <div className="md:col-span-8">
            <p className="font-serif text-xl md:text-2xl font-light italic leading-snug text-ink-soft">
              {initiative.summary}
            </p>
          </div>
        </div>
      )}

      {/* ── BODY ───────────────────────────────────────────── */}
      {initiative.body && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="hidden md:block md:col-span-2">
            <div className="meta">Detail</div>
          </div>
          <div className="md:col-span-8 text-base md:text-lg">
            <PortableText value={initiative.body} components={portableTextComponents} />
          </div>
        </div>
      )}

      {/* ── EXTERNAL LINK ──────────────────────────────────── */}
      {initiative.externalLink && (
        <div className="mt-16 md:mt-20 pt-12 border-t border-rule">
          <a
            href={initiative.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="meta inline-flex items-center gap-3 border border-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors"
          >
            Visit project site →
          </a>
        </div>
      )}
    </article>
  )
}
