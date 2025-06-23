#!/bin/bash

gh issue create --title "[STRATO] Testing y Coverage: Backend y Frontend" --body "- [ ] Backend: Tests unitarios para todos los servicios, controladores y middlewares
- [ ] Backend: Tests de integración para rutas principales (supertest)
- [ ] Backend: Fixtures de datos dummy para tests
- [ ] Backend: Validar cobertura con \`vitest run --coverage\` y guardar reporte
- [ ] Frontend: Tests de componentes con Testing Library
- [ ] Frontend: Tests E2E con Playwright para flujos críticos
- [ ] Frontend: Validar cobertura de UI y lógica
- [ ] Cobertura global ≥ 90% líneas / 80% funciones"

gh issue create --title "[STRATO] Implementación de Módulos Clave (Auth, Multi-Tenancy, Billing, UI, Admin)" --body "- [ ] AuthN/AuthZ: Lógica completa de autenticación y autorización
- [ ] AuthN/AuthZ: Proteger rutas y crear endpoints de perfil
- [ ] Multi-Tenancy: Aislamiento de datos por tenant (RLS en Supabase)
- [ ] Multi-Tenancy: Validar queries y endpoints multi-tenant
- [ ] Billing: Integrar Stripe (planes, pagos, webhooks, enforcement)
- [ ] Billing: Lógica de upgrade/downgrade y fallback visual
- [ ] UI Compartida: Crear/expandir \`packages/ui\` con componentes y theming
- [ ] Admin Dashboard: Implementar panel de control para operadores"

gh issue create --title "[STRATO] Integraciones Estratégicas (Supabase, Stripe, Resend, OpenAI, PostHog)" --body "- [ ] Supabase: Validar conexión, migraciones, seeds y tipos generados
- [ ] Stripe: Validar pagos, webhooks y lógica de enforcement
- [ ] Resend: Integrar para onboarding y alertas técnicas
- [ ] OpenAI: Integrar cliente y lógica de agentes AI
- [ ] PostHog: Integrar tracking técnico y de producto"

gh issue create --title "[STRATO] Clonabilidad y Automatización de Proyectos SaaS" --body "- [ ] Completar y testear \`create-saas-clone.ts\` y \`scripts/init-project.ts\`
- [ ] Crear y documentar templates de configuración y branding
- [ ] Validar proceso de clonación y actualización de workspaces"

gh issue create --title "[STRATO] Reporting, Dashboard y Auditoría Técnica" --body "- [ ] Implementar dashboard STRATO CONTROL TOWER™
- [ ] Automatizar generación de reportes de sanidad y coverage
- [ ] Integrar alertas a Slack/Notion (opcional)"

gh issue create --title "[STRATO] Documentación y Scorecard" --body "- [ ] Actualizar README, roadmaps y scorecard tras cada avance
- [ ] Documentar cada módulo, integración y script
- [ ] Mantener checklist pre-deploy y coverage actualizado"

gh issue create --title "[STRATO] Validaciones y Blindaje Final" --body "- [ ] Validar \`.strato-manifest.json\` con todas las rutas y convenciones
- [ ] Ejecutar \`pnpm audit:full\` y \`scripts/validate-clean-system.ts\` antes de cada release
- [ ] Validar hooks (pre-commit, pre-push) y CI/CD bloqueando cualquier error" 