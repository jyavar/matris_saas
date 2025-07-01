import cron, { ScheduledTask } from 'node-cron'

export interface RuntimeJob {
  id: string
  schedule: string
  task: () => void
  running: boolean
  ref?: ScheduledTask
}

const jobs: Record<string, RuntimeJob> = {}

export class RuntimeService {
  static listJobs(): RuntimeJob[] {
    return Object.values(jobs)
  }

  static createJob(id: string, schedule: string, task: () => void): RuntimeJob {
    if (jobs[id]) throw new Error('Job already exists')
    const ref = cron.schedule(schedule, task, { scheduled: true })
    const job: RuntimeJob = { id, schedule, task, running: true, ref }
    jobs[id] = job
    return job
  }

  static pauseJob(id: string): void {
    const job = jobs[id]
    if (!job || !job.ref) throw new Error('Job not found')
    job.ref.stop()
    job.running = false
  }

  static resumeJob(id: string): void {
    const job = jobs[id]
    if (!job || !job.ref) throw new Error('Job not found')
    job.ref.start()
    job.running = true
  }

  static deleteJob(id: string): void {
    const job = jobs[id]
    if (!job || !job.ref) throw new Error('Job not found')
    // @ts-expect-error - node-cron type issue
    job.ref.destroy()
    delete jobs[id]
  }

  // Orquestación real de agentes
  static async runAgent(
    name: string,
    opts: Record<string, unknown> = {},
    importer: (
      path: string,
    ) => Promise<{ runAgent: (...args: unknown[]) => Promise<unknown> }> = (
      p,
    ) => import(p),
  ): Promise<{ ok: boolean; result?: unknown; error?: string }> {
    try {
      // Mapear nombre de agente a path real
      const agentMap: Record<string, string> = {
        refactor: '../../scripts/agents/refactor/autofix.ts',
        // Agrega aquí otros agentes según convención
      }
      const agentPath = agentMap[name]
      if (!agentPath) {
        return { ok: false, error: `Agente '${name}' no registrado.` }
      }
      const mod = await importer(agentPath)
      if (typeof mod.runAgent !== 'function') {
        return { ok: false, error: `Agente '${name}' no tiene runAgent()` }
      }
      const result = await mod.runAgent(opts)
      return { ok: true, result }
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) }
    }
  }
}
