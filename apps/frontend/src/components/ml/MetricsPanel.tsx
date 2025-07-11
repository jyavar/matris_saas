'use client'
import React from 'react'
import { useML } from '@/contexts/MLContext'

const MetricsPanel: React.FC = () => {
  const { state } = useML()

  const metrics = [
    {
      label: 'Total Models',
      value: state.models.length,
      description: 'Models available'
    },
    {
      label: 'Active Jobs',
      value: state.trainingJobs.filter(job => job.status === 'running').length,
      description: 'Training in progress'
    },
    {
      label: 'Datasets',
      value: state.datasets.length,
      description: 'Available datasets'
    },
    {
      label: 'Deployments',
      value: state.deployments.filter(dep => dep.status === 'active').length,
      description: 'Active deployments'
    },
    {
      label: 'Predictions',
      value: state.predictions.length,
      description: 'Total predictions'
    },
    {
      label: 'Analyses',
      value: state.analyses.length,
      description: 'Completed analyses'
    }
  ]

  return (
    <section 
      aria-label="ML Metrics Panel" 
      className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        System Overview
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric) => (
          <div 
            key={metric.label}
            className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {metric.value}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {metric.label}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {metric.description}
            </div>
          </div>
        ))}
      </div>
      
      {state.lastSync && (
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          Last updated: {new Date(state.lastSync).toLocaleString()}
        </div>
      )}
    </section>
  )
}

export default MetricsPanel 