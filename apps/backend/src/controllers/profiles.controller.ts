import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { profilesService } from '../services/profiles.service.js'
import { logAction } from '../services/logger.service.js'

const updateProfileSchema = z.object({
  username: z.string().min(1, 'Username is required').optional(),
  full_name: z.string().min(1, 'Full name is required').optional(),
  avatar_url: z.string().url('Avatar must be a valid URL').optional(),
})

export const profilesController = {
  /**
   * Get current user profile
   */
  async getMe(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: any,
    user?: any,
  ): Promise<void> {
    try {
      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const profile = await profilesService.getProfileById(user.id, user.tenant_id || 'default')

      if (!profile) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Profile not found',
        }))
        return
      }

      logAction('profile_requested', user.id, {})

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: profile,
      }))
    } catch (error) {
      logAction('profile_request_error', user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get all profiles (admin only)
   */
  async getAllProfiles(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: any,
    user?: any,
  ): Promise<void> {
    try {
      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      // TODO: Add admin check
      const profiles = await profilesService.getAllProfiles(user.tenant_id || 'default')

      logAction('profiles_requested', user.id, {
        count: profiles.length,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: profiles,
        count: profiles.length,
      }))
    } catch (error) {
      logAction('profiles_request_error', user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get profile by ID
   */
  async getProfileById(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: any,
    user?: any,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Profile ID is required',
        }))
        return
      }

      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const profile = await profilesService.getProfileById(id, user.tenant_id || 'default')

      if (!profile) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Profile not found',
        }))
        return
      }

      logAction('profile_by_id_requested', user.id, {
        targetProfileId: id,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: profile,
      }))
    } catch (error) {
      logAction('profile_by_id_error', user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Update current user profile
   */
  async updateProfile(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: any,
    user?: any,
  ): Promise<void> {
    try {
      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const validatedData = updateProfileSchema.parse(body)
      const profile = await profilesService.updateProfile(user.id, user.tenant_id || 'default', validatedData)

      logAction('profile_updated', user.id, {
        updates: validatedData,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: profile,
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid profile data',
          details: error.errors,
        }))
      } else {
        logAction('profile_update_error', user?.id || 'anonymous', {
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
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: any,
    user?: any,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Profile ID is required',
        }))
        return
      }

      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      // TODO: Add admin check
      await profilesService.deleteProfile(id, user.tenant_id || 'default')

      logAction('profile_deleted', user.id, {
        targetProfileId: id,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        message: 'Profile deleted successfully',
      }))
    } catch (error) {
      logAction('profile_delete_error', user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },
}
