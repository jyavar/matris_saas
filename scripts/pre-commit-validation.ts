#!/usr/bin/env tsx

import chalk from 'chalk'
import { execa } from 'execa'

interface ValidationResult {
  name: string
  success: boolean
  message: string
  duration: number
}

async function runValidation(
  name: string,
  command: string,
  args: string[] = [],
): Promise<ValidationResult> {
  const start = Date.now()

  try {
    console.log(chalk.blue(`🔍 Ejecutando: ${name}...`))
    await execa(command, args, { stdio: 'inherit' })
    const duration = Date.now() - start

    return {
      name,
      success: true,
      message: `✅ ${name} completado exitosamente`,
      duration,
    }
  } catch (error) {
    const duration = Date.now() - start

    return {
      name,
      success: false,
      message: `❌ ${name} falló: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      duration,
    }
  }
}

async function main() {
  console.log(chalk.bold.blue('🚀 STRATO Pre-commit Validation'))
  console.log(chalk.gray('Validando calidad del código...\n'))

  const validations: Array<{ name: string; command: string; args?: string[] }> =
    [
      { name: 'Lint Check', command: 'pnpm', args: ['lint'] },
      {
        name: 'React Imports Check',
        command: 'pnpm',
        args: ['check-react-imports'],
      },
    ]

  const results: ValidationResult[] = []

  for (const validation of validations) {
    const result = await runValidation(
      validation.name,
      validation.command,
      validation.args,
    )
    results.push(result)
    console.log(chalk.gray(`   ⏱️  ${result.duration}ms`))
    console.log('')
  }

  // Resumen final
  console.log(chalk.bold.blue('📊 Resumen de Validaciones:'))

  const successful = results.filter((r) => r.success)
  const failed = results.filter((r) => !r.success)

  results.forEach((result) => {
    const icon = result.success ? '✅' : '❌'
    const color = result.success ? chalk.green : chalk.red
    console.log(color(`${icon} ${result.name}: ${result.duration}ms`))
  })

  console.log('')

  if (failed.length > 0) {
    console.log(chalk.red.bold(`❌ ${failed.length} validación(es) fallaron:`))
    failed.forEach((result) => {
      console.log(chalk.red(`   • ${result.name}: ${result.message}`))
    })
    process.exit(1)
  } else {
    console.log(
      chalk.green.bold(`✅ Todas las validaciones pasaron exitosamente!`),
    )
    console.log(chalk.gray(`   ${successful.length} validaciones completadas`))
  }
}

main().catch((error) => {
  console.error(chalk.red('Error en validación pre-commit:'), error)
  process.exit(1)
})
