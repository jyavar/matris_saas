import { Router } from 'express';
import { BillingController } from '../controllers/billing.controller';

const router = Router();

router.post('/checkout', BillingController.createCheckoutSession);
router.post('/webhook', BillingController.handleWebhook);
router.get('/subscription', BillingController.getSubscriptionStatus);

export default router; 