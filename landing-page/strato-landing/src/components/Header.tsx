'use client'

import { Bot, ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">STRATO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                Products
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              {/* Invisible bridge to prevent gap */}
              <div className="absolute top-full left-0 w-full h-2 bg-transparent" />

              {isProductsOpen && (
                <div
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                  className="absolute top-full left-0 mt-0 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
                >
                  <div className="p-4">
                    <div className="space-y-3">
                      <Link
                        href="/marketplace"
                        className="block p-3 rounded-md hover:bg-gray-800 transition-colors"
                      >
                        <div className="font-medium text-white">
                          AI Agents Marketplace
                        </div>
                        <div className="text-sm text-gray-400">
                          Buy and sell AI agents
                        </div>
                      </Link>
                      <Link
                        href="/platform"
                        className="block p-3 rounded-md hover:bg-gray-800 transition-colors"
                      >
                        <div className="font-medium text-white">
                          SaaS Platform
                        </div>
                        <div className="text-sm text-gray-400">
                          Enterprise-grade SaaS
                        </div>
                      </Link>
                      <Link
                        href="/agents"
                        className="block p-3 rounded-md hover:bg-gray-800 transition-colors"
                      >
                        <div className="font-medium text-white">
                          Intelligent Agents
                        </div>
                        <div className="text-sm text-gray-400">
                          Code quality & automation
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                Resources
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              {/* Invisible bridge to prevent gap */}
              <div className="absolute top-full left-0 w-full h-2 bg-transparent" />

              {isResourcesOpen && (
                <div
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                  className="absolute top-full left-0 mt-0 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
                >
                  <div className="p-4">
                    <div className="space-y-3">
                      <Link
                        href="/docs"
                        className="block p-3 rounded-md hover:bg-gray-800 transition-colors"
                      >
                        <div className="font-medium text-white">
                          Documentation
                        </div>
                        <div className="text-sm text-gray-400">
                          API docs and guides
                        </div>
                      </Link>
                      <Link
                        href="/templates"
                        className="block p-3 rounded-md hover:bg-gray-800 transition-colors"
                      >
                        <div className="font-medium text-white">Templates</div>
                        <div className="text-sm text-gray-400">
                          Ready-to-use templates
                        </div>
                      </Link>
                      <Link
                        href="/community"
                        className="block p-3 rounded-md hover:bg-gray-800 transition-colors"
                      >
                        <div className="font-medium text-white">Community</div>
                        <div className="text-sm text-gray-400">
                          Developer community
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/marketplace"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Agents Marketplace
              </Link>
              <Link
                href="/platform"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                SaaS Platform
              </Link>
              <Link
                href="/docs"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-4 border-t border-gray-800">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 mt-2 bg-white text-black rounded-md font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
