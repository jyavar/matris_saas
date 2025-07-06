#!/usr/bin/env node

/**
 * STRATO Core OS™ - Fix Unused User Parameters
 * Renames unused 'user' parameters to '_user' to follow convention
 */

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

console.log('🔧 STRATO Core OS™ - Fix Unused User Parameters')
console.log('================================================')

const files = glob.sync('src/controllers/*.ts')

let totalFixes = 0
let filesFixed = 0

for (const file of files) {
  console.log(`\n📄 Processing: ${file}`)
  
  let content = readFileSync(file, 'utf8')
  const originalContent = content
  let fileFixes = 0

  // Fix 1: Rename unused 'user' parameter to '_user' 
  // Pattern: user?: AuthenticatedUser where user is not used in function body
  const methodPattern = /(async\s+\w+\s*\([^)]*)(user\?: AuthenticatedUser)(\s*\):\s*Promise<void>\s*\{)([^}]*(?:\{[^}]*\}[^}]*)*)\}/g
  
  content = content.replace(methodPattern, (match, beforeUser, userParam, afterUser, body) => {
    // Check if 'user' is actually used in the body (excluding parameter declaration)
    const userUsageRegex = /\buser\??\./g
    if (body.match(userUsageRegex)) {
      // User is used, keep as is
      return match
    } else {
      // User is not used, rename to _user
      fileFixes++
      console.log(`  ✓ Renamed unused 'user' to '_user'`)
      return beforeUser + '_user?: AuthenticatedUser' + afterUser + body + '}'
    }
  })

  // Fix 2: Remove unused imports in health controller
  if (file.includes('health.controller.ts')) {
    content = content.replace(/import { IncomingMessage, ServerResponse } from 'http'\n/, '')
    content = content.replace(/import type { AuthenticatedUser, RequestBody } from '[^']*'\n/, '')
    fileFixes += 2
    console.log(`  ✓ Removed unused imports in health controller`)
  }

  // Fix 3: Remove unused variable assignments
  const unusedVars = [
    { pattern: /const usageReportSchema = z\.object\({[^}]*}\)\s*\n/, name: 'usageReportSchema' },
    { pattern: /const eventReportSchema = z\.object\({[^}]*}\)\s*\n/, name: 'eventReportSchema' },
    { pattern: /import { [^}]*sendSuccess[^}]* } from '[^']*'\n/, name: 'sendSuccess import' },
    { pattern: /const offset = [^;]+;\s*\n/, name: 'offset variable' }
  ]

  for (const unusedVar of unusedVars) {
    if (content.match(unusedVar.pattern)) {
      content = content.replace(unusedVar.pattern, '')
      fileFixes++
      console.log(`  ✓ Removed unused ${unusedVar.name}`)
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

console.log('\n🎯 STRATO Core OS™ Unused User Parameters Fix Summary')
console.log('=====================================================')
console.log(`📁 Files processed: ${files.length}`)
console.log(`📝 Files fixed: ${filesFixed}`)
console.log(`🔧 Total fixes applied: ${totalFixes}`)
console.log('\n✅ Unused user parameters fixing completed!')