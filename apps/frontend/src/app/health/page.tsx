'use client'

import React from 'react'
import { HealthProvider, useHealth } from '../../contexts/HealthContext'
import ConnectionStatus from '../../components/health/ConnectionStatus'

function HealthDashboard() {
  const { state, refreshData, resetCircuitBreaker } = useHealth()

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const formatMemory = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'unhealthy':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                System Health
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Monitor system status, performance metrics, and operational health
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={refreshData}
                disabled={state.loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                         text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                         dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {state.loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </button>
              <button
                onClick={resetCircuitBreaker}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md 
                         text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 
                         dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Reset Circuit Breaker
              </button>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mb-8">
          <ConnectionStatus showDetails />
        </div>

        {/* Error Display */}
        {state.error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-red-500 mt-0.5">⚠️</span>
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">System Error</h3>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">{state.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Health Status Grid */}
        {state.healthStatus && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* System Status */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        System Status
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {state.healthStatus.status}
                        </div>
                        <div className={`ml-2 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(state.healthStatus.status)}`}>
                          {state.healthStatus.status}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Uptime */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Uptime
                      </dt>
                      <dd>
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {formatUptime(state.healthStatus.uptime)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Memory Usage */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Memory Usage
                      </dt>
                      <dd>
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {formatMemory(state.healthStatus.memory.used)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          of {formatMemory(state.healthStatus.memory.total)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Version */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Version
                      </dt>
                      <dd>
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {state.healthStatus.version}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health Metrics */}
        {state.healthMetrics && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                Health Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Checks</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {state.healthMetrics.totalChecks}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {state.healthMetrics.totalChecks > 0 
                      ? `${((state.healthMetrics.successfulChecks / state.healthMetrics.totalChecks) * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Response Time</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {state.healthMetrics.averageResponseTime.toFixed(0)}ms
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Circuit Breaker Failures</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {state.circuitBreakerState.failures}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Last Updated */}
        {state.lastUpdated && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date(state.lastUpdated).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  )
}

export default function HealthPage() {
  return (
    <HealthProvider>
      <HealthDashboard />
    </HealthProvider>
  )
} 