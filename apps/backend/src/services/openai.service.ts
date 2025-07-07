import OpenAI from 'openai'

import logger from './logger.service.js'
import { ApiError } from '../utils/ApiError.js'

export interface GenerateTextData {
  prompt: string
  user_id: string
}

export interface GenerateTextResult {
  prompt: string
  result: string
}

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

  async generateText(data: GenerateTextData): Promise<GenerateTextResult> {
    if (!data.prompt) throw new ApiError('Prompt is required', 400)
    // Simulación de integración OpenAI
    logger.info(
      { user_id: data.user_id, prompt: data.prompt },
      'OpenAI prompt recibido',
    )
    // Aquí iría la llamada real a OpenAI
    return {
      prompt: data.prompt,
      result: `Respuesta simulada para: ${data.prompt}`,
    }
  }
}

export const openaiService = new OpenAIService()
