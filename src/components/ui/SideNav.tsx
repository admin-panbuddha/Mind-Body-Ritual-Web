'use client'

/**
 * SideNav — Sticky left-side scroll index
 * ──────────────────────────────────────────────────────────────────
 * • Fixed to the left edge, vertically centred on the viewport.
 * • Dots highlight the active section via IntersectionObserver.
 * • Labels appear on hover (tooltip-style, never take layout space).
 * • Hidden on screens < lg to avoid cluttering mobile/tablet.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const NAV_ITEMS = [
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'rituals',      label: 'Rituals'      },
  { id: 'resources',    label: 'Resources'    },
  { id: 'download',     label: 'Start'        },
]

export function SideNav() {
  const [active, setActive]       = useState<string>('')
  const [hovered, setHovered]     = useState<string | null>(null)
  const observersRef              = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    // Clean up any previous observers
    observersRef.current.forEach(o => o.disconnect())
    observersRef.current = []

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        {
          // Section is "active" when its top half is in the middle of the viewport
          rootMargin: '-10% 0px -55% 0px',
          threshold: 0,
        }
      )
      observer.observe(el)
      observersRef.current.push(observer)
    })

    return () => {
      observersRef.current.forEach(o => o.disconnect())
    }
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    // Hidden below lg breakpoint — never overlaps mobile content
    <nav
      aria-label="Page sections"
      className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 flex-col gap-4"
      style={{ zIndex: 50 }}
    >
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id

        return (
          <div
            key={id}
            className="relative flex items-center"
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Dot */}
            <button
              onClick={() => scrollTo(id)}
              aria-label={`Scroll to ${label}`}
              className="relative flex items-center justify-center w-5 h-5 focus-visible:outline-none"
            >
              {/* Outer ring — visible when active */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key="ring"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 rounded-full border-2 border-forest/50"
                  />
                )}
              </AnimatePresence>

              {/* Inner dot */}
              <motion.span
                animate={{
                  scale:           isActive ? 1.2 : 1,
                  backgroundColor: isActive ? '#3D6B4F' : '#C8C4B0',
                }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="block w-2 h-2 rounded-full"
              />
            </button>

            {/* Hover label — floats to the right of the dot */}
            <AnimatePresence>
              {hovered === id && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-7 whitespace-nowrap font-body text-[11px] font-semibold
                             text-forest bg-white/90 rounded-full px-3 py-1 shadow-sm
                             border border-forest/10 pointer-events-none select-none"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}
