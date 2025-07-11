'use client'

import React from 'react'
import { useBilling } from '@/contexts/BillingContext'

interface ConnectionStatusProps {
  className?: string
  showDetails?: boolean
  compact?: boolean
}

export function ConnectionStatus({ 
  className = '', 
  showDetails = false, 
  compact = false 
}: ConnectionStatusProps): React.JSX.Element {
  const { state } = useBilling()
  const { connectionStatus, circuitBreakerState, lastUpdated } = state

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          label: 'Connected',
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          icon: '🟢',
          description: 'Billing service is operational'
        }
      case 'connecting':
        return {
          label: 'Connecting',
          color: 'text-yellow-600 dark:text-yellow-400',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          icon: '🟡',
          description: 'Establishing connection...'
        }
      case 'error':
        return {
          label: 'Error',
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          icon: '🔴',
          description: 'Connection failed'
        }
      case 'disconnected':
        return {
          label: 'Disconnected',
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-100 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          icon: '⚪',
          description: 'No connection'
        }
      default:
        return {
          label: 'Unknown',
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-100 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          icon: '❓',
          description: 'Unknown status'
        }
    }
  }

  const getCircuitBreakerStatus = () => {
    switch (circuitBreakerState.state) {
      case 'CLOSED':
        return {
          label: 'Healthy',
          color: 'text-green-600 dark:text-green-400',
          description: 'Circuit breaker is closed (normal operation)'
        }
      case 'OPEN':
        return {
          label: 'Open',
          color: 'text-red-600 dark:text-red-400',
          description: 'Circuit breaker is open (service protection active)'
        }
      case 'HALF_OPEN':
        return {
          label: 'Testing',
          color: 'text-yellow-600 dark:text-yellow-400',
          description: 'Circuit breaker is testing connection'
        }
      default:
        return {
          label: 'Unknown',
          color: 'text-gray-600 dark:text-gray-400',
          description: 'Unknown circuit breaker state'
        }
    }
  }

  const formatLastUpdated = (timestamp: string | null): string => {
    if (!timestamp) return 'Never'
    
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  const statusConfig = getStatusConfig()
  const circuitStatus = getCircuitBreakerStatus()

  if (compact) {
    return (
      <div 
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
          border transition-all duration-200 ease-in-out
          ${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color}
          hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${className}
        `}
        role="status"
        aria-live="polite"
        aria-label={`Billing service status: ${statusConfig.label}`}
      >
        <span className="text-base" aria-hidden="true">
          {statusConfig.icon}
        </span>
        <span className="sr-only">Status: </span>
        <span>{statusConfig.label}</span>
      </div>
    )
  }

  return (
    <div 
      className={`
        p-4 rounded-lg border transition-all duration-200 ease-in-out
        ${statusConfig.bgColor} ${statusConfig.borderColor}
        hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
        ${className}
      `}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span 
            className="text-2xl animate-pulse" 
            aria-hidden="true"
            style={{ 
              animationDuration: connectionStatus === 'connecting' ? '1s' : '2s',
              animationPlayState: connectionStatus === 'connecting' ? 'running' : 'paused'
            }}
          >
            {statusConfig.icon}
          </span>
          <div>
            <h3 className={`text-lg font-semibold ${statusConfig.color}`}>
              {statusConfig.label}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {statusConfig.description}
            </p>
          </div>
        </div>
        
        {showDetails && (
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            <div>Last updated: {formatLastUpdated(lastUpdated)}</div>
          </div>
        )}
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Circuit Breaker
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">State:</span>
                  <span className={`font-medium ${circuitStatus.color}`}>
                    {circuitStatus.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Failures:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {circuitBreakerState.failures}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last Failure:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {circuitBreakerState.lastFailureTime > 0 
                      ? formatLastUpdated(new Date(circuitBreakerState.lastFailureTime).toISOString())
                      : 'Never'
                    }
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {circuitStatus.description}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Connection Info
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`font-medium ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last Sync:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {formatLastUpdated(lastUpdated)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Service:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Billing API
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConnectionStatus 