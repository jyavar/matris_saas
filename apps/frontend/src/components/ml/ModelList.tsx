import React from 'react'
import { useML } from '@/contexts/MLContext'
import { MLModel } from '@/services/ml.service'

const ModelList: React.FC = () => {
  const { state, selectModel, fetchModels } = useML()

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'ready':
        return 'text-green-600 dark:text-green-400'
      case 'training':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'deployed':
        return 'text-blue-600 dark:text-blue-400'
      case 'error':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getTypeLabel = (type: string): string => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const handleModelClick = (model: MLModel) => {
    selectModel(model)
  }

  return (
    <section 
      aria-label="Model List" 
      className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Models ({state.models.length})
        </h3>
        <button
          onClick={fetchModels}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          aria-label="Refresh models"
        >
          Refresh
        </button>
      </div>

      {state.models.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Type
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Accuracy
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Created
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {state.models.map((model) => (
                <tr 
                  key={model.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="py-3 px-2">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {model.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        v{model.version}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-gray-700 dark:text-gray-300">
                      {getTypeLabel(model.type)}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`font-medium ${getStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    {model.accuracy ? (
                      <span className="text-gray-700 dark:text-gray-300">
                        {(model.accuracy * 100).toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">
                        -
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-gray-700 dark:text-gray-300">
                      {new Date(model.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleModelClick(model)}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        aria-label={`View ${model.name}`}
                      >
                        View
                      </button>
                      {model.status === 'ready' && (
                        <button
                          className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40"
                          aria-label={`Deploy ${model.name}`}
                        >
                          Deploy
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 mb-2">
            No models found
          </div>
          <button
            onClick={fetchModels}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load Models
          </button>
        </div>
      )}
    </section>
  )
}

export default ModelList 