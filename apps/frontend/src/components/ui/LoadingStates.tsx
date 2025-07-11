import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'white'
  text?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  text 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white'
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  )
}

interface SkeletonProps {
  className?: string
  lines?: number
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', lines = 1 }) => {
  if (lines === 1) {
    return (
      <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
    )
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
        />
      ))}
    </div>
  )
}

interface OfflineIndicatorProps {
  onRetry?: () => void
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ onRetry }) => {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
      <div className="flex items-center">
        <svg
          className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
          Sin conexión
        </span>
      </div>
      <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
        No se puede conectar al servidor. Algunas funciones pueden no estar disponibles.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100 font-medium"
        >
          Reintentar conexión
        </button>
      )}
    </div>
  )
}

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  icon, 
  action 
}) => {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="mx-auto w-12 h-12 text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {description}
      </p>
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  )
}

interface RetryButtonProps {
  onRetry: () => void
  loading?: boolean
  children?: React.ReactNode
}

export const RetryButton: React.FC<RetryButtonProps> = ({ 
  onRetry, 
  loading = false, 
  children = 'Reintentar' 
}) => {
  return (
    <button
      onClick={onRetry}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

interface CircuitBreakerIndicatorProps {
  state: 'closed' | 'open' | 'half-open'
  retryCount: number
  onRetry: () => void
}

export const CircuitBreakerIndicator: React.FC<CircuitBreakerIndicatorProps> = ({
  state,
  retryCount,
  onRetry
}) => {
  const getStateInfo = () => {
    switch (state) {
      case 'closed':
        return {
          color: 'green',
          text: 'Sistema funcionando normalmente',
          icon: (
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        }
      case 'open':
        return {
          color: 'red',
          text: 'Sistema temporalmente no disponible',
          icon: (
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        }
      case 'half-open':
        return {
          color: 'yellow',
          text: 'Probando conexión...',
          icon: (
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )
        }
    }
  }

  const stateInfo = getStateInfo()

  return (
    <div className={`bg-${stateInfo.color}-50 dark:bg-${stateInfo.color}-900 border border-${stateInfo.color}-200 dark:border-${stateInfo.color}-700 rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {stateInfo.icon}
          <span className={`ml-2 text-sm font-medium text-${stateInfo.color}-800 dark:text-${stateInfo.color}-200`}>
            {stateInfo.text}
          </span>
        </div>
        {retryCount > 0 && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Reintentos: {retryCount}
          </span>
        )}
      </div>
      {state === 'open' && (
        <div className="mt-2">
          <RetryButton onRetry={onRetry}>
            Reintentar conexión
          </RetryButton>
        </div>
      )}
    </div>
  )
} 