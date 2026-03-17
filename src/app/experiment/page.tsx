'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion } from 'motion/react'
import { Navbar } from '@/components/sections/Navbar'

/* ══════════════════════════════════════════════════════════════
   EXPERIMENT PAGE — Parallax & Scroll Animation Playground

   Techniques showcased:
   1. Multi-layer parallax hero (different speeds per layer)
   2. Horizontal scroll section (vertical scroll → horizontal movement)
   3. Scroll-driven scale & opacity reveal
   4. Text splitting with staggered scroll entrance
   5. Floating parallax cards on mouse move
   6. Pinned section with progress-based animation
   7. Infinite depth zoom tunnel
   ══════════════════════════════════════════════════════════════ */

// ── Section 1: Multi-Layer Parallax Hero ──────────────────────
function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section ref={ref} className="relative h-[120vh] overflow-hidden flex items-center justify-center">
      {/* Background layer — slowest */}
      <motion.div
        style={{ y: shouldReduce ? 0 : y3, scale: shouldReduce ? 1 : scale }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C4A37] via-[#3D6B4F] to-[#1a3328]" />
        {/* Stars */}
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Mid layer — mountains */}
      <motion.div
        style={{ y: shouldReduce ? 0 : y1 }}
        className="absolute bottom-0 left-0 right-0"
      >
        <svg viewBox="0 0 1440 400" className="w-full" preserveAspectRatio="none">
          <path d="M0,400 L0,280 Q180,120 360,200 Q540,100 720,180 Q900,60 1080,160 Q1260,100 1440,220 L1440,400 Z" fill="rgba(139,168,136,0.4)" />
          <path d="M0,400 L0,320 Q240,180 480,260 Q720,140 960,240 Q1200,160 1440,280 L1440,400 Z" fill="rgba(139,168,136,0.6)" />
        </svg>
      </motion.div>

      {/* Foreground layer — fastest */}
      <motion.div
        style={{ y: shouldReduce ? 0 : y2 }}
        className="absolute bottom-0 left-0 right-0"
      >
        <svg viewBox="0 0 1440 250" className="w-full" preserveAspectRatio="none">
          <path d="M0,250 L0,180 Q360,80 720,150 Q1080,60 1440,120 L1440,250 Z" fill="var(--cream)" />
        </svg>
      </motion.div>

      {/* Hero text */}
      <motion.div
        style={{ opacity: shouldReduce ? 1 : opacity }}
        className="relative z-10 text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--sage-light)] font-body text-sm uppercase tracking-[0.2em] mb-4"
        >
          Scroll Animation Playground
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[1.05]"
        >
          Experiment
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 font-body text-lg md:text-xl mt-6 max-w-xl mx-auto"
        >
          Modern parallax techniques, scroll-driven animations,
          and interaction patterns we could bring to MindBodyRitual.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 animate-bounce-slow"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto text-white/50">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ── Section 2: Scroll-Driven Text Reveal ──────────────────────
function TextRevealSection() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.2'],
  })

  const words = 'Every morning is a chance to breathe, move, and connect as a family'.split(' ')

  return (
    <section ref={ref} className="section-py bg-cream">
      <div className="container-wide">
        <p className="text-[var(--text-muted)] font-body text-xs uppercase tracking-[0.25em] mb-8">
          02 — Scroll Text Reveal
        </p>
        <p className="font-heading text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-[var(--text)]">
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} reduce={shouldReduce} />
          })}
        </p>
      </div>
    </section>
  )
}

function Word({ word, range, progress, reduce }: { word: string; range: [number, number]; progress: ReturnType<typeof useScroll>['scrollYProgress']; reduce: boolean | null }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [8, 0])

  if (reduce) {
    return <span className="inline-block mr-[0.3em]">{word}</span>
  }

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.3em] transition-colors"
    >
      {word}
    </motion.span>
  )
}

// ── Section 3: Horizontal Scroll Gallery ──────────────────────
function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 })

  const cards = [
    { title: 'Breathe', color: 'from-[#3D6B4F] to-[#2C4A37]', emoji: '🌬️', desc: 'Deep belly breathing with guided visualization' },
    { title: 'Move', color: 'from-[#E5B177] to-[#C9A96E]', emoji: '🧘', desc: 'Gentle yoga flows for every body type' },
    { title: 'Focus', color: 'from-[#8BA888] to-[#3D6B4F]', emoji: '🎯', desc: 'Mindfulness games that build attention' },
    { title: 'Connect', color: 'from-[#55583D] to-[#2C4A37]', emoji: '🤝', desc: 'Partner activities for caregivers and kids' },
    { title: 'Reflect', color: 'from-[#C9A96E] to-[#E5B177]', emoji: '📝', desc: 'Gratitude journaling and daily intentions' },
  ]

  return (
    <section ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container-wide mb-8">
          <p className="text-[var(--text-muted)] font-body text-xs uppercase tracking-[0.25em] mb-3">
            03 — Horizontal Scroll Gallery
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-[var(--text)]">
            Five Rituals, One Journey
          </h2>
        </div>

        <motion.div
          style={{ x: shouldReduce ? 0 : smoothX }}
          className="flex gap-8 pl-6 md:pl-12"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`flex-shrink-0 w-[320px] md:w-[420px] h-[400px] md:h-[480px] rounded-3xl bg-gradient-to-br ${card.color} p-8 md:p-10 flex flex-col justify-between text-white shadow-xl`}
              whileHover={{ scale: 1.03, rotateY: 3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div>
                <span className="text-5xl">{card.emoji}</span>
                <h3 className="font-heading text-3xl md:text-4xl mt-6 font-bold">{card.title}</h3>
                <p className="font-body text-white/80 mt-4 text-lg leading-relaxed">{card.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-white/60 font-body text-sm">
                <span className="w-8 h-[1px] bg-white/40" />
                Ritual {i + 1} of 5
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Section 4: Parallax Depth Cards ───────────────────────────
function DepthCardsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (shouldReduce) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    })
  }, [shouldReduce])

  const features = [
    { title: 'Guided Audio', desc: 'Calming voiceovers for every ritual step', icon: '🎧', depth: 30 },
    { title: 'Progress Tracking', desc: 'Streaks, badges, and family milestones', icon: '📊', depth: 20 },
    { title: 'Age Adaptive', desc: 'Content that grows with your child', icon: '🌱', depth: 40 },
    { title: 'Offline Ready', desc: 'No wifi needed — works anywhere', icon: '📱', depth: 15 },
    { title: 'Family Profiles', desc: 'Each member gets their own journey', icon: '👨‍👩‍👧‍👦', depth: 35 },
    { title: 'Science-Backed', desc: 'Built on child development research', icon: '🧠', depth: 25 },
  ]

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="section-py bg-gradient-to-b from-[var(--cream)] to-[var(--sage-light)]"
    >
      <div className="container-wide">
        <p className="text-[var(--text-muted)] font-body text-xs uppercase tracking-[0.25em] mb-3">
          04 — Mouse-Driven Parallax Depth
        </p>
        <h2 className="font-heading text-3xl md:text-4xl text-[var(--text)] mb-12">
          Move your cursor to explore
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={shouldReduce ? {} : {
                transform: `translate(${mouse.x * f.depth * 0.3}px, ${mouse.y * f.depth * 0.3}px)`,
                transition: 'transform 0.3s ease-out',
              }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[var(--border-light)] shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <span className="text-4xl block mb-4">{f.icon}</span>
              <h3 className="font-heading text-xl font-semibold text-[var(--text)] mb-2">{f.title}</h3>
              <p className="font-body text-[var(--text-light)] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section 5: Zoom Tunnel / Scale on Scroll ──────────────────
function ZoomTunnelSection() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale1 = useTransform(scrollYProgress, [0, 0.5], [0.6, 1])
  const scale2 = useTransform(scrollYProgress, [0.1, 0.6], [0.4, 1])
  const scale3 = useTransform(scrollYProgress, [0.2, 0.7], [0.2, 1])
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15])

  return (
    <section ref={ref} className="min-h-[120vh] relative flex items-center justify-center section-py overflow-hidden">
      <div className="container-wide text-center relative z-10">
        <p className="text-[var(--text-muted)] font-body text-xs uppercase tracking-[0.25em] mb-3">
          05 — Scroll-Driven Zoom
        </p>
        <h2 className="font-heading text-3xl md:text-4xl text-[var(--text)] mb-16">
          Zoom into the experience
        </h2>

        <div className="relative w-full max-w-lg mx-auto aspect-square">
          {/* Outer ring */}
          <motion.div
            style={shouldReduce ? {} : { scale: scale1, opacity: opacity1, rotate }}
            className="absolute inset-0 rounded-full border-4 border-[var(--sage)] flex items-center justify-center"
          >
            <span className="absolute -top-8 font-body text-sm text-[var(--text-muted)] tracking-wide">BREATHE</span>
          </motion.div>

          {/* Middle ring */}
          <motion.div
            style={shouldReduce ? {} : { scale: scale2, opacity: opacity2 }}
            className="absolute inset-8 md:inset-12 rounded-full border-4 border-[var(--forest)] flex items-center justify-center"
          >
            <span className="absolute -top-8 font-body text-sm text-[var(--text-muted)] tracking-wide">MOVE</span>
          </motion.div>

          {/* Inner ring */}
          <motion.div
            style={shouldReduce ? {} : { scale: scale3, opacity: opacity3 }}
            className="absolute inset-16 md:inset-24 rounded-full bg-gradient-to-br from-[var(--forest)] to-[var(--forest-deep)] flex items-center justify-center shadow-2xl"
          >
            <span className="text-white font-heading text-2xl md:text-3xl font-bold">Focus</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Section 6: Staggered Counter Stats ────────────────────────
function ScrollCounterSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduce = useReducedMotion()

  const stats = [
    { value: 25, suffix: 'min', label: 'Daily routine' },
    { value: 5, suffix: '', label: 'Core rituals' },
    { value: 92, suffix: '%', label: 'Families feel calmer' },
    { value: 10, suffix: 'k+', label: 'Active families' },
  ]

  return (
    <section ref={ref} className="section-py bg-[var(--forest-deep)]">
      <div className="container-wide">
        <p className="text-white/40 font-body text-xs uppercase tracking-[0.25em] mb-3">
          06 — Scroll-Triggered Counters
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="font-heading text-4xl md:text-6xl font-bold text-white">
                {isInView ? <AnimatedCounter value={stat.value} reduce={shouldReduce} /> : 0}
                <span className="text-[var(--sage)]">{stat.suffix}</span>
              </div>
              <p className="font-body text-white/60 mt-2 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedCounter({ value, reduce }: { value: number; reduce: boolean | null }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (reduce) { setCount(value); return }
    let start = 0
    const duration = 1500
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    let startTime: number | null = null
    requestAnimationFrame(step)
  }, [value, reduce])
  return <>{count}</>
}

// ── Section 7: Perspective Tilt Cards ─────────────────────────
function PerspectiveTiltSection() {
  const shouldReduce = useReducedMotion()

  const plans = [
    { name: 'Free', price: '$0', features: ['1 ritual per day', 'Basic tracking', 'Community access'], accent: 'var(--sage)' },
    { name: 'Family', price: '$9.99', features: ['All 5 rituals', 'Family profiles', 'Offline mode', 'Progress insights'], accent: 'var(--forest)', featured: true },
    { name: 'School', price: 'Custom', features: ['Classroom tools', 'Teacher dashboard', 'Bulk licensing', 'Admin reports'], accent: 'var(--amber)' },
  ]

  return (
    <section className="section-py">
      <div className="container-wide">
        <p className="text-[var(--text-muted)] font-body text-xs uppercase tracking-[0.25em] mb-3">
          07 — 3D Perspective Tilt
        </p>
        <h2 className="font-heading text-3xl md:text-4xl text-[var(--text)] mb-12">
          Hover to interact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1200px]">
          {plans.map((plan, i) => (
            <TiltCard key={plan.name} plan={plan} index={i} reduce={shouldReduce} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TiltCard({ plan, index, reduce }: { plan: { name: string; price: string; features: string[]; accent: string; featured?: boolean }; index: number; reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (reduce) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
    setTilt({ x, y })
  }, [reduce])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: reduce ? 'none' : `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`rounded-2xl p-8 border transition-shadow duration-300 ${
        plan.featured
          ? 'bg-[var(--forest)] text-white border-[var(--forest)] shadow-xl scale-105'
          : 'bg-white border-[var(--border-light)] shadow-sm hover:shadow-lg'
      }`}
    >
      <div
        className="w-3 h-3 rounded-full mb-4"
        style={{ backgroundColor: plan.accent }}
      />
      <h3 className="font-heading text-2xl font-bold mb-1">{plan.name}</h3>
      <p className={`font-heading text-3xl font-bold mb-6 ${plan.featured ? 'text-white' : 'text-[var(--forest)]'}`}>
        {plan.price}
        {plan.price !== 'Custom' && <span className="text-sm font-body font-normal opacity-60">/mo</span>}
      </p>
      <ul className="space-y-3">
        {plan.features.map(f => (
          <li key={f} className={`font-body text-sm flex items-center gap-2 ${plan.featured ? 'text-white/80' : 'text-[var(--text-light)]'}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 8l3 3 5-5" stroke={plan.featured ? 'rgba(255,255,255,0.7)' : plan.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ── Section 8: Scroll Progress Reveal Image ───────────────────
function ImageRevealSection() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(50% 50% 50% 50% round 24px)', 'inset(0% 0% 0% 0% round 24px)']
  )

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1])

  return (
    <section ref={ref} className="section-py">
      <div className="container-wide">
        <p className="text-[var(--text-muted)] font-body text-xs uppercase tracking-[0.25em] mb-3">
          08 — Scroll Clip-Path Reveal
        </p>
        <h2 className="font-heading text-3xl md:text-4xl text-[var(--text)] mb-12">
          Unveil as you scroll
        </h2>

        <motion.div
          style={shouldReduce ? {} : { clipPath }}
          className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden"
        >
          <motion.div
            style={shouldReduce ? {} : { scale: imgScale }}
            className="w-full h-full bg-gradient-to-br from-[var(--forest)] via-[var(--sage)] to-[var(--amber)] flex items-center justify-center"
          >
            <div className="text-center">
              <span className="text-6xl md:text-8xl block mb-4">🌿</span>
              <p className="font-heading text-2xl md:text-4xl text-white font-bold">
                Your family&apos;s wellness journey
              </p>
              <p className="font-body text-white/70 mt-3 text-lg">starts with one breath</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Section 9: Floating Particles Background ──────────────────
function FloatingParticlesSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative section-py overflow-hidden bg-gradient-to-b from-[var(--cream)] to-white">
      {/* Floating particles */}
      {!shouldReduce && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 10 + 4,
                height: Math.random() * 10 + 4,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['var(--sage)', 'var(--amber)', 'var(--forest)', 'var(--gold)'][i % 4],
                opacity: 0.25,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="container-wide relative z-10 text-center">
        <p className="text-[var(--text-muted)] font-body text-xs uppercase tracking-[0.25em] mb-3">
          09 — Ambient Floating Particles
        </p>
        <h2 className="font-heading text-3xl md:text-5xl text-[var(--text)] mb-6">
          A living, breathing interface
        </h2>
        <p className="font-body text-[var(--text-light)] max-w-2xl mx-auto text-lg leading-relaxed">
          Subtle particle animations create a sense of life and calm. These small floating
          elements use the brand palette and add organic warmth without distracting
          from content. Notice how they drift gently — no sharp or jarring movements.
        </p>
      </div>
    </section>
  )
}

// ── Section 10: Sticky Scroll Progress ────────────────────────
function StickyProgressSection() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const steps = [
    { title: 'Wake Up Gently', desc: 'A soft chime replaces harsh alarms. The app eases your family into the day with calming sounds.', icon: '🌅' },
    { title: 'Breathe Together', desc: 'Follow animated breathing guides designed for both adults and children. 5 minutes of shared calm.', icon: '🫁' },
    { title: 'Move & Stretch', desc: 'Fun, age-appropriate movements keep kids engaged while giving parents a gentle workout.', icon: '🤸' },
    { title: 'Focus & Ground', desc: 'Quick mindfulness exercises build attention and emotional regulation for the whole family.', icon: '🧘' },
    { title: 'Set Your Intention', desc: 'End the ritual with a shared family intention — a positive anchor for the day ahead.', icon: '✨' },
  ]

  return (
    <section ref={ref} className="relative" style={{ height: `${(steps.length + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: progress indicator */}
          <div>
            <p className="text-[var(--text-muted)] font-body text-xs uppercase tracking-[0.25em] mb-3">
              10 — Sticky Scroll Progress
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-[var(--text)] mb-8">
              Your morning ritual
            </h2>

            {/* Progress bar */}
            <div className="relative h-1 bg-[var(--border)] rounded-full mb-8 overflow-hidden">
              <motion.div
                style={{ scaleX: shouldReduce ? 1 : scrollYProgress, transformOrigin: 'left' }}
                className="absolute inset-0 bg-[var(--forest)] rounded-full"
              />
            </div>

            {steps.map((step, i) => {
              return <ProgressStep key={step.title} step={step} index={i} total={steps.length} progress={scrollYProgress} reduce={shouldReduce} />
            })}
          </div>

          {/* Right: animated visual */}
          <div className="hidden md:flex items-center justify-center">
            <ProgressVisual progress={scrollYProgress} reduce={shouldReduce} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgressStep({ step, index, total, progress, reduce }: { step: { title: string; desc: string; icon: string }; index: number; total: number; progress: ReturnType<typeof useScroll>['scrollYProgress']; reduce: boolean | null }) {
  const stepStart = index / total
  const stepEnd = (index + 1) / total
  const opacity = useTransform(progress, [stepStart, stepStart + 0.05, stepEnd - 0.05, stepEnd], [0.3, 1, 1, 0.3])
  const x = useTransform(progress, [stepStart, stepStart + 0.05], [10, 0])

  return (
    <motion.div
      style={reduce ? {} : { opacity, x }}
      className="flex items-start gap-3 mb-4 py-2"
    >
      <span className="text-xl flex-shrink-0">{step.icon}</span>
      <div>
        <h3 className="font-heading text-lg font-semibold text-[var(--text)]">{step.title}</h3>
        <p className="font-body text-sm text-[var(--text-light)] leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  )
}

function ProgressVisual({ progress, reduce }: { progress: ReturnType<typeof useScroll>['scrollYProgress']; reduce: boolean | null }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [0.8, 1.1, 0.9])
  const hue = useTransform(progress, [0, 1], [120, 45]) // green to amber

  return (
    <motion.div
      style={reduce ? {} : { rotate, scale }}
      className="w-64 h-64 rounded-full flex items-center justify-center"
    >
      <motion.div
        style={reduce ? { background: 'var(--forest)' } : {
          background: `conic-gradient(from 0deg, var(--forest), var(--sage), var(--amber), var(--forest))`,
        }}
        className="w-full h-full rounded-full flex items-center justify-center shadow-2xl"
      >
        <div className="w-48 h-48 rounded-full bg-[var(--cream)] flex items-center justify-center">
          <motion.span
            style={reduce ? {} : { rotate: useTransform(progress, [0, 1], [0, -360]) }}
            className="text-5xl"
          >
            🌿
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────
export default function ExperimentPage() {
  return (
    <main>
      <Navbar />
      <ParallaxHero />
      <TextRevealSection />
      <HorizontalScrollSection />
      <DepthCardsSection />
      <ZoomTunnelSection />
      <ScrollCounterSection />
      <PerspectiveTiltSection />
      <ImageRevealSection />
      <FloatingParticlesSection />
      <StickyProgressSection />

      {/* Footer spacer */}
      <section className="section-py bg-[var(--forest-deep)] text-center">
        <p className="font-body text-white/40 text-sm">
          End of experiment — scroll back up to replay animations
        </p>
        <a href="/" className="inline-block mt-4 font-body text-[var(--sage)] hover:text-white transition-colors text-sm">
          ← Back to home
        </a>
      </section>
    </main>
  )
}
