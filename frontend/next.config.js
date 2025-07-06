/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ainomobil.no',
      },
      {
        protocol: 'https',
        hostname: 'ainomedia.blob.core.windows.net',
        pathname: '/aino-media/**',
      },
    ],
  },
}

module.exports = nextConfig 