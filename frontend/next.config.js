/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize build size
  experimental: {
    optimizePackageImports: ['@tanstack/react-query'],
  },
  // Optimize images
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
    // Optimize image formats
    formats: ['image/webp', 'image/avif'],
  },
  // Optimize webpack
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
  // Reduce build artifacts
  distDir: '.next',
  // Optimize static generation
  trailingSlash: false,
}

module.exports = nextConfig 