import {
  exportSettings,
  getSystemSettings,
  getTeamSettings,
  getUserSettings,
  importSettings,
  updateSystemSettings,
  updateTeamSettings,
  updateUserSettings,
} from '../controllers/settings.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const settingsRoutes: RouteDefinition[] = [
  // User Settings
  { method: 'GET', path: '/settings/user', handler: getUserSettings },
  { method: 'PATCH', path: '/settings/user', handler: updateUserSettings },
  
  // Team Settings
  { method: 'GET', path: '/teams/:teamId/settings', handler: getTeamSettings },
  { method: 'PATCH', path: '/teams/:teamId/settings', handler: updateTeamSettings },
  
  // System Settings (Admin only)
  { method: 'GET', path: '/settings/system', handler: getSystemSettings },
  { method: 'PATCH', path: '/settings/system', handler: updateSystemSettings },
  
  // Export/Import Settings
  { method: 'GET', path: '/settings/export', handler: exportSettings },
  { method: 'POST', path: '/settings/import', handler: importSettings },
] 