import * as fs from 'fs'

export interface UpworkJob {
  id: string
  title: string
  audioUrl: string
  price: number
  status: 'open' | 'taken' | 'delivered'
  client: string
}

export interface Transcript {
  jobId: string
  text: string
}

export class UpworkTranscriberAgent {
  private jobs: UpworkJob[] = []

  constructor(private apiKey: string) {}

  async fetchOpenJobs(): Promise<UpworkJob[]> {
    // Simulación de fetch a la API de Upwork
    this.jobs = [
      {
        id: '1',
        title: 'Transcribe audio de entrevista',
        audioUrl: 'audio1.mp3',
        price: 25,
        status: 'open',
        client: 'clientB',
      },
    ]
    return this.jobs.filter((j) => j.status === 'open')
  }

  async takeJob(jobId: string): Promise<UpworkJob | undefined> {
    const job = this.jobs.find((j) => j.id === jobId)
    if (job && job.status === 'open') {
      job.status = 'taken'
      return job
    }
    return undefined
  }

  async downloadAudio(job: UpworkJob): Promise<Buffer> {
    // Simulación de descarga de audio
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    void job
    return Buffer.from('fake-audio')
  }

  async transcribeAudio(audio: Buffer): Promise<string> {
    // Simulación de transcripción
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    void audio
    return 'transcripción simulada'
  }

  async deliverTranscript(
    job: UpworkJob,
    transcript: Transcript,
  ): Promise<boolean> {
    job.status = 'delivered'
    fs.writeFileSync(`./${job.id}_transcript.txt`, transcript.text)
    return true
  }

  async run(): Promise<void> {
    const jobs = await this.fetchOpenJobs()
    for (const job of jobs) {
      const taken = await this.takeJob(job.id)
      if (!taken) continue
      const audio = await this.downloadAudio(taken)
      const text = await this.transcribeAudio(audio)
      const transcript: Transcript = { jobId: taken.id, text }
      await this.deliverTranscript(taken, transcript)
      this.logAction('delivered', taken.id)
    }
  }

  private logAction(action: string, jobId: string): void {
    fs.appendFileSync(
      './upwork-transcriber.log',
      `${new Date().toISOString()} [${action}] job: ${jobId}\n`,
    )
  }
}

export async function runAgent() {
  const agent = new UpworkTranscriberAgent('FAKE_API_KEY')
  await agent.run()
}
