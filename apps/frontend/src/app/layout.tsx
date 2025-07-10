import './globals.css'

import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { AuthProvider } from '@/contexts/AuthContext'
import { BillingProvider } from '@/contexts/BillingContext'
import { AnalyticsProvider } from '@/contexts/AnalyticsContext'

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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-gray-50 dark:bg-gray-950">
        <Header />
        <AuthProvider>
          <BillingProvider>
            <AnalyticsProvider>
              <main>{children}</main>
            </AnalyticsProvider>
          </BillingProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}
