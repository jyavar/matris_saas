import { Injectable } from '@nestjs/common';

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  message: string;
  timestamp: string;
  uptime: number;
  version: string;
}

@Injectable()
export class HealthService {
  getHealthStatus(): HealthStatus {
    return {
      status: 'healthy',
      message: 'STRATO Engine is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
    };
  }

  async checkDatabaseHealth(): Promise<boolean> {
    // Aquí se podría verificar la conexión a Supabase
    // Por ahora retornamos true como simulación
    return true;
  }

  async checkExternalServices(): Promise<Record<string, boolean>> {
    // Verificar servicios externos (Stripe, OpenAI, etc.)
    return {
      supabase: true,
      stripe: true,
      openai: true,
      resend: true,
      posthog: true,
    };
  }
}
