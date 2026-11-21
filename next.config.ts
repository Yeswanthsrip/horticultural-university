import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // On Netlify, next/image is served through the Netlify Image CDN automatically
  // (resized, converted to WebP/AVIF) — good for low-bandwidth visitors.
  images: {
    qualities: [60, 75],
  },
}

export default nextConfig
