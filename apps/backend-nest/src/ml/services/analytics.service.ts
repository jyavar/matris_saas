import { Injectable, NotFoundException } from '@nestjs/common'
import { MLAnalysis, MLFeature, MLListResponse } from '../interfaces/ml.interfaces'

@Injectable()
export class AnalyticsService {
  private analyses: MLAnalysis[] = [
    {
      id: 'analysis-1',
      dataset_id: 'dataset-1',
      type: 'exploratory',
      status: 'completed',
      results: { total_samples: 15000, missing_values: 0.02 },
      visualizations: ['correlation_matrix.png', 'feature_distribution.png'],
      insights: ['Dataset is well-balanced', 'No significant outliers detected'],
      created_at: '2024-01-15T14:30:00Z',
      duration: 300
    }
  ]

  private features: MLFeature[] = [
    {
      id: 'feature-1',
      name: 'age',
      type: 'numerical',
      importance: 0.85,
      correlation: 0.72,
      missing_values: 0,
      unique_values: 45,
      mean: 35.2,
      std: 12.1,
      min: 18,
      max: 75,
      distribution: { '18-25': 0.2, '26-35': 0.3, '36-45': 0.25, '46+': 0.25 }
    }
  ]

  async getAllAnalyses(limit = 20, offset = 0, type?: string): Promise<MLListResponse<MLAnalysis>> {
    let filtered = this.analyses
    if (type) filtered = filtered.filter(a => a.type === type)
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

  async getAnalysisById(id: string): Promise<MLAnalysis | null> {
    return this.analyses.find(a => a.id === id) || null
  }

  async runAnalysis(datasetId: string, analysisType: string, parameters?: Record<string, unknown>): Promise<MLAnalysis> {
    const newAnalysis: MLAnalysis = {
      id: `analysis-${Date.now()}`,
      dataset_id: datasetId,
      type: analysisType as MLAnalysis['type'],
      status: 'running',
      results: {},
      visualizations: [],
      insights: [],
      created_at: new Date().toISOString(),
      duration: 0
    }
    this.analyses.push(newAnalysis)
    return newAnalysis
  }

  async analyzeFeatures(datasetId: string): Promise<MLFeature[]> {
    return this.features.filter(f => f.id.includes(datasetId))
  }

  async getFeatureImportance(modelId: string): Promise<MLFeature[]> {
    return this.features.sort((a, b) => b.importance - a.importance)
  }
} 