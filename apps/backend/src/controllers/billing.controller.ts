import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import {
  createInvoiceSchema,
  todoIdParamSchema,
  updateInvoiceSchema,
} from '../lib/schemas.js'
import { billingService } from '../services/billing.service.js'
import { ApiError } from '../utils/ApiError.js'

export const billingController = {
  async getAllInvoices(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const customerId = req.user.id
      const invoices = await billingService.getAllInvoices(customerId)
      res.json({ invoices })
    } catch (error) {
      next(error)
    }
  },

  async getInvoiceById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = todoIdParamSchema.parse(req.params)
      const customerId = req.user.id
      const invoice = await billingService.getInvoiceById(id)
      if (!invoice || invoice.customer_id !== customerId) {
        throw new ApiError(404, 'Invoice not found')
      }
      res.json(invoice)
    } catch (error) {
      next(error)
    }
  },

  async createInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      let validatedInvoice
      try {
        validatedInvoice = createInvoiceSchema.parse(req.body)
      } catch (zodError) {
        if (zodError instanceof ZodError) {
          throw new ApiError(
            400,
            zodError.errors?.[0]?.message || 'Invalid invoice data',
          )
        }
        throw zodError
      }
      const newInvoice = await billingService.createInvoice({
        ...validatedInvoice,
        customer_id: req.user.id,
      })
      res.status(201).json(newInvoice)
    } catch (error) {
      next(error)
    }
  },

  async updateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = todoIdParamSchema.parse(req.params)
      let validatedInvoice
      try {
        validatedInvoice = updateInvoiceSchema.parse(req.body)
      } catch (zodError) {
        if (zodError instanceof ZodError) {
          throw new ApiError(
            400,
            zodError.errors?.[0]?.message || 'Invalid invoice data',
          )
        }
        throw zodError
      }
      const updatedInvoice = await billingService.updateInvoice(
        id,
        validatedInvoice,
      )
      res.json(updatedInvoice)
    } catch (error) {
      next(error)
    }
  },

  async deleteInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = todoIdParamSchema.parse(req.params)
      await billingService.deleteInvoice(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}
