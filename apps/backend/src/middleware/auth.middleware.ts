import { IncomingMessage, ServerResponse } from 'http'

import { logAction } from '../services/logger.service.js'
import { supabase } from '../services/supabase.service.js'
import type { MiddlewareHandler } from '../types/express/index.js'
import { sendError, sendUnauthorized } from '../utils/response.helper.js'

// Extend IncomingMessage to include user
declare module 'http' {
  interface IncomingMessage {
    _user?: {
      id: string
      email: string
      role: string
    }
  }
}

/**
 * Authentication middleware for Node.js native HTTP
 */
export const authMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return sendUnauthorized(res, 'Authorization header required')
    }

    const token = authHeader.replace('Bearer ', '')

    if (!token) {
      return sendUnauthorized(res, 'Bearer token required')
    }

    // Verify JWT token with Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) {
      logAction('auth_failed', 'anonymous', {
        _error: error?.message || 'Invalid token',
        ip: req.socket.remoteAddress,
      })
      return sendUnauthorized(res, 'Invalid or expired token')
    }

    // Add user to request object
    const authenticatedUser = {
      id: user.id,
      email: user.email || '',
      role: user.user_metadata?.role || 'user',
    }
    ;(req as AuthenticatedRequest)._user = authenticatedUser

    logAction('auth_success', authenticatedUser.id, {
      email: user.email,
      ip: req.socket.remoteAddress,
    })

    _next()
  } catch (error) {
    logAction('auth_error', 'anonymous', {
      _error: error instanceof Error ? error.message : 'Unknown error',
      ip: req.socket.remoteAddress,
    })
    return sendError(res, 'Authentication failed', 500)
  }
}

/**
 * Optional authentication middleware - doesn't fail if no token
 */
export const optionalAuthMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      _next()
      return
    }

    const token = authHeader.replace('Bearer ', '')

    if (!token) {
      _next()
      return
    }

    // Verify JWT token with Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (!error && user) {
      // Add user to request object
      const authenticatedUser = {
        id: user.id,
        email: user.email || '',
        role: user.user_metadata?.role || 'user',
      }
      ;(req as AuthenticatedRequest)._user = authenticatedUser

      logAction('optional_auth_success', authenticatedUser.id, {
        email: user.email,
        ip: req.socket.remoteAddress,
      })
    }

    _next()
  } catch (error) {
    // Don't fail on optional auth errors, just log and continue
    logAction('optional_auth_error', 'anonymous', {
      _error: error instanceof Error ? error.message : 'Unknown error',
      ip: req.socket.remoteAddress,
    })
    _next()
  }
}

/**
 * Role-based authorization middleware
 */
export const requireRole = (requiredRole: string): MiddlewareHandler => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    _next: () => void,
  ): Promise<void> => {
    try {
      const user = (req as AuthenticatedRequest)._user

      if (!user) {
        return sendUnauthorized(res, 'Authentication required')
      }

      if (user.role !== requiredRole && user.role !== 'admin') {
        logAction('auth_role_denied', user.id, {
          required_role: requiredRole,
          user_role: user.role,
          ip: req.socket.remoteAddress,
        })
        return sendUnauthorized(res, 'Insufficient permissions')
      }

      logAction('auth_role_granted', user.id, {
        required_role: requiredRole,
        user_role: user.role,
        ip: req.socket.remoteAddress,
      })

      _next()
    } catch (error) {
      logAction('auth_role_error', 'anonymous', {
        _error: error instanceof Error ? error.message : 'Unknown error',
        ip: req.socket.remoteAddress,
      })
      return sendError(res, 'Authorization failed', 500)
    }
  }
}

/**
 * Admin-only middleware
 */
export const requireAdmin: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void,
): Promise<void> => {
  try {
    const user = (req as AuthenticatedRequest)._user

    if (!user) {
      return sendUnauthorized(res, 'Authentication required')
    }

    if (user.role !== 'admin') {
      logAction('auth_admin_denied', user.id, {
        user_role: user.role,
        ip: req.socket.remoteAddress,
      })
      return sendUnauthorized(res, 'Admin access required')
    }

    logAction('auth_admin_granted', user.id, {
      ip: req.socket.remoteAddress,
    })

    _next()
  } catch (error) {
    logAction('auth_admin_error', 'anonymous', {
      _error: error instanceof Error ? error.message : 'Unknown error',
      ip: req.socket.remoteAddress,
    })
    return sendError(res, 'Authorization failed', 500)
  }
}
