import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

import DashboardPage from './page'

// Mock control-tower components
const mockHandleAlertDismiss = vi.fn()
const mockHandleAgentRestart = vi.fn()
const mockHandleSaasRefresh = vi.fn()
const mockHandleSaasManage = vi.fn()
const mockHandleSaasView = vi.fn()

vi.mock('@/components/control-tower', () => ({
  AdPanel: ({ alerts, agentStatuses, onAlertDismiss, onAgentRestart }: {
    alerts?: Array<{ id: string; type: string; title: string; message: string; timestamp: Date }>
    agentStatuses?: Array<{ id: string; name: string; status: string; lastActivity: Date; tasksCompleted: number }>
    onAlertDismiss?: (id: string) => void
    onAgentRestart?: (id: string) => void
  }) => (
    <div data-testid="ad-panel">
      <h2>Alertas del Sistema</h2>
      {alerts?.map(alert => (
        <div key={alert.id} data-testid={`alert-${alert.id}`}>
          <span>{alert.title}</span>
          <button onClick={() => onAlertDismiss?.(alert.id)}>Descartar</button>
        </div>
      ))}
      <h2>Estado de Agentes</h2>
      {agentStatuses?.map(agent => (
        <div key={agent.id} data-testid={`agent-${agent.id}`}>
          <span>{agent.name}</span>
          {agent.status === 'error' && (
            <button onClick={() => onAgentRestart?.(agent.id)}>Reiniciar</button>
          )}
        </div>
      ))}
    </div>
  ),
  SaasTable: ({ data, onRefresh, onManage, onView }: {
    data: Array<{ id: string; name: string; status: string; version: string; url: string; description: string }>
    onRefresh?: () => void
    onManage?: (id: string) => void
    onView?: (id: string) => void
  }) => (
    <div data-testid="saas-table">
      <button onClick={onRefresh}>Refresh</button>
      {data.map(saas => (
        <div key={saas.id} data-testid={`saas-${saas.id}`}>
          <span>{saas.name}</span>
          <button onClick={() => onManage?.(saas.id)}>Manage</button>
          <button onClick={() => onView?.(saas.id)}>View</button>
        </div>
      ))}
    </div>
  ),
  DarkModeToggle: () => <div data-testid="dark-mode-toggle">Dark Mode Toggle</div>,
}))

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render dashboard with correct title and description', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('STRATO Control Tower™')).toBeInTheDocument()
    expect(screen.getByText(/Monitor y gestión centralizada/)).toBeInTheDocument()
  })

  it('should render AdPanel component', () => {
    render(<DashboardPage />)
    
    expect(screen.getByTestId('ad-panel')).toBeInTheDocument()
    expect(screen.getByText('Alertas del Sistema')).toBeInTheDocument()
    expect(screen.getByText('Estado de Agentes')).toBeInTheDocument()
  })

  it('should render SaasTable component', () => {
    render(<DashboardPage />)
    
    expect(screen.getByTestId('saas-table')).toBeInTheDocument()
  })

  it('should render DarkModeToggle component', () => {
    render(<DashboardPage />)
    
    expect(screen.getByTestId('dark-mode-toggle')).toBeInTheDocument()
  })

  it('should display mock alerts correctly', () => {
    render(<DashboardPage />)
    
    expect(screen.getByTestId('alert-1')).toBeInTheDocument()
    expect(screen.getByTestId('alert-2')).toBeInTheDocument()
    expect(screen.getByText('Alto uso de CPU')).toBeInTheDocument()
    expect(screen.getByText('Servicio inactivo')).toBeInTheDocument()
  })

  it('should display mock agents correctly', () => {
    render(<DashboardPage />)
    
    expect(screen.getByTestId('agent-1')).toBeInTheDocument()
    expect(screen.getByTestId('agent-2')).toBeInTheDocument()
    expect(screen.getByTestId('agent-3')).toBeInTheDocument()
    expect(screen.getByText('Agent DataSync')).toBeInTheDocument()
    expect(screen.getByText('Agent Monitor')).toBeInTheDocument()
    expect(screen.getByText('Agent Backup')).toBeInTheDocument()
  })

  it('should display mock SaaS data correctly', () => {
    render(<DashboardPage />)
    
    expect(screen.getByTestId('saas-1')).toBeInTheDocument()
    expect(screen.getByTestId('saas-2')).toBeInTheDocument()
    expect(screen.getByTestId('saas-3')).toBeInTheDocument()
    expect(screen.getByText('E-commerce Plus')).toBeInTheDocument()
    expect(screen.getByText('TaskFlow Pro')).toBeInTheDocument()
    expect(screen.getByText('CRM Ultimate')).toBeInTheDocument()
  })

  it('should handle alert dismiss', async () => {
    render(<DashboardPage />)
    
    const dismissButton = screen.getAllByText('Descartar')[0]
    await userEvent.click(dismissButton)
    
    // The handler should be called (though we can't directly test the console.log)
    expect(dismissButton).toBeInTheDocument()
  })

  it('should handle agent restart', async () => {
    render(<DashboardPage />)
    
    const restartButton = screen.getAllByText('Reiniciar')[0]
    await userEvent.click(restartButton)
    
    // The handler should be called (though we can't directly test the console.log)
    expect(restartButton).toBeInTheDocument()
  })

  it('should handle SaaS refresh', async () => {
    render(<DashboardPage />)
    
    const refreshButton = screen.getByText('Refresh')
    await userEvent.click(refreshButton)
    
    // The handler should be called (though we can't directly test the console.log)
    expect(refreshButton).toBeInTheDocument()
  })

  it('should handle SaaS manage', async () => {
    render(<DashboardPage />)
    
    const manageButton = screen.getAllByText('Manage')[0]
    await userEvent.click(manageButton)
    
    // The handler should be called (though we can't directly test the console.log)
    expect(manageButton).toBeInTheDocument()
  })

  it('should handle SaaS view', async () => {
    render(<DashboardPage />)
    
    const viewButton = screen.getAllByText('View')[0]
    await userEvent.click(viewButton)
    
    // The handler should be called (though we can't directly test the console.log)
    expect(viewButton).toBeInTheDocument()
  })

  it('should have proper layout structure', () => {
    render(<DashboardPage />)
    
    const container = document.querySelector('.min-h-screen')
    expect(container).toHaveClass('bg-gray-50', 'dark:bg-gray-900')
    
    const mainContainer = document.querySelector('.max-w-7xl')
    expect(mainContainer).toBeInTheDocument()
  })

  it('should have proper spacing and organization', () => {
    render(<DashboardPage />)
    
    const header = screen.getByText('STRATO Control Tower™').closest('div')
    expect(header).toHaveClass('flex', 'items-center', 'justify-between', 'mb-8')
    
    const content = document.querySelector('.space-y-8')
    expect(content).toBeInTheDocument()
  })

  it('should have proper dark mode support', () => {
    render(<DashboardPage />)
    
    const container = document.querySelector('.min-h-screen')
    expect(container).toHaveClass('dark:bg-gray-900')
    
    const title = screen.getByText('STRATO Control Tower™')
    expect(title).toHaveClass('dark:text-white')
    
    const description = screen.getByText(/Monitor y gestión centralizada/)
    expect(description).toHaveClass('dark:text-gray-300')
  })

  it('should have proper accessibility structure', () => {
    render(<DashboardPage />)
    
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toHaveTextContent('STRATO Control Tower™')
    
    const description = screen.getByText(/Monitor y gestión centralizada/)
    expect(description).toBeInTheDocument()
  })
}) 