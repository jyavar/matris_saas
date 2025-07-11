import React from 'react'
import { AlertTriangle, Wifi, WifiOff, RefreshCw } from 'lucide-react'

interface ConnectionStatusProps {
  isConnected: boolean
  isLoading: boolean
  error: string | null
  onRetry: () => void
  className?: string
}

export function ConnectionStatus({ 
  isConnected, 
  isLoading, 
  error, 
  onRetry, 
  className = '' 
}: ConnectionStatusProps) {
  if (!error && isConnected) {
    return null // Don't show anything if connected and no errors
  }

  return (
    <div className={`bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm ${className}`}>
      {!isConnected && (
        <div className="flex items-center space-x-3 text-amber-600 dark:text-amber-400">
          <WifiOff className="h-5 w-5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium">Backend Connection Lost</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Cannot connect to STRATO backend. Some features may be unavailable.
            </p>
          </div>
          <button
            onClick={onRetry}
            disabled={isLoading}
            className="flex items-center space-x-1 px-3 py-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-md hover:bg-amber-200 dark:hover:bg-amber-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <RefreshCw className="h-3 w-3" />
            )}
            <span>Retry</span>
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-start space-x-3 text-red-600 dark:text-red-400 mt-3">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-medium">Error</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {error}
            </p>
          </div>
        </div>
      )}

      {isConnected && !error && (
        <div className="flex items-center space-x-3 text-green-600 dark:text-green-400">
          <Wifi className="h-5 w-5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium">Connected</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Successfully connected to STRATO backend.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 