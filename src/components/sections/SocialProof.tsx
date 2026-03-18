'use client'

import { Icon } from '@/components/ui/Icon'
import { socialProof } from '@/content'

const icons = [
  'ui_Icon_leaf', 'ui_Icon_Lotus', 'ui_Icon_Meditation', 'ui_icon_profile',
  'ui_Icon_Clock', 'ui_Icon_inner-peace', 'ui_Icon_Exploring', 'ui_Icon_Focus',
]
const items = socialProof.items.map((text, i) => ({ icon: icons[i % icons.length], text }))

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
