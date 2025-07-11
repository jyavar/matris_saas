import { Injectable, NotFoundException } from '@nestjs/common'
import { MLDataset, MLListResponse } from '../interfaces/ml.interfaces'
import { CreateDatasetDto, UpdateDatasetDto } from '../dto/ml.dto'

@Injectable()
export class DatasetsService {
  private datasets: MLDataset[] = [
    {
      id: 'dataset-1',
      name: 'Customer Data',
      description: 'Datos de clientes para churn',
      size: 15000,
      features: 12,
      samples: 15000,
      type: 'structured',
      format: 'csv',
      created_at: '2024-01-10T10:00:00Z',
      updated_at: '2024-01-15T12:00:00Z',
      status: 'ready',
      validation_status: 'validated',
      schema: { id: 'number', name: 'string', age: 'number', churn: 'boolean' }
    }
    // ...otros datasets simulados
  ]

  async getAllDatasets(limit = 20, offset = 0, type?: string, status?: string): Promise<MLListResponse<MLDataset>> {
    let filtered = this.datasets
    if (type) filtered = filtered.filter(d => d.type === type)
    if (status) filtered = filtered.filter(d => d.status === status)
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

  async getDatasetById(id: string): Promise<MLDataset | null> {
    return this.datasets.find(d => d.id === id) || null
  }

  async createDataset(dto: CreateDatasetDto): Promise<MLDataset> {
    const newDataset: MLDataset = {
      id: `dataset-${Date.now()}`,
      name: dto.name,
      description: dto.description,
      size: 0,
      features: 0,
      samples: 0,
      type: dto.type,
      format: dto.format,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'uploading',
      validation_status: 'pending',
      schema: dto.schema || {}
    }
    this.datasets.push(newDataset)
    return newDataset
  }

  async updateDataset(id: string, dto: UpdateDatasetDto): Promise<MLDataset | null> {
    const idx = this.datasets.findIndex(d => d.id === id)
    if (idx === -1) return null
    const updated = { ...this.datasets[idx], ...dto, updated_at: new Date().toISOString() }
    this.datasets[idx] = updated
    return updated
  }

  async deleteDataset(id: string): Promise<boolean> {
    const idx = this.datasets.findIndex(d => d.id === id)
    if (idx === -1) return false
    this.datasets.splice(idx, 1)
    return true
  }

  async validateDataset(id: string): Promise<MLDataset | null> {
    const dataset = await this.getDatasetById(id)
    if (!dataset) return null
    dataset.validation_status = 'validated'
    dataset.status = 'ready'
    dataset.updated_at = new Date().toISOString()
    return dataset
  }
} 