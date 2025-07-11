import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  LoadingSpinner,
  Skeleton,
  OfflineIndicator,
  EmptyState,
  RetryButton,
  CircuitBreakerIndicator
} from '../components/ui/LoadingStates'

describe('LoadingSpinner', () => {
  it('should render with default props', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('w-8', 'h-8', 'text-blue-600')
  })

  it('should render with custom size', () => {
    render(<LoadingSpinner size="lg" />)
    
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toHaveClass('w-12', 'h-12')
  })

  it('should render with custom color', () => {
    render(<LoadingSpinner color="white" />)
    
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toHaveClass('text-white')
  })

  it('should render with text', () => {
    render(<LoadingSpinner text="Loading..." />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should have correct animation class', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toHaveClass('animate-spin')
  })
})

describe('Skeleton', () => {
  it('should render single skeleton with default props', () => {
    render(<Skeleton />)
    
    const skeleton = screen.getByRole('generic')
    expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'dark:bg-gray-700', 'rounded')
  })

  it('should render with custom className', () => {
    render(<Skeleton className="h-4 w-full" />)
    
    const skeleton = screen.getByRole('generic')
    expect(skeleton).toHaveClass('h-4', 'w-full')
  })

  it('should render multiple lines when specified', () => {
    render(<Skeleton lines={3} />)
    
    const skeletons = screen.getAllByRole('generic')
    expect(skeletons).toHaveLength(3)
  })

  it('should render single skeleton when lines is 1', () => {
    render(<Skeleton lines={1} />)
    
    const skeletons = screen.getAllByRole('generic')
    expect(skeletons).toHaveLength(1)
  })
})

describe('OfflineIndicator', () => {
  it('should render offline message', () => {
    render(<OfflineIndicator />)
    
    expect(screen.getByText('Sin conexión')).toBeInTheDocument()
    expect(screen.getByText('No se puede conectar al servidor. Algunas funciones pueden no estar disponibles.')).toBeInTheDocument()
  })

  it('should render retry button when onRetry is provided', () => {
    const onRetry = vi.fn()
    render(<OfflineIndicator onRetry={onRetry} />)
    
    const retryButton = screen.getByText('Reintentar conexión')
    expect(retryButton).toBeInTheDocument()
    
    fireEvent.click(retryButton)
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('should not render retry button when onRetry is not provided', () => {
    render(<OfflineIndicator />)
    
    expect(screen.queryByText('Reintentar conexión')).not.toBeInTheDocument()
  })

  it('should have correct styling classes', () => {
    render(<OfflineIndicator />)
    
    const container = screen.getByText('Sin conexión').closest('div')
    expect(container).toHaveClass('bg-yellow-50', 'dark:bg-yellow-900', 'border', 'border-yellow-200', 'dark:border-yellow-700')
  })
})

describe('EmptyState', () => {
  it('should render with title and description', () => {
    render(
      <EmptyState
        title="No data found"
        description="There are no items to display"
      />
    )
    
    expect(screen.getByText('No data found')).toBeInTheDocument()
    expect(screen.getByText('There are no items to display')).toBeInTheDocument()
  })

  it('should render with icon', () => {
    const icon = <div data-testid="test-icon">Icon</div>
    
    render(
      <EmptyState
        title="Test"
        description="Test description"
        icon={icon}
      />
    )
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('should render with action', () => {
    const action = <button data-testid="test-action">Action</button>
    
    render(
      <EmptyState
        title="Test"
        description="Test description"
        action={action}
      />
    )
    
    expect(screen.getByTestId('test-action')).toBeInTheDocument()
  })

  it('should render without icon and action', () => {
    render(
      <EmptyState
        title="Test"
        description="Test description"
      />
    )
    
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })
})

describe('RetryButton', () => {
  it('should render with default text', () => {
    const onRetry = vi.fn()
    render(<RetryButton onRetry={onRetry} />)
    
    expect(screen.getByText('Reintentar')).toBeInTheDocument()
  })

  it('should render with custom children', () => {
    const onRetry = vi.fn()
    render(<RetryButton onRetry={onRetry}>Custom Text</RetryButton>)
    
    expect(screen.getByText('Custom Text')).toBeInTheDocument()
  })

  it('should call onRetry when clicked', () => {
    const onRetry = vi.fn()
    render(<RetryButton onRetry={onRetry} />)
    
    fireEvent.click(screen.getByText('Reintentar'))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when loading', () => {
    const onRetry = vi.fn()
    render(<RetryButton onRetry={onRetry} loading={true} />)
    
    const button = screen.getByText('Reintentar')
    expect(button).toBeDisabled()
  })

  it('should show loading spinner when loading', () => {
    const onRetry = vi.fn()
    render(<RetryButton onRetry={onRetry} loading={true} />)
    
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('animate-spin')
  })

  it('should not call onRetry when disabled', () => {
    const onRetry = vi.fn()
    render(<RetryButton onRetry={onRetry} loading={true} />)
    
    fireEvent.click(screen.getByText('Reintentar'))
    expect(onRetry).not.toHaveBeenCalled()
  })
})

describe('CircuitBreakerIndicator', () => {
  const onRetry = vi.fn()

  beforeEach(() => {
    onRetry.mockClear()
  })

  it('should render closed state correctly', () => {
    render(
      <CircuitBreakerIndicator
        state="closed"
        retryCount={0}
        onRetry={onRetry}
      />
    )
    
    expect(screen.getByText('Sistema funcionando normalmente')).toBeInTheDocument()
    expect(screen.queryByText('Reintentar conexión')).not.toBeInTheDocument()
  })

  it('should render open state correctly', () => {
    render(
      <CircuitBreakerIndicator
        state="open"
        retryCount={3}
        onRetry={onRetry}
      />
    )
    
    expect(screen.getByText('Sistema temporalmente no disponible')).toBeInTheDocument()
    expect(screen.getByText('Reintentos: 3')).toBeInTheDocument()
    expect(screen.getByText('Reintentar conexión')).toBeInTheDocument()
  })

  it('should render half-open state correctly', () => {
    render(
      <CircuitBreakerIndicator
        state="half-open"
        retryCount={1}
        onRetry={onRetry}
      />
    )
    
    expect(screen.getByText('Probando conexión...')).toBeInTheDocument()
    expect(screen.getByText('Reintentos: 1')).toBeInTheDocument()
    expect(screen.queryByText('Reintentar conexión')).not.toBeInTheDocument()
  })

  it('should call onRetry when retry button is clicked in open state', () => {
    render(
      <CircuitBreakerIndicator
        state="open"
        retryCount={2}
        onRetry={onRetry}
      />
    )
    
    fireEvent.click(screen.getByText('Reintentar conexión'))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('should not show retry count when it is 0', () => {
    render(
      <CircuitBreakerIndicator
        state="closed"
        retryCount={0}
        onRetry={onRetry}
      />
    )
    
    expect(screen.queryByText('Reintentos: 0')).not.toBeInTheDocument()
  })

  it('should have correct styling for different states', () => {
    const { rerender } = render(
      <CircuitBreakerIndicator
        state="closed"
        retryCount={0}
        onRetry={onRetry}
      />
    )
    
    let container = screen.getByText('Sistema funcionando normalmente').closest('div')
    expect(container).toHaveClass('bg-green-50', 'dark:bg-green-900')

    rerender(
      <CircuitBreakerIndicator
        state="open"
        retryCount={1}
        onRetry={onRetry}
      />
    )
    
    container = screen.getByText('Sistema temporalmente no disponible').closest('div')
    expect(container).toHaveClass('bg-red-50', 'dark:bg-red-900')

    rerender(
      <CircuitBreakerIndicator
        state="half-open"
        retryCount={1}
        onRetry={onRetry}
      />
    )
    
    container = screen.getByText('Probando conexión...').closest('div')
    expect(container).toHaveClass('bg-yellow-50', 'dark:bg-yellow-900')
  })
}) 