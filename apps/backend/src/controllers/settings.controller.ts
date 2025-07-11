import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { settingsService } from '../services/settings.service.js'
import { logAction } from '../services/logger.service.js'
import type { AuthenticatedUser, ControllerHandler, RequestBody } from '../types/express/index.js'
import { parseBody, parseParams, parseQuery } from '../utils/request.helper.js'
import { sendCreated, sendError, sendNotFound, sendSuccess, sendUnauthorized, sendValidationError } from '../utils/response.helper.js'

// Schemas
const updateUserSettingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).optional(),
  language: z.string().min(2).max(5).optional(),
  notifications: z.object({
    email: z.boolean().optional(),
    push: z.boolean().optional(),
    sms: z.boolean().optional(),
  }).optional(),
  privacy: z.object({
    profile_visibility: z.enum(['public', 'private', 'team']).optional(),
    data_sharing: z.boolean().optional(),
  }).optional(),
  preferences: z.object({
    timezone: z.string().optional(),
    date_format: z.string().optional(),
    currency: z.string().optional(),
  }).optional(),
})

const updateTeamSettingsSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  permissions: z.object({
    invite_members: z.boolean().optional(),
    manage_billing: z.boolean().optional(),
    view_analytics: z.boolean().optional(),
  }).optional(),
  features: z.object({
    advanced_analytics: z.boolean().optional(),
    custom_branding: z.boolean().optional(),
    api_access: z.boolean().optional(),
  }).optional(),
})

const updateSystemSettingsSchema = z.object({
  maintenance_mode: z.boolean().optional(),
  feature_flags: z.record(z.boolean()).optional(),
  integrations: z.object({
    stripe_enabled: z.boolean().optional(),
    posthog_enabled: z.boolean().optional(),
    resend_enabled: z.boolean().optional(),
  }).optional(),
})

// User Settings
export const getUserSettings: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const settings = await settingsService.getUserSettings(user.id)

    logAction('settings_retrieved', user.id, { type: 'user' })

    return sendSuccess(res, settings)
  } catch (error) {
    return sendError(res, 'Failed to retrieve user settings', 500)
  }
}

export const updateUserSettings: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const body = (await parseBody(_req)) as RequestBody
    const validatedData = updateUserSettingsSchema.parse(body)

    const settings = await settingsService.updateUserSettings(user.id, validatedData)

    logAction('settings_updated', user.id, { 
      type: 'user',
      changes: Object.keys(validatedData)
    })

    return sendSuccess(res, settings)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendValidationError(res, error.errors, 'Invalid settings data')
    }
    return sendError(res, 'Failed to update user settings', 500)
  }
}

// Team Settings
export const getTeamSettings: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(_req.url || '', '/api/teams/:teamId/settings')
    const teamId = params.teamId

    if (!teamId) {
      return sendError(res, 'Team ID is required', 400)
    }

    const settings = await settingsService.getTeamSettings(teamId, user.id)

    logAction('team_settings_retrieved', user.id, { team_id: teamId })

    return sendSuccess(res, settings)
  } catch (error) {
    return sendError(res, 'Failed to retrieve team settings', 500)
  }
}

export const updateTeamSettings: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(_req.url || '', '/api/teams/:teamId/settings')
    const teamId = params.teamId
    const body = (await parseBody(_req)) as RequestBody

    if (!teamId) {
      return sendError(res, 'Team ID is required', 400)
    }

    const validatedData = updateTeamSettingsSchema.parse(body)

    const settings = await settingsService.updateTeamSettings(teamId, user.id, validatedData)

    logAction('team_settings_updated', user.id, { 
      team_id: teamId,
      changes: Object.keys(validatedData)
    })

    return sendSuccess(res, settings)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendValidationError(res, error.errors, 'Invalid team settings data')
    }
    return sendError(res, 'Failed to update team settings', 500)
  }
}

// System Settings (Admin only)
export const getSystemSettings: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    // TODO: Add admin role check
    if (user.role !== 'admin') {
      return sendError(res, 'Admin access required', 403)
    }

    const settings = await settingsService.getSystemSettings()

    logAction('system_settings_retrieved', user.id, {})

    return sendSuccess(res, settings)
  } catch (error) {
    return sendError(res, 'Failed to retrieve system settings', 500)
  }
}

export const updateSystemSettings: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    // TODO: Add admin role check
    if (user.role !== 'admin') {
      return sendError(res, 'Admin access required', 403)
    }

    const body = (await parseBody(_req)) as RequestBody
    const validatedData = updateSystemSettingsSchema.parse(body)

    const settings = await settingsService.updateSystemSettings(validatedData)

    logAction('system_settings_updated', user.id, { 
      changes: Object.keys(validatedData)
    })

    return sendSuccess(res, settings)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendValidationError(res, error.errors, 'Invalid system settings data')
    }
    return sendError(res, 'Failed to update system settings', 500)
  }
}

// Export/Import Settings
export const exportSettings: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const exportData = await settingsService.exportSettings(user.id)

    logAction('settings_exported', user.id, {})

    return sendSuccess(res, { export_data: exportData })
  } catch (error) {
    return sendError(res, 'Failed to export settings', 500)
  }
}

export const importSettings: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const body = (await parseBody(_req)) as RequestBody
    const { settings_data } = body

    if (!settings_data || typeof settings_data !== 'string') {
      return sendError(res, 'Settings data is required', 400)
    }

    await settingsService.importSettings(user.id, settings_data)

    logAction('settings_imported', user.id, {})

    return sendSuccess(res, { message: 'Settings imported successfully' })
  } catch (error) {
    return sendError(res, 'Failed to import settings', 500)
  }
} 