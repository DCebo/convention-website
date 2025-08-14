import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/convention-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/convention-website' : '',
  images: {
    domains: ['via.placeholder.com'],
    unoptimized: true, // Required for static export
  },
}

export default nextConfig
