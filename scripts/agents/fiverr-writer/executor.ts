import fs from 'fs'

export interface FiverrGig {
  id: string
  title: string
  description: string
  price: number
  status: 'open' | 'taken' | 'delivered'
  client: string
}

export interface Article {
  title: string
  content: string
}

export class FiverrWriterAgent {
  private gigs: FiverrGig[] = []

  constructor(private apiKey: string) {}

  async fetchOpenGigs(): Promise<FiverrGig[]> {
    // Simulación de fetch a la API de Fiverr
    this.gigs = [
      {
        id: '1',
        title: 'Blog sobre IA',
        description: 'Escribe un blog sobre IA',
        price: 20,
        status: 'open',
        client: 'clientA',
      },
    ]
    return this.gigs.filter((g) => g.status === 'open')
  }

  async takeGig(gigId: string): Promise<FiverrGig | undefined> {
    const gig = this.gigs.find((g) => g.id === gigId)
    if (gig && gig.status === 'open') {
      gig.status = 'taken'
      return gig
    }
    return undefined
  }

  async writeArticle(gig: FiverrGig): Promise<Article> {
    // Simulación de generación de texto
    return {
      title: gig.title,
      content: `Artículo generado automáticamente para: ${gig.description}`,
    }
  }

  async deliverArticle(gig: FiverrGig, article: Article): Promise<boolean> {
    // Simulación de entrega
    gig.status = 'delivered'
    fs.writeFileSync(`./${gig.id}_article.txt`, article.content)
    return true
  }

  async run(): Promise<void> {
    const gigs = await this.fetchOpenGigs()
    for (const gig of gigs) {
      const taken = await this.takeGig(gig.id)
      if (!taken) continue
      const article = await this.writeArticle(taken)
      await this.deliverArticle(taken, article)
      this.logAction('delivered', taken.id)
    }
  }

  private logAction(action: string, gigId: string): void {
    fs.appendFileSync(
      './fiverr-writer.log',
      `${new Date().toISOString()} [${action}] gig: ${gigId}\n`,
    )
  }
}

// Para orquestador
export async function runAgent() {
  const agent = new FiverrWriterAgent('FAKE_API_KEY')
  await agent.run()
}
