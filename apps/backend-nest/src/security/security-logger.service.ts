import { Injectable, Logger } from '@nestjs/common';

export interface SecurityEvent {
  type:
    | 'AUTH_SUCCESS'
    | 'AUTH_FAILURE'
    | 'ACCOUNT_LOCKED'
    | 'PASSWORD_RESET'
    | 'SUSPICIOUS_ACTIVITY'
    | 'ML_AUDIT'
    | 'ML_SECURITY_VIOLATION'
    | 'ML_RATE_LIMIT'
    | 'ML_VALIDATION_FAILURE'
    | 'ML_PERMISSION_DENIED'
    | 'ML_RESOURCE_ACCESS_DENIED';
  userId?: string;
  email?: string;
  ip?: string;
  userAgent?: string;
  timestamp: Date;
  details?: Record<string, unknown>;
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
    details?: Record<string, unknown>,
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

  // Métodos específicos para ML

  logMLAuditEvent(
    userId: string,
    eventType: string,
    operation: string,
    status: string,
    metadata: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType,
        operation,
        status,
        metadata,
      },
    };

    this.logger.log(`ML Audit: ${eventType} - ${operation} - ${status}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLModelEvent(
    userId: string,
    modelId: string,
    action: string,
    status: string,
    metadata: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'model',
        modelId,
        action,
        status,
        metadata,
      },
    };

    this.logger.log(`ML Model: ${action} - ${modelId} - ${status}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLDatasetEvent(
    userId: string,
    datasetId: string,
    action: string,
    status: string,
    metadata: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'dataset',
        datasetId,
        action,
        status,
        metadata,
      },
    };

    this.logger.log(`ML Dataset: ${action} - ${datasetId} - ${status}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLTrainingEvent(
    userId: string,
    trainingId: string,
    modelId: string,
    action: string,
    status: string,
    metadata: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'training',
        trainingId,
        modelId,
        action,
        status,
        metadata,
      },
    };

    this.logger.log(`ML Training: ${action} - ${trainingId} - ${status}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLPredictionEvent(
    userId: string,
    predictionId: string,
    modelId: string,
    action: string,
    status: string,
    metadata: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'prediction',
        predictionId,
        modelId,
        action,
        status,
        metadata,
      },
    };

    this.logger.log(`ML Prediction: ${action} - ${predictionId} - ${status}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLDeploymentEvent(
    userId: string,
    deploymentId: string,
    modelId: string,
    action: string,
    status: string,
    metadata: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'deployment',
        deploymentId,
        modelId,
        action,
        status,
        metadata,
      },
    };

    this.logger.log(`ML Deployment: ${action} - ${deploymentId} - ${status}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLUnauthorizedAccess(
    userId: string,
    resource: string,
    operation: string,
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_SECURITY_VIOLATION',
      userId,
      timestamp: new Date(),
      details: {
        violation: 'unauthorized_access',
        resource,
        operation,
        context,
      },
    };

    this.logger.warn(`ML Unauthorized Access: ${operation} on ${resource}`, {
      ...event,
      severity: 'WARNING',
    });
  }

  logMLSuspiciousActivity(
    userId: string,
    activity: string,
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_SECURITY_VIOLATION',
      userId,
      timestamp: new Date(),
      details: {
        violation: 'suspicious_activity',
        activity,
        context,
      },
    };

    this.logger.error(`ML Suspicious Activity: ${activity}`, {
      ...event,
      severity: 'CRITICAL',
    });
  }

  logMLSecurityError(
    userId: string,
    error: string,
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_SECURITY_VIOLATION',
      userId,
      timestamp: new Date(),
      details: {
        violation: 'security_error',
        error,
        context,
      },
    };

    this.logger.error(`ML Security Error: ${error}`, {
      ...event,
      severity: 'ERROR',
    });
  }

  logMLPerformanceMetrics(
    userId: string,
    metrics: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'performance_metrics',
        metrics,
      },
    };

    this.logger.log(`ML Performance Metrics for user ${userId}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLResourceUsage(
    userId: string,
    resourceType: string,
    usage: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'resource_usage',
        resourceType,
        usage,
      },
    };

    this.logger.log(`ML Resource Usage: ${resourceType} for user ${userId}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLConfigurationChange(
    userId: string,
    configType: string,
    changes: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'configuration_change',
        configType,
        changes,
      },
    };

    this.logger.log(`ML Configuration Change: ${configType} by user ${userId}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLBackupEvent(
    userId: string,
    action: 'backup' | 'restore',
    status: 'success' | 'failure',
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'backup',
        action,
        status,
        context,
      },
    };

    this.logger.log(`ML Backup: ${action} - ${status} by user ${userId}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLMaintenanceEvent(
    userId: string,
    action: string,
    status: 'success' | 'failure',
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'maintenance',
        action,
        status,
        context,
      },
    };

    this.logger.log(`ML Maintenance: ${action} - ${status} by user ${userId}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLIntegrationEvent(
    userId: string,
    service: string,
    action: string,
    status: 'success' | 'failure',
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'integration',
        service,
        action,
        status,
        context,
      },
    };

    this.logger.log(`ML Integration: ${service} - ${action} - ${status}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLComplianceEvent(
    userId: string,
    regulation: string,
    action: string,
    status: 'compliant' | 'non_compliant',
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'compliance',
        regulation,
        action,
        status,
        context,
      },
    };

    this.logger.log(`ML Compliance: ${regulation} - ${action} - ${status}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLPrivacyEvent(
    userId: string,
    action: string,
    dataType: string,
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'privacy',
        action,
        dataType,
        context,
      },
    };

    this.logger.log(`ML Privacy: ${action} - ${dataType} by user ${userId}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLBiasEvent(
    userId: string,
    modelId: string,
    biasType: string,
    severity: 'low' | 'medium' | 'high',
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_SECURITY_VIOLATION',
      userId,
      timestamp: new Date(),
      details: {
        violation: 'bias_detected',
        modelId,
        biasType,
        severity,
        context,
      },
    };

    this.logger.warn(`ML Bias Detected: ${biasType} - ${severity} in model ${modelId}`, {
      ...event,
      severity: 'WARNING',
    });
  }

  logMLDataDriftEvent(
    userId: string,
    modelId: string,
    driftType: string,
    severity: 'low' | 'medium' | 'high',
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_SECURITY_VIOLATION',
      userId,
      timestamp: new Date(),
      details: {
        violation: 'data_drift',
        modelId,
        driftType,
        severity,
        context,
      },
    };

    this.logger.warn(`ML Data Drift: ${driftType} - ${severity} in model ${modelId}`, {
      ...event,
      severity: 'WARNING',
    });
  }

  logMLModelVersionEvent(
    userId: string,
    modelId: string,
    version: string,
    action: string,
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'model_version',
        modelId,
        version,
        action,
        context,
      },
    };

    this.logger.log(`ML Model Version: ${action} - ${version} for model ${modelId}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLExperimentEvent(
    userId: string,
    experimentId: string,
    action: string,
    status: 'success' | 'failure',
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'experiment',
        experimentId,
        action,
        status,
        context,
      },
    };

    this.logger.log(`ML Experiment: ${action} - ${experimentId} - ${status}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLPipelineEvent(
    userId: string,
    pipelineId: string,
    action: string,
    status: 'success' | 'failure',
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'pipeline',
        pipelineId,
        action,
        status,
        context,
      },
    };

    this.logger.log(`ML Pipeline: ${action} - ${pipelineId} - ${status}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLMonitoringEvent(
    userId: string,
    modelId: string,
    metric: string,
    value: number,
    threshold: number,
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'monitoring',
        modelId,
        metric,
        value,
        threshold,
        context,
      },
    };

    this.logger.log(`ML Monitoring: ${metric} = ${value} (threshold: ${threshold}) for model ${modelId}`, {
      ...event,
      severity: 'INFO',
    });
  }

  logMLAlertEvent(
    userId: string,
    alertType: string,
    severity: 'info' | 'warning' | 'error' | 'critical',
    message: string,
    context: Record<string, any>,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      timestamp: new Date(),
      details: {
        eventType: 'alert',
        alertType,
        severity,
        message,
        context,
      },
    };

    this.logger.log(`ML Alert: ${alertType} - ${severity} - ${message}`, {
      ...event,
      severity: 'INFO',
    });
  }

  // Métodos para el guard de seguridad ML

  logSecurityViolation(
    userId: string,
    ip: string,
    url: string,
    reason: string,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_SECURITY_VIOLATION',
      userId,
      ip,
      timestamp: new Date(),
      details: {
        url,
        reason,
      },
    };

    this.logger.warn(`ML Security Violation: ${reason}`, {
      ...event,
      severity: 'WARNING',
    });
  }

  logRateLimitExceeded(
    userId: string,
    ip: string,
    url: string,
    limitType: string,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_RATE_LIMIT',
      userId,
      ip,
      timestamp: new Date(),
      details: {
        url,
        limitType,
      },
    };

    this.logger.warn(`ML Rate Limit Exceeded: ${limitType}`, {
      ...event,
      severity: 'WARNING',
    });
  }

  logValidationFailure(
    userId: string,
    ip: string,
    url: string,
    errors: string[],
  ): void {
    const event: SecurityEvent = {
      type: 'ML_VALIDATION_FAILURE',
      userId,
      ip,
      timestamp: new Date(),
      details: {
        url,
        errors,
      },
    };

    this.logger.warn(`ML Validation Failure: ${errors.join(', ')}`, {
      ...event,
      severity: 'WARNING',
    });
  }

  logPermissionDenied(
    userId: string,
    ip: string,
    url: string,
    permission: string,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_PERMISSION_DENIED',
      userId,
      ip,
      timestamp: new Date(),
      details: {
        url,
        permission,
      },
    };

    this.logger.warn(`ML Permission Denied: ${permission}`, {
      ...event,
      severity: 'WARNING',
    });
  }

  logResourceAccessDenied(
    userId: string,
    ip: string,
    url: string,
    resourceId: string,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_RESOURCE_ACCESS_DENIED',
      userId,
      ip,
      timestamp: new Date(),
      details: {
        url,
        resourceId,
      },
    };

    this.logger.warn(`ML Resource Access Denied: ${resourceId}`, {
      ...event,
      severity: 'WARNING',
    });
  }

  logMLAccessGranted(
    userId: string,
    ip: string,
    url: string,
    method: string,
    processingTime: number,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_AUDIT',
      userId,
      ip,
      timestamp: new Date(),
      details: {
        url,
        method,
        processingTime,
      },
    };

    this.logger.log(`ML Access Granted: ${method} ${url} (${processingTime}ms)`, {
      ...event,
      severity: 'INFO',
    });
  }

  logSecurityError(
    userId: string,
    ip: string,
    url: string,
    error: string,
  ): void {
    const event: SecurityEvent = {
      type: 'ML_SECURITY_VIOLATION',
      userId,
      ip,
      timestamp: new Date(),
      details: {
        url,
        error,
      },
    };

    this.logger.error(`ML Security Error: ${error}`, {
      ...event,
      severity: 'ERROR',
    });
  }
}
