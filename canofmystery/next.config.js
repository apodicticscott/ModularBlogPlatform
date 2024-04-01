/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      nftTracing: true,
    },
    images: {
      domains: [],
    },
    reactStrictMode: true,
  }
  
  module.exports = nextConfig