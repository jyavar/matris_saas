import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'STRATO Core OS™ – AI Agents Marketplace & SaaS Platform',
  description: 'Discover, build, and monetize top-tier AI agents. STRATO empowers you to launch, scale, and sell AI-powered solutions with enterprise-grade security, blazing-fast performance, and a thriving developer community.',
  keywords: [
    'AI agents',
    'SaaS platform',
    'Marketplace',
    'Enterprise',
    'Node.js',
    'React',
    'Supabase',
    'Open source',
    'Developer tools',
    'Monetization',
    'Automation',
    'Testing',
    'Analytics',
    'US market',
    'STRATO'
  ],
  openGraph: {
    title: 'STRATO Core OS™ – AI Agents Marketplace & SaaS Platform',
    description: 'Build, deploy, and monetize AI agents with enterprise-grade architecture. 15+ specialized agents ready for production.',
    url: 'https://strato.dev',
    siteName: 'STRATO Core OS™',
    images: [
      {
        url: 'https://strato.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'STRATO Core OS™ – AI Agents Marketplace & SaaS Platform'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STRATO Core OS™ – AI Agents Marketplace & SaaS Platform',
    description: 'Discover, build, and monetize top-tier AI agents. STRATO empowers you to launch, scale, and sell AI-powered solutions with enterprise-grade security, blazing-fast performance, and a thriving developer community.',
    site: '@strato_dev',
    creator: '@strato_dev',
    images: ['https://strato.dev/og-image.png']
  },
  metadataBase: new URL('https://strato.dev'),
  robots: {
    index: true,
    follow: true,
    nocache: false
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-slate-950 text-white min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  )
}
