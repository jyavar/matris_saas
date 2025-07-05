import { IncomingMessage, ServerResponse } from 'http'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { profilesController } from '../controllers/profiles.controller'

// Mock dependencies
vi.mock('../services/profiles.service', () => ({
  profilesService: {
    getProfile: vi.fn().mockResolvedValue({
      id: 'profile-1',
      user_id: 'user-1',
      username: 'testuser',
      display_name: 'Test User',
      bio: 'Test bio',
      avatar_url: null,
      created_at: new Date().toISOString(),
    }),
    updateProfile: vi.fn().mockResolvedValue({
      id: 'profile-1',
      user_id: 'user-1',
      username: 'updateduser',
      display_name: 'Updated User',
      bio: 'Updated bio',
      avatar_url: 'https://example.com/avatar.jpg',
      created_at: new Date().toISOString(),
    }),
    createProfile: vi.fn().mockResolvedValue({
      id: 'profile-new',
      user_id: 'user-1',
      username: 'newuser',
      display_name: 'New User',
      bio: null,
      avatar_url: null,
      created_at: new Date().toISOString(),
    }),
    deleteProfile: vi.fn().mockResolvedValue(true),
    searchProfiles: vi.fn().mockResolvedValue([
      {
        id: 'profile-1',
        username: 'testuser',
        display_name: 'Test User',
      },
      {
        id: 'profile-2',
        username: 'anotheruser',
        display_name: 'Another User',
      },
    ]),
  },
}))

vi.mock('../services/logger.service', () => ({
  logAction: vi.fn(),
}))

vi.mock('../utils/response.helper', () => ({
  sendError: vi.fn((res: ServerResponse, message: string, status: number) => {
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: message }))
  }),
  sendSuccess: vi.fn((res: ServerResponse, data: unknown, message?: string) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true, data, message }))
  }),
}))

describe('Profiles Controller', () => {
  let mockReq: Partial<IncomingMessage>
  let mockRes: Partial<ServerResponse>
  let writeHeadSpy: ReturnType<typeof vi.fn>
  let endSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    writeHeadSpy = vi.fn()
    endSpy = vi.fn()

    mockReq = {
      method: 'GET',
      url: '/api/profiles/profile-1',
      headers: {
        'content-type': 'application/json',
      },
    }

    mockRes = {
      writeHead: writeHeadSpy,
      end: endSpy,
    }

    vi.clearAllMocks()
  })

  describe('getProfile', () => {
    it('should return user profile', async () => {
      await profilesController.getProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('id', 'profile-1')
      expect(response.data).toHaveProperty('username', 'testuser')
      expect(response.data).toHaveProperty('display_name', 'Test User')
    })

    it('should handle missing profile ID', async () => {
      await profilesController.getProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })

    it('should handle request without user authentication', async () => {
      await profilesController.getProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        {},
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('updateProfile', () => {
    it('should update profile successfully', async () => {
      const updateData = {
        username: 'updateduser',
        display_name: 'Updated User',
        bio: 'Updated bio',
        avatar_url: 'https://example.com/avatar.jpg',
      }

      await profilesController.updateProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        updateData,
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('username', 'updateduser')
      expect(response.data).toHaveProperty('display_name', 'Updated User')
      expect(response.data).toHaveProperty(
        'avatar_url',
        'https://example.com/avatar.jpg',
      )
    })

    it('should handle partial profile updates', async () => {
      const updateData = {
        bio: 'Just updating bio',
      }

      await profilesController.updateProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        updateData,
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })

    it('should handle update without profile ID', async () => {
      await profilesController.updateProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        { username: 'newusername' },
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('createProfile', () => {
    it('should create new profile', async () => {
      const profileData = {
        username: 'newuser',
        display_name: 'New User',
        bio: 'New user bio',
      }

      await profilesController.createProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        profileData,
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('id', 'profile-new')
      expect(response.data).toHaveProperty('username', 'newuser')
      expect(response.data).toHaveProperty('user_id', 'user-1')
    })

    it('should handle create profile without body', async () => {
      await profilesController.createProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })

    it('should handle create profile without user', async () => {
      await profilesController.createProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        { username: 'newuser' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('deleteProfile', () => {
    it('should delete profile successfully', async () => {
      await profilesController.deleteProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.message).toContain('deleted')
    })

    it('should handle delete without profile ID', async () => {
      await profilesController.deleteProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('searchProfiles', () => {
    it('should search profiles successfully', async () => {
      await profilesController.searchProfiles(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(Array.isArray(response.data)).toBe(true)
      expect(response.data).toHaveLength(2)
      expect(response.data[0]).toHaveProperty('username', 'testuser')
      expect(response.data[1]).toHaveProperty('username', 'anotheruser')
    })

    it('should handle search without user authentication', async () => {
      await profilesController.searchProfiles(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle service errors gracefully', async () => {
      const { profilesService } = await import('../services/profiles.service')
      vi.mocked(profilesService.getProfile).mockRejectedValueOnce(
        new Error('Database connection failed'),
      )

      await profilesController.getProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(500, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toContain('Failed')
    })

    it('should handle invalid profile data', async () => {
      const invalidData = {
        username: '', // Invalid empty username
        display_name: 'a'.repeat(300), // Too long display name
      }

      await profilesController.updateProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        invalidData,
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('Response Format Validation', () => {
    it('should return consistent response format', async () => {
      await profilesController.getProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(endSpy).toHaveBeenCalledWith(
        expect.stringMatching(/"success":\s*true/),
      )
      expect(endSpy).toHaveBeenCalledWith(expect.stringMatching(/"data":\s*{/))
    })

    it('should return valid JSON responses', async () => {
      await profilesController.searchProfiles(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      const responseCall = endSpy.mock.calls[0]?.[0]
      expect(() => JSON.parse(responseCall)).not.toThrow()
    })
  })
})
