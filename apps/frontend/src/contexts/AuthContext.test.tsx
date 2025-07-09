import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

import { AuthProvider, useAuth } from './AuthContext'

// Mock fetch
global.fetch = vi.fn()

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

  it('should provide initial state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('Loading...')
    expect(screen.getByTestId('user')).toHaveTextContent('No User')
    expect(screen.getByTestId('error')).toHaveTextContent('No Error')
  })

  it('should handle successful login', async () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
    const mockResponse = { token: 'mock-token', user: mockUser }
    
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

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
    expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
    })
  })

  it('should handle login failure', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
    } as Response)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

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
    // First trigger an error
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
    } as Response)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

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

    // Should start with loading true
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading...')

    // Should eventually set loading to false
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
    })
  })
}) 