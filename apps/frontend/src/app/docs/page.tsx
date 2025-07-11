'use client'

import React from 'react'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Documentación
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Manuales, guías y referencias técnicas de STRATO Core OS™
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Documentación en Construcción
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Esta sección está temporalmente deshabilitada durante el build.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 