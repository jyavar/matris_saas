import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockCreate = vi.fn()
const mockClient = {
  chat: {
    completions: {
      create: mockCreate as (
        args: unknown,
      ) => Promise<{ choices: { message: { content: string } }[] }>,
    },
  },
}

describe('OpenAIService', () => {
  let oldEnv: NodeJS.ProcessEnv
  beforeEach(() => {
    oldEnv = { ...process.env }
    mockCreate.mockReset()
  })
  afterEach(() => {
    process.env = oldEnv
    vi.restoreAllMocks()
  })

  it('devuelve respuesta simulada', async () => {
    process.env.OPENAI_API_KEY = 'test-key'
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: 'Hola!' } }],
    })
    const { OpenAIService } = await import('../openai.service.js')
    const res = await OpenAIService.sendPrompt('Hola', mockClient)
    expect(res).toBe('Hola!')
  })

  it('lanza error si falta API key', async () => {
    delete process.env.OPENAI_API_KEY
    const { OpenAIService } = await import('../openai.service.js')
    await expect(OpenAIService.sendPrompt('Hola')).rejects.toThrow(
      'Servicio OpenAI no disponible: API key no configurada',
    )
  })

  it('lanza error si la API falla', async () => {
    process.env.OPENAI_API_KEY = 'test-key'
    mockCreate.mockImplementation(() => {
      throw new Error('fail')
    })
    const { OpenAIService } = await import('../openai.service.js')
    await expect(OpenAIService.sendPrompt('Hola', mockClient)).rejects.toThrow(
      'fail',
    )
  })
})
