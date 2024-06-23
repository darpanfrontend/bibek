/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.bibekphotography.com.au',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
