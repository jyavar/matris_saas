import { IsString, IsNumber, IsOptional, IsEnum, IsObject, IsArray, IsBoolean, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Enums
export enum ModelType {
  CLASSIFICATION = 'classification',
  REGRESSION = 'regression',
  CLUSTERING = 'clustering',
  NLP = 'nlp',
  COMPUTER_VISION = 'computer-vision',
  RECOMMENDATION = 'recommendation',
}

export enum ModelStatus {
  TRAINING = 'training',
  READY = 'ready',
  DEPLOYED = 'deployed',
  ERROR = 'error',
}

export enum DatasetType {
  STRUCTURED = 'structured',
  UNSTRUCTURED = 'unstructured',
  TIME_SERIES = 'time-series',
  IMAGE = 'image',
  TEXT = 'text',
}

export enum DatasetFormat {
  CSV = 'csv',
  JSON = 'json',
  PARQUET = 'parquet',
  IMAGES = 'images',
  TEXT = 'text',
}

export enum JobStatus {
  QUEUED = 'queued',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum DeploymentEnvironment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export enum DeploymentStatus {
  DEPLOYING = 'deploying',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  FAILED = 'failed',
}

// DTOs
export class CreateModelDto {
  @ApiProperty({ description: 'Model name' })
  @IsString()
  name: string;

  @ApiProperty({ enum: ModelType, description: 'Model type' })
  @IsEnum(ModelType)
  type: ModelType;

  @ApiPropertyOptional({ description: 'Model parameters' })
  @IsOptional()
  @IsObject()
  parameters?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Model version' })
  @IsOptional()
  @IsString()
  version?: string;
}

export class UpdateModelDto {
  @ApiPropertyOptional({ description: 'Model name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ModelType, description: 'Model type' })
  @IsOptional()
  @IsEnum(ModelType)
  type?: ModelType;

  @ApiPropertyOptional({ description: 'Model parameters' })
  @IsOptional()
  @IsObject()
  parameters?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Model version' })
  @IsOptional()
  @IsString()
  version?: string;
}

export class CreateDatasetDto {
  @ApiProperty({ description: 'Dataset name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Dataset description' })
  @IsString()
  description: string;

  @ApiProperty({ enum: DatasetType, description: 'Dataset type' })
  @IsEnum(DatasetType)
  type: DatasetType;

  @ApiProperty({ enum: DatasetFormat, description: 'Dataset format' })
  @IsEnum(DatasetFormat)
  format: DatasetFormat;

  @ApiPropertyOptional({ description: 'Dataset schema' })
  @IsOptional()
  @IsObject()
  schema?: Record<string, string>;
}

export class UpdateDatasetDto {
  @ApiPropertyOptional({ description: 'Dataset name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Dataset description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: DatasetType, description: 'Dataset type' })
  @IsOptional()
  @IsEnum(DatasetType)
  type?: DatasetType;

  @ApiPropertyOptional({ enum: DatasetFormat, description: 'Dataset format' })
  @IsOptional()
  @IsEnum(DatasetFormat)
  format?: DatasetFormat;

  @ApiPropertyOptional({ description: 'Dataset schema' })
  @IsOptional()
  @IsObject()
  schema?: Record<string, string>;
}

export class StartTrainingDto {
  @ApiProperty({ description: 'Model ID' })
  @IsString()
  modelId: string;

  @ApiProperty({ description: 'Dataset ID' })
  @IsString()
  datasetId: string;

  @ApiPropertyOptional({ description: 'Training hyperparameters' })
  @IsOptional()
  @IsObject()
  hyperparameters?: Record<string, unknown>;
}

export class MakePredictionDto {
  @ApiProperty({ description: 'Model ID' })
  @IsString()
  modelId: string;

  @ApiProperty({ description: 'Input data for prediction' })
  @IsObject()
  inputData: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Deployment ID' })
  @IsOptional()
  @IsString()
  deploymentId?: string;
}

export class DeployModelDto {
  @ApiProperty({ description: 'Model ID' })
  @IsString()
  modelId: string;

  @ApiProperty({ enum: DeploymentEnvironment, description: 'Deployment environment' })
  @IsEnum(DeploymentEnvironment)
  environment: DeploymentEnvironment;

  @ApiProperty({ description: 'Number of replicas' })
  @IsNumber()
  @Min(1)
  @Max(10)
  replicas: number;

  @ApiProperty({ description: 'CPU limit' })
  @IsString()
  cpuLimit: string;

  @ApiProperty({ description: 'Memory limit' })
  @IsString()
  memoryLimit: string;
}

export class QueryParamsDto {
  @ApiPropertyOptional({ description: 'Limit for pagination' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ description: 'Offset for pagination' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({ description: 'Filter by type' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'Filter by status' })
  @IsOptional()
  @IsString()
  status?: string;
}

// Response DTOs
export class MLResponseDto<T> {
  @ApiProperty({ description: 'Success status' })
  success: boolean;

  @ApiPropertyOptional({ description: 'Response data' })
  data?: T;

  @ApiPropertyOptional({ description: 'Error message' })
  error?: string;

  @ApiPropertyOptional({ description: 'Response metadata' })
  metadata?: {
    processing_time: number;
    model_version?: string;
    confidence?: number;
  };
}

export class MLListResponseDto<T> {
  @ApiProperty({ description: 'Success status' })
  success: boolean;

  @ApiProperty({ description: 'List of items', isArray: true })
  data: T[];

  @ApiProperty({ description: 'Total count' })
  count: number;

  @ApiProperty({ description: 'Current page' })
  page: number;

  @ApiProperty({ description: 'Items per page' })
  limit: number;

  @ApiProperty({ description: 'Total pages' })
  total_pages: number;
} 