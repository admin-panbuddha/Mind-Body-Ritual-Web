# MindBodyRitual — Motion Spec

## Competitive Research Summary

Six wellness/meditation marketing sites were analyzed for animation patterns:

| Site | Animation Approach | Hero | Scroll Reveals | Ambient | Timing |
|---|---|---|---|---|---|
| **Calm** | CSS-only, very minimal | Static headline, soft hover states | None — page is mostly static | None | 200–300ms ease-out |
| **Headspace** | CSS transitions only | Clean entrance, no animation | Minimal fade | None | 150–400ms, custom cubic-bezier(0.32, 0.94, 0.6, 1) |
| **Waking Up** | Richest of the group | 1.2–1.5s ease-out staggered entrance | `scroll` keyframe, `slide-down-custom` | `pulse-scale`, `mini-pulse`, `pulse-fade-out` | 300ms–1500ms ease-out |
| **Breathwrk** | Minimal (acquired by Peloton) | Static | 44s infinite ticker loop | None | 400ms |
| **Insight Timer** | Material UI ripple + Swiper | Standard | Standard MUI transitions | None | 200–300ms ease-out |
| **Open** | Most meditative/creative | `blur` (6s!), `fadeIn` | `fadeIn` on scroll | `pulse-glow`, `jiggle`, breathing rhythms | 500ms–1000ms ease, 6s ambient |

### Key Patterns

1. **Slow is premium.** Every site favors 300–600ms for interactions and 800–1500ms for entrance reveals. Fast motion (< 200ms) only appears on micro-interactions like color changes.
2. **ease-out everywhere.** Content arrives gently and decelerates into its final position. Nothing "bounces in" or "springs" — that would feel energetic, not calming.
3. **Opacity + transform only.** No site animates height, width, margin, or padding. All motion uses compositor-friendly properties (zero layout shift).
4. **Ambient effects are rare but powerful.** Only Waking Up and Open use ambient pulse/glow. When present, they run at slow intervals (4–8s cycles) and very low opacity change (~5–10%).
5. **No heavy JS libraries on marketing pages.** All six use pure CSS keyframes or at most CSS-in-JS (styled-components). None ship GSAP, Three.js, or Lottie on their landing page.
6. **Hero sections are understated.** The headline is the star. Animation serves the copy, never competes with it.

---

## Motion Principles (for MindBodyRitual)

### 1. Calm over clever
Every animation should feel like a slow exhale. If it draws attention to itself, it's too much.

### 2. Intentional, not decorative
Each animation must have a purpose: guide attention, reveal hierarchy, confirm interaction, or create atmosphere. Remove anything that exists purely to "look cool."

### 3. One thing at a time
Never animate more than 2–3 elements simultaneously. Stagger reveals so the eye has a clear path.

### 4. Arrival, not departure
Content should feel like it's gently settling into place — not sliding off or bouncing away. Use ease-out/deceleration curves, not ease-in or spring physics.

---

## Timing Tokens

| Token | Value | Use for |
|---|---|---|
| `instant` | 120ms | Color changes, hover state, icon swap |
| `fast` | 250ms | Button hover scale, tooltip appear, micro-feedback |
| `normal` | 500ms | Section reveals, card entrances, fade-in |
| `slow` | 800ms | Hero headline entrance, ambient shift |
| `ambient` | 4000–8000ms | Breathing glow, gradient drift, background pulse |

### Easing

| Name | Value | Use for |
|---|---|---|
| `ease-out` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | All entrances and reveals |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover states, interactive feedback |
| `ease-gentle` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero headline, premium entrance |

**Never use:** `linear` (feels mechanical), `ease-in` alone (feels like falling), spring/bounce (too energetic for wellness).

---

## Interaction Rules

### Scroll Reveals
- **Trigger:** `whileInView` with `viewport.margin: '-80px'` (fire 80px before visible)
- **Direction:** Always fade-up (`opacity: 0 → 1, y: 30 → 0`)
- **Duration:** 500ms ease-out
- **Stagger:** 100–120ms between children in a grid
- **Once:** `viewport.once: true` — animate once, never re-trigger
- **CLS rule:** initial state must not reserve different space (use `opacity + transform` only)

### Hero Entrance
- **Timing:** 600–800ms ease-gentle, staggered 150ms per element
- **Order:** Badge → Headline → Subheadline → CTA → Social proof → Phone mockup
- **Delay:** 200ms initial delay (let the page paint first)

### Button Hover / Tap
- **Hover:** `scale(1.04)` over 200ms ease-in-out
- **Tap:** `scale(0.96)` over 100ms
- **Ghost/outline buttons:** lighter — `scale(1.025)` hover, `scale(0.975)` tap
- **Never animate:** background-color with motion (use CSS transition instead — it's cheaper)

### Ambient Background
- **Gradient orbs:** slow drift via CSS `@keyframes` at 6–8s cycle
- **Glow pulse:** `opacity: 0.05 → 0.12` over 4s ease-in-out infinite alternate
- **Rule:** ambient animations must be imperceptible at first glance. If a user notices them consciously, they're too strong.

### Route / Page Transitions
- **Enter:** fade-in + 10px upward slide, 400ms ease-out
- **Exit:** fade-out + 6px upward slide, 200ms ease-in-out
- **Rule:** page transition must never block interaction. Content should be interactive before animation completes.

---

## Accessibility Rules

### prefers-reduced-motion
- Every animated component MUST check `useReducedMotion()` from motion/react
- When `true`: render immediately, no animation, no invisible initial state, no delay
- Implementation: early return a plain `<div>` — not a `motion.div` with `animate: false`

### Focus / keyboard
- Motion must never interfere with focus order or keyboard navigation
- Focus ring styles are never animated (static 2px outline)

### Seizure safety
- No flashing content (nothing faster than 3Hz)
- Ambient glow changes must be < 10% opacity delta

---

## Performance Rules

### Compositor-only properties
Only animate these:
- `opacity`
- `transform` (translate, scale, rotate)

Never animate: `height`, `width`, `margin`, `padding`, `top/left/right/bottom`, `border-radius`, `box-shadow` (use CSS transition for shadow on hover instead).

### will-change
- Set `will-change: opacity, transform` on elements that will animate
- Remove `will-change` after animation completes (the `<Reveal>` component handles this)

### Bundle size
- motion/react with `LazyMotion` + `domAnimation` = ~4.6 KB gzipped
- Never import `domMax` (adds drag, layout animations — not needed for marketing site)

### No layout shift (CLS = 0)
- Initial hidden state: `{ opacity: 0, y: 30 }` — same box size, just invisible
- Never use `{ height: 0 }` or `{ display: none }` as initial state
- All animated content must occupy its full space from first paint

---

## Phase 2 — Three Animation Directions

### Direction A: "Breathing Calm" (inspired by Waking Up + Open)

**What it looks like:** The hero headline and subtext stagger in over ~800ms with a gentle deceleration curve, while soft background gradient orbs slowly pulse and drift on a 6-second breathing cycle. Scroll-triggered sections fade up one at a time with 120ms stagger between cards. The phone mockup floats in slightly later with a subtle scale entrance.

**Where it applies:**
- Hero: staggered text entrance (badge → h1 → p → CTA → social proof → phone)
- Hero background: ambient CSS `@keyframes` on existing gradient orbs (slow drift + opacity pulse)
- All sections: `<Reveal>` fade-up at 500ms, stagger grids at 120ms
- Buttons: scale hover/tap micro-interactions (already implemented)

**Complexity:** Medium — ~3 hours. Mostly updating Hero.tsx with motion entrance + adding CSS ambient keyframes to existing gradient blobs.

**Why it fits:** The "breathing" metaphor matches MindBodyRitual's core product (breathwork ritual). The ambient motion feels alive without being distracting. This is the Waking Up approach applied to our warmer color palette.

---

### Direction B: "Soft Focus" (inspired by Open's blur entrance)

**What it looks like:** The entire hero viewport starts with a 2-second blur-in effect (like looking through frosted glass that clears), then content elements appear in sequence. Scroll sections use subtle vertical parallax — text scrolls faster than background shapes, creating gentle depth. The phone mockup has a floating parallax offset.

**Where it applies:**
- Hero: full-viewport CSS blur dissolve (2s) + staggered content
- Hero background: parallax offset on gradient orbs (scrollY * 0.1)
- Sections: fade-up + slight parallax (background shapes at 0.95 speed)
- Phone mockup: floating animation with scroll-linked parallax

**Complexity:** High — ~5 hours. Requires scroll-linked parallax (useScroll + useTransform from motion), blur filter animation, and careful performance tuning.

**Risk:** Blur animations can be GPU-expensive on older devices. Parallax adds complexity and risks mobile jank if not carefully throttled.

---

### Direction C: "Mindful Minimal" (inspired by Calm + Headspace)

**What it looks like:** Extremely restrained. Hero text appears instantly on load (no entrance animation). Scroll sections get a simple opacity fade (no translate/slide). The only motion is hover states on buttons and cards. Background is completely static.

**Where it applies:**
- Hero: static (no entrance animation)
- Sections: opacity-only fade on scroll (300ms)
- Buttons: hover/tap micro-interactions (already implemented)
- No ambient effects anywhere

**Complexity:** Low — ~1 hour. Mostly simplifying what's already built (shorter durations, remove y-translate from reveals).

**Trade-off:** Safe and fast, but doesn't differentiate MindBodyRitual from a static template. Calm and Headspace can afford to be minimal because their brands are already established — MindBodyRitual needs to make a first impression.

---

### Selected Direction: A — "Breathing Calm"

**Rationale:** Direction A hits the sweet spot between premium feel and practical complexity. The breathing ambient effect directly mirrors the product's core ritual (breathwork), the staggered entrance gives the hero personality, and the implementation reuses our existing `<Reveal>` system. Direction B adds too much risk for diminishing returns, and Direction C doesn't move the needle enough for a brand that needs to stand out.
