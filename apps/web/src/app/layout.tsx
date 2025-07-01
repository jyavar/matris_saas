import './globals.css'

import { Inter } from 'next/font/google'
import { type ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'STRATO Core OS™ - The Ultimate SaaS Framework',
  description:
    'The ultimate monorepo framework with built-in governance, AI-powered agents, and elite DX for building enterprise-grade SaaS platforms.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-[100dvh] bg-gray-950 text-white`}
      >
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
