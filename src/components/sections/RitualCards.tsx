'use client'

/**
 * RitualCards — Hover-Based Step Expansion
 * ──────────────────────────────────────────────────────────────────
 * Interaction model:
 *   • Hovering a ritual step expands it: full opacity, description slides in, icon pulses.
 *   • Non-hovered steps fade to low opacity and scale down slightly.
 *   • Default state: first step is emphasized on load.
 *   • Slider: 0 → 5 min, integer steps (1,2,3,4,5), no tick labels.
 *   • CTA: always visible, premium gradient, hover-lift animation.
 *   • prefers-reduced-motion: all steps shown equally, no animations.
 */

import { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { ritualCards } from '@/content'

// ── Animated circular clock — synced to total ritual minutes ─────
function ClockVisual({ totalMinutes, maxMinutes = 25 }: { totalMinutes: number; maxMinutes?: number }) {
  const SIZE   = 200
  const CX     = SIZE / 2
  const CY     = SIZE / 2
  const RADIUS = 80

  const circumference  = 2 * Math.PI * RADIUS
  const fraction       = Math.min(totalMinutes / maxMinutes, 1)
  const dashOffset     = circumference * (1 - fraction)

  // Clock hands: map total minutes onto a 12-hour face
  const minuteAngle = (totalMinutes / 60) * 360   // 0-25 min → 0-150°
  const hourAngle   = (totalMinutes / 720) * 360  // barely moves — adds subtlety

  // Hour marker dots around the ring
  const markers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2
    const inner = i % 3 === 0 ? 68 : 71
    const outer = 76
    return {
      x1: CX + inner * Math.cos(angle),
      y1: CY + inner * Math.sin(angle),
      x2: CX + outer * Math.cos(angle),
      y2: CY + outer * Math.sin(angle),
      bold: i % 3 === 0,
    }
  })

  return (
    <div
      className="pointer-events-none select-none"
      style={{
        position: 'absolute',
        bottom: '4%',
        right: '2%',
        width: 'clamp(130px, 22%, 210px)',
        aspectRatio: '1',
        zIndex: 2,
        // soft radial glow behind the clock
        filter: 'drop-shadow(0 0 18px rgba(61,107,79,0.15))',
        opacity: 0.72,
      }}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%" height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glass-ish background disc */}
        <circle cx={CX} cy={CY} r={RADIUS + 8} fill="#FAF9F2" fillOpacity="0.18" />

        {/* Track ring */}
        <circle
          cx={CX} cy={CY} r={RADIUS}
          stroke="#3D6B4F" strokeWidth="2.5" strokeOpacity="0.12"
        />

        {/* Animated progress arc — fills clockwise from 12 o'clock */}
        <motion.circle
          cx={CX} cy={CY} r={RADIUS}
          stroke="#3D6B4F" strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          transform={`rotate(-90, ${CX}, ${CY})`}
          strokeOpacity="0.55"
        />

        {/* Hour markers */}
        {markers.map((m, i) => (
          <line
            key={i}
            x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2}
            stroke="#3D6B4F"
            strokeWidth={m.bold ? 2 : 1}
            strokeOpacity={m.bold ? 0.3 : 0.16}
            strokeLinecap="round"
          />
        ))}

        {/* Hour hand */}
        <motion.line
          x1={CX} y1={CY}
          x2={CX} y2={CY - 30}
          stroke="#3D6B4F" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4"
          animate={{ rotate: hourAngle }}
          style={{ transformBox: 'fill-box', transformOrigin: `${CX}px ${CY}px` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          transform={`rotate(${hourAngle}, ${CX}, ${CY})`}
        />

        {/* Minute hand */}
        <motion.line
          x1={CX} y1={CY}
          x2={CX} y2={CY - 50}
          stroke="#3D6B4F" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"
          animate={{ rotate: minuteAngle }}
          style={{ transformBox: 'fill-box', transformOrigin: `${CX}px ${CY}px` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          transform={`rotate(${minuteAngle}, ${CX}, ${CY})`}
        />

        {/* Centre pivot dot */}
        <circle cx={CX} cy={CY} r={4} fill="#3D6B4F" fillOpacity="0.45" />

        {/* Total minutes number */}
        <text
          x={CX} y={CY - 8}
          textAnchor="middle" dominantBaseline="middle"
          fill="#3D6B4F" fillOpacity="0.55"
          fontSize="30" fontWeight="700"
          fontFamily="Georgia, serif"
          letterSpacing="-1"
        >
          {totalMinutes}
        </text>

        {/* "min" label */}
        <text
          x={CX} y={CY + 20}
          textAnchor="middle" dominantBaseline="middle"
          fill="#3D6B4F" fillOpacity="0.35"
          fontSize="10" fontWeight="500"
          fontFamily="system-ui, sans-serif"
          letterSpacing="2"
        >
          MIN
        </text>
      </svg>
    </div>
  )
}

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
  reduce,
  minutesPerRitual,
  onHover,
}: {
  ritual: typeof rituals[number]
  index: number
  isActive: boolean
  reduce: boolean | null
  minutesPerRitual: number
  onHover: () => void
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      animate={reduce ? {} : {
        opacity: isActive ? 1 : 0.28,
        scale:   isActive ? 1.02 : 0.97,
      }}
      initial={false}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-default select-none"
      style={{ transformOrigin: 'left center' }}
    >
      {/* Vertical connector line */}
      <div
        className="absolute left-[22px] top-11 bottom-0 w-[2px] rounded-full"
        aria-hidden
        style={{
          backgroundColor: `${ritual.accentHex}${isActive ? '55' : '22'}`,
          display: index === rituals.length - 1 ? 'none' : 'block',
          transition: 'background-color 0.22s ease',
        }}
      />

      {/* Icon + title row */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={reduce || !isActive
            ? { scale: 1, opacity: 1 }
            : { scale: [1, 1.10, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.6, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${ritual.accentHex}${isActive ? '22' : '10'}`,
            border: `1.5px solid ${ritual.accentHex}${isActive ? '50' : '22'}`,
            transition: 'background-color 0.22s ease, border-color 0.22s ease',
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
          <span
            className="font-body text-[13px] font-semibold text-forest tabular-nums shrink-0
                       bg-white/80 rounded-full border border-forest/25 leading-none"
            style={{ padding: '5px 10px', boxShadow: '0 1px 4px rgba(61,107,79,0.10)' }}
          >
            {minutesPerRitual} min
          </span>
        </div>
      </div>

      {/* Description + tags — expands on hover, collapses off hover */}
      <AnimatePresence initial={false}>
        {(isActive || reduce) && (
          <motion.div
            key="desc"
            initial={{ opacity: 0, height: 0, y: 6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
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
    <span
      className="inline-block tabular-nums transition-all duration-[180ms] ease-out"
      style={{
        opacity:   animating ? 0.6 : 1,
        transform: animating ? `translateY(${value > prev ? '-3px' : '3px'})` : 'translateY(0)',
      }}
    >
      {display}
    </span>
  )
}

// ── Minutes slider — range 0→5, step 1, no tick labels ────────────
function RitualSlider({
  minutesPerRitual, setMinutesPerRitual,
}: {
  minutesPerRitual: number
  setMinutesPerRitual: (v: number) => void
}) {
  const ritualCount  = 5
  const totalMinutes = ritualCount * minutesPerRitual
  const fillPct      = (minutesPerRitual / 5) * 100

  return (
    <div className="flex flex-col items-center gap-5 w-full">

      <div className="ritual-headline-wrap">
        <p className="font-heading text-[1.35rem] md:text-[1.6rem] leading-snug text-[var(--text)] text-center max-w-sm mx-auto">
          {ritualCards.sliderHeadline}{' '}
          <span className="ritual-headline-accent text-forest">{ritualCards.sliderAccent}</span>
        </p>
      </div>

      {/* Live readout pill */}
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

      {/* Slider — 0 to 5, integer steps, no tick labels underneath */}
      <div className="w-full max-w-xs">
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-[var(--text-muted)] tabular-nums w-4 text-right shrink-0 select-none">0</span>
          <div className="relative flex-1 flex items-center h-8">
            <input
              type="range" min={0} max={5} step={1}
              value={minutesPerRitual}
              onChange={(e) => setMinutesPerRitual(Number(e.target.value))}
              aria-label="Minutes per ritual"
              className="ritual-slider w-full"
            />
          </div>
          <span className="font-body text-xs text-[var(--text-muted)] tabular-nums w-4 shrink-0 select-none">5</span>
        </div>
        {/* tick labels removed for clean minimal look */}
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
          transition: background 0.1s linear;
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
  const shouldReduce = useReducedMotion()

  const [minutesPerRitual, setMinutesPerRitual] = useState(5)
  const [hoveredStep, setHoveredStep]           = useState(0) // default: first step emphasized

  return (
    <section id="rituals" className="bg-cream" style={{ overflowX: 'clip' }}>

      {/* Header — minimal bottom padding to pull panel tight to slider */}
      <div className="section-py" style={{ paddingBottom: '0.5rem' }}>
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

      {/* Video + Ritual Steps Panel — no top gap, tight to slider */}
      <div className="container-wide pb-10" style={{ paddingInline: 0, marginTop: 0 }}>
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: '16 / 9' }}
        >

          {/* ── LAYER 0: Background video ─────────────────── */}
          <video
            src={RITUAL_VIDEO_SRC}
            autoPlay muted loop playsInline preload="metadata"
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

          {/* ── LAYER 1: Top blend ─────────────────── */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{ zIndex: 1, height: '10%', background: `linear-gradient(to bottom, ${CREAM}, transparent)` }}
          />

          {/* ── LAYER 1: Bottom blend ──────────────── */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ zIndex: 1, height: '10%', background: `linear-gradient(to top, ${CREAM}, transparent)` }}
          />

          {/* ── LAYER 2: Animated clock — bottom-right, synced to slider ── */}
          <ClockVisual totalMinutes={5 * minutesPerRitual} maxMinutes={25} />

          {/*
            ── LAYER 2: Ritual steps — hover interaction ────────────────
            justify-between spreads all 5 steps evenly across the panel height.
            onMouseLeave resets to first step so there is always an active state.
          */}
          <div
            className="absolute inset-y-0 left-0 flex flex-col justify-between px-[4%] py-[7%]"
            style={{ zIndex: 2, width: 'clamp(300px, 58%, 700px)' }}
            onMouseLeave={() => setHoveredStep(0)}
          >
            {rituals.map((ritual, i) => (
              <RitualStep
                key={ritual.title}
                ritual={ritual}
                index={i}
                isActive={shouldReduce ? true : i === hoveredStep}
                reduce={shouldReduce}
                minutesPerRitual={minutesPerRitual}
                onHover={() => setHoveredStep(i)}
              />
            ))}
          </div>

          {/*
            ── LAYER 2: CTA — always visible, premium gradient + hover lift ──
            Positioned lower (bottom-[5%]) for breathing room from the ritual list.
          */}
          <div
            style={{ zIndex: 2 }}
            className="absolute bottom-[5%] left-0 right-0 text-center pointer-events-none"
          >
            <a
              href="#download"
              className="ritual-cta inline-flex items-center gap-2.5 rounded-full px-7 py-3
                         font-body text-sm font-semibold text-white pointer-events-auto"
            >
              {ritualCards.cta}
              <span className="text-white/60 text-base leading-none">→</span>
            </a>
          </div>

        </div>
      </div>

      {/* CTA styles — defined outside the aspect-ratio container to avoid scope issues */}
      <style>{`
        .ritual-cta {
          background: linear-gradient(135deg, #3D6B4F 0%, #4d7f60 50%, #2e5640 100%);
          box-shadow: 0 4px 22px rgba(61,107,79,0.38), 0 1px 4px rgba(0,0,0,0.14);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .ritual-cta:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 10px 32px rgba(61,107,79,0.48), 0 2px 8px rgba(0,0,0,0.16);
          filter: brightness(1.06);
        }
        .ritual-cta:active {
          transform: translateY(1px) scale(0.98);
          box-shadow: 0 3px 12px rgba(61,107,79,0.28);
        }
      `}</style>

    </section>
  )
}
