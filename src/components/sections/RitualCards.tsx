'use client'

/**
 * RitualCards — Step-by-Step Scroll Capture
 * ──────────────────────────────────────────────────────────────────
 * Interaction model:
 *   • When this section enters the viewport, page scroll is intercepted.
 *   • Each scroll tick advances one ritual step (1 → 5).
 *   • After the final step, scroll capture releases and the page continues normally.
 *   • Scrolling back up re-enters the section and reverses through steps.
 *   • Slider moves smoothly (step=0.1); minute display rounds to nearest integer.
 *   • prefers-reduced-motion: scroll capture is skipped, all 5 steps shown at once.
 *
 * Scroll capture technique:
 *   • window 'wheel' listener with passive:false so we can call e.preventDefault().
 *   • deltaY accumulator handles trackpad (low per-event deltaY) and mouse wheel.
 *   • 480ms cooldown between step advances to prevent overshoot.
 *   • IntersectionObserver (threshold 0.45) activates/deactivates capture.
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { ritualCards } from '@/content'

// ─── IONOS video source ──────────────────────────────────────────
// Note: the folder name on IONOS is literally "/-videos/" (dash is intentional).
const RITUAL_VIDEO_SRC = 'https://mindbodyritual.ca/-videos/website-center-page.mp4'
const CREAM = '#FAF9F2'
// ────────────────────────────────────────────────────────────────

const rituals = ritualCards.rituals.map((r, i) => ({ ...r, step: i + 1 }))

// ── Individual ritual step ───────────────────────────────────────
function RitualStep({
  ritual,
  index,
  isActive,
  isPast,
  reduce,
  minutesPerRitual,
}: {
  ritual: typeof rituals[number]
  index: number
  isActive: boolean
  isPast: boolean
  reduce: boolean | null
  minutesPerRitual: number
}) {
  return (
    <motion.div
      animate={reduce ? {} : {
        opacity: isActive ? 1 : isPast ? 0.55 : 0.2,
        scale: isActive ? 1.03 : 1,
      }}
      initial={false}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="relative last:pb-0"
      style={{ transformOrigin: 'left center' }}
    >
      {/* Vertical connector line */}
      <div
        className="absolute left-[22px] top-11 bottom-0 w-[2px] rounded-full"
        aria-hidden
        style={{
          backgroundColor: `${ritual.accentHex}${isPast || isActive ? '60' : '30'}`,
          display: index === rituals.length - 1 ? 'none' : 'block',
        }}
      />

      {/* Icon + title row */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={reduce || !isActive ? {} : {
            scale: [1, 1.12, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${ritual.accentHex}20`,
            border: `1.5px solid ${ritual.accentHex}40`,
          }}
        >
          <Icon name={ritual.icon} size={20} />
        </motion.div>

        <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <span
              className="font-body text-[10px] font-bold uppercase tracking-widest block"
              style={{ color: ritual.accentHex }}
            >
              {ritual.subtitle}
            </span>
            <h3 className="font-heading font-semibold text-[15px] text-[var(--text)] leading-tight whitespace-nowrap">
              {ritual.title}
            </h3>
          </div>
          <span className="font-body text-[10px] font-medium text-forest
                           bg-white/70 rounded-full px-2.5 py-0.5 border border-forest/20 tabular-nums shrink-0">
            {Math.round(minutesPerRitual)} min
          </span>
        </div>
      </div>

      {/* Description — slides in when active */}
      <AnimatePresence initial={false}>
        {(isActive || reduce) && (
          <motion.div
            key="desc"
            initial={{ opacity: 0, height: 0, y: 8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="overflow-hidden pl-[52px]"
          >
            <p className="font-body text-xs text-[var(--text-light)] leading-relaxed pt-1">
              {ritual.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {ritual.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[9px] font-medium text-forest/70
                             bg-white/60 rounded-full px-2 py-0.5 border border-forest/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Animated pill number ─────────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay]     = useState(value)
  const [prev, setPrev]           = useState(value)
  const [animating, setAnimating] = useState(false)

  if (value !== prev) {
    setPrev(value)
    setAnimating(true)
    setDisplay(value)
    setTimeout(() => setAnimating(false), 220)
  }

  return (
    <span className="inline-block tabular-nums transition-all duration-[180ms] ease-out"
          style={{ opacity: animating ? 0.6 : 1, transform: animating ? `translateY(${value > prev ? '-3px' : '3px'})` : 'translateY(0)' }}>
      {display}
    </span>
  )
}

// ── Minutes slider ────────────────────────────────────────────────
function RitualSlider({
  minutesPerRitual, setMinutesPerRitual,
}: {
  minutesPerRitual: number
  setMinutesPerRitual: (v: number) => void
}) {
  const ritualCount    = 5
  const displayMinutes = Math.round(minutesPerRitual)
  const totalMinutes   = ritualCount * displayMinutes
  const fillPct        = (minutesPerRitual / 15) * 100

  return (
    <div className="flex flex-col items-center gap-5 w-full">

      <div className="ritual-headline-wrap">
        <p className="font-heading text-[1.35rem] md:text-[1.6rem] leading-snug text-[var(--text)] text-center max-w-sm mx-auto">
          {ritualCards.sliderHeadline}{' '}
          <span className="ritual-headline-accent text-forest">{ritualCards.sliderAccent}</span>
        </p>
      </div>

      <div className="inline-flex items-center gap-2.5 bg-forest/[0.07] rounded-full px-5 py-2.5 border border-forest/[0.12]">
        <Icon name="ui_Icon_Clock" size={16} className="shrink-0" />
        <span className="font-body text-sm font-semibold text-forest">
          <AnimatedNumber value={totalMinutes} /> minutes total
        </span>
        <span className="w-px h-4 bg-forest/20 shrink-0" />
        <span className="font-body text-sm text-[var(--text-muted)]">
          {ritualCount} rituals × <AnimatedNumber value={displayMinutes} /> min
        </span>
      </div>

      <div className="w-full max-w-xs">
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-[var(--text-muted)] tabular-nums w-4 text-right shrink-0 select-none">0</span>
          <div className="relative flex-1 flex items-center h-8">
            {/* step={0.1} — smooth continuous drag; display rounds to integer */}
            <input
              type="range" min={0} max={15} step={0.1}
              value={minutesPerRitual}
              onChange={(e) => setMinutesPerRitual(Number(e.target.value))}
              aria-label="Minutes per ritual"
              className="ritual-slider w-full"
            />
          </div>
          <span className="font-body text-xs text-[var(--text-muted)] tabular-nums w-5 shrink-0 select-none">15</span>
        </div>

        <div className="relative h-5 mt-1 mx-7" aria-hidden>
          {[0, 5, 10, 15].map((mark) => {
            const pct      = (mark / 15) * 100
            const isActive = minutesPerRitual >= mark
            return (
              <div key={mark} className="absolute flex flex-col items-center -translate-x-1/2" style={{ left: `${pct}%` }}>
                <div className="w-px h-2 rounded-full mb-0.5 transition-colors duration-150"
                     style={{ backgroundColor: isActive ? '#3D6B4F' : '#C8C4B8' }} />
                <span className="font-body text-[10px] tabular-nums leading-none transition-colors duration-150"
                      style={{ color: isActive ? '#3D6B4F' : '#A8A49A' }}>
                  {mark}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes ritualHeadlineFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ritualShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .ritual-headline-wrap { animation: ritualHeadlineFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .ritual-headline-accent {
          display: inline;
          background: linear-gradient(90deg, var(--forest) 0%, var(--forest) 30%, #8BA888 50%, var(--forest) 70%, var(--forest) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ritualShimmer 1.4s ease-out 0.6s both;
        }
        .ritual-slider {
          -webkit-appearance: none; appearance: none;
          height: 3px; border-radius: 9999px; outline: none; cursor: pointer;
          background: linear-gradient(to right, #3D6B4F 0%, #3D6B4F ${fillPct}%, #E2DFD5 ${fillPct}%, #E2DFD5 100%);
          transition: background 0.08s linear;
        }
        .ritual-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 20px; height: 20px; border-radius: 50%;
          background: #3D6B4F; border: 3px solid #FAF9F2;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18); cursor: pointer;
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }
        .ritual-slider::-webkit-slider-thumb:hover { transform: scale(1.18); box-shadow: 0 2px 10px rgba(0,0,0,0.2), 0 0 0 5px rgba(61,107,79,0.1); }
        .ritual-slider:focus-visible::-webkit-slider-thumb { box-shadow: 0 1px 4px rgba(0,0,0,0.18), 0 0 0 3px rgba(61,107,79,0.35); }
        .ritual-slider:active::-webkit-slider-thumb { transform: scale(1.08); }
        .ritual-slider::-moz-range-thumb {
          width: 20px; height: 20px; border-radius: 50%;
          background: #3D6B4F; border: 3px solid #FAF9F2;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18); cursor: pointer;
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }
        .ritual-slider::-moz-range-thumb:hover { transform: scale(1.18); }
        .ritual-slider:focus-visible::-moz-range-thumb { box-shadow: 0 1px 4px rgba(0,0,0,0.18), 0 0 0 3px rgba(61,107,79,0.35); }
        .ritual-slider::-moz-range-track { height: 3px; background: #E2DFD5; border-radius: 9999px; border: none; }
        .ritual-slider::-moz-range-progress { height: 3px; background: #3D6B4F; border-radius: 9999px; }
      `}</style>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────
export function RitualCards() {
  const sectionRef   = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()

  const [minutesPerRitual, setMinutesPerRitual] = useState(5)
  const [activeStep, setActiveStep]             = useState(0)
  const [showCta, setShowCta]                   = useState(false)

  // Refs for wheel handler — avoid stale closures
  const activeStepRef    = useRef(0)
  const isCapturingRef   = useRef(false)

  useEffect(() => { activeStepRef.current = activeStep }, [activeStep])

  // ── Scroll capture effect ────────────────────────────────────────
  useEffect(() => {
    if (shouldReduce) return
    const section = sectionRef.current
    if (!section) return

    let acc      = 0    // accumulated deltaY across trackpad micro-events
    let cooldown = false // guard — only one step advance per 480ms
    const THRESHOLD   = 100  // deltaY units to trigger a step
    const COOLDOWN_MS = 480  // ms between step advances

    function advanceStep(dir: 1 | -1) {
      if (cooldown) return
      const next = activeStepRef.current + dir
      if (next < 0 || next >= rituals.length) return

      cooldown = true
      acc = 0
      activeStepRef.current = next
      setActiveStep(next)
      if (next === rituals.length - 1) setShowCta(true)
      setTimeout(() => { cooldown = false }, COOLDOWN_MS)
    }

    function handleWheel(e: WheelEvent) {
      if (!isCapturingRef.current) return

      // Normalise: deltaMode 1 = lines (~40px each), 2 = pages (~800px)
      const dy = e.deltaMode === 0 ? e.deltaY : e.deltaY * (e.deltaMode === 1 ? 40 : 800)

      const current = activeStepRef.current

      // Release capture at the boundaries so page scroll takes over
      if (dy > 0 && current >= rituals.length - 1) {
        isCapturingRef.current = false
        return
      }
      if (dy < 0 && current <= 0) {
        isCapturingRef.current = false
        return
      }

      // We're inside the sequence — block page scroll
      e.preventDefault()
      acc += dy

      if (acc >= THRESHOLD)  advanceStep(1)
      else if (acc <= -THRESHOLD) advanceStep(-1)
    }

    // Activate capture when section is ≥45% visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          acc = 0
          isCapturingRef.current = true

          // Determine entry direction to set the right starting step
          if (entry.boundingClientRect.top >= 0) {
            // Entering from below (user scrolling down) — start at step 0
            activeStepRef.current = 0
            setActiveStep(0)
            setShowCta(false)
          } else {
            // Entering from above (user scrolling back up) — start at last step
            activeStepRef.current = rituals.length - 1
            setActiveStep(rituals.length - 1)
            setShowCta(true)
          }
        } else {
          isCapturingRef.current = false
        }
      },
      { threshold: 0.45 }
    )

    observer.observe(section)
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      observer.disconnect()
      window.removeEventListener('wheel', handleWheel)
    }
  }, [shouldReduce])

  return (
    <section id="rituals" ref={sectionRef} className="bg-cream" style={{ overflowX: 'clip' }}>

      {/* Header — scrolls normally above the panel */}
      <div className="section-py pb-0">
        <div className="container-wide text-center max-w-2xl mx-auto">
          <span className="inline-block font-body text-xs font-semibold tracking-widest uppercase text-forest mb-4">
            {ritualCards.sectionLabel}
          </span>
          <h2 className="font-heading text-display-sm text-[var(--text)] mb-4">
            {ritualCards.headline.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="font-body text-body-lg text-[var(--text-light)] mb-7">
            {ritualCards.subheadline}
          </p>
          <RitualSlider minutesPerRitual={minutesPerRitual} setMinutesPerRitual={setMinutesPerRitual} />
        </div>
      </div>

      {/*
        Video + Ritual Steps Panel.
        No sticky/tall-container needed — scroll capture via wheel events keeps the
        section in view while cycling through steps. After the last step the page
        scrolls normally and this section scrolls away.
      */}
      <div className="container-wide py-8" style={{ paddingInline: 0 }}>
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: '16 / 9' }}
        >

          {/* ── LAYER 0: Full-width background video ─────────────────── */}
          <video
            src={RITUAL_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          />

          {/* ── LAYER 1: Left reading gradient ───────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              background: `linear-gradient(to right,
                ${CREAM} 0%,
                ${CREAM}ee 18%,
                ${CREAM}cc 32%,
                ${CREAM}88 44%,
                ${CREAM}33 54%,
                transparent 65%)`,
            }}
          />

          {/* ── LAYER 1: Top blend into cream header ─────────────────── */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              zIndex: 1,
              height: '12%',
              background: `linear-gradient(to bottom, ${CREAM}, transparent)`,
            }}
          />

          {/* ── LAYER 1: Bottom blend into next section ──────────────── */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              zIndex: 1,
              height: '12%',
              background: `linear-gradient(to top, ${CREAM}, transparent)`,
            }}
          />

          {/* ── LAYER 2: Progress bar — driven by activeStep ─────────── */}
          <div className="absolute top-[7%] left-0 right-0 px-[4%]" style={{ zIndex: 2 }}>
            <div className="relative h-[2px] bg-forest/15 rounded-full max-w-[42%] overflow-hidden">
              <motion.div
                animate={{ scaleX: shouldReduce ? 1 : (activeStep + 1) / rituals.length }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
                className="absolute inset-0 bg-forest/60 rounded-full"
              />
            </div>
          </div>

          {/* ── LAYER 2: Ritual steps — left panel ───────────────────── */}
          <div
            className="absolute inset-y-0 left-0 flex flex-col justify-between px-[4%] pt-[14%] pb-[10%]"
            style={{ zIndex: 2, width: 'clamp(300px, 58%, 700px)' }}
          >
            {rituals.map((ritual, i) => (
              <RitualStep
                key={ritual.title}
                ritual={ritual}
                index={i}
                isActive={shouldReduce ? true : i === activeStep}
                isPast={!shouldReduce && i < activeStep}
                reduce={shouldReduce}
                minutesPerRitual={minutesPerRitual}
              />
            ))}
          </div>

          {/* ── LAYER 2: CTA — appears after all steps complete ──────── */}
          <AnimatePresence>
            {(showCta || shouldReduce) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ zIndex: 2 }}
                className="absolute bottom-[8%] left-0 right-0 text-center pointer-events-none"
              >
                <a
                  href="#download"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
                             bg-forest text-white font-body text-sm font-semibold
                             hover:bg-forest-deep transition-colors shadow-soft pointer-events-auto"
                >
                  🐼 {ritualCards.cta}
                  <span className="text-white/60">→</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </section>
  )
}
