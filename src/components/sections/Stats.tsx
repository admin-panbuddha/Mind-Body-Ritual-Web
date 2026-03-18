'use client'

import { useEffect, useRef, useState } from 'react'
import { RevealStagger, RevealItem } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { stats } from '@/content'

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

  return <span>{display}{suffix}</span>
}

export function Stats() {
  const [started, setStarted] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  // CountUp fires when the section scrolls into view
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
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-py bg-forest">
      <div className="container-wide" ref={triggerRef}>
        <RevealStagger className="grid grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.14}>
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="text-center">
              <div className="mb-3 flex justify-center">
                <Icon name={stat.icon} size={36} className="invert brightness-200" />
              </div>
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
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
