import { describe, expect, it, vi } from 'vitest'

import { createOpenAIClient } from './client'

// 1. Crea una clase Mock que simula la original
class MockOpenAI {
  apiKey: string
  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey
  }
  // Mockea cualquier otro método que uses
  chat = {
    completions: {
      create: vi.fn(),
    },
  }
}

describe('@strato-ai/core client with dependency injection', () => {
  it('should create an OpenAI client instance using the provided mock class', () => {
    // 2. Inyecta la clase Mock en el cliente
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const openaiClient = createOpenAIClient(MockOpenAI as any)

    // 3. Realiza las aserciones
    // Verifica que el cliente es una instancia de NUESTRA clase mock
    expect(openaiClient).toBeInstanceOf(MockOpenAI)
    // Opcional: verifica que la API key se pasó correctamente
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((openaiClient as any).apiKey).toBeDefined()
  })
})
