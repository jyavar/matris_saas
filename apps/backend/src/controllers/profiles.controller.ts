import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { logAction } from '../services/logger.service.js'
import { type ProfileDTO,profilesService } from '../services/profiles.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { sendSuccess, sendValidationError } from '../utils/response.helper.js'
const updateProfileSchema = z.object({
  username: z.string().min(1, 'Username is required').optional(),
  full_name: z.string().min(1, 'Full name is required').optional(),
  avatar_url: z.string().url('Avatar must be a valid URL').optional(),
})

const createProfileSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  display_name: z.string().min(1, 'Display name is required').optional(),
  bio: z.string().optional(),
})

export const profilesController = {
  /**
   * Get current user profile
   */
  async getMe(
    _req: IncomingMessage,
    res: ServerResponse,
    user?: AuthenticatedUser,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!_user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'User not authenticated',
          }),
        )
        return
      }

      const profile = await profilesService.getProfileById(
        _user?.id,
        user?.tenant_id || 'default',
      )

      if (!profile) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'Profile not found',
          }),
        )
        return
      }

      logAction('profile_requested', _user?.id, {})

      return sendSuccess(res, profile)
    } catch (error) {
      logAction('profile_request_error', _user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get all profiles (admin only)
   */
  async getAllProfiles(
    _req: IncomingMessage,
    res: ServerResponse,
    user?: AuthenticatedUser,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!_user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'User not authenticated',
          }),
        )
        return
      }

      // TODO: Add admin check
      const profiles = await profilesService.getAllProfiles(
        user?.tenant_id || 'default',
      )

      logAction('profiles_requested', _user?.id, {
        count: profiles.length,
      })

      return sendSuccess(res, {})
    } catch (error) {
      logAction('profiles_request_error', _user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get profile by ID
   */
  async getProfileById(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'Profile ID is required',
          }),
        )
        return
      }

      if (!_user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'User not authenticated',
          }),
        )
        return
      }

      const profile = await profilesService.getProfileById(
        id,
        _user?.tenant_id || 'default',
      )

      if (!profile) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'Profile not found',
          }),
        )
        return
      }

      logAction('profile_by_id_requested', _user?.id, {
        targetProfileId: id,
      })

      return sendSuccess(res, profile)
    } catch (error) {
      logAction('profile_by_id_error', _user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Update current user profile
   */
  async updateProfile(
    _req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
    user?: AuthenticatedUser,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!_user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'User not authenticated',
          }),
        )
        return
      }

      const validatedData = updateProfileSchema.parse(_body)
      const profile = await profilesService.updateProfile(
        _user?.id,
        user?.tenant_id || 'default',
        validatedData,
      )

      logAction('profile_updated', _user?.id, {
        updates: validatedData,
      })

      return sendSuccess(res, profile)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid profile data')
      } else {
        logAction('profile_update_error', _user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Delete profile (admin only)
   */
  async deleteProfile(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'Profile ID is required',
          }),
        )
        return
      }

      if (!_user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'User not authenticated',
          }),
        )
        return
      }

      // TODO: Add admin check
      await profilesService.deleteProfile(id, _user?.tenant_id || 'default')

      logAction('profile_deleted', _user?.id, {
        targetProfileId: id,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: true,
          message: 'Profile deleted successfully',
        }),
      )
    } catch (error) {
      logAction('profile_delete_error', _user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Create new profile
   */
  async createProfile(
    _req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
    user?: AuthenticatedUser,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!_user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'User not authenticated',
          }),
        )
        return
      }

      const validatedData = createProfileSchema.parse(_body)
      const profileData: ProfileDTO = {
        id: `profile-${Date.now()}`,
        username: validatedData.username,
        full_name: validatedData.display_name,
        tenant_id: user?.tenant_id || 'default',
        email: _user?.email || '',
      }
      const profile = await profilesService.createProfile(profileData)

      logAction('profile_created', _user?.id, {
        username: validatedData.username,
      })

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: true,
          data: profile,
        }),
      )
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid profile data')
      } else {
        logAction('profile_create_error', _user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Search profiles
   */
  async searchProfiles(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!_user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'User not authenticated',
          }),
        )
        return
      }

      const profiles = await profilesService.getAllProfiles(
        _user?.tenant_id || 'default',
      )

      logAction('profiles_searched', _user?.id, {
        count: profiles.length,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: true,
          data: profiles,
        }),
      )
    } catch (error) {
      logAction('profiles_search_error', _user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get profile (alias for getProfileById)
   */
  async getProfile(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    user?: AuthenticatedUser,
  ): Promise<void> {
    return this.getProfileById(req, res, params, user)
  },
}
