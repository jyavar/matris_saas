# 🔍 @qa Agent - Automated Code Audit

El agente **@qa** es un sistema automatizado de auditoría de calidad de código que realiza verificaciones exhaustivas del proyecto STRATO.

## 🎯 Funcionalidades

### ✅ Verificaciones Automáticas

1. **Linting** - Verifica que el código cumpla con las reglas de ESLint
2. **Tests** - Ejecuta todos los tests y verifica que pasen
3. **Cobertura** - Analiza la cobertura de tests (mínimo 90%)
4. **Seguridad** - Detecta paquetes vulnerables y problemas de seguridad
5. **Performance** - Verifica que el build sea exitoso y eficiente

### 📊 Reportes Detallados

- Estado general: `PASS`, `FAIL`, o `WARNING`
- Resumen ejecutivo con métricas
- Recomendaciones específicas de mejora
- Guardado automático de resultados en `audit-artifacts/qa-audit.json`

## 🚀 Uso

### Comandos Principales

```bash
# Ejecutar auditoría completa
pnpm qa:audit

# Ejecutar en modo runner (con salida detallada)
pnpm qa:runner

# Ejecutar tests del agente QA
pnpm qa:test
```

### Opciones Avanzadas

```bash
# Modo verbose con detalles completos
tsx scripts/agents/qa/index.ts --verbose

# Modo runner con opciones personalizadas
tsx scripts/agents/qa/index.ts --mode runner --no-exit

# Solo auditoría sin guardar reporte
tsx scripts/agents/qa/index.ts --no-save
```

### CLI Options

| Opción | Descripción | Default |
|--------|-------------|---------|
| `--mode <mode>` | Modo de operación: `audit` o `runner` | `audit` |
| `--verbose, -v` | Salida detallada | `false` |
| `--no-save` | No guardar reporte | `true` |
| `--no-exit` | No salir en caso de fallo | `true` |
| `--help, -h` | Mostrar ayuda | - |

## 🏗️ Arquitectura

### Componentes Principales

```
scripts/agents/qa/
├── audit.ts          # Agente principal de auditoría
├── run-qa.ts         # Runner con interfaz CLI
├── index.ts          # Punto de entrada unificado
├── audit.test.ts     # Tests del agente
├── run-qa.test.ts    # Tests del runner
├── index.test.ts     # Tests del manager
└── README.md         # Esta documentación
```

### Flujo de Ejecución

1. **Inicialización** - Configuración de opciones y directorio del proyecto
2. **Verificaciones** - Ejecución secuencial de todas las verificaciones
3. **Análisis** - Procesamiento de resultados y generación de métricas
4. **Reporte** - Generación y guardado del reporte final
5. **Salida** - Presentación de resultados y recomendaciones

## 📋 Criterios de Evaluación

### ✅ PASS (Éxito)
- Todos los tests pasando
- Cobertura ≥90%
- Sin errores de linting
- Build exitoso
- Sin vulnerabilidades críticas

### ⚠️ WARNING (Advertencia)
- Cobertura <90% pero ≥70%
- Paquetes potencialmente vulnerables
- Build con warnings menores

### ❌ FAIL (Fallo)
- Tests fallando
- Errores de linting
- Build fallido
- Vulnerabilidades críticas detectadas

## 🔧 Integración con CI/CD

### GitHub Actions

```yaml
name: QA Audit
on: [push, pull_request]

jobs:
  qa-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: pnpm install
      - run: pnpm qa:audit
```

### Pre-commit Hook

```bash
# Agregar al pre-commit
pnpm qa:audit --no-exit
```

## 📊 Ejemplo de Salida

```
🔍 @qa Agent Manager - Starting QA operations...

📋 QA Audit Results:
==================================================
Status: ✅ PASS
Timestamp: 2025-01-01T12:00:00.000Z
Summary: QA Audit: 5 passed, 0 failed, 0 warnings

🔍 Detailed Checks:
------------------------------
✅ LINTING: PASS
   All linting rules passed
✅ TESTS: PASS
   All tests passing
✅ COVERAGE: PASS
   Test coverage meets 90% threshold
✅ SECURITY: PASS
   No obvious security vulnerabilities detected
✅ PERFORMANCE: PASS
   Build completed successfully

==================================================
✅ QA Audit completed
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests unitarios
pnpm qa:test

# Tests con coverage
vitest scripts/agents/qa/ --coverage

# Tests en modo watch
vitest scripts/agents/qa/ --watch
```

### Cobertura de Tests

- **audit.test.ts**: 100% - Tests del agente principal
- **run-qa.test.ts**: 100% - Tests del runner
- **index.test.ts**: 100% - Tests del manager

## 🔍 Troubleshooting

### Problemas Comunes

1. **Error: "Command not found"**
   ```bash
   # Verificar que tsx esté instalado
   pnpm add -D tsx
   ```

2. **Error: "Permission denied"**
   ```bash
   # Dar permisos de ejecución
   chmod +x scripts/agents/qa/*.ts
   ```

3. **Error: "Build failed"**
   ```bash
   # Verificar dependencias
   pnpm install
   pnpm build
   ```

### Logs y Debugging

```bash
# Modo verbose para debugging
pnpm qa:audit --verbose

# Ver logs detallados
pnpm qa:runner --verbose
```

## 📈 Métricas y KPIs

### Métricas Clave

- **Tiempo de ejecución**: <30 segundos
- **Cobertura mínima**: 90%
- **Tests pasando**: 100%
- **Vulnerabilidades**: 0 críticas

### Reportes Automáticos

Los reportes se guardan en:
- `audit-artifacts/qa-audit.json` - Reporte completo en JSON
- `audit-artifacts/reports/` - Reportes históricos

## 🤝 Contribución

### Agregar Nuevas Verificaciones

1. Crear método en `QAAgent`
2. Agregar al método `runAudit()`
3. Actualizar interfaces y tests
4. Documentar en README

### Ejemplo

```typescript
private async checkNewFeature(): Promise<void> {
  try {
    // Implementar verificación
    this.results.checks.newFeature = {
      status: 'PASS',
      message: 'New feature check passed'
    }
  } catch (error) {
    this.results.checks.newFeature = {
      status: 'FAIL',
      message: 'New feature check failed'
    }
  }
}
```

## 📚 Referencias

- [Vitest Testing Framework](https://vitest.dev)
- [ESLint Configuration](https://eslint.org)
- [STRATO Testing Standards](/.cursorrules#testing-standards)

---

**Estado**: ✅ Operativo  
**Última actualización**: Enero 2025  
**Versión**: 1.0.0 