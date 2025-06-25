import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY no está definida en el entorno');
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-05-28.basil',
}); 