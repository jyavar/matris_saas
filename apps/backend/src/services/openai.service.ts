import OpenAI from 'openai'

export class OpenAIService {
  private static getClient() {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY no está configurada. Este servicio es opcional en desarrollo.',
      )
    }
    return new OpenAI({ apiKey })
  }

  static async sendPrompt(
    prompt: string,
    client?: {
      chat: {
        completions: {
          create: (
            args: unknown,
          ) => Promise<{ choices: { message: { content: string } }[] }>
        }
      }
    },
  ): Promise<string> {
    try {
      const realClient = client || this.getClient()
      const res = await realClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
      })
      return res.choices[0]?.message?.content?.trim() || ''
    } catch (error) {
      if (error instanceof Error && error.message.includes('OPENAI_API_KEY')) {
        throw new Error('Servicio OpenAI no disponible: API key no configurada')
      }
      throw error
    }
  }
}
