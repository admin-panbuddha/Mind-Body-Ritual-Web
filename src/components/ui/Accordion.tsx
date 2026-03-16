'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  question: string
  answer: string
}

// Single-item mode: <Accordion question="..." answer="..." />
// Multi-item mode:  <Accordion items={[{ question, answer }, ...]} />
type AccordionProps =
  | { question: string; answer: string; items?: never; className?: string }
  | { items: AccordionItem[]; question?: never; answer?: never; className?: string }

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left
                   font-heading font-semibold text-lg text-[var(--text)]
                   hover:bg-[var(--sage-light)] transition-colors duration-200
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <ChevronDown
          className={cn(
            'shrink-0 text-forest transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
          size={20}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <p className="px-6 pb-5 text-[var(--text-light)] font-body leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export function Accordion({ question, answer, items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  // Build the list — either from the single props or from items array
  const list: AccordionItem[] = items ?? [{ question: question!, answer: answer! }]

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {list.map((item, i) => (
        <AccordionRow
          key={i}
          item={item}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  )
}
