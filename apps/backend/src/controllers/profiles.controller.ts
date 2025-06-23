import { NextFunction, Request, Response } from 'express'

import { createProfileSchema, updateProfileSchema } from '../lib/schemas.js'
import { profilesService } from '../services/profiles.service.js'

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
      if (!req.user) throw new Error('User not authenticated')
      const tenantId = req.user.tenant_id
      const profiles = await profilesService.getAllProfiles(tenantId)
      res.json(profiles)
    } catch (error) {
      next(error)
    }
  },

  async getProfileById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new Error('User not authenticated')
      const id = req.params.id as string
      const tenantId = req.user.tenant_id
      const profile = await profilesService.getProfileById(id, tenantId)
      res.json(profile)
    } catch (error) {
      next(error)
    }
  },

  async createProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new Error('User not authenticated')
      const tenantId = req.user.tenant_id
      const validatedProfile = createProfileSchema.parse(req.body)
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
      if (!req.user) throw new Error('User not authenticated')
      const id = req.params.id as string
      const tenantId = req.user.tenant_id
      const validatedProfile = updateProfileSchema.parse(req.body)
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
      if (!req.user) throw new Error('User not authenticated')
      const id = req.params.id as string
      const tenantId = req.user.tenant_id
      await profilesService.deleteProfile(id, tenantId)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}
