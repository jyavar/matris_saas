#!/usr/bin/env ts-node
import * as fs from 'fs-extra'
import inquirer from 'inquirer'

async function main() {
  console.log('\n🧩 STRATO SaaS Matrix: Inicialización de nuevo proyecto')

  // 1. Preguntar el nombre del nuevo proyecto
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Nombre del nuevo proyecto SaaS:',
      validate: (input: string) =>
        input.length > 2 || 'Debe tener al menos 3 caracteres',
    },
  ])

  // 2. Actualizar el name en todos los package.json
  const pkgs = [
    'package.json',
    'apps/backend/package.json',
    'apps/frontend/package.json',
    'apps/web/package.json',
    'packages/db-types/package.json',
    'packages/utils/package.json',
  ]
  for (const pkgPath of pkgs) {
    if (fs.existsSync(pkgPath)) {
      const pkg = await fs.readJson(pkgPath)
      pkg.name = projectName
      await fs.writeJson(pkgPath, pkg, { spaces: 2 })
      console.log(`✔️  Actualizado: ${pkgPath}`)
    }
  }

  // 3. Actualizar pnpm-workspace.yaml
  const wsPath = 'pnpm-workspace.yaml'
  if (fs.existsSync(wsPath)) {
    let ws = await fs.readFile(wsPath, 'utf8')
    ws = ws.replace(/name: .*/g, `name: ${projectName}`)
    await fs.writeFile(wsPath, ws)
    console.log('✔️  Actualizado: pnpm-workspace.yaml')
  }

  // 4. Copiar .env.example a .env si no existe
  if (fs.existsSync('.env.example') && !fs.existsSync('.env')) {
    await fs.copy('.env.example', '.env')
    console.log('✔️  Copiado: .env.example → .env')
  }

  // 5. Instrucción final
  console.log(
    '\n✅ Proyecto inicializado. Revisa y completa tu archivo .env antes de continuar.',
  )
  console.log(
    'Opcional: puedes limpiar el historial git y crear un commit inicial si es un nuevo SaaS.',
  )
}

main().catch((err) => {
  console.error('Error en la inicialización:', err)
  process.exit(1)
})
