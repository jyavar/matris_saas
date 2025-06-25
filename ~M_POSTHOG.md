# ~M_POSTHOG.md

## 1. Propósito del módulo
Integrar tracking técnico y de producto usando PostHog para analítica avanzada y auditoría de eventos.

## 2. Archivos clave
- `src/services/posthog.service.ts`
- `src/routes/posthog.routes.ts`

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
- [ ] Mock de eventos y tracking
- [ ] Cobertura ≥80%

## 5. Integraciones
- PostHog API

## 6. Dependencias
- `posthog-node`
- Variables de entorno: `POSTHOG_API_KEY`

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
- Implementar endpoints y lógica de tracking.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 