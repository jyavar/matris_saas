import { Injectable, NotFoundException } from '@nestjs/common'
import { MLTrainingJob, MLListResponse } from '../interfaces/ml.interfaces'
import { StartTrainingDto } from '../dto/ml.dto'

@Injectable()
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
      metrics: { accuracy: 0.89, precision: 0.87, recall: 0.91, f1_score: 0.89 },
      hyperparameters: { max_depth: 10 },
      logs: ['Started training', 'Completed training']
    }
    // ...otros jobs simulados
  ]

  async getAllJobs(limit = 20, offset = 0, status?: string): Promise<MLListResponse<MLTrainingJob>> {
    let filtered = this.jobs
    if (status) filtered = filtered.filter(j => j.status === status)
    const paginated = filtered.slice(offset, offset + limit)
    return {
      success: true,
      data: paginated,
      count: filtered.length,
      page: Math.floor(offset / limit) + 1,
      limit,
      total_pages: Math.ceil(filtered.length / limit),
    }
  }

  async getJobById(id: string): Promise<MLTrainingJob | null> {
    return this.jobs.find(j => j.id === id) || null
  }

  async startTraining(dto: StartTrainingDto): Promise<MLTrainingJob> {
    const newJob: MLTrainingJob = {
      id: `job-${Date.now()}`,
      model_id: dto.modelId,
      dataset_id: dto.datasetId,
      status: 'queued',
      progress: 0,
      start_time: new Date().toISOString(),
      metrics: {},
      hyperparameters: dto.hyperparameters || {},
      logs: ['Job created']
    }
    this.jobs.push(newJob)
    return newJob
  }

  async cancelTraining(id: string): Promise<boolean> {
    const job = await this.getJobById(id)
    if (!job) return false
    if (job.status === 'completed' || job.status === 'failed' || job.status === 'cancelled') return false
    job.status = 'cancelled'
    job.logs.push('Job cancelled')
    return true
  }
} 