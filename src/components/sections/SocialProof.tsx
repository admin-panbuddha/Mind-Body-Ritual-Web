'use client'

import { Icon } from '@/components/ui/Icon'

const items = [
  { icon: 'ui_Icon_leaf', text: 'Loved by 2,400+ families' },
  { icon: 'ui_Icon_Lotus', text: '4.9 App Store rating' },
  { icon: 'ui_Icon_Meditation', text: 'Breathwork · Movement · Gratitude' },
  { icon: 'ui_icon_profile', text: 'Designed for ages 3+' },
  { icon: 'ui_Icon_Clock', text: 'Just 25 minutes a day' },
  { icon: 'ui_Icon_inner-peace', text: 'Built by parents, for parents' },
  { icon: 'ui_Icon_Exploring', text: 'Available on iOS & Android' },
  { icon: 'ui_Icon_Focus', text: 'Featured in Wellness Weekly' },
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
            <Icon name={item.icon} size={16} className="opacity-70" />
            {item.text}
            <span className="text-[var(--border)] mx-2 select-none">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
