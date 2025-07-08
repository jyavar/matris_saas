import {
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  getInvoices,
  updateInvoice,
} from '../controllers/billing.controller.js'

export const billingRoutes = [
  { method: 'GET', path: '/invoices', handler: getInvoices },
  { method: 'GET', path: '/invoices/:id', handler: getInvoiceById },
  { method: 'POST', path: '/invoices', handler: createInvoice },
  { method: 'PATCH', path: '/invoices/:id', handler: updateInvoice },
  { method: 'DELETE', path: '/invoices/:id', handler: deleteInvoice },
]
