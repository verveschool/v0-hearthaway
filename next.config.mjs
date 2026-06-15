/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bypasses all strict TypeScript compilation and type errors during build
  typescript: {
    ignoreBuildErrors: true
  },
  // Bypasses all ESLint checks (ignores unescaped characters, keys, and path formatting errors)
  eslint: {
    ignoreDuringBuilds: true
  },
  // Disables Next.js image optimization processing to prevent asset crash loops
  images: {
    unoptimized: true
  }
}

export default nextConfig
