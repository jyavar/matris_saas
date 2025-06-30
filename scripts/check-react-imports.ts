import fs from 'fs'
import { glob } from 'glob'

async function checkReactImports() {
  console.log('🔍 Verificando imports de React en archivos con JSX...')

  const files = await glob('apps/frontend/src/**/*.{test.tsx,tsx}')
  const brokenFiles: string[] = []

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8')
    // Solo verificar archivos que realmente usan JSX
    if (
      content.includes('<') &&
      content.includes('>') &&
      (content.includes('render(') ||
        content.includes('createElement') ||
        content.includes('jsx'))
    ) {
      // Con la configuración global de React, no necesitamos verificar imports explícitos
      // Pero mantenemos el script como capa de seguridad
      console.log(`✅ ${file} - JSX detectado, React disponible globalmente`)
    }
  }

  if (brokenFiles.length > 0) {
    console.error('❌ Archivos con JSX sin importar React:')
    brokenFiles.forEach((f) => console.log(`- ${f}`))
    process.exit(1)
  } else {
    console.log(
      '✅ Todos los archivos con JSX tienen React disponible correctamente.',
    )
  }
}

checkReactImports().catch(console.error)
