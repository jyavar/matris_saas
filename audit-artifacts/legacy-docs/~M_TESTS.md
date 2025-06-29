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
  "status": "100%",
  "pending": {
    "tests": [],
    "docs": []
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

## 🧪 QA — Estado al 2025-06-29

### Archivos sin tests
- Todos los archivos críticos cuentan con tests unitarios y de integración.

### Cobertura E2E
- tests-e2e/: Flujos críticos cubiertos (login, campaigns, dashboard, etc.)

### Prioridades SPRINT 1
- ✅ Tests unitarios y de integración completos
- ✅ Carpeta y tests E2E implementados
- ✅ Mocks y coverage revisados y activos

### QA Coverage Score: 100/100

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| Tests & Audit      | ~M_TESTS.md          | src/tests/, src/tests/backend.coverage.extended.test.ts, src/tests/auth.test.ts, vitest, playwright, @testing-library/react |

---

## % de avance global (según checklist)
- Estructura modular: ☑️
- Cobertura ≥80%: ☑️
- Documentación viva: ☑️
- Reporting de coverage: ☑️
- Cumple cultura STRATO: ☑️

**Avance estimado:** 100% (según el checklist actual)

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
| Unitarios          | ☑️     |
| Integración        | ☑️     |
| E2E                | ☑️     |
| Coverage           | ☑️     |
| Documentación      | ☑️     |

## 4. Tests presentes / pendientes
- [x] Tests unitarios en todos los servicios
- [x] Tests de integración de endpoints
- [x] Tests E2E con Playwright
- [x] Mock de datos y fixtures
- [x] Reporting de coverage

## 5. Integraciones
- Vitest, Playwright, Testing Library

## 6. Dependencias
- `vitest`, `supertest`, `playwright`, `@testing-library/react`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-29
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Cobertura ≥80%
- [x] Documentación viva
- [x] Reporting de coverage
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Mantener cobertura y calidad en cada nuevo módulo.
- Actualizar documentación y reporting de manera continua.
- Sincronizar estado en tablero de módulos y checklist maestro.

- [x] billing.service.ts → billing.service.test.ts ✅ unit test real
- [x] logger.service.ts → logger.service.test.ts ✅ unit test real
- [x] resend.service.ts → resend.service.test.ts ✅ unit test real
- [x] openai.service.ts → openai.service.test.ts ✅ unit test real, 100% mockeable
- [x] runtime.service.ts → runtime.service.test.ts ✅ unit test real, 100% mockeable 