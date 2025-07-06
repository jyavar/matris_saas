#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

console.log('🔧 STRATO Core OS™ - ESLint Unused Variables Fixer')
console.log('==================================================')

// Find all TypeScript files
const files = glob.sync('src/**/*.ts')

let totalFixes = 0
let totalFiles = 0

for (const file of files) {
  let content = readFileSync(file, 'utf8')
  const originalContent = content
  let fileFixes = 0

  // Fix 1: Replace 'user?' with '_user?' for unused user parameters
  content = content.replace(/(\w+)\s*\(\s*([^)]*)\s+user\?\s*:\s*AuthenticatedUser\s*\)/g, (match, methodName, params) => {
    // Check if 'user' is used in the method body
    const methodBodyRegex = new RegExp(`${methodName}\\s*\\([^)]*\\)\\s*:\\s*Promise<void>\\s*{[^}]*}`, 's')
    const methodBodyMatch = content.match(methodBodyRegex)
    
    if (methodBodyMatch && !methodBodyMatch[0].includes('user?.') && !methodBodyMatch[0].includes('user ||')) {
      fileFixes++
      return match.replace('user?:', '_user?:')
    }
    return match
  })

  // Fix 2: Replace '_params?' with '__params?' for truly unused _params
  content = content.replace(/(\w+)\s*\(\s*([^)]*)\s+_params\?\s*:\s*Record<string,\s*string>\s*\)/g, (match, methodName, params) => {
    // Check if '_params' is used in the method body
    const methodBodyRegex = new RegExp(`${methodName}\\s*\\([^)]*\\)\\s*:\\s*Promise<void>\\s*{[^}]*}`, 's')
    const methodBodyMatch = content.match(methodBodyRegex)
    
    if (methodBodyMatch && !methodBodyMatch[0].includes('_params')) {
      fileFixes++
      return match.replace('_params?:', '__params?:')
    }
    return match
  })

  // Fix 3: Replace '_body?' with '__body?' for truly unused _body
  content = content.replace(/(\w+)\s*\(\s*([^)]*)\s+_body\?\s*:\s*RequestBody\s*\)/g, (match, methodName, params) => {
    // Check if '_body' is used in the method body
    const methodBodyRegex = new RegExp(`${methodName}\\s*\\([^)]*\\)\\s*:\\s*Promise<void>\\s*{[^}]*}`, 's')
    const methodBodyMatch = content.match(methodBodyRegex)
    
    if (methodBodyMatch && !methodBodyMatch[0].includes('_body')) {
      fileFixes++
      return match.replace('_body?:', '__body?:')
    }
    return match
  })

  // Simple approach: Just prefix unused parameters with underscore
  // Pattern: method(req, res, param?) where param is not used
  const lines = content.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    if (line.includes('async ') && line.includes(': Promise<void>')) {
      // Find if there are unused parameters
      if (line.includes('user?:') && !line.includes('_user?:')) {
        // Check if user is used in the method
        const nextLines = lines.slice(i + 1, i + 20).join('\n')
        if (!nextLines.includes('user?.') && !nextLines.includes('user ||')) {
          lines[i] = line.replace('user?:', '_user?:')
          fileFixes++
        }
      }
      
      if (line.includes('_params?:') && !line.includes('__params?:')) {
        // Check if _params is used in the method
        const nextLines = lines.slice(i + 1, i + 20).join('\n')
        if (!nextLines.includes('_params')) {
          lines[i] = line.replace('_params?:', '__params?:')
          fileFixes++
        }
      }
      
      if (line.includes('_body?:') && !line.includes('__body?:')) {
        // Check if _body is used in the method
        const nextLines = lines.slice(i + 1, i + 20).join('\n')
        if (!nextLines.includes('_body')) {
          lines[i] = line.replace('_body?:', '__body?:')
          fileFixes++
        }
      }
    }
  }
  
  content = lines.join('\n')

  // Count fixes made
  if (content !== originalContent) {
    totalFixes += fileFixes
    totalFiles++
    
    writeFileSync(file, content)
    console.log(`✅ ${file}: ${fileFixes} unused variable fixes applied`)
  }
}

console.log(`\n🎯 Total: ${totalFixes} unused variable fixes in ${totalFiles} files`)