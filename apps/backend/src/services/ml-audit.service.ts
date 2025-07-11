import { logAction } from './logger.service.js'

export interface MLAuditEvent {
  event_type: string
  user_id: string
  resource_id?: string
  operation: string
  status: 'success' | 'failure' | 'warning'
  metadata: Record<string, any>
  timestamp: string
  ip_address?: string
  user_agent?: string
}

export interface MLModelAudit {
  model_id: string
  user_id: string
  action: 'create' | 'update' | 'delete' | 'train' | 'deploy' | 'predict'
  status: 'success' | 'failure'
  metadata: Record<string, any>
  timestamp: string
}

export interface MLDatasetAudit {
  dataset_id: string
  user_id: string
  action: 'create' | 'update' | 'delete' | 'upload' | 'process'
  status: 'success' | 'failure'
  metadata: Record<string, any>
  timestamp: string
}

export interface MLTrainingAudit {
  training_id: string
  model_id: string
  user_id: string
  action: 'start' | 'complete' | 'fail' | 'cancel'
  status: 'success' | 'failure' | 'in_progress'
  metadata: Record<string, any>
  timestamp: string
  duration?: number
}

export interface MLPredictionAudit {
  prediction_id: string
  model_id: string
  user_id: string
  action: 'request' | 'complete' | 'fail'
  status: 'success' | 'failure'
  metadata: Record<string, any>
  timestamp: string
  processing_time?: number
  input_size?: number
  output_size?: number
}

export interface MLDeploymentAudit {
  deployment_id: string
  model_id: string
  user_id: string
  action: 'deploy' | 'undeploy' | 'update' | 'rollback'
  status: 'success' | 'failure'
  metadata: Record<string, any>
  timestamp: string
  environment?: string
}

export const mlAuditService = {
  /**
   * Registra un evento de auditoría general de ML
   */
  logEvent(event: MLAuditEvent): void {
    logAction(`ml_audit_${event.event_type}`, event.user_id, {
      resource_id: event.resource_id,
      operation: event.operation,
      status: event.status,
      metadata: event.metadata,
      timestamp: event.timestamp,
      ip_address: event.ip_address,
      user_agent: event.user_agent,
    })
  },

  /**
   * Registra auditoría de modelos ML
   */
  logModelEvent(audit: MLModelAudit): void {
    logAction(`ml_model_${audit.action}`, audit.user_id, {
      model_id: audit.model_id,
      action: audit.action,
      status: audit.status,
      metadata: audit.metadata,
      timestamp: audit.timestamp,
    })
  },

  /**
   * Registra auditoría de datasets ML
   */
  logDatasetEvent(audit: MLDatasetAudit): void {
    logAction(`ml_dataset_${audit.action}`, audit.user_id, {
      dataset_id: audit.dataset_id,
      action: audit.action,
      status: audit.status,
      metadata: audit.metadata,
      timestamp: audit.timestamp,
    })
  },

  /**
   * Registra auditoría de entrenamiento ML
   */
  logTrainingEvent(audit: MLTrainingAudit): void {
    logAction(`ml_training_${audit.action}`, audit.user_id, {
      training_id: audit.training_id,
      model_id: audit.model_id,
      action: audit.action,
      status: audit.status,
      metadata: audit.metadata,
      timestamp: audit.timestamp,
      duration: audit.duration,
    })
  },

  /**
   * Registra auditoría de predicciones ML
   */
  logPredictionEvent(audit: MLPredictionAudit): void {
    logAction(`ml_prediction_${audit.action}`, audit.user_id, {
      prediction_id: audit.prediction_id,
      model_id: audit.model_id,
      action: audit.action,
      status: audit.status,
      metadata: audit.metadata,
      timestamp: audit.timestamp,
      processing_time: audit.processing_time,
      input_size: audit.input_size,
      output_size: audit.output_size,
    })
  },

  /**
   * Registra auditoría de despliegues ML
   */
  logDeploymentEvent(audit: MLDeploymentAudit): void {
    logAction(`ml_deployment_${audit.action}`, audit.user_id, {
      deployment_id: audit.deployment_id,
      model_id: audit.model_id,
      action: audit.action,
      status: audit.status,
      metadata: audit.metadata,
      timestamp: audit.timestamp,
      environment: audit.environment,
    })
  },

  /**
   * Registra intentos de acceso no autorizado a ML
   */
  logUnauthorizedAccess(userId: string, resource: string, operation: string, context: Record<string, any>): void {
    logAction('ml_unauthorized_access', userId, {
      resource,
      operation,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra intentos de acceso sospechoso a ML
   */
  logSuspiciousActivity(userId: string, activity: string, context: Record<string, any>): void {
    logAction('ml_suspicious_activity', userId, {
      activity,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra errores de seguridad en ML
   */
  logSecurityError(userId: string, error: string, context: Record<string, any>): void {
    logAction('ml_security_error', userId, {
      error,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra métricas de rendimiento ML
   */
  logPerformanceMetrics(userId: string, metrics: Record<string, any>): void {
    logAction('ml_performance_metrics', userId, {
      metrics,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra uso de recursos ML
   */
  logResourceUsage(userId: string, resourceType: string, usage: Record<string, any>): void {
    logAction('ml_resource_usage', userId, {
      resource_type: resourceType,
      usage,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra cambios de configuración ML
   */
  logConfigurationChange(userId: string, configType: string, changes: Record<string, any>): void {
    logAction('ml_config_change', userId, {
      config_type: configType,
      changes,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de backup y recuperación ML
   */
  logBackupEvent(userId: string, action: 'backup' | 'restore', status: 'success' | 'failure', context: Record<string, any>): void {
    logAction(`ml_backup_${action}`, userId, {
      action,
      status,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de limpieza y mantenimiento ML
   */
  logMaintenanceEvent(userId: string, action: string, status: 'success' | 'failure', context: Record<string, any>): void {
    logAction('ml_maintenance', userId, {
      action,
      status,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de integración con servicios externos ML
   */
  logIntegrationEvent(userId: string, service: string, action: string, status: 'success' | 'failure', context: Record<string, any>): void {
    logAction('ml_integration', userId, {
      service,
      action,
      status,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de compliance y regulaciones ML
   */
  logComplianceEvent(userId: string, regulation: string, action: string, status: 'compliant' | 'non_compliant', context: Record<string, any>): void {
    logAction('ml_compliance', userId, {
      regulation,
      action,
      status,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de privacidad y GDPR ML
   */
  logPrivacyEvent(userId: string, action: string, dataType: string, context: Record<string, any>): void {
    logAction('ml_privacy', userId, {
      action,
      data_type: dataType,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de bias y fairness ML
   */
  logBiasEvent(userId: string, modelId: string, biasType: string, severity: 'low' | 'medium' | 'high', context: Record<string, any>): void {
    logAction('ml_bias_detected', userId, {
      model_id: modelId,
      bias_type: biasType,
      severity,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de drift de datos ML
   */
  logDataDriftEvent(userId: string, modelId: string, driftType: string, severity: 'low' | 'medium' | 'high', context: Record<string, any>): void {
    logAction('ml_data_drift', userId, {
      model_id: modelId,
      drift_type: driftType,
      severity,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de versionado de modelos ML
   */
  logModelVersionEvent(userId: string, modelId: string, version: string, action: string, context: Record<string, any>): void {
    logAction('ml_model_version', userId, {
      model_id: modelId,
      version,
      action,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de experimentación ML
   */
  logExperimentEvent(userId: string, experimentId: string, action: string, status: 'success' | 'failure', context: Record<string, any>): void {
    logAction('ml_experiment', userId, {
      experiment_id: experimentId,
      action,
      status,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de pipeline ML
   */
  logPipelineEvent(userId: string, pipelineId: string, action: string, status: 'success' | 'failure', context: Record<string, any>): void {
    logAction('ml_pipeline', userId, {
      pipeline_id: pipelineId,
      action,
      status,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de monitoreo ML
   */
  logMonitoringEvent(userId: string, modelId: string, metric: string, value: number, threshold: number, context: Record<string, any>): void {
    logAction('ml_monitoring', userId, {
      model_id: modelId,
      metric,
      value,
      threshold,
      context,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Registra eventos de alertas ML
   */
  logAlertEvent(userId: string, alertType: string, severity: 'info' | 'warning' | 'error' | 'critical', message: string, context: Record<string, any>): void {
    logAction('ml_alert', userId, {
      alert_type: alertType,
      severity,
      message,
      context,
      timestamp: new Date().toISOString(),
    })
  },
} 