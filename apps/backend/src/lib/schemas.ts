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

export const createTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  completed: z.boolean().optional(),
  tenantId: z.string().uuid('Invalid tenant ID'),
})

export const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  completed: z.boolean().optional(),
})

export const createInvoiceSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID'),
  amount: z.number().positive(),
  currency: z.string().length(3),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
})

export const updateInvoiceSchema = z.object({
  amount: z.number().positive().optional(),
  currency: z.string().length(3).optional(),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  status: z.enum(['pending', 'paid', 'cancelled']).optional(),
})

export const todoIdParamSchema = z.object({
  id: z
    .string()
    .refine(
      (val) => /^\d+$/.test(val) || /^[0-9a-fA-F-]{36}$/.test(val),
      'ID must be a number or a valid UUID',
    ),
})

export const tenantSignUpSchema = z.object({
  name: z.string().min(3, 'El nombre es obligatorio'),
  company: z.string().min(2, 'La empresa es obligatoria'),
  email: z.string().email(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})
