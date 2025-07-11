import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ErrorBoundary, useErrorHandler, withErrorBoundary } from '@/components/ui/ErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>Normal component</div>
}

// Component that uses the error handler hook
const TestComponentWithHook = () => {
  const { error, handleError, clearError } = useErrorHandler()

  const triggerError = () => {
    handleError(new Error('Hook test error'))
  }

  return (
    <div>
      {error && <div data-testid="error-message">{error.message}</div>}
      <button onClick={triggerError} data-testid="trigger-error">
        Trigger Error
      </button>
      <button onClick={clearError} data-testid="clear-error">
        Clear Error
      </button>
    </div>
  )
}

describe('ErrorBoundary', () => {
  const originalConsoleError = console.error

  beforeEach(() => {
    console.error = vi.fn()
  })

  afterEach(() => {
    console.error = originalConsoleError
  })

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child component</div>
      </ErrorBoundary>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('should render error UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Algo salió mal')).toBeInTheDocument()
    expect(screen.getByText('Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.')).toBeInTheDocument()
    expect(screen.getByText('Reintentar')).toBeInTheDocument()
    expect(screen.getByText('Recargar página')).toBeInTheDocument()
  })

  it('should call onError callback when error occurs', () => {
    const onError = vi.fn()

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    )
  })

  it('should render custom fallback when provided', () => {
    const customFallback = <div data-testid="custom-fallback">Custom error UI</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
    expect(screen.queryByText('Algo salió mal')).not.toBeInTheDocument()
  })

  it('should reset error state when retry button is clicked', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Algo salió mal')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Reintentar'))

    // The error should be cleared and the component should re-render
    expect(screen.queryByText('Algo salió mal')).not.toBeInTheDocument()
  })

  it('should reset error state when resetKey changes', () => {
    const { rerender } = render(
      <ErrorBoundary resetKey="key1">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Algo salió mal')).toBeInTheDocument()

    rerender(
      <ErrorBoundary resetKey="key2">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Error should be reset due to resetKey change
    expect(screen.queryByText('Algo salió mal')).not.toBeInTheDocument()
  })

  it('should show error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Detalles del error (solo desarrollo)')).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('should not show error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Detalles del error (solo desarrollo)')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })
})

describe('useErrorHandler', () => {
  it('should handle errors correctly', () => {
    render(<TestComponentWithHook />)

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('trigger-error'))

    expect(screen.getByTestId('error-message')).toBeInTheDocument()
    expect(screen.getByText('Hook test error')).toBeInTheDocument()
  })

  it('should clear errors when clearError is called', () => {
    render(<TestComponentWithHook />)

    fireEvent.click(screen.getByTestId('trigger-error'))
    expect(screen.getByTestId('error-message')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('clear-error'))
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
  })
})

describe('withErrorBoundary HOC', () => {
  it('should wrap component with ErrorBoundary', () => {
    const WrappedComponent = withErrorBoundary(ThrowError)
    
    render(<WrappedComponent shouldThrow={true} />)

    expect(screen.getByText('Algo salió mal')).toBeInTheDocument()
  })

  it('should use custom fallback when provided', () => {
    const customFallback = <div data-testid="hoc-fallback">HOC Custom Error</div>
    const WrappedComponent = withErrorBoundary(ThrowError, customFallback)
    
    render(<WrappedComponent shouldThrow={true} />)

    expect(screen.getByTestId('hoc-fallback')).toBeInTheDocument()
  })

  it('should call onError callback when provided', () => {
    const onError = vi.fn()
    const WrappedComponent = withErrorBoundary(ThrowError, undefined, onError)
    
    render(<WrappedComponent shouldThrow={true} />)

    expect(onError).toHaveBeenCalled()
  })

  it('should preserve component display name', () => {
    const TestComponent = () => <div>Test</div>
    TestComponent.displayName = 'TestComponent'
    
    const WrappedComponent = withErrorBoundary(TestComponent)
    
    expect(WrappedComponent.displayName).toBe('withErrorBoundary(TestComponent)')
  })
}) 