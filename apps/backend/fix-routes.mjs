#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { globSync } from 'glob'

const routeFiles = globSync('src/routes/*.routes.ts')

for (const file of routeFiles) {
  try {
    let content = readFileSync(file, 'utf8')
    
    // Add RouteDefinition import if not present
    if (!content.includes('RouteDefinition')) {
      const importIndex = content.indexOf('import')
      if (importIndex !== -1) {
        content = content.replace(
          /^import/,
          `import type { RouteDefinition } from '../types/express/index.js'\nimport`
        )
      }
    }
    
    // Add type annotation to exported routes
    content = content.replace(
      /export const (\w+Routes) = \[/g,
      'export const $1: RouteDefinition[] = ['
    )
    
    writeFileSync(file, content)
    console.log(`Fixed ${file}`)
  } catch (error) {
    console.error(`Error fixing ${file}:`, error)
  }
}