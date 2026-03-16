import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Static export for Ionos shared hosting (no Node.js server needed)
  output: 'export',
  trailingSlash: true,
  images: {
    // Required for static export — use unoptimized or external loader
    unoptimized: true,
  },
  // Pin the tracing root to this project folder so Next.js doesn't
  // get confused by other package-lock.json files elsewhere on the machine
  outputFileTracingRoot: path.resolve(__dirname),
}

export default nextConfig
