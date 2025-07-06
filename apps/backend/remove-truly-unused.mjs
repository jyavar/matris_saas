#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

console.log('🔧 STRATO Core OS™ - Remove Truly Unused Parameters')
console.log('==================================================')

// Find all TypeScript files
const files = glob.sync('src/**/*.ts')

let totalFixes = 0
let totalFiles = 0

for (const file of files) {
  let content = readFileSync(file, 'utf8')
  const originalContent = content
  let fileFixes = 0

  // Strategy: Remove parameters that are truly unused from function signatures
  // We'll look for method signatures and check what's actually used in the method body
  
  const lines = content.split('\n')
  const newLines = [...lines]
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Find async method declarations
    if (line.includes('async ') && line.includes('(') && line.includes(': Promise<void>')) {
      // Extract method body to check what's used
      let bodyStart = i + 1
      let bodyEnd = -1
      let braceCount = 0
      let foundFirstBrace = false
      
      // Find method body boundaries
      for (let j = bodyStart; j < lines.length; j++) {
        const bodyLine = lines[j]
        for (const char of bodyLine) {
          if (char === '{') {
            braceCount++
            foundFirstBrace = true
          } else if (char === '}') {
            braceCount--
            if (foundFirstBrace && braceCount === 0) {
              bodyEnd = j
              break
            }
          }
        }
        if (bodyEnd !== -1) break
      }
      
      if (bodyEnd === -1) continue
      
      const methodBody = lines.slice(bodyStart, bodyEnd + 1).join('\n')
      
      // Determine which parameters are truly used
      const params = {
        _params: methodBody.includes('_params'),
        __params: methodBody.includes('__params'),  
        _body: methodBody.includes('_body'),
        __body: methodBody.includes('__body'),
        user: methodBody.includes('user?.') || methodBody.includes('user ||') || methodBody.includes('user)'),
        _user: methodBody.includes('_user?.') || methodBody.includes('_user ||') || methodBody.includes('_user)'),
      }
      
      // Build new parameter list excluding truly unused ones
      let newLine = line
      
      // Remove truly unused parameters
      if (!params._params && !params.__params) {
        newLine = newLine.replace(/, __?params\?\s*:\s*Record<string,\s*string>/g, '')
        newLine = newLine.replace(/__?params\?\s*:\s*Record<string,\s*string>,?\s*/g, '')
      }
      
      if (!params._body && !params.__body) {
        newLine = newLine.replace(/, __?body\?\s*:\s*RequestBody/g, '')
        newLine = newLine.replace(/__?body\?\s*:\s*RequestBody,?\s*/g, '')
      }
      
      if (!params.user && !params._user) {
        newLine = newLine.replace(/, _?user\?\s*:\s*AuthenticatedUser/g, '')
        newLine = newLine.replace(/_?user\?\s*:\s*AuthenticatedUser,?\s*/g, '')
      }
      
      // Clean up any trailing commas
      newLine = newLine.replace(/,\s*\)/g, ')')
      newLine = newLine.replace(/\(\s*,/g, '(')
      
      if (newLine !== line) {
        newLines[i] = newLine
        fileFixes++
      }
    }
  }
  
  content = newLines.join('\n')
  
  if (content !== originalContent) {
    totalFixes += fileFixes
    totalFiles++
    
    writeFileSync(file, content)
    console.log(`✅ ${file}: ${fileFixes} parameter removals applied`)
  }
}

console.log(`\n🎯 Total: ${totalFixes} parameter removals in ${totalFiles} files`)