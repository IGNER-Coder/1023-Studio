import Link from 'next/link'

export default function NotFound() {
  return (
    <article className="px-6 md:px-14 pt-16 md:pt-24 pb-24">
      <div className="meta-muted mb-8">— Not in the archive</div>
      <h1 className="display text-[2.5rem] sm:text-5xl md:text-7xl mb-8">
        404
      </h1>
      <p className="font-serif italic font-light text-xl md:text-2xl text-dust mb-14 max-w-md leading-snug">
        The page you are looking for has not been documented.
      </p>
      <div className="flex items-center gap-8">
        <Link href="/archive" className="meta hover:text-terracotta transition-colors">
          ← Archive
        </Link>
        <span className="text-rule">|</span>
        <Link href="/" className="meta hover:text-terracotta transition-colors">
          Home
        </Link>
      </div>
    </article>
  )
}
