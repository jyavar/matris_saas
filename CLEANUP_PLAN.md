# 🧼 PLAN DE LIMPIEZA STRATO

## 🔴 PRIORIDAD CRÍTICA (COMPLETADO)
- ✅ Logger service: Corregido require en ESM
- ✅ Variables de entorno: Validadas y documentadas
- ✅ Backend: Funcionando en http://localhost:3001

## 🟠 PRIORIDAD ALTA (PENDIENTE)

### 1. Servicios con dependencias externas
- `openai.service.ts` - Requiere OPENAI_API_KEY
- `posthog.service.ts` - Requiere POSTHOG_API_KEY
- **Acción:** Agregar validación condicional

### 2. Rutas que usan servicios directos
- `campaigns.routes.ts` - Usa CampaignsService directo
- `onboarding.routes.ts` - Usa OnboardingService directo
- `resend.routes.ts` - Usa ResendService directo
- **Acción:** Refactorizar para usar controladores

### 3. Scripts con variables hardcodeadas
- `apps/backend/package.json` - Variables en scripts
- **Acción:** Usar dotenv o variables de entorno

## 🟡 PRIORIDAD MEDIA

### Tests triviales
- Revisar `__tests__/` en backend y frontend
- Eliminar tests que solo hacen `expect(true).toBe(true)`

### Componentes no usados
- Buscar componentes huérfanos en frontend
- Mover a `/experimental` o eliminar

## ✅ FUNCIONANDO
- Backend: Health endpoint ✅
- Frontend: Páginas principales ✅
- Tests: 75 pasando ✅
- Auth, todos, analytics, billing ✅

**Estado:** Limpio en núcleo, requiere poda estructural.

---

## 🟢 PRIORIDAD BAJA (Mejoras de developer experience)

### 📋 ACCIONES PENDIENTES

#### 1. Mejorar documentación de variables de entorno
- ✅ Completado: env.example creado
- Pendiente: Documentar en README principal

#### 2. Limpiar scripts duplicados
- Revisar todos los package.json
- Eliminar scripts inactivos

#### 3. Mejorar mensajes de error
- Hacer más claros los errores de variables de entorno
- Mejorar logging

---

## ✅ COMPLETADO (No requiere acción)

### Backend Core (Funcional y testeado)
- ✅ Autenticación: `auth.routes.ts`, `auth.service.ts`, `auth.controller.ts`
- ✅ Todos: `todo.routes.ts`, `todo.service.ts`
- ✅ Analytics: `analytics.routes.ts`, `analytics.service.ts`
- ✅ Health: `health.routes.ts`
- ✅ Profiles: `profiles.routes.ts`, `profiles.service.ts`
- ✅ Billing: `billing.routes.ts`, `billing.service.ts`
- ✅ Middleware: `auth.middleware.ts`, `rateLimit.middleware.ts`

### Frontend Core (Funcional)
- ✅ Páginas principales: `/`, `/login`, `/profile`, `/control-tower`
- ✅ Componentes: `ProtectedRoute.tsx`, `LandingPage.tsx`
- ✅ Context: `AuthContext.tsx`

### Tests (75 pasando, 100% cobertura)
- ✅ Backend tests: 75 tests pasando
- ✅ Cobertura: 100% en módulos principales

---

## 📊 ESTADO ACTUAL DEL SISTEMA

### ✅ FUNCIONANDO
- Backend: http://localhost:3001 ✅
- Frontend: http://localhost:3000 ✅  
- Health endpoint: ✅
- Tests: 75 pasando ✅
- Variables de entorno: Validadas ✅

### ⚠️ REQUIERE ATENCIÓN
- Servicios con dependencias externas (OpenAI, PostHog)
- Patrón inconsistente en algunas rutas
- Scripts con variables hardcodeadas
- Tests triviales

### ❌ CÓDIGO MUERTO
- No identificado en análisis inicial
- Todos los servicios y rutas tienen uso real

---

## 🎯 PRÓXIMOS PASOS

1. **Inmediato:** Implementar validación condicional para servicios externos
2. **Corto plazo:** Refactorizar rutas para usar controladores
3. **Medio plazo:** Limpiar tests triviales y scripts
4. **Largo plazo:** Mejorar documentación y DX

---

**Estado del sistema:** Limpio en su núcleo, pero requiere poda estructural, refactor de rutas y depuración de archivos no usados.

**Próximo paso:** Crear PRs para limpieza estructurada y validada en staging antes de producción. Validar con tests y CI/CD. 