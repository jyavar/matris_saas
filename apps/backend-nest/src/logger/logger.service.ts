import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { pino } from 'pino';

export interface LogActionDetails {
  [key: string]: unknown;
}

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger = pino({
    level:
      process.env.NODE_ENV === 'test'
        ? 'error'
        : (process.env.LOG_LEVEL ?? 'info'),
    ...(process.env.NODE_ENV === 'test'
      ? {}
      : {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          },
        }),
  });

  log(message: string, context?: string): void {
    this.logger.info({ context }, message);
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error({ context, trace }, message);
  }

  warn(message: string, context?: string): void {
    this.logger.warn({ context }, message);
  }

  debug(message: string, context?: string): void {
    this.logger.debug({ context }, message);
  }

  verbose(message: string, context?: string): void {
    this.logger.info({ context }, message);
  }

  logAction(
    action: string,
    userId: string,
    details: LogActionDetails = {},
  ): void {
    if (!userId || userId === '') {
      throw new Error('userId is required');
    }
    this.logger.info({ action, userId, ...details }, `Action: ${action}`);
    // Simulación de integración con PostHog
    if (process.env.NODE_ENV !== 'test' && process.env.POSTHOG_API_KEY) {
      // Aquí se podría integrar PostHog real
      this.logger.info(
        { action, userId, ...details },
        '[Simulación] Evento enviado a PostHog',
      );
    }
  }
}
