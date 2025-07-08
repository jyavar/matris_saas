/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {}, // Turbopack estable
  typescript: {
    // Ignorar errores de TypeScript durante el build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorar errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
