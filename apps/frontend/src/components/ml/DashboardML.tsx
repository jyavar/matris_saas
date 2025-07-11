import React from 'react'
import { useML } from '@/contexts/MLContext'

const DashboardML: React.FC = () => {
  const { state } = useML()

  const recentModels = state.models.slice(0, 3)
  const activeJobs = state.trainingJobs.filter(job => job.status === 'running')
  const readyModels = state.models.filter(model => model.status === 'ready')
  const deployedModels = state.models.filter(model => model.status === 'deployed')

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

  return (
    <section 
      aria-label="ML Dashboard" 
      className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        ML Dashboard
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen de modelos */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Model Overview
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {readyModels.length}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                Ready Models
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {deployedModels.length}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Deployed
              </div>
            </div>
          </div>
          
          {recentModels.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recent Models
              </h5>
              <div className="space-y-2">
                {recentModels.map((model) => (
                  <div 
                    key={model.id}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {model.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {model.type}
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${getStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Jobs activos y métricas */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Active Training Jobs
          </h4>
          
          {activeJobs.length > 0 ? (
            <div className="space-y-3">
              {activeJobs.map((job) => (
                <div 
                  key={job.id}
                  className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Job {job.id.slice(0, 8)}
                    </span>
                    <span className="text-xs text-yellow-600 dark:text-yellow-400">
                      {job.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 dark:bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Started: {new Date(job.start_time).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                No active training jobs
              </div>
            </div>
          )}

          {/* Métricas rápidas */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {state.datasets.length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Datasets
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {state.predictions.length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Predictions
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardML 