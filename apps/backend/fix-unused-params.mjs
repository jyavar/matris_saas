#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

console.log('🔧 STRATO Core OS™ - Unused Parameters Fixer')
console.log('=============================================')

// Find all TypeScript files
const files = glob.sync('src/**/*.ts')

let totalFixes = 0
let totalFiles = 0

for (const file of files) {
  let content = readFileSync(file, 'utf8')
  const originalContent = content
  let fileFixes = 0

  // Split into lines for processing
  const lines = content.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Check if this line has unused parameters in function signature
    if (line.includes('async ') && line.includes('(') && line.includes(': Promise<void>')) {
      const bodyStart = i + 1
      let bodyEnd = -1
      let braceCount = 0
      let foundOpenBrace = false
      
      // Find the end of the function body
      for (let j = bodyStart; j < lines.length; j++) {
        const bodyLine = lines[j]
        
        for (const char of bodyLine) {
          if (char === '{') {
            braceCount++
            foundOpenBrace = true
          } else if (char === '}') {
            braceCount--
            if (foundOpenBrace && braceCount === 0) {
              bodyEnd = j
              break
            }
          }
        }
        
        if (bodyEnd !== -1) break
      }
      
      if (bodyEnd === -1) continue
      
      // Get the function body
      const functionBody = lines.slice(bodyStart, bodyEnd + 1).join('\n')
      
      // Check which parameters are actually used in the function body
      const usedParams = {
        _params: functionBody.includes('_params'),
        _body: functionBody.includes('_body'),
        user: functionBody.includes('user')
      }
      
      // Update the function signature to remove unused parameters
      let newLine = line
      
      // If _params is not used, prefix with underscore
      if (!usedParams._params && line.includes('_params?:')) {
        // Already has underscore, no change needed
      } else if (!usedParams._params && line.includes('params?:')) {
        newLine = newLine.replace('params?:', '_params?:')
        fileFixes++
      }
      
      // If _body is not used, prefix with underscore
      if (!usedParams._body && line.includes('_body?:')) {
        // Already has underscore, no change needed
      } else if (!usedParams._body && line.includes('body?:')) {
        newLine = newLine.replace('body?:', '_body?:')
        fileFixes++
      }
      
      // If user is not used, prefix with underscore
      if (!usedParams.user && line.includes('user?:')) {
        newLine = newLine.replace('user?:', '_user?:')
        fileFixes++
      }
      
      lines[i] = newLine
    }
  }
  
  // Reconstruct the content
  content = lines.join('\n')
  
  // Count fixes made
  if (content !== originalContent) {
    totalFixes += fileFixes
    totalFiles++
    
    writeFileSync(file, content)
    console.log(`✅ ${file}: ${fileFixes} parameter fixes applied`)
  }
}

console.log(`\n🎯 Total: ${totalFixes} parameter fixes in ${totalFiles} files`)