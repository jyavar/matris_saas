# ~M_CAMPAIGNS.md

## 1. Propósito del módulo
Gestionar campañas de marketing, notificaciones o flujos personalizados para usuarios. Permite crear, listar, actualizar y eliminar campañas, y conectar lógica AI opcional.

## 2. Archivos clave
- `src/routes/campaigns.routes.ts`
- `src/services/campaigns.service.ts`
- `src/controllers/campaigns.controller.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | 🔲     |
| Controller         | 🔲     |
| Routes             | 🔲     |
| Types              | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests unitarios y de endpoints
- [ ] Mock de datos y reporting
- [ ] Cobertura ≥80%

## 5. Integraciones
- Base de datos (Supabase)
- Lógica AI (OpenAI, opcional)

## 6. Dependencias
- `zod`, `@supabase/supabase-js`, `openai`

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
- Implementar endpoints y lógica de campañas.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 