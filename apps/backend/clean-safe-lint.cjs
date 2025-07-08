#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Patrones seguros
const unusedParamNames = ['_user', '_params', '_body', '__user', '__params', '__body']

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) return false
  let content = fs.readFileSync(filePath, 'utf8')
  let originalContent = content

  // 1. Eliminar imports no usados (solo si la línea es completamente no usada)
  content = content.replace(/import\s+{([^}]+)}\s+from\s+['"][^'"]+['"];?\s*\n/g, (match, imports) => {
    const importList = imports.split(',').map(i => i.trim())
    // Si todos los imports no aparecen en el archivo, borra la línea
    const allUnused = importList.every(imp => {
      const varName = imp.split(' as ')[0].trim()
      // Aparece solo en el import
      return (content.match(new RegExp(`\\b${varName}\\b`, 'g')) || []).length <= 1
    })
    return allUnused ? '' : match
  })

  // 2. Eliminar parámetros de función claramente no usados
  content = content.replace(/(async\s+\w+\s*\([^)]*)\b(_user|_params|_body|__user|__params|__body)\b\s*[:?]?\s*[^,)]+,?/g, (match, before, param) => {
    // Elimina el parámetro de la firma
    return before
  })

  // 3. Eliminar tipos importados no usados
  content = content.replace(/import\s+type\s+{([^}]+)}\s+from\s+['"][^'"]+['"];?\s*\n/g, (match, imports) => {
    const importList = imports.split(',').map(i => i.trim())
    const allUnused = importList.every(imp => {
      const varName = imp.split(' as ')[0].trim()
      return (content.match(new RegExp(`\\b${varName}\\b`, 'g')) || []).length <= 1
    })
    return allUnused ? '' : match
  })

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    return true
  }
  return false
}

// Archivos a limpiar
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

console.log('🧹 Limpieza segura de imports y parámetros no usados...')
let cleaned = 0
files.forEach(file => {
  const filePath = path.join(process.cwd(), file)
  if (cleanFile(filePath)) {
    console.log(`✅ Limpiado: ${file}`)
    cleaned++
  }
})
console.log(`🎉 Limpieza segura completada. Archivos modificados: ${cleaned}`) 