import { Request, Response } from 'express';
import { BillingService } from '../services/billing.service';
import { z } from 'zod';

const checkoutSchema = z.object({
  priceId: z.string().min(1, 'priceId requerido'),
  successUrl: z.string().url('successUrl debe ser una URL válida'),
  cancelUrl: z.string().url('cancelUrl debe ser una URL válida'),
});

export class BillingController {
  static async createCheckoutSession(req: Request, res: Response) {
    // Validar input y obtener userId real
    const parse = checkoutSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Payload inválido', details: parse.error.errors });
    }
    const { priceId, successUrl, cancelUrl } = parse.data;
    const userId = req.user?.id || 'user_dummy';
    try {
      const session = await BillingService.createCheckoutSession({ userId, priceId, successUrl, cancelUrl });
      res.json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: 'Error creando sesión de pago', details: error });
    }
  }

  static async handleWebhook(req: Request, res: Response) {
    // TODO: Implementar lógica real de manejo de webhooks
    try {
      await BillingService.handleWebhook(req.body);
      res.status(200).send('ok');
    } catch (error) {
      res.status(400).json({ error: 'Error en webhook', details: error });
    }
  }

  static async getSubscriptionStatus(req: Request, res: Response) {
    // TODO: Obtener userId real
    const userId = req.user?.id || 'user_dummy';
    try {
      const status = await BillingService.getSubscriptionStatus(userId);
      res.json({ status });
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo estado de suscripción', details: error });
    }
  }
} 