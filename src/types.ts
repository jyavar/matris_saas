// Tipos base para billing

export type BillingPlan = 'free' | 'pro' | 'elite';

export interface Subscription {
  id: string;
  userId: string;
  plan: BillingPlan;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  currentPeriodEnd: number;
}

export interface StripeWebhookEvent {
  id: string;
  type: string;
  data: any;
} 