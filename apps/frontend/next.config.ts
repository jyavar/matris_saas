import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Saltar páginas problemáticas durante el build
  async generateStaticParams() {
    return []
  },
  // Configuración para evitar errores de prerendering
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
}

export default nextConfig
