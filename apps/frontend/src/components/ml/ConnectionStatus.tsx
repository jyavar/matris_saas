'use client'

import React from 'react'
import { useML } from '@/contexts/MLContext'

const ConnectionStatus: React.FC = () => {
  const { state, checkHealth, reconnect, isConnected, isHealthy } = useML()

  const isLoading = state.connectionStatus === 'connecting'

  const getStatusColor = (): string => {
    if (state.connectionStatus === 'connected' && isHealthy) {
      return 'text-green-600 dark:text-green-400'
    }
    if (state.connectionStatus === 'connecting') {
      return 'text-yellow-600 dark:text-yellow-400'
    }
    return 'text-red-600 dark:text-red-400'
  }

  const getStatusText = (): string => {
    switch (state.connectionStatus) {
      case 'connected':
        return isHealthy ? 'Connected & Healthy' : 'Connected (Degraded)'
      case 'connecting':
        return 'Connecting...'
      case 'error':
        return 'Connection Error'
      default:
        return 'Disconnected'
    }
  }

  const getCircuitBreakerStatus = (): string => {
    if (!state.health?.circuitBreaker) return 'Unknown'
    
    switch (state.health.circuitBreaker.state) {
      case 'closed':
        return 'Normal'
      case 'open':
        return 'Open (Failing)'
      case 'half-open':
        return 'Testing'
      default:
        return 'Unknown'
    }
  }

  return (
    <section 
      aria-label="ML Connection Status" 
      className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor().replace('text-', 'bg-')}`} />
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              ML Service Status
            </h3>
            <p className={`text-sm ${getStatusColor()}`}>
              {getStatusText()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          {state.health && (
            <>
              <span>Uptime: {Math.floor(state.health.uptime / 3600)}h</span>
              <span>Response: {state.health.responseTime}ms</span>
              <span>Circuit: {getCircuitBreakerStatus()}</span>
            </>
          )}
          
          {(state.connectionStatus === 'error' || state.connectionStatus === 'disconnected') && (
            <button
              onClick={reconnect}
              disabled={isLoading}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Reconnect to ML service"
            >
              Reconnect
            </button>
          )}
        </div>
      </div>
      
      {state.error && (
        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-400">
          Error: {state.error}
        </div>
      )}
    </section>
  )
}

export default ConnectionStatus 