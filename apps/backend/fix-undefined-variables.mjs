#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

console.log('🔧 STRATO Core OS™ - Variable Reference Fixer')
console.log('=====================================')

// Find all controller files
const controllerFiles = glob.sync('src/controllers/*.ts')

let totalFixes = 0
let totalFiles = 0

for (const file of controllerFiles) {
  let content = readFileSync(file, 'utf8')
  const originalContent = content
  let fileFixes = 0

  // Pattern 1: Fix _params references (should be from function parameters)
  content = content.replace(
    /async (\w+)\(req: IncomingMessage, res: ServerResponse\): Promise<void> \{/g,
    'async $1(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser): Promise<void> {'
  )

  // Pattern 2: Fix _body references (should be from function parameters)
  // Already handled above

  // Pattern 3: Fix user references (should be from function parameters)
  // Already handled above

  // Pattern 4: Fix getSummary method call (remove extra parameters)
  content = content.replace(
    /return this\.getAnalyticsSummary\(req, res, _params, _body, user\)/g,
    'return this.getAnalyticsSummary(req, res)'
  )

  // Pattern 5: Fix alias methods that don't use parameters correctly
  content = content.replace(
    /async \(req: IncomingMessage, res: ServerResponse, _params\?: Record<string, string>, _body\?: RequestBody, user\?: AuthenticatedUser\) => \{/g,
    'async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {'
  )

  // Count fixes made
  if (content !== originalContent) {
    const lines = content.split('\n')
    const originalLines = originalContent.split('\n')
    fileFixes = lines.filter((line, i) => line !== originalLines[i]).length
    totalFixes += fileFixes
    totalFiles++
    
    writeFileSync(file, content)
    console.log(`✅ ${file}: ${fileFixes} fixes applied`)
  }
}

console.log(`\n🎯 Total: ${totalFixes} fixes in ${totalFiles} files`)