import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ThrottlerException } from '@nestjs/throttler';
import { Request } from 'express';

import { SecurityLoggerService } from '../../security/security-logger.service';

// Extender el tipo Request para incluir user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    permissions?: string[];
  };
}

// Configuración de seguridad ML
const ML_SECURITY_CONFIG = {
  MAX_PAYLOAD_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_PREDICTION_INPUT_SIZE: 1024 * 1024, // 1MB
  MAX_TRAINING_DURATION: 24 * 60 * 60 * 1000, // 24 horas
  ALLOWED_MODEL_TYPES: ['classification', 'regression', 'clustering', 'nlp'],
  ALLOWED_DATASET_FORMATS: ['csv', 'json', 'parquet'],
  RATE_LIMITS: {
    PREDICTION: { requests: 100, window: 60_000 }, // 100 requests/min
    TRAINING: { requests: 10, window: 60_000 }, // 10 requests/min
    DEPLOYMENT: { requests: 5, window: 60_000 }, // 5 requests/min
  },
};

// Patrones sospechosos para detectar
const SUSPICIOUS_PATTERNS = [
  /\.\.\/\.\.\/\.\.\//, // Path traversal
  /<script[^>]*>.*<\/script>/i, // XSS
  /union\s+select/i, // SQL injection
  /eval\s*\(/i, // Code injection
  /javascript:/i, // JavaScript protocol
];

@Injectable()
export class MLSecurityGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly securityLogger: SecurityLoggerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const startTime = Date.now();

    try {
      // 1. Validación de autenticación
      if (!request.user) {
        this.securityLogger.logAuthFailure(
          'anonymous',
          request.ip || 'unknown',
          request.url || '/',
          'No authentication provided',
        );
        throw new UnauthorizedException('Authentication required for ML operations');
      }

      // 2. Validación de headers de seguridad
      this.validateSecurityHeaders(request);

      // 3. Rate limiting específico para ML
      await this.applyRateLimiting(request);

      // 4. Validación de payload para operaciones ML
      this.validateMLPayload(request);

      // 5. Detección de patrones sospechosos
      this.detectSuspiciousPatterns(request);

      // 6. Verificación de permisos ML
      const requiredPermission = this.reflector.get<string>('mlPermissions', context.getHandler());
      if (requiredPermission) {
        const hasPermission = await this.checkMLPermission(request.user, requiredPermission);
        if (!hasPermission) {
          this.securityLogger.logPermissionDenied(
            request.user.id,
            request.ip || 'unknown',
            request.url || '/',
            requiredPermission,
          );
          throw new ForbiddenException(`Insufficient permissions: ${requiredPermission}`);
        }
      }

      // 7. Verificación de acceso a recursos ML
      const resourceId = this.extractMLResourceId(request);
      if (resourceId) {
        const hasAccess = await this.checkMLResourceAccess(request.user, resourceId);
        if (!hasAccess) {
          this.securityLogger.logResourceAccessDenied(
            request.user.id,
            request.ip || 'unknown',
            request.url || '/',
            resourceId,
          );
          throw new ForbiddenException(`Access denied to ML resource: ${resourceId}`);
        }
      }

      // 8. Auditoría de acceso ML exitoso
      const processingTime = Date.now() - startTime;
      this.securityLogger.logMLAccessGranted(
        request.user.id,
        request.ip || 'unknown',
        request.url || '/',
        request.method,
        processingTime,
      );

      return true;
    } catch (error) {
      // Log del error de seguridad
      this.securityLogger.logSecurityError(
        request.user?.id || 'anonymous',
        request.ip || 'unknown',
        request.url || '/',
        error.message,
      );
      throw error;
    }
  }

  private validateSecurityHeaders(request: AuthenticatedRequest): void {
    const { method, headers } = request;

    // Validar Content-Type para POST/PUT/PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const contentType = headers['content-type'];
      if (!contentType || !contentType.includes('application/json')) {
        this.securityLogger.logSecurityViolation(
          request.user?.id || 'anonymous',
          request.ip || 'unknown',
          request.url || '/',
          'Invalid Content-Type for ML operation',
        );
        throw new BadRequestException('Content-Type must be application/json for ML operations');
      }
    }

    // Validar tamaño de payload
    const contentLength = parseInt(headers['content-length'] || '0');
    if (contentLength > ML_SECURITY_CONFIG.MAX_PAYLOAD_SIZE) {
      this.securityLogger.logSecurityViolation(
        request.user?.id || 'anonymous',
        request.ip || 'unknown',
        request.url || '/',
        'Payload size exceeds limit',
      );
      throw new BadRequestException('Payload size exceeds maximum allowed limit');
    }

    // Validar User-Agent
    const userAgent = headers['user-agent'];
    if (userAgent && this.containsSuspiciousPattern(userAgent)) {
      this.securityLogger.logSuspiciousActivity(
        'Suspicious User-Agent detected',
        request.user?.id || 'anonymous',
        undefined,
        request.ip || 'unknown',
        undefined,
        { userAgent },
      );
      throw new ForbiddenException('Suspicious request detected');
    }
  }

  private async applyRateLimiting(request: AuthenticatedRequest): Promise<void> {
    const { url, method } = request;
    
    // Determinar el tipo de operación ML
    let limitType = 'general';
    if (url?.includes('/predict')) limitType = 'prediction';
    else if (url?.includes('/train')) limitType = 'training';
    else if (url?.includes('/deploy')) limitType = 'deployment';

    // Simular rate limiting (en producción usar Redis o similar)
    const key = `${request.user?.id || 'anonymous'}:${limitType}`;
    const currentCount = this.getRateLimitCount(key);
    
    const limit = ML_SECURITY_CONFIG.RATE_LIMITS[limitType.toUpperCase() as keyof typeof ML_SECURITY_CONFIG.RATE_LIMITS] || 
                  { requests: 100, window: 60_000 };

    if (currentCount >= limit.requests) {
      this.securityLogger.logRateLimitExceeded(
        request.user?.id || 'anonymous',
        request.ip || 'unknown',
        request.url || '/',
        limitType,
      );
      throw new ThrottlerException(`Rate limit exceeded for ${limitType} operations`);
    }

    this.incrementRateLimitCount(key);
  }

  private validateMLPayload(request: AuthenticatedRequest): void {
    const { method, body, url } = request;

    if (!['POST', 'PUT', 'PATCH'].includes(method) || !body) {
      return;
    }

    // Validar payload específico para predicciones
    if (url?.includes('/predict')) {
      if (!body.model_id || !body.input_data) {
        this.securityLogger.logValidationFailure(
          request.user?.id || 'anonymous',
          request.ip || 'unknown',
          request.url || '/',
          ['Missing required fields: model_id, input_data'],
        );
        throw new BadRequestException('Prediction payload must include model_id and input_data');
      }

      // Validar tamaño de input_data
      const inputSize = JSON.stringify(body.input_data).length;
      if (inputSize > ML_SECURITY_CONFIG.MAX_PREDICTION_INPUT_SIZE) {
        throw new BadRequestException('Input data size exceeds maximum allowed limit');
      }
    }

    // Validar payload específico para entrenamiento
    if (url?.includes('/train')) {
      if (!body.model_id || !body.dataset_id) {
        this.securityLogger.logValidationFailure(
          request.user?.id || 'anonymous',
          request.ip || 'unknown',
          request.url || '/',
          ['Missing required fields: model_id, dataset_id'],
        );
        throw new BadRequestException('Training payload must include model_id and dataset_id');
      }
    }
  }

  private detectSuspiciousPatterns(request: AuthenticatedRequest): void {
    const { url, headers } = request;

    // Detectar patrones sospechosos en URL
    if (url && this.containsSuspiciousPattern(url)) {
      this.securityLogger.logSuspiciousActivity(
        'Suspicious URL pattern detected',
        request.user?.id || 'anonymous',
        undefined,
        request.ip || 'unknown',
        undefined,
        { url },
      );
      throw new ForbiddenException('Suspicious request pattern detected');
    }

    // Detectar patrones sospechosos en headers
    for (const [key, value] of Object.entries(headers)) {
      if (typeof value === 'string' && this.containsSuspiciousPattern(value)) {
        this.securityLogger.logSuspiciousActivity(
          'Suspicious header pattern detected',
          request.user?.id || 'anonymous',
          undefined,
          request.ip || 'unknown',
          undefined,
          { header: key, value },
        );
        throw new ForbiddenException('Suspicious request pattern detected');
      }
    }
  }

  private containsSuspiciousPattern(text: string): boolean {
    return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(text));
  }

  private async checkMLPermission(user: any, permission: string): Promise<boolean> {
    // Simular verificación de permisos (en producción usar base de datos)
    const userPermissions = user.permissions || [];
    const userRole = user.role;

    // Permisos específicos de ML
    const mlPermissions = {
      'ml:read': ['user', 'admin', 'ml_user'],
      'ml:write': ['admin', 'ml_user'],
      'ml:train': ['admin', 'ml_trainer'],
      'ml:deploy': ['admin', 'ml_deployer'],
      'ml:admin': ['admin'],
    };

    // Verificar si el usuario tiene el permiso específico
    if (userPermissions.includes(permission)) {
      return true;
    }

    // Verificar si el rol del usuario tiene el permiso
    const allowedRoles = mlPermissions[permission as keyof typeof mlPermissions];
    if (allowedRoles && allowedRoles.includes(userRole)) {
      return true;
    }

    // Los admins tienen todos los permisos
    if (userRole === 'admin') {
      return true;
    }

    return false;
  }

  private extractMLResourceId(request: AuthenticatedRequest): string | null {
    const { url } = request;
    
    // Extraer ID de modelo de la URL
    const modelMatch = url?.match(/\/models\/([^\/]+)/);
    if (modelMatch) return modelMatch[1];

    // Extraer ID de dataset de la URL
    const datasetMatch = url?.match(/\/datasets\/([^\/]+)/);
    if (datasetMatch) return datasetMatch[1];

    // Extraer ID de entrenamiento de la URL
    const trainingMatch = url?.match(/\/training\/([^\/]+)/);
    if (trainingMatch) return trainingMatch[1];

    return null;
  }

  private async checkMLResourceAccess(user: any, resourceId: string): Promise<boolean> {
    // Simular verificación de acceso a recursos (en producción usar base de datos)
    // Por ahora, permitir acceso si el usuario está autenticado
    return !!user.id;
  }

  // Simulación de rate limiting (en producción usar Redis)
  private rateLimitStore = new Map<string, { count: number; resetTime: number }>();

  private getRateLimitCount(key: string): number {
    const now = Date.now();
    const record = this.rateLimitStore.get(key);
    
    if (!record || now > record.resetTime) {
      return 0;
    }
    
    return record.count;
  }

  private incrementRateLimitCount(key: string): void {
    const now = Date.now();
    const record = this.rateLimitStore.get(key);
    const resetTime = now + 60_000; // 1 minuto
    
    if (!record || now > record.resetTime) {
      this.rateLimitStore.set(key, { count: 1, resetTime });
    } else {
      record.count++;
    }
  }
} 