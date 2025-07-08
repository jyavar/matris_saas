import { ServerResponse } from 'http'

interface SuccessResponse<T = unknown> {
  success: true
  data: T
  message?: string
  timestamp: string
}

interface ErrorResponse {
  success: false
  error: string
  details?: unknown
  timestamp: string
}

/**
 * Send a successful JSON response
 */
export const sendSuccess = <T>(
  res: ServerResponse,
  data: T,
  statusCode: number = 200,
  message?: string,
): void => {
  const response: SuccessResponse<T> = {
    success: true,
    data,
    ...(message && { message }),
    timestamp: new Date().toISOString(),
  }

  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(response))
}

/**
 * Send an error JSON response
 */
export const sendError = (
  res: ServerResponse,
  error: string,
  statusCode: number = 500,
  details?: unknown,
): void => {
  const response: ErrorResponse = {
    success: false,
    error,
    ...(details && typeof details === 'object' ? { details } : {}),
    timestamp: new Date().toISOString(),
  }

  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(response))
}

/**
 * Send a paginated response
 */
export const sendPaginated = <T>(
  res: ServerResponse,
  data: T[],
  total: number,
  page: number,
  limit: number,
  statusCode: number = 200,
): void => {
  const totalPages = Math.ceil(total / limit)
  const hasNext = page < totalPages
  const hasPrev = page > 1

  const response = {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev,
    },
    timestamp: new Date().toISOString(),
  }

  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(response))
}

/**
 * Send a created response (201)
 */
export const sendCreated = <T>(
  res: ServerResponse,
  data: T,
  message?: string,
): void => {
  sendSuccess(res, data, 201, message)
}

/**
 * Send a no content response (204)
 */
export const sendNoContent = (res: ServerResponse): void => {
  res.writeHead(204)
  res.end()
}

/**
 * Send a not found response (404)
 */
export const sendNotFound = (
  res: ServerResponse,
  message: string = 'Resource not found',
): void => {
  sendError(res, message, 404)
}

/**
 * Send an unauthorized response (401)
 */
export const sendUnauthorized = (
  res: ServerResponse,
  message: string = 'Unauthorized',
): void => {
  sendError(res, message, 401)
}

/**
 * Send a forbidden response (403)
 */
export const sendForbidden = (
  res: ServerResponse,
  message: string = 'Forbidden',
): void => {
  sendError(res, message, 403)
}

/**
 * Send a validation error response (400)
 */
export const sendValidationError = (
  res: ServerResponse,
  details: unknown,
  message: string = 'Validation error',
): void => {
  sendError(res, message, 400, details)
}

/**
 * Send a conflict response (409)
 */
export const sendConflict = (
  res: ServerResponse,
  message: string = 'Conflict',
): void => {
  sendError(res, message, 409)
}

/**
 * Send a too many requests response (429)
 */
export const sendTooManyRequests = (
  res: ServerResponse,
  message: string = 'Too many requests',
  retryAfter?: number,
): void => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (retryAfter) {
    headers['Retry-After'] = retryAfter.toString()
  }

  const response: ErrorResponse = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  }

  res.writeHead(429, headers)
  res.end(JSON.stringify(response))
}
