import OpenAI from 'openai'

export class OpenAIService {
  private static getClient() {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) throw new Error('OPENAI_API_KEY no definido')
    return new OpenAI({ apiKey })
  }

  static async sendPrompt(prompt: string): Promise<string> {
    const client = this.getClient()
    const res = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    })
    return res.choices[0]?.message?.content?.trim() || ''
  }
}
