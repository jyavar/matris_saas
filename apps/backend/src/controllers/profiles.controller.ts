import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import {
  createProfileSchema,
  idParamSchema,
  updateProfileSchema,
} from '../lib/schemas.js'
import { profilesService } from '../services/profiles.service.js'
import { ApiError } from '../utils/ApiError.js'

export const profilesController = {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      // The user object is attached by the authMiddleware
      res.json(req.user)
    } catch (error) {
      next(error)
    }
  },

  async getAllProfiles(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const tenantId = req.user.tenant_id
      const profiles = await profilesService.getAllProfiles(tenantId)
      res.json(profiles)
    } catch (error) {
      next(error)
    }
  },

  async getProfileById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = idParamSchema.parse(req.params)
      const tenantId = req.user.tenant_id
      let profile
      try {
        profile = await profilesService.getProfileById(id, tenantId)
        if (!profile) throw new ApiError(404, 'Profile not found')
      } catch (error) {
        if (
          error instanceof ApiError &&
          error.statusCode === 400 &&
          typeof error.message === 'string' &&
          error.message.includes('failed to parse filter')
        ) {
          throw new ApiError(404, 'Profile not found')
        }
        throw error
      }
      res.json(profile)
    } catch (error) {
      next(error)
    }
  },

  async createProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const tenantId = req.user.tenant_id
      let validatedProfile
      try {
        validatedProfile = createProfileSchema.parse(req.body)
      } catch (zodError: unknown) {
        if (zodError instanceof ZodError) {
          throw new ApiError(
            400,
            zodError.errors?.[0]?.message || 'Invalid profile data',
          )
        }
        throw zodError
      }
      const newProfile = await profilesService.createProfile({
        id: req.user.id,
        username: validatedProfile.username,
        full_name: validatedProfile.full_name,
        avatar_url: validatedProfile.avatar_url,
        tenant_id: tenantId,
      })
      res.status(201).json(newProfile)
    } catch (error) {
      next(error)
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = idParamSchema.parse(req.params)
      const tenantId = req.user.tenant_id
      let validatedProfile
      try {
        validatedProfile = updateProfileSchema.parse(req.body)
      } catch (zodError: unknown) {
        if (zodError instanceof ZodError) {
          throw new ApiError(
            400,
            zodError.errors?.[0]?.message || 'Invalid profile data',
          )
        }
        throw zodError
      }
      let profile
      try {
        profile = await profilesService.getProfileById(id, tenantId)
        if (!profile) throw new ApiError(404, 'Profile not found')
      } catch (error: unknown) {
        if (error instanceof ApiError && error.statusCode === 404) {
          // Si el perfil no existe, lanzar 404
          throw error
        }
        throw error
      }
      if (profile.id !== req.user.id) throw new ApiError(403, 'Forbidden')
      const updatedProfile = await profilesService.updateProfile(
        id,
        tenantId,
        validatedProfile,
      )
      res.json(updatedProfile)
    } catch (error) {
      next(error)
    }
  },

  async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = idParamSchema.parse(req.params)
      const tenantId = req.user.tenant_id
      await profilesService.deleteProfile(id, tenantId)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}
