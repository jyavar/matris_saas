'use client'

import React, { useState, useEffect } from 'react'
import { Card, Badge, Progress } from '@/components/ui'
import { Button } from '@/components/ui'
import { CreditCard, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

interface BillingData {
  currentPlan: string
  monthlySpend: number
  monthlyLimit: number
  nextBillingDate: string
  usagePercentage: number
  invoices: Array<{
    id: string
    amount: number
    status: 'paid' | 'pending' | 'overdue'
    date: string
  }>
}

const BillingDashboard: React.FC = () => {
  const [billingData, setBillingData] = useState<BillingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos de billing
    const loadBillingData = async () => {
      try {
        // TODO: Integrar con API real de billing
        const mockData: BillingData = {
          currentPlan: 'Pro',
          monthlySpend: 245.50,
          monthlyLimit: 500,
          nextBillingDate: '2024-02-15',
          usagePercentage: 49.1,
          invoices: [
            {
              id: 'INV-001',
              amount: 245.50,
              status: 'paid',
              date: '2024-01-15',
            },
            {
              id: 'INV-002',
              amount: 198.75,
              status: 'pending',
              date: '2024-02-15',
            },
          ],
        }
        
        setBillingData(mockData)
      } catch (error) {
        console.error('Error loading billing data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBillingData()
  }, [])

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Cargando datos de facturación...</div>
      </div>
    )
  }

  if (!billingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error al cargar datos de facturación</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard de Facturación</h1>
        <Button>
          <CreditCard className="w-4 h-4 mr-2" />
          Gestionar Métodos de Pago
        </Button>
      </div>

      {/* Resumen de Plan y Uso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Plan Actual</h3>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6">
            <div className="text-2xl font-bold">{billingData.currentPlan}</div>
            <p className="text-xs text-muted-foreground">
              Próxima facturación: {new Date(billingData.nextBillingDate).toLocaleDateString()}
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Gasto Mensual</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6">
            <div className="text-2xl font-bold">${billingData.monthlySpend.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              de ${billingData.monthlyLimit.toFixed(2)} límite
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Uso del Plan</h3>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6">
            <div className="text-2xl font-bold">{billingData.usagePercentage.toFixed(1)}%</div>
            <Progress value={billingData.usagePercentage} className="mt-2" />
          </div>
        </Card>
      </div>

      {/* Facturas Recientes */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold">Facturas Recientes</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Historial de tus últimas facturas y pagos
          </p>
          <div className="space-y-4">
            {billingData.invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">${invoice.amount.toFixed(2)}</span>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status === 'paid' && 'Pagado'}
                    {invoice.status === 'pending' && 'Pendiente'}
                    {invoice.status === 'overdue' && 'Vencido'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BillingDashboard 