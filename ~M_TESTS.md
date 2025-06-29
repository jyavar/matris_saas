<!--
STRATO MODULE HEADER
{
  "module": "TESTS_AUDIT",
  "objective": "Gestionar la estrategia de testing, cobertura y calidad de código en backend y frontend",
  "paths": [
    "src/tests/",
    "src/tests/backend.coverage.extended.test.ts",
    "src/tests/auth.test.ts"
  ],
  "deps": ["vitest", "supertest", "playwright", "@testing-library/react"],
  "status": "10%",
  "pending": {
    "tests": ["Tests unitarios en todos los servicios", "Tests de integración", "Tests E2E"],
    "docs": ["Documentar estrategia y ejemplos de uso"]
  },
  "rules": {
    "no-any": true,
    "strict-types": true,
    "eslint": "on",
    "context-guard": "on"
  }
}
-->
# ~M_TESTS.md

**Dominio funcional:** Tests & Audit (apps/backend, apps/frontend)
**Incluye:** Estrategia de testing, cobertura, calidad de código, reporting, E2E

## 🧪 QA — Estado al 2025-06-28

### Archivos sin tests
- backend/src/services/stripe.service.ts
- frontend/src/components/auth/RegisterForm.tsx
- frontend/src/components/landing/LandingPage.tsx
- frontend/src/components/ProtectedRoute.tsx

### Cobertura E2E
- tests-e2e/ (pendiente de crear)
- Flujos críticos sin cobertura: login, campaigns, dashboard

### Prioridades SPRINT 1
- Crear tests unitarios para los archivos listados arriba
- Crear carpeta y primer test E2E
- Revisar mocks y coverage en tests existentes

### QA Coverage Score: 72/100 (estimado)

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| Tests & Audit      | ~M_TESTS.md          | src/tests/, src/tests/backend.coverage.extended.test.ts, src/tests/auth.test.ts, vitest, playwright, @testing-library/react |

---

## % de avance global (según checklist)
- Estructura modular: 🔲
- Cobertura ≥80%: 🔲
- Documentación viva: 🔲
- Reporting de coverage: 🔲
- Cumple cultura STRATO: 🔲

**Avance estimado:** ~10% (según el checklist actual)

---

## Contenido completo (con trazabilidad)

---

# ~M_TESTS.md

## 1. Propósito del módulo
Gestionar la estrategia de testing, cobertura y calidad de código en backend y frontend. Incluye unitarios, integración, E2E y reporting de coverage.

## 2. Archivos clave
- `src/tests/`
- `src/tests/backend.coverage.extended.test.ts`
- `src/tests/auth.test.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Unitarios          | 🔲     |
| Integración        | 🔲     |
| E2E                | 🔲     |
| Coverage           | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests unitarios en todos los servicios
- [ ] Tests de integración de endpoints
- [ ] Tests E2E con Playwright
- [ ] Mock de datos y fixtures
- [ ] Reporting de coverage

## 5. Integraciones
- Vitest, Playwright, Testing Library

## 6. Dependencias
- `vitest`, `supertest`, `playwright`, `@testing-library/react`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] Cobertura ≥80%
- [ ] Documentación viva
- [ ] Reporting de coverage
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar tests y reporting de coverage.
- Documentar estrategia y ejemplos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro.

- [x] billing.service.ts → billing.service.test.ts ✅ unit test real
- [x] logger.service.ts → logger.service.test.ts ✅ unit test real
- [x] resend.service.ts → resend.service.test.ts ✅ unit test real
- [x] openai.service.ts → openai.service.test.ts ✅ unit test real, 100% mockeable
- [x] runtime.service.ts → runtime.service.test.ts ✅ unit test real, 100% mockeable 