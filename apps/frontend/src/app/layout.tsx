import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { AuthProvider } from '@/contexts/AuthContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'STRATO Core OS™ - Dashboard',
  description:
    'Plataforma SaaS enterprise-grade para gestión de campañas y analytics',
  keywords: ['SaaS', 'Dashboard', 'Analytics', 'Campañas', 'STRATO'],
  authors: [{ name: 'STRATO Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-gray-50">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
