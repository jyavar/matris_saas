import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import runAgent, { ContextWatchdogDeps } from '../../context-watchdog'

type WriteFileSync = (file: string, data: string) => void

describe('@context-watchdog agent', () => {
  let writeFileSyncMock: WriteFileSync
  let getManifestMock: () => { validPaths: string[]; forbiddenPaths: string[] }
  let getChangedFilesAgainstMainMock: () => string[]
  let validateFilesMock: ReturnType<typeof vi.fn>
  let writeLogMock: (logMessage: string) => void

  beforeEach(() => {
    writeFileSyncMock = vi.fn()
    getManifestMock = vi.fn(() => ({
      validPaths: ['src/'],
      forbiddenPaths: ['forbidden/'],
    }))
    getChangedFilesAgainstMainMock = vi.fn(() => [
      'src/ok.ts',
      'forbidden/bad.ts',
    ])
    validateFilesMock = vi.fn()
    writeLogMock = vi.fn()
    vi.stubGlobal('fs', { existsSync: () => true })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('genera log de error si hay archivos en rutas inválidas', async () => {
    validateFilesMock.mockImplementation(() => ['forbidden/bad.ts'])
    const deps: ContextWatchdogDeps = {
      writeFileSync: writeFileSyncMock,
      getManifest: getManifestMock,
      getChangedFilesAgainstMain: getChangedFilesAgainstMainMock,
      validateFiles: validateFilesMock,
      writeLog: writeLogMock,
    }
    await runAgent(deps)
    expect(writeFileSyncMock).toHaveBeenCalled()
    const [, content] = (
      writeFileSyncMock as unknown as { mock: { calls: [string, string][] } }
    ).mock.calls[0]
    const log = JSON.parse(content)
    expect(log.status).toBe('fail')
    expect(log).toHaveProperty('timestamp')
    expect(log).toHaveProperty('agentName', '@context-watchdog')
    expect(log).toHaveProperty('errors')
    expect(Array.isArray(log.errors)).toBe(true)
    expect(log.errors.length).toBeGreaterThan(0)
    expect(log).toHaveProperty('actionsPerformed')
    expect(Array.isArray(log.actionsPerformed)).toBe(true)
    expect(log.actionsPerformed.length).toBeGreaterThan(0)
    expect(writeLogMock).toHaveBeenCalled()
  })

  it('genera log ok si no hay archivos inválidos', async () => {
    validateFilesMock.mockImplementation(() => [])
    const deps: ContextWatchdogDeps = {
      writeFileSync: writeFileSyncMock,
      getManifest: getManifestMock,
      getChangedFilesAgainstMain: getChangedFilesAgainstMainMock,
      validateFiles: validateFilesMock,
      writeLog: writeLogMock,
    }
    await runAgent(deps)
    const [, content] = (
      writeFileSyncMock as unknown as { mock: { calls: [string, string][] } }
    ).mock.calls[0]
    const log = JSON.parse(content)
    expect(log.status).toBe('ok')
    expect(log).toHaveProperty('timestamp')
    expect(log).toHaveProperty('agentName', '@context-watchdog')
    expect(log).toHaveProperty('errors')
    expect(Array.isArray(log.errors)).toBe(true)
    expect(log.errors.length).toBe(0)
    expect(log).toHaveProperty('actionsPerformed')
    expect(Array.isArray(log.actionsPerformed)).toBe(true)
    expect(log.actionsPerformed.length).toBeGreaterThan(0)
  })
})
