/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize build size
  experimental: {
    optimizePackageImports: ['@tanstack/react-query'],
  },
  // Bundle router dependencies
  bundlePagesRouterDependencies: true,
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
  // Reduce build output
  output: 'standalone',
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
      }
      
      // Exclude large dependencies from client bundle
      config.externals = config.externals || []
      if (!isServer) {
        config.externals.push({
          'pg': 'pg',
          'postgres': 'postgres',
        })
      }
    }
    return config
  },
  // Reduce build artifacts
  distDir: '.next',
  // Optimize static generation
  trailingSlash: false,
}

module.exports = nextConfig 