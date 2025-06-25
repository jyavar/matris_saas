# ~M_ADMIN.md

## 1. Propósito del módulo
Panel de control para operadores y admins. Permite visualizar estadísticas, gestionar usuarios y tenants, y configurar aspectos globales del SaaS.

## 2. Archivos clave
- `src/app/control-tower/` (frontend)
- `src/services/analytics.service.ts`
- `src/services/profiles.service.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| UI                 | 🟡     |
| Servicios          | 🟡     |
| Endpoints          | 🟡     |
| Tests              | ❌     |
| Documentación      | 🟡     |

## 4. Tests presentes / pendientes
- [ ] Tests de UI y endpoints
- [ ] Mock de datos y dashboards (presente)
- [ ] Cobertura ≥80%

## 5. Integraciones
- Analytics
- Profiles
- Multi-tenancy

## 6. Dependencias
- `react`, `next`, `zod`

## 7. Workarounds
- Mock de datos en dashboards

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] UI clara y funcional
- [ ] Endpoints REST claros
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar UI y lógica de dashboards.
- Integrar datos reales y reporting.
- Sincronizar estado en tablero de módulos y checklist maestro. 

## 11. Estructura sugerida

```
apps/frontend/src/app/control-tower/           # Carpeta principal del dashboard admin
  ├── index.tsx                                # Página principal del panel admin
  ├── components/
  │     ├── AdminDashboard.tsx                 # Componente principal del dashboard
  │     ├── UserManagement.tsx                 # Gestión de usuarios
  │     └── TenantManagement.tsx               # Gestión de tenants
  ├── services/
  │     ├── admin.api.ts                       # Llamadas a endpoints backend de admin
  └── __tests__/
        └── AdminDashboard.test.tsx            # Tests de UI
```

**En backend:**
```
apps/backend/src/controllers/admin.controller.ts
apps/backend/src/routes/admin.routes.ts
apps/backend/src/services/admin.service.ts
```

¿Quieres que cree estos archivos y carpetas base (con stubs y comentarios) para que puedas empezar a implementar?  
¿O prefieres que te ayude a definir primero los endpoints y contratos de datos para la UI? 

## 12. Checklist de completitud y auditoría

### Elementos mínimos para ~M_ADMIN completo

1. **Dashboard de Control**
   - [ ] Resumen general de actividad (usuarios activos, suscripciones, campañas activas, errores)
   - [ ] Métricas visuales (PostHog, Analytics, Stripe MRR/ARR)
   - [ ] Toggle de entorno (staging / prod)

2. **Gestión de Usuarios**
   - [ ] Tabla de usuarios con filtros (nombre, email, estado, tenant)
   - [ ] Acciones: ver perfil, suspender, eliminar, resetear password

3. **Gestión de Tenants**
   - [ ] Listado de tenants / workspaces
   - [ ] Cambiar estado (activo/inactivo), ver usuarios, editar límites

4. **Visualización Técnica**
   - [ ] Logs técnicos (últimos errores, últimos webhooks recibidos)
   - [ ] Estado de tests (pnpm run test resultado)
   - [ ] Últimos deploys y validaciones CI/CD

5. **Configuración Global**
   - [ ] Límite de pruebas gratuitas, estado del modo público/privado
   - [ ] Edición de mensajes de onboarding o email templates

### Archivos esperados

**Frontend:**
- [ ] app/control-tower/page.tsx
- [ ] components/admin/AdminDashboard.tsx
- [ ] components/admin/UserTable.tsx
- [ ] components/admin/TenantList.tsx
- [ ] components/admin/SystemStatusCard.tsx

**Backend:**
- [ ] src/controllers/admin.controller.ts
- [ ] src/routes/admin.routes.ts
- [ ] src/services/admin.service.ts
- [ ] src/tests/admin.controller.test.ts

---

> **Estado actual:**
> - Solo existe la documentación viva y la estructura sugerida.
> - No hay implementación real de UI, endpoints, servicios ni tests.
> - Tampoco existen los archivos mínimos esperados en frontend ni backend.

**Para estar completo:**
- Implementar todos los elementos mínimos de UI y backend listados arriba.
- Crear los archivos base y stubs para cada componente/servicio.
- Añadir al menos un dashboard funcional con datos reales o mockeados.
- Incluir tests y documentación de uso.

---

> Este checklist debe actualizarse tras cada avance. El objetivo es dejar el módulo admin completamente funcional, documentado y alineado a la excelencia STRATO.
