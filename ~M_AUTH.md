<!-- STRATO MODULE HEADER
{
  "module": "AUTH",
  "description": "Módulo AUTH de STRATO",
  "paths": [
    "apps/frontend/src/services/auth.api.ts",
    "apps/frontend/src/contexts/AuthContext.tsx",
    "apps/backend/src/services/auth.service.ts",
    "apps/backend/src/middleware/auth.middleware.ts",
    "apps/backend/src/routes/auth.routes.ts",
    "apps/backend/src/controllers/utils.auth.ts",
    "apps/backend/src/controllers/types.auth.ts",
    "apps/backend/src/controllers/index.auth.ts",
    "apps/backend/src/controllers/auth.controller.ts",
    "apps/backend/dist/services/auth.service.js",
    "apps/backend/dist/routes/auth.routes.js",
    "apps/backend/dist/middleware/auth.middleware.js",
    "apps/backend/dist/controllers/utils.auth.js",
    "apps/backend/dist/controllers/types.auth.js",
    "apps/backend/dist/controllers/index.auth.js",
    "apps/backend/dist/controllers/auth.controller.js",
    "apps/frontend/src/components/ui/AuthForm.tsx",
    "apps/frontend/src/components/ui/AuthForm.stories.tsx",
    "apps/frontend/src/components/auth/ProtectedRoute.tsx",
    "apps/backend/dist/src/services/auth.service.js",
    "apps/backend/dist/src/middleware/auth.middleware.js",
    "apps/backend/dist/src/controllers/utils.auth.js",
    "apps/backend/dist/src/controllers/types.auth.js",
    "apps/backend/dist/src/controllers/index.auth.js",
    "apps/backend/dist/src/controllers/auth.controller.js",
    "apps/backend/dist/src/routes/auth.routes.js",
    "apps/frontend/src/app/api/auth/signup-tenant/route.ts",
    "apps/backend/dist/apps/backend/src/services/auth.service.js",
    "apps/backend/dist/apps/backend/src/routes/auth.routes.js",
    "apps/backend/dist/apps/backend/src/middleware/auth.middleware.js",
    "apps/backend/dist/apps/backend/src/controllers/auth.controller.js"
  ],
  "tests": [
    "apps/frontend/src/tests/AuthForm.test.tsx",
    "apps/backend/src/tests/auth.test.ts",
    "apps/backend/dist/tests/auth.test.js",
    "apps/frontend/src/components/auth/ProtectedRoute.test.tsx",
    "apps/backend/dist/src/tests/auth.test.js",
    "apps/backend/dist/apps/backend/src/tests/auth.test.js"
  ],
  "routes": [],
  "docs": [
    "apps/web/node_modules/class-variance-authority/README.md",
    "apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md",
    "apps/frontend/node_modules/class-variance-authority/README.md",
    "apps/backend/src/controllers/README.auth.md"
  ],
  "last_synced": "2025-07-01",
  "responsible": "José + IA STRATO",
  "coverage": 19,
  "status": "active",
  "criticality": "medium"
}
-->

---
Estado Técnico: Parcial
Deuda Técnica: Media
Avance: 70%
Tests: Unitarios, cobertura 70%
Última actualización: 2025-06-30
Responsable: José + IA STRATO
Paths:
  - apps/backend/src/controllers/auth.controller.ts
  - apps/backend/src/services/auth.service.ts
  - apps/backend/src/middleware/auth.middleware.ts
  - apps/frontend/src/contexts/AuthContext.tsx
  - apps/frontend/src/services/auth.api.ts
---

## Archivos clave
- apps/backend/src/controllers/auth.controller.ts
- apps/backend/src/services/auth.service.ts
- apps/backend/src/middleware/auth.middleware.ts
- apps/frontend/src/contexts/AuthContext.tsx
- apps/frontend/src/services/auth.api.ts
- apps/frontend/src/app/login/page.tsx
- apps/frontend/src/app/profile/page.tsx
- apps/frontend/src/app/api/auth/signup-tenant/route.ts
- apps/frontend/src/components/auth/ProtectedRoute.tsx
- apps/frontend/src/components/auth/ProtectedRoute.test.tsx
- apps/frontend/src/tests/AuthForm.test.tsx
- apps/frontend/src/tests/ProfileCard.test.tsx
- apps/frontend/src/tests/UserBadge.test.tsx

# ~M_AUTH.md

**Dominio funcional:** Autenticación y autorización
**Incluye:** Supabase Auth, JWT, Middleware, Contexto React

---

## ESTADO ACTUAL
- Supabase Auth operativo
- JWT y middleware en backend
- Contexto de autenticación en frontend
- Tests: Unitarios, falta integración E2E

---

## CHECKLIST DE CALIDAD
- [x] Endpoints protegidos
- [x] Middleware activo
- [x] Contexto React
- [ ] Tests E2E
- [ ] Documentación sincronizada
- [ ] Cobertura ≥ 90%

---

## PRÓXIMOS PASOS
1. Implementar tests E2E
2. Mejorar cobertura y documentación 






## 📁 ARCHIVOS CLAVE

### **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/tests/mocks/authMiddleware.mock.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/src/tests/mocks/authMiddleware.mock.ts` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## **Source Files**
- `apps/frontend/src/contexts/AuthContext.tsx` - Archivo fuente
- `apps/frontend/src/services/auth.api.ts` - Archivo fuente
- `apps/backend/src/middleware/auth.middleware.ts` - Archivo fuente
- `apps/backend/src/routes/auth.routes.ts` - Archivo fuente
- `apps/backend/src/services/auth.service.ts` - Archivo fuente
- `apps/backend/src/controllers/utils.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/types.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/index.auth.ts` - Archivo fuente
- `apps/backend/src/controllers/auth.controller.ts` - Archivo fuente
- `apps/backend/dist/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AuthForm.stories.tsx` - Archivo fuente
- `apps/frontend/src/components/auth/ProtectedRoute.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/utils.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/types.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/index.auth.js` - Archivo fuente
- `apps/backend/dist/src/controllers/auth.controller.js` - Archivo fuente
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts` - Archivo fuente
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/auth.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AuthForm.test.tsx` - Archivo de test
- `apps/backend/src/tests/auth.test.ts` - Archivo de test
- `apps/backend/dist/tests/auth.test.js` - Archivo de test
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/auth.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/auth.test.js` - Archivo de test

### **Config Files**
- `apps/web/node_modules/class-variance-authority/package.json` - Archivo de configuración
- `apps/frontend/node_modules/class-variance-authority/package.json` - Archivo de configuración

### **Doc Files**
- `apps/web/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md` - Archivo de documentación
- `apps/frontend/node_modules/class-variance-authority/README.md` - Archivo de documentación
- `apps/backend/src/controllers/README.auth.md` - Archivo de documentación## Source Files
- `apps/frontend/src/services/auth.api.ts`
- `apps/frontend/src/contexts/AuthContext.tsx`
- `apps/backend/src/services/auth.service.ts`
- `apps/backend/src/middleware/auth.middleware.ts`
- `apps/backend/src/routes/auth.routes.ts`
- `apps/backend/src/controllers/utils.auth.ts`
- `apps/backend/src/controllers/types.auth.ts`
- `apps/backend/src/controllers/index.auth.ts`
- `apps/backend/src/controllers/auth.controller.ts`
- `apps/backend/dist/services/auth.service.js`
- `apps/backend/dist/routes/auth.routes.js`
- `apps/backend/dist/middleware/auth.middleware.js`
- `apps/backend/dist/controllers/utils.auth.js`
- `apps/backend/dist/controllers/types.auth.js`
- `apps/backend/dist/controllers/index.auth.js`
- `apps/backend/dist/controllers/auth.controller.js`
- `apps/frontend/src/components/ui/AuthForm.tsx`
- `apps/frontend/src/components/ui/AuthForm.stories.tsx`
- `apps/frontend/src/components/auth/ProtectedRoute.tsx`
- `apps/backend/dist/src/services/auth.service.js`
- `apps/backend/dist/src/middleware/auth.middleware.js`
- `apps/backend/dist/src/controllers/utils.auth.js`
- `apps/backend/dist/src/controllers/types.auth.js`
- `apps/backend/dist/src/controllers/index.auth.js`
- `apps/backend/dist/src/controllers/auth.controller.js`
- `apps/backend/dist/src/routes/auth.routes.js`
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts`
- `apps/backend/dist/apps/backend/src/services/auth.service.js`
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js`
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js`
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js`

### Test Files
- `apps/frontend/src/tests/AuthForm.test.tsx`
- `apps/backend/src/tests/auth.test.ts`
- `apps/backend/dist/tests/auth.test.js`
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx`
- `apps/backend/dist/src/tests/auth.test.js`
- `apps/backend/dist/apps/backend/src/tests/auth.test.js`

### Config Files
- `apps/web/node_modules/class-variance-authority/package.json`
- `apps/frontend/node_modules/class-variance-authority/package.json`

### Doc Files
- `apps/web/node_modules/class-variance-authority/README.md`
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md`
- `apps/frontend/node_modules/class-variance-authority/README.md`
- `apps/backend/src/controllers/README.auth.md`

### Scripts

### Source Files
- `apps/frontend/src/services/auth.api.ts`
- `apps/frontend/src/contexts/AuthContext.tsx`
- `apps/backend/src/routes/auth.routes.ts`
- `apps/backend/src/middleware/auth.middleware.ts`
- `apps/backend/src/services/auth.service.ts`
- `apps/backend/src/controllers/utils.auth.ts`
- `apps/backend/src/controllers/types.auth.ts`
- `apps/backend/src/controllers/index.auth.ts`
- `apps/backend/src/controllers/auth.controller.ts`
- `apps/backend/dist/services/auth.service.js`
- `apps/backend/dist/middleware/auth.middleware.js`
- `apps/backend/dist/routes/auth.routes.js`
- `apps/backend/dist/controllers/utils.auth.js`
- `apps/backend/dist/controllers/types.auth.js`
- `apps/backend/dist/controllers/index.auth.js`
- `apps/backend/dist/controllers/auth.controller.js`
- `apps/frontend/src/components/ui/AuthForm.tsx`
- `apps/frontend/src/components/ui/AuthForm.stories.tsx`
- `apps/frontend/src/components/auth/ProtectedRoute.tsx`
- `apps/backend/dist/src/middleware/auth.middleware.js`
- `apps/backend/dist/src/services/auth.service.js`
- `apps/backend/dist/src/routes/auth.routes.js`
- `apps/backend/dist/src/controllers/utils.auth.js`
- `apps/backend/dist/src/controllers/types.auth.js`
- `apps/backend/dist/src/controllers/index.auth.js`
- `apps/backend/dist/src/controllers/auth.controller.js`
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts`
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js`
- `apps/backend/dist/apps/backend/src/services/auth.service.js`
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js`
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js`

### Test Files
- `apps/frontend/src/tests/AuthForm.test.tsx`
- `apps/backend/src/tests/auth.test.ts`
- `apps/backend/dist/tests/auth.test.js`
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx`
- `apps/backend/dist/src/tests/auth.test.js`
- `apps/backend/dist/apps/backend/src/tests/auth.test.js`

### Config Files
- `apps/web/node_modules/class-variance-authority/package.json`
- `apps/frontend/node_modules/class-variance-authority/package.json`

### Doc Files
- `apps/web/node_modules/class-variance-authority/README.md`
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md`
- `apps/frontend/node_modules/class-variance-authority/README.md`
- `apps/backend/src/controllers/README.auth.md`

### Scripts

### Source Files
- `apps/frontend/src/services/auth.api.ts`
- `apps/frontend/src/contexts/AuthContext.tsx`
- `apps/backend/src/services/auth.service.ts`
- `apps/backend/src/routes/auth.routes.ts`
- `apps/backend/src/middleware/auth.middleware.ts`
- `apps/backend/src/controllers/utils.auth.ts`
- `apps/backend/src/controllers/types.auth.ts`
- `apps/backend/src/controllers/index.auth.ts`
- `apps/backend/src/controllers/auth.controller.ts`
- `apps/backend/dist/services/auth.service.js`
- `apps/backend/dist/routes/auth.routes.js`
- `apps/backend/dist/middleware/auth.middleware.js`
- `apps/backend/dist/controllers/utils.auth.js`
- `apps/backend/dist/controllers/types.auth.js`
- `apps/backend/dist/controllers/index.auth.js`
- `apps/backend/dist/controllers/auth.controller.js`
- `apps/frontend/src/components/ui/AuthForm.tsx`
- `apps/frontend/src/components/ui/AuthForm.stories.tsx`
- `apps/frontend/src/components/auth/ProtectedRoute.tsx`
- `apps/backend/dist/src/services/auth.service.js`
- `apps/backend/dist/src/routes/auth.routes.js`
- `apps/backend/dist/src/middleware/auth.middleware.js`
- `apps/backend/dist/src/controllers/utils.auth.js`
- `apps/backend/dist/src/controllers/types.auth.js`
- `apps/backend/dist/src/controllers/index.auth.js`
- `apps/backend/dist/src/controllers/auth.controller.js`
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts`
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js`
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js`
- `apps/backend/dist/apps/backend/src/services/auth.service.js`
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js`

### Test Files
- `apps/frontend/src/tests/AuthForm.test.tsx`
- `apps/backend/src/tests/auth.test.ts`
- `apps/backend/dist/tests/auth.test.js`
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx`
- `apps/backend/dist/src/tests/auth.test.js`
- `apps/backend/dist/apps/backend/src/tests/auth.test.js`

### Config Files
- `apps/web/node_modules/class-variance-authority/package.json`
- `apps/frontend/node_modules/class-variance-authority/package.json`

### Doc Files
- `apps/web/node_modules/class-variance-authority/README.md`
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md`
- `apps/frontend/node_modules/class-variance-authority/README.md`
- `apps/backend/src/controllers/README.auth.md`

### Scripts

### Source Files
- `apps/frontend/src/services/auth.api.ts`
- `apps/frontend/src/contexts/AuthContext.tsx`
- `apps/backend/src/services/auth.service.ts`
- `apps/backend/src/routes/auth.routes.ts`
- `apps/backend/src/middleware/auth.middleware.ts`
- `apps/backend/src/controllers/utils.auth.ts`
- `apps/backend/src/controllers/types.auth.ts`
- `apps/backend/src/controllers/index.auth.ts`
- `apps/backend/src/controllers/auth.controller.ts`
- `apps/backend/dist/services/auth.service.js`
- `apps/backend/dist/routes/auth.routes.js`
- `apps/backend/dist/middleware/auth.middleware.js`
- `apps/backend/dist/controllers/utils.auth.js`
- `apps/backend/dist/controllers/types.auth.js`
- `apps/backend/dist/controllers/index.auth.js`
- `apps/backend/dist/controllers/auth.controller.js`
- `apps/frontend/src/components/ui/AuthForm.tsx`
- `apps/frontend/src/components/ui/AuthForm.stories.tsx`
- `apps/frontend/src/components/auth/ProtectedRoute.tsx`
- `apps/backend/dist/src/services/auth.service.js`
- `apps/backend/dist/src/middleware/auth.middleware.js`
- `apps/backend/dist/src/routes/auth.routes.js`
- `apps/backend/dist/src/controllers/utils.auth.js`
- `apps/backend/dist/src/controllers/types.auth.js`
- `apps/backend/dist/src/controllers/index.auth.js`
- `apps/backend/dist/src/controllers/auth.controller.js`
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts`
- `apps/backend/dist/apps/backend/src/services/auth.service.js`
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js`
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js`
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js`

### Test Files
- `apps/frontend/src/tests/AuthForm.test.tsx`
- `apps/backend/src/tests/auth.test.ts`
- `apps/backend/dist/tests/auth.test.js`
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx`
- `apps/backend/dist/src/tests/auth.test.js`
- `apps/backend/dist/apps/backend/src/tests/auth.test.js`

### Config Files
- `apps/web/node_modules/class-variance-authority/package.json`
- `apps/frontend/node_modules/class-variance-authority/package.json`

### Doc Files
- `apps/web/node_modules/class-variance-authority/README.md`
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md`
- `apps/frontend/node_modules/class-variance-authority/README.md`
- `apps/backend/src/controllers/README.auth.md`

### Scripts

### Source Files
- `apps/frontend/src/services/auth.api.ts`
- `apps/frontend/src/contexts/AuthContext.tsx`
- `apps/backend/src/services/auth.service.ts`
- `apps/backend/src/routes/auth.routes.ts`
- `apps/backend/src/middleware/auth.middleware.ts`
- `apps/backend/src/controllers/utils.auth.ts`
- `apps/backend/src/controllers/types.auth.ts`
- `apps/backend/src/controllers/index.auth.ts`
- `apps/backend/src/controllers/auth.controller.ts`
- `apps/backend/dist/services/auth.service.js`
- `apps/backend/dist/middleware/auth.middleware.js`
- `apps/backend/dist/routes/auth.routes.js`
- `apps/backend/dist/controllers/utils.auth.js`
- `apps/backend/dist/controllers/types.auth.js`
- `apps/backend/dist/controllers/index.auth.js`
- `apps/backend/dist/controllers/auth.controller.js`
- `apps/frontend/src/components/ui/AuthForm.tsx`
- `apps/frontend/src/components/ui/AuthForm.stories.tsx`
- `apps/frontend/src/components/auth/ProtectedRoute.tsx`
- `apps/backend/dist/src/services/auth.service.js`
- `apps/backend/dist/src/middleware/auth.middleware.js`
- `apps/backend/dist/src/controllers/utils.auth.js`
- `apps/backend/dist/src/controllers/types.auth.js`
- `apps/backend/dist/src/controllers/index.auth.js`
- `apps/backend/dist/src/controllers/auth.controller.js`
- `apps/backend/dist/src/routes/auth.routes.js`
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts`
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js`
- `apps/backend/dist/apps/backend/src/services/auth.service.js`
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js`
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js`

### Test Files
- `apps/frontend/src/tests/AuthForm.test.tsx`
- `apps/backend/src/tests/auth.test.ts`
- `apps/backend/dist/tests/auth.test.js`
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx`
- `apps/backend/dist/src/tests/auth.test.js`
- `apps/backend/dist/apps/backend/src/tests/auth.test.js`

### Config Files
- `apps/web/node_modules/class-variance-authority/package.json`
- `apps/frontend/node_modules/class-variance-authority/package.json`

### Doc Files
- `apps/web/node_modules/class-variance-authority/README.md`
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md`
- `apps/frontend/node_modules/class-variance-authority/README.md`
- `apps/backend/src/controllers/README.auth.md`

### Scripts

### Source Files
- `apps/frontend/src/services/auth.api.ts`
- `apps/frontend/src/contexts/AuthContext.tsx`
- `apps/backend/src/services/auth.service.ts`
- `apps/backend/src/routes/auth.routes.ts`
- `apps/backend/src/middleware/auth.middleware.ts`
- `apps/backend/src/controllers/utils.auth.ts`
- `apps/backend/src/controllers/types.auth.ts`
- `apps/backend/src/controllers/index.auth.ts`
- `apps/backend/src/controllers/auth.controller.ts`
- `apps/backend/dist/services/auth.service.js`
- `apps/backend/dist/middleware/auth.middleware.js`
- `apps/backend/dist/routes/auth.routes.js`
- `apps/backend/dist/controllers/utils.auth.js`
- `apps/backend/dist/controllers/types.auth.js`
- `apps/backend/dist/controllers/index.auth.js`
- `apps/backend/dist/controllers/auth.controller.js`
- `apps/frontend/src/components/auth/ProtectedRoute.tsx`
- `apps/frontend/src/components/ui/AuthForm.tsx`
- `apps/frontend/src/components/ui/AuthForm.stories.tsx`
- `apps/backend/dist/src/middleware/auth.middleware.js`
- `apps/backend/dist/src/services/auth.service.js`
- `apps/backend/dist/src/routes/auth.routes.js`
- `apps/backend/dist/src/controllers/utils.auth.js`
- `apps/backend/dist/src/controllers/types.auth.js`
- `apps/backend/dist/src/controllers/index.auth.js`
- `apps/backend/dist/src/controllers/auth.controller.js`
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts`
- `apps/backend/dist/apps/backend/src/services/auth.service.js`
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js`
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js`
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js`

### Test Files
- `apps/frontend/src/tests/AuthForm.test.tsx`
- `apps/backend/src/tests/auth.test.ts`
- `apps/backend/dist/tests/auth.test.js`
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx`
- `apps/backend/dist/src/tests/auth.test.js`
- `apps/backend/dist/apps/backend/src/tests/auth.test.js`

### Config Files
- `apps/web/node_modules/class-variance-authority/package.json`
- `apps/frontend/node_modules/class-variance-authority/package.json`

### Doc Files
- `apps/web/node_modules/class-variance-authority/README.md`
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md`
- `apps/frontend/node_modules/class-variance-authority/README.md`
- `apps/backend/src/controllers/README.auth.md`

### Scripts

### Source Files
- `apps/frontend/src/services/auth.api.ts`
- `apps/frontend/src/contexts/AuthContext.tsx`
- `apps/backend/src/services/auth.service.ts`
- `apps/backend/src/routes/auth.routes.ts`
- `apps/backend/src/middleware/auth.middleware.ts`
- `apps/backend/src/controllers/utils.auth.ts`
- `apps/backend/src/controllers/types.auth.ts`
- `apps/backend/src/controllers/index.auth.ts`
- `apps/backend/src/controllers/auth.controller.ts`
- `apps/backend/dist/services/auth.service.js`
- `apps/backend/dist/routes/auth.routes.js`
- `apps/backend/dist/controllers/utils.auth.js`
- `apps/backend/dist/controllers/types.auth.js`
- `apps/backend/dist/controllers/index.auth.js`
- `apps/backend/dist/controllers/auth.controller.js`
- `apps/backend/dist/middleware/auth.middleware.js`
- `apps/frontend/src/components/ui/AuthForm.tsx`
- `apps/frontend/src/components/ui/AuthForm.stories.tsx`
- `apps/frontend/src/components/auth/ProtectedRoute.tsx`
- `apps/backend/dist/src/middleware/auth.middleware.js`
- `apps/backend/dist/src/routes/auth.routes.js`
- `apps/backend/dist/src/services/auth.service.js`
- `apps/backend/dist/src/controllers/utils.auth.js`
- `apps/backend/dist/src/controllers/types.auth.js`
- `apps/backend/dist/src/controllers/index.auth.js`
- `apps/backend/dist/src/controllers/auth.controller.js`
- `apps/frontend/src/app/api/auth/signup-tenant/route.ts`
- `apps/backend/dist/apps/backend/src/middleware/auth.middleware.js`
- `apps/backend/dist/apps/backend/src/services/auth.service.js`
- `apps/backend/dist/apps/backend/src/controllers/auth.controller.js`
- `apps/backend/dist/apps/backend/src/routes/auth.routes.js`

### Test Files
- `apps/frontend/src/tests/AuthForm.test.tsx`
- `apps/backend/src/tests/auth.test.ts`
- `apps/backend/dist/tests/auth.test.js`
- `apps/frontend/src/components/auth/ProtectedRoute.test.tsx`
- `apps/backend/dist/src/tests/auth.test.js`
- `apps/backend/dist/apps/backend/src/tests/auth.test.js`

### Config Files
- `apps/web/node_modules/class-variance-authority/package.json`
- `apps/frontend/node_modules/class-variance-authority/package.json`

### Doc Files
- `apps/web/node_modules/class-variance-authority/README.md`
- `apps/frontend/test-results/tests-e2e-ui-AuthForm-login-exitoso-y-acceso-a-profile/error-context.md`
- `apps/frontend/node_modules/class-variance-authority/README.md`
- `apps/backend/src/controllers/README.auth.md`

### Scripts

