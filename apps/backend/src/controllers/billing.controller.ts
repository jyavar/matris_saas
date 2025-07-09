import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { billingService, createCustomerSchema, createSubscriptionSchema, updateSubscriptionSchema } from '../services/billing.service.js'
import { logAction } from '../services/logger.service.js'
import type {
  AuthenticatedUser,
  ControllerHandler,
  RequestBody,
} from '../types/express/index.js'
import { parseBody, parseParams, parseQuery } from '../utils/request.helper.js'
import { sendCreated, sendError, sendNotFound, sendSuccess, sendUnauthorized } from '../utils/response.helper.js'

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
export const getInvoices: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const query = parseQuery(_req.url || '')
    const { page, limit } = getPaginationParams(query)

    const invoices = await billingService.getAllInvoices(user?.id)

    logAction('billing_invoices_retrieved', user?.id, {
      count: invoices.length,
    })

    return sendSuccess(res, {
      data: invoices,
      pagination: { page, limit, total: invoices.length },
    })
  } catch {
    return sendError(res, 'Failed to retrieve invoices', 500)
  }
}

export const getInvoiceById: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(_req.url || '', '/api/invoices/:id')
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

export const createInvoice: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const body = (await parseBody(_req)) as RequestBody
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
      amount: validatedData.amount,
    })

    return sendCreated(res, invoice)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Invalid invoice data', 400, error.errors)
    }
    return sendError(res, 'Failed to create invoice', 500)
  }
}

export const updateInvoice: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(_req.url || '', '/api/invoices/:id')
    const invoiceId = params.id
    const body = (await parseBody(_req)) as RequestBody

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
      changes: Object.keys(validatedData),
    })

    return sendSuccess(res, invoice)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Invalid invoice data', 400, error.errors)
    }
    return sendError(res, 'Failed to update invoice', 500)
  }
}

export const deleteInvoice: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(_req.url || '', '/api/invoices/:id')
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

// Customer management
export const createCustomer: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const body = (await parseBody(_req)) as RequestBody
    const validatedData = createCustomerSchema.parse(body)

    const customer = await billingService.createCustomer(validatedData)

    logAction('billing_customer_created', user?.id, {
      customer_id: customer.id,
      email: customer.email,
    })

    return sendCreated(res, customer)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Invalid customer data', 400, error.errors)
    }
    return sendError(res, 'Failed to create customer', 500)
  }
}

export const getCustomerById: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(_req.url || '', '/api/customers/:id')
    const customerId = params.id

    if (!customerId) {
      return sendError(res, 'Customer ID is required', 400)
    }

    const customer = await billingService.getCustomerById(customerId)

    if (!customer) {
      return sendNotFound(res, 'Customer not found')
    }

    logAction('billing_customer_retrieved', user?.id, { customer_id: customerId })

    return sendSuccess(res, customer)
  } catch {
    return sendError(res, 'Failed to retrieve customer', 500)
  }
}

// Subscription management
export const createSubscription: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const body = (await parseBody(_req)) as RequestBody
    const validatedData = createSubscriptionSchema.parse(body)

    const subscription = await billingService.createSubscription(validatedData)

    logAction('billing_subscription_created', user?.id, {
      subscription_id: subscription.id,
      customer_id: validatedData.customerId,
      price_id: validatedData.priceId,
    })

    return sendCreated(res, subscription)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Invalid subscription data', 400, error.errors)
    }
    return sendError(res, 'Failed to create subscription', 500)
  }
}

export const getSubscription: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(_req.url || '', '/api/subscriptions/:id')
    const subscriptionId = params.id

    if (!subscriptionId) {
      return sendError(res, 'Subscription ID is required', 400)
    }

    const subscription = await billingService.getSubscription(subscriptionId)

    if (!subscription) {
      return sendNotFound(res, 'Subscription not found')
    }

    logAction('billing_subscription_retrieved', user?.id, { subscription_id: subscriptionId })

    return sendSuccess(res, subscription)
  } catch {
    return sendError(res, 'Failed to retrieve subscription', 500)
  }
}

export const updateSubscription: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(_req.url || '', '/api/subscriptions/:id')
    const subscriptionId = params.id
    const body = (await parseBody(_req)) as RequestBody

    if (!subscriptionId) {
      return sendError(res, 'Subscription ID is required', 400)
    }

    const validatedData = updateSubscriptionSchema.parse(body)

    const subscription = await billingService.updateSubscription(subscriptionId, validatedData)

    logAction('billing_subscription_updated', user?.id, {
      subscription_id: subscriptionId,
      changes: Object.keys(validatedData),
    })

    return sendSuccess(res, subscription)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Invalid subscription data', 400, error.errors)
    }
    return sendError(res, 'Failed to update subscription', 500)
  }
}

export const cancelSubscription: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(_req.url || '', '/api/subscriptions/:id')
    const subscriptionId = params.id

    if (!subscriptionId) {
      return sendError(res, 'Subscription ID is required', 400)
    }

    await billingService.cancelSubscription(subscriptionId)

    logAction('billing_subscription_canceled', user?.id, { subscription_id: subscriptionId })

    return sendSuccess(res, { message: 'Subscription canceled successfully' })
  } catch {
    return sendError(res, 'Failed to cancel subscription', 500)
  }
}

export const getCustomerSubscriptions: ControllerHandler = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const user = (_req as { _user?: AuthenticatedUser })._user
    if (!user) {
      return sendUnauthorized(res, 'User not authenticated')
    }

    const params = parseParams(_req.url || '', '/api/customers/:customerId/subscriptions')
    const customerId = params.customerId

    if (!customerId) {
      return sendError(res, 'Customer ID is required', 400)
    }

    const subscriptions = await billingService.getCustomerSubscriptions(customerId)

    logAction('billing_customer_subscriptions_retrieved', user?.id, {
      customer_id: customerId,
      count: subscriptions.length,
    })

    return sendSuccess(res, subscriptions)
  } catch {
    return sendError(res, 'Failed to retrieve customer subscriptions', 500)
  }
}

// Helper function
const getPaginationParams = (query: Record<string, string>) => {
  const page = parseInt(query.page || '1', 10)
  const limit = parseInt(query.limit || '10', 10)

  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)),
  }
}
