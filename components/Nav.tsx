'use client'

import Link from 'next/link'
import { useState } from 'react'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { href: '/archive', label: 'Archive', numeral: 'i.' },
  { href: '/projects', label: 'Projects', numeral: 'ii.' },
  { href: '/about', label: 'About', numeral: 'iii.' },
  { href: '/contact', label: 'Contact', numeral: 'iv.' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="border-b border-ink">
        <div className="grid grid-cols-[auto_1fr_auto] gap-8 items-baseline px-6 md:px-14 pt-7 pb-5">
          {/* Wordmark with superscript */}
          <Link
            href="/"
            className="font-serif text-xl md:text-[22px] font-light tracking-tight leading-none hover:text-terracotta transition-colors"
          >
            1023 Studios
            <sup className="font-sans text-[10px] font-medium tracking-meta text-dust ml-2 -top-2 relative">
              Est. 2023
            </sup>
          </Link>

          {/* Middle: italic tagline (desktop only) */}
          <div className="hidden lg:block font-serif italic text-[13px] text-dust self-end pb-0.5">
            — a visual documentation practice, Nairobi.
          </div>
          {/* Spacer for medium screens where tagline is hidden */}
          <div className="lg:hidden" />

          {/* Desktop nav with roman numerals */}
          <nav className="hidden md:flex gap-7 self-end pb-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-meta uppercase font-medium hover:text-terracotta transition-colors group"
              >
                <span className="font-serif italic text-[10px] tracking-normal normal-case text-dust mr-1 font-normal">
                  {link.numeral}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-[10px] tracking-meta uppercase font-medium hover:text-terracotta transition-colors self-end pb-0.5"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>

        <FolioLine />
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function FolioLine() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-center px-6 md:px-14 py-3 border-b border-rule">
      <span className="text-[10px] tracking-meta uppercase text-dust">Vol. I</span>
      <span className="h-px bg-rule" />
      <span className="text-[10px] tracking-meta uppercase text-dust">{today}</span>
    </div>
  )
}
