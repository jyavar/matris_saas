'use client'

import React from 'react'
import { BillingProvider } from '@/contexts/BillingContext'
import ConnectionStatus from '@/components/billing/ConnectionStatus'

export default function BillingPage(): React.JSX.Element {
  return (
    <BillingProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Billing & Subscriptions
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Manage your invoices, subscriptions, and billing information
            </p>
          </div>

          {/* Connection Status */}
          <div className="mb-6">
            <ConnectionStatus showDetails />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Invoices Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Invoices
              </h2>
              <div className="text-gray-600 dark:text-gray-300">
                Invoice management coming soon...
              </div>
            </div>

            {/* Subscriptions Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Subscriptions
              </h2>
              <div className="text-gray-600 dark:text-gray-300">
                Subscription management coming soon...
              </div>
            </div>
          </div>
        </div>
      </div>
    </BillingProvider>
  )
} 