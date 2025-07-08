#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

// Patrones de limpieza
const patterns = [
  // Variables no usadas con underscore
  { 
    regex: /(_user|_params|_body|__params|__body|__user)\s*[:=]/g,
    replace: (match, varName) => {
      if (varName.startsWith('__')) {
        return `_${varName.slice(2)}:`
      }
      return `${varName}:`
    }
  },
  // Imports no usados
  { 
    regex: /import\s*{[^}]*}\s*from\s*['"][^'"]+['"]\s*;?\s*$/gm,
    replace: (match) => {
      // Remover imports vacíos
      if (match.includes('{}')) return ''
      return match
    }
  },
  // Variables no usadas en destructuring
  {
    regex: /const\s*{\s*([^}]+)\s*}\s*=\s*([^;]+);/g,
    replace: (match, vars, rest) => {
      const unusedVars = vars.split(',').map(v => v.trim()).filter(v => 
        v.startsWith('_') && !v.includes('=') && !v.includes('?')
      )
      if (unusedVars.length > 0) {
        const newVars = vars.split(',').map(v => v.trim()).map(v => {
          if (unusedVars.includes(v)) {
            return v.startsWith('__') ? `_${v.slice(2)}` : v
          }
          return v
        }).join(', ')
        return `const { ${newVars} } = ${rest};`
      }
      return match
    }
  }
]

// Archivos a procesar
const files = [
  'src/controllers/billing.controller.ts',
  'src/controllers/campaigns.controller.ts', 
  'src/controllers/email-campaigns.controller.ts',
  'src/controllers/health.controller.ts',
  'src/controllers/launchboard.controller.ts',
  'src/controllers/onboarding.controller.ts',
  'src/controllers/payments.controller.ts',
  'src/controllers/posthog.controller.ts',
  'src/controllers/reporting.controller.ts',
  'src/controllers/resend.controller.ts',
  'src/controllers/runtime.controller.ts',
  'src/middleware/auth.middleware.ts',
  'src/middleware/errorHandler.middleware.ts',
  'src/services/automation.service.ts',
  'src/services/resend.service.ts',
  'src/tests/test-helper.ts',
  'src/utils/controller-factory.ts',
  'src/utils/router.ts',
  'src/utils/test-helper.ts'
]

console.log('🚀 Limpiando archivos de lint...')

files.forEach(file => {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8')
    let originalContent = content
    
    patterns.forEach(pattern => {
      content = content.replace(pattern.regex, pattern.replace)
    })
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content)
      console.log(`✅ Limpiado: ${file}`)
    }
  }
})

console.log('🎉 Limpieza rápida completada!') 