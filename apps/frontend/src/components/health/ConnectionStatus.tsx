import React from 'react'
import { useHealth } from '../../contexts/HealthContext'

interface ConnectionStatusProps {
  compact?: boolean
  showDetails?: boolean
  className?: string
}

export default function ConnectionStatus({ 
  compact = false, 
  showDetails = false,
  className = ''
}: ConnectionStatusProps) {
  const { state, retryConnection } = useHealth()

  const getStatusColor = () => {
    switch (state.connectionStatus) {
      case 'connected':
        return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'connecting':
        return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'error':
        return 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
    }
  }

  const getStatusIcon = () => {
    switch (state.connectionStatus) {
      case 'connected':
        return '🟢'
      case 'connecting':
        return '🟡'
      case 'error':
        return '🔴'
      default:
        return '⚪'
    }
  }

  const getStatusText = () => {
    switch (state.connectionStatus) {
      case 'connected':
        return 'Connected'
      case 'connecting':
        return 'Connecting'
      case 'error':
        return 'Error'
      default:
        return 'Disconnected'
    }
  }

  const getStatusDescription = () => {
    switch (state.connectionStatus) {
      case 'connected':
        return 'System is healthy and operational'
      case 'connecting':
        return 'Checking system health...'
      case 'error':
        return 'System health check failed'
      default:
        return 'System status unknown'
    }
  }

  const getCircuitBreakerColor = () => {
    switch (state.circuitBreakerState.state) {
      case 'CLOSED':
        return 'text-green-600 dark:text-green-400'
      case 'HALF_OPEN':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'OPEN':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

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

  if (compact) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`
          inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
          ${getStatusColor()}
          ${className}
        `}
      >
        <span aria-hidden="true" className="text-lg">
          {getStatusIcon()}
        </span>
        <span className="sr-only">Health status: {getStatusText()}</span>
        <span>{getStatusText()}</span>
      </div>
    )
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        p-4 rounded-lg border transition-all duration-200 ease-in-out
        ${getStatusColor()}
        hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="text-2xl animate-pulse"
            style={{ 
              animationDuration: '2s',
              animationPlayState: state.connectionStatus === 'connecting' ? 'running' : 'paused'
            }}
          >
            {getStatusIcon()}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {getStatusText()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {getStatusDescription()}
            </p>
          </div>
        </div>
        
        <button
          onClick={retryConnection}
          aria-label="Refresh health status"
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 
                     transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          disabled={state.loading}
        >
          <svg
            className={`w-5 h-5 ${state.loading ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 space-y-3">
          {/* Circuit Breaker Status */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Circuit Breaker:</span>
            <span className={`font-medium ${getCircuitBreakerColor()}`}>
              {state.circuitBreakerState.state}
            </span>
          </div>

          {/* Connection Info */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Connection Info
            </h4>
            
            {state.healthStatus && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {state.healthStatus.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Uptime:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {formatUptime(state.healthStatus.uptime)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Memory:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {formatMemory(state.healthStatus.memory.used)} / {formatMemory(state.healthStatus.memory.total)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Version:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {state.healthStatus.version}
                  </span>
                </div>
              </div>
            )}

            {state.healthMetrics && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Total Checks:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {state.healthMetrics.totalChecks}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {state.healthMetrics.totalChecks > 0 
                      ? `${((state.healthMetrics.successfulChecks / state.healthMetrics.totalChecks) * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Avg Response:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {state.healthMetrics.averageResponseTime.toFixed(0)}ms
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Failures:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {state.circuitBreakerState.failures}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Last Updated */}
          {state.lastUpdated && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date(state.lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {state.error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">⚠️</span>
            <div className="text-sm text-red-700 dark:text-red-300">
              <strong>Error:</strong> {state.error}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 