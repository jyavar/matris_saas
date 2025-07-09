import { IncomingMessage, ServerResponse } from 'http'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { profilesController } from '../controllers/profiles.controller'

// Mock dependencies
vi.mock('../services/profiles.service', () => ({
  profilesService: {
    getProfileById: vi.fn(),
    updateProfile: vi.fn(),
    createProfile: vi.fn(),
    deleteProfile: vi.fn(),
    getAllProfiles: vi.fn(),
  },
}))

vi.mock('../services/logger.service', () => ({
  logAction: vi.fn(),
}))

vi.mock('../utils/response.helper', () => ({
  sendSuccess: vi.fn(),
  sendValidationError: vi.fn(),
}))

describe('Profiles Controller - Simple Tests', () => {
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
      writeHead: writeHeadSpy as ServerResponse['writeHead'],
      end: endSpy as ServerResponse['end'],
    }

    vi.clearAllMocks()
  })

  describe('Authentication Tests', () => {
    it('should return 401 when user is not authenticated for getProfileById', async () => {
      await profilesController.getProfileById(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        undefined,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(401, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toBe('User not authenticated')
    })

    it('should return 401 when user is not authenticated for updateProfile', async () => {
      await profilesController.updateProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { username: 'test' },
        undefined,
        undefined,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(401, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toBe('User not authenticated')
    })

    it('should return 401 when user is not authenticated for createProfile', async () => {
      await profilesController.createProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { username: 'test' },
        undefined,
        undefined,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(401, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toBe('User not authenticated')
    })

    it('should return 401 when user is not authenticated for deleteProfile', async () => {
      await profilesController.deleteProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        undefined,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(401, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toBe('User not authenticated')
    })

    it('should return 401 when user is not authenticated for searchProfiles', async () => {
      await profilesController.searchProfiles(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        undefined,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(401, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toBe('User not authenticated')
    })
  })

  describe('Validation Tests', () => {
    it('should return 400 when profile ID is missing for getProfileById', async () => {
      const authenticatedUser = { id: 'user-1', email: 'test@example.com' }

      await profilesController.getProfileById(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        authenticatedUser,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(400, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toBe('Profile ID is required')
    })

    it('should return 400 when profile ID is missing for deleteProfile', async () => {
      const authenticatedUser = { id: 'user-1', email: 'test@example.com' }

      await profilesController.deleteProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        authenticatedUser,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(400, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toBe('Profile ID is required')
    })
  })

  describe('Method Alias Test', () => {
    it('should call getProfileById when getProfile is called', async () => {
      const authenticatedUser = { id: 'user-1', email: 'test@example.com' }
      const getProfileByIdSpy = vi.spyOn(profilesController, 'getProfileById')

      await profilesController.getProfile(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'profile-1' },
        authenticatedUser,
      )

      expect(getProfileByIdSpy).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        { id: 'profile-1' },
        authenticatedUser,
      )
    })
  })
}) 