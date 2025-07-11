import React from 'react'

/**
 * ConnectionStatus - STRATO READY™
 * Componente enterprise-grade para mostrar el estado de conexión de un servicio (Analytics, API, etc.)
 * - Soporte dark mode, accesibilidad (a11y), animaciones sutiles, iconografía profesional
 * - Tipado estricto, sin dependencias externas salvo React y Tailwind
 *
 * Props:
 *   status: 'connected' | 'connecting' | 'disconnected' | 'error' | 'degraded'
 *   message?: string // Mensaje adicional opcional
 *   health?: {
 *     status: 'healthy' | 'degraded' | 'unhealthy'
 *     circuitBreaker?: { state: string; failures: number; lastFailure: number }
 *     lastCheck?: string
 *     responseTime?: number
 *   }
 *
 * Uso:
 *   <ConnectionStatus status={state.connectionStatus} health={state.health} />
 */

export type ConnectionStatusType = 'connected' | 'connecting' | 'disconnected' | 'error' | 'degraded'

export interface ConnectionStatusProps {
  status: ConnectionStatusType
  message?: string
  health?: {
    status: 'healthy' | 'degraded' | 'unhealthy'
    circuitBreaker?: { state: string; failures: number; lastFailure: number }
    lastCheck?: string
    responseTime?: number
  }
}

const statusConfig: Record<ConnectionStatusType, {
  label: string
  color: string
  icon: React.FC<{ className?: string }>
  a11y: string
}> = {
  connected: {
    label: 'Conectado',
    color: 'text-green-600 dark:text-green-400',
    icon: function ConnectedIcon({ className }) {
      return <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><circle cx="10" cy="10" r="8" className="opacity-30" /><circle cx="10" cy="10" r="5" /></svg>
    },
    a11y: 'Servicio conectado',
  },
  connecting: {
    label: 'Conectando…',
    color: 'text-blue-600 dark:text-blue-400 animate-pulse',
    icon: function ConnectingIcon({ className }) {
      return <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" className="opacity-30" /><circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="2" className="opacity-70 animate-spin origin-center" /></svg>
    },
    a11y: 'Conectando al servicio',
  },
  disconnected: {
    label: 'Desconectado',
    color: 'text-gray-500 dark:text-gray-400',
    icon: function DisconnectedIcon({ className }) {
      return <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" className="opacity-30" /><line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" strokeWidth="2" className="opacity-70" /></svg>
    },
    a11y: 'Servicio desconectado',
  },
  error: {
    label: 'Error',
    color: 'text-red-600 dark:text-red-400 animate-pulse',
    icon: function ErrorIcon({ className }) {
      return <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" className="opacity-30" /><path d="M10 6v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
    },
    a11y: 'Error de conexión',
  },
  degraded: {
    label: 'Degradado',
    color: 'text-yellow-600 dark:text-yellow-400',
    icon: function DegradedIcon({ className }) {
      return <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" className="opacity-30" /><path d="M10 7v3m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
    },
    a11y: 'Servicio degradado',
  },
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status, message, health }) => {
  const config = statusConfig[status] || statusConfig['disconnected']
  const tooltip =
    health?.status === 'unhealthy'
      ? 'Servicio no disponible'
      : health?.status === 'degraded'
      ? 'Servicio degradado'
      : health?.status === 'healthy'
      ? 'Servicio saludable'
      : config.label

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-zinc-900/80 shadow border border-zinc-200 dark:border-zinc-800 transition-colors"
      role="status"
      aria-live="polite"
      aria-label={config.a11y}
      tabIndex={0}
      title={tooltip}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {config.icon({ className: `h-4 w-4 ${config.color}` })}
        {status === 'connecting' && (
          <span className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20" />
        )}
        {status === 'error' && (
          <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-20" />
        )}
        {status === 'degraded' && (
          <span className="absolute inset-0 animate-ping rounded-full bg-yellow-400 opacity-20" />
        )}
      </span>
      <span className={`font-medium text-sm ${config.color}`}>{config.label}</span>
      {message && (
        <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-xs" aria-label={message}>
          {message}
        </span>
      )}
      {health?.circuitBreaker && (
        <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-500" title={`CB: ${health.circuitBreaker.state}, Fails: ${health.circuitBreaker.failures}`}>CB:{' '}
          <span className={`font-bold ${health.circuitBreaker.state === 'open' ? 'text-red-500' : 'text-green-500'}`}>{health.circuitBreaker.state}</span>
        </span>
      )}
      {health?.responseTime !== undefined && (
        <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-500" title="Tiempo de respuesta">
          {health.responseTime}ms
        </span>
      )}
    </div>
  )
}

export default ConnectionStatus 