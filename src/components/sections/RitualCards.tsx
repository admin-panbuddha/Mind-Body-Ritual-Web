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

// ── Minimal progress-ring clock — no hands, just ring + number ───
function ClockVisual({ totalMinutes, maxMinutes = 25 }: { totalMinutes: number; maxMinutes?: number }) {
  const SIZE        = 200
  const CX          = SIZE / 2
  const CY          = SIZE / 2
  const R_OUTER     = 86   // outer ring
  const R_INNER     = 74   // inner ring (creates band thickness)
  const circumference = 2 * Math.PI * R_OUTER
  const fraction    = Math.min(totalMinutes / maxMinutes, 1)
  const dashOffset  = circumference * (1 - fraction)

  return (
    <div
      className="pointer-events-none select-none"
      style={{
        position: 'absolute',
        top: '5%',
        right: '3%',
        width: 'clamp(90px, 15%, 130px)',
        aspectRatio: '1',
        zIndex: 2,
      }}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%" height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Frosted glass disc background */}
        <circle
          cx={CX} cy={CY} r={R_OUTER + 4}
          fill="#FAF9F2" fillOpacity="0.22"
        />

        {/* Outer track ring */}
        <circle
          cx={CX} cy={CY} r={R_OUTER}
          stroke="#3D6B4F" strokeWidth="10" strokeOpacity="0.10"
        />

        {/* Inner track ring — creates the band effect */}
        <circle
          cx={CX} cy={CY} r={R_INNER}
          stroke="#3D6B4F" strokeWidth="1" strokeOpacity="0.06"
        />

        {/* Animated progress band — fills clockwise from 12 o'clock */}
        <motion.circle
          cx={CX} cy={CY} r={R_OUTER}
          stroke="#3D6B4F"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          transform={`rotate(-90, ${CX}, ${CY})`}
          strokeOpacity="0.38"
        />

        {/* Small dot at 12 o'clock */}
        <circle cx={CX} cy={CY - R_OUTER} r="3" fill="#3D6B4F" fillOpacity="0.25" />

        {/* Total minutes — large centred number */}
        <motion.text
          x={CX} y={CY - 6}
          textAnchor="middle" dominantBaseline="middle"
          fill="#3D6B4F"
          fontSize="36" fontWeight="700"
          fontFamily="Georgia, 'Times New Roman', serif"
          letterSpacing="-1"
          animate={{ fillOpacity: totalMinutes === 0 ? 0.25 : 0.6 }}
          transition={{ duration: 0.4 }}
        >
          {totalMinutes}
        </motion.text>

        {/* "min" sub-label */}
        <text
          x={CX} y={CY + 22}
          textAnchor="middle" dominantBaseline="middle"
          fill="#3D6B4F" fillOpacity="0.32"
          fontSize="11" fontWeight="500"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="3"
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
        opacity: isActive ? 1 : 0.32,
        scale:   isActive ? 1.03 : 0.98,
      }}
      initial={false}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-default select-none"
      style={{
        transformOrigin: 'left center',
      }}
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

      {/* Icon + title row — compact in collapsed state */}
      <div className="flex items-center gap-2.5" style={{ gap: isActive && !reduce ? '12px' : '10px' }}>
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

        <div className="flex-1 flex items-center justify-between gap-2.5 min-w-0" style={{ gap: isActive && !reduce ? '12px' : '8px' }}>
          <div className="min-w-0">
            <span
              className="font-body text-[10px] font-bold uppercase tracking-widest block"
              style={{ color: ritual.accentHex, opacity: isActive || reduce ? 1 : 0.7 }}
            >
              {ritual.subtitle}
            </span>
            <h3 className="font-heading font-semibold text-[15px] text-[var(--text)] leading-tight whitespace-nowrap">
              {ritual.title}
            </h3>
          </div>
          {/* Duration pill — visible always, but pulls back visually when inactive */}
          <motion.span
            animate={reduce ? {} : {
              opacity: isActive ? 1 : 0.55,
              scale: isActive ? 1 : 0.92,
            }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[13px] font-semibold text-forest tabular-nums shrink-0
                       bg-white/80 rounded-full border border-forest/25 leading-none"
            style={{ padding: '5px 10px', boxShadow: '0 1px 4px rgba(61,107,79,0.10)', transformOrigin: 'right center' }}
          >
            {minutesPerRitual} min
          </motion.span>
        </div>
      </div>

      {/* Description + tags — expands on hover, collapses off hover */}
      <AnimatePresence initial={false}>
        {(isActive || reduce) && (
          <motion.div
            key="desc"
            initial={{ opacity: 0, height: 0, y: 4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -3 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="overflow-hidden pl-[52px]"
          >
            <p className="font-body text-xs text-[var(--text-light)] leading-relaxed pt-0.5">
              {ritual.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
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
        <p className="font-heading text-[1.35rem] md:text-[1.6rem] leading-snug text-[var(--text)] text-center max-w-lg mx-auto">
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

  const [minutesPerRitual, setMinutesPerRitual] = useState(3) // default: middle → 15 min total
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
            ── LAYER 2: CTA — bottom-LEFT, larger, with bouncing down arrow ──
          */}
          <div
            style={{ zIndex: 3 }}
            className="absolute bottom-[6%] left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <a
              href="#download"
              className="ritual-cta inline-flex items-center gap-3 rounded-2xl
                         font-body font-semibold text-white pointer-events-auto group"
              style={{ padding: '14px 26px' }}
            >
              {/* Lotus / flow SVG icon — scales on button hover via CSS */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20" height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ritual-cta-icon text-white/80 shrink-0"
                aria-hidden
              >
                {/* Lotus / bloom: 3 petals suggesting opening/starting */}
                <path d="M12 22 C12 22 5 17 5 11 C5 7.5 8 5 12 5 C16 5 19 7.5 19 11 C19 17 12 22 12 22Z" />
                <path d="M12 5 C12 5 7 2 4 5 C2 7 3 10 5 11" />
                <path d="M12 5 C12 5 17 2 20 5 C22 7 21 10 19 11" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
              </svg>

              <div className="flex flex-col items-start gap-0.5">
                <span className="text-[15px] leading-tight tracking-wide">Start your ritual</span>
                {/* Subtle subtitle */}
                <span className="text-[10px] text-white/55 font-normal tracking-wider uppercase leading-none">
                  5 rituals · {minutesPerRitual} min each
                </span>
              </div>
            </a>
          </div>

        </div>
      </div>

      {/* CTA styles — defined outside the aspect-ratio container to avoid scope issues */}
      <style>{`
        .ritual-cta {
          background: linear-gradient(145deg, #4a7a5c 0%, #3D6B4F 40%, #2e5640 100%);
          box-shadow:
            0 6px 28px rgba(61,107,79,0.42),
            0 2px 6px rgba(0,0,0,0.16),
            inset 0 1px 0 rgba(255,255,255,0.12);
          transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
        }
        .ritual-cta:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow:
            0 12px 36px rgba(61,107,79,0.50),
            0 4px 10px rgba(0,0,0,0.18),
            inset 0 1px 0 rgba(255,255,255,0.15);
          filter: brightness(1.07);
        }
        .ritual-cta:active {
          transform: translateY(1px) scale(0.98);
          box-shadow: 0 3px 14px rgba(61,107,79,0.30);
        }
        .ritual-cta-icon {
          transition: transform 0.25s ease;
        }
        .ritual-cta:hover .ritual-cta-icon {
          transform: scale(1.2) rotate(15deg);
        }
      `}</style>

    </section>
  )
}
