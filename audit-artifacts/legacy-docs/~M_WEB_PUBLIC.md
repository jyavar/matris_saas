<!--
STRATO MODULE HEADER
{
  "module": "WEB_PUBLIC",
  "objective": "Desarrollar y blindar la web pública, landing, SEO, webhooks y admin panel",
  "paths": [
    "apps/web/src/app/",
    "apps/web/src/components/landing/",
    "apps/web/src/lib/seo.ts",
    "apps/web/src/routes/webhooks.routes.ts",
    "apps/web/src/app/control-tower/"
  ],
  "deps": ["next", "react", "tailwindcss", "shadcn/ui", "lucide-react", "next-seo", "stripe", "resend"],
  "status": "40%",
  "pending": {
    "components": ["AdminPanel", "SEOConfig"],
    "services": ["WebhooksService"],
    "tests": ["LandingPage.test.tsx", "Webhooks.test.ts"]
  },
  "rules": {
    "no-any": true,
    "strict-types": true,
    "eslint": "on",
    "context-guard": "on"
  }
}
-->
# ~M_WEB_PUBLIC.md

**Dominio funcional:** Web Pública (apps/web)
**Incluye:** Landing, Dashboard público, SEO, Webhooks, Admin Panel

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| Web                | ~M_WEB.md            | apps/web/src/app/, apps/web/src/components/landing/, tailwind.config.ts, ... |
| SEO                | ~M_SEO.md            | apps/web/src/lib/seo.ts, apps/web/src/pages/api/sitemap.ts |
| Webhooks           | ~M_WEBHOOKS.md       | apps/web/src/routes/webhooks.routes.ts, apps/web/src/services/webhooks.service.ts |
| Admin              | ~M_ADMIN.md          | apps/web/src/app/control-tower/, apps/backend/src/controllers/admin.controller.ts |

---

## % de avance global (según checklists fusionados)
- Estructura modular: 🟡
- UI pública y landing: 🟡
- SEO avanzado: 🔲
- Webhooks: 🔲
- Admin Panel: 🔲
- Documentación viva: 🟡
- Tests completos y cobertura: 🔲
- Cumple cultura STRATO: 🟡

**Avance estimado:** ~40% (según los checklists de los módulos fusionados)

---

## Contenido completo fusionado (con trazabilidad)

---

## Archivos clave
- apps/web/src/app/layout.tsx
- apps/web/src/app/page.tsx
- apps/web/src/app/control-tower/layout.tsx
- apps/web/src/app/control-tower/page.tsx
- apps/web/src/app/api/refresh-audit/route.ts
- apps/web/src/app/__tests__/home.test.tsx
- apps/web/src/components/landing/Cta.tsx
- apps/web/src/components/landing/Features.tsx
- apps/web/src/components/landing/Footer.tsx
- apps/web/src/components/landing/Hero.tsx
- apps/web/src/components/landing/SocialProof.tsx
- apps/web/src/components/ui/button.tsx
- apps/web/src/components/ui/card.tsx
- apps/web/src/components/control-tower/AuditTable.tsx
- apps/web/src/lib/utils.ts
- apps/web/next.config.ts
- apps/web/postcss.config.mjs
- apps/web/public/favicon.ico
- apps/web/public/file.svg
- apps/web/public/globe.svg
- apps/web/public/matrix.audit.json
- apps/web/public/matrix.coverage.json
- apps/web/public/matrix.logic.json
- apps/web/public/next.svg
- apps/web/public/vercel.svg
- apps/web/styles/globals.css
- apps/web/styles/Home.module.css

---

<!-- ORIGEN: ~M_WEB.md -->
# ~M_WEB.md

## 1. Propósito del módulo
Frontend principal del sistema STRATO Core OS™. Implementa la interfaz pública y de dashboard, usando Next.js, React y TailwindCSS, alineado a la plantilla elite STRATO.

## 2. Archivos clave
- `src/app/page.tsx`
- `src/components/landing/Cta.tsx`
- `src/components/landing/Features.tsx`
- `src/components/landing/Hero.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `tailwind.config.ts`
- `tsconfig.json`
- `next-env.d.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| App/Page           | ✅     |
| UI Components      | ✅     |
| Tailwind Config    | ✅     |
| TypeScript Config  | ✅     |
| Next.js Integración| ✅     |
| Tests              | ❌     |
| Documentación      | ✅     |

## 4. Tests presentes / pendientes
- [ ] Tests unitarios de componentes UI
- [ ] Tests de integración de rutas y páginas
- [ ] Tests E2E (Playwright)

## 5. Integraciones
- Next.js (App Router)
- TailwindCSS
- shadcn/ui
- Lucide React Icons

## 6. Dependencias
- `next`
- `react`, `react-dom`
- `tailwindcss`, `postcss`, `autoprefixer`
- `lucide-react`, `class-variance-authority`, `@radix-ui/react-slot`

## 7. Workarounds
- Se usa `// @ts-nocheck` en `tailwind.config.ts` por incompatibilidad de tipos con moduleResolution actual.
- Imports relativos con extensión `.js` por compatibilidad con Node16.

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + STRATO AI
- Comandos: `pnpm run lint`, `npx tsc --noEmit`

## 9. Checklist Elite
- [x] Estructura modular Next.js
- [x] UI desacoplada y reutilizable
- [x] Configuración moderna de TypeScript
- [x] TailwindCSS y PostCSS integrados
- [x] Documentación viva
- [x] Imports y módulos limpios
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Agregar tests unitarios y E2E para componentes y rutas clave.
- Mantener cobertura y documentación sincronizada tras cada cambio.

## 11. Validación Técnica
- Fecha: 2025-06-25
- Resultado: 100% sano
- Validado por: José + STRATO AI
- Verificado en: audit-artifacts/reports/web-validation-20250625.md 

---

<!-- ORIGEN: ~M_SEO.md -->
# ~M_SEO.md

## 1. Propósito del módulo
Gestionar SEO avanzado: generación de sitemap, metatags, OpenGraph, y optimización para buscadores y redes sociales.

## 2. Archivos clave
- `src/lib/seo.ts`
- `src/pages/api/sitemap.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Sitemap            | 🔲     |
| Metatags           | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests de generación de sitemap
- [ ] Mock de metatags
- [ ] Cobertura ≥80%

## 5. Integraciones
- Next.js, SEO tools

## 6. Dependencias
- `next-seo`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] Sitemap y metatags claros
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Implementar generación de sitemap y metatags.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

---

<!-- ORIGEN: ~M_WEBHOOKS.md -->
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

---

<!-- ORIGEN: ~M_ADMIN.md -->
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