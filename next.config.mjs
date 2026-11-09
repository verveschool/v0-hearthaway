/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bypasses all strict TypeScript compilation and type errors during build
  typescript: {
    ignoreBuildErrors: true
  },
  // Disables Next.js image optimization processing to prevent asset crash loops
  images: {
    unoptimized: true,
    qualities: [70, 75]
  },
  // Next 16.3+ rewrites AGENTS.md on every `next dev`; this repo maintains its own
  agentRules: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  }
}

export default nextConfig
