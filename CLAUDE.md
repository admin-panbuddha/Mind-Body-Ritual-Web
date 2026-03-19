# CLAUDE.md — MindBodyRitual Website
**Core memory file. Read this before touching anything.**
Last updated: 2026-03-19

---

## Project Identity

| Field | Value |
|---|---|
| Name | MindBodyRitual |
| Type | Next.js marketing website (static, no auth) |
| Live URL | https://mind-body-ritual-web-production.up.railway.app |
| GitHub | https://github.com/admin-panbuddha/Mind-Body-Ritual-Web.git |
| Owner | nicho — panbuddha.ca@gmail.com |
| Status | Local and Railway in sync as of 2026-03-19 |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript 5.7 (strict) |
| Styling | Tailwind CSS v4 + custom tokens in tailwind.config.ts |
| Animation | motion/react — import as: import { motion, AnimatePresence } from 'motion/react' |
| Icons | next/image via custom Icon component — SVGs in /public/icons/ |
| Fonts | Heading: Playfair Display / Body: Inter (Google Fonts via layout.tsx) |
| Deployment | Railway — auto-deploys on push to GitHub main |

NEVER use framer-motion — this project uses motion/react (the new package name).

---

## Project Structure

src/
  app/
    layout.tsx           Root layout (fonts, metadata)
    page.tsx             Entry point — assembles all sections
  components/
    sections/            One file per page section
      Navbar.tsx
      Hero.tsx
      HowItWorks.tsx
      RitualCards.tsx    Five rituals + clock + slider
      Stats.tsx
      Resources.tsx
      Testimonials.tsx
      MusicSection.tsx
      VideoLibrary.tsx
      PricingSection.tsx
      FAQSection.tsx
      Download.tsx
      Footer.tsx
    ui/
      Icon.tsx           Shared icon component
  content.ts             ALL visible copy — single source of truth

public/
  icons/                 All SVG icons
  images/                Hero and section images

---

## How to Run Locally

  npm install
  npm run dev
  → http://localhost:3000

No database or external services required for local dev.

---

## Environment Variables

Required (check .env.local for values):

  NEXT_PUBLIC_SUPABASE_URL       Supabase project URL (waitlist form)
  NEXT_PUBLIC_SUPABASE_ANON_KEY  Supabase anon key (public, safe to expose)

If missing: waitlist form fails silently. Rest of site is fully static.

---

## Deployment — GO LIVE

Platform: Railway — auto-deploys when main branch is pushed to GitHub.
Deploy config: .deploy-config.json in project root (persists across sessions).
Staging repo (VM): /sessions/<id>/staging/Mind-Body-Ritual-Web/
  → Resets each Cowork session. Re-init using GitHub PAT from user if missing.

Deploy steps:
  1. Read .deploy-config.json
  2. Re-init staging repo if missing (git init + PAT remote)
  3. rsync workspace to staging (exclude .git, node_modules, .next)
  4. npx tsc --noEmit — must pass with zero errors
  5. git add . && git commit && git push origin main
  6. If rejected: git pull --rebase then push again
  7. Verify live URL loads correctly

Trigger: User says "deploy", "go live", or "push my changes"

---

## Pre-Deploy Checklist

Before every deploy confirm:
  [ ] npx tsc --noEmit — zero errors
  [ ] All imports resolve
  [ ] No placeholder content visible in production
  [ ] .deploy-config.json intact
  [ ] Staging repo initialized with valid PAT

---

## Code Conventions

CONTENT
  All visible text lives in src/content.ts — never hardcode strings in components.
  Components import named exports: import { ritualCards } from '@/content'

ICON COMPONENT
  <Icon name="ui_Icon_Flow" size={32} alt="Move ritual" />
  Icon has no style prop. To filter on dark backgrounds, wrap in span:
  <span style={{ filter: 'brightness(0) invert(1)' }}>
    <Icon name="ui_Icon_MindBodyRitual" size={32} />
  </span>

ANIMATIONS
  Always motion/react — never framer-motion.
  Standard easing: [0.22, 1, 0.36, 1]
  Scale anchored left: style={{ transformOrigin: 'left center' }}
  Mount/unmount: <AnimatePresence initial={false}>

RESPONSIVE SIZING
  Use clamp() for fluid values: width: clamp(90px, 15%, 130px)

BRAND COLORS (Tailwind tokens)
  forest = #305157 (primary dark green — logo fill color)
  Full token list in tailwind.config.ts

---

## The Five Ritual Stages

  Move       BODY    ui_Icon_Flow.svg
  Unpack     MIND    ui_Icon_Meditation.svg
  Breathe    ENERGY  ui_Icon_Breath.svg
  Gratitude  HEART   ui_Icon_Lotus.svg
  Intention  FOCUS   ui_Icon_Daily_Ritual_Setting.svg

All icons in /public/icons/

---

## Known Issues

  ui_Icon_MindBodyRitual.svg — PLACEHOLDER
    Real brand logo SVG was corrupted during upload.
    Currently showing a green circle with "M".
    User must re-upload actual logo SVG and redeploy.

---

## Rules for Modifying This Project

  1. Read the file before changing it
  2. Modify only what needs changing — no full rewrites
  3. No duplicate files (_v2, _final, _new suffixes)
  4. All text copy goes in content.ts — not hardcoded
  5. Run npx tsc --noEmit before every deploy
  6. After any change: list modified files + summarize what changed
  7. When unsure: ask before implementing

---

## Multi-Agent Continuity

This project is maintained across multiple AI agents and Cowork sessions.

After every session confirm:
  - Local and Railway are in sync
  - CLAUDE.md updated if anything significant changed
  - No orphaned or duplicate files
  - TypeScript passes clean

IMPORTANT: The deploy config PAT is session-ephemeral.
The staging repo at /tmp/ resets each VM session.
Ask the user for their GitHub PAT at the start of each new deploy session.
