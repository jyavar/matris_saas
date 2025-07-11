import React, { useState } from 'react'
import { useML } from '@/contexts/MLContext'
import { MLService } from '@/services/ml.service'

const PredictionForm: React.FC = () => {
  const { state, fetchPredictions } = useML()
  const [selectedModelId, setSelectedModelId] = useState<string>('')
  const [inputData, setInputData] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [prediction, setPrediction] = useState<{
    result: unknown
    confidence: number
    processingTime: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const readyModels = state.models.filter(model => model.status === 'ready' || model.status === 'deployed')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedModelId || !inputData.trim()) {
      setError('Please select a model and provide input data')
      return
    }

    setIsLoading(true)
    setError(null)
    setPrediction(null)

    try {
      let parsedInput: unknown
      try {
        parsedInput = JSON.parse(inputData)
      } catch {
        // Si no es JSON válido, tratar como string
        parsedInput = inputData
      }

      const response = await MLService.makePrediction(selectedModelId, parsedInput)
      
      if (response.success && response.data) {
        setPrediction({
          result: response.data.prediction,
          confidence: response.data.confidence,
          processingTime: response.metadata?.processing_time || 0
        })
        
        // Actualizar historial de predicciones
        await fetchPredictions(selectedModelId)
      } else {
        setError(response.error || 'Prediction failed')
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const getModelName = (modelId: string): string => {
    const model = state.models.find(m => m.id === modelId)
    return model?.name || modelId
  }

  return (
    <section 
      aria-label="Prediction Form" 
      className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Make Prediction
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Model Selection */}
        <div>
          <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Model
          </label>
          <select
            id="model-select"
            value={selectedModelId}
            onChange={(e) => setSelectedModelId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Choose a model...</option>
            {readyModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.type})
              </option>
            ))}
          </select>
        </div>

        {/* Input Data */}
        <div>
          <label htmlFor="input-data" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Data (JSON or text)
          </label>
          <textarea
            id="input-data"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder='{"feature1": "value1", "feature2": 123} or plain text'
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !selectedModelId || !inputData.trim()}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? 'Making Prediction...' : 'Predict'}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <div className="text-sm text-red-700 dark:text-red-400">
            Error: {error}
          </div>
        </div>
      )}

      {/* Prediction Result */}
      {prediction && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
            Prediction Result
          </h4>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Result: </span>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {typeof prediction.result === 'object' 
                  ? JSON.stringify(prediction.result, null, 2)
                  : String(prediction.result)
                }
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence: </span>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {(prediction.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Processing Time: </span>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {prediction.processingTime}ms
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Model Info */}
      {selectedModelId && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Selected:</strong> {getModelName(selectedModelId)}
          </div>
        </div>
      )}
    </section>
  )
}

export default PredictionForm 