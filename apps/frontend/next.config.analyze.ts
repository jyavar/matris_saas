import type { NextConfig } from 'next'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const nextConfig: NextConfig = {
  // Configuración base
  reactStrictMode: true,
  swcMinify: true,

  // Configuración específica para análisis
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-slot',
      'clsx',
      'class-variance-authority',
    ],
  },

  // Compresión habilitada
  compress: true,

  // Optimización de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Configuración de webpack para análisis
  webpack: (config, { dev, isServer }) => {
    // Solo para producción y análisis
    if (!dev && !isServer) {
      // Tree shaking más agresivo
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
            },
            // Chunks específicos para análisis
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react-vendor',
              chunks: 'all',
              priority: 20,
            },
            next: {
              test: /[\\/]node_modules[\\/]next[\\/]/,
              name: 'next-vendor',
              chunks: 'all',
              priority: 15,
            },
          },
        },
      }

      // Bundle analyzer
      if (process.env.ANALYZE === 'true') {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: '../bundle-analysis.html',
            generateStatsFile: true,
            statsFilename: '../bundle-stats.json',
          }),
        )
      }
    }

    // Optimización de SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  // Configuración de TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configuración de ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
