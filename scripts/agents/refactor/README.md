# 🔧 Refactor Agent - Automated Code Refactoring

Agent de refactoring automático para STRATO Core OS™ que mejora la calidad del código y mantiene la consistencia.

## 📋 Descripción

El Refactor Agent automatiza tareas de refactoring comunes, mejora la estructura del código, y mantiene la consistencia en todo el monorepo siguiendo las reglas definidas en `.cursorrules`.

## 🚀 Comandos de Ejecución

```bash
# Refactor automático completo
pnpm tsx scripts/agents/refactor/autofix.ts

# Solo análisis sin aplicar cambios
pnpm tsx scripts/agents/refactor/autofix.ts --dry-run

# Refactor específico para un directorio
pnpm tsx scripts/agents/refactor/autofix.ts --target=apps/backend

# Modo verbose
pnpm tsx scripts/agents/refactor/autofix.ts --verbose
```

## 🔧 Funcionalidades

### 1. **Import/Export Optimization**
```typescript
// Antes
import React from 'react'
import { useState } from 'react'
import { Component } from 'react'

// Después
import React, { useState, Component } from 'react'
```

### 2. **Code Style Standardization**
```typescript
// Antes
const getData = async function() {
  return fetch('/api/data').then(res => res.json())
}

// Después
const getData = async (): Promise<unknown> => {
  const response = await fetch('/api/data')
  return response.json()
}
```

### 3. **Type Safety Improvements**
```typescript
// Antes
function processUser(user: any) {
  return user.name
}

// Después
interface User {
  name: string
  id: string
}

function processUser(user: User): string {
  return user.name
}
```

### 4. **Dead Code Elimination**
- Elimina imports no utilizados
- Remueve variables declaradas pero no usadas
- Limpia código comentado obsoleto
- Identifica funciones huérfanas

### 5. **Pattern Standardization**
- Convierte function declarations a arrow functions
- Estandariza async/await vs Promises
- Unifica patrones de error handling
- Normaliza naming conventions

## 📊 Tipos de Refactoring

### **Automático (Safe)**
✅ Siempre se aplican automáticamente:
- Import organization
- Unused import removal
- Code formatting
- Simple type improvements

### **Sugerido (Manual Review)**
⚠️ Requieren revisión manual:
- Complex type changes
- API signature changes
- Logic restructuring
- Breaking changes

### **Análisis (Report Only)**
📋 Solo se reportan:
- Architecture improvements
- Performance optimizations
- Security enhancements
- Design pattern suggestions

## 🎯 Configuración

### Opciones de CLI
```bash
--dry-run         # Solo análisis, no aplica cambios
--target <path>   # Directorio específico a refactorizar
--verbose         # Output detallado
--type <type>     # Tipo específico: imports|types|style|dead-code
--aggressive      # Refactoring más agresivo (require review)
--auto-fix        # Aplicar todos los safe refactors
```

### Configuración via archivo
```json
// refactor.config.json
{
  "rules": {
    "imports": true,
    "deadCode": true,
    "typesSafety": "conservative",
    "codeStyle": "cursorrules"
  },
  "exclude": [
    "node_modules/**",
    "dist/**",
    "*.generated.*"
  ],
  "aggressive": false
}
```

## 📁 Outputs

### Reportes Generados
```bash
audit-artifacts/reports/refactor-report.json
```

### Estructura del Reporte
```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "summary": {
    "files_analyzed": 245,
    "changes_applied": 67,
    "suggestions": 12,
    "errors": 0
  },
  "changes": [
    {
      "file": "apps/backend/src/services/auth.service.ts",
      "type": "import_optimization",
      "description": "Combined 3 React imports into single import",
      "applied": true
    }
  ],
  "suggestions": [
    {
      "file": "apps/frontend/src/components/Button.tsx",
      "type": "type_improvement",
      "description": "Consider adding stricter prop types",
      "applied": false,
      "reason": "requires_manual_review"
    }
  ]
}
```

## 🧪 Testing del Agente

```bash
# Tests unitarios
vitest scripts/agents/refactor/__tests__/

# Test específico
vitest scripts/agents/refactor/__tests__/autofix.test.ts

# Test con coverage
vitest scripts/agents/refactor/ --coverage
```

## 🔄 Integración

### Pre-commit Hook
```bash
# .husky/pre-commit
pnpm tsx scripts/agents/refactor/autofix.ts --auto-fix
```

### CI/CD Pipeline
```yaml
- name: Auto Refactor
  run: pnpm tsx scripts/agents/refactor/autofix.ts --dry-run
  
- name: Check Refactor Suggestions
  run: |
    if [ -s audit-artifacts/reports/refactor-report.json ]; then
      echo "Refactor suggestions available"
      cat audit-artifacts/reports/refactor-report.json
    fi
```

## ⚙️ Reglas de Refactoring

### Imports
```typescript
// ✅ Preferred
import React, { useState, useEffect } from 'react'
import { Button, Input } from '../components'

// ❌ Avoid
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
```

### Functions
```typescript
// ✅ Preferred
const handleClick = async (): Promise<void> => {
  await processClick()
}

// ❌ Avoid
function handleClick() {
  return processClick().then(() => {})
}
```

### Types
```typescript
// ✅ Preferred
interface UserData {
  id: string
  name: string
  email: string
}

const getUser = (id: string): Promise<UserData> => {
  return fetch(`/api/users/${id}`).then(res => res.json())
}

// ❌ Avoid
const getUser = (id: any): any => {
  return fetch('/api/users/' + id).then(res => res.json())
}
```

## 🚨 Safety Measures

### Backup System
- Crea backup automático antes de cambios
- Permite rollback completo
- Mantiene historial de cambios

### Validation
- Ejecuta tests después de refactoring
- Valida que el build siga funcionando
- Verifica que no se rompan types

### Review Process
```bash
# Ver cambios antes de aplicar
git diff

# Revisar sugerencias
cat audit-artifacts/reports/refactor-report.json

# Aplicar cambios selectivamente
pnpm tsx scripts/agents/refactor/autofix.ts --interactive
```

## 🔍 Troubleshooting

### Problemas Comunes

1. **Refactor rompe tests**
   ```bash
   # Rollback automático
   git checkout -- .
   
   # Ejecutar en modo conservativo
   pnpm tsx scripts/agents/refactor/autofix.ts --conservative
   ```

2. **Types incorrectos después del refactor**
   ```bash
   # Verificar tipos
   pnpm typecheck
   
   # Revisar cambios específicos
   git diff -- "*.ts" "*.tsx"
   ```

3. **Import errors**
   ```bash
   # Verificar paths
   pnpm tsx scripts/agents/refactor/autofix.ts --type=imports --dry-run
   
   # Corregir manualmente si es necesario
   ```

## 📈 Métricas

### KPIs Monitoreados
- **Refactors aplicados**: Número de mejoras automáticas
- **Tiempo de ejecución**: Performance del agente
- **Success rate**: % de refactors exitosos
- **Code quality improvement**: Mejora en métricas de calidad

### Alertas
- Fallo en refactoring automático
- Tests rotos después de refactor
- Degradación de performance
- Tipos rotos

## 🤝 Extensibilidad

### Agregar Nueva Regla
```typescript
// scripts/agents/refactor/rules/my-rule.ts
export class MyRefactorRule implements RefactorRule {
  name = 'my-rule'
  
  async analyze(code: string): Promise<RefactorSuggestion[]> {
    // Implementar análisis
    return suggestions
  }
  
  async apply(code: string, suggestion: RefactorSuggestion): Promise<string> {
    // Implementar aplicación
    return modifiedCode
  }
}
```

### Registrar Regla
```typescript
// scripts/agents/refactor/autofix.ts
import { MyRefactorRule } from './rules/my-rule'

const refactor = new RefactorAgent({
  rules: [
    new ImportOptimizationRule(),
    new TypeSafetyRule(),
    new MyRefactorRule(), // Nueva regla
  ]
})
```

---

**Mantenido por**: STRATO Refactor Team  
**Última actualización**: $(date)  
**Versión**: 2.1.0