'use client'

/**
 * VideoSection — Self-hosted promo video served from IONOS
 * ──────────────────────────────────────────────────────────
 * HOW TO SET YOUR VIDEO URL:
 *   1. Upload your .mp4 file to IONOS via File Manager or FTP
 *      Suggested path: /media/videos/ritual-promo.mp4
 *   2. Replace VIDEO_SRC below with your full IONOS URL
 *      e.g. https://mindbodyritual.ca/media/videos/ritual-promo.mp4
 *
 * VIDEO PREP TIPS (run through HandBrake before uploading):
 *   • Format: H.264 MP4
 *   • Resolution: 1280×720 (720p is ideal — smaller file, still crisp)
 *   • Target size: 5–15 MB for a 1–3 min clip
 *   • This keeps IONOS bandwidth well within typical hosting plan limits
 *
 * AUTOPLAY NOTE:
 *   All modern browsers (Chrome 66+, Safari 12.1+, Firefox 71+, Edge 79+)
 *   allow muted autoplay. The `muted` + `autoPlay` combo is intentional.
 */

// ─── IONOS-hosted video ──────────────────────────────────────────────────────
const VIDEO_SRC = 'https://mindbodyritual.ca/-videos/website-center-page.mp4'
// ─────────────────────────────────────────────────────────────────────────────

export function VideoSection() {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto w-full max-w-4xl px-6 md:px-12 lg:px-16">

        {/* 16:9 responsive wrapper */}
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.12)]"
          style={{ paddingBottom: '56.25%' }}
        >
          <video
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover border-0"
          />

          {/* Transparent overlay — prevents any browser video UI from showing on hover */}
          <div className="absolute inset-0 z-10" />
        </div>

      </div>
    </section>
  )
}
