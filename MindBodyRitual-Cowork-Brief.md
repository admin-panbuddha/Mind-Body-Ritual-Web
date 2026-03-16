# MindBodyRitual — Cowork Session Brief

Paste this entire file into a new Cowork session to get up to speed instantly.

---

## 🧠 STANDING RULES (read first, always follow)

### 1. Folder hygiene — ALWAYS save files to the right place
- **All project files go to the repo root:** `C:\Users\nicho\-CoworkFiles\MindBodyRitual-Website\`
- **Never create nested project subfolders** (no `mindbodyritual/`, no `mindbodyritual-next/`, no `v2/`, etc.)
- The root IS the project. `src/`, `public/`, `package.json` all live directly at the root.
- If you create a temp file for testing, delete it before the session ends.

### 2. Remind the user to clean up periodically
- Every 3–4 sessions, prompt: *"Quick reminder — want me to audit the folder and remove any stale files or old experiments?"*
- Signs it's time to clean: multiple `package.json` files, duplicate folders, old `.md` session summaries, test scripts not in `src/`.

### 3. GitHub sync — push BEFORE starting new work, push AFTER every change
- **At the start of every session:** pull latest from GitHub before touching any file (`git pull origin main` in the staging repo)
- **After every meaningful change:** push to GitHub before moving on to the next task — don't stack multiple features without committing
- **Never leave a session with unpushed changes** — if the session ends mid-task, commit what exists with a `[WIP]` prefix in the message
- Staging repo lives at `/tmp/mbr-web-staging` inside the Cowork VM — re-clone it if missing: `git clone https://[token]@github.com/admin-panbuddha/Mind-Body-Ritual-Web.git /tmp/mbr-web-staging`

### 4. Cross-platform rule — every feature must work on all 4 platforms
1. **PC (Windows)** — Chrome, Edge, Firefox
2. **macOS** — Safari, Chrome
3. **Android** — Chrome mobile
4. **iOS (iPhone/iPad)** — Safari mobile

Before implementing anything: touch targets min 44×44px, use `@media (hover:hover)` for hover states, test at 375/768/1024/1440px, mind Safari quirks (`-webkit-` prefixes, no `dvh` on older iOS).

---

## PROJECT OVERVIEW

**MindBodyRitual** — a family wellness app. A 25-minute morning routine (5 rituals × 5 minutes) for caregivers and kids ages 3+. Parent brand: **Panbuddha**.

---

## CURRENT STATE (as of March 2026)

We completed a full Next.js rebuild. The marketing website is fully coded and pushed to GitHub. It is **not yet live on Ionos** — that's the next step.

The old Express/Node.js app has been deleted. The repo now contains only the Next.js project.

---

## TECH STACK

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | Next.js 14 + TypeScript + Tailwind CSS | `output: 'export'` — generates static HTML/CSS/JS for Ionos |
| **Animations** | CSS (fadeUp, float, countUp) + IntersectionObserver | No GSAP, no Framer Motion — pure CSS for performance |
| **Fonts** | Lora (headings) + Raleway (body) | Google Fonts, loaded in `globals.css` |
| **UI Components** | Custom (Button, Card, Input, Accordion) | In `src/components/ui/` |
| **Hosting** | Ionos Web Hosting Pro | Upload `/out/` folder via FTP after `npm run build`. Domain: mindbodyritual.ca |
| **Database** | Supabase (free tier, PostgreSQL) | Browser client at `src/lib/supabase/client.ts` — not yet configured |
| **Auth (planned)** | Supabase Auth | Built-in email/Google auth |
| **Payments (planned)** | Stripe (CAD) | Future phase |
| **Version Control** | GitHub + GitHub Desktop | Repo: `admin-panbuddha/Mind-Body-Ritual-Web`, branch: `main` |
| **Code Editor** | VS Code | |

---

## BRAND / DESIGN TOKENS

- **Colors:** cream `#FAF9F2` · forest `#3D6B4F` · forest-deep `#2C4A37` · sage `#8BA888` · amber `#E5B177` · olive `#55583D` · gold `#C9A96E`
- **Fonts:** Lora (headings, serif) · Raleway (body, sans-serif)
- **Feel:** Warm, organic, premium wellness — not corporate, not techy
- **Mascot:** Panbuddha panda 🐼 (`/public/images/panbuddha.png` — needs to be added)

---

## FOLDER STRUCTURE (root)

```
C:\Users\nicho\-CoworkFiles\MindBodyRitual-Website\
├── src/
│   ├── app/
│   │   ├── globals.css          ← CSS variables, animations, Tailwind base
│   │   ├── layout.tsx           ← root layout + metadata
│   │   ├── page.tsx             ← landing page (all sections)
│   │   ├── pricing/page.tsx
│   │   ├── support/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Navbar.tsx       ← sticky scroll-aware nav + mobile menu
│   │   │   ├── Hero.tsx         ← headline + phone mockup + CTAs
│   │   │   ├── SocialProof.tsx  ← infinite ticker
│   │   │   ├── HowItWorks.tsx   ← 4 steps
│   │   │   ├── RitualCards.tsx  ← 5 ritual cards
│   │   │   ├── Stats.tsx        ← animated count-up stats
│   │   │   ├── Testimonials.tsx ← masonry testimonial grid
│   │   │   ├── PricingSection.tsx
│   │   │   ├── Download.tsx     ← app store buttons + email waitlist
│   │   │   ├── FAQSection.tsx   ← accordion FAQ
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── Button.tsx       ← 4 variants, 3 sizes, href support
│   │       ├── Card.tsx
│   │       ├── Input.tsx        ← includes Textarea
│   │       └── Accordion.tsx    ← animated open/close
│   ├── hooks/
│   │   └── useReveal.ts         ← IntersectionObserver scroll reveal
│   └── lib/
│       ├── supabase/client.ts   ← browser Supabase client (needs .env.local)
│       └── utils.ts             ← cn() helper (clsx + tailwind-merge)
├── public/
│   └── images/                  ← drop panbuddha.png and other assets here
├── package.json
├── next.config.ts               ← output: 'export', trailingSlash: true
├── tailwind.config.ts           ← full design system (colors, fonts, spacing)
├── tsconfig.json
├── postcss.config.js
├── .env.example                 ← copy to .env.local and fill in Supabase keys
├── .gitignore
└── MindBodyRitual-Cowork-Brief.md   ← this file
```

---

## LOCAL DEV COMMANDS (run in PowerShell)

```powershell
cd "C:\Users\nicho\-CoworkFiles\MindBodyRitual-Website"
npm install          # first time only
npm run dev          # dev server → http://localhost:3000
npm run build        # generates /out/ folder → upload to Ionos
```

---

## GITHUB

- **Repo:** `https://github.com/admin-panbuddha/Mind-Body-Ritual-Web`
- **Username:** `admin-panbuddha`
- **Branch:** `main` only — no other branches
- **Local path:** `C:\Users\nicho\-CoworkFiles\MindBodyRitual-Website`
- **Token:** stored in Cowork VM staging repo at `/tmp/mbr-web-staging`

---

## WHAT'S BUILT ✅

- Full Next.js marketing site — 9 landing page sections + 4 inner pages (pricing, support, privacy, terms)
- Design system — brand colors, Lora/Raleway fonts, spacing scale, shadows
- All UI components — Button, Card, Input, Accordion
- Scroll animations — CSS fadeUp, float, countUp via IntersectionObserver
- Supabase client file — ready to connect once keys are added

## WHAT'S NEXT 🔜

1. **Run locally** — `npm install` + `npm run dev` to see the site
2. **Add images** — drop `panbuddha.png` into `public/images/`
3. **Configure Supabase** — create project, copy keys to `.env.local`, build schema
4. **Deploy to Ionos** — `npm run build` → upload `/out/` contents via FTP to Ionos
5. **Email waitlist** — wire up the Download section form to Supabase
6. **Stripe** — payments (future phase)
7. **Mobile app** — React Native / Expo (future phase)

---

## HOSTING SETUP

| Service | Role | Status |
|---------|------|--------|
| **Ionos Web Hosting Pro** | Static files + domain mindbodyritual.ca | Have account — need to upload `/out/` after build |
| **Supabase (free tier)** | PostgreSQL + Auth + Realtime | Not configured yet |
| **Stripe** | CAD payments | Not configured yet |
| **GitHub** | Version control | Active, repo connected |

**Key constraint:** Ionos is shared PHP hosting — no Node.js. Next.js must always use `output: 'export'` to generate plain static files.

---
