import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export const createUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .optional(),
  email: z.string().email().optional(),
})

export const createProfileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  full_name: z
    .string()
    .min(3, 'Full name must be at least 3 characters long')
    .optional(),
  avatar_url: z.string().url('Invalid avatar URL').optional(),
})

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .optional(),
  full_name: z
    .string()
    .min(3, 'Full name must be at least 3 characters long')
    .optional(),
  avatar_url: z.string().url('Invalid avatar URL').optional(),
})

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
})

export const numericIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
})

export const analyticsQuerySchema = z.object({
  range: z.string().optional(),
})
