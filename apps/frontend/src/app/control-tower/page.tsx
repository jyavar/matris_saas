import { useEffect, useState } from 'react'

import { Card } from '../../components/ui/card.js'
import {
  EventReport,
  getEventReport,
  getUsageReport,
  UsageReport,
} from '../../lib/reporting.api.js'

const PERIODS = ['2024-07', '2024-06']
const EVENTS = ['login', 'signup']

export default function ControlTowerPage() {
  const [period, setPeriod] = useState(PERIODS[0])
  const [event, setEvent] = useState(EVENTS[0])
  const [usage, setUsage] = useState<UsageReport | null>(null)
  const [eventReport, setEventReport] = useState<EventReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchReports(p = period, e = event) {
    setLoading(true)
    setError(null)
    try {
      const usageData = await getUsageReport(p)
      const eventData = await getEventReport(e, p)
      setUsage(usageData)
      setEventReport(eventData)
    } catch (e) {
      setError((e as Error).message)
      setUsage(null)
      setEventReport(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, event])

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Control Tower: Reporting</h1>
      <div className="flex gap-4 mb-4">
        <label>
          Periodo:
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            {PERIODS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label>
          Evento:
          <select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            {EVENTS.map((ev) => (
              <option key={ev} value={ev}>
                {ev}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={() => fetchReports()}
          className="ml-4 px-3 py-1 bg-blue-600 text-white rounded"
        >
          Actualizar
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {usage && (
        <Card className="mb-4 p-4">
          <h2 className="font-semibold mb-2">Usage Report ({usage.period})</h2>
          <div>Total Users: {usage.totalUsers}</div>
          <div>Active Users: {usage.activeUsers}</div>
          <div>Total Events: {usage.totalEvents}</div>
        </Card>
      )}
      {eventReport && (
        <Card className="mb-4 p-4">
          <h2 className="font-semibold mb-2">
            Event Report: {eventReport.event} ({eventReport.period})
          </h2>
          <div>Count: {eventReport.count}</div>
        </Card>
      )}
    </div>
  )
}
