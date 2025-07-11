'use client'

import React from 'react'
import { useCampaignsConnection } from '@/contexts/CampaignsContext'

interface ConnectionStatusProps {
  className?: string
  showDetails?: boolean
}

export function ConnectionStatus({ className = '', showDetails = false }: ConnectionStatusProps) {
  const { connectionStatus, checkConnection, reconnect } = useCampaignsConnection()

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          icon: '🟢',
          label: 'Connected',
          description: 'Campaigns service is online',
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
        }
      case 'connecting':
        return {
          icon: '🟡',
          label: 'Connecting',
          description: 'Establishing connection...',
          color: 'text-yellow-600 dark:text-yellow-400',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
        }
      case 'disconnected':
        return {
          icon: '⚪',
          label: 'Disconnected',
          description: 'Campaigns service is offline',
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
        }
      case 'error':
        return {
          icon: '🔴',
          label: 'Error',
          description: 'Connection failed',
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
        }
      default:
        return {
          icon: '❓',
          label: 'Unknown',
          description: 'Status unknown',
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
        }
    }
  }

  const config = getStatusConfig()

  const handleReconnect = async () => {
    try {
      await reconnect()
    } catch (error) {
      console.error('Failed to reconnect:', error)
    }
  }

  const handleRefresh = async () => {
    try {
      await checkConnection()
    } catch (error) {
      console.error('Failed to check connection:', error)
    }
  }

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-lg border
        ${config.bgColor} ${config.borderColor} ${config.color}
        transition-all duration-200 ease-in-out
        hover:shadow-sm focus-within:ring-2 focus-within:ring-offset-2
        focus-within:ring-blue-500 dark:focus-within:ring-blue-400
        ${className}
      `}
      role="status"
      aria-live="polite"
      aria-label={`Campaigns service status: ${config.label}`}
    >
      {/* Status Icon */}
      <span
        className="text-sm font-medium"
        role="img"
        aria-label={`Status: ${config.label}`}
      >
        {config.icon}
      </span>

      {/* Status Text */}
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium truncate">
          {config.label}
        </span>
        
        {showDetails && (
          <span className="text-xs opacity-75 truncate">
            {config.description}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 ml-2">
        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className={`
            p-1 rounded-md transition-colors duration-150
            hover:bg-black/5 dark:hover:bg-white/5
            focus:outline-none focus:ring-2 focus:ring-offset-1
            focus:ring-blue-500 dark:focus:ring-blue-400
            ${config.color}
          `}
          aria-label="Refresh connection status"
          title="Refresh status"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        {/* Reconnect Button (only show when disconnected or error) */}
        {(connectionStatus === 'disconnected' || connectionStatus === 'error') && (
          <button
            onClick={handleReconnect}
            className={`
              p-1 rounded-md transition-colors duration-150
              hover:bg-black/5 dark:hover:bg-white/5
              focus:outline-none focus:ring-2 focus:ring-offset-1
              focus:ring-blue-500 dark:focus:ring-blue-400
              ${config.color}
            `}
            aria-label="Reconnect to campaigns service"
            title="Reconnect"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Loading Indicator */}
      {connectionStatus === 'connecting' && (
        <div
          className="ml-1 w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Connecting..."
        />
      )}
    </div>
  )
}

// Compact version for use in headers or small spaces
export function ConnectionStatusCompact({ className = '' }: { className?: string }) {
  const { connectionStatus } = useCampaignsConnection()

  const getCompactConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          icon: '🟢',
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-100 dark:bg-green-900/30',
        }
      case 'connecting':
        return {
          icon: '🟡',
          color: 'text-yellow-600 dark:text-yellow-400',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        }
      case 'disconnected':
        return {
          icon: '⚪',
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-100 dark:bg-gray-900/30',
        }
      case 'error':
        return {
          icon: '🔴',
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/30',
        }
      default:
        return {
          icon: '❓',
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-100 dark:bg-gray-900/30',
        }
    }
  }

  const config = getCompactConfig()

  return (
    <div
      className={`
        inline-flex items-center justify-center w-6 h-6 rounded-full
        ${config.bgColor} ${config.color}
        transition-all duration-200 ease-in-out
        ${className}
      `}
      role="status"
      aria-label={`Campaigns service: ${connectionStatus}`}
    >
      <span className="text-xs" role="img" aria-hidden="true">
        {config.icon}
      </span>
    </div>
  )
} 