import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export for Ionos shared hosting (no Node.js server needed)
  output: 'export',
  trailingSlash: true,
  images: {
    // Required for static export — use unoptimized or external loader
    unoptimized: true,
  },
}

export default nextConfig
