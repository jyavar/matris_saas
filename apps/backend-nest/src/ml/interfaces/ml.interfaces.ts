// ML Model interfaces
export interface MLModel {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering' | 'nlp' | 'computer-vision' | 'recommendation';
  status: 'training' | 'ready' | 'deployed' | 'error';
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1_score?: number;
  created_at: string;
  updated_at: string;
  version: string;
  parameters: Record<string, unknown>;
  dataset_size: number;
  training_time: number;
  last_trained: string;
  deployment_url?: string;
}

// ML Dataset interfaces
export interface MLDataset {
  id: string;
  name: string;
  description: string;
  size: number;
  features: number;
  samples: number;
  type: 'structured' | 'unstructured' | 'time-series' | 'image' | 'text';
  format: 'csv' | 'json' | 'parquet' | 'images' | 'text';
  created_at: string;
  updated_at: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  validation_status: 'pending' | 'validated' | 'failed';
  schema?: Record<string, string>;
}

// ML Training Job interfaces
export interface MLTrainingJob {
  id: string;
  model_id: string;
  dataset_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  start_time: string;
  end_time?: string;
  duration?: number;
  metrics: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1_score?: number;
    mse?: number;
    mae?: number;
    rmse?: number;
  };
  hyperparameters: Record<string, unknown>;
  logs: string[];
}

// ML Prediction interfaces
export interface MLPrediction {
  id: string;
  model_id: string;
  input_data: Record<string, unknown>;
  prediction: unknown;
  confidence: number;
  timestamp: string;
  processing_time: number;
  metadata: Record<string, unknown>;
}

// ML Feature interfaces
export interface MLFeature {
  id: string;
  name: string;
  type: 'numerical' | 'categorical' | 'text' | 'datetime' | 'boolean';
  importance: number;
  correlation: number;
  missing_values: number;
  unique_values: number;
  mean?: number;
  std?: number;
  min?: number;
  max?: number;
  distribution?: Record<string, number>;
}

// ML Analysis interfaces
export interface MLAnalysis {
  id: string;
  dataset_id: string;
  type: 'exploratory' | 'feature-importance' | 'correlation' | 'outlier-detection' | 'data-quality';
  status: 'running' | 'completed' | 'failed';
  results: Record<string, unknown>;
  visualizations: string[];
  insights: string[];
  created_at: string;
  duration: number;
}

// ML Deployment interfaces
export interface MLDeployment {
  id: string;
  model_id: string;
  environment: 'development' | 'staging' | 'production';
  status: 'deploying' | 'active' | 'inactive' | 'failed';
  endpoint_url: string;
  version: string;
  replicas: number;
  cpu_limit: string;
  memory_limit: string;
  created_at: string;
  updated_at: string;
  metrics: {
    requests_per_minute: number;
    average_response_time: number;
    error_rate: number;
    cpu_usage: number;
    memory_usage: number;
  };
}

// Service Health interfaces
export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'offline';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  circuitBreaker: {
    state: 'closed' | 'open' | 'half-open';
    failureCount: number;
    lastFailure: string | null;
  };
  mlServices: {
    training: 'available' | 'busy' | 'offline';
    inference: 'available' | 'busy' | 'offline';
    dataProcessing: 'available' | 'busy' | 'offline';
  };
}

// Response interfaces
export interface MLResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    processing_time: number;
    model_version?: string;
    confidence?: number;
  };
}

export interface MLListResponse<T> {
  success: boolean;
  data: T[];
  count: number;
  page: number;
  limit: number;
  total_pages: number;
} 