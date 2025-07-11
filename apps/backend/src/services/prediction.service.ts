import { MLPrediction, MakePredictionDto } from '../types/ml.types.js'

export class PredictionService {
  private predictions: MLPrediction[] = [
    {
      id: 'pred-1',
      model_id: 'model-1',
      input_data: {
        age: 35,
        income: 75000,
        tenure: 24,
        monthly_charges: 79.99,
        total_charges: 1919.76,
      },
      prediction: false,
      confidence: 0.89,
      timestamp: '2024-01-22T15:30:00Z',
      processing_time: 0.045,
      metadata: {
        model_version: '1.0.0',
        feature_importance: {
          monthly_charges: 0.25,
          tenure: 0.20,
          age: 0.15,
          income: 0.10,
        },
      },
    },
    {
      id: 'pred-2',
      model_id: 'model-2',
      input_data: {
        product_id: 'PROD001',
        region: 'North',
        season: 'Q1',
        previous_sales: 150,
      },
      prediction: 175.5,
      confidence: 0.92,
      timestamp: '2024-01-22T15:25:00Z',
      processing_time: 0.032,
      metadata: {
        model_version: '2.1.0',
        prediction_interval: [165.2, 185.8],
      },
    },
  ]

  async makePrediction(makePredictionDto: MakePredictionDto): Promise<MLPrediction> {
    const startTime = Date.now()
    
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 20))
    
    const processingTime = (Date.now() - startTime) / 1000

    // Simulate different prediction logic based on model type
    let prediction: unknown
    let confidence: number

    if (makePredictionDto.modelId === 'model-1') {
      // Classification model (churn prediction)
      const input = makePredictionDto.inputData
      const monthlyCharges = input.monthly_charges as number
      const tenure = input.tenure as number
      
      // Simple heuristic for demo
      prediction = monthlyCharges > 80 && tenure < 12
      confidence = 0.85 + Math.random() * 0.1
    } else if (makePredictionDto.modelId === 'model-2') {
      // Regression model (sales forecast)
      const input = makePredictionDto.inputData
      const previousSales = input.previous_sales as number
      
      // Simple trend-based prediction
      prediction = previousSales * (1 + Math.random() * 0.2 - 0.1)
      confidence = 0.90 + Math.random() * 0.08
    } else {
      // Default prediction
      prediction = Math.random() > 0.5
      confidence = 0.75 + Math.random() * 0.2
    }

    const newPrediction: MLPrediction = {
      id: `pred-${Date.now()}`,
      model_id: makePredictionDto.modelId,
      input_data: makePredictionDto.inputData,
      prediction,
      confidence,
      timestamp: new Date().toISOString(),
      processing_time: processingTime,
      metadata: {
        model_version: '1.0.0',
        deployment_id: makePredictionDto.deploymentId,
        feature_importance: this.generateFeatureImportance(makePredictionDto.inputData),
      },
    }

    this.predictions.push(newPrediction)
    return newPrediction
  }

  async getPredictionById(id: string): Promise<MLPrediction | null> {
    return this.predictions.find((pred) => pred.id === id) || null
  }

  async getPredictionHistory(modelId: string, limit = 50): Promise<MLPrediction[]> {
    return this.predictions
      .filter((pred) => pred.model_id === modelId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }

  async getPredictionStats(modelId: string): Promise<{
    total_predictions: number
    average_confidence: number
    average_processing_time: number
    predictions_today: number
    accuracy: number
  }> {
    const modelPredictions = this.predictions.filter((pred) => pred.model_id === modelId)
    
    if (modelPredictions.length === 0) {
      return {
        total_predictions: 0,
        average_confidence: 0,
        average_processing_time: 0,
        predictions_today: 0,
        accuracy: 0,
      }
    }

    const totalPredictions = modelPredictions.length
    const averageConfidence = modelPredictions.reduce((sum, pred) => sum + pred.confidence, 0) / totalPredictions
    const averageProcessingTime = modelPredictions.reduce((sum, pred) => sum + pred.processing_time, 0) / totalPredictions
    
    const today = new Date().toDateString()
    const predictionsToday = modelPredictions.filter((pred) => 
      new Date(pred.timestamp).toDateString() === today
    ).length

    return {
      total_predictions: totalPredictions,
      average_confidence: averageConfidence,
      average_processing_time: averageProcessingTime,
      predictions_today: predictionsToday,
      accuracy: 0.87, // Simulated accuracy
    }
  }

  async batchPredict(
    modelId: string,
    inputDataArray: Record<string, unknown>[]
  ): Promise<MLPrediction[]> {
    const predictions: MLPrediction[] = []

    for (const inputData of inputDataArray) {
      const prediction = await this.makePrediction({
        modelId,
        inputData,
      })
      predictions.push(prediction)
    }

    return predictions
  }

  private generateFeatureImportance(inputData: Record<string, unknown>): Record<string, number> {
    const features = Object.keys(inputData)
    const importance: Record<string, number> = {}
    
    features.forEach((feature, index) => {
      importance[feature] = Math.max(0.1, 1 - index * 0.15)
    })

    return importance
  }

  async getModelPerformance(modelId: string): Promise<{
    accuracy: number
    precision: number
    recall: number
    f1_score: number
    confusion_matrix: number[][]
    roc_auc: number
  }> {
    // Simulated performance metrics
    return {
      accuracy: 0.89,
      precision: 0.87,
      recall: 0.91,
      f1_score: 0.89,
      confusion_matrix: [
        [150, 15],
        [20, 180],
      ],
      roc_auc: 0.92,
    }
  }
} 