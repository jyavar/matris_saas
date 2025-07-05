# 🤖 STRATO AGENTS SYSTEM

Sistema de automatización y agentes inteligentes para STRATO Core OS™.

## 📋 Descripción General

Los agentes STRATO son scripts automatizados que realizan tareas específicas de desarrollo, mantenimiento, y análisis de calidad en el monorepo. Cada agente está diseñado para ser independiente, reutilizable y fácil de ejecutar.

## 🗂️ Estructura de Agentes

```bash
scripts/agents/
├── analytics/          # Análisis y reportes de métricas
├── context-watchdog/    # Monitoreo de contexto y rutas
├── data/               # Procesamiento y respaldo de datos
├── docs/               # Generación automática de documentación
├── i18n/               # Detección de internacionalización
├── licenses/           # Validación de licencias
├── merge-strategist/   # Resolución de conflictos de merge
├── perf/               # Benchmarking y performance
├── qa/                 # Auditoría de calidad y tests
├── refactor/           # Refactoring automático
├── runtime/            # Monitoreo en tiempo de ejecución
├── security/           # Auditorías de seguridad
├── support/            # Análisis de tickets de soporte
├── ui/                 # Auditoría de componentes UI
├── fiverr-writer/      # Generación de contenido (Fiverr)
├── freelancer-leadgen/ # Generación de leads (Freelancer)
├── mturk-labeler/      # Etiquetado de datos (MTurk)
└── upwork-transcriber/ # Transcripción (Upwork)
```

## 🚀 Agentes Principales

### 🔍 **QA (Quality Assurance)**
- **Comando**: `pnpm qa:audit`
- **Propósito**: Auditoría completa de calidad de código
- **Output**: Reportes de QA en `audit-artifacts/reports/`

### 🔧 **Refactor**
- **Comando**: `pnpm tsx scripts/agents/refactor/autofix.ts`
- **Propósito**: Refactoring automático de código
- **Funciones**: Fix de imports, cleanup de código, estandarización

### 👁️ **Context Watchdog**
- **Comando**: `pnpm tsx scripts/agents/context-watchdog.ts`
- **Propósito**: Monitoreo de contexto y detección de violaciones
- **Output**: Logs en `logs/context-violations.log`

### 📊 **Analytics**
- **Comando**: `pnpm tsx scripts/agents/analytics/report.ts`
- **Propósito**: Generación de reportes de métricas y análisis
- **Output**: Reportes en `audit-artifacts/reports/analytics-report.json`

### 🛡️ **Security**
- **Comando**: `pnpm tsx scripts/agents/security/security-check.ts`
- **Propósito**: Auditorías de seguridad y detección de vulnerabilidades
- **Output**: Reportes de seguridad en `audit-artifacts/reports/`

### ⚡ **Performance**
- **Comando**: `pnpm tsx scripts/agents/perf/benchmark.ts`
- **Propósito**: Benchmarking y análisis de performance
- **Output**: Métricas de performance

### 🎨 **UI Audit**
- **Comando**: `pnpm tsx scripts/agents/ui/audit-ui.ts`
- **Propósito**: Auditoría de componentes UI y accesibilidad
- **Output**: Reportes de UI

### 🔄 **Merge Strategist**
- **Comando**: `pnpm tsx scripts/agents/merge-strategist/plan-merge.ts`
- **Propósito**: Estrategias de merge y resolución de conflictos
- **Output**: Planes de merge optimizados

### 💾 **Data Agent**
- **Comando**: `pnpm tsx scripts/agents/data/backup.ts`
- **Propósito**: Procesamiento y respaldo de datos
- **Output**: Backups en `backup/`

### 📚 **Docs Generator**
- **Comando**: `pnpm tsx scripts/agents/docs/docgen.ts`
- **Propósito**: Generación automática de documentación
- **Output**: Documentación actualizada

## 🛠️ Agentes de Servicios Externos

### ✍️ **Fiverr Writer**
- **Propósito**: Generación de contenido profesional
- **Input**: Prompts de contenido
- **Output**: Contenido generado

### 🎯 **Freelancer Lead Gen**
- **Propósito**: Generación de leads y prospección
- **Output**: Listas de leads calificados

### 🏷️ **MTurk Labeler**
- **Propósito**: Etiquetado y clasificación de datos
- **Output**: Datos etiquetados

### 📝 **Upwork Transcriber**
- **Propósito**: Transcripción de audio/video
- **Output**: Transcripciones precisas

## 📋 Comandos de Ejecución

### Comandos Principales
```bash
# QA completo
pnpm qa:audit

# QA en modo runner
pnpm qa:runner

# Tests de agentes
pnpm qa:test

# Refactor automático
pnpm tsx scripts/agents/refactor/autofix.ts

# Monitoreo de contexto
pnpm tsx scripts/agents/context-watchdog.ts

# Análisis de performance
pnpm tsx scripts/agents/perf/benchmark.ts
```

### Comandos Individuales
```bash
# Analytics
pnpm tsx scripts/agents/analytics/report.ts

# Security audit
pnpm tsx scripts/agents/security/security-check.ts

# UI audit
pnpm tsx scripts/agents/ui/audit-ui.ts

# Docs generation
pnpm tsx scripts/agents/docs/docgen.ts

# Data backup
pnpm tsx scripts/agents/data/backup.ts

# License validation
pnpm tsx scripts/agents/licenses/validate-licenses.ts

# I18N detection
pnpm tsx scripts/agents/i18n/detect.ts

# Support analysis
pnpm tsx scripts/agents/support/analyze.ts

# Runtime monitoring
pnpm tsx scripts/agents/runtime/watchdog.ts
```

## 🧪 Testing de Agentes

Cada agente incluye tests unitarios:

```bash
# Test individual de agente
pnpm tsx scripts/agents/qa/__tests__/audit.test.ts

# Tests de todos los agentes
find scripts/agents -name "*.test.ts" -exec pnpm tsx {} \;
```

## 📁 Outputs y Artifacts

### Directorios de Output
- `audit-artifacts/reports/` - Reportes de auditoría
- `logs/` - Logs de ejecución
- `backup/` - Respaldos de datos
- `coverage/` - Reportes de cobertura

### Formatos de Output
- **JSON**: Reportes estructurados
- **Markdown**: Documentación y reportes legibles
- **Logs**: Información de debugging y monitoreo

## 🔧 Configuración

### Variables de Entorno
```bash
# Para agentes de servicios externos
FIVERR_API_KEY=your_key
FREELANCER_API_KEY=your_key
MTURK_API_KEY=your_key
UPWORK_API_KEY=your_key
```

### Configuración de Agentes
Algunos agentes pueden configurarse via archivos de configuración en sus directorios respectivos.

## 🚦 Integración con CI/CD

Los agentes se pueden integrar en pipelines de CI/CD:

```yaml
# GitHub Actions ejemplo
- name: Run QA Audit
  run: pnpm qa:audit

- name: Security Check
  run: pnpm tsx scripts/agents/security/security-check.ts

- name: Performance Benchmark
  run: pnpm tsx scripts/agents/perf/benchmark.ts
```

## 📊 Monitoreo y Métricas

### Métricas Clave
- Tiempo de ejecución de agentes
- Éxito/fallo de ejecuciones
- Calidad de reportes generados
- Cobertura de auditorías

### Logs y Debugging
- Logs estructurados en formato JSON
- Niveles de log configurables
- Trazabilidad completa de ejecuciones

## 🔄 Mantenimiento

### Actualización de Agentes
1. Revisar tests antes de modificaciones
2. Actualizar documentación correspondiente
3. Probar en entorno de desarrollo
4. Validar con otros agentes dependientes

### Best Practices
- Mantener agentes independientes
- Documentar inputs y outputs
- Incluir manejo de errores robusto
- Usar logging estructurado
- Implementar tests comprehensivos

## 🆘 Troubleshooting

### Problemas Comunes
1. **Agente no ejecuta**: Verificar permisos y dependencias
2. **Outputs vacíos**: Revisar configuración y inputs
3. **Errores de timeout**: Ajustar timeouts en configuración
4. **Conflictos de dependencias**: Actualizar package.json

### Debugging
```bash
# Modo verbose
DEBUG=true pnpm tsx scripts/agents/[agent]/index.ts

# Logs detallados
tail -f logs/[agent]-log.json
```

---

**Mantenido por**: STRATO Core OS™ Team  
**Última actualización**: $(date)  
**Versión**: 1.0.0