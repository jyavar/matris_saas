// Configuración de billing

export const BILLING_PLANS = {
  free: {
    name: 'Free',
    priceId: process.env.STRIPE_FREE_PLAN_ID || 'plan_free',
    price: 0,
  },
  pro: {
    name: 'Pro',
    priceId: process.env.STRIPE_PRO_PLAN_ID || 'plan_pro',
    price: 20,
  },
  elite: {
    name: 'Elite',
    priceId: process.env.STRIPE_ELITE_PLAN_ID || 'plan_elite',
    price: 99,
  },
}; 