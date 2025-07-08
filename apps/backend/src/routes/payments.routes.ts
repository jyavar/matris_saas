import { paymentsController } from '../controllers/payments.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'

export const paymentsRoutes = [
  {
    method: 'POST',
    path: '/create-payment-intent',
    middlewares: [authMiddleware],
    handler: handleAsync(paymentsController.createPaymentIntent),
  },
  {
    method: 'POST',
    path: '/confirm-payment',
    middlewares: [authMiddleware],
    handler: handleAsync(paymentsController.confirmPayment),
  },
  {
    method: 'GET',
    path: '/payment-methods',
    middlewares: [authMiddleware],
    handler: handleAsync(paymentsController.getPaymentMethods),
  },
  {
    method: 'POST',
    path: '/add-payment-method',
    middlewares: [authMiddleware],
    handler: handleAsync(paymentsController.addPaymentMethod),
  },
  {
    method: 'DELETE',
    path: '/payment-methods/:id',
    middlewares: [authMiddleware],
    handler: handleAsync(paymentsController.removePaymentMethod),
  },
]
