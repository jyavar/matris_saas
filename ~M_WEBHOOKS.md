# ~M_WEBHOOKS.md

## 1. Propósito del módulo
Gestionar la recepción, validación y procesamiento de webhooks externos (Stripe, Resend, etc.) para eventos críticos del SaaS.

## 2. Archivos clave
- `src/routes/webhooks.routes.ts`
- `src/services/webhooks.service.ts`

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
- [ ] Mock de eventos y payloads
- [ ] Cobertura ≥80%

## 5. Integraciones
- Stripe, Resend, otros proveedores

## 6. Dependencias
- `stripe`, `resend`

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
- Implementar endpoints y lógica de webhooks.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 