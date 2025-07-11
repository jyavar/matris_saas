'use client'

import React from 'react'
import { useML } from '@/contexts/MLContext'
import { MLTrainingJob } from '@/services/ml.service'

const TrainingJobList: React.FC = () => {
  const { state, selectJob, fetchTrainingJobs } = useML()

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400'
      case 'running':
        return 'text-blue-600 dark:text-blue-400'
      case 'queued':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'failed':
        return 'text-red-600 dark:text-red-400'
      case 'cancelled':
        return 'text-gray-600 dark:text-gray-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  const getModelName = (modelId: string): string => {
    const model = state.models.find(m => m.id === modelId)
    return model?.name || modelId.slice(0, 8)
  }

  const getDatasetName = (datasetId: string): string => {
    const dataset = state.datasets.find(d => d.id === datasetId)
    return dataset?.name || datasetId.slice(0, 8)
  }

  const handleJobClick = (job: MLTrainingJob) => {
    selectJob(job)
  }

  return (
    <section 
      aria-label="Training Job List" 
      className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Training Jobs ({state.trainingJobs.length})
        </h3>
        <button
          onClick={fetchTrainingJobs}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          aria-label="Refresh training jobs"
        >
          Refresh
        </button>
      </div>

      {state.trainingJobs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Job ID
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Model
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Dataset
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Progress
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Duration
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {state.trainingJobs.map((job) => (
                <tr 
                  key={job.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="py-3 px-2">
                    <div className="font-mono text-xs text-gray-600 dark:text-gray-400">
                      {job.id.slice(0, 12)}...
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-gray-700 dark:text-gray-300">
                      {getModelName(job.model_id)}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-gray-700 dark:text-gray-300">
                      {getDatasetName(job.dataset_id)}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`font-medium ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    {job.status === 'running' ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {job.progress}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        {job.progress}%
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    {job.duration ? (
                      <span className="text-gray-700 dark:text-gray-300">
                        {formatDuration(job.duration)}
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">
                        -
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleJobClick(job)}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        aria-label={`View job ${job.id}`}
                      >
                        View
                      </button>
                      {job.status === 'running' && (
                        <button
                          className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/40"
                          aria-label={`Cancel job ${job.id}`}
                        >
                          Cancel
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
            No training jobs found
          </div>
          <button
            onClick={fetchTrainingJobs}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load Jobs
          </button>
        </div>
      )}
    </section>
  )
}

export default TrainingJobList 