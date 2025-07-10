'use client'

import React, { useState } from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'

interface SaasMetrics {
  users: number
  revenue: number
  uptime: number
  requests: number
  errors: number
}

interface SaasData {
  id: string
  name: string
  status: 'active' | 'inactive' | 'maintenance' | 'error'
  version: string
  lastDeployment: Date
  metrics: SaasMetrics
  url: string
  description: string
}

interface SaasTableProps {
  data?: SaasData[]
  onRefresh?: () => void
  onManage?: (saasId: string) => void
  onView?: (saasId: string) => void
  className?: string
}

const getStatusColor = (status: SaasData['status']) => {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-100 dark:bg-green-900/20'
    case 'inactive':
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    case 'maintenance':
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
    case 'error':
      return 'text-red-600 bg-red-100 dark:bg-red-900/20'
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
  }
}

const getStatusIcon = (status: SaasData['status']) => {
  switch (status) {
    case 'active':
      return '🟢'
    case 'inactive':
      return '⚫'
    case 'maintenance':
      return '🟡'
    case 'error':
      return '🔴'
    default:
      return '⚫'
  }
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export default function SaasTable({
  data = [],
  onRefresh,
  onManage,
  onView,
  className = ''
}: SaasTableProps) {
  const [sortField, setSortField] = useState<keyof SaasData>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: keyof SaasData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === 'lastDeployment') {
      aValue = a.lastDeployment.getTime()
      bValue = b.lastDeployment.getTime()
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            SaaS Activos
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.length} aplicaciones desplegadas
          </p>
        </div>
        {onRefresh && (
          <Button
            size="sm"
            variant="outline"
            onClick={onRefresh}
            className="flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>Actualizar</span>
          </Button>
        )}
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-4">📦</div>
          <h4 className="text-lg font-medium mb-2">No hay SaaS desplegados</h4>
          <p>Comienza creando tu primera aplicación SaaS</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th
                  className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Nombre</span>
                    {sortField === 'name' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Estado</span>
                    {sortField === 'status' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Métricas
                </th>
                <th
                  className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                  onClick={() => handleSort('lastDeployment')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Último Deploy</span>
                    {sortField === 'lastDeployment' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((saas) => (
                <tr
                  key={saas.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {saas.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {saas.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {saas.description}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          v{saas.version}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(saas.status)}`}
                    >
                      <span className="mr-1">{getStatusIcon(saas.status)}</span>
                      {saas.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Usuarios:</span>
                        <span className="ml-1 font-medium text-gray-900 dark:text-white">
                          {formatNumber(saas.metrics.users)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Ingresos:</span>
                        <span className="ml-1 font-medium text-gray-900 dark:text-white">
                          {formatCurrency(saas.metrics.revenue)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Uptime:</span>
                        <span className="ml-1 font-medium text-gray-900 dark:text-white">
                          {saas.metrics.uptime}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Requests:</span>
                        <span className="ml-1 font-medium text-gray-900 dark:text-white">
                          {formatNumber(saas.metrics.requests)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(saas.lastDeployment)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {onView && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onView(saas.id)}
                          className="text-xs"
                        >
                          Ver
                        </Button>
                      )}
                      {onManage && (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => onManage(saas.id)}
                          className="text-xs"
                        >
                          Gestionar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}