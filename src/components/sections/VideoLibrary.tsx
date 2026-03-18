'use client'

/**
 * VideoLibrary — Practice video collection hosted on IONOS
 * ──────────────────────────────────────────────────────────
 * HOW TO ADD YOUR VIDEOS:
 *   1. Upload .mp4 files to IONOS at e.g. /media/videos/
 *   2. Upload thumbnail images (JPG/WebP, 16:9) to e.g. /media/thumbnails/
 *   3. Replace `src` and `thumbnail` URLs in the VIDEOS array below
 *      e.g. https://mindbodyritual.ca/media/videos/meditation-guide.mp4
 *
 * VIDEO PREP TIPS:
 *   • Format: H.264 MP4, 720p
 *   • Thumbnails: 1280×720 JPG, compressed to ~80–120 KB each
 */

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { videoLibrary } from '@/content'

const VIDEOS = videoLibrary.videos

type Video = typeof VIDEOS[number]

function VideoCard({
  video,
  onOpen,
}: {
  video: Video
  onOpen: (v: Video) => void
}) {
  return (
    <button
      className="group text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-2xl"
      onClick={() => onOpen(video)}
      aria-label={`Play ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-forest/10 shadow-sm group-hover:shadow-lg transition-shadow duration-300"
           style={{ paddingBottom: '56.25%' }}>

        {/* Placeholder gradient when no thumbnail yet */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-sage/30 flex items-center justify-center">
          <Image
            src={`/icons/${video.icon}.svg`}
            width={40}
            height={40}
            alt=""
            unoptimized
            className="opacity-30"
          />
        </div>

        {/* Actual thumbnail (loads on top of placeholder) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg
                          scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 14 14" fill="#3D6B4F">
              <path d="M3 1.5 L12.5 7 L3 12.5 Z"/>
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2 py-0.5 rounded-md">
          {video.duration}
        </span>
      </div>

      {/* Text */}
      <div className="pt-3 pb-1 px-1">
        <span className="text-xs font-semibold text-amber uppercase tracking-wide">{video.ritual}</span>
        <h3 className="font-semibold text-forest-deep text-sm mt-0.5 leading-snug group-hover:text-forest transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-forest/50 mt-1 leading-relaxed line-clamp-2">{video.description}</p>
      </div>
    </button>
  )
}

function VideoModal({
  video,
  onClose,
}: {
  video: Video
  onClose: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-play when modal opens
  useEffect(() => {
    videoRef.current?.play().catch(() => {})

    // Close on Escape
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 16:9 wrapper */}
        <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
          <video
            ref={videoRef}
            src={video.src}
            controls
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* Info bar */}
        <div className="bg-forest-deep px-5 py-3 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-sm">{video.title}</p>
            <p className="text-white/50 text-xs">{video.ritual} · {video.duration}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors ml-4"
            aria-label="Close video"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4 L16 16 M16 4 L4 16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export function VideoLibrary() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)

  const handleClose = useCallback(() => setActiveVideo(null), [])

  return (
    <section className="bg-[#F2F5F0] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-amber mb-3">
            {videoLibrary.sectionLabel}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-forest-deep leading-tight mb-4">
            {videoLibrary.headline}
          </h2>
          <p className="text-forest/70 text-base max-w-md mx-auto">
            {videoLibrary.subheadline}
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} onOpen={setActiveVideo} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-forest/40 mt-10">
          {videoLibrary.footerNote}
        </p>

      </div>

      {/* Modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={handleClose} />
      )}
    </section>
  )
}
