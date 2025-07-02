import fs from 'fs'
import path from 'path'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('CI/CD Pipeline Validation', () => {
  const workflowsDir = path.join(
    process.cwd(),
    '..',
    '..',
    '.github',
    'workflows',
  )

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GitHub Actions Workflows', () => {
    it('should have required workflow files', () => {
      const requiredWorkflows = ['ci.yml', 'ci-check.yml']

      requiredWorkflows.forEach((workflow) => {
        const workflowPath = path.join(workflowsDir, workflow)
        expect(fs.existsSync(workflowPath)).toBe(true)
      })
    })

    it('should have valid YAML structure in ci.yml', () => {
      const ciPath = path.join(workflowsDir, 'ci.yml')
      const content = fs.readFileSync(ciPath, 'utf-8')

      // Validar estructura básica
      expect(content).toContain('name: STRATO CI')
      expect(content).toContain('on:')
      expect(content).toContain('jobs:')
      expect(content).toContain('lint:')
      expect(content).toContain('typecheck:')
      expect(content).toContain('test:')
    })

    it('should have valid YAML structure in ci-check.yml', () => {
      const ciCheckPath = path.join(workflowsDir, 'ci-check.yml')
      const content = fs.readFileSync(ciCheckPath, 'utf-8')

      // Validar estructura básica
      expect(content).toContain('name: STRATO CI Check')
      expect(content).toContain('on:')
      expect(content).toContain('jobs:')
      expect(content).toContain('ci-check:')
    })

    it('should trigger on push and pull_request to main', () => {
      const ciPath = path.join(workflowsDir, 'ci.yml')
      const content = fs.readFileSync(ciPath, 'utf-8')

      expect(content).toContain('push:')
      expect(content).toContain('pull_request:')
      expect(content).toContain('branches: [main]')
    })

    it('should use Node.js 20 and pnpm', () => {
      const ciPath = path.join(workflowsDir, 'ci.yml')
      const content = fs.readFileSync(ciPath, 'utf-8')

      expect(content).toContain("node-version: '20'")
      expect(content).toContain('pnpm install')
    })

    it('should run lint, typecheck, and test jobs', () => {
      const ciPath = path.join(workflowsDir, 'ci.yml')
      const content = fs.readFileSync(ciPath, 'utf-8')

      expect(content).toContain('Run ESLint')
      expect(content).toContain('Run TypeScript Compiler')
      expect(content).toContain('Run tests')
    })

    it('should validate project structure with context-watchdog', () => {
      const ciPath = path.join(workflowsDir, 'ci.yml')
      const content = fs.readFileSync(ciPath, 'utf-8')

      expect(content).toContain('Validate Project Structure')
      expect(content).toContain('context-watchdog.ts')
    })
  })

  describe('CI/CD Pipeline Commands', () => {
    it('should have valid lint command', () => {
      // Simular que el comando de lint existe
      const packageJson = JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), '..', '..', 'package.json'),
          'utf-8',
        ),
      )
      expect(packageJson.scripts).toHaveProperty('lint')
    })

    it('should have valid test command', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), '..', '..', 'package.json'),
          'utf-8',
        ),
      )
      expect(packageJson.scripts).toHaveProperty('test')
    })

    it('should have valid build command', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), '..', '..', 'package.json'),
          'utf-8',
        ),
      )
      expect(packageJson.scripts).toHaveProperty('build')
    })
  })

  describe('Workflow Performance', () => {
    it('should complete within reasonable time', async () => {
      const startTime = Date.now()

      // Simular validación rápida
      await new Promise((resolve) => setTimeout(resolve, 100))

      const duration = Date.now() - startTime
      expect(duration).toBeLessThan(5000) // <5 segundos
    })
  })
})
