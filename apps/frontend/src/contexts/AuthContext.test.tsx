import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

import { AuthProvider, useAuth } from './AuthContext'

// Mock the entire supabase module
vi.mock('@/lib/supabase', () => ({
  signInWithEmail: vi.fn(),
  signUpWithEmail: vi.fn(),
  signOut: vi.fn(),
  getCurrentUser: vi.fn(),
  getCurrentSession: vi.fn(),
}))

// Import the mocked functions
import {
  signInWithEmail,
  signUpWithEmail,
  signOut,
  getCurrentUser,
  getCurrentSession,
} from '@/lib/supabase'

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
    // Default mocks
    vi.mocked(getCurrentSession).mockResolvedValue(null)
    vi.mocked(getCurrentUser).mockResolvedValue(null)
    vi.mocked(signOut).mockResolvedValue({ error: null })
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
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_metadata: {
        name: 'Test User',
        avatar_url: '',
      },
    }

    const mockSession = {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
    }

    vi.mocked(signInWithEmail).mockResolvedValue({
      data: {
        user: mockUser,
        session: mockSession,
      },
      error: null,
    })

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
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com')
    })

    expect(signInWithEmail).toHaveBeenCalledWith('test@example.com', 'password')
  })

  it('should handle login failure', async () => {
    vi.mocked(signInWithEmail).mockResolvedValue({
      data: {
        user: null,
        session: null,
      },
      error: {
        message: 'Invalid credentials',
      },
    })

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
      expect(screen.getByTestId('error')).toHaveTextContent('Invalid credentials')
    })
  })

  it('should handle logout', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Wait for initial loading to finish
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
    })

    const logoutButton = screen.getByText('Logout')
    await userEvent.click(logoutButton)

    expect(signOut).toHaveBeenCalled()
    expect(screen.getByTestId('user')).toHaveTextContent('No User')
  })

  it('should clear error', async () => {
    // Mock login failure first
    vi.mocked(signInWithEmail).mockResolvedValue({
      data: {
        user: null,
        session: null,
      },
      error: {
        message: 'Login failed',
      },
    })

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

  it('should handle existing session on mount', async () => {
    const mockUser = {
      id: '1',
      email: 'existing@example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_metadata: {
        name: 'Existing User',
        avatar_url: '',
      },
    }

    const mockSession = {
      access_token: 'existing-token',
      refresh_token: 'existing-refresh',
    }

    vi.mocked(getCurrentSession).mockResolvedValue(mockSession)
    vi.mocked(getCurrentUser).mockResolvedValue(mockUser)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Should load user from existing session
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('existing@example.com')
    })

    expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
  })

  it('should handle logout error gracefully', async () => {
    vi.mocked(signOut).mockResolvedValue({
      error: {
        message: 'Logout failed',
      },
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Wait for initial loading to finish
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
    })

    const logoutButton = screen.getByText('Logout')
    await userEvent.click(logoutButton)

    // Should still logout locally even if server logout fails
    expect(screen.getByTestId('user')).toHaveTextContent('No User')
    expect(signOut).toHaveBeenCalled()
  })
}) 