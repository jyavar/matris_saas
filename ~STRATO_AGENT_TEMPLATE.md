# 🧬 STRATO AGENT TEMPLATE – ESTRUCTURA ESTÁNDAR 100%

> Este archivo define el estándar oficial que **todo agente del sistema STRATO Core OS™** debe cumplir para ser considerado **completo, validado y listo para producción**. Es usado como plantilla y criterio de validación para auditores, CI/CD y agentes de QA.

---

## 📌 METADATA DEL AGENTE

- **Nombre del agente:** `@NOMBRE`
- **Ubicación:** `scripts/agents/NOMBRE/`
- **Tipo:** Técnico / Monetización / Seguridad / UX / etc.
- **Prioridad:** Alta / Media / Baja
- **Dependencias:** `@otro-agente`, servicios externos, etc.
- **Estado:** 🟡 Incompleto / 🟢 Completo

---

## 📁 ESTRUCTURA DE ARCHIVOS OBLIGATORIA

| Archivo                     | Descripción                                      | Estado |
|----------------------------|--------------------------------------------------|--------|
| `autofix.ts`               | Lógica principal del agente                      | ☐      |
| `commands.ts`              | Comandos CLI independientes                      | ☐      |
| `report.ts`                | Generador de reporte JSON estructurado           | ☐      |
| `config.ts`                | Configuración modular y validación Zod           | ☐      |
| `log.ts`                   | Logging estructurado centralizado                | ☐      |
| `index.ts`                 | Punto de entrada e invocador orquestador         | ☐      |
| `README.md`                | Documentación técnica y de ejecución             | ☐      |
| `__tests__/*.test.ts`      | Tests unitarios funcionales                      | ☐      |

> Todos los archivos deben usar **TypeScript estricto**, estar libres de `any`, cumplir con las reglas ESLint STRATO, y tener tipado 100% seguro.

---

## 🔁 CONEXIONES Y AUTONOMÍA

- [ ] Conectado al orquestador (`scripts/orchestrator.ts`)
- [ ] Tiene comando CLI (`pnpm agent:NOMBRE`)
- [ ] Exporta su propio `UnifiedAgentReport`
- [ ] Genera logs en `audit-artifacts/reports/`
- [ ] Puede ejecutarse de forma autónoma

---

## ✅ CHECKLIST DE VALIDACIÓN STRATO

- [ ] Todos los archivos requeridos presentes
- [ ] Tipado estricto (sin `any`)
- [ ] Tests unitarios que cubren lógica principal
- [ ] Archivo `README.md` completo y actualizado
- [ ] Conectado al orquestador
- [ ] Sin errores de ESLint ni `tsc`
- [ ] Genera reporte estructurado
- [ ] Tiene logging y configuración modular
- [ ] Puede ejecutarse en CI/CD o vía CLI
- [ ] No depende de hacks ni código legacy

---

## 🧪 EJEMPLO DE INVOCACIÓN DESDE CLI

```bash
# Ejecución directa del agente
pnpm agent:NOMBRE

# Ejecución con parámetros
pnpm agent:NOMBRE --verbose --dry-run

# Ejecución desde orquestador
pnpm strato:orchestrate

# Tests del agente
pnpm test:agent:NOMBRE
```

---

## 📋 TEMPLATE DE ARCHIVOS

### `autofix.ts` - Lógica Principal
```typescript
#!/usr/bin/env tsx

/**
 * @NOMBRE Agent - Main Logic
 * 
 * Implements the core functionality of the agent
 */

import { NOMBREConfig } from './config'
import { NOMBRELogger } from './log'
import { generateReport } from './report'

export interface NOMBREOptions {
  verbose?: boolean
  dryRun?: boolean
  // ... other options
}

export interface NOMBREResult {
  success: boolean
  message: string
  data?: unknown
  errors?: string[]
}

export class NOMBREAgent {
  private config: NOMBREConfig
  private logger: NOMBRELogger

  constructor(options: NOMBREOptions = {}) {
    this.config = new NOMBREConfig(options)
    this.logger = new NOMBRELogger()
  }

  async run(): Promise<NOMBREResult> {
    this.logger.info('Starting @NOMBRE agent execution')
    
    try {
      // Main logic here
      const result = await this.executeMainLogic()
      
      // Generate report
      await generateReport(result)
      
      this.logger.info('@NOMBRE agent completed successfully')
      return result
    } catch (error) {
      this.logger.error('@NOMBRE agent failed', error as Error)
      throw error
    }
  }

  private async executeMainLogic(): Promise<NOMBREResult> {
    // Implementation here
    return {
      success: true,
      message: 'Operation completed'
    }
  }
}

// For orchestrator
export async function runAgent(): Promise<void> {
  const agent = new NOMBREAgent()
  await agent.run()
}

export default runAgent
```

### `commands.ts` - Comandos CLI
```typescript
#!/usr/bin/env tsx

/**
 * @NOMBRE Agent - CLI Commands
 */

import { NOMBREAgent } from './autofix'
import { NOMBRELogger } from './log'

export const commands = {
  async run(options: Record<string, unknown> = {}): Promise<void> {
    const logger = new NOMBRELogger()
    logger.info('Executing @NOMBRE agent via CLI')
    
    const agent = new NOMBREAgent(options)
    await agent.run()
  },

  async validate(): Promise<void> {
    // Validation logic
  },

  async test(): Promise<void> {
    // Test execution
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const command = args[0] || 'run'
  
  if (commands[command as keyof typeof commands]) {
    await commands[command as keyof typeof commands]()
  } else {
    console.error(`Unknown command: ${command}`)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}
```

### `report.ts` - Generador de Reportes
```typescript
#!/usr/bin/env tsx

/**
 * @NOMBRE Agent - Report Generator
 */

import { writeFileSync } from 'fs'
import { join } from 'path'

export interface NOMBREReport {
  agent: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
  summary: string
  details: Record<string, unknown>
  recommendations: string[]
  duration: number
}

export async function generateReport(
  result: unknown,
  options: { outputDir?: string } = {}
): Promise<void> {
  const report: NOMBREReport = {
    agent: '@NOMBRE',
    timestamp: new Date().toISOString(),
    status: 'success',
    summary: 'Agent execution completed',
    details: result as Record<string, unknown>,
    recommendations: [],
    duration: 0
  }

  const outputDir = options.outputDir || 'audit-artifacts/reports'
  const reportPath = join(outputDir, 'NOMBRE-report.json')
  
  writeFileSync(reportPath, JSON.stringify(report, null, 2))
}
```

### `config.ts` - Configuración Modular
```typescript
#!/usr/bin/env tsx

/**
 * @NOMBRE Agent - Configuration
 */

import { z } from 'zod'

const NOMBREConfigSchema = z.object({
  enabled: z.boolean().default(true),
  timeout: z.number().default(30000),
  verbose: z.boolean().default(false),
  // ... other config options
})

export type NOMBREConfig = z.infer<typeof NOMBREConfigSchema>

export class NOMBREConfigManager {
  private config: NOMBREConfig

  constructor(overrides: Partial<NOMBREConfig> = {}) {
    this.config = NOMBREConfigSchema.parse({
      ...this.getDefaults(),
      ...overrides
    })
  }

  getConfig(): NOMBREConfig {
    return this.config
  }

  private getDefaults(): NOMBREConfig {
    return {
      enabled: true,
      timeout: 30000,
      verbose: false
    }
  }
}

export const defaultConfig = new NOMBREConfigManager()
```

### `log.ts` - Logging Estructurado
```typescript
#!/usr/bin/env tsx

/**
 * @NOMBRE Agent - Logging System
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, unknown>
  agentId: string
}

export class NOMBRELogger {
  private agentId = '@NOMBRE'

  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context)
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context)
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context)
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, { ...context, error: error?.message })
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      agentId: this.agentId
    }

    console.log(JSON.stringify(entry))
  }
}
```

### `index.ts` - Punto de Entrada
```typescript
#!/usr/bin/env tsx

/**
 * @NOMBRE Agent - Entry Point
 */

import { NOMBREAgent } from './autofix'
import { commands } from './commands'

export interface NOMBREOptions {
  mode?: 'run' | 'validate' | 'test'
  verbose?: boolean
  dryRun?: boolean
}

export class NOMBREManager {
  private options: NOMBREOptions

  constructor(options: NOMBREOptions = {}) {
    this.options = {
      mode: 'run',
      verbose: false,
      dryRun: false,
      ...options
    }
  }

  async execute(): Promise<void> {
    switch (this.options.mode) {
      case 'run':
        const agent = new NOMBREAgent(this.options)
        await agent.run()
        break
      case 'validate':
        await commands.validate()
        break
      case 'test':
        await commands.test()
        break
      default:
        throw new Error(`Unknown mode: ${this.options.mode}`)
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const options: NOMBREOptions = {}

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    switch (arg) {
      case '--mode':
        options.mode = args[++i] as 'run' | 'validate' | 'test'
        break
      case '--verbose':
      case '-v':
        options.verbose = true
        break
      case '--dry-run':
        options.dryRun = true
        break
      case '--help':
      case '-h':
        console.log(`
@NOMBRE Agent

Usage: tsx scripts/agents/NOMBRE/index.ts [options]

Options:
  --mode <mode>     Execution mode: run, validate, test (default: run)
  --verbose, -v     Enable verbose output
  --dry-run         Execute without making changes
  --help, -h        Show this help message
        `)
        process.exit(0)
        break
    }
  }

  const manager = new NOMBREManager(options)
  await manager.execute()
}

// For orchestrator
export async function runAgent(): Promise<void> {
  const manager = new NOMBREManager({ mode: 'run' })
  await manager.execute()
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { NOMBREAgent, commands }
```

### `README.md` - Documentación
```markdown
# 🔧 @NOMBRE Agent - [Descripción del Agente]

## 📋 Descripción

[Descripción detallada del propósito y funcionalidades del agente]

## 🚀 Uso

### Comandos Principales

```bash
# Ejecución básica
pnpm agent:NOMBRE

# Modo verbose
pnpm agent:NOMBRE --verbose

# Modo dry-run
pnpm agent:NOMBRE --dry-run

# Validación
pnpm agent:NOMBRE --mode validate

# Tests
pnpm agent:NOMBRE --mode test
```

### Opciones Avanzadas

```bash
# Con parámetros personalizados
tsx scripts/agents/NOMBRE/index.ts --mode run --verbose --dry-run
```

## 🏗️ Arquitectura

### Componentes Principales

- **NOMBREAgent**: Lógica principal del agente
- **NOMBREConfig**: Sistema de configuración
- **NOMBRELogger**: Logging estructurado
- **Commands**: Interfaz CLI

### Flujo de Ejecución

1. **Inicialización** - Configuración y validación
2. **Ejecución** - Lógica principal del agente
3. **Reporte** - Generación de reportes
4. **Logging** - Registro de actividades

## 🧪 Testing

```bash
# Tests unitarios
pnpm test:agent:NOMBRE

# Tests con coverage
vitest scripts/agents/NOMBRE/__tests__/ --coverage
```

## 🔗 Integración

### Orquestador Global

El agente está registrado en `scripts/orchestrator.ts`:

```typescript
{
  name: '@NOMBRE',
  importPath: './agents/NOMBRE/index',
  reportPath: 'audit-artifacts/reports/NOMBRE-report.json',
}
```

### Comandos CLI

Disponible en `package.json`:

```json
{
  "scripts": {
    "agent:NOMBRE": "tsx scripts/agents/NOMBRE/index.ts",
    "test:agent:NOMBRE": "vitest scripts/agents/NOMBRE/__tests__/ --run"
  }
}
```

## 📊 Outputs

### Reportes Generados

- `audit-artifacts/reports/NOMBRE-report.json`
- Logs estructurados en `logs/NOMBRE-agent.log`

### Estructura del Reporte

```json
{
  "agent": "@NOMBRE",
  "timestamp": "2025-01-01T00:00:00Z",
  "status": "success",
  "summary": "Agent execution completed",
  "details": {},
  "recommendations": [],
  "duration": 1500
}
```

## 🔧 Configuración

### Variables de Entorno

```bash
NOMBRE_ENABLED=true
NOMBRE_TIMEOUT=30000
NOMBRE_VERBOSE=false
```

### Configuración Programática

```typescript
import { NOMBREAgent } from './scripts/agents/NOMBRE/autofix'

const agent = new NOMBREAgent({
  verbose: true,
  dryRun: false
})

await agent.run()
```

## 🚨 Troubleshooting

### Problemas Comunes

1. **Error: "Command not found"**
   ```bash
   # Verificar instalación
   pnpm install
   ```

2. **Error: "Permission denied"**
   ```bash
   # Dar permisos de ejecución
   chmod +x scripts/agents/NOMBRE/*.ts
   ```

## 📈 Métricas

- **Tiempo de ejecución**: <5 segundos
- **Cobertura de tests**: ≥90%
- **Líneas de código**: [N] líneas
- **Dependencias**: [Lista de dependencias]
```

### `__tests__/autofix.test.ts` - Tests Unitarios
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NOMBREAgent, type NOMBREOptions } from '../autofix'

describe('NOMBREAgent', () => {
  let agent: NOMBREAgent

  beforeEach(() => {
    agent = new NOMBREAgent()
  })

  describe('constructor', () => {
    it('should initialize with default options', () => {
      expect(agent).toBeDefined()
    })

    it('should accept custom options', () => {
      const options: NOMBREOptions = {
        verbose: true,
        dryRun: true
      }
      const customAgent = new NOMBREAgent(options)
      expect(customAgent).toBeDefined()
    })
  })

  describe('run', () => {
    it('should execute successfully', async () => {
      const result = await agent.run()
      expect(result.success).toBe(true)
    })

    it('should handle errors gracefully', async () => {
      // Test error handling
      vi.spyOn(agent as any, 'executeMainLogic').mockRejectedValue(new Error('Test error'))
      
      await expect(agent.run()).rejects.toThrow('Test error')
    })
  })
})
```

---

## 🔄 INTEGRACIÓN CON ORQUESTADOR

### Registro en `scripts/orchestrator.ts`
```typescript
const agents: AgentInfo[] = [
  // ... otros agentes
  {
    name: '@NOMBRE',
    importPath: './agents/NOMBRE/index',
    reportPath: 'audit-artifacts/reports/NOMBRE-report.json',
  },
]
```

### Comandos en `package.json`
```json
{
  "scripts": {
    "agent:NOMBRE": "tsx scripts/agents/NOMBRE/index.ts",
    "test:agent:NOMBRE": "vitest scripts/agents/NOMBRE/__tests__/ --run",
    "strato:orchestrate": "tsx scripts/orchestrator.ts"
  }
}
```

---

## 📊 CRITERIOS DE VALIDACIÓN FINAL

### ✅ AGENTE 100% COMPLETO

- [ ] **8/8 archivos** implementados según template
- [ ] **Tipado estricto** - 0 usos de `any`
- [ ] **Tests unitarios** - ≥90% cobertura
- [ ] **Documentación** - README.md completo
- [ ] **Orquestador** - Conectado y registrado
- [ ] **CLI** - Comandos funcionales
- [ ] **Linting** - Sin errores ESLint
- [ ] **TypeScript** - Sin errores `tsc`
- [ ] **Logging** - Estructurado y funcional
- [ ] **Configuración** - Modular y validada
- [ ] **Reportes** - JSON estructurado
- [ ] **Autonomía** - Ejecutable independiente

### 🎯 ESTADO FINAL

| Métrica | Objetivo | Estado |
|---------|----------|--------|
| **Archivos** | 8/8 | ☐ |
| **Tipado** | 100% estricto | ☐ |
| **Tests** | ≥90% cobertura | ☐ |
| **Linting** | 0 errores | ☐ |
| **Documentación** | Completa | ☐ |
| **Integración** | Total | ☐ |

---

## 🚀 USO DEL TEMPLATE

1. **Copiar estructura** de archivos según template
2. **Reemplazar** `NOMBRE` por nombre real del agente
3. **Implementar** lógica específica del agente
4. **Validar** contra checklist de validación
5. **Testear** funcionalidad completa
6. **Documentar** en README.md
7. **Integrar** con orquestador
8. **Commit** atómico con mensaje estándar

---

**📝 Nota:** Este template es **obligatorio** para todos los agentes STRATO Core OS™. Cualquier agente que no cumpla con esta estructura será marcado como **incompleto** en las auditorías automáticas. 