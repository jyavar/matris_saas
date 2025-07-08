import { Injectable, Logger } from '@nestjs/common';

export interface SecurityEvent {
  type:
    | 'AUTH_SUCCESS'
    | 'AUTH_FAILURE'
    | 'ACCOUNT_LOCKED'
    | 'PASSWORD_RESET'
    | 'SUSPICIOUS_ACTIVITY';
  userId?: string;
  email?: string;
  ip?: string;
  userAgent?: string;
  timestamp: Date;
  details?: Record<string, any>;
}

@Injectable()
export class SecurityLoggerService {
  private readonly logger = new Logger('SecurityLogger');

  logAuthSuccess(
    userId: string,
    email: string,
    ip?: string,
    userAgent?: string,
  ): void {
    const event: SecurityEvent = {
      type: 'AUTH_SUCCESS',
      userId,
      email,
      ip,
      userAgent,
      timestamp: new Date(),
    };

    this.logger.log(`Authentication successful for user ${email}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logAuthFailure(
    email: string,
    ip?: string,
    userAgent?: string,
    reason?: string,
  ): void {
    const event: SecurityEvent = {
      type: 'AUTH_FAILURE',
      email,
      ip,
      userAgent,
      timestamp: new Date(),
      details: { reason },
    };

    this.logger.warn(`Authentication failed for ${email}: ${reason}`, {
      ...event,
      severity: 'WARNING',
    });
  }

  logAccountLocked(email: string, ip?: string, userAgent?: string): void {
    const event: SecurityEvent = {
      type: 'ACCOUNT_LOCKED',
      email,
      ip,
      userAgent,
      timestamp: new Date(),
    };

    this.logger.error(
      `Account locked for ${email} due to multiple failed attempts`,
      {
        ...event,
        severity: 'ERROR',
      },
    );
  }

  logPasswordReset(email: string, ip?: string, userAgent?: string): void {
    const event: SecurityEvent = {
      type: 'PASSWORD_RESET',
      email,
      ip,
      userAgent,
      timestamp: new Date(),
    };

    this.logger.log(`Password reset requested for ${email}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logSuspiciousActivity(
    description: string,
    userId?: string,
    email?: string,
    ip?: string,
    userAgent?: string,
    details?: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'SUSPICIOUS_ACTIVITY',
      userId,
      email,
      ip,
      userAgent,
      timestamp: new Date(),
      details: { description, ...details },
    };

    this.logger.error(`Suspicious activity detected: ${description}`, {
      ...event,
      severity: 'CRITICAL',
    });
  }
}
