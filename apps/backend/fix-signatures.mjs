#!/usr/bin/env node

/**
 * STRATO Core OS™ - Function Signature Fixer
 * Fixes broken function signatures in controller files
 */

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

console.log('🔧 STRATO Core OS™ - Function Signature Fixer')
console.log('===============================================')

const files = glob.sync('src/controllers/*.ts')

let totalFixes = 0
let filesFixed = 0

for (const file of files) {
  console.log(`\n📄 Processing: ${file}`)
  
  let content = readFileSync(file, 'utf8')
  const originalContent = content
  let fileFixes = 0

  // Fix broken function signatures where parameter types were removed
  // Pattern: "string>, user?: AuthenticatedUser," should be "_params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser,"
  
  const patterns = [
    {
      // Fix completely broken signatures
      from: /(req: IncomingMessage, res: ServerResponse, string>, user\?: AuthenticatedUser,?\s*)/g,
      to: 'req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser',
      description: 'broken signatures with missing parameters'
    },
    {
      // Fix signatures missing only _body parameter
      from: /(req: IncomingMessage, res: ServerResponse, _params\?: Record<string, string>, user\?: AuthenticatedUser,?\s*)/g,
      to: 'req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser',
      description: 'signatures missing _body parameter'
    },
    {
      // Fix signatures missing only _params parameter
      from: /(req: IncomingMessage, res: ServerResponse, _body\?: RequestBody, user\?: AuthenticatedUser,?\s*)/g,
      to: 'req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser',
      description: 'signatures missing _params parameter'
    }
  ]

  for (const pattern of patterns) {
    const matches = (content.match(pattern.from) || []).length
    if (matches > 0) {
      content = content.replace(pattern.from, pattern.to)
      fileFixes += matches
      console.log(`  ✓ Fixed ${matches} ${pattern.description}`)
    }
  }

  // Fix variable references that are now invalid due to missing parameters
  // If we're referencing _params but don't have it as parameter, need to handle this
  const missingParamRefs = [
    {
      // Fix references to _params when parameter doesn't exist
      from: /const \{ id \} = _params \|\| \{\}/g,
      to: 'const { id } = _params || {}',
      condition: (content) => !content.includes('_params?: Record<string, string>'),
      description: '_params references without parameter'
    },
    {
      // Fix references to _body when parameter doesn't exist  
      from: /const .* = .*\.parse\(_body\)/g,
      to: (match) => match.replace('_body', 'body'),
      condition: (content) => !content.includes('_body?: RequestBody'),
      description: '_body references without parameter'
    }
  ]

  // Handle special cases in specific files
  if (file.includes('analytics.controller.ts')) {
    // Fix the specific issues in analytics controller
    if (content.includes('const userId = _params?.userId || user?.id')) {
      content = content.replace('const userId = _params?.userId || user?.id', 'const userId = (_params?.userId as string) || user?.id')
      fileFixes++
      console.log('  ✓ Fixed userId type assertion in analytics controller')
    }
  }

  if (content !== originalContent) {
    writeFileSync(file, content)
    filesFixed++
    totalFixes += fileFixes
    console.log(`  ✅ Fixed ${fileFixes} issues in ${file}`)
  } else {
    console.log(`  ⚪ No fixes needed in ${file}`)
  }
}

console.log('\n🎯 STRATO Core OS™ Function Signature Fix Summary')
console.log('==================================================')
console.log(`📁 Files processed: ${files.length}`)
console.log(`📝 Files fixed: ${filesFixed}`)
console.log(`🔧 Total fixes applied: ${totalFixes}`)
console.log('\n✅ Function signature fixing completed!')