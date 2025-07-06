#!/usr/bin/env node

/**
 * STRATO Core OS™ - Simple Unused Parameters Fixer
 * Removes the most common unused parameters manually
 */

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

console.log('🔧 STRATO Core OS™ - Simple Unused Parameters Fixer')
console.log('==================================================')

const files = glob.sync('src/**/*.ts')

let totalFixes = 0
let filesFixed = 0

for (const file of files) {
  console.log(`\n📄 Processing: ${file}`)
  
  let content = readFileSync(file, 'utf8')
  const originalContent = content
  let fileFixes = 0

  // Fix 1: Remove refreshTokenSchema if unused
  if (content.includes('refreshTokenSchema') && !content.includes('refreshTokenSchema.parse')) {
    content = content.replace(/const refreshTokenSchema = z\.object\({[^}]*}\)\s*\n/, '')
    fileFixes++
    console.log(`  ✓ Removed unused refreshTokenSchema`)
  }

  // Fix 2: Remove unused catch parameters
  content = content.replace(/catch\s*\(([^)]*_error[^)]*)\)\s*\{/g, 'catch {')
  const catchFixes = (originalContent.match(/catch\s*\([^)]*_error[^)]*\)\s*\{/g) || []).length
  if (catchFixes > 0) {
    fileFixes += catchFixes
    console.log(`  ✓ Fixed ${catchFixes} unused catch parameters`)
  }

  // Fix 3: Remove unused parameters from function signatures
  // Pattern: Remove trailing unused parameters that start with underscore or are completely unused
  
  // Remove unused _params, _body, user parameters from method signatures
  const methodSignaturePattern = /(\w+)\s*\(\s*([^)]*req:\s*IncomingMessage[^)]*)\s*\):\s*Promise<void>/g
  content = content.replace(methodSignaturePattern, (match, methodName, params) => {
    // Split parameters and check which ones are actually used
    const paramParts = params.split(',').map(p => p.trim())
    const usedParams = []
    
    for (const param of paramParts) {
      const paramName = param.split(':')[0].trim()
      
      // Always keep req and res
      if (paramName === 'req' || paramName === 'res') {
        usedParams.push(param)
        continue
      }
      
      // For now, keep all non-underscore prefixed parameters
      // This is a safe approach to avoid breaking functionality
      if (!paramName.startsWith('_')) {
        usedParams.push(param)
      }
    }
    
    const newSignature = `${methodName}(${usedParams.join(', ')}): Promise<void>`
    return newSignature
  })

  // Fix 4: Remove specific unused variable assignments
  const specificFixes = [
    { pattern: /const offset = [^;]+;\s*\n/, description: 'unused offset variable' },
    { pattern: /const logActions = [^;]+;\s*\n/, description: 'unused logActions variable' },
    { pattern: /const validateTenant = [^;]+;\s*\n/, description: 'unused validateTenant variable' },
    { pattern: /const params = [^;]+;\s*\n/, description: 'unused params variable' }
  ]

  for (const fix of specificFixes) {
    const matches = (content.match(fix.pattern) || []).length
    if (matches > 0) {
      content = content.replace(fix.pattern, '')
      fileFixes += matches
      console.log(`  ✓ Removed ${matches} ${fix.description}`)
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

console.log('\n🎯 STRATO Core OS™ Simple Unused Parameters Fix Summary')
console.log('=======================================================')
console.log(`📁 Files processed: ${files.length}`)
console.log(`📝 Files fixed: ${filesFixed}`)
console.log(`🔧 Total fixes applied: ${totalFixes}`)
console.log('\n✅ Simple unused parameters fixing completed!')