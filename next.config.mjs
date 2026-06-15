/** @type {import('next').NextConfig} */
const nextConfig = {
  // bypasses all strict typescript compilation and type errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // disables next.js image optimization processing to prevent asset crash loops
  images: {
    unoptimized: true,
  },
}

export default nextConfig
