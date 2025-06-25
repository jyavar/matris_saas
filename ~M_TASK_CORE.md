# ~M_TASK_CORE.md

## 1. Propósito del módulo
Gestiona el core funcional de tareas (Task Core) para el SaaS. Permite a los usuarios crear, listar, actualizar y eliminar tareas, con lógica robusta, validaciones y seguridad, alineado a la plantilla elite STRATO y considerado módulo funcional núcleo.

## 2. Archivos clave
- `src/services/task-core.service.ts`
- `src/controllers/task-core.controller.ts`
- `src/routes/task-core.routes.ts`
- `src/tests/backend.coverage.extended.test.ts` (cubre flujos de task core)

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ✅     |
| Controller         | ✅     |
| Routes             | ✅     |
| Types              | 🟡     |
| Tests              | ✅     |
| Documentación      | 🟡     |

## 4. Tests presentes / pendientes
- [x] Tests unitarios de servicios y controladores
- [x] Tests de integración de endpoints
- [x] Mock de datos y validaciones
- [x] Cobertura ≥80%

## 5. Integraciones
- Base de datos (simulada o real)
- Endpoints protegidos por autenticación

## 6. Dependencias
- `zod`
- Variables de entorno: (ninguna crítica, depende de la persistencia)

## 7. Workarounds
- Simulación de base de datos en memoria para algunos flujos
- Validación parcial de inputs (mejorar con Zod en todos los endpoints)

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [ ] Validación robusta de inputs
- [x] Documentación viva
- [x] Tests completos y cobertura
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar validación de inputs con Zod en todos los endpoints.
- Mejorar documentación y ejemplos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro (ver ~16_MODULOS.md). 