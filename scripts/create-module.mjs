#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'

const log = (message) => console.log(`\x1b[36m${message}\x1b[0m`)
const logError = (message) => console.error(`\x1b[31m${message}\x1b[0m`)

async function createModule() {
  const moduleName = process.argv[2]
  if (!moduleName) {
    logError('Error: Module name is required. Usage: pnpm module:create <module-name>')
    process.exit(1)
  }

  log(`🚀 Creating new module: ${moduleName}...`)

  const archetype = {
    name: 'todo',
    capitalized: 'Todo',
  }
  const target = {
    name: moduleName,
    capitalized: moduleName.charAt(0).toUpperCase() + moduleName.slice(1),
  }

  // 1. Backend
  await createBackend(archetype, target)

  // 2. Frontend
  await createFrontend(archetype, target)

  log(`✅ Module '${moduleName}' created successfully!`)
  log(`Next steps:
  1. Add the new backend routes to 'apps/backend/src/index.ts'
  2. Add the new frontend components to your application where needed.`)
}

async function createBackend(archetype, target) {
  log('  -> Creating backend files...')
  const backendBasePath = path.join('apps', 'backend', 'src')

  const filesToCopy = [
    {
      dir: 'controllers',
      source: `${archetype.name}.controller.ts`,
      dest: `${target.name}.controller.ts`,
    },
    {
      dir: 'services',
      source: `${archetype.name}.service.ts`,
      dest: `${target.name}.service.ts`,
    },
    {
      dir: 'routes',
      source: `${archetype.name}.routes.ts`,
      dest: `${target.name}.routes.ts`,
    },
  ]

  for (const file of filesToCopy) {
    const sourceFile = path.join(backendBasePath, file.dir, file.source)
    const destFile = path.join(backendBasePath, file.dir, file.dest)
    await copyAndTransform(sourceFile, destFile, archetype, target)
  }
}

async function createFrontend(archetype, target) {
    log('  -> Creating frontend files...')
    // Frontend structure is more complex, for now, we just create placeholders
    const frontendBasePath = path.join('apps', 'frontend', 'src')
    const frontendDirs = ['components', 'hooks', 'services']
    
    for (const dir of frontendDirs) {
        const destDir = path.join(frontendBasePath, dir, target.name)
        await fs.mkdir(destDir, { recursive: true })
        log(`    - Created directory: ${destDir}`)
    }
    // Placeholder for API service
    const apiServiceTemplate = `// API service for ${target.name}`
    await fs.writeFile(path.join(frontendBasePath, 'services', `${target.name}.api.ts`), apiServiceTemplate)
}

async function copyAndTransform(source, dest, archetype, target) {
  try {
    const content = await fs.readFile(source, 'utf-8')
    const transformedContent = content
      .replace(new RegExp(archetype.name, 'g'), target.name)
      .replace(new RegExp(archetype.capitalized, 'g'), target.capitalized)

    await fs.writeFile(dest, transformedContent, 'utf-8')
    log(`    - Created: ${dest}`)
  } catch (error) {
    if (error.code === 'ENOENT') {
        logError(`    - Archetype file not found: ${source}. Skipping.`)
    } else {
        logError(`    - Error processing ${source}: ${error.message}`)
    }
  }
}

createModule().catch(logError) 