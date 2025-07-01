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