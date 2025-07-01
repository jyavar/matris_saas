---
Estado Técnico: Parcial
Deuda Técnica: Alta
Avance: 60%
Tests: Tests básicos, cobertura < 60%
Última actualización: 2025-06-30
Responsable: José + IA STRATO
Paths:
  - apps/backend/src/controllers/billing.controller.ts
  - apps/backend/src/services/billing.service.ts
  - apps/backend/src/routes/billing.routes.ts
  - apps/backend/src/services/stripe.service.ts
---

## Archivos clave
- apps/backend/src/controllers/billing.controller.ts
- apps/backend/src/services/billing.service.ts
- apps/backend/src/routes/billing.routes.ts
- apps/backend/src/services/stripe.service.ts
- apps/backend/src/services/__tests__/billing.service.test.ts
- apps/backend/src/services/__tests__/stripe.service.test.ts
- apps/backend/src/tests/billing.controller.test.ts

# ~M_BILLING.md

**Dominio funcional:** Billing (Stripe, pagos SaaS)
**Incluye:** Controllers, Services, Routes, Stripe Integration

---

## ESTADO ACTUAL
- Estructura Stripe lista, lógica de pagos pendiente
- Endpoints: `/billing/*`
- Tests: Básicos, falta cobertura completa
- Integración: Stripe, pendiente lógica avanzada

---

## CHECKLIST DE CALIDAD
- [x] Estructura modular
- [x] Endpoints REST
- [ ] Lógica de negocio completa
- [ ] Tests unitarios y de integración
- [ ] Cobertura ≥ 90%
- [ ] Validación robusta
- [ ] Documentación sincronizada

---

## PRÓXIMOS PASOS
1. Completar lógica de pagos y suscripciones
2. Aumentar cobertura de tests
3. Documentar endpoints y flujos 