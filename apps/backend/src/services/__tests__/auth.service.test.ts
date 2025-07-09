import { describe, it, expect, vi, beforeEach } from 'vitest'

import { authService } from '../auth.service.js'
import { ApiError } from '../../utils/ApiError.js'

// Mock Supabase
vi.mock('../../lib/supabase.js', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
    },
  },
}))

// Import mocked supabase
import { supabase } from '../../lib/supabase.js'

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('signUp', () => {
    it('should sign up user successfully', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      }

      const mockUser = {
        user: { id: '1', email: 'test@example.com' },
        session: { access_token: 'token123' },
      }

      vi.mocked(supabase.auth.signUp).mockResolvedValue({
        data: mockUser,
        error: null,
      } as any)

      const result = await authService.signUp(credentials)

      expect(result).toEqual(mockUser)
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: credentials.email,
        password: credentials.password,
      })
    })

    it('should throw error on signup failure', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      }

      const mockError = new Error('Email already exists')
      vi.mocked(supabase.auth.signUp).mockResolvedValue({
        data: null,
        error: mockError,
      } as any)

      await expect(authService.signUp(credentials)).rejects.toThrow('Email already exists')
    })
  })

  describe('signIn', () => {
    it('should sign in user successfully', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      }

      const mockUser = {
        user: { id: '1', email: 'test@example.com' },
        session: { access_token: 'token123' },
      }

      vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
        data: mockUser,
        error: null,
      } as any)

      const result = await authService.signIn(credentials)

      expect(result).toEqual(mockUser)
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: credentials.email,
        password: credentials.password,
      })
    })

    it('should throw ApiError for invalid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'wrongpassword',
      }

      const mockError = new Error('Invalid login credentials')
      vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
        data: null,
        error: mockError,
      } as any)

      await expect(authService.signIn(credentials)).rejects.toThrow(ApiError)
      await expect(authService.signIn(credentials)).rejects.toThrow('Invalid login credentials')
    })

    it('should throw ApiError when no session is returned', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      }

      vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
        data: { user: { id: '1' }, session: null },
        error: null,
      } as any)

      await expect(authService.signIn(credentials)).rejects.toThrow(ApiError)
      await expect(authService.signIn(credentials)).rejects.toThrow('Could not sign in')
    })
  })

  describe('signOut', () => {
    it('should sign out user successfully', async () => {
      const token = 'valid-token'

      vi.mocked(supabase.auth.signOut).mockResolvedValue({
        error: null,
      } as any)

      await expect(authService.signOut(token)).resolves.not.toThrow()
      expect(supabase.auth.signOut).toHaveBeenCalled()
    })

    it('should throw error on signout failure', async () => {
      const token = 'valid-token'

      const mockError = new Error('Signout failed')
      vi.mocked(supabase.auth.signOut).mockResolvedValue({
        error: mockError,
      } as any)

      await expect(authService.signOut(token)).rejects.toThrow('Signout failed')
    })
  })

  describe('verifyToken', () => {
    it('should verify valid token successfully', async () => {
      const token = 'valid-token'

      const mockUser = {
        user: { id: '1', email: 'test@example.com' },
      }

      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: mockUser,
        error: null,
      } as any)

      const result = await authService.verifyToken(token)

      expect(result).toEqual(mockUser)
      expect(supabase.auth.getUser).toHaveBeenCalledWith(token)
    })

    it('should return null for invalid token', async () => {
      const token = 'invalid-token'

      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: null,
        error: new Error('Invalid token'),
      } as any)

      const result = await authService.verifyToken(token)

      expect(result).toBeNull()
    })
  })

  describe('error handling', () => {
    it('should handle network errors gracefully', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      }

      vi.mocked(supabase.auth.signInWithPassword).mockRejectedValue(new Error('Network timeout'))

      await expect(authService.signIn(credentials)).rejects.toThrow('Network timeout')
    })
  })
}) 