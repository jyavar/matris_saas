# ~M_RESEND.md

## 1. Propósito del módulo
Gestionar el envío de emails transaccionales, onboarding y notificaciones técnicas usando Resend.

## 2. Archivos clave
- `src/services/resend.service.ts`
- `src/routes/resend.routes.ts`

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
- [ ] Mock de emails y respuestas
- [ ] Cobertura ≥80%

## 5. Integraciones
- Resend API

## 6. Dependencias
- `resend`
- Variables de entorno: `RESEND_API_KEY`

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
- Implementar endpoints y lógica de emails.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 