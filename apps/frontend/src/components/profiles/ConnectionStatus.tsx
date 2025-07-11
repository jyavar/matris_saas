import React from 'react'
import { useProfiles } from '../../contexts/ProfilesContext'

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
  const { state, retryConnection } = useProfiles()

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
        return '👤'
      case 'connecting':
        return '⏳'
      case 'error':
        return '❌'
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
        return 'Profile service is operational'
      case 'connecting':
        return 'Connecting to profile service...'
      case 'error':
        return 'Profile service connection failed'
      default:
        return 'Profile service status unknown'
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
        <span className="sr-only">Profile service status: {getStatusText()}</span>
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
          aria-label="Refresh profile service status"
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

          {/* Profile Info */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Profile Information
            </h4>
            
            {state.currentProfile && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Name:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {state.currentProfile.full_name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Email:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {state.currentProfile.email}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {state.currentProfile.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Last Login:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {state.currentProfile.last_login ? formatDate(state.currentProfile.last_login) : 'Never'}
                  </span>
                </div>
              </div>
            )}

            {/* Activity Summary */}
            <div className="mt-3">
              <span className="text-gray-600 dark:text-gray-400">Recent Activity:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">
                {state.activity.length} items
              </span>
            </div>

            {/* Search Results */}
            {state.searchResults.length > 0 && (
              <div className="mt-3">
                <span className="text-gray-600 dark:text-gray-400">Search Results:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {state.searchResults.length} profiles found
                </span>
              </div>
            )}
          </div>

          {/* Last Updated */}
          {state.lastUpdated && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {formatDate(state.lastUpdated)}
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