'use client'

import React from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'

interface Alert {
  id: string
  type: 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
}

interface AgentStatus {
  id: string
  name: string
  status: 'active' | 'inactive' | 'error'
  lastActivity: Date
  tasksCompleted: number
}

interface AdPanelProps {
  alerts?: Alert[]
  agentStatuses?: AgentStatus[]
  onAlertDismiss?: (alertId: string) => void
  onAgentRestart?: (agentId: string) => void
  className?: string
}

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'error':
      return '🚨'
    case 'warning':
      return '⚠️'
    case 'info':
      return 'ℹ️'
    default:
      return 'ℹ️'
  }
}

const getStatusColor = (status: AgentStatus['status']) => {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-100'
    case 'inactive':
      return 'text-yellow-600 bg-yellow-100'
    case 'error':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
  
  if (diffInMinutes < 1) return 'Ahora'
  if (diffInMinutes < 60) return `${diffInMinutes}m`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
  return `${Math.floor(diffInMinutes / 1440)}d`
}

export default function AdPanel({
  alerts = [],
  agentStatuses = [],
  onAlertDismiss,
  onAgentRestart,
  className = ''
}: AdPanelProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* Alerts Panel */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Alertas del Sistema
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {alerts.length} activas
          </span>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-2xl mb-2">✅</div>
              <p>No hay alertas activas</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'error'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : alert.type === 'warning'
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getAlertIcon(alert.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {alert.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {alert.message}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                  {onAlertDismiss && (
                    <button
                      onClick={() => onAlertDismiss(alert.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm"
                      aria-label="Descartar alerta"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Agent Status Panel */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Estado de Agentes
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {agentStatuses.filter(a => a.status === 'active').length} activos
          </span>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {agentStatuses.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-2xl mb-2">🤖</div>
              <p>No hay agentes configurados</p>
            </div>
          ) : (
            agentStatuses.map((agent) => (
              <div
                key={agent.id}
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}
                      aria-label={`Estado: ${agent.status}`}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {agent.name}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <span>{agent.tasksCompleted} tareas</span>
                        <span>Última actividad: {formatTimeAgo(agent.lastActivity)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {agent.status === 'error' && onAgentRestart && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAgentRestart(agent.id)}
                      className="text-xs"
                    >
                      Reiniciar
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}