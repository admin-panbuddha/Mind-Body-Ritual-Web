// Builder.io configuration
// Public API key is safe to expose in the frontend
export const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY!

// Model names — these must match what you create in Builder.io dashboard
export const BUILDER_MODELS = {
  page:    'page',       // full pages
  section: 'section',   // embeddable content blocks (future use)
} as const
