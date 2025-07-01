---
Estado Técnico: Faltante
Deuda Técnica: 100
Avance: 0%
---
<!--
STRATO MODULE HEADER
{
  "module": "PRICING_BILLING",
  "objective": "Gestionar planes de precios, suscripciones, facturación y pagos con Stripe",
  "paths": [
    "apps/backend/src/services/billing.service.ts",
    "apps/backend/src/controllers/billing.controller.ts",
    "apps/backend/src/routes/billing.routes.ts"
  ],
  "deps": ["stripe", "supabase"],
  "status": "100%",
  "pending": {
    "services": [],
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

## Archivos clave
- apps/backend/src/services/billing.service.ts
- apps/backend/src/services/stripe.service.ts
- apps/backend/src/controllers/billing.controller.ts
- apps/backend/src/routes/billing.routes.ts
- apps/backend/src/tests/billing.test.ts
- apps/backend/src/services/__tests__/billing.service.test.ts
- apps/backend/src/services/__tests__/stripe.service.test.ts
- src/services/billing.service.ts
- src/services/stripe.service.ts
- src/controllers/billing.controller.ts
- src/routes/billing.routes.ts
- src/tests/billing.controller.test.ts

# ~M_PRICING.md

## 1. Propósito del módulo
Gestionar la lógica de planes, precios y simulación de upgrades/downgrades para el SaaS.

## 2. Archivos clave
- `src/services/pricing.service.ts`
- `src/routes/pricing.routes.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | 🔲     |
| Routes             | 🔲     |
| Types              | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests unitarios y de endpoints
- [ ] Mock de simulación de precios
- [ ] Cobertura ≥80%

## 5. Integraciones
- Stripe
- Base de datos

## 6. Dependencias
- `stripe`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] Endpoints REST claros
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Implementar endpoints y lógica de pricing.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 