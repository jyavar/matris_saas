'use client'

import { Moon, Sun, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark((d) => {
      if (!d) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return !d
    })
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-xl font-bold text-blue-700 dark:text-blue-400 tracking-tight"
          >
            STRATO Core OS™
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Inicio
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Dashboard
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          >
            {dark ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            )}
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            aria-label="User menu"
          >
            <User className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>
    </header>
  )
}
