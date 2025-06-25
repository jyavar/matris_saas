# ~M_AUTH.md

## 1. Propósito del módulo
Gestiona la autenticación, sesiones y seguridad de usuarios. Incluye endpoints de login, signup, protección de rutas y validación de tokens, alineado a la plantilla elite STRATO.

## 2. Archivos clave
- `src/services/auth.service.ts`
- `src/controllers/auth.controller.ts`
- `src/routes/auth.routes.ts`
- `src/middleware/auth.middleware.ts`
- `src/types/types.auth.ts`
- `src/tests/auth.test.ts`
- `src/tests/backend.coverage.extended.test.ts` (cubre flujos de auth)

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ✅     |
| Controller         | ✅     |
| Routes             | ✅     |
| Middleware         | ✅     |
| Types              | ✅     |
| Validación Zod     | ✅     |
| Tests              | ✅     |
| Documentación      | ✅     |

## 4. Tests presentes / pendientes
- [x] Tests unitarios de servicios y controladores
- [x] Tests de integración de endpoints
- [x] Mock de tokens y sesiones
- [x] Cobertura ≥80%

## 5. Integraciones
- JWT (tokens y sesiones)
- Middleware de protección de rutas
- Validación de input con Zod

## 6. Dependencias
- `jsonwebtoken`
- `zod`
- Variables de entorno: `JWT_SECRET`, `JWT_EXPIRES_IN`

## 7. Workarounds
- Validación de usuario dummy en algunos tests (mejorar para integración real)
- Simulación de base de datos en memoria para algunos flujos

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [x] Validación robusta de inputs
- [x] Seguridad en middleware
- [x] Documentación viva
- [x] Integración JWT
- [x] Tests completos y cobertura
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Mejorar integración con base de datos real y refinar validaciones de usuario.
- Revisar y reforzar la seguridad de los tokens y sesiones.
- Mantener cobertura de tests y documentación sincronizada tras cada cambio. 