# 🔍 Test Coverage Audit Scripts

Scripts para auditar la cobertura de tests en todo el monorepo STRATO Core OS™.

## 📋 Scripts Disponibles

### `audit-test-coverage.ts`
Script principal que analiza todos los módulos y genera reportes JSON detallados.

**Características:**
- Escanea todos los módulos del monorepo
- Analiza archivos de test y código fuente
- Calcula porcentajes de cobertura
- Detecta problemas y configuraciones faltantes
- Genera recomendaciones automáticas
- Exporta reportes en formato JSON

### `run-test-coverage-audit.ts`
Script mejorado que ejecuta la auditoría y muestra resultados detallados en consola.

**Características:**
- Ejecuta la auditoría completa
- Muestra resumen detallado en consola
- Agrupa módulos por nivel de cobertura
- Lista acciones prioritarias
- Proporciona recomendaciones específicas

## 🚀 Uso

### Desde package.json
```bash
# Auditoría completa con reporte detallado
pnpm qa:coverage-audit

# Auditoría básica (solo JSON)
pnpm qa:coverage-audit:basic
```

### Directamente
```bash
# Auditoría completa
pnpm tsx scripts/qa/run-test-coverage-audit.ts

# Auditoría básica
pnpm tsx scripts/qa/audit-test-coverage.ts
```

## 📊 Reportes Generados

### `audit-artifacts/reports/test-coverage-audit.json`
Reporte completo con todos los detalles:
- Información de cada módulo
- Archivos de test individuales
- Métricas detalladas
- Problemas detectados
- Configuraciones de frameworks

### `audit-artifacts/reports/test-coverage-summary.json`
Resumen ejecutivo:
- Métricas generales
- Agrupación por cobertura
- Recomendaciones principales

## 📈 Métricas Analizadas

### Por Módulo
- **Cobertura de líneas:** Porcentaje de líneas de código cubiertas por tests
- **Archivos de test:** Cantidad y tipos (unit, integration, e2e, spec)
- **Frameworks:** Vitest, Jest, Playwright detectados
- **Problemas:** Issues encontrados (sin tests, sin configuración, etc.)

### Niveles de Cobertura
- **🟢 Alta (≥80%):** Excelente cobertura
- **🟡 Media (50-79%):** Cobertura aceptable, necesita mejora
- **🔴 Baja (<50%):** Cobertura pobre, prioridad alta
- **⚫ Sin tests (0%):** Sin tests, prioridad crítica

## 🎯 Módulos Analizados

1. **`apps/backend`** - API Node.js puro
2. **`apps/backend-nest`** - API NestJS
3. **`apps/frontend`** - React + Vite
4. **`apps/web`** - Next.js
5. **`packages/`** - Librerías compartidas
6. **`scripts/agents/`** - Agentes de automatización
7. **`scripts/`** - Scripts de utilidad

## 🔧 Configuración

### Detección de Frameworks
El script detecta automáticamente:
- `vitest.config.ts/js`
- `jest.config.ts/js`
- `playwright.config.ts/js`

### Patrones de Archivos
**Tests:**
- `**/*.test.ts`
- `**/*.test.tsx`
- `**/*.spec.ts`
- `**/*.spec.tsx`
- `**/__tests__/**/*.ts`
- `**/__tests__/**/*.tsx`

**Código fuente:**
- `**/*.ts`
- `**/*.tsx`
- `**/*.js`
- `**/*.jsx`

### Exclusiones
- `node_modules/`
- `dist/`
- `build/`
- `.next/`
- `coverage/`
- `test-results/`

## 🧪 Tests

```bash
# Ejecutar tests del script
pnpm vitest scripts/qa/__tests__/audit-test-coverage.test.ts
```

## 📝 Ejemplo de Salida

```
🔍 STRATO Test Coverage Audit Runner
=====================================

📊 DETAILED COVERAGE REPORT
============================

📈 SUMMARY:
  Total Modules: 7
  Total Test Files: 155
  Total Lines of Code: 24,786
  Total Test Lines: 10,334
  Average Coverage: 31%

📋 COVERAGE GROUPS:
  🟢 High Coverage (≥80%): 0 modules
  🟡 Medium Coverage (50-79%): 2 modules
  🔴 Low Coverage (<50%): 5 modules
  ⚫ No Tests: 0 modules

📁 MODULE DETAILS:
  🟡 backend (backend):
    Coverage: 53%
    Test Files: 47
    Lines of Code: 10,213
    Test Lines: 5,457
    Frameworks: vitest

🎯 PRIORITY ACTIONS:
  2. Improve coverage in low-coverage modules:
     - backend-nest: 25% → target 80%
     - frontend: 37% → target 80%
     - web: 13% → target 80%
```

## 🔄 Integración con CI/CD

El script puede integrarse en pipelines de CI/CD:

```yaml
# GitHub Actions example
- name: Test Coverage Audit
  run: pnpm qa:coverage-audit
  continue-on-error: true

- name: Upload Coverage Report
  uses: actions/upload-artifact@v3
  with:
    name: test-coverage-report
    path: audit-artifacts/reports/
```

## 🎯 Objetivos de Cobertura

**STRATO Core OS™** establece estos objetivos:
- **Mínimo:** 50% cobertura por módulo
- **Objetivo:** 80% cobertura por módulo
- **Excelente:** 90%+ cobertura por módulo

## 📞 Soporte

Para problemas o mejoras:
1. Revisar los tests en `scripts/qa/__tests__/`
2. Verificar la configuración de frameworks
3. Consultar el reporte JSON completo
4. Revisar las recomendaciones generadas 