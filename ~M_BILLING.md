# ~M_BILLING.md

## 1. Propósito del módulo
Implementa la lógica de pagos y suscripciones SaaS usando Stripe. Gestiona la creación de clientes, sesiones de pago, webhooks y el estado de la suscripción, siguiendo la plantilla elite STRATO.

## 2. Archivos clave
- `src/services/billing.service.ts`
- `src/controllers/billing.controller.ts`
- `src/routes/billing.routes.ts`
- `src/services/stripe.service.ts`
- `src/tests/billing.controller.test.ts` (pendiente de cobertura total)

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ✅     |
| Controller         | ✅     |
| Routes             | ✅     |
| Stripe Integration | ✅     |
| Webhooks           | ✅     |
| DB Simulada        | ✅     |
| Validación Zod     | ✅     |
| Tests              | 🟡     |
| Documentación      | ✅     |

## 4. Tests presentes / pendientes
- [x] Estructura de tests creada
- [ ] Tests unitarios de servicios y controladores
- [ ] Mock de Stripe SDK
- [ ] Simulación de webhooks
- [ ] Cobertura ≥80%

## 5. Integraciones
- Stripe (API, webhooks, checkout)
- Simulación de DB en memoria

## 6. Dependencias
- `stripe`
- `zod`
- Variables de entorno: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

## 7. Workarounds
- Persistencia simulada en memoria para clientes y suscripciones (reemplazar por DB real en producción).
- Validación de usuario dummy si no hay autenticación real.

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [x] Validación robusta de inputs
- [x] Seguridad en webhooks
- [x] Documentación viva
- [x] Integración Stripe
- [ ] Tests completos y cobertura
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Implementar y cubrir con tests unitarios e integración todos los flujos críticos (checkout, webhooks, status).
- Reemplazar la simulación de DB por persistencia real.
- Validar el módulo con casos reales y dejarlo en `✅ READY` en el checklist maestro. 