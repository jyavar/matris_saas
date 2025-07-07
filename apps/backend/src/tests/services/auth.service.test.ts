import { createClient } from '@supabase/supabase-js'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock del servicio de autenticación
const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
  },
}

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabase),
}))

// Simular el servicio de autenticación
class AuthService {
  private supabase = createClient('https://test.supabase.co', 'test-key')

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }

    return { success: true }
  }
}

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    vi.clearAllMocks()
    authService = new AuthService()
  })

  describe('signIn', () => {
    it('should sign in user successfully with valid credentials', async () => {
      // Arrange
      const mockUser = { id: 'user-123', email: 'test@example.com' }
      const mockSession = { access_token: 'token-123' }

      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      })

      // Act
      const result = await authService.signIn('test@example.com', 'password123')

      // Assert
      expect(result.user).toEqual(mockUser)
      expect(result.session).toEqual(mockSession)
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })

    it('should throw error when sign in fails', async () => {
      // Arrange
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Invalid credentials' },
      })

      // Act & Assert
      await expect(
        authService.signIn('test@example.com', 'wrong-password'),
      ).rejects.toThrow('Invalid credentials')
    })

    it('should handle empty email and password', async () => {
      // Arrange
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Email and password are required' },
      })

      // Act & Assert
      await expect(authService.signIn('', '')).rejects.toThrow(
        'Email and password are required',
      )
    })
  })

  describe('signUp', () => {
    it('should sign up user successfully with valid data', async () => {
      // Arrange
      const mockUser = { id: 'user-123', email: 'new@example.com' }
      const mockSession = { access_token: 'token-123' }

      mockSupabase.auth.signUp.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      })

      // Act
      const result = await authService.signUp('new@example.com', 'password123')

      // Assert
      expect(result.user).toEqual(mockUser)
      expect(result.session).toEqual(mockSession)
      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123',
      })
    })

    it('should throw error when sign up fails', async () => {
      // Arrange
      mockSupabase.auth.signUp.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'User already exists' },
      })

      // Act & Assert
      await expect(
        authService.signUp('existing@example.com', 'password123'),
      ).rejects.toThrow('User already exists')
    })
  })

  describe('signOut', () => {
    it('should sign out user successfully', async () => {
      // Arrange
      mockSupabase.auth.signOut.mockResolvedValue({
        error: null,
      })

      // Act
      const result = await authService.signOut()

      // Assert
      expect(result).toEqual({ success: true })
      expect(mockSupabase.auth.signOut).toHaveBeenCalled()
    })

    it('should throw error when sign out fails', async () => {
      // Arrange
      mockSupabase.auth.signOut.mockResolvedValue({
        error: { message: 'Sign out failed' },
      })

      // Act & Assert
      await expect(authService.signOut()).rejects.toThrow('Sign out failed')
    })
  })
})
