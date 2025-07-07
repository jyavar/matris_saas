import { IncomingMessage } from 'http'
import { URL } from 'url'

import type { AuthenticatedUser } from '../types/express/index.js'

/**
 * Parse JSON body from request
 */
export const parseBody = async (req: IncomingMessage): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    let body = ''
    
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    
    req.on('end', () => {
      try {
        if (body) {
          resolve(JSON.parse(body))
        } else {
          resolve({})
        }
      } catch {
        reject(new Error('Invalid JSON in request body'))
      }
    })
    
    req.on('error', () => {
      reject(new Error('Request error'))
    })
  })
}

/**
 * Parse query parameters from URL
 */
export const parseQuery = (url: string): Record<string, string> => {
  try {
    const urlObj = new URL(url, 'http://localhost')
    const result: Record<string, string> = {}
    
    for (const [key, value] of urlObj.searchParams.entries()) {
      result[key] = value
    }
    
    return result
  } catch {
    return {}
  }
}

/**
 * Parse URL parameters from path
 */
export const parseParams = (path: string, pattern: string): Record<string, string> => {
  const params: Record<string, string> = {}
  
  // Simple parameter extraction for common patterns
  const pathSegments = path.split('/').filter(Boolean)
  const patternSegments = pattern.split('/').filter(Boolean)
  
  for (let i = 0; i < patternSegments.length; i++) {
    const patternSegment = patternSegments[i]
    const pathSegment = pathSegments[i]
    
    if (patternSegment?.startsWith(':')) {
      const paramName = patternSegment.slice(1)
      params[paramName] = pathSegment || ''
    }
  }
  
  return params
}

/**
 * Get pagination parameters from query
 */
export const getPaginationParams = (query: Record<string, string>) => {
  const page = parseInt(query.page || '1', 10)
  const limit = parseInt(query.limit || '10', 10)
  
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)),
    offset: (page - 1) * limit,
  }
}

/**
 * Get sorting parameters from query
 */
export const getSortParams = (query: Record<string, string>) => {
  const sortBy = query.sortBy || 'created_at'
  const sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc'
  
  return { sortBy, sortOrder }
}

/**
 * Get filter parameters from query
 */
export const getFilterParams = (query: Record<string, string>) => {
  const filters: Record<string, unknown> = {}
  
  Object.keys(query).forEach(key => {
    if (key.startsWith('filter.')) {
      const filterKey = key.replace('filter.', '')
      filters[filterKey] = query[key]
    }
  })
  
  return filters
}

/**
 * Validate and sanitize input
 */
export const sanitizeInput = (input: unknown): unknown => {
  if (typeof input === 'string') {
    return input.trim()
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput)
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value)
    }
    return sanitized
  }
  
  return input
}

/**
 * Extract user from request (if authenticated)
 */
export const getUserFromRequest = (req: IncomingMessage): AuthenticatedUser | undefined => {
  return (req as { _user?: AuthenticatedUser })._user
}

/**
 * Extract tenant from request
 */
export const getTenantFromRequest = (req: IncomingMessage): string | null => {
  const user = getUserFromRequest(req)
  return user?.tenant_id || null
}

/**
 * Check if request is authenticated
 */
export const isAuthenticated = (req: IncomingMessage): boolean => {
  return !!(req as { _user?: AuthenticatedUser })._user
}

/**
 * Check if user has specific role
 */
export const hasRole = (req: IncomingMessage, role: string): boolean => {
  const user = getUserFromRequest(req)
  return user?.role === role
}

/**
 * Check if user has specific permission
 */
export const hasPermission = (req: IncomingMessage, permission: string): boolean => {
  const user = getUserFromRequest(req)
  return user?.permissions?.includes(permission) || false
} 