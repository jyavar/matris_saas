import { getSessionToken } from '../utils/auth'

// Types
export interface MLModel {
  id: string
  name: string
  type: 'classification' | 'regression' | 'clustering' | 'nlp' | 'computer-vision' | 'recommendation'
  status: 'training' | 'ready' | 'deployed' | 'error'
  accuracy?: number
  precision?: number
  recall?: number
  f1_score?: number
  created_at: string
  updated_at: string
  version: string
  parameters: Record<string, any>
  dataset_size: number
  training_time: number
  last_trained: string
  deployment_url?: string
}

export interface MLDataset {
  id: string
  name: string
  description: string
  size: number
  features: number
  samples: number
  type: 'structured' | 'unstructured' | 'time-series' | 'image' | 'text'
  format: 'csv' | 'json' | 'parquet' | 'images' | 'text'
  created_at: string
  updated_at: string
  status: 'uploading' | 'processing' | 'ready' | 'error'
  validation_status: 'pending' | 'validated' | 'failed'
  schema?: Record<string, string>
}

export interface MLPrediction {
  id: string
  model_id: string
  input_data: any
  prediction: any
  confidence: number
  timestamp: string
  processing_time: number
  metadata: Record<string, any>
}

export interface MLTrainingJob {
  id: string
  model_id: string
  dataset_id: string
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
  progress: number
  start_time: string
  end_time?: string
  duration?: number
  metrics: {
    accuracy?: number
    precision?: number
    recall?: number
    f1_score?: number
    mse?: number
    mae?: number
    rmse?: number
  }
  hyperparameters: Record<string, any>
  logs: string[]
}

export interface MLFeature {
  id: string
  name: string
  type: 'numerical' | 'categorical' | 'text' | 'datetime' | 'boolean'
  importance: number
  correlation: number
  missing_values: number
  unique_values: number
  mean?: number
  std?: number
  min?: number
  max?: number
  distribution?: Record<string, number>
}

export interface MLAnalysis {
  id: string
  dataset_id: string
  type: 'exploratory' | 'feature-importance' | 'correlation' | 'outlier-detection' | 'data-quality'
  status: 'running' | 'completed' | 'failed'
  results: Record<string, any>
  visualizations: string[]
  insights: string[]
  created_at: string
  duration: number
}

export interface MLDeployment {
  id: string
  model_id: string
  environment: 'development' | 'staging' | 'production'
  status: 'deploying' | 'active' | 'inactive' | 'failed'
  endpoint_url: string
  version: string
  replicas: number
  cpu_limit: string
  memory_limit: string
  created_at: string
  updated_at: string
  metrics: {
    requests_per_minute: number
    average_response_time: number
    error_rate: number
    cpu_usage: number
    memory_usage: number
  }
}

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'offline'
  uptime: number
  responseTime: number
  lastCheck: string
  circuitBreaker: {
    state: 'closed' | 'open' | 'half-open'
    failureCount: number
    lastFailure: string | null
  }
  mlServices: {
    training: 'available' | 'busy' | 'offline'
    inference: 'available' | 'busy' | 'offline'
    dataProcessing: 'available' | 'busy' | 'offline'
  }
}

// Response types
export interface MLResponse<T> {
  success: boolean
  data?: T
  error?: string
  metadata?: {
    processing_time: number
    model_version: string
    confidence?: number
  }
}

export interface MLListResponse<T> {
  success: boolean
  data: T[]
  count: number
  page: number
  limit: number
  total_pages: number
}

// Configuration
const ML_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  circuitBreakerThreshold: 5,
  circuitBreakerTimeout: 60000,
}

// Circuit Breaker
class CircuitBreaker {
  private failures = 0
  private lastFailure = 0
  private state: 'closed' | 'open' | 'half-open' = 'closed'

  isOpen(): boolean {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailure > ML_CONFIG.circuitBreakerTimeout) {
        this.state = 'half-open'
        return false
      }
      return true
    }
    return false
  }

  recordSuccess(): void {
    this.failures = 0
    this.state = 'closed'
  }

  recordFailure(): void {
    this.failures++
    this.lastFailure = Date.now()
    if (this.failures >= ML_CONFIG.circuitBreakerThreshold) {
      this.state = 'open'
    }
  }

  getState(): 'closed' | 'open' | 'half-open' {
    return this.state
  }

  getFailureCount(): number {
    return this.failures
  }

  getLastFailure(): string | null {
    return this.lastFailure > 0 ? new Date(this.lastFailure).toISOString() : null
  }
}

const circuitBreaker = new CircuitBreaker()

// Retry logic
async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= ML_CONFIG.retryAttempts; attempt++) {
    try {
      const result = await fn()
      circuitBreaker.recordSuccess()
      return result
    } catch (error) {
      lastError = error as Error
      circuitBreaker.recordFailure()

      if (attempt < ML_CONFIG.retryAttempts) {
        const delay = ML_CONFIG.retryDelay * Math.pow(2, attempt - 1)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError!
}

// HTTP client
async function mlRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<MLResponse<T>> {
  if (circuitBreaker.isOpen()) {
    throw new Error('Service temporarily unavailable')
  }

  const token = await getSessionToken()
  const url = `${ML_CONFIG.baseUrl}/api/ml${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
    signal: AbortSignal.timeout(ML_CONFIG.timeout),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `HTTP ${response.status}`)
  }

  return response.json()
}

export class MLService {
  // Health and Status
  static async checkHealth(): Promise<MLResponse<ServiceHealth>> {
    return withRetry(async () => {
      const response = await mlRequest<ServiceHealth>('/health')
      return {
        ...response,
        data: {
          ...response.data,
          circuitBreaker: {
            state: circuitBreaker.getState(),
            failureCount: circuitBreaker.getFailureCount(),
            lastFailure: circuitBreaker.getLastFailure(),
          },
        },
      }
    })
  }

  static isCircuitBreakerOpen(): boolean {
    return circuitBreaker.isOpen()
  }

  // Model Management
  static async getAllModels(
    limit = 20,
    offset = 0,
    type?: string,
    status?: string
  ): Promise<MLListResponse<MLModel>> {
    return withRetry(async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        ...(type && { type }),
        ...(status && { status }),
      })

      return mlRequest<MLModel[]>(`/models?${params}`)
    })
  }

  static async getModelById(modelId: string): Promise<MLResponse<MLModel>> {
    return withRetry(async () => {
      return mlRequest<MLModel>(`/models/${modelId}`)
    })
  }

  static async createModel(modelData: Partial<MLModel>): Promise<MLResponse<MLModel>> {
    return withRetry(async () => {
      return mlRequest<MLModel>('/models', {
        method: 'POST',
        body: JSON.stringify(modelData),
      })
    })
  }

  static async updateModel(modelId: string, updates: Partial<MLModel>): Promise<MLResponse<MLModel>> {
    return withRetry(async () => {
      return mlRequest<MLModel>(`/models/${modelId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
    })
  }

  static async deleteModel(modelId: string): Promise<MLResponse<void>> {
    return withRetry(async () => {
      return mlRequest<void>(`/models/${modelId}`, {
        method: 'DELETE',
      })
    })
  }

  // Dataset Management
  static async getAllDatasets(
    limit = 20,
    offset = 0,
    type?: string,
    status?: string
  ): Promise<MLListResponse<MLDataset>> {
    return withRetry(async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        ...(type && { type }),
        ...(status && { status }),
      })

      return mlRequest<MLDataset[]>(`/datasets?${params}`)
    })
  }

  static async getDatasetById(datasetId: string): Promise<MLResponse<MLDataset>> {
    return withRetry(async () => {
      return mlRequest<MLDataset>(`/datasets/${datasetId}`)
    })
  }

  static async uploadDataset(
    file: File,
    metadata: Partial<MLDataset>
  ): Promise<MLResponse<MLDataset>> {
    return withRetry(async () => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('metadata', JSON.stringify(metadata))

      const token = await getSessionToken()
      const url = `${ML_CONFIG.baseUrl}/api/ml/datasets/upload`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
        signal: AbortSignal.timeout(60000), // Longer timeout for uploads
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      return response.json()
    })
  }

  static async validateDataset(datasetId: string): Promise<MLResponse<MLDataset>> {
    return withRetry(async () => {
      return mlRequest<MLDataset>(`/datasets/${datasetId}/validate`, {
        method: 'POST',
      })
    })
  }

  // Training
  static async startTraining(
    modelId: string,
    datasetId: string,
    hyperparameters: Record<string, any>
  ): Promise<MLResponse<MLTrainingJob>> {
    return withRetry(async () => {
      return mlRequest<MLTrainingJob>('/training', {
        method: 'POST',
        body: JSON.stringify({
          model_id: modelId,
          dataset_id: datasetId,
          hyperparameters,
        }),
      })
    })
  }

  static async getTrainingJob(jobId: string): Promise<MLResponse<MLTrainingJob>> {
    return withRetry(async () => {
      return mlRequest<MLTrainingJob>(`/training/${jobId}`)
    })
  }

  static async getAllTrainingJobs(
    limit = 20,
    offset = 0,
    status?: string
  ): Promise<MLListResponse<MLTrainingJob>> {
    return withRetry(async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        ...(status && { status }),
      })

      return mlRequest<MLTrainingJob[]>(`/training?${params}`)
    })
  }

  static async cancelTraining(jobId: string): Promise<MLResponse<void>> {
    return withRetry(async () => {
      return mlRequest<void>(`/training/${jobId}/cancel`, {
        method: 'POST',
      })
    })
  }

  // Predictions
  static async makePrediction(
    modelId: string,
    inputData: any,
    deploymentId?: string
  ): Promise<MLResponse<MLPrediction>> {
    return withRetry(async () => {
      const endpoint = deploymentId 
        ? `/deployments/${deploymentId}/predict`
        : `/models/${modelId}/predict`

      return mlRequest<MLPrediction>(endpoint, {
        method: 'POST',
        body: JSON.stringify({ input_data: inputData }),
      })
    })
  }

  static async getPredictionHistory(
    modelId: string,
    limit = 20,
    offset = 0
  ): Promise<MLListResponse<MLPrediction>> {
    return withRetry(async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })

      return mlRequest<MLPrediction[]>(`/models/${modelId}/predictions?${params}`)
    })
  }

  // Feature Analysis
  static async analyzeFeatures(datasetId: string): Promise<MLResponse<MLFeature[]>> {
    return withRetry(async () => {
      return mlRequest<MLFeature[]>(`/datasets/${datasetId}/features`)
    })
  }

  static async getFeatureImportance(modelId: string): Promise<MLResponse<MLFeature[]>> {
    return withRetry(async () => {
      return mlRequest<MLFeature[]>(`/models/${modelId}/features/importance`)
    })
  }

  // Data Analysis
  static async runAnalysis(
    datasetId: string,
    analysisType: string,
    parameters?: Record<string, any>
  ): Promise<MLResponse<MLAnalysis>> {
    return withRetry(async () => {
      return mlRequest<MLAnalysis>('/analysis', {
        method: 'POST',
        body: JSON.stringify({
          dataset_id: datasetId,
          type: analysisType,
          parameters,
        }),
      })
    })
  }

  static async getAnalysis(analysisId: string): Promise<MLResponse<MLAnalysis>> {
    return withRetry(async () => {
      return mlRequest<MLAnalysis>(`/analysis/${analysisId}`)
    })
  }

  static async getAllAnalyses(
    limit = 20,
    offset = 0,
    type?: string
  ): Promise<MLListResponse<MLAnalysis>> {
    return withRetry(async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        ...(type && { type }),
      })

      return mlRequest<MLAnalysis[]>(`/analysis?${params}`)
    })
  }

  // Deployment
  static async deployModel(
    modelId: string,
    environment: string,
    config: {
      replicas: number
      cpu_limit: string
      memory_limit: string
    }
  ): Promise<MLResponse<MLDeployment>> {
    return withRetry(async () => {
      return mlRequest<MLDeployment>('/deployments', {
        method: 'POST',
        body: JSON.stringify({
          model_id: modelId,
          environment,
          ...config,
        }),
      })
    })
  }

  static async getDeployment(deploymentId: string): Promise<MLResponse<MLDeployment>> {
    return withRetry(async () => {
      return mlRequest<MLDeployment>(`/deployments/${deploymentId}`)
    })
  }

  static async getAllDeployments(
    limit = 20,
    offset = 0,
    environment?: string
  ): Promise<MLListResponse<MLDeployment>> {
    return withRetry(async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        ...(environment && { environment }),
      })

      return mlRequest<MLDeployment[]>(`/deployments?${params}`)
    })
  }

  static async updateDeployment(
    deploymentId: string,
    updates: Partial<MLDeployment>
  ): Promise<MLResponse<MLDeployment>> {
    return withRetry(async () => {
      return mlRequest<MLDeployment>(`/deployments/${deploymentId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
    })
  }

  static async deleteDeployment(deploymentId: string): Promise<MLResponse<void>> {
    return withRetry(async () => {
      return mlRequest<void>(`/deployments/${deploymentId}`, {
        method: 'DELETE',
      })
    })
  }

  // Model Performance
  static async evaluateModel(
    modelId: string,
    testDatasetId: string
  ): Promise<MLResponse<{
    accuracy: number
    precision: number
    recall: number
    f1_score: number
    confusion_matrix: number[][]
    classification_report: Record<string, any>
  }>> {
    return withRetry(async () => {
      return mlRequest(`/models/${modelId}/evaluate`, {
        method: 'POST',
        body: JSON.stringify({ test_dataset_id: testDatasetId }),
      })
    })
  }

  // AutoML
  static async runAutoML(
    datasetId: string,
    targetColumn: string,
    taskType: 'classification' | 'regression',
    constraints?: {
      max_training_time?: number
      max_models?: number
      metric?: string
    }
  ): Promise<MLResponse<{
    job_id: string
    status: string
    estimated_time: number
  }>> {
    return withRetry(async () => {
      return mlRequest('/automl', {
        method: 'POST',
        body: JSON.stringify({
          dataset_id: datasetId,
          target_column: targetColumn,
          task_type: taskType,
          constraints,
        }),
      })
    })
  }

  static async getAutoMLJob(jobId: string): Promise<MLResponse<{
    status: string
    progress: number
    best_model?: MLModel
    leaderboard: Array<{
      model_id: string
      score: number
      rank: number
    }>
  }>> {
    return withRetry(async () => {
      return mlRequest(`/automl/${jobId}`)
    })
  }

  // Model Registry
  static async registerModel(
    modelId: string,
    version: string,
    description: string
  ): Promise<MLResponse<{
    registry_id: string
    version: string
    status: string
  }>> {
    return withRetry(async () => {
      return mlRequest('/registry', {
        method: 'POST',
        body: JSON.stringify({
          model_id: modelId,
          version,
          description,
        }),
      })
    })
  }

  static async getModelVersions(modelId: string): Promise<MLResponse<Array<{
    version: string
    created_at: string
    status: string
    metrics: Record<string, number>
  }>>> {
    return withRetry(async () => {
      return mlRequest(`/registry/${modelId}/versions`)
    })
  }

  // Batch Processing
  static async startBatchPrediction(
    modelId: string,
    datasetId: string,
    outputFormat: 'csv' | 'json' | 'parquet'
  ): Promise<MLResponse<{
    batch_id: string
    status: string
    estimated_time: number
  }>> {
    return withRetry(async () => {
      return mlRequest('/batch-predictions', {
        method: 'POST',
        body: JSON.stringify({
          model_id: modelId,
          dataset_id: datasetId,
          output_format: outputFormat,
        }),
      })
    })
  }

  static async getBatchPrediction(batchId: string): Promise<MLResponse<{
    status: string
    progress: number
    results_url?: string
    error?: string
  }>> {
    return withRetry(async () => {
      return mlRequest(`/batch-predictions/${batchId}`)
    })
  }
} 