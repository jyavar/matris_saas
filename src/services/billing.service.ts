import { stripe } from './stripe.service';
import type { Request } from 'express';

// Simulación: almacenamiento en memoria de customerId por userId (simula una DB)
const userStripeCustomers: Record<string, string> = {};
// Simulación: almacenamiento de suscripciones por customerId
const subscriptionsDB: Record<string, any> = {};

export class BillingService {
  // Busca o crea un cliente de Stripe para el usuario
  static async findOrCreateStripeCustomer(userId: string): Promise<string> {
    let customerId = userStripeCustomers[userId];
    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: { userId },
      });
      customerId = customer.id;
      userStripeCustomers[userId] = customerId;
    }
    return customerId;
  }

  // Crea una sesión de pago de Stripe
  static async createCheckoutSession(params: { userId: string; priceId: string; successUrl: string; cancelUrl: string }) {
    const customerId = await BillingService.findOrCreateStripeCustomer(params.userId);
    // Crear la sesión de pago
    return stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: params.priceId,
          quantity: 1,
        },
      ],
      customer: customerId,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    });
  }

  // Valida el estado de la suscripción de un usuario
  static async getSubscriptionStatus(userId: string) {
    const customerId = userStripeCustomers[userId];
    if (!customerId) return null;
    const sub = subscriptionsDB[customerId];
    if (!sub) return null;
    return {
      id: sub.id,
      status: sub.status,
      current_period_end: sub.current_period_end,
      cancel_at_period_end: sub.cancel_at_period_end,
      plan: sub.items.data[0]?.price.nickname || sub.items.data[0]?.price.id,
    };
  }

  // Maneja webhooks de Stripe
  static async handleWebhook(req: Request) {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET no definido');
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
    } catch (err) {
      throw new Error('Firma de webhook inválida');
    }
    // Dispatcher de eventos
    switch (event.type) {
      case 'checkout.session.completed': {
        // Puedes usar event.data.object para obtener info
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        subscriptionsDB[subscription.customer] = subscription;
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        delete subscriptionsDB[subscription.customer];
        break;
      }
      default:
        // Otros eventos ignorados
        break;
    }
    return { received: true };
  }
} 