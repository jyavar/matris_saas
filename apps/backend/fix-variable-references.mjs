#!/usr/bin/env node

/**
 * STRATO Core OS™ - Variable Reference Fixer
 * Fixes incorrect variable references that cause ESLint no-unused-vars errors
 */

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

console.log('🔧 STRATO Core OS™ - Variable Reference Fixer')
console.log('================================================')

// Find all TypeScript files in controllers
const files = glob.sync('src/controllers/*.ts')

let totalFixes = 0
let filesFixed = 0

for (const file of files) {
  console.log(`\n📄 Processing: ${file}`)
  
  let content = readFileSync(file, 'utf8')
  const originalContent = content
  let fileFixes = 0

  // Pattern 1: Fix _user references when parameter is named user
  // Replace _user?.id with user?.id when parameter is user
  if (content.includes('user?: AuthenticatedUser') || content.includes('user: AuthenticatedUser')) {
    content = content.replace(/\b_user\?/g, 'user?')
    const matches = (originalContent.match(/\b_user\?/g) || []).length
    if (matches > 0) {
      fileFixes += matches
      console.log(`  ✓ Fixed ${matches} _user? references`)
    }
  }

  // Pattern 2: Fix params/body/user references when parameters are _params/_body/_user
  // This is for alias methods at the end of automation controller
  const aliasMethodPattern = /(\w+):\s*async\s*\([^)]*_params[^)]*_body[^)]*_user[^)]*\)\s*=>\s*{[^}]*return[^}]*\.(params|body|user)[^}]*}/g
  let match
  while ((match = aliasMethodPattern.exec(content)) !== null) {
    const fullMatch = match[0]
    const fixedMatch = fullMatch
      .replace(/\bparams\b/g, '_params')
      .replace(/\bbody\b/g, '_body')
      .replace(/\buser\b/g, '_user')
    
    if (fullMatch !== fixedMatch) {
      content = content.replace(fullMatch, fixedMatch)
      fileFixes += 1
      console.log(`  ✓ Fixed alias method variable references`)
    }
  }

  // Pattern 3: Fix specific cases in analytics controller
  if (file.includes('analytics.controller.ts')) {
    // Fix line 219: params?.userId should be _params?.userId
    content = content.replace(/const userId = params\?\.userId/g, 'const userId = _params?.userId')
    
    // Fix line 314: params, body, user should be _params, _body, _user
    content = content.replace(/return this\.getAnalyticsSummary\(req, res, params, body, user\)/g, 
                             'return this.getAnalyticsSummary(req, res, _params, _body, _user)')
    
    if (content !== originalContent) {
      const additionalFixes = 2
      fileFixes += additionalFixes
      console.log(`  ✓ Fixed analytics controller specific references`)
    }
  }

  // Pattern 4: Fix todo controller inconsistent naming
  if (file.includes('todo.controller.ts')) {
    // The issue is mixing user and _user parameters
    // Let's standardize on user (without underscore) since it's used in conditions
    content = content.replace(/\b_user\?/g, 'user?')
    
    const userFixes = (originalContent.match(/\b_user\?/g) || []).length
    if (userFixes > 0) {
      fileFixes += userFixes
      console.log(`  ✓ Fixed ${userFixes} _user references in todo controller`)
    }
  }

  // Pattern 5: Fix profiles controller inconsistent naming
  if (file.includes('profiles.controller.ts')) {
    // Similar issue - standardize on user
    content = content.replace(/\b_user\?/g, 'user?')
    
    const userFixes = (originalContent.match(/\b_user\?/g) || []).length
    if (userFixes > 0) {
      fileFixes += userFixes
      console.log(`  ✓ Fixed ${userFixes} _user references in profiles controller`)
    }
  }

  if (content !== originalContent) {
    writeFileSync(file, content)
    filesFixed++
    totalFixes += fileFixes
    console.log(`  ✅ Fixed ${fileFixes} variable references in ${file}`)
  } else {
    console.log(`  ⚪ No fixes needed in ${file}`)
  }
}

console.log('\n🎯 STRATO Core OS™ Variable Reference Fix Summary')
console.log('=================================================')
console.log(`📁 Files processed: ${files.length}`)
console.log(`📝 Files fixed: ${filesFixed}`)
console.log(`🔧 Total fixes applied: ${totalFixes}`)
console.log('\n✅ Variable reference fixing completed!')