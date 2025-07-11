import { MLTrainingJob, MLListResponse, StartTrainingDto } from '../types/ml.types.js'

export class TrainingService {
  private jobs: MLTrainingJob[] = [
    {
      id: 'job-1',
      model_id: 'model-1',
      dataset_id: 'dataset-1',
      status: 'completed',
      progress: 100,
      start_time: '2024-01-20T10:00:00Z',
      end_time: '2024-01-20T10:30:00Z',
      duration: 1800,
      metrics: {
        accuracy: 0.89,
        precision: 0.87,
        recall: 0.91,
        f1_score: 0.89,
      },
      hyperparameters: {
        learning_rate: 0.01,
        batch_size: 32,
        epochs: 100,
        optimizer: 'adam',
      },
      logs: [
        'Starting training job...',
        'Epoch 1/100 - loss: 0.693 - accuracy: 0.45',
        'Epoch 50/100 - loss: 0.234 - accuracy: 0.78',
        'Epoch 100/100 - loss: 0.123 - accuracy: 0.89',
        'Training completed successfully',
      ],
    },
    {
      id: 'job-2',
      model_id: 'model-2',
      dataset_id: 'dataset-2',
      status: 'running',
      progress: 65,
      start_time: '2024-01-22T14:00:00Z',
      hyperparameters: {
        learning_rate: 0.005,
        batch_size: 64,
        epochs: 150,
        optimizer: 'sgd',
      },
      metrics: {},
      logs: [
        'Starting training job...',
        'Epoch 1/150 - loss: 0.712 - accuracy: 0.42',
        'Epoch 50/150 - loss: 0.298 - accuracy: 0.76',
        'Epoch 100/150 - loss: 0.156 - accuracy: 0.85',
      ],
    },
    {
      id: 'job-3',
      model_id: 'model-3',
      dataset_id: 'dataset-3',
      status: 'queued',
      progress: 0,
      start_time: '2024-01-22T16:00:00Z',
      hyperparameters: {
        learning_rate: 0.001,
        batch_size: 16,
        epochs: 200,
        optimizer: 'adam',
      },
      metrics: {},
      logs: ['Job queued for execution'],
    },
  ]

  async getAllJobs(limit = 20, offset = 0, status?: string): Promise<MLListResponse<MLTrainingJob>> {
    let filteredJobs = this.jobs

    if (status) {
      filteredJobs = filteredJobs.filter((job) => job.status === status)
    }

    const paginatedJobs = filteredJobs.slice(offset, offset + limit)

    return {
      success: true,
      data: paginatedJobs,
      count: filteredJobs.length,
      page: Math.floor(offset / limit) + 1,
      limit,
      total_pages: Math.ceil(filteredJobs.length / limit),
    }
  }

  async getJobById(id: string): Promise<MLTrainingJob | null> {
    return this.jobs.find((job) => job.id === id) || null
  }

  async startTraining(startTrainingDto: StartTrainingDto): Promise<MLTrainingJob> {
    const newJob: MLTrainingJob = {
      id: `job-${Date.now()}`,
      model_id: startTrainingDto.modelId,
      dataset_id: startTrainingDto.datasetId,
      status: 'queued',
      progress: 0,
      start_time: new Date().toISOString(),
      hyperparameters: startTrainingDto.hyperparameters || {
        learning_rate: 0.01,
        batch_size: 32,
        epochs: 100,
        optimizer: 'adam',
      },
      metrics: {},
      logs: ['Job created and queued for execution'],
    }

    this.jobs.push(newJob)
    return newJob
  }

  async cancelJob(id: string): Promise<boolean> {
    const jobIndex = this.jobs.findIndex((job) => job.id === id)
    if (jobIndex === -1) {
      return false
    }

    const job = this.jobs[jobIndex]
    if (job.status === 'completed' || job.status === 'failed') {
      return false
    }

    this.jobs[jobIndex] = {
      ...job,
      status: 'cancelled',
      end_time: new Date().toISOString(),
      logs: [...job.logs, 'Job cancelled by user'],
    }

    return true
  }

  async getJobLogs(id: string): Promise<string[] | null> {
    const job = await this.getJobById(id)
    return job?.logs || null
  }

  async getJobMetrics(id: string): Promise<Record<string, unknown> | null> {
    const job = await this.getJobById(id)
    if (!job) {
      return null
    }

    return {
      current_epoch: Math.floor((job.progress / 100) * (job.hyperparameters.epochs as number)),
      total_epochs: job.hyperparameters.epochs,
      current_loss: job.metrics.mse || 0.123,
      current_accuracy: job.metrics.accuracy || 0.85,
      estimated_time_remaining: job.status === 'running' ? 1800 : 0,
      gpu_usage: job.status === 'running' ? 0.85 : 0,
      memory_usage: job.status === 'running' ? 0.62 : 0,
    }
  }

  async getTrainingHistory(modelId: string): Promise<MLTrainingJob[]> {
    return this.jobs.filter((job) => job.model_id === modelId)
  }

  async getSystemResources(): Promise<{
    available_gpus: number
    total_gpus: number
    gpu_memory_available: number
    gpu_memory_total: number
    queue_length: number
    active_jobs: number
  }> {
    return {
      available_gpus: 2,
      total_gpus: 4,
      gpu_memory_available: 16000,
      gpu_memory_total: 32000,
      queue_length: this.jobs.filter((job) => job.status === 'queued').length,
      active_jobs: this.jobs.filter((job) => job.status === 'running').length,
    }
  }
} 