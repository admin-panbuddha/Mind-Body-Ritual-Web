'use client'

const items = [
  '🌿 Loved by 2,400+ families',
  '⭐ 4.9 App Store rating',
  '🧘 Breathwork · Movement · Gratitude',
  '👶 Designed for ages 3+',
  '⏱ Just 25 minutes a day',
  '💛 Built by parents, for parents',
  '🌍 Available on iOS & Android',
  '🏅 Featured in Wellness Weekly',
]

export function SocialProof() {
  return (
    <div className="py-5 border-y border-[var(--border-light)] bg-white/60 backdrop-blur-sm overflow-hidden">
      <div className="ticker-track">
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-8 font-body text-sm
                       font-medium text-[var(--text-light)] whitespace-nowrap"
          >
            {item}
            <span className="text-[var(--border)] mx-2 select-none">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
