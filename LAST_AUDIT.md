# Last Audit — MindBodyRitual Website
**Date:** 2026-03-18
**Verdict:** NO-GO ❌ → Fixed during audit → GO ✅
**Audited by:** Claude (review-and-debug skill)

---

## P0 Blockers (Fixed during audit)

- [x] `RitualCards.tsx:342` — `overflow: hidden` on section + scroll container ancestor breaks `position: sticky`, killing all scroll-driven animations. **Fixed:** changed section to `overflow-x: clip` (doesn't create a scroll container, so doesn't break sticky) and removed overflow from scroll container div.

---

## P1 Important

- [ ] `content.ts:247–252` — Music tracks + video library all point to `https://mindbodyritual.ca/media/audio/` and `/media/videos/` — files not yet uploaded to IONOS. Audio player and video library will silently fail to play. **Fix:** Upload .mp3 and .mp4 files to IONOS at those paths.
- [ ] `content.ts:38` — `hero.backgroundImage` field still present but Hero now uses a hardcoded video path. Field is unused dead config. **Fix:** Remove `backgroundImage` from hero config or repurpose it.

---

## P2 Nice-to-have

- [ ] `RitualCards.tsx:21` — `RITUAL_VIDEO_SRC` uses `/-videos/` path (intentional per user — IONOS folder named with dash). Document this clearly so future devs don't "fix" it.
- [ ] `Download.tsx:17` — Email submit is a placeholder (`setTimeout` mock). Supabase client exists in `src/lib/supabase/client.ts` but is never wired up. **Fix:** Connect to Supabase when ready to capture waitlist emails.
- [ ] `RitualCards.tsx:370` — Scroll container height `(rituals.length + 4) * 100vh` — if number of rituals ever changes from 5, scroll pacing will need manual retuning.
- [ ] `VideoLibrary.tsx:63` — Video thumbnails use plain `<img>` not Next.js `<Image>`. Fine for now but misses CDN optimization.
- [ ] `content.ts` — Icon name casing is inconsistent (`ui_Icon_leaf` vs `ui_icon_profile`). Works because SVG filenames match, but fragile.

---

## P3 Notes

- `src/lib/supabase/client.ts` exists but is imported nowhere — dead file until email capture is wired.
- `Stats.tsx` CountUp uses setInterval with correct cleanup — no memory leak, just minor style note.
- Motion v12 (`motion/react` import path) is correct for this version — do not upgrade to v13+ without checking.

---

## Summary

One P0 blocker was introduced by a previous overflow fix: adding `overflow: hidden` to the sticky scroll section's ancestor containers broke `position: sticky` in all browsers. Fixed during audit by switching to `overflow-x: clip` on the section (which clips visually without creating a scroll container) and removing overflow from the inner scroll div. All other issues are content/feature gaps (unuploaded media files, unconnected email form) rather than code bugs. No import errors, no missing `use client` directives, no TypeScript errors detected.
