import {
  cancelSubscription,
  createCustomer,
  createInvoice,
  createSubscription,
  deleteInvoice,
  getCustomerById,
  getCustomerSubscriptions,
  getInvoiceById,
  getInvoices,
  getSubscription,
  updateInvoice,
  updateSubscription,
} from '../controllers/billing.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const billingRoutes: RouteDefinition[] = [
  // Invoice management
  { method: 'GET', path: '/invoices', handler: getInvoices },
  { method: 'GET', path: '/invoices/:id', handler: getInvoiceById },
  { method: 'POST', path: '/invoices', handler: createInvoice },
  { method: 'PATCH', path: '/invoices/:id', handler: updateInvoice },
  { method: 'DELETE', path: '/invoices/:id', handler: deleteInvoice },
  
  // Customer management
  { method: 'POST', path: '/customers', handler: createCustomer },
  { method: 'GET', path: '/customers/:id', handler: getCustomerById },
  { method: 'GET', path: '/customers/:customerId/subscriptions', handler: getCustomerSubscriptions },
  
  // Subscription management
  { method: 'POST', path: '/subscriptions', handler: createSubscription },
  { method: 'GET', path: '/subscriptions/:id', handler: getSubscription },
  { method: 'PATCH', path: '/subscriptions/:id', handler: updateSubscription },
  { method: 'DELETE', path: '/subscriptions/:id', handler: cancelSubscription },
]
