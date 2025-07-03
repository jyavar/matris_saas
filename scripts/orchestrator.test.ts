import { beforeEach, describe, expect, it, vi } from 'vitest'

// Importar el orquestador como ESM dinámico
const orchestratorPath = './orchestrator.ts'

describe('Orchestrator Agent', () => {
  const agentNames = [
    '@refactor',
    '@qa',
    '@data',
    '@docs',
    '@support',
    '@ux',
    '@env',
    '@security',
    '@runtime',
    '@analytics',
    '@perf',
    '@licenses',
    '@merge-strategist',
    '@i18n',
  ]

  let writeFileSyncMock: ReturnType<typeof vi.fn>
  let readFileSyncMock: ReturnType<typeof vi.fn>
  let importMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    writeFileSyncMock = vi.fn()
    readFileSyncMock = vi.fn((path: string) => {
      // Simula un log JSON por agente
      const agent = agentNames.find((a) => path.includes(a.replace('@', '')))
      if (agent) {
        return JSON.stringify({
          status: 'ok',
          agent,
          timestamp: '2025-01-01T00:00:00.000Z',
          summary: `Log de ${agent}`,
        })
      }
      return '{}'
    })
    importMock = vi.fn(async () => {
      return { default: vi.fn(async () => Promise.resolve()) }
    })
    vi.stubGlobal('require', () => ({
      writeFileSync: writeFileSyncMock,
      readFileSync: readFileSyncMock,
    }))
    vi.stubGlobal('fs', {
      writeFileSync: writeFileSyncMock,
      readFileSync: readFileSyncMock,
    })
    vi.stubGlobal('import', importMock)
  })

  it('ejecuta todos los agentes y genera el log maestro correctamente', async () => {
    // Import dinámico del orquestador
    await import(orchestratorPath)
    // El orquestador ejecuta runOrchestration automáticamente
    // Validar que writeFileSync fue llamado para el log maestro
    expect(writeFileSyncMock).toHaveBeenCalled()
    // Validar que todos los agentes fueron importados y ejecutados
    expect(importMock).toHaveBeenCalled()
    // Validar que el log maestro contiene todas las claves de agentes
    const logCall = writeFileSyncMock.mock.calls.find(
      ([path]) =>
        typeof path === 'string' && path.includes('orchestration.json'),
    )
    expect(logCall).toBeDefined()
    if (logCall) {
      const [, logContent] = logCall
      const logJson = JSON.parse(logContent as string)
      for (const agent of agentNames) {
        expect(logJson[agent]).toBeDefined()
        expect(logJson[agent].output).toBeDefined()
        expect(logJson[agent].output.agent).toBe(agent)
      }
    }
  })
})
