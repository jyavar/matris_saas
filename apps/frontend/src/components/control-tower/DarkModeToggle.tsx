'use client'

import React, { useState, useEffect } from 'react'

interface DarkModeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export default function DarkModeToggle({
  className = '',
  size = 'md',
  showLabel = true
}: DarkModeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeDarkMode = () => {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
      
      setIsDarkMode(shouldUseDark)
      applyTheme(shouldUseDark)
      setIsLoading(false)
    }

    initializeDarkMode()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches)
        applyTheme(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const applyTheme = (dark: boolean) => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    applyTheme(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleDarkMode()
    }
  }

  if (isLoading) {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        {showLabel && (
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        )}
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <button
        onClick={toggleDarkMode}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex items-center justify-center rounded-full transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          hover:bg-gray-100 dark:hover:bg-gray-800
          ${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'}
        `}
        aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        aria-checked={isDarkMode}
        role="switch"
      >
        <div className="relative">
          <div
            className={`
              transition-all duration-300 transform
              ${isDarkMode ? 'rotate-180 scale-75' : 'rotate-0 scale-100'}
            `}
          >
            {isDarkMode ? (
              <svg
                className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} text-yellow-500`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} text-gray-700 dark:text-gray-300`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                />
              </svg>
            )}
          </div>
        </div>
      </button>
      
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
        </span>
      )}
    </div>
  )
}