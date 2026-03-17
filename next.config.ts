import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Standard Next.js server mode — works on Railway (Node.js host)
  // output: 'export' removed; use `next start` via `npm start`
  images: {
    // Keep unoptimized for now — enables <Image> without a paid image CDN
    unoptimized: true,
  },
  // Pin the tracing root so Next.js doesn't pick up stray package.json files
  outputFileTracingRoot: path.resolve(__dirname),
}

export default nextConfig
