import type { RegisteredComponent } from '@builder.io/sdk-react'

// Register your custom components so they appear in Builder.io's
// visual editor palette — drag them onto any page from the sidebar.
//
// Each entry tells Builder.io:
//   - what the component is called in the palette
//   - what editable inputs (props) it exposes
//
// For now all sections are registered as "slot" components — meaning
// you can drag them onto a Builder.io page and they render exactly
// as coded. Add `inputs` later to expose specific fields for editing.

export const builderComponents: RegisteredComponent[] = [
  {
    name: 'Hero',
    component: () => null, // replaced by dynamic import in BuilderContent
    inputs: [],
    noWrap: true,
  },
  {
    name: 'HowItWorks',
    component: () => null,
    inputs: [],
    noWrap: true,
  },
  {
    name: 'RitualCards',
    component: () => null,
    inputs: [],
    noWrap: true,
  },
  {
    name: 'Stats',
    component: () => null,
    inputs: [],
    noWrap: true,
  },
  {
    name: 'Testimonials',
    component: () => null,
    inputs: [],
    noWrap: true,
  },
  {
    name: 'PricingSection',
    component: () => null,
    inputs: [],
    noWrap: true,
  },
  {
    name: 'FAQSection',
    component: () => null,
    inputs: [],
    noWrap: true,
  },
  {
    name: 'Download',
    component: () => null,
    inputs: [],
    noWrap: true,
  },
]
