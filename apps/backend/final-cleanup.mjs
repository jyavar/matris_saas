#!/usr/bin/env node

/**
 * STRATO Core OS™ - Final ESLint Cleanup
 * Removes completely unused parameters from method signatures
 */

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

console.log('🔧 STRATO Core OS™ - Final ESLint Cleanup')
console.log('==========================================')

const files = glob.sync('src/controllers/*.ts')

let totalFixes = 0
let filesFixed = 0

for (const file of files) {
  console.log(`\n📄 Processing: ${file}`)
  
  let content = readFileSync(file, 'utf8')
  const originalContent = content
  let fileFixes = 0

  // Remove completely unused parameters from method signatures
  // Only keep req, res, and parameters that are actually used in the method body
  
  const methodPattern = /(async\s+\w+\s*)\(([^)]+)\)(\s*:\s*Promise<void>\s*\{)([^}]*(?:\{[^}]*\}[^}]*)*)\}/g
  
  content = content.replace(methodPattern, (match, methodStart, params, methodEnd, body) => {
    const paramList = params.split(',').map(p => p.trim())
    const usedParams = []
    
    for (const param of paramList) {
      const paramName = param.split(':')[0].trim()
      
      // Always keep req and res
      if (paramName === 'req' || paramName === 'res') {
        usedParams.push(param)
        continue
      }
      
      // Check if parameter is actually used in the method body
      let isUsed = false
      
      // For _params parameter
      if (paramName === '_params') {
        isUsed = body.includes('_params') && (body.includes('_params||') || body.includes('_params?.') || body.includes('_params '))
      }
      // For _body parameter
      else if (paramName === '_body') {
        isUsed = body.includes('_body') && (body.includes('parse(_body)') || body.includes('_body||') || body.includes('_body?.'))
      }
      // For _user parameter
      else if (paramName === '_user') {
        isUsed = body.includes('_user?.') || body.includes('_user ||') || body.includes('logAction') && body.includes('_user')
      }
      // For user parameter
      else if (paramName === 'user') {
        isUsed = body.includes('user?.') || body.includes('user ||') || body.includes('logAction') && body.includes('user')
      }
      
      if (isUsed) {
        usedParams.push(param)
      } else {
        console.log(`  ✗ Removing unused parameter: ${paramName}`)
        fileFixes++
      }
    }
    
    return methodStart + '(' + usedParams.join(', ') + ')' + methodEnd + body + '}'
  })

  // Fix specific issues
  
  // Fix billing controller specific error
  if (file.includes('billing.controller.ts')) {
    content = content.replace(/const offset = [^;]+;\s*/g, '')
    if (originalContent.includes('offset')) {
      console.log(`  ✓ Removed unused offset variable`)
      fileFixes++
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

console.log('\n🎯 STRATO Core OS™ Final ESLint Cleanup Summary')
console.log('================================================')
console.log(`📁 Files processed: ${files.length}`)
console.log(`📝 Files fixed: ${filesFixed}`)
console.log(`🔧 Total fixes applied: ${totalFixes}`)
console.log('\n✅ Final ESLint cleanup completed!')