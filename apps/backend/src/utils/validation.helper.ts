import { z } from 'zod'

/**
 * Common validation schemas
 */
export const commonSchemas = {
  // Pagination
  pagination: z.object({
    page: z.string().optional().transform(val => parseInt(val || '1')),
    limit: z.string().optional().transform(val => parseInt(val || '10')),
  }),
  
  // ID parameters
  idParam: z.object({
    id: z.string().uuid(),
  }),
  
  // Email validation
  email: z.string().email(),
  
  // Password validation
  password: z.string().min(8).max(128),
  
  // UUID validation
  uuid: z.string().uuid(),
  
  // Date validation
  date: z.string().datetime(),
  
  // URL validation
  url: z.string().url(),
  
  // Phone number validation (basic)
  phone: z.string().regex(/^\+?[\d\s\-()]+$/),
  
  // Currency amount
  amount: z.number().positive(),
  
  // Percentage (0-100)
  percentage: z.number().min(0).max(100),
}

/**
 * Validate UUID format
 */
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate date format
 */
export const isValidDate = (date: string): boolean => {
  const parsed = new Date(date)
  return !isNaN(parsed.getTime())
}

/**
 * Validate phone number format
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]+$/
  return phoneRegex.test(phone)
}

/**
 * Sanitize and validate string input
 */
export const sanitizeString = (input: unknown): string | null => {
  if (typeof input !== 'string') return null
  const sanitized = input.trim()
  return sanitized.length > 0 ? sanitized : null
}

/**
 * Sanitize and validate number input
 */
export const sanitizeNumber = (input: unknown): number | null => {
  if (typeof input === 'number') return input
  if (typeof input === 'string') {
    const parsed = parseFloat(input)
    return isNaN(parsed) ? null : parsed
  }
  return null
}

/**
 * Sanitize and validate boolean input
 */
export const sanitizeBoolean = (input: unknown): boolean => {
  if (typeof input === 'boolean') return input
  if (typeof input === 'string') {
    return input.toLowerCase() === 'true'
  }
  if (typeof input === 'number') {
    return input !== 0
  }
  return false
}

/**
 * Validate object structure
 */
export const validateObject = <T>(
  obj: unknown,
  schema: z.ZodSchema<T>,
): { success: true; data: T } | { success: false; errors: z.ZodError } => {
  try {
    const data = schema.parse(obj)
    return { success: true, data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error }
    }
    throw error
  }
}

/**
 * Safe validation (returns null on error)
 */
export const safeValidate = <T>(
  obj: unknown,
  schema: z.ZodSchema<T>,
): T | null => {
  try {
    return schema.parse(obj)
  } catch {
    return null
  }
}

/**
 * Validate required fields
 */
export const validateRequired = (
  obj: Record<string, unknown>,
  requiredFields: string[],
): { success: true } | { success: false; missing: string[] } => {
  const missing = requiredFields.filter(field => {
    const value = obj[field]
    return value === undefined || value === null || value === ''
  })
  
  if (missing.length > 0) {
    return { success: false, missing }
  }
  
  return { success: true }
}

/**
 * Validate enum values
 */
export const validateEnum = <T extends string>(
  value: unknown,
  allowedValues: readonly T[],
): value is T => {
  return typeof value === 'string' && allowedValues.includes(value as T)
}

/**
 * Validate array of items
 */
export const validateArray = <T>(
  arr: unknown,
  itemValidator: (item: unknown) => item is T,
): arr is T[] => {
  if (!Array.isArray(arr)) return false
  return arr.every(itemValidator)
}

/**
 * Validate date range
 */
export const validateDateRange = (
  startDate: string,
  endDate: string,
): boolean => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return false
  }
  
  return start <= end
}

/**
 * Validate pagination parameters
 */
export const validatePagination = (
  page: unknown,
  limit: unknown,
): { success: true; page: number; limit: number } | { success: false; error: string } => {
  const pageNum = sanitizeNumber(page)
  const limitNum = sanitizeNumber(limit)
  
  if (pageNum === null || limitNum === null) {
    return { success: false, error: 'Invalid pagination parameters' }
  }
  
  if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
    return { success: false, error: 'Pagination parameters out of range' }
  }
  
  return { success: true, page: pageNum, limit: limitNum }
} 