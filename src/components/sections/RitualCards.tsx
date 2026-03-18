'use client'

/**
 * RitualCards — Scroll-Driven Sticky Reveal
 * ──────────────────────────────────────────────────────────────────
 * Layout:
 *   • IONOS video fills 100% width as the background layer (z-index 0)
 *   • Sticky panel height = video's native 16:9 aspect ratio — scales with browser width
 *   • Ritual steps panel floats over the LEFT half of the video (z-index above video)
 *   • A left-to-right gradient makes the text area readable without hiding the video
 *   • No shadow, no border, no rounded corners — video blends into the page
 *   • Top + bottom cream gradients blend the video into the sections above/below
 */

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { ritualCards } from '@/content'

// ─── IONOS video source ──────────────────────────────────────────
const RITUAL_VIDEO_SRC = 'https://mindbodyritual.ca/-videos/website-center-page.mp4'
const CREAM = '#FAF9F2'
// ────────────────────────────────────────────────────────────────

const rituals = ritualCards.rituals.map((r, i) => ({ ...r, step: i + 1 }))

// ── Individual ritual step ───────────────────────────────────────
function RitualStep({
  ritual, index, total, progress, reduce, minutesPerRitual,
}: {
  ritual: typeof rituals[number]
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  reduce: boolean | null
  minutesPerRitual: number
}) {
  const activeRange = 0.75
  const sliceSize   = activeRange / total
  const s   = index * sliceSize
  const e   = (index + 1) * sliceSize
  const mid = s + sliceSize * 0.5

  const fadeIn  = Math.min(s + 0.03, mid)
  const fadeOut = Math.max(e - 0.03, mid)

  const opacity     = useTransform(progress, [s, fadeIn, mid, fadeOut, e], [0.22, 1, 1, 1, 0.22])
  const descIn      = Math.min(s + 0.04, mid)
  const descOut     = Math.max(e - 0.04, mid)
  const descOpacity = useTransform(progress, [s, descIn, mid, descOut, e], [0, 1, 1, 1, 0])
  const descY       = useTransform(progress, [s, descIn, descOut, e], [10, 0, 0, -10])
  const tagIn       = Math.min(s + 0.05, mid)
  const tagOut      = Math.max(e - 0.05, mid)
  const tagOpacity  = useTransform(
    progress,
    [tagIn, Math.min(tagIn + 0.04, mid), Math.max(tagOut - 0.04, mid), tagOut],
    [0, 1, 1, 0]
  )
  const barIn    = Math.min(s + 0.03, mid)
  const barOut   = Math.max(e - 0.03, mid)
  const barScale = useTransform(progress, [s, barIn, barOut, e], [0, 1, 1, 0])

  // Whole-card scale: inactive cards sit at 0.94, active breathes up to 1.06
  const cardScale = useTransform(
    progress,
    [s, fadeIn, mid, fadeOut, e],
    [0.94, 1.04, 1.06, 1.04, 0.94]
  )

  // Description height: collapses to 0 when not active so no phantom spacing
  const descMaxH = useTransform(
    progress,
    [s, descIn, descOut, e],
    ['0px', '110px', '110px', '0px']
  )

  return (
    <motion.div
      style={reduce ? {} : {
        opacity,
        scale: cardScale,
        transformOrigin: 'left center',
      }}
      className="relative last:pb-0"
    >

      {/* Vertical connector line */}
      <motion.div
        style={reduce ? {} : { scaleY: barScale, transformOrigin: 'top' }}
        className="absolute left-[22px] top-11 bottom-0 w-[2px] rounded-full last:hidden"
        aria-hidden
      >
        <div className="w-full h-full" style={{ backgroundColor: `${ritual.accentHex}50` }} />
      </motion.div>

      {/* Icon + title row — single compact line, no wrapping */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.10, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${ritual.accentHex}20`, border: `1.5px solid ${ritual.accentHex}40` }}
        >
          <Icon name={ritual.icon} size={20} />
        </motion.div>

        <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <span className="font-body text-[10px] font-bold uppercase tracking-widest block"
                  style={{ color: ritual.accentHex }}>
              {ritual.subtitle}
            </span>
            {/* whitespace-nowrap keeps title on one line */}
            <h3 className="font-heading font-semibold text-[15px] text-[var(--text)] leading-tight whitespace-nowrap">
              {ritual.title}
            </h3>
          </div>
          <span className="font-body text-[10px] font-medium text-forest
                           bg-white/70 rounded-full px-2.5 py-0.5 border border-forest/20 tabular-nums shrink-0">
            {minutesPerRitual} min
          </span>
        </div>
      </div>

      {/* Description + tags — height collapses to 0 when inactive (no phantom gaps) */}
      <motion.div
        style={reduce ? {} : { maxHeight: descMaxH, opacity: descOpacity, y: descY }}
        className="overflow-hidden pl-[52px]"
      >
        <p className="font-body text-xs text-[var(--text-light)] leading-relaxed pt-1">
          {ritual.description}
        </p>
        <motion.div style={reduce ? {} : { opacity: tagOpacity }} className="flex flex-wrap gap-1 mt-1.5">
          {ritual.tags.map(tag => (
            <span key={tag}
                  className="font-body text-[9px] font-medium text-forest/70
                             bg-white/60 rounded-full px-2 py-0.5 border border-forest/15">
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
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
  const ritualCount  = 5
  const totalMinutes = ritualCount * minutesPerRitual
  const fillPct      = (minutesPerRitual / 15) * 100

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
          {ritualCount} rituals × <AnimatedNumber value={minutesPerRitual} /> min
        </span>
      </div>

      <div className="w-full max-w-xs">
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-[var(--text-muted)] tabular-nums w-4 text-right shrink-0 select-none">0</span>
          <div className="relative flex-1 flex items-center h-8">
            <input
              type="range" min={0} max={15} step={1}
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
            const pct = (mark / 15) * 100
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
  const ref          = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [minutesPerRitual, setMinutesPerRitual] = useState(5)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // CTA fade — computed at top level (not inside JSX) to satisfy hooks rules
  const ctaOpacity = useTransform(scrollYProgress, [0.72, 0.80], [0, 1])

  return (
    <section id="rituals" className="bg-cream" style={{ overflowX: 'clip' }}>

      {/* Header — scrolls normally above the sticky zone */}
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
        Scroll container — tall enough for all 5 rituals + rest buffer.
        activeRange = 0.75 means all rituals complete at 75% of scroll;
        remaining 25% keeps the last step visible before sticky releases.
      */}
      <div ref={ref} className="relative" style={{ height: `${(rituals.length + 4) * 100}vh` }}>

        {/*
          ── STICKY PANEL ────────────────────────────────────────────────
          Height = 16:9 aspect of full viewport width.
          No fixed pixel/vh height — scales naturally with browser resize.
        */}
        <div
          className="sticky top-0 overflow-hidden"
          style={{ width: '100%', maxWidth: '100vw', aspectRatio: '16 / 9' }}
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
          {/*
            Fades from cream (solid) on the far left → fully transparent by ~55%
            so the right half of the video is completely unobscured.
          */}
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

          {/* ── LAYER 2: Progress bar ─────────────────────────────────── */}
          <div className="absolute top-[7%] left-0 right-0 px-[4%]" style={{ zIndex: 2 }}>
            <div className="relative h-[2px] bg-forest/15 rounded-full max-w-[42%] overflow-hidden">
              <motion.div
                style={{ scaleX: shouldReduce ? 1 : scrollYProgress, transformOrigin: 'left' }}
                className="absolute inset-0 bg-forest/60 rounded-full"
              />
            </div>
          </div>

          {/* ── LAYER 2: Ritual steps — left panel ───────────────────── */}
          {/*
            Fills the full height of the sticky panel (inset-y-0).
            justify-between distributes all 5 steps evenly top-to-bottom.
            Width ~45% so it sits cleanly over the left gradient zone.
          */}
          <div
            className="absolute inset-y-0 left-0 flex flex-col justify-between px-[4%] pt-[14%] pb-[10%]"
            style={{ zIndex: 2, width: 'clamp(300px, 58%, 700px)' }}
          >
            {rituals.map((ritual, i) => (
              <RitualStep
                key={ritual.title}
                ritual={ritual}
                index={i}
                total={rituals.length}
                progress={scrollYProgress}
                reduce={shouldReduce}
                minutesPerRitual={minutesPerRitual}
              />
            ))}
          </div>

          {/* ── LAYER 2: CTA ─────────────────────────────────────────── */}
          <motion.div
            style={{ zIndex: 2, opacity: shouldReduce ? 1 : ctaOpacity }}
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

        </div>{/* end sticky */}
      </div>{/* end scroll container */}
    </section>
  )
}
