#!/usr/bin/env node

/**
 * STRATO Core OS™ - Remove Unused Parameters
 * Removes unused parameters that are not referenced in function bodies
 */

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

console.log('🔧 STRATO Core OS™ - Remove Unused Parameters')
console.log('===============================================')

const files = glob.sync('src/controllers/*.ts')

let totalFixes = 0
let filesFixed = 0

for (const file of files) {
  console.log(`\n📄 Processing: ${file}`)
  
  let content = readFileSync(file, 'utf8')
  const originalContent = content
  let fileFixes = 0

  // Extract all method signatures and their bodies
  const methodPattern = /async\s+(\w+)\s*\(\s*([^)]+)\s*\):\s*Promise<void>\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g

  let match
  while ((match = methodPattern.exec(content)) !== null) {
    const [fullMatch, methodName, params, body] = match
    
    // Parse parameters
    const paramList = params.split(',').map(p => p.trim())
    const usedParams = []
    
    for (const param of paramList) {
      const paramName = param.split(':')[0].trim()
      
      // Always keep req and res
      if (paramName === 'req' || paramName === 'res') {
        usedParams.push(param)
        continue
      }
      
      // Check if parameter is used in the method body
      const cleanParamName = paramName.replace(/^_/, '') // Remove underscore for checking
      const paramRegex = new RegExp(`\\b${cleanParamName}(?:\\?)?\\.|\\b${paramName}\\b`, 'g')
      
      if (body.match(paramRegex)) {
        usedParams.push(param)
        console.log(`  ✓ Keeping ${paramName} (used in ${methodName})`)
      } else {
        console.log(`  ✗ Removing ${paramName} (unused in ${methodName})`)
        fileFixes++
      }
    }
    
    // Reconstruct the method signature with only used parameters
    if (usedParams.length < paramList.length) {
      const newSignature = `async ${methodName}(${usedParams.join(', ')}): Promise<void>`
      const newMethod = fullMatch.replace(
        /async\s+\w+\s*\([^)]+\):\s*Promise<void>/,
        newSignature
      )
      content = content.replace(fullMatch, newMethod)
    }
  }

  if (content !== originalContent) {
    writeFileSync(file, content)
    filesFixed++
    totalFixes += fileFixes
    console.log(`  ✅ Fixed ${fileFixes} unused parameters in ${file}`)
  } else {
    console.log(`  ⚪ No fixes needed in ${file}`)
  }
}

console.log('\n🎯 STRATO Core OS™ Remove Unused Parameters Summary')
console.log('===================================================')
console.log(`📁 Files processed: ${files.length}`)
console.log(`📝 Files fixed: ${filesFixed}`)
console.log(`🔧 Total parameters removed: ${totalFixes}`)
console.log('\n✅ Unused parameter removal completed!')