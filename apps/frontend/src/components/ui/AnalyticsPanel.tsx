import React from 'react'

type Metric = {
  label: string
  value: string | number
}

type AnalyticsPanelProps = {
  metrics: Metric[]
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ metrics }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h2 className="font-semibold text-lg mb-2">Analytics</h2>
    <ul className="space-y-1">
      {metrics.map((m, i) => (
        <li key={i} className="flex justify-between text-sm">
          <span className="text-gray-600">{m.label}</span>
          <span className="font-mono font-bold">{m.value}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default AnalyticsPanel
