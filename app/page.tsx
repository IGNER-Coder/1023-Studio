import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { HOMEPAGE_HERO_QUERY, HOMEPAGE_FEATURED_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

type HeroProject = {
  title: string
  subtitle?: string
  slug: string
  venue: string
  year: string
  heroImage: {
    asset: { _ref: string }
    alt: string
    caption?: string
  }
}

type FeaturedProject = {
  _id: string
  title: string
  subtitle?: string
  slug: string
  venue: string
  year: string
  heroImage: {
    asset: { _ref: string }
    alt: string
  }
}

export default async function HomePage() {
  const [hero, featured]: [HeroProject | null, FeaturedProject[]] =
    await Promise.all([
      client.fetch(HOMEPAGE_HERO_QUERY),
      client.fetch(HOMEPAGE_FEATURED_QUERY),
    ])

  return (
    <>
      {/* === HERO HEADLINE BLOCK === */}
      <section className="px-6 md:px-14 pt-16 md:pt-22 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-16 items-end">
          <h1 className="display text-[2.5rem] sm:text-5xl md:text-7xl md:col-span-7">
            A visual
            <br />
            documentation
            <br />
            <em className="italic font-light">practice.</em>
          </h1>

          <div className="mt-8 md:mt-0 md:col-span-5 md:pb-2">
            <div className="w-8 h-px bg-ink mb-5" />
            <p className="text-sm md:text-base leading-[1.7] max-w-sm">
              1023 Studios is a cultural platform documenting contemporary
              artistic life in Nairobi and beyond — through photography, film,
              and collaborative projects.
            </p>
          </div>
        </div>
      </section>

      {/* === HERO IMAGE === */}
      {hero && (
        <section className="px-6 md:px-14 pb-20 md:pb-28">
          <Link href={`/archive/${hero.slug}`} className="block group">
            <div className="relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden bg-ink/5">
              <Image
                src={urlFor(hero.heroImage)
                  .width(2400)
                  .quality(85)
                  .auto('format')
                  .url()}
                alt={hero.heroImage.alt ?? hero.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-cover transition-opacity duration-500 group-hover:opacity-95"
              />
            </div>
            <div className="mt-3 flex flex-col md:flex-row md:justify-between gap-1">
              <span className="meta-muted">
                {hero.title}
                {hero.subtitle && ` ${hero.subtitle}`}
              </span>
              <span className="meta-muted">
                {hero.venue} · {hero.year}
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* === RECENT WORK === */}
      <section className="px-6 md:px-14 pb-16">
        <div className="grid grid-cols-2 items-baseline mb-10 md:mb-14">
          <span className="meta">Recent work ↓</span>
          <Link
            href="/archive"
            className="meta-muted hover:text-ink transition-colors text-right"
          >
            View full archive →
          </Link>
        </div>

        {featured && featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((project) => (
              <Link
                key={project._id}
                href={`/archive/${project.slug}`}
                className="group block"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-ink/5">
                  <Image
                    src={urlFor(project.heroImage)
                      .width(900)
                      .quality(85)
                      .auto('format')
                      .url()}
                    alt={project.heroImage.alt ?? project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-opacity duration-500 group-hover:opacity-95"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-lg md:text-xl font-normal leading-tight">
                    {project.title}
                    {project.subtitle && (
                      <em className="italic text-dust"> {project.subtitle}</em>
                    )}
                  </h3>
                  <div className="meta-muted mt-2">
                    {project.venue} · {project.year}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="meta-muted">No featured work yet.</p>
        )}
      </section>
    </>
  )
}
