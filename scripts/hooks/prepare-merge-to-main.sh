#!/bin/bash

# 🛡️ STRATO Prepare Merge to Main Script
# Este script se ejecuta antes de mergear cualquier branch a main

set -e

echo "🛡️ STRATO Prepare Merge to Main - Validación crítica..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Verificar que estamos en el branch correcto
print_status "Verificando branch actual..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "main" ]; then
    print_error "No se puede ejecutar este script directamente en main"
    exit 1
fi

print_success "Branch actual: $CURRENT_BRANCH"

# 2. Verificar que el branch está actualizado con main
print_status "Verificando que el branch está actualizado con main..."
git fetch origin
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_MAIN_COMMIT=$(git rev-parse origin/main)
BASE_COMMIT=$(git merge-base HEAD origin/main)

if [ "$LOCAL_COMMIT" = "$BASE_COMMIT" ]; then
    print_warning "El branch no está actualizado con main. Ejecutando rebase..."
    git rebase origin/main
fi

print_success "Branch actualizado con main"

# 3. Ejecutar validaciones estrictas
print_status "Ejecutando validaciones estrictas..."

# Linting
print_status "Ejecutando linting..."
if ! pnpm run lint:strict; then
    print_error "Linting falló"
    exit 1
fi

# Type checking
print_status "Ejecutando type checking..."
if ! pnpm run typecheck:strict; then
    print_error "Type checking falló"
    exit 1
fi

# Tests
print_status "Ejecutando tests..."
if ! pnpm run test:strict; then
    print_error "Tests fallaron"
    exit 1
fi

# Build
print_status "Verificando build..."
if ! pnpm run build:check; then
    print_error "Build falló"
    exit 1
fi

# 4. Verificar cobertura de tests
print_status "Verificando cobertura de tests..."
if ! pnpm run test:coverage:check; then
    print_warning "Cobertura de tests insuficiente"
    # No falla el script, solo warning
fi

# 5. Verificar que no hay secrets en el código
print_status "Verificando que no hay secrets en el código..."
if ! pnpm run security:check; then
    print_error "Se encontraron posibles secrets en el código"
    exit 1
fi

# 6. Verificar dependencias
print_status "Verificando dependencias..."
if ! pnpm run deps:check; then
    print_error "Problemas con dependencias detectados"
    exit 1
fi

print_success "✅ Todas las validaciones pasaron exitosamente"
print_success "🚀 El branch está listo para mergear a main"

echo ""
echo "📋 Checklist final:"
echo "  ✅ Branch actualizado con main"
echo "  ✅ Linting pasado"
echo "  ✅ Type checking pasado"
echo "  ✅ Tests pasando"
echo "  ✅ Build exitoso"
echo "  ✅ Sin secrets en el código"
echo "  ✅ Dependencias verificadas"
echo ""
echo "🎯 Puedes proceder con el merge a main" 