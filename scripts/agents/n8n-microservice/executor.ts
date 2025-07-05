import { appendFileSync, writeFileSync } from 'fs'

export interface N8nJob {
  id: string
  service: string
  input: Record<string, unknown>
  price: number
  status: 'pending' | 'running' | 'completed' | 'failed'
}

export interface N8nResult {
  jobId: string
  output: Record<string, unknown>
  success: boolean
}

export class N8nMicroserviceAgent {
  private jobs: N8nJob[] = []

  constructor(private apiKey: string) {}

  async fetchPendingJobs(): Promise<N8nJob[]> {
    // Simulación de fetch a la API de N8N
    this.jobs = [
      {
        id: '1',
        service: 'scraping',
        input: { url: 'https://example.com' },
        price: 5,
        status: 'pending',
      },
    ]
    return this.jobs.filter((j) => j.status === 'pending')
  }

  async takeJob(jobId: string): Promise<N8nJob | undefined> {
    const job = this.jobs.find((j) => j.id === jobId)
    if (job && job.status === 'pending') {
      job.status = 'running'
      return job
    }
    return undefined
  }

  async executeService(job: N8nJob): Promise<N8nResult> {
    // Simulación de ejecución de microservicio
    const output: Record<string, unknown> = { result: 'simulado' }
    return { jobId: job.id, output, success: true }
  }

  async deliverResult(job: N8nJob, result: N8nResult): Promise<boolean> {
    job.status = result.success ? 'completed' : 'failed'
    writeFileSync(`./${job.id}_result.json`, JSON.stringify(result, null, 2))
    return result.success
  }

  async run(): Promise<void> {
    const jobs = await this.fetchPendingJobs()
    for (const job of jobs) {
      const taken = await this.takeJob(job.id)
      if (!taken) continue
      const result = await this.executeService(taken)
      await this.deliverResult(taken, result)
      this.logAction('completed', taken.id)
    }
  }

  private logAction(action: string, jobId: string): void {
    appendFileSync(
      './n8n-microservice.log',
      `${new Date().toISOString()} [${action}] job: ${jobId}\n`,
    )
  }
}

export async function runAgent() {
  const agent = new N8nMicroserviceAgent('FAKE_API_KEY')
  await agent.run()
}
