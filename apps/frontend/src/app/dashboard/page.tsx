'use client'

import { AdPanel, SaasTable, DarkModeToggle } from '@/components/control-tower'

const mockAlerts = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'Alto uso de CPU',
    message: 'El servidor principal está usando el 85% de CPU.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    id: '2',
    type: 'error' as const,
    title: 'Servicio inactivo',
    message: 'El microservicio de pagos no responde.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  }
]

const mockAgents = [
  {
    id: '1',
    name: 'Agent DataSync',
    status: 'active' as const,
    lastActivity: new Date(Date.now() - 5 * 60 * 1000),
    tasksCompleted: 142
  },
  {
    id: '2',
    name: 'Agent Monitor',
    status: 'error' as const,
    lastActivity: new Date(Date.now() - 45 * 60 * 1000),
    tasksCompleted: 89
  },
  {
    id: '3',
    name: 'Agent Backup',
    status: 'inactive' as const,
    lastActivity: new Date(Date.now() - 120 * 60 * 1000),
    tasksCompleted: 67
  }
]

const mockSaasData = [
  {
    id: '1',
    name: 'E-commerce Plus',
    status: 'active' as const,
    version: '2.1.4',
    lastDeployment: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    metrics: {
      users: 1542,
      revenue: 28450,
      uptime: 99.8,
      requests: 125000,
      errors: 23
    },
    url: 'https://ecommerce-plus.app',
    description: 'Plataforma de comercio electrónico'
  },
  {
    id: '2',
    name: 'TaskFlow Pro',
    status: 'maintenance' as const,
    version: '1.8.2',
    lastDeployment: new Date(Date.now() - 6 * 60 * 60 * 1000),
    metrics: {
      users: 892,
      revenue: 15200,
      uptime: 95.2,
      requests: 78000,
      errors: 12
    },
    url: 'https://taskflow-pro.app',
    description: 'Gestión de tareas y proyectos'
  },
  {
    id: '3',
    name: 'CRM Ultimate',
    status: 'active' as const,
    version: '3.0.1',
    lastDeployment: new Date(Date.now() - 24 * 60 * 60 * 1000),
    metrics: {
      users: 2341,
      revenue: 45680,
      uptime: 99.9,
      requests: 234000,
      errors: 5
    },
    url: 'https://crm-ultimate.app',
    description: 'Sistema de gestión de clientes'
  }
]

export default function DashboardPage() {
  const handleAlertDismiss = (alertId: string) => {
    console.log('Dismissing alert:', alertId)
  }

  const handleAgentRestart = (agentId: string) => {
    console.log('Restarting agent:', agentId)
  }

  const handleSaasRefresh = () => {
    console.log('Refreshing SaaS data')
  }

  const handleSaasManage = (saasId: string) => {
    console.log('Managing SaaS:', saasId)
  }

  const handleSaasView = (saasId: string) => {
    console.log('Viewing SaaS:', saasId)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              STRATO Control Tower™
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
              Monitor y gestión centralizada de todos los SaaS
            </p>
          </div>
          <DarkModeToggle />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Alerts and Agents Panel */}
          <AdPanel
            alerts={mockAlerts}
            agentStatuses={mockAgents}
            onAlertDismiss={handleAlertDismiss}
            onAgentRestart={handleAgentRestart}
          />

          {/* SaaS Table */}
          <SaasTable
            data={mockSaasData}
            onRefresh={handleSaasRefresh}
            onManage={handleSaasManage}
            onView={handleSaasView}
          />
        </div>
      </div>
    </div>
  )
}
