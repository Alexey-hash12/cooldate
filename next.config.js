/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
