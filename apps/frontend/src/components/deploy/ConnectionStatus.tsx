'use client'

import React from 'react'
import { useDeploy } from '../../contexts/DeployContext'

interface ConnectionStatusProps {
  className?: string
  showDetails?: boolean
}

export function DeployConnectionStatus({ className = '', showDetails = false }: ConnectionStatusProps) {
  const { state } = useDeploy()
  const { health, circuitBreakerOpen, loading } = state

  // Determine status
  const getStatus = () => {
    if (circuitBreakerOpen) return 'error'
    if (loading) return 'loading'
    if (health?.isHealthy) return 'connected'
    return 'disconnected'
  }

  const status = getStatus()

  // Status configurations
  const statusConfig = {
    connected: {
      label: 'Conectado',
      icon: '🟢',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    disconnected: {
      label: 'Desconectado',
      icon: '🔴',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    },
    loading: {
      label: 'Conectando...',
      icon: '🟡',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    error: {
      label: 'Error de Conexión',
      icon: '🔴',
      color: 'text-red-600',
      bgColor: 'bg-red-600/10',
      borderColor: 'border-red-600/20',
    },
  }

  const config = statusConfig[status]

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-lg border
        transition-all duration-200 ease-in-out
        ${config.bgColor} ${config.borderColor}
        ${className}
      `}
      role="status"
      aria-live="polite"
      aria-label={`Estado de conexión de deploy: ${config.label}`}
    >
      {/* Status Icon */}
      <span
        className={`
          text-sm font-medium ${config.color}
          ${status === 'loading' ? 'animate-pulse' : ''}
        `}
        aria-hidden="true"
      >
        {config.icon}
      </span>

      {/* Status Label */}
      <span className={`text-sm font-medium ${config.color}`}>
        {config.label}
      </span>

      {/* Details (optional) */}
      {showDetails && health && (
        <div className="ml-2 pl-2 border-l border-current/20">
          <div className="text-xs opacity-75">
            <span className="block">
              Tiempo: {health.responseTime}ms
            </span>
            {health.errorRate > 0 && (
              <span className="block">
                Error: {(health.errorRate * 100).toFixed(1)}%
              </span>
            )}
          </div>
        </div>
      )}

      {/* Circuit Breaker Indicator */}
      {circuitBreakerOpen && (
        <div className="ml-2">
          <span
            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            title="Circuit breaker abierto - servicio temporalmente no disponible"
          >
            CB
          </span>
        </div>
      )}

      {/* Loading Spinner */}
      {status === 'loading' && (
        <div className="ml-2">
          <div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}

// Compact version for headers/toolbars
export function DeployConnectionStatusCompact({ className = '' }: { className?: string }) {
  const { state } = useDeploy()
  const { health, circuitBreakerOpen } = state

  const isHealthy = health?.isHealthy && !circuitBreakerOpen

  return (
    <div
      className={`
        inline-flex items-center justify-center w-6 h-6 rounded-full
        transition-all duration-200 ease-in-out
        ${isHealthy 
          ? 'bg-green-500/20 text-green-500' 
          : 'bg-red-500/20 text-red-500'
        }
        ${className}
      `}
      role="status"
      aria-label={`Estado de deploy: ${isHealthy ? 'Conectado' : 'Desconectado'}`}
      title={`Deploy: ${isHealthy ? 'Conectado' : 'Desconectado'}`}
    >
      <span className="text-xs">
        {isHealthy ? '🟢' : '🔴'}
      </span>
    </div>
  )
}

// Badge version for notifications
export function DeployConnectionStatusBadge({ className = '' }: { className?: string }) {
  const { state } = useDeploy()
  const { health, circuitBreakerOpen } = state

  const isHealthy = health?.isHealthy && !circuitBreakerOpen

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
        transition-all duration-200 ease-in-out
        ${isHealthy 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }
        ${className}
      `}
      role="status"
      aria-label={`Estado de deploy: ${isHealthy ? 'Conectado' : 'Desconectado'}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {isHealthy ? 'Deploy OK' : 'Deploy Error'}
    </span>
  )
} 