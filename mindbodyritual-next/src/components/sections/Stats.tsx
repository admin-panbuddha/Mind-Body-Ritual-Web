'use client'

import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

const stats = [
  { value: 2400, suffix: '+', label: 'Families using MindBodyRitual', emoji: '👨‍👩‍👧‍👦' },
  { value: 25, suffix: ' min', label: 'Total daily ritual time', emoji: '⏱' },
  { value: 5, suffix: '', label: 'Rituals per session', emoji: '🌿' },
  { value: 4.9, suffix: '★', label: 'App Store rating', emoji: '⭐', isDecimal: true },
]

function CountUp({
  target,
  suffix,
  isDecimal,
  started,
}: {
  target: number
  suffix: string
  isDecimal?: boolean
  started: boolean
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!started) return
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let step = 0
    const interval = setInterval(() => {
      step++
      setCurrent(Math.min(target, increment * step))
      if (step >= steps) clearInterval(interval)
    }, duration / steps)
    return () => clearInterval(interval)
  }, [started, target])

  const display = isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString()

  return (
    <span>
      {display}{suffix}
    </span>
  )
}

export function Stats() {
  const ref = useReveal<HTMLDivElement>()
  const [started, setStarted] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-py bg-forest" ref={ref}>
      <div className="container-wide" ref={triggerRef}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal reveal-delay-${i + 1} text-center`}
            >
              <div className="text-3xl mb-3">{stat.emoji}</div>
              <div className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] text-white
                              leading-none mb-2 tabular-nums">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                  started={started}
                />
              </div>
              <p className="font-body text-sm text-white/70 leading-snug max-w-[140px] mx-auto">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
