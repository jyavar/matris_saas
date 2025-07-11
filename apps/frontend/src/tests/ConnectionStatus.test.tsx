import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConnectionStatus } from '../components/ui/ConnectionStatus'

describe('ConnectionStatus Component', () => {
  const mockOnRetry = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Connected State', () => {
    it('should not render when connected and no errors', () => {
      const { container } = render(
        <ConnectionStatus
          isConnected={true}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
        />
      )

      expect(container.firstChild).toBeNull()
    })

    it('should show connected message when explicitly requested', () => {
      render(
        <ConnectionStatus
          isConnected={true}
          isLoading={false}
          error="Some error"
          onRetry={mockOnRetry}
        />
      )

      expect(screen.getByText('Connected')).toBeInTheDocument()
      expect(screen.getByText('Successfully connected to STRATO backend.')).toBeInTheDocument()
    })
  })

  describe('Disconnected State', () => {
    it('should show disconnection warning when not connected', () => {
      render(
        <ConnectionStatus
          isConnected={false}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
        />
      )

      expect(screen.getByText('Backend Connection Lost')).toBeInTheDocument()
      expect(screen.getByText('Cannot connect to STRATO backend. Some features may be unavailable.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
    })

    it('should call onRetry when retry button is clicked', () => {
      render(
        <ConnectionStatus
          isConnected={false}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
        />
      )

      const retryButton = screen.getByRole('button', { name: /retry/i })
      fireEvent.click(retryButton)

      expect(mockOnRetry).toHaveBeenCalledTimes(1)
    })

    it('should disable retry button when loading', () => {
      render(
        <ConnectionStatus
          isConnected={false}
          isLoading={true}
          error={null}
          onRetry={mockOnRetry}
        />
      )

      const retryButton = screen.getByRole('button', { name: /retry/i })
      expect(retryButton).toBeDisabled()
    })

    it('should show loading spinner in retry button when loading', () => {
      render(
        <ConnectionStatus
          isConnected={false}
          isLoading={true}
          error={null}
          onRetry={mockOnRetry}
        />
      )

      const retryButton = screen.getByRole('button', { name: /retry/i })
      expect(retryButton).toBeDisabled()
      
      // Check for loading spinner (RefreshCw with animate-spin class)
      const spinner = retryButton.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('should show error message when error is provided', () => {
      const errorMessage = 'Network connection failed'
      render(
        <ConnectionStatus
          isConnected={true}
          isLoading={false}
          error={errorMessage}
          onRetry={mockOnRetry}
        />
      )

      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('should show both disconnection and error when both conditions are true', () => {
      const errorMessage = 'Server error occurred'
      render(
        <ConnectionStatus
          isConnected={false}
          isLoading={false}
          error={errorMessage}
          onRetry={mockOnRetry}
        />
      )

      // Should show disconnection warning
      expect(screen.getByText('Backend Connection Lost')).toBeInTheDocument()
      
      // Should show error message
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
      
      // Should show retry button
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <ConnectionStatus
          isConnected={false}
          isLoading={false}
          error="Test error"
          onRetry={mockOnRetry}
        />
      )

      const retryButton = screen.getByRole('button', { name: /retry/i })
      expect(retryButton).toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      render(
        <ConnectionStatus
          isConnected={false}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
        />
      )

      const retryButton = screen.getByRole('button', { name: /retry/i })
      
      // Test keyboard navigation
      retryButton.focus()
      expect(retryButton).toHaveFocus()
      
      // Test Enter key
      fireEvent.keyDown(retryButton, { key: 'Enter', code: 'Enter' })
      expect(mockOnRetry).toHaveBeenCalledTimes(1)
    })
  })

  describe('Styling and Layout', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <ConnectionStatus
          isConnected={false}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
          className="custom-class"
        />
      )

      const statusContainer = container.firstChild as HTMLElement
      expect(statusContainer).toHaveClass('custom-class')
    })

    it('should have proper dark mode classes', () => {
      const { container } = render(
        <ConnectionStatus
          isConnected={false}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
        />
      )

      const statusContainer = container.firstChild as HTMLElement
      expect(statusContainer).toHaveClass('dark:bg-gray-800')
    })
  })

  describe('Icon Rendering', () => {
    it('should show WifiOff icon when disconnected', () => {
      render(
        <ConnectionStatus
          isConnected={false}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
        />
      )

      // Check for WifiOff icon (Lucide React icon)
      const wifiOffIcon = document.querySelector('[data-lucide="wifi-off"]')
      expect(wifiOffIcon).toBeInTheDocument()
    })

    it('should show Wifi icon when connected', () => {
      render(
        <ConnectionStatus
          isConnected={true}
          isLoading={false}
          error="Some error"
          onRetry={mockOnRetry}
        />
      )

      // Check for Wifi icon (Lucide React icon)
      const wifiIcon = document.querySelector('[data-lucide="wifi"]')
      expect(wifiIcon).toBeInTheDocument()
    })

    it('should show AlertTriangle icon when error is present', () => {
      render(
        <ConnectionStatus
          isConnected={true}
          isLoading={false}
          error="Test error"
          onRetry={mockOnRetry}
        />
      )

      // Check for AlertTriangle icon (Lucide React icon)
      const alertIcon = document.querySelector('[data-lucide="alert-triangle"]')
      expect(alertIcon).toBeInTheDocument()
    })
  })
}) 