# 🛡️ STRATO Main Branch Protection System

## 🎯 Objetivo

Blindar completamente el branch `main` en el repositorio STRATO™. Los cambios solo se pueden mergear si pasan validaciones técnicas estrictas: lint, typecheck, tests, y mensaje de commit válido.

## 🏗️ Arquitectura del Sistema

```
.husky/
├── pre-commit      # Validación antes de commit
├── commit-msg      # Validación del mensaje de commit
└── pre-push        # Validación antes de push

scripts/hooks/
└── prepare-merge-to-main.sh  # Script para preparar merge a main

commitlint.config.js          # Configuración de conventional commits
```

## 🔧 Hooks de Git

### 1. Pre-commit Hook (`.husky/pre-commit`)
- **Propósito**: Validar calidad del código antes de cada commit
- **Comando**: `pnpm run strato:guard`
- **Validaciones**:
  - Linting (ESLint)
  - Type checking (TypeScript)
  - Tests unitarios

### 2. Commit-msg Hook (`.husky/commit-msg`)
- **Propósito**: Validar formato de mensajes de commit
- **Comando**: `npx commitlint --edit $1`
- **Validaciones**:
  - Formato conventional commits
  - Tipos válidos de commit
  - Longitud y formato del mensaje

### 3. Pre-push Hook (`.husky/pre-push`)
- **Propósito**: Validación final antes de subir cambios
- **Comando**: `pnpm run strato:guard:strict`
- **Validaciones**:
  - Linting estricto
  - Type checking estricto
  - Tests estrictos
  - Verificación de build

## 📋 Scripts Disponibles

### Scripts de Guardia
```bash
# Validación básica (pre-commit)
pnpm run strato:guard

# Validación estricta (pre-push)
pnpm run strato:guard:strict

# Preparación para merge a main
pnpm run merge:prepare
```

### Scripts de Validación
```bash
# Linting
pnpm run lint              # Básico
pnpm run lint:strict       # Estricto

# Type checking
pnpm run typecheck         # Básico
pnpm run typecheck:strict  # Estricto

# Tests
pnpm run test              # Básico
pnpm run test:strict       # Estricto
pnpm run test:coverage     # Con cobertura
pnpm run test:coverage:check # Verificar cobertura mínima

# Build
pnpm run build:check       # Verificar build sin generar archivos

# Seguridad
pnpm run security:check    # Detectar secrets en el código
pnpm run deps:check        # Verificar dependencias
```

## 🚀 Flujo de Trabajo

### 1. Desarrollo Normal
```bash
# Hacer cambios en tu branch
git add .
git commit -m "feat: add new feature"  # Pre-commit hook se ejecuta automáticamente
git push origin your-branch            # Pre-push hook se ejecuta automáticamente
```

### 2. Merge a Main
```bash
# 1. Preparar el merge
pnpm run merge:prepare

# 2. Crear Pull Request
# 3. CI/CD ejecuta validaciones adicionales
# 4. Merge solo si todas las validaciones pasan
```

## 📝 Convenciones de Commits

### Tipos Válidos
- `feat`: Nuevas características
- `fix`: Correcciones de bugs
- `docs`: Cambios en documentación
- `style`: Cambios de estilo (formato, etc.)
- `refactor`: Refactorización de código
- `perf`: Mejoras de rendimiento
- `test`: Agregar o actualizar tests
- `chore`: Tareas de mantenimiento
- `ci`: Cambios en CI/CD
- `build`: Cambios en sistema de build
- `revert`: Revertir commits anteriores
- `security`: Correcciones de seguridad
- `legal`: Cambios legales/compliance
- `strato`: Cambios específicos de STRATO

### Formato
```
type(scope): description

[optional body]

[optional footer]
```

### Ejemplos
```bash
# ✅ Correcto
git commit -m "feat(auth): add OAuth2 authentication"
git commit -m "fix(api): resolve user creation endpoint"
git commit -m "docs(readme): update installation instructions"

# ❌ Incorrecto
git commit -m "added new feature"
git commit -m "fix bug"
git commit -m "update stuff"
```

## 🛡️ Validaciones de Seguridad

### Security Check
El script `security:check` detecta:
- API keys hardcodeadas
- Secrets en el código
- Passwords en texto plano
- Connection strings
- Tokens de autenticación
- URLs de base de datos

### Dependencies Check
El script `deps:check` verifica:
- Vulnerabilidades conocidas
- Dependencias desactualizadas
- Licencias compatibles

## 🔍 Troubleshooting

### Error: "Husky hooks not found"
```bash
# Reinstalar husky
pnpm run prepare
```

### Error: "Commitlint not found"
```bash
# Instalar dependencias
pnpm install
```

### Error: "Permission denied"
```bash
# Hacer hooks ejecutables
chmod +x .husky/*
```

### Bypass Temporal (NO RECOMENDADO)
```bash
# Solo para casos de emergencia
git commit --no-verify -m "emergency fix"
```

## 📊 Métricas de Calidad

### Cobertura Mínima
- **Líneas**: 90%
- **Branches**: 90%
- **Functions**: 90%
- **Statements**: 90%

### Performance
- **Build time**: < 5 minutos
- **Test time**: < 3 minutos
- **Lint time**: < 1 minuto

## 🚨 Alertas y Notificaciones

### Slack Integration
Los fallos en validaciones se notifican automáticamente a:
- `#strato-dev` - Equipo de desarrollo
- `#strato-alerts` - Alertas críticas

### Email Notifications
- Fallos en main branch
- Vulnerabilidades de seguridad
- Dependencias críticas desactualizadas

## 📚 Recursos Adicionales

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [STRATO Development Guidelines](./DEVELOPMENT.md)

## 🤝 Contribución

Para contribuir al sistema de protección:

1. Crear issue con la propuesta
2. Implementar cambios en branch separado
3. Ejecutar `pnpm run merge:prepare`
4. Crear Pull Request
5. Esperar revisión y aprobación

---

**⚠️ IMPORTANTE**: Este sistema está diseñado para proteger la calidad del código. No intentes bypassear las validaciones sin justificación técnica válida. 