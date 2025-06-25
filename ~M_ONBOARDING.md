# ~M_ONBOARDING.md

## 1. Propósito del módulo
Gestionar los flujos de alta de usuario, bienvenida y activación inicial para nuevos clientes y usuarios del SaaS.

## 2. Archivos clave
- `src/services/onboarding.service.ts`
- `src/routes/onboarding.routes.ts`

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
- [ ] Mock de flujos de onboarding
- [ ] Cobertura ≥80%

## 5. Integraciones
- Base de datos
- Emails (Resend)

## 6. Dependencias
- `zod`, `resend`

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
- Implementar endpoints y lógica de onboarding.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 