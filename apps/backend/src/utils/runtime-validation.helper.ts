import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

/**
 * Runtime type validation helpers for critical paths
 */

// Common validation schemas
export const ValidationSchemas = {
  // User ID validation
  userId: z.string().uuid('Invalid user ID format'),

  // Email validation
  email: z.string().email('Invalid email format'),

  // Campaign data validation
  campaignData: z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
    description: z.string().optional(),
    budget: z.number().positive('Budget must be positive'),
    startDate: z.string().datetime('Invalid start date format'),
    endDate: z.string().datetime('Invalid end date format'),
  }),

  // Analytics event validation
  analyticsEvent: z.object({
    event: z.string().min(1, 'Event name is required'),
    properties: z.record(z.unknown()).optional(),
    userId: z.string().uuid().optional(),
    timestamp: z.number().positive().optional(),
  }),

  // Pagination parameters
  pagination: z.object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10),
  }),

  // ID parameter
  idParam: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),
}

/**
 * Validates data against a schema and throws descriptive errors
 */
export function validateOrThrow<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: string = 'data',
): T {
  const result = schema.safeParse(data)

  if (!result.success) {
    const errors = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ')

    throw new Error(`Validation failed for ${context}: ${errors}`)
  }

  return result.data
}

/**
 * Validates data and returns result with success flag
 */
export function validateSafely<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data)

  if (!result.success) {
    const errors = result.error.errors.map(
      (err) => `${err.path.join('.')}: ${err.message}`,
    )
    return { success: false, errors }
  }

  return { success: true, data: result.data }
}

/**
 * Type guard for checking if value is defined and not null
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * Type guard for checking if value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Type guard for checking if value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * Type guard for checking if value is a valid UUID
 */
export function isUUID(value: unknown): value is string {
  if (!isString(value)) return false
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(value)
}

/**
 * Ensures a value is a string, throwing if not
 */
export function ensureString(
  value: unknown,
  context: string = 'value',
): string {
  if (!isString(value)) {
    throw new Error(`Expected ${context} to be a string, got ${typeof value}`)
  }
  return value
}

/**
 * Ensures a value is a number, throwing if not
 */
export function ensureNumber(
  value: unknown,
  context: string = 'value',
): number {
  if (!isNumber(value)) {
    throw new Error(`Expected ${context} to be a number, got ${typeof value}`)
  }
  return value
}

/**
 * Ensures a value is a valid UUID, throwing if not
 */
export function ensureUUID(value: unknown, context: string = 'value'): string {
  if (!isUUID(value)) {
    throw new Error(`Expected ${context} to be a valid UUID`)
  }
  return value
}

/**
 * Sanitizes and validates request parameters
 */
export function sanitizeParams(
  params: Record<string, unknown>,
): Record<string, string> {
  const sanitized: Record<string, string> = {}

  for (const [key, value] of Object.entries(params)) {
    if (isString(value)) {
      sanitized[key] = value.trim()
    } else if (isNumber(value)) {
      sanitized[key] = value.toString()
    } else if (value !== null && value !== undefined) {
      sanitized[key] = String(value)
    }
  }

  return sanitized
}

/**
 * Creates a validation middleware for specific routes
 */
export function createRouteValidator<T>(
  schema: z.ZodSchema<T>,
  dataExtractor: (req: IncomingMessage & { body?: unknown }) => unknown = (
    req,
  ) => req.body,
) {
  return (
    req: IncomingMessage & { body?: unknown; validated?: T },
    res: ServerResponse,
    _next: () => void,
  ) => {
    try {
      const data = dataExtractor(req)
      const validated = validateOrThrow(schema, data, 'request data')
      req.validated = validated
      _next()
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: false,
          error: 'Validation failed',
          message:
            error instanceof Error ? error.message : 'Unknown validation error',
        }),
      )
    }
  }
}
