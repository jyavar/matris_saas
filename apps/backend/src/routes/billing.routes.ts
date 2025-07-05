import { billingController } from '../controllers/billing.controller.js'

export const billingRoutes = [
  { method: 'GET', path: '/invoices', handler: billingController.getAllInvoices },
  { method: 'GET', path: '/invoices/:id', handler: billingController.getInvoiceById },
  { method: 'POST', path: '/invoices', handler: billingController.createInvoice },
  { method: 'PATCH', path: '/invoices/:id', handler: billingController.updateInvoice },
  { method: 'DELETE', path: '/invoices/:id', handler: billingController.deleteInvoice },
]
