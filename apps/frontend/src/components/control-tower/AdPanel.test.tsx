import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

import AdPanel from './AdPanel'

const mockAlerts = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'Test Warning',
    message: 'This is a test warning',
    timestamp: new Date('2023-10-15T10:30:00Z')
  },
  {
    id: '2',
    type: 'error' as const,
    title: 'Test Error',
    message: 'This is a test error',
    timestamp: new Date('2023-10-15T10:25:00Z')
  }
]

const mockAgents = [
  {
    id: '1',
    name: 'Test Agent Active',
    status: 'active' as const,
    lastActivity: new Date('2023-10-15T10:30:00Z'),
    tasksCompleted: 100
  },
  {
    id: '2',
    name: 'Test Agent Error',
    status: 'error' as const,
    lastActivity: new Date('2023-10-15T10:00:00Z'),
    tasksCompleted: 50
  }
]

describe('AdPanel Component', () => {
  it('should render alerts panel with correct title', () => {
    render(<AdPanel alerts={mockAlerts} />)
    
    expect(screen.getByText('Alertas del Sistema')).toBeInTheDocument()
    expect(screen.getByText('2 activas')).toBeInTheDocument()
  })

  it('should render agent status panel with correct title', () => {
    render(<AdPanel agentStatuses={mockAgents} />)
    
    expect(screen.getByText('Estado de Agentes')).toBeInTheDocument()
    expect(screen.getByText('1 activos')).toBeInTheDocument()
  })

  it('should render empty state when no alerts provided', () => {
    render(<AdPanel alerts={[]} />)
    
    expect(screen.getByText('No hay alertas activas')).toBeInTheDocument()
    expect(screen.getByText('✅')).toBeInTheDocument()
  })

  it('should render empty state when no agents provided', () => {
    render(<AdPanel agentStatuses={[]} />)
    
    expect(screen.getByText('No hay agentes configurados')).toBeInTheDocument()
    expect(screen.getByText('🤖')).toBeInTheDocument()
  })

  it('should render default empty state when no props provided', () => {
    render(<AdPanel />)
    
    expect(screen.getByText('No hay alertas activas')).toBeInTheDocument()
    expect(screen.getByText('No hay agentes configurados')).toBeInTheDocument()
  })

  it('should display alert information correctly', () => {
    render(<AdPanel alerts={mockAlerts} />)
    
    expect(screen.getByText('Test Warning')).toBeInTheDocument()
    expect(screen.getByText('This is a test warning')).toBeInTheDocument()
    expect(screen.getByText('Test Error')).toBeInTheDocument()
    expect(screen.getByText('This is a test error')).toBeInTheDocument()
  })

  it('should display agent information correctly', () => {
    render(<AdPanel agentStatuses={mockAgents} />)
    
    expect(screen.getByText('Test Agent Active')).toBeInTheDocument()
    expect(screen.getByText('Test Agent Error')).toBeInTheDocument()
    expect(screen.getByText('100 tareas')).toBeInTheDocument()
    expect(screen.getByText('50 tareas')).toBeInTheDocument()
  })

  it('should show dismiss button for alerts when onAlertDismiss is provided', () => {
    const handleDismiss = vi.fn()
    render(<AdPanel alerts={mockAlerts} onAlertDismiss={handleDismiss} />)
    
    const dismissButtons = screen.getAllByLabelText('Descartar alerta')
    expect(dismissButtons).toHaveLength(2)
  })

  it('should call onAlertDismiss when dismiss button is clicked', async () => {
    const handleDismiss = vi.fn()
    render(<AdPanel alerts={mockAlerts} onAlertDismiss={handleDismiss} />)
    
    const dismissButton = screen.getAllByLabelText('Descartar alerta')[0]
    await userEvent.click(dismissButton)
    
    expect(handleDismiss).toHaveBeenCalledWith('1')
  })

  it('should show restart button for error agents when onAgentRestart is provided', () => {
    const handleRestart = vi.fn()
    render(<AdPanel agentStatuses={mockAgents} onAgentRestart={handleRestart} />)
    
    expect(screen.getByText('Reiniciar')).toBeInTheDocument()
  })

  it('should call onAgentRestart when restart button is clicked', async () => {
    const handleRestart = vi.fn()
    render(<AdPanel agentStatuses={mockAgents} onAgentRestart={handleRestart} />)
    
    const restartButton = screen.getByText('Reiniciar')
    await userEvent.click(restartButton)
    
    expect(handleRestart).toHaveBeenCalledWith('2')
  })

  it('should not show restart button for non-error agents', () => {
    const handleRestart = vi.fn()
    const activeAgents = [mockAgents[0]] // Only active agent
    render(<AdPanel agentStatuses={activeAgents} onAgentRestart={handleRestart} />)
    
    expect(screen.queryByText('Reiniciar')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<AdPanel className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('should render with correct alert type styles', () => {
    render(<AdPanel alerts={mockAlerts} />)
    
    const warningAlert = screen.getByText('Test Warning').closest('.border-yellow-500')
    const errorAlert = screen.getByText('Test Error').closest('.border-red-500')
    
    expect(warningAlert).toBeInTheDocument()
    expect(errorAlert).toBeInTheDocument()
  })

  it('should render with correct agent status styles', () => {
    render(<AdPanel agentStatuses={mockAgents} />)
    
    const activeStatusDot = screen.getByLabelText('Estado: active')
    const errorStatusDot = screen.getByLabelText('Estado: error')
    
    expect(activeStatusDot).toHaveClass('text-green-600')
    expect(errorStatusDot).toHaveClass('text-red-600')
  })
})