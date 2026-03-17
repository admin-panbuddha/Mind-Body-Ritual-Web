'use client'

/**
 * MusicSection — Ritual Music Library
 * ─────────────────────────────────────
 * HOW TO ADD YOUR TRACKS:
 *   1. Upload .mp3 files to IONOS at e.g. /media/audio/
 *   2. Replace the `src` values in the TRACKS array below
 *      e.g. https://mindbodyritual.ca/media/audio/morning-stillness.mp3
 *   3. Update title, ritual, duration, and icon fields to match your content
 *
 * AUDIO PREP TIPS:
 *   • Format: MP3, 128–192 kbps (good quality, small file)
 *   • A 5-min track at 128 kbps ≈ 4.8 MB
 */

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

// ─── YOUR IONOS-HOSTED TRACKS — update src URLs after uploading ──────────────
const TRACKS = [
  {
    id: 1,
    title: 'Morning Stillness',
    ritual: 'Meditation',
    duration: '5:00',
    icon: 'Meditation',
    src: 'https://YOUR_IONOS_DOMAIN/media/audio/morning-stillness.mp3',
  },
  {
    id: 2,
    title: 'Breathing Space',
    ritual: 'Breathwork',
    duration: '5:00',
    icon: 'Breath',
    src: 'https://YOUR_IONOS_DOMAIN/media/audio/breathing-space.mp3',
  },
  {
    id: 3,
    title: 'Flow State',
    ritual: 'Movement',
    duration: '5:00',
    icon: 'Flow',
    src: 'https://YOUR_IONOS_DOMAIN/media/audio/flow-state.mp3',
  },
  {
    id: 4,
    title: 'Nourish',
    ritual: 'Nutrition',
    duration: '5:00',
    icon: 'Lotus',
    src: 'https://YOUR_IONOS_DOMAIN/media/audio/nourish.mp3',
  },
  {
    id: 5,
    title: 'Grateful Heart',
    ritual: 'Gratitude',
    duration: '5:00',
    icon: 'Sun',
    src: 'https://YOUR_IONOS_DOMAIN/media/audio/grateful-heart.mp3',
  },
]
// ─────────────────────────────────────────────────────────────────────────────

type Track = typeof TRACKS[number]

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function TrackCard({
  track,
  isActive,
  isPlaying,
  progress,
  onPlay,
  onSeek,
}: {
  track: Track
  isActive: boolean
  isPlaying: boolean
  progress: number       // 0–1
  onPlay: () => void
  onSeek: (ratio: number) => void
}) {
  function handleBarClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    onSeek(Math.max(0, Math.min(1, ratio)))
  }

  return (
    <div
      className={`
        group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 cursor-pointer
        ${isActive
          ? 'bg-forest shadow-[0_8px_32px_rgba(61,107,79,0.25)]'
          : 'bg-white/60 hover:bg-white/90 shadow-sm hover:shadow-md'}
      `}
      onClick={onPlay}
    >
      {/* Icon */}
      <div className={`
        flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300
        ${isActive ? 'bg-white/15' : 'bg-forest/8'}
      `}>
        <Image
          src={`/icons/${track.icon}.svg`}
          width={26}
          height={26}
          alt={track.ritual}
          unoptimized
          className={`transition-all duration-300 ${isActive ? 'brightness-[100] invert' : 'opacity-70'}`}
        />
      </div>

      {/* Title + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className={`font-semibold text-sm truncate ${isActive ? 'text-white' : 'text-forest-deep'}`}>
            {track.title}
          </span>
          <span className={`text-xs ml-3 flex-shrink-0 ${isActive ? 'text-white/60' : 'text-forest/50'}`}>
            {track.duration}
          </span>
        </div>

        <span className={`text-xs block mb-2 ${isActive ? 'text-white/50' : 'text-forest/40'}`}>
          {track.ritual}
        </span>

        {/* Progress bar — only visible when active */}
        {isActive && (
          <div
            className="relative h-1 rounded-full bg-white/20 cursor-pointer overflow-hidden"
            onClick={(e) => { e.stopPropagation(); handleBarClick(e) }}
          >
            <div
              className="absolute left-0 top-0 h-full bg-amber rounded-full transition-[width] duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Play / Pause button */}
      <button
        aria-label={isActive && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
        onClick={(e) => { e.stopPropagation(); onPlay() }}
        className={`
          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
          ${isActive
            ? 'bg-amber text-white shadow-[0_4px_12px_rgba(229,177,119,0.5)]'
            : 'bg-forest/10 text-forest group-hover:bg-forest group-hover:text-white'}
        `}
      >
        {isActive && isPlaying ? (
          /* Pause icon */
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="4" height="12" rx="1.5"/>
            <rect x="8" y="1" width="4" height="12" rx="1.5"/>
          </svg>
        ) : (
          /* Play icon */
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M3 1.5 L12.5 7 L3 12.5 Z"/>
          </svg>
        )}
      </button>
    </div>
  )
}

export function MusicSection() {
  const [activeId, setActiveId]   = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress]   = useState(0)   // 0–1
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const handlePlay = useCallback((track: Track) => {
    // Same track — toggle play/pause
    if (activeId === track.id) {
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        audioRef.current?.play().catch(() => {})
        setIsPlaying(true)
      }
      return
    }

    // New track — swap source and play
    if (audioRef.current) {
      audioRef.current.pause()
    }
    const audio = new Audio(track.src)
    audioRef.current = audio

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    })
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setProgress(0)
    })

    audio.play().catch(() => {})
    setActiveId(track.id)
    setIsPlaying(true)
    setProgress(0)
  }, [activeId, isPlaying])

  const handleSeek = useCallback((ratio: number) => {
    if (!audioRef.current || isNaN(audioRef.current.duration)) return
    audioRef.current.currentTime = ratio * audioRef.current.duration
    setProgress(ratio)
  }, [])

  const activeTrack = TRACKS.find(t => t.id === activeId) ?? null

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-amber mb-3">
            Media Library
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-forest-deep leading-tight mb-4">
            Sacred Sounds
          </h2>
          <p className="text-forest/70 text-base max-w-md mx-auto">
            Every ritual is paired with music crafted to guide your mind and body into the right state.
          </p>
        </div>

        {/* Now playing bar */}
        <div className={`
          mb-6 px-5 py-3 rounded-2xl flex items-center gap-3 transition-all duration-500
          ${activeTrack ? 'bg-forest/8 opacity-100' : 'opacity-0 pointer-events-none'}
        `}>
          <div className="w-2 h-2 rounded-full bg-amber animate-pulse flex-shrink-0" />
          <span className="text-sm text-forest-deep font-medium">
            {activeTrack ? `Now playing — ${activeTrack.title}` : ''}
          </span>
          <span className="ml-auto text-xs text-forest/50 tabular-nums">
            {audioRef.current ? formatTime(audioRef.current.currentTime) : ''}
          </span>
        </div>

        {/* Track list */}
        <div className="flex flex-col gap-3">
          {TRACKS.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isActive={activeId === track.id}
              isPlaying={activeId === track.id && isPlaying}
              progress={activeId === track.id ? progress : 0}
              onPlay={() => handlePlay(track)}
              onSeek={handleSeek}
            />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-forest/40 mt-8">
          All tracks are included with your MindBodyRitual membership
        </p>

      </div>
    </section>
  )
}
