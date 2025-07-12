# STRATO Backend Engine™

Este es el backend core para el ecosistema STRATO.

## Tech Stack

- **Framework**: Node.js puro (HTTP nativo, sin Express)
- **Language**: TypeScript
- **Database & Auth**: Supabase (PostgreSQL + Auth + RLS)
- **Payments**: Stripe
- **Email**: Resend
- **AI**: OpenAI
- **Analytics**: PostHog
- **Validation**: Zod
- **Testing**: Vitest & Supertest

## Getting Started

1.  Navega a la carpeta `backend`.
2.  Crea un archivo `.env` usando la plantilla de abajo.
3.  Instala dependencias: `pnpm install`
4.  Corre el servidor: `pnpm dev:backend`

## Environment Variables

Crea un archivo `.env` en este directorio (`/backend`) y agrega las siguientes variables. **No lo subas a git.**

```
# -- Application Settings --
NODE_ENV=development
PORT=3001
LOG_LEVEL=info

# -- Supabase --
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# -- Stripe --
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# -- Resend --
RESEND_API_KEY=re_...

# -- OpenAI --
OPENAI_API_KEY=sk_...

# -- PostHog --
POSTHOG_API_KEY=phc_...
```

---

# Módulos Principales

### 🚀 Automation
- **Descripción:** Motor de workflows automáticos y jobs programados.
- **Endpoints:**
  - `GET /api/automation/workflows` — Listar workflows
  - `POST /api/automation/workflows` — Crear workflow
  - `POST /api/automation/workflows/:id/execute` — Ejecutar workflow
  - `GET /api/automation/jobs` — Listar jobs
- **Migración:** `supabase/migrations/20250624000200_add_automation_tables.sql`
- **Tests:** `src/tests/automation.service.test.ts`

### 👋 Onboarding
- **Descripción:** Flujo de onboarding multi-paso para nuevos usuarios.
- **Endpoints:**
  - `GET /api/onboarding` — Obtener estado de onboarding
  - `POST /api/onboarding/start` — Iniciar onboarding
  - `POST /api/onboarding/complete` — Completar onboarding
- **Migración:** `supabase/migrations/20250624000300_add_onboarding_tables.sql`
- **Tests:** `src/tests/onboarding.test.ts`

### 📊 Launchboard
- **Descripción:** Dashboards y widgets configurables por usuario/tenant.
- **Endpoints:**
  - `GET /api/launchboard/dashboards` — Listar dashboards
  - `POST /api/launchboard/dashboards` — Crear dashboard
  - `GET /api/launchboard/dashboards/:id/widgets` — Listar widgets de dashboard
  - `POST /api/launchboard/widgets` — Crear widget
  - `GET /api/launchboard/widget-types` — Tipos de widgets disponibles
- **Migración:** `supabase/migrations/20250624000400_add_launchboard_tables.sql`
- **Tests:** `src/tests/launchboard.service.test.ts`, `src/tests/launchboard.test.ts`

---

## Seguridad y Buenas Prácticas
- **Autenticación:** Todas las rutas protegidas usan `authMiddleware` y RLS en Supabase.
- **Validación:** Todos los endpoints usan Zod para validar inputs.
- **Testing:** Cobertura ≥90% en módulos críticos. Usa mocks para Supabase y servicios externos.
- **Migraciones:** Todas las tablas tienen RLS y políticas estrictas.

---

## Estructura de carpetas

```
apps/backend/
  src/
    controllers/   # Controladores HTTP
    services/      # Lógica de negocio
    routes/        # Definición de rutas
    middleware/    # Middlewares (auth, error, etc)
    tests/         # Tests unitarios e integración
    ...
  supabase/
    migrations/    # Migraciones SQL versionadas
```

---

> Actualiza este README tras cada cambio relevante en los módulos principales. Para detalles de endpoints, revisa los tests y controladores correspondientes.
