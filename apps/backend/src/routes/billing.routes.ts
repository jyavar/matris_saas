import { Router } from 'express'

import { billingController } from '../controllers/billing.controller.js'

const router = Router()

router.get('/invoices', billingController.getAllInvoices)
router.get('/invoices/:id', billingController.getInvoiceById)
router.post('/invoices', billingController.createInvoice)
router.patch('/invoices/:id', billingController.updateInvoice)
router.delete('/invoices/:id', billingController.deleteInvoice)

export default router
