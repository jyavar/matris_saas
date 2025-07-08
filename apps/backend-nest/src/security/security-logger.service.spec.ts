import { Test, TestingModule } from '@nestjs/testing';
import { SecurityLoggerService } from './security-logger.service';

describe('SecurityLoggerService', () => {
  let service: SecurityLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecurityLoggerService],
    }).compile();

    service = module.get<SecurityLoggerService>(SecurityLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log authentication success', () => {
    const logSpy = jest.spyOn(service['logger'], 'log');

    service.logAuthSuccess(
      'user123',
      'test@example.com',
      '192.168.1.1',
      'Mozilla/5.0',
    );

    expect(logSpy).toHaveBeenCalledWith(
      'Authentication successful for user test@example.com',
      expect.objectContaining({
        type: 'AUTH_SUCCESS',
        userId: 'user123',
        email: 'test@example.com',
        ip: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        severity: 'INFO',
      }),
    );
  });

  it('should log authentication failure', () => {
    const warnSpy = jest.spyOn(service['logger'], 'warn');

    service.logAuthFailure(
      'test@example.com',
      '192.168.1.1',
      'Mozilla/5.0',
      'Invalid credentials',
    );

    expect(warnSpy).toHaveBeenCalledWith(
      'Authentication failed for test@example.com: Invalid credentials',
      expect.objectContaining({
        type: 'AUTH_FAILURE',
        email: 'test@example.com',
        ip: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        severity: 'WARNING',
        details: { reason: 'Invalid credentials' },
      }),
    );
  });

  it('should log account lockout', () => {
    const errorSpy = jest.spyOn(service['logger'], 'error');

    service.logAccountLocked('test@example.com', '192.168.1.1', 'Mozilla/5.0');

    expect(errorSpy).toHaveBeenCalledWith(
      'Account locked for test@example.com due to multiple failed attempts',
      expect.objectContaining({
        type: 'ACCOUNT_LOCKED',
        email: 'test@example.com',
        ip: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        severity: 'ERROR',
      }),
    );
  });

  it('should log suspicious activity', () => {
    const errorSpy = jest.spyOn(service['logger'], 'error');

    service.logSuspiciousActivity(
      'Multiple failed login attempts from same IP',
      'user123',
      'test@example.com',
      '192.168.1.1',
      'Mozilla/5.0',
      { attemptCount: 10 },
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Suspicious activity detected: Multiple failed login attempts from same IP',
      expect.objectContaining({
        type: 'SUSPICIOUS_ACTIVITY',
        userId: 'user123',
        email: 'test@example.com',
        ip: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        severity: 'CRITICAL',
        details: {
          description: 'Multiple failed login attempts from same IP',
          attemptCount: 10,
        },
      }),
    );
  });
});
