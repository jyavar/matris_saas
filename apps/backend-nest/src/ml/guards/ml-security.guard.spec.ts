import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { MLSecurityGuard } from './ml-security.guard';
import { SecurityLoggerService } from '../../security/security-logger.service';

describe('MLSecurityGuard', () => {
  let guard: MLSecurityGuard;
  let reflector: Reflector;
  let securityLogger: SecurityLoggerService;

  const mockExecutionContext = {
    switchToHttp: () => ({
      getRequest: () => ({
        user: {
          id: 'test-user',
          email: 'test@example.com',
          role: 'ml_user',
        },
        ip: '127.0.0.1',
        url: '/api/ml/health',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'content-length': '100',
        },
        body: {},
      }),
    }),
    getHandler: () => ({}),
  } as ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MLSecurityGuard,
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: SecurityLoggerService,
          useValue: {
            logAuthFailure: jest.fn(),
            logSecurityViolation: jest.fn(),
            logRateLimitExceeded: jest.fn(),
            logValidationFailure: jest.fn(),
            logPermissionDenied: jest.fn(),
            logResourceAccessDenied: jest.fn(),
            logMLAccessGranted: jest.fn(),
            logSecurityError: jest.fn(),
            logSuspiciousActivity: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<MLSecurityGuard>(MLSecurityGuard);
    reflector = module.get<Reflector>(Reflector);
    securityLogger = module.get<SecurityLoggerService>(SecurityLoggerService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should allow access for authenticated user with valid request', async () => {
      jest.spyOn(reflector, 'get').mockReturnValue(undefined);

      const result = await guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(securityLogger.logMLAccessGranted).toHaveBeenCalled();
    });

    it('should deny access without authentication', async () => {
      const contextWithoutUser = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: null,
            ip: '127.0.0.1',
            url: '/api/ml/health',
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
          }),
        }),
        getHandler: () => ({}),
      } as ExecutionContext;

      await expect(guard.canActivate(contextWithoutUser)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(securityLogger.logAuthFailure).toHaveBeenCalled();
    });

    it('should deny access with invalid security headers', async () => {
      const contextWithInvalidHeaders = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: 'test-user',
              email: 'test@example.com',
              role: 'ml_user',
            },
            ip: '127.0.0.1',
            url: '/api/ml/health',
            method: 'POST',
            headers: {
              'content-type': 'text/plain', // Invalid for POST
            },
            body: {},
          }),
        }),
        getHandler: () => ({}),
      } as ExecutionContext;

      await expect(guard.canActivate(contextWithInvalidHeaders)).rejects.toThrow(
        BadRequestException,
      );

      expect(securityLogger.logSecurityViolation).toHaveBeenCalled();
    });

    it('should deny access with oversized payload', async () => {
      const contextWithOversizedPayload = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: 'test-user',
              email: 'test@example.com',
              role: 'ml_user',
            },
            ip: '127.0.0.1',
            url: '/api/ml/health',
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'content-length': '20000000', // 20MB
            },
            body: {},
          }),
        }),
        getHandler: () => ({}),
      } as ExecutionContext;

      await expect(guard.canActivate(contextWithOversizedPayload)).rejects.toThrow(
        BadRequestException,
      );

      expect(securityLogger.logSecurityViolation).toHaveBeenCalled();
    });

    it('should detect suspicious patterns in URL', async () => {
      const contextWithSuspiciousUrl = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: 'test-user',
              email: 'test@example.com',
              role: 'ml_user',
            },
            ip: '127.0.0.1',
            url: '/api/ml/predict/../../../etc/passwd',
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
            body: {},
          }),
        }),
        getHandler: () => ({}),
      } as ExecutionContext;

      await expect(guard.canActivate(contextWithSuspiciousUrl)).rejects.toThrow(
        ForbiddenException,
      );

      expect(securityLogger.logSuspiciousActivity).toHaveBeenCalled();
    });

    it('should detect XSS attempts in user-agent', async () => {
      const contextWithXSSAttempt = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: 'test-user',
              email: 'test@example.com',
              role: 'ml_user',
            },
            ip: '127.0.0.1',
            url: '/api/ml/health',
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'user-agent': '<script>alert("xss")</script>',
            },
            body: {},
          }),
        }),
        getHandler: () => ({}),
      } as ExecutionContext;

      await expect(guard.canActivate(contextWithXSSAttempt)).rejects.toThrow(
        ForbiddenException,
      );

      expect(securityLogger.logSuspiciousActivity).toHaveBeenCalled();
    });

    it('should apply rate limiting for prediction requests', async () => {
      const predictionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: 'test-user',
              email: 'test@example.com',
              role: 'ml_user',
            },
            ip: '127.0.0.1',
            url: '/api/ml/predict',
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: {
              model_id: 'model-123',
              input_data: { feature1: 1, feature2: 2 },
            },
          }),
        }),
        getHandler: () => ({}),
      } as ExecutionContext;

      // Primera request - debería pasar
      const result1 = await guard.canActivate(predictionContext);
      expect(result1).toBe(true);

      // Reset para el siguiente test
      jest.clearAllMocks();

      // Simular muchas requests rápidas
      for (let i = 0; i < 150; i++) {
        try {
          await guard.canActivate(predictionContext);
        } catch (error) {
          // Esperamos que eventualmente falle por rate limiting
          if (i > 100) {
            expect(error).toBeInstanceOf(ForbiddenException);
            expect(securityLogger.logRateLimitExceeded).toHaveBeenCalled();
            break;
          }
        }
      }
    });

    it('should check ML permissions when required', async () => {
      jest.spyOn(reflector, 'get').mockReturnValue('ml:train');

      const contextWithInsufficientPermissions = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: 'test-user',
              email: 'test@example.com',
              role: 'user', // No tiene permisos ML
            },
            ip: '127.0.0.1',
            url: '/api/ml/train',
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: {
              model_id: 'model-123',
              dataset_id: 'dataset-123',
            },
          }),
        }),
        getHandler: () => ({}),
      } as ExecutionContext;

      await expect(guard.canActivate(contextWithInsufficientPermissions)).rejects.toThrow(
        ForbiddenException,
      );

      expect(securityLogger.logPermissionDenied).toHaveBeenCalled();
    });

    it('should allow admin access to all permissions', async () => {
      jest.spyOn(reflector, 'get').mockReturnValue('ml:admin');

      const adminContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: 'admin-user',
              email: 'admin@example.com',
              role: 'admin',
            },
            ip: '127.0.0.1',
            url: '/api/ml/admin',
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
            body: {},
          }),
        }),
        getHandler: () => ({}),
      } as ExecutionContext;

      const result = await guard.canActivate(adminContext);

      expect(result).toBe(true);
      expect(securityLogger.logMLAccessGranted).toHaveBeenCalled();
    });

    it('should validate ML payload for POST requests', async () => {
      const contextWithInvalidPayload = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: 'test-user',
              email: 'test@example.com',
              role: 'ml_user',
            },
            ip: '127.0.0.1',
            url: '/api/ml/predict',
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: {}, // Payload inválido - falta model_id
          }),
        }),
        getHandler: () => ({}),
      } as ExecutionContext;

      await expect(guard.canActivate(contextWithInvalidPayload)).rejects.toThrow(
        BadRequestException,
      );

      expect(securityLogger.logValidationFailure).toHaveBeenCalled();
    });

    it('should check resource access for model operations', async () => {
      const contextWithModelResource = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: 'test-user',
              email: 'test@example.com',
              role: 'ml_user',
            },
            ip: '127.0.0.1',
            url: '/api/ml/models/model-123',
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
            body: {},
          }),
        }),
        getHandler: () => ({}),
      } as ExecutionContext;

      const result = await guard.canActivate(contextWithModelResource);

      expect(result).toBe(true);
      expect(securityLogger.logMLAccessGranted).toHaveBeenCalled();
    });

    it('should handle security errors gracefully', async () => {
      const contextWithError = {
        switchToHttp: () => {
          throw new Error('Unexpected error');
        },
        getClass: () => ({} as any),
        getHandler: () => ({} as any),
        getArgs: () => [],
        getArgByIndex: () => ({} as any),
        getType: () => 'http' as any,
        switchToRpc: () => ({} as any),
        switchToWs: () => ({} as any),
      } as ExecutionContext;

      await expect(guard.canActivate(contextWithError)).rejects.toThrow();

      expect(securityLogger.logSecurityError).toHaveBeenCalled();
    });
  });
}); 