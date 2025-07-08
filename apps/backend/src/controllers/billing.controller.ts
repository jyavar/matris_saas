import { IncomingMessage, ServerResponse} from 'http'
import { z } from 'zod'

import { billingService} from '../services/billing.service.js'
import { logAction} from '../services/logger.service.js'
import type { AuthenticatedUser, ControllerHandler, RequestBody } from '../types/express/index.js'
import { parseBody, parseParams, parseQuery} from '../utils/request.helper.js'
import { sendNotFound, sendUnauthorized} from '../utils/response.helper.js'
// Schemas
const createInvoiceSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  description: z.string().optional(),
  customer_id: z.string().optional(),
  due_date: z.string().optional(),
})

const updateInvoiceSchema = z.object({
  amount: z.number().positive().optional(),
  currency: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['paid', 'cancelled', 'pending']).optional(),
  due_date: z.string().optional(),
})

// Controller methods
export const getInvoices: ControllerHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const user = (req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const query = parseQuery(req.url || '')
    const { page, limit, offset } = getPaginationParams(query)
    
    const invoices = await billingService.getAllInvoices(user?.id)
    
    logAction('billing_invoices_retrieved', user?.id, { count: invoices.length })
    
    return sendSuccess(res, {
      data: invoices,
      pagination: { page, limit, total: invoices.length }
    })
  } catch {
    return sendError(res, 'Failed to retrieve invoices', 500)
  }
}

export const getInvoiceById: ControllerHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const user = (req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(req.url || '', '/api/invoices/:id')
    const invoiceId = params.id

    if (!invoiceId) {
      return sendError(res, 'Invoice ID is required', 400)
    }

    const invoice = await billingService.getInvoiceById(invoiceId)
    
    if (!invoice) {
      return sendNotFound(res, 'Invoice not found')
    }

    logAction('billing_invoice_retrieved', user?.id, { invoice_id: invoiceId })
    
    return sendSuccess(res, invoice)
  } catch {
    return sendError(res, 'Failed to retrieve invoice', 500)
  }
}

export const createInvoice: ControllerHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const user = (req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const body = await parseBody(req) as RequestBody
    const validatedData = createInvoiceSchema.parse(body)

    const invoice = await billingService.createInvoice({
      customer_id: user?.id,
      amount: validatedData.amount,
      currency: validatedData.currency,
      description: validatedData.description,
      due_date: validatedData.due_date,
    })

    if (!invoice) {
      return sendError(res, 'Failed to create invoice', 500)
    }

    logAction('billing_invoice_created', user?.id, { 
      invoice_id: invoice.id,
      amount: validatedData.amount 
    })
    
    return sendCreated(res, invoice)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Invalid invoice data', 400, error.errors)
    }
    return sendError(res, 'Failed to create invoice', 500)
  }
}

export const updateInvoice: ControllerHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const user = (req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(req.url || '', '/api/invoices/:id')
    const invoiceId = params.id
    const body = await parseBody(req) as RequestBody

    if (!invoiceId) {
      return sendError(res, 'Invoice ID is required', 400)
    }

    const validatedData = updateInvoiceSchema.parse(body)

    const invoice = await billingService.updateInvoice(invoiceId, validatedData)
    
    if (!invoice) {
      return sendNotFound(res, 'Invoice not found')
    }

    logAction('billing_invoice_updated', user?.id, { 
      invoice_id: invoiceId,
      changes: Object.keys(validatedData) 
    })
    
    return sendSuccess(res, invoice)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Invalid invoice data', 400, error.errors)
    }
    return sendError(res, 'Failed to update invoice', 500)
  }
}

export const deleteInvoice: ControllerHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const user = (req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(req.url || '', '/api/invoices/:id')
    const invoiceId = params.id

    if (!invoiceId) {
      return sendError(res, 'Invoice ID is required', 400)
    }

    const deleted = await billingService.deleteInvoice(invoiceId)
    
    if (!deleted) {
      return sendNotFound(res, 'Invoice not found')
    }

    logAction('billing_invoice_deleted', user?.id, { invoice_id: invoiceId })
    
    return sendSuccess(res, { message: 'Invoice deleted successfully' })
  } catch {
    return sendError(res, 'Failed to delete invoice', 500)
  }
}

// Helper function
const getPaginationParams = (query: Record<string, string>) => {
  const page = parseInt(query.page || '1', 10)
  const limit = parseInt(query.limit || '10', 10)
  
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)),
    offset: (page - 1) * limit,
  }
}
