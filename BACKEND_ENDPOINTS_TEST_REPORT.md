# STRATO Backend: Endpoints & Test Report

## Endpoints Principales

### Health & Dev
- `GET /health`  
- `GET /dev/health`  
- `GET /dev/error-test`  
- `GET /dev/unexpected-error-test`  
- `GET /dev/protected` (requiere auth)

### Auth
- `POST /auth/signup`
- `POST /auth/signin`

### Campaigns
- `GET /api/campaigns`
- `GET /api/campaigns/:id`
- `POST /api/campaigns`
- `PUT /api/campaigns/:id`
- `DELETE /api/campaigns/:id`
- `PATCH /api/campaigns/:id/pause`
- `PATCH /api/campaigns/:id/resume`
- `GET /api/campaigns/:id/analytics`

### Billing
- `GET /billing/invoices`
- `GET /billing/invoices/:id`
- `POST /billing/invoices`
- `PATCH /billing/invoices/:id`
- `DELETE /billing/invoices/:id`

### Analytics
- `POST /analytics/track/event`
- `POST /analytics/track/metric`
- `GET /analytics/users/:userId`
- `GET /analytics/events`
- `GET /analytics/metrics`
- `GET /analytics/summary`
- `GET /analytics/`
- `POST /analytics/`
- `GET /analytics/:id`
- `PATCH /analytics/:id`
- `DELETE /analytics/:id`

### Otros
- `/todo` (CRUD de tareas, requiere auth)
- `/profiles` (CRUD de perfiles)
- `/payments` (Stripe, requiere auth)
- `/resend` (emails)
- `/automation` (workflows)
- `/onboarding` (flujo onboarding, requiere auth)
- `/pricing` (planes y suscripciones)
- `/openai` (IA, requiere auth)
- `/posthog` (analytics tracking)
- `/runtime` (status, logs, agentes, tasks)

---

## Resultados de Pruebas (curl)

| Endpoint                  | Método | Status |
|---------------------------|--------|--------|
| `/health`                 | GET    | 200    |
| `/api/campaigns`          | GET    | 200    |
| `/billing/invoices`       | GET    | 404    |
| `/analytics`              | GET    | 404    |
| `/auth/signup`            | POST   | 404    |
| `/todo`                   | GET    | 404    |
| `/profiles`               | GET    | 404    |
| `/payments`               | GET    | 404    |
| `/automation/workflows`   | GET    | 404    |
| `/analytics/summary`      | GET    | 404    |
| `/dev/health`             | GET    | 404    |
| `/` (root)                | GET    | 404    |

**Notas:**
- Los endpoints `/health` y `/api/campaigns` responden correctamente.
- El resto devuelve 404, lo que puede indicar rutas no montadas, prefijos de ruta distintos, o que requieren autenticación/token.
- Endpoints que requieren auth devolverán 401 si se prueba con token inválido o sin token.

---

_Última actualización: auto-generado por AI_ 