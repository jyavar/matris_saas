'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { BarChart3, TrendingUp, Users, Activity, Calendar } from 'lucide-react'

interface AnalyticsData {
  period: string
  users: number
  sessions: number
  conversionRate: number
  revenue: number
  growth: number
}

interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor: string
  }>
}

const AnalyticsChart: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        // TODO: Integrar con API real de analytics
        const mockData: AnalyticsData = {
          period: timeRange === '7d' ? 'Últimos 7 días' : timeRange === '30d' ? 'Últimos 30 días' : 'Últimos 90 días',
          users: 12450,
          sessions: 45678,
          conversionRate: 3.2,
          revenue: 125000,
          growth: 12.5,
        }

        const mockChartData: ChartData = {
          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
          datasets: [
            {
              label: 'Usuarios Activos',
              data: [1200, 1350, 1100, 1400, 1600, 1800, 1700],
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
            },
            {
              label: 'Sesiones',
              data: [4500, 5200, 4800, 5500, 6200, 6800, 6500],
              backgroundColor: 'rgba(16, 185, 129, 0.8)',
            },
          ],
        }

        setAnalyticsData(mockData)
        setChartData(mockChartData)
      } catch (error) {
        console.error('Error loading analytics data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAnalyticsData()
  }, [timeRange])

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Cargando datos de analytics...</div>
      </div>
    )
  }

  if (!analyticsData || !chartData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error al cargar datos de analytics</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <Button
            variant={timeRange === '7d' ? 'primary' : 'outline'}
            onClick={() => setTimeRange('7d')}
          >
            7D
          </Button>
          <Button
            variant={timeRange === '30d' ? 'primary' : 'outline'}
            onClick={() => setTimeRange('30d')}
          >
            30D
          </Button>
          <Button
            variant={timeRange === '90d' ? 'primary' : 'outline'}
            onClick={() => setTimeRange('90d')}
          >
            90D
          </Button>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Usuarios Activos</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.users)}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+{analyticsData.growth}%</span>
              <span className="text-muted-foreground ml-1">vs mes anterior</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sesiones</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.sessions)}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+8.2%</span>
              <span className="text-muted-foreground ml-1">vs mes anterior</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasa de Conversión</p>
                <p className="text-2xl font-bold">{analyticsData.conversionRate}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+0.5%</span>
              <span className="text-muted-foreground ml-1">vs mes anterior</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ingresos</p>
                <p className="text-2xl font-bold">${formatNumber(analyticsData.revenue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+15.3%</span>
              <span className="text-muted-foreground ml-1">vs mes anterior</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Gráfico de Actividad */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Actividad Semanal</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.datasets[0].data.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{
                    height: `${(value / Math.max(...chartData.datasets[0].data)) * 200}px`,
                  }}
                />
                <span className="text-xs text-muted-foreground mt-2">
                  {chartData.labels[index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm">Usuarios Activos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm">Sesiones</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AnalyticsChart 