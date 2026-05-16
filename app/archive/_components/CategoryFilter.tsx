'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Exhibitions', value: 'exhibitions' },
  { label: 'Studio Visits', value: 'studio-visits' },
  { label: 'Cultural', value: 'cultural' },
  { label: 'Editorial', value: 'editorial' },
]

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? ''

  function select(value: string) {
    router.push(value ? `/archive?category=${value}` : '/archive', { scroll: false })
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => select(cat.value)}
          className={[
            'text-[10px] tracking-meta uppercase font-medium px-3 py-1.5 border transition-colors',
            active === cat.value
              ? 'border-ink bg-ink text-paper'
              : 'border-rule text-dust hover:border-ink-soft hover:text-ink',
          ].join(' ')}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
