import { Injectable } from '@nestjs/common';

import { SecurityLoggerService } from '../../security/security-logger.service';

export interface MLAuditEvent {
  event_type: string;
  user_id: string;
  resource_id?: string;
  operation: string;
  status: 'success' | 'failure' | 'warning';
  metadata: Record<string, any>;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

export interface MLModelAudit {
  model_id: string;
  user_id: string;
  action: 'create' | 'update' | 'delete' | 'train' | 'deploy' | 'predict';
  status: 'success' | 'failure';
  metadata: Record<string, any>;
  timestamp: string;
}

export interface MLDatasetAudit {
  dataset_id: string;
  user_id: string;
  action: 'create' | 'update' | 'delete' | 'upload' | 'process';
  status: 'success' | 'failure';
  metadata: Record<string, any>;
  timestamp: string;
}

export interface MLTrainingAudit {
  training_id: string;
  model_id: string;
  user_id: string;
  action: 'start' | 'complete' | 'fail' | 'cancel';
  status: 'success' | 'failure' | 'in_progress';
  metadata: Record<string, any>;
  timestamp: string;
  duration?: number;
}

export interface MLPredictionAudit {
  prediction_id: string;
  model_id: string;
  user_id: string;
  action: 'request' | 'complete' | 'fail';
  status: 'success' | 'failure';
  metadata: Record<string, any>;
  timestamp: string;
  processing_time?: number;
  input_size?: number;
  output_size?: number;
}

export interface MLDeploymentAudit {
  deployment_id: string;
  model_id: string;
  user_id: string;
  action: 'deploy' | 'undeploy' | 'update' | 'rollback';
  status: 'success' | 'failure';
  metadata: Record<string, any>;
  timestamp: string;
  environment?: string;
}

@Injectable()
export class MLAuditService {
  constructor(private securityLogger: SecurityLoggerService) {}

  /**
   * Registra un evento de auditoría general de ML
   */
  logEvent(event: MLAuditEvent): void {
    this.securityLogger.logMLAuditEvent(
      event.user_id,
      event.event_type,
      event.operation,
      event.status,
      {
        resource_id: event.resource_id,
        metadata: event.metadata,
        timestamp: event.timestamp,
        ip_address: event.ip_address,
        user_agent: event.user_agent,
      },
    );
  }

  /**
   * Registra auditoría de modelos ML
   */
  logModelEvent(audit: MLModelAudit): void {
    this.securityLogger.logMLModelEvent(
      audit.user_id,
      audit.model_id,
      audit.action,
      audit.status,
      {
        metadata: audit.metadata,
        timestamp: audit.timestamp,
      },
    );
  }

  /**
   * Registra auditoría de datasets ML
   */
  logDatasetEvent(audit: MLDatasetAudit): void {
    this.securityLogger.logMLDatasetEvent(
      audit.user_id,
      audit.dataset_id,
      audit.action,
      audit.status,
      {
        metadata: audit.metadata,
        timestamp: audit.timestamp,
      },
    );
  }

  /**
   * Registra auditoría de entrenamiento ML
   */
  logTrainingEvent(audit: MLTrainingAudit): void {
    this.securityLogger.logMLTrainingEvent(
      audit.user_id,
      audit.training_id,
      audit.model_id,
      audit.action,
      audit.status,
      {
        metadata: audit.metadata,
        timestamp: audit.timestamp,
        duration: audit.duration,
      },
    );
  }

  /**
   * Registra auditoría de predicciones ML
   */
  logPredictionEvent(audit: MLPredictionAudit): void {
    this.securityLogger.logMLPredictionEvent(
      audit.user_id,
      audit.prediction_id,
      audit.model_id,
      audit.action,
      audit.status,
      {
        metadata: audit.metadata,
        timestamp: audit.timestamp,
        processing_time: audit.processing_time,
        input_size: audit.input_size,
        output_size: audit.output_size,
      },
    );
  }

  /**
   * Registra auditoría de despliegues ML
   */
  logDeploymentEvent(audit: MLDeploymentAudit): void {
    this.securityLogger.logMLDeploymentEvent(
      audit.user_id,
      audit.deployment_id,
      audit.model_id,
      audit.action,
      audit.status,
      {
        metadata: audit.metadata,
        timestamp: audit.timestamp,
        environment: audit.environment,
      },
    );
  }

  /**
   * Registra intentos de acceso no autorizado a ML
   */
  logUnauthorizedAccess(userId: string, resource: string, operation: string, context: Record<string, any>): void {
    this.securityLogger.logMLUnauthorizedAccess(userId, resource, operation, context);
  }

  /**
   * Registra intentos de acceso sospechoso a ML
   */
  logSuspiciousActivity(userId: string, activity: string, context: Record<string, any>): void {
    this.securityLogger.logMLSuspiciousActivity(userId, activity, context);
  }

  /**
   * Registra errores de seguridad en ML
   */
  logSecurityError(userId: string, error: string, context: Record<string, any>): void {
    this.securityLogger.logMLSecurityError(userId, error, context);
  }

  /**
   * Registra métricas de rendimiento ML
   */
  logPerformanceMetrics(userId: string, metrics: Record<string, any>): void {
    this.securityLogger.logMLPerformanceMetrics(userId, metrics);
  }

  /**
   * Registra uso de recursos ML
   */
  logResourceUsage(userId: string, resourceType: string, usage: Record<string, any>): void {
    this.securityLogger.logMLResourceUsage(userId, resourceType, usage);
  }

  /**
   * Registra cambios de configuración ML
   */
  logConfigurationChange(userId: string, configType: string, changes: Record<string, any>): void {
    this.securityLogger.logMLConfigurationChange(userId, configType, changes);
  }

  /**
   * Registra eventos de backup y recuperación ML
   */
  logBackupEvent(userId: string, action: 'backup' | 'restore', status: 'success' | 'failure', context: Record<string, any>): void {
    this.securityLogger.logMLBackupEvent(userId, action, status, context);
  }

  /**
   * Registra eventos de limpieza y mantenimiento ML
   */
  logMaintenanceEvent(userId: string, action: string, status: 'success' | 'failure', context: Record<string, any>): void {
    this.securityLogger.logMLMaintenanceEvent(userId, action, status, context);
  }

  /**
   * Registra eventos de integración con servicios externos ML
   */
  logIntegrationEvent(userId: string, service: string, action: string, status: 'success' | 'failure', context: Record<string, any>): void {
    this.securityLogger.logMLIntegrationEvent(userId, service, action, status, context);
  }

  /**
   * Registra eventos de compliance y regulaciones ML
   */
  logComplianceEvent(userId: string, regulation: string, action: string, status: 'compliant' | 'non_compliant', context: Record<string, any>): void {
    this.securityLogger.logMLComplianceEvent(userId, regulation, action, status, context);
  }

  /**
   * Registra eventos de privacidad y GDPR ML
   */
  logPrivacyEvent(userId: string, action: string, dataType: string, context: Record<string, any>): void {
    this.securityLogger.logMLPrivacyEvent(userId, action, dataType, context);
  }

  /**
   * Registra eventos de bias y fairness ML
   */
  logBiasEvent(userId: string, modelId: string, biasType: string, severity: 'low' | 'medium' | 'high', context: Record<string, any>): void {
    this.securityLogger.logMLBiasEvent(userId, modelId, biasType, severity, context);
  }

  /**
   * Registra eventos de drift de datos ML
   */
  logDataDriftEvent(userId: string, modelId: string, driftType: string, severity: 'low' | 'medium' | 'high', context: Record<string, any>): void {
    this.securityLogger.logMLDataDriftEvent(userId, modelId, driftType, severity, context);
  }

  /**
   * Registra eventos de versionado de modelos ML
   */
  logModelVersionEvent(userId: string, modelId: string, version: string, action: string, context: Record<string, any>): void {
    this.securityLogger.logMLModelVersionEvent(userId, modelId, version, action, context);
  }

  /**
   * Registra eventos de experimentación ML
   */
  logExperimentEvent(userId: string, experimentId: string, action: string, status: 'success' | 'failure', context: Record<string, any>): void {
    this.securityLogger.logMLExperimentEvent(userId, experimentId, action, status, context);
  }

  /**
   * Registra eventos de pipeline ML
   */
  logPipelineEvent(userId: string, pipelineId: string, action: string, status: 'success' | 'failure', context: Record<string, any>): void {
    this.securityLogger.logMLPipelineEvent(userId, pipelineId, action, status, context);
  }

  /**
   * Registra eventos de monitoreo ML
   */
  logMonitoringEvent(userId: string, modelId: string, metric: string, value: number, threshold: number, context: Record<string, any>): void {
    this.securityLogger.logMLMonitoringEvent(userId, modelId, metric, value, threshold, context);
  }

  /**
   * Registra eventos de alertas ML
   */
  logAlertEvent(userId: string, alertType: string, severity: 'info' | 'warning' | 'error' | 'critical', message: string, context: Record<string, any>): void {
    this.securityLogger.logMLAlertEvent(userId, alertType, severity, message, context);
  }
} 