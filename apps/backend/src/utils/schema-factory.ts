// Schema Factory for STRATO Core OS™
// This utility provides reusable validation schemas and factories
// to eliminate repetitive Zod schema definitions

import { z } from 'zod'

/**
 * Common field validators used across the application
 */
export const CommonFields = {
  // ID fields
  id: () => z.string().uuid('Invalid ID format'),
  userId: () => z.string().uuid('Invalid user ID format'),
  tenantId: () => z.string().uuid('Invalid tenant ID format').optional(),
  
  // Contact fields
  email: () => z.string().email('Invalid email format'),
  phone: () => z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone format').optional(),
  
  // Text fields
  name: () => z.string().min(1, 'Name is required').max(100, 'Name too long'),
  title: () => z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: () => z.string().max(1000, 'Description too long').optional(),
  
  // Numeric fields
  amount: () => z.number().positive('Amount must be positive'),
  price: () => z.number().min(0, 'Price cannot be negative'),
  quantity: () => z.number().int().min(1, 'Quantity must be at least 1'),
  percentage: () => z.number().min(0, 'Percentage cannot be negative').max(100, 'Percentage cannot exceed 100'),
  
  // Currency and money
  currency: () => z.string().length(3, 'Currency must be 3 characters (e.g., USD)'),
  
  // Date fields
  date: () => z.string().datetime('Invalid date format'),
  dateOptional: () => z.string().datetime('Invalid date format').optional(),
  
  // Status fields
  status: <T extends readonly [string, ...string[]]>(values: T) => 
    z.enum(values, { errorMap: () => ({ message: `Status must be one of: ${values.join(', ')}` }) }),
  
  // Boolean fields
  active: () => z.boolean().default(true),
  deleted: () => z.boolean().default(false),
  
  // Pagination fields
  pagination: () => z.object({
    page: z.number().int().min(1, 'Page must be at least 1').default(1),
    limit: z.number().int().min(1, 'Limit must be at least 1').max(100, 'Limit cannot exceed 100').default(10),
    offset: z.number().int().min(0, 'Offset cannot be negative').optional()
  }),
  
  // Search and filtering
  search: () => z.string().min(1, 'Search term cannot be empty').optional(),
  sortBy: () => z.string().optional(),
  sortOrder: () => z.enum(['asc', 'desc']).default('desc'),
  
  // Metadata fields
  tags: () => z.array(z.string()).optional(),
  metadata: () => z.record(z.string(), z.any()).optional(),
  
  // URL fields
  url: () => z.string().url('Invalid URL format'),
  urlOptional: () => z.string().url('Invalid URL format').optional(),
  
  // Address fields
  address: () => z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
    country: z.string().length(2, 'Country must be 2-letter code')
  }).optional()
}

/**
 * Creates CRUD schemas (create, update, query) from a base field definition
 */
export function createCrudSchemas<T extends Record<string, z.ZodTypeAny>>(
  fields: T,
  options: {
    requiredFields?: (keyof T)[]
    excludeFromUpdate?: (keyof T)[]
    excludeFromQuery?: (keyof T)[]
    additionalQueryFields?: Record<string, z.ZodTypeAny>
  } = {}
) {
  const {
    requiredFields = [],
    excludeFromUpdate = [],
    excludeFromQuery = [],
    additionalQueryFields = {}
  } = options

  const baseSchema = z.object(fields)
  
  // Create schema - only specified required fields
  const createFields = Object.fromEntries(
    Object.entries(fields).filter(([key]) => requiredFields.includes(key as keyof T))
  ) as { [K in keyof T]: T[K] }
  
  const createSchema = z.object(createFields)
  
  // Update schema - all fields optional except excluded ones
  const updateFields = Object.fromEntries(
    Object.entries(fields)
      .filter(([key]) => !excludeFromUpdate.includes(key as keyof T))
      .map(([key, value]) => [key, value.optional()])
  ) as { [K in keyof T]: z.ZodOptional<T[K]> }
  
  const updateSchema = z.object(updateFields)
  
  // Query schema - includes pagination and filtering
  const queryFields = Object.fromEntries(
    Object.entries(fields)
      .filter(([key]) => !excludeFromQuery.includes(key as keyof T))
      .map(([key, value]) => [key, value.optional()])
  ) as { [K in keyof T]: z.ZodOptional<T[K]> }
  
  const querySchema = z.object({
    ...CommonFields.pagination().shape,
    ...queryFields,
    ...additionalQueryFields
  })
  
  return {
    create: createSchema,
    update: updateSchema,
    query: querySchema,
    base: baseSchema
  }
}

/**
 * Creates a batch operation schema
 */
export function createBatchSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema).min(1, 'At least one item is required').max(100, 'Too many items'),
    options: z.object({
      continueOnError: z.boolean().default(false),
      validateAll: z.boolean().default(true)
    }).optional()
  })
}

/**
 * Creates a schema for API responses
 */
export function createResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string().optional(),
    errors: z.array(z.string()).optional(),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      pages: z.number()
    }).optional()
  })
}

/**
 * Predefined entity schemas for common business objects
 */
export const EntitySchemas = {
  // User/Profile schemas
  user: () => z.object({
    id: CommonFields.id(),
    email: CommonFields.email(),
    name: CommonFields.name(),
    role: CommonFields.status(['admin', 'user', 'viewer'] as const),
    active: CommonFields.active(),
    created_at: CommonFields.date(),
    updated_at: CommonFields.date()
  }),
  
  // Financial schemas
  invoice: () => z.object({
    id: CommonFields.id(),
    customer_id: CommonFields.userId(),
    amount: CommonFields.amount(),
    currency: CommonFields.currency(),
    description: CommonFields.description(),
    status: CommonFields.status(['pending', 'paid', 'cancelled'] as const),
    due_date: CommonFields.dateOptional(),
    created_at: CommonFields.date(),
    updated_at: CommonFields.date()
  }),
  
  // Campaign schemas
  campaign: () => z.object({
    id: CommonFields.id(),
    user_id: CommonFields.userId(),
    name: CommonFields.name(),
    description: CommonFields.description(),
    status: CommonFields.status(['draft', 'active', 'paused', 'completed'] as const),
    budget: CommonFields.amount().optional(),
    start_date: CommonFields.dateOptional(),
    end_date: CommonFields.dateOptional(),
    created_at: CommonFields.date(),
    updated_at: CommonFields.date()
  }),
  
  // Analytics schemas
  analytics: () => z.object({
    id: CommonFields.id(),
    user_id: CommonFields.userId(),
    event: z.string().min(1, 'Event name is required'),
    properties: CommonFields.metadata(),
    timestamp: CommonFields.date(),
    session_id: z.string().optional()
  })
}

/**
 * Validation middleware helper
 */
export function validateSchema<T>(schema: z.ZodSchema<T>) {
  return {
    body: (data: unknown): T => {
      const result = schema.safeParse(data)
      if (!result.success) {
        throw new Error(`Validation failed: ${result.error.issues.map(i => i.message).join(', ')}`)
      }
      return result.data
    },
    
    query: (data: unknown): T => {
      const result = schema.safeParse(data)
      if (!result.success) {
        throw new Error(`Query validation failed: ${result.error.issues.map(i => i.message).join(', ')}`)
      }
      return result.data
    },
    
    params: (data: unknown): T => {
      const result = schema.safeParse(data)
      if (!result.success) {
        throw new Error(`Params validation failed: ${result.error.issues.map(i => i.message).join(', ')}`)
      }
      return result.data
    }
  }
}

/**
 * Pre-built CRUD schemas for common entities
 */
export const CrudSchemas = {
  billing: createCrudSchemas(EntitySchemas.invoice().shape, {
    requiredFields: ['customer_id', 'amount', 'currency'],
    excludeFromUpdate: ['id', 'created_at'],
    excludeFromQuery: ['updated_at']
  }),
  
  campaigns: createCrudSchemas(EntitySchemas.campaign().shape, {
    requiredFields: ['user_id', 'name'],
    excludeFromUpdate: ['id', 'created_at'],
    excludeFromQuery: ['updated_at']
  }),
  
  users: createCrudSchemas(EntitySchemas.user().shape, {
    requiredFields: ['email', 'name'],
    excludeFromUpdate: ['id', 'created_at'],
    excludeFromQuery: ['updated_at']
  })
}