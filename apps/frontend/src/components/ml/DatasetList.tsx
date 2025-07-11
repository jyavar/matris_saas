'use client'

import React from 'react'
import { useML } from '@/contexts/MLContext'
import { MLDataset } from '@/services/ml.service'

const DatasetList: React.FC = () => {
  const { state, selectDataset, fetchDatasets } = useML()

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'ready':
        return 'text-green-600 dark:text-green-400'
      case 'processing':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'uploading':
        return 'text-blue-600 dark:text-blue-400'
      case 'error':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getValidationStatusColor = (status: string): string => {
    switch (status) {
      case 'validated':
        return 'text-green-600 dark:text-green-400'
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'failed':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDatasetClick = (dataset: MLDataset) => {
    selectDataset(dataset)
  }

  return (
    <section 
      aria-label="Dataset List" 
      className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Datasets ({state.datasets.length})
        </h3>
        <button
          onClick={fetchDatasets}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          aria-label="Refresh datasets"
        >
          Refresh
        </button>
      </div>

      {state.datasets.length > 0 ? (
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
                  Size
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Samples
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Validation
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {state.datasets.map((dataset) => (
                <tr 
                  key={dataset.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="py-3 px-2">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {dataset.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {dataset.format.toUpperCase()}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-gray-700 dark:text-gray-300">
                      {dataset.type.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-gray-700 dark:text-gray-300">
                      {formatFileSize(dataset.size)}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-gray-700 dark:text-gray-300">
                      {dataset.samples.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`font-medium ${getStatusColor(dataset.status)}`}>
                      {dataset.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`font-medium ${getValidationStatusColor(dataset.validation_status)}`}>
                      {dataset.validation_status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleDatasetClick(dataset)}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        aria-label={`View ${dataset.name}`}
                      >
                        View
                      </button>
                      {dataset.status === 'ready' && dataset.validation_status === 'pending' && (
                        <button
                          className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded hover:bg-yellow-200 dark:hover:bg-yellow-900/40"
                          aria-label={`Validate ${dataset.name}`}
                        >
                          Validate
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
            No datasets found
          </div>
          <button
            onClick={fetchDatasets}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load Datasets
          </button>
        </div>
      )}
    </section>
  )
}

export default DatasetList 