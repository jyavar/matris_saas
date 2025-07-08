import {
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  getInvoices,
  updateInvoice,
} from '../controllers/billing.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const billingRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/invoices', handler: getInvoices },
  { method: 'GET', path: '/invoices/:id', handler: getInvoiceById },
  { method: 'POST', path: '/invoices', handler: createInvoice },
  { method: 'PATCH', path: '/invoices/:id', handler: updateInvoice },
  { method: 'DELETE', path: '/invoices/:id', handler: deleteInvoice },
]
