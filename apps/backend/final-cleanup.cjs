#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Función para limpiar archivo específicamente
function finalCleanup(filePath) {
  if (!fs.existsSync(filePath)) return false
  
  let content = fs.readFileSync(filePath, 'utf8')
  let originalContent = content
  
  // 1. Eliminar imports no usados específicos
  const unusedImports = [
    'ServerResponse',
    'sendCreated', 
    'AuthenticatedUser',
    'IncomingMessage'
  ]
  
  unusedImports.forEach(importName => {
    // Buscar y eliminar imports específicos
    const importRegex = new RegExp(`import\\s*{[^}]*\\b${importName}\\b[^}]*}\\s*from\\s*['"][^'"]+['"];?\\s*\\n?`, 'g')
    content = content.replace(importRegex, (match) => {
      // Si el import solo contiene el import no usado, eliminarlo
      const imports = match.match(/import\s*{([^}]+)}/)[1]
      const importList = imports.split(',').map(i => i.trim())
      if (importList.length === 1 && importList[0].includes(importName)) {
        return ''
      }
      return match
    })
  })
  
  // 2. Eliminar variables no usadas en parámetros
  content = content.replace(/(\w+)\s*[:=]\s*([^,)]+)(?:,|\))/g, (match, varName, type) => {
    if (varName === 'user' && !content.includes(varName)) {
      return `${type}${match.includes(',') ? ',' : ')'}`
    }
    return match
  })
  
  // 3. Eliminar variables no usadas en destructuring
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
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    return true
  }
  return false
}

// Archivos restantes con errores
const remainingFiles = [
  'src/controllers/onboarding.controller.ts',
  'src/controllers/resend.controller.ts',
  'src/controllers/runtime.controller.ts',
  'src/middleware/errorHandler.middleware.ts',
  'src/services/resend.service.ts',
  'src/utils/controller-factory.ts'
]

console.log('🧹 Limpieza final de lint...')
let cleaned = 0
remainingFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file)
  if (finalCleanup(filePath)) {
    console.log(`✅ Limpiado: ${file}`)
    cleaned++
  }
})
console.log(`🎉 Limpieza final completada. Archivos modificados: ${cleaned}`) 