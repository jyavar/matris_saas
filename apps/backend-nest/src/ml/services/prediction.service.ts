import { Injectable, NotFoundException } from '@nestjs/common'
import { MLPrediction, MLListResponse } from '../interfaces/ml.interfaces'
import { MakePredictionDto } from '../dto/ml.dto'

@Injectable()
export class PredictionService {
  private predictions: MLPrediction[] = []

  async makePrediction(dto: MakePredictionDto): Promise<MLPrediction> {
    // Simulación de inferencia
    const prediction: MLPrediction = {
      id: `pred-${Date.now()}`,
      model_id: dto.modelId,
      input_data: dto.inputData,
      prediction: { result: 'positive' },
      confidence: 0.92,
      timestamp: new Date().toISOString(),
      processing_time: 120,
      metadata: { deploymentId: dto.deploymentId }
    }
    this.predictions.push(prediction)
    return prediction
  }

  async getPredictionHistory(modelId: string, limit = 20, offset = 0): Promise<MLListResponse<MLPrediction>> {
    const filtered = this.predictions.filter(p => p.model_id === modelId)
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
} 