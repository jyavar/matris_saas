# 🚀 STRATO Git Hooks

Este directorio contiene los hooks de Git configurados con Husky para mantener la calidad del código en STRATO.

## 📋 Hooks Configurados

### 🔍 Pre-commit Hook
**Archivo**: `.husky/pre-commit`

**Propósito**: Validaciones rápidas antes de cada commit

**Validaciones incluidas**:
- 📦 Sincronización de módulos
- 🔍 Linting y formato automático (lint-staged)
- 🔧 Validaciones personalizadas (TypeScript, tests unitarios, React imports)
- 👁️ Context watchdog

**Tiempo estimado**: 10-30 segundos

### 🚀 Pre-push Hook
**Archivo**: `.husky/pre-push`

**Propósito**: Validaciones completas antes de hacer push

**Validaciones incluidas**:
- 🏗️ Build completo de todas las apps
- 🧪 Tests con cobertura
- 🔧 Type checking completo
- 🔍 Lint completo

**Tiempo estimado**: 2-5 minutos

### 📝 Commit-msg Hook
**Archivo**: `.husky/commit-msg`

**Propósito**: Validación del formato de mensajes de commit

**Validaciones incluidas**:
- ✅ Formato convencional de commits
- 📋 Reglas de commitlint

## 🛠️ Configuración

### Instalación
Los hooks se instalan automáticamente al ejecutar:
```bash
pnpm install
```

### Deshabilitación temporal
Para deshabilitar temporalmente un hook:
```bash
git commit --no-verify  # Salta pre-commit
git push --no-verify    # Salta pre-push
```

### Reinstalación
Para reinstalar los hooks:
```bash
pnpm run prepare
```

## 📊 Scripts de Validación

### Pre-commit Validation
**Archivo**: `scripts/pre-commit-validation.ts`

**Funciones**:
- ✅ TypeScript Check
- ✅ Lint Check  
- ✅ Unit Tests
- ✅ React Imports Check

### Lint-staged Configuration
**Archivo**: `package.json` → `lint-staged`

**Configuración**:
```json
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ],
  "*.{ts,tsx}": [
    "tsc --noEmit"
  ]
}
```

## 🎯 Beneficios

### ✅ Calidad Automática
- Código consistente en todo el equipo
- Detección temprana de errores
- Formato uniforme

### 🚫 Prevención de Deuda Técnica
- No se pueden committear errores de linting
- Tests obligatorios antes de push
- Type checking automático

### ⚡ Desarrollo Eficiente
- Feedback inmediato
- Validaciones rápidas en pre-commit
- Validaciones completas en pre-push

## 🔧 Troubleshooting

### Hook no se ejecuta
```bash
# Verificar permisos
chmod +x .husky/pre-commit
chmod +x .husky/pre-push

# Reinstalar hooks
pnpm run prepare
```

### Validación falla
```bash
# Ejecutar validaciones manualmente
pnpm lint
pnpm typecheck
pnpm test:unit
```

### Performance lenta
- Los hooks están optimizados para velocidad
- Pre-commit: solo archivos modificados
- Pre-push: validaciones completas

## 📚 Recursos

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [commitlint Documentation](https://commitlint.js.org/) 