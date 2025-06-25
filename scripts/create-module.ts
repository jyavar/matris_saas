#!/usr/bin/env tsx
import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'

const MODULE_TYPES = ['core', 'ui', 'agent', 'service', 'util']

const DESTINATIONS = [
  'apps/frontend',
  'apps/backend',
  'apps/web',
  'packages/utils',
  'packages/',
]

async function main() {
  const { name, type, destination, withTest, withReadme } =
    await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Nombre del módulo/componente (kebab-case):',
        validate: (input: string) =>
          /^[a-z0-9-]+$/.test(input) || 'Usa solo kebab-case',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Tipo de módulo:',
        choices: MODULE_TYPES,
      },
      {
        type: 'list',
        name: 'destination',
        message: 'Destino:',
        choices: DESTINATIONS,
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: '¿Crear carpeta __tests__ con test base?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withReadme',
        message: '¿Crear README.md con plantilla STRATO?',
        default: true,
      },
    ])

  const baseDir = path.join(process.cwd(), destination, name)
  if (fs.existsSync(baseDir)) {
    console.error('❌ Ya existe un módulo con ese nombre en el destino.')
    process.exit(1)
  }
  fs.mkdirSync(baseDir, { recursive: true })
  fs.writeFileSync(
    path.join(baseDir, 'index.ts'),
    `// ${name} (${type})\n\n// Implementa aquí la lógica principal del módulo.\n`,
  )
  fs.writeFileSync(
    path.join(baseDir, 'types.ts'),
    `// Tipos para ${name}\n\nexport type ${capitalize(camelCase(name))}Type = unknown;\n`,
  )

  if (withTest) {
    const testDir = path.join(baseDir, '__tests__')
    fs.mkdirSync(testDir)
    fs.writeFileSync(
      path.join(testDir, `${name}.test.ts`),
      `import { describe, it, expect } from 'vitest';\n\ndescribe('${name}', () => {\n  it('debería funcionar', () => {\n    expect(true).toBe(true);\n  });\n});\n`,
    )
  }

  if (withReadme) {
    fs.writeFileSync(
      path.join(baseDir, 'README.md'),
      `# ${name} (${type})\n\n> Generado con scaffolding STRATO™\n\n## Checklist STRATO\n- [ ] index.ts implementado\n- [ ] types.ts definido\n- [ ] __tests__ con cobertura\n- [ ] Cumple reglas de oro\n- [ ] Documentación viva\n\n---\n\nActualiza este README tras cada cambio relevante.\n`,
    )
  }

  console.log(`✅ Módulo ${name} creado en ${baseDir}`)
}

function camelCase(str: string) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

main()
