'use client'

import Link from 'next/link'
import { useEffect } from 'react'

const NAV_LINKS = [
  { href: '/archive', label: 'Archive', numeral: 'i.' },
  { href: '/projects', label: 'Projects', numeral: 'ii.' },
  { href: '/about', label: 'About', numeral: 'iii.' },
  { href: '/contact', label: 'Contact', numeral: 'iv.' },
]

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-paper">
      {/* Top bar mirrors main nav */}
      <div className="flex items-baseline justify-between px-6 pt-7 pb-5 border-b border-ink">
        <Link
          href="/"
          onClick={onClose}
          className="font-serif text-xl font-light"
        >
          1023 Studios
          <sup className="font-sans text-[9px] font-medium tracking-meta text-dust ml-1.5 -top-1.5 relative">
            Est. 2023
          </sup>
        </Link>
        <button
          onClick={onClose}
          className="text-[10px] tracking-meta uppercase font-medium self-end pb-0.5"
          aria-label="Close menu"
        >
          Close
        </button>
      </div>

      {/* Folio strip */}
      <div className="px-6 py-3 border-b border-rule text-[10px] tracking-meta uppercase text-dust">
        Index — Navigate the practice.
      </div>

      {/* Links — big serif, numbered */}
      <nav className="px-6 pt-14">
        <ul className="space-y-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-baseline gap-4 hover:text-terracotta transition-colors group"
              >
                <span className="font-serif italic text-base text-dust group-hover:text-terracotta">
                  {link.numeral}
                </span>
                <span className="font-serif text-5xl font-light tracking-tight leading-none">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom colophon */}
      <div className="absolute bottom-8 left-6 right-6 grid grid-cols-2 gap-4">
        <div className="text-[10px] tracking-meta uppercase text-dust">Based in Nairobi</div>
        <div className="text-[10px] tracking-meta uppercase text-dust text-right">Est. 2023</div>
      </div>
    </div>
  )
}
