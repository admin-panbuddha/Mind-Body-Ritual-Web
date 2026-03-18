/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              MINDBODYRITUAL — SITE CONTENT                  ║
 * ║                                                              ║
 * ║  All visible text on the website lives here.                ║
 * ║  Edit this file to change any copy, label, price,           ║
 * ║  testimonial, FAQ, or link on the site.                     ║
 * ║                                                              ║
 * ║  Rules:                                                      ║
 * ║  • Only change text BETWEEN the quote marks " "             ║
 * ║  • Don't delete commas, colons, or curly braces             ║
 * ║  • Save the file, then ask Claude to deploy                 ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ─────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────
export const navbar = {
  brand:  "MindBodyRitual",
  cta:    "Get the App",
  links: [
    { label: "The Ritual",    href: "#rituals" },
    { label: "How It Works",  href: "#how-it-works" },
    { label: "Pricing",       href: "/pricing/" },
    { label: "FAQ",           href: "#faq" },
  ],
}

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────
export const hero = {
  badge:          "Free during Early Access",
  headlineLine1:  "25 minutes.",
  headlineLine2:  "Five rituals.",
  headlineLine3:  "One family.",           // shown in amber
  subheadline:    "A morning wellness routine designed for caregivers and kids ages 3+. Breathe, move, connect — together, every day.",
  ctaPrimary:     "Get the App — Free",
  ctaSecondary:   "See how it works ↓",
  socialProofText:"Loved by 2,400+ families",
  scrollLabel:    "Scroll",

  // Floating stat pills on the phone mockup
  statPills: [
    { value: "25 min",    label: "Daily ritual" },
    { value: "5 rituals", label: "Per session" },
    { value: "Ages 3+",   label: "Family-friendly" },
  ],

  // Phone mockup inner screen
  phone: {
    greeting:      "Good morning",
    todayLabel:    "Today's Ritual",
    featuredRitual: {
      name:     "Morning Breathwork",
      duration: "5 min · Ages 3+",
    },
    ritualList: [
      { name: "Wake-Up Stretch" },
      { name: "Breathwork" },
      { name: "Movement Flow" },
      { name: "Nature Moment" },
      { name: "Gratitude" },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────
// SOCIAL PROOF TICKER
// ─────────────────────────────────────────────────────────────────
export const socialProof = {
  items: [
    "Loved by 2,400+ families",
    "4.9 App Store rating",
    "Breathwork · Movement · Gratitude",
    "Designed for ages 3+",
    "Just 25 minutes a day",
    "Built by parents, for parents",
    "Available on iOS & Android",
    "Featured in Wellness Weekly",
  ],
}

// ─────────────────────────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────────
export const howItWorks = {
  sectionLabel: "How It Works",
  headline:     "Simple enough for any morning",
  subheadline:  "No equipment. No expertise. Just five minutes per ritual and a willingness to show up together.",
  steps: [
    {
      number:      "01",
      icon:        "ui_Icon_Home",
      title:       "Open the app",
      description: "Launch MindBodyRitual every morning. Your day's five rituals are waiting — no planning, no prep.",
    },
    {
      number:      "02",
      icon:        "ui_Icon_Meditation",
      title:       "Gather the family",
      description: "Call the kids over. Each ritual is designed for caregivers and children to do together, side by side.",
    },
    {
      number:      "03",
      icon:        "ui_Icon_Daily_Ritual_Setting",
      title:       "Follow the ritual",
      description: "Guided audio and visuals walk you through each 5-minute ritual — breathwork, movement, gratitude, and more.",
    },
    {
      number:      "04",
      icon:        "ui_Icon_History",
      title:       "Build the streak",
      description: "Track your family streak, celebrate milestones, and watch your morning ritual become the favourite part of the day.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
// RITUAL CARDS (scroll section)
// ─────────────────────────────────────────────────────────────────
export const ritualCards = {
  sectionLabel:   "The Five Rituals",
  headline:       "Five minutes each.\nA lifetime of impact.",
  subheadline:    "Each ritual is carefully designed to be short enough to actually do and meaningful enough to matter.",
  sliderHeadline: "Select how long you want",
  sliderAccent:   "each ritual.",
  cta:            "Start your ritual with Panbuddha",

  rituals: [
    {
      icon:        "ui_Icon_Sun",
      title:       "Wake-Up Stretch",
      subtitle:    "Body",
      accentHex:   "#C9813A",
      description: "Gentle full-body stretches to wake up muscles, improve circulation, and ease into the day with a smile.",
      tags:        ["Ages 3+", "No equipment"],
    },
    {
      icon:        "ui_Icon_Breath",
      title:       "Breathwork",
      subtitle:    "Mind",
      accentHex:   "#3D6B4F",
      description: "Simple breathing exercises that calm the nervous system, build focus, and set a peaceful tone for the day.",
      tags:        ["Calming", "Focus"],
    },
    {
      icon:        "ui_Icon_Flow",
      title:       "Movement Flow",
      subtitle:    "Energy",
      accentHex:   "#7C3AED",
      description: "Fun, energising movement — animal walks, yoga poses, balance challenges — that kids actually look forward to.",
      tags:        ["High energy", "Playful"],
    },
    {
      icon:        "ui_Icon_leaf",
      title:       "Nature Moment",
      subtitle:    "Connection",
      accentHex:   "#5a8a6a",
      description: "A mindful pause to notice the natural world — light, weather, plants, sounds — and feel part of something larger.",
      tags:        ["Mindfulness", "Grounding"],
    },
    {
      icon:        "ui_Icon_Lotus",
      title:       "Gratitude Practice",
      subtitle:    "Heart",
      accentHex:   "#A8843A",
      description: "Share one thing you're grateful for. Build the emotional habit of appreciation that lasts a lifetime.",
      tags:        ["Emotional health", "Bonding"],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────────────────────────
export const stats = [
  { value: 2400,  suffix: "+",    label: "Families using MindBodyRitual", icon: "ui_icon_profile",  isDecimal: false },
  { value: 25,    suffix: " min", label: "Total daily ritual time",        icon: "ui_Icon_Clock",    isDecimal: false },
  { value: 5,     suffix: "",     label: "Rituals per session",            icon: "ui_Icon_Focus",    isDecimal: false },
  { value: 4.9,   suffix: "★",    label: "App Store rating",               icon: "ui_Icon_Lotus",    isDecimal: true  },
]

// ─────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────
export const testimonials = {
  sectionLabel: "Families Love It",
  headline:     "Real families. Real mornings.",
  subheadline:  "Over 2,400 families have made MindBodyRitual part of their morning — here's what they say.",
  items: [
    {
      quote:  "We've tried so many 'family wellness' things that fell apart after a week. This actually stuck. My daughter literally asks for it now every morning.",
      author: "Sarah M.",
      role:   "Mom of two, Vancouver",
      icon:   "ui_Icon_Meditation",
      stars:  5,
    },
    {
      quote:  "The breathwork section alone has been transformative for my anxious 5-year-old. We do it together every morning and I swear it sets the tone for the whole day.",
      author: "David K.",
      role:   "Dad, Toronto",
      icon:   "ui_Icon_Breath",
      stars:  5,
    },
    {
      quote:  "I was skeptical — 25 minutes sounds like a lot. But it goes by so fast and my kids are so engaged. We haven't missed a morning in 6 weeks.",
      author: "Amara T.",
      role:   "Single mom of three, Calgary",
      icon:   "ui_Icon_Flow",
      stars:  5,
    },
    {
      quote:  "The gratitude ritual has opened up conversations with my son that I never expected. He shares things during our practice he'd never bring up otherwise.",
      author: "James L.",
      role:   "Father of one, Montreal",
      icon:   "ui_Icon_Lotus",
      stars:  5,
    },
    {
      quote:  "My 3-year-old does the movement section with me and it's genuinely the cutest thing I've ever seen. We laugh every single morning. Worth it just for that.",
      author: "Priya R.",
      role:   "New mom, Ottawa",
      icon:   "ui_Icon_Sun",
      stars:  5,
    },
    {
      quote:  "As someone who struggled with a morning routine myself, having a kid-friendly version that WE do together was the accountability I needed. We both grew.",
      author: "Chris B.",
      role:   "Dad, Edmonton",
      icon:   "ui_icon_calm",
      stars:  5,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
// MUSIC SECTION
// ─────────────────────────────────────────────────────────────────
export const musicSection = {
  sectionLabel: "Media Library",
  headline:     "Sacred Sounds",
  subheadline:  "Every ritual is paired with music crafted to guide your mind and body into the right state.",
  footerNote:   "All tracks are included with your MindBodyRitual membership",
  tracks: [
    { id: 1, title: "Morning Stillness",  ritual: "Meditation", duration: "5:00", icon: "Meditation", src: "https://mindbodyritual.ca/media/audio/morning-stillness.mp3" },
    { id: 2, title: "Breathing Space",    ritual: "Breathwork", duration: "5:00", icon: "Breath",     src: "https://mindbodyritual.ca/media/audio/breathing-space.mp3" },
    { id: 3, title: "Flow State",         ritual: "Movement",   duration: "5:00", icon: "Flow",       src: "https://mindbodyritual.ca/media/audio/flow-state.mp3" },
    { id: 4, title: "Nourish",            ritual: "Nutrition",  duration: "5:00", icon: "Lotus",      src: "https://mindbodyritual.ca/media/audio/nourish.mp3" },
    { id: 5, title: "Grateful Heart",     ritual: "Gratitude",  duration: "5:00", icon: "Sun",        src: "https://mindbodyritual.ca/media/audio/grateful-heart.mp3" },
  ],
}

// ─────────────────────────────────────────────────────────────────
// VIDEO LIBRARY
// ─────────────────────────────────────────────────────────────────
export const videoLibrary = {
  sectionLabel: "Video Library",
  headline:     "Watch. Learn. Practice.",
  subheadline:  "Guided video sessions for every ritual — short enough for a busy morning, deep enough to matter.",
  footerNote:   "New videos added every month with your membership",
  videos: [
    {
      id: 1,
      title:       "Morning Meditation Guide",
      ritual:      "Meditation",
      duration:    "5:12",
      description: "Ground yourself with a simple seated practice before the day begins.",
      src:         "https://mindbodyritual.ca/media/videos/meditation-guide.mp4",
      thumbnail:   "https://mindbodyritual.ca/media/thumbnails/meditation-guide.jpg",
      icon:        "Meditation",
    },
    {
      id: 2,
      title:       "Breathwork for Clarity",
      ritual:      "Breathwork",
      duration:    "5:08",
      description: "A guided breathing sequence that clears the mind and energises the body.",
      src:         "https://mindbodyritual.ca/media/videos/breathwork-clarity.mp4",
      thumbnail:   "https://mindbodyritual.ca/media/thumbnails/breathwork-clarity.jpg",
      icon:        "Breath",
    },
    {
      id: 3,
      title:       "Movement Flow Sequence",
      ritual:      "Movement",
      duration:    "5:20",
      description: "Gentle full-body movement to awaken muscles and release overnight stiffness.",
      src:         "https://mindbodyritual.ca/media/videos/movement-flow.mp4",
      thumbnail:   "https://mindbodyritual.ca/media/thumbnails/movement-flow.jpg",
      icon:        "Flow",
    },
    {
      id: 4,
      title:       "Mindful Nourishment",
      ritual:      "Nutrition",
      duration:    "5:05",
      description: "Simple rituals around food that build a conscious relationship with nourishment.",
      src:         "https://mindbodyritual.ca/media/videos/mindful-nourishment.mp4",
      thumbnail:   "https://mindbodyritual.ca/media/thumbnails/mindful-nourishment.jpg",
      icon:        "Lotus",
    },
    {
      id: 5,
      title:       "Gratitude Practice",
      ritual:      "Gratitude",
      duration:    "5:00",
      description: "Close your morning with a gratitude sequence that rewires your outlook.",
      src:         "https://mindbodyritual.ca/media/videos/gratitude-practice.mp4",
      thumbnail:   "https://mindbodyritual.ca/media/thumbnails/gratitude-practice.jpg",
      icon:        "Sun",
    },
    {
      id: 6,
      title:       "Full Family Morning Ritual",
      ritual:      "All 5 Rituals",
      duration:    "25:00",
      description: "The complete 25-minute morning ritual, done together as a family.",
      src:         "https://mindbodyritual.ca/media/videos/full-family-ritual.mp4",
      thumbnail:   "https://mindbodyritual.ca/media/thumbnails/full-family-ritual.jpg",
      icon:        "Sun",
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────────────────────────
export const pricing = {
  sectionLabel: "Pricing",
  headline:     "Simple, transparent pricing",
  subheadline:  "Start free. Upgrade when you're ready. No surprise charges.",
  trustLine:    "Secure checkout · Cancel anytime · No credit card required to start free",
  plans: [
    {
      name:        "Free",
      price:       "$0",
      period:      "forever",
      description: "Everything you need to start your family ritual.",
      cta:         "Get Started Free",
      highlight:   false,
      features: [
        "5 guided ritual sessions",
        "Breathwork & movement library",
        "Family streak tracker",
        "Progress insights",
        "Ages 3+ content",
        "iOS & Android app",
      ],
      missing: [
        "Unlimited session library",
        "Premium audio guides",
        "Family sharing (up to 6)",
        "Offline mode",
      ],
    },
    {
      name:        "Family",
      price:       "$9.99",
      period:      "per month",
      annualNote:  "or $79.99/year (save 33%)",
      description: "Unlimited access for your whole family. Cancel anytime.",
      cta:         "Start Free Trial",
      highlight:   true,
      badge:       "Most Popular",
      features: [
        "Everything in Free",
        "Unlimited session library",
        "Premium audio guides",
        "Family sharing (up to 6)",
        "Offline mode",
        "Priority support",
        "New content weekly",
        "Milestone celebrations",
      ],
      missing: [],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
// DOWNLOAD / CTA
// ─────────────────────────────────────────────────────────────────
export const download = {
  sectionLabel:      "Get the App",
  headline:          "Start your family ritual tomorrow morning.",
  subheadline:       "Download MindBodyRitual free. No subscription required to get started. Available on iOS and Android.",
  waitlistText:      "Or join the early access list — we'll email you when your region goes live.",
  waitlistButton:    "Join Early Access",
  waitlistLoading:   "Joining...",
  waitlistSuccess:   "You're on the list! We'll be in touch soon.",
  emailPlaceholder:  "your@email.com",
}

// ─────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────
export const faq = {
  sectionLabel:  "FAQ",
  headline:      "Common questions",
  contactEmail:  "hello@mindbodyritual.ca",
  items: [
    {
      question: "What age is MindBodyRitual designed for?",
      answer:   "MindBodyRitual is designed for caregivers and children ages 3 and up. All five rituals — breathwork, movement, stretching, nature moments, and gratitude — are designed to be fully accessible to toddlers through school-age kids, with the parent or caregiver participating alongside them.",
    },
    {
      question: "What do I need to get started?",
      answer:   "Just the app and five minutes per ritual. No equipment, no special clothing, no experience with yoga or meditation needed. All you need is a phone or tablet and a willingness to show up each morning.",
    },
    {
      question: "How long does the full ritual take?",
      answer:   "The full five-ritual session is 25 minutes — five minutes per ritual. If you only have time for one or two rituals on a busy morning, that works too. Any ritual is better than none.",
    },
    {
      question: "Can we do the rituals at different times of day?",
      answer:   "Absolutely. While the rituals are designed as a morning routine (they work great for setting intentions and energy for the day), many families do them after school, before bed, or whenever works best for their schedule.",
    },
    {
      question: "Is there a free version?",
      answer:   "Yes! MindBodyRitual has a free tier that includes five guided ritual sessions, the streak tracker, and access to the core breathwork and movement library. The Family plan unlocks the full library with unlimited sessions, premium audio guides, and family sharing.",
    },
    {
      question: "Does it work without an internet connection?",
      answer:   "Offline mode is available on the Family plan. If you are on the Free plan, you will need an internet connection to stream the guided sessions.",
    },
    {
      question: "How is MindBodyRitual different from other kids' wellness apps?",
      answer:   "Most wellness apps are either for adults or for kids — but not for both together. MindBodyRitual is built specifically for caregivers and kids to do side by side. The bonding and shared experience is the point, not just the wellness benefits.",
    },
    {
      question: "Is my data safe?",
      answer:   "Yes. We use Supabase (industry-standard PostgreSQL) for data storage and never sell your personal data. Family streak data and email addresses are encrypted and used only to provide the service. See our Privacy Policy for full details.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────
export const footer = {
  brand:         "MindBodyRitual",
  tagline:       "25 minutes. Five rituals. One family.",
  madeBy:        "By Panbuddha · Made in Canada 🇨🇦",
  contactEmail:  "hello@mindbodyritual.ca",
  socialLinks:   ["Instagram", "TikTok", "Facebook"],
  links: {
    Product: [
      { label: "The Rituals",     href: "#rituals" },
      { label: "How It Works",    href: "#how-it-works" },
      { label: "Pricing",         href: "/pricing/" },
      { label: "Download the App",href: "#download" },
    ],
    Company: [
      { label: "About Panbuddha", href: "#" },
      { label: "Blog",            href: "#" },
      { label: "Careers",         href: "#" },
      { label: "Press",           href: "#" },
    ],
    Support: [
      { label: "Help Centre",     href: "/support/" },
      { label: "Contact Us",      href: "mailto:hello@mindbodyritual.ca" },
      { label: "Privacy Policy",  href: "/privacy/" },
      { label: "Terms of Service",href: "/terms/" },
    ],
  },
}
