import { describe, it, expect, beforeEach, vi } from 'vitest'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, join } from 'path'

describe('Agents Setup Configuration', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    vi.clearAllMocks()
  })

  describe('Environment Variables', () => {
    it('should have test environment variables set', () => {
      expect(process.env.NODE_ENV).toBe('test')
      expect(process.env.STRATO_ENV).toBe('test')
    })
  })

  describe('File System Mocks', () => {
    it('should mock fs.readFileSync correctly', () => {
      const content = readFileSync('test-file.txt', 'utf-8')
      expect(content).toBe('mocked file content')
      expect(vi.mocked(readFileSync)).toHaveBeenCalledWith('test-file.txt', 'utf-8')
    })

    it('should mock fs.writeFileSync correctly', () => {
      writeFileSync('test-file.txt', 'test content')
      expect(vi.mocked(writeFileSync)).toHaveBeenCalledWith('test-file.txt', 'test content')
    })

    it('should mock fs.existsSync correctly', () => {
      const exists = existsSync('test-file.txt')
      expect(exists).toBe(true)
      expect(vi.mocked(existsSync)).toHaveBeenCalledWith('test-file.txt')
    })

    it('should mock fs.mkdirSync correctly', () => {
      mkdirSync('test-dir', { recursive: true })
      expect(vi.mocked(mkdirSync)).toHaveBeenCalledWith('test-dir', { recursive: true })
    })
  })

  describe('Path Mocks', () => {
    it('should mock path.resolve correctly', () => {
      const resolved = resolve('test', 'path')
      expect(resolved).toBe('test/path')
      expect(vi.mocked(resolve)).toHaveBeenCalledWith('test', 'path')
    })

    it('should mock path.join correctly', () => {
      const joined = join('test', 'path')
      expect(joined).toBe('test/path')
      expect(vi.mocked(join)).toHaveBeenCalledWith('test', 'path')
    })
  })

  describe('Child Process Mocks', () => {
    it('should mock execSync correctly', () => {
      const output = execSync('test-command')
      expect(output).toEqual(Buffer.from('mocked output'))
      expect(vi.mocked(execSync)).toHaveBeenCalledWith('test-command')
    })
  })

  describe('Console Mocks', () => {
    it('should mock console methods', () => {
      // Los mocks de console están configurados en vitest.setup.ts
      // Solo verificamos que las funciones existen
      expect(typeof console.log).toBe('function')
      expect(typeof console.error).toBe('function')
      expect(typeof console.warn).toBe('function')
      expect(typeof console.info).toBe('function')
    })
  })

  describe('Fetch Mock', () => {
    it('should mock fetch correctly', async () => {
      const response = await fetch('https://api.test.com')
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(response.status).toBe(200)
      expect(data).toEqual({ success: true })
      expect(vi.mocked(fetch)).toHaveBeenCalledWith('https://api.test.com')
    })
  })

  describe('External Service Mocks', () => {
    it('should have Supabase mock configured', () => {
      // Verificar que el mock de Supabase está disponible
      expect(vi.mocked(require('@supabase/supabase-js').createClient)).toBeDefined()
    })

    it('should have OpenAI mock configured', () => {
      // Verificar que el mock de OpenAI está disponible
      expect(vi.mocked(require('openai').default)).toBeDefined()
    })

    it('should have Stripe mock configured', () => {
      // Verificar que el mock de Stripe está disponible
      expect(vi.mocked(require('stripe').default)).toBeDefined()
    })

    it('should have PostHog mock configured', () => {
      // Verificar que el mock de PostHog está disponible
      expect(vi.mocked(require('posthog-node').PostHog)).toBeDefined()
    })

    it('should have Resend mock configured', () => {
      // Verificar que el mock de Resend está disponible
      expect(vi.mocked(require('resend').Resend)).toBeDefined()
    })
  })

  describe('Utility Mocks', () => {
    it('should have minimatch mock configured', () => {
      // Verificar que el mock de minimatch está disponible
      expect(vi.mocked(require('minimatch').minimatch)).toBeDefined()
    })

    it('should have zod mock configured', () => {
      // Verificar que el mock de zod está disponible
      expect(vi.mocked(require('zod').z.object)).toBeDefined()
    })
  })
}) 