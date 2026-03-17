# MindBodyRitual Website — Project Backlog
**Live URL:** mindbodyritual.ca (not yet live — needs Ionos deploy)
**Stack:** Next.js 14 + TypeScript + Tailwind CSS → Static export → Ionos
**GitHub:** github.com/admin-panbuddha/Mind-Body-Ritual-Web
**Last Updated:** March 2026

---

## Status Key
- 🔴 Blocked | 🟡 In Progress | 🟢 Done | ⚪ Backlog | 🔵 Next Up

---

## 🔵 Next Up (do these first)

| Task | Priority | Notes |
|---|---|---|
| Run locally and verify build | High | npm install → npm run dev → confirm all 9 sections render |
| Add panbuddha.png mascot image | High | Drop into public/images/ — referenced throughout site |
| Deploy to Ionos | High | npm run build → FTP upload /out/ contents to public_html |
| Configure Supabase | High | Create project, add keys to .env.local, test connection |

---

## ⚪ Backlog

| Task | Priority | Notes |
|---|---|---|
| Wire up email waitlist form | High | Download section form → Supabase table |
| "Direction A: Breathing Calm" animations | High | Hero entrance + ambient CSS + scroll reveals — see MOTION-SPEC.md |
| Add Panbuddha mascot to Hero section | Medium | Panda character — warm brand anchor |
| SEO meta tags + Open Graph | Medium | Title, description, og:image per page |
| Google Analytics / Plausible | Medium | Track waitlist signups and page views |
| Stripe integration (CAD) | Low | Future — pricing page payment flow |
| Privacy policy content | Low | privacy/page.tsx is scaffolded — needs real content |
| Terms of service content | Low | terms/page.tsx is scaffolded — needs real content |
| Blog / content section | Low | Wellness content — use Wellness Content Agent skill |
| Sitemap.xml generation | Low | Add to Next.js config for SEO |
| Performance audit | Low | Lighthouse score — target 95+ on mobile |

---

## 🟢 Done

| Task | Completed | Notes |
|---|---|---|
| Full Next.js rebuild | ✅ | Replaced old Express/Node.js version |
| Design system | ✅ | Brand colors, Lora/Raleway fonts, spacing scale |
| All UI components | ✅ | Button, Card, Input, Accordion |
| 9 landing page sections | ✅ | Hero, SocialProof, HowItWorks, RitualCards, Stats, Testimonials, Pricing, Download, FAQ |
| 4 inner pages | ✅ | pricing, support, privacy, terms |
| Scroll reveal animations (base) | ✅ | CSS fadeUp via IntersectionObserver |
| Supabase client file | ✅ | src/lib/supabase/client.ts — ready, needs keys |
| Static export config | ✅ | output: export in next.config.ts — Ionos compatible |
| Motion competitive research | ✅ | See MOTION-SPEC.md — 6 competitor sites analyzed |
| GitHub repo | ✅ | admin-panbuddha/Mind-Body-Ritual-Web |

---

## Decision Log

| Date | Decision | Why |
|---|---|---|
| 2026 | Ionos not Vercel | User already has Ionos hosting + domain |
| 2026 | Static export (output: export) | Ionos is shared PHP hosting — no Node.js server |
| 2026 | Pure CSS animations not GSAP | Performance — no heavy JS on marketing page |
| 2026 | Direction A animations (Breathing Calm) | Matches brand ritual metaphor, medium complexity |
