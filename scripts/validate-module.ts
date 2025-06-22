import fs from 'fs-extra'
import path from 'path'
import { z } from 'zod'

const moduleSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string(),
  path: z.string(),
  dependencies: z.array(z.string()),
  agents: z.array(z.string()),
  readiness: z.string(),
  tags: z.array(z.string()),
})

const modulesFileSchema = z.object({
  $schema: z.string().url().optional(),
  modules: z.array(moduleSchema),
})

const validateModules = async () => {
  console.log('🛡️  Validando la Matriz de Módulos...')
  const modulesJsonPath = path.resolve(process.cwd(), 'modules.json')

  if (!(await fs.pathExists(modulesJsonPath))) {
    console.error('❌ Error: No se encontró el archivo `modules.json`.')
    process.exit(1)
  }

  try {
    const modulesJsonContent = await fs.readJson(modulesJsonPath)
    const parsedModules = modulesFileSchema.parse(modulesJsonContent)

    let allModulesValid = true

    console.log(
      `  🔍  Encontrados ${parsedModules.modules.length} módulos. Verificando...`,
    )

    for (const module of parsedModules.modules) {
      console.log(`\n    - Validando módulo: "${module.name}"...`)
      const modulePath = path.resolve(process.cwd(), module.path)

      if (!(await fs.pathExists(modulePath))) {
        console.error(
          `      ❌ ERROR: El path definido para el módulo "${module.name}" no existe: ${module.path}`,
        )
        allModulesValid = false
        continue
      }
      console.log(`      ✅  Path existe: ${module.path}`)
    }

    if (allModulesValid) {
      console.log(
        '\n✅  ¡Éxito! Todos los módulos son válidos según la matriz.',
      )
    } else {
      console.error(
        '\n❌ ¡Fallo! Se encontraron errores en la validación de módulos.',
      )
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error al leer o parsear `modules.json`.', error)
    process.exit(1)
  }
}

validateModules()
