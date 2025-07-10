import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

import { AuthProvider, useAuth } from './AuthContext'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Test component to use the context
const TestComponent = () => {
  const { user, loading, error, login, logout, clearError } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading...' : 'Not Loading'}</div>
      <div data-testid="user">{user ? user.email : 'No User'}</div>
      <div data-testid="error">{error || 'No Error'}</div>
      <button onClick={() => login({ email: 'test@example.com', password: 'password' })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
      <button onClick={clearError}>Clear Error</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('should provide initial state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Check that component renders properly
    expect(screen.getByTestId('user')).toHaveTextContent('No User')
    expect(screen.getByTestId('error')).toHaveTextContent('No Error')

    // Wait for auth check to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
    })
  })

  it('should handle successful login', async () => {
    // Mock successful fetch response
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'mock-token',
        user: { id: '1', email: 'test@example.com', name: 'Test User' }
      })
    } as Response)
    global.fetch = mockFetch

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loginButton = screen.getByText('Login')
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com')
    })

    expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', 'mock-token')
  })

  it('should handle login failure', async () => {
    // Mock fetch to return failure
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    } as Response)
    global.fetch = mockFetch

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Wait for initial loading to finish
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
    })

    const loginButton = screen.getByText('Login')
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Login failed')
    })
  })

  it('should handle logout', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const logoutButton = screen.getByText('Logout')
    await userEvent.click(logoutButton)

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_token')
    expect(screen.getByTestId('user')).toHaveTextContent('No User')
  })

  it('should clear error', async () => {
    // Mock fetch to return failure first
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    } as Response)
    global.fetch = mockFetch

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Wait for initial loading to finish
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
    })

    const loginButton = screen.getByText('Login')
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Login failed')
    })

    // Then clear the error
    const clearErrorButton = screen.getByText('Clear Error')
    await userEvent.click(clearErrorButton)

    expect(screen.getByTestId('error')).toHaveTextContent('No Error')
  })

  it('should throw error when useAuth is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuth must be used within an AuthProvider')

    consoleSpy.mockRestore()
  })

  it('should handle existing token on mount', async () => {
    localStorageMock.getItem.mockReturnValue('existing-token')

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Eventually loading should be false (auth check completed)
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
    })

    // Should not have a user since we don't mock token verification
    expect(screen.getByTestId('user')).toHaveTextContent('No User')
  })
}) 