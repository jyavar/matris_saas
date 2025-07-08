#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Función para limpiar archivo
function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) return false
  
  let content = fs.readFileSync(filePath, 'utf8')
  let originalContent = content
  
  // 1. Remover imports no usados
  content = content.replace(/import\s*{\s*([^}]*)\s*}\s*from\s*['"][^'"]+['"]\s*;?\s*$/gm, (match, imports) => {
    const importList = imports.split(',').map(i => i.trim())
    const unusedImports = importList.filter(imp => {
      const varName = imp.split(' as ')[0].trim()
      return !content.includes(varName) || content.split(varName).length <= 2
    })
    if (unusedImports.length === importList.length) {
      return '' // Remover import completo si todos están no usados
    }
    return match
  })
  
  // 2. Limpiar variables no usadas en parámetros
  content = content.replace(/(\w+)\s*[:=]\s*([^,)]+)(?:,|\))/g, (match, varName, type) => {
    if (varName.startsWith('_') && !content.includes(varName)) {
      return `_${varName}: ${type}${match.includes(',') ? ',' : ')'}`
    }
    return match
  })
  
  // 3. Limpiar variables no usadas en destructuring
  content = content.replace(/const\s*{\s*([^}]+)\s*}\s*=\s*([^;]+);/g, (match, vars, rest) => {
    const varList = vars.split(',').map(v => v.trim())
    const usedVars = varList.filter(v => {
      const varName = v.split(':')[0].trim()
      return content.includes(varName) && content.split(varName).length > 2
    })
    if (usedVars.length === 0) {
      return `// ${match}`
    }
    return `const { ${usedVars.join(', ')} } = ${rest};`
  })
  
  // 4. Limpiar variables no usadas en assignments
  content = content.replace(/(\w+)\s*=\s*([^;]+);/g, (match, varName, value) => {
    if (!content.includes(varName) || content.split(varName).length <= 2) {
      return `// ${match}`
    }
    return match
  })
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    return true
  }
  return false
}

// Lista de archivos a limpiar
const files = [
  'src/controllers/analytics-reporting.controller.ts',
  'src/controllers/auth.controller.ts',
  'src/controllers/automation.controller.ts',
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

console.log('🚀 Limpieza masiva de lint...')

let cleanedCount = 0
files.forEach(file => {
  const filePath = path.join(process.cwd(), file)
  if (cleanFile(filePath)) {
    console.log(`✅ Limpiado: ${file}`)
    cleanedCount++
  }
})

console.log(`🎉 Limpieza completada! ${cleanedCount} archivos procesados.`) 