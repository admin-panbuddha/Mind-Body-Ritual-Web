'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden shadow-soft-sm"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left
                       font-heading font-semibold text-lg text-[var(--text)]
                       hover:bg-[var(--sage-light)] transition-colors duration-200
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
            aria-expanded={open === i}
          >
            <span>{item.question}</span>
            <ChevronDown
              className={cn(
                'shrink-0 text-forest transition-transform duration-300',
                open === i && 'rotate-180'
              )}
              size={20}
            />
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-wellness',
              open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <p className="px-6 pb-5 text-[var(--text-light)] font-body leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
