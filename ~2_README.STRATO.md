<!-- ORIGEN: apps/web/README.md + audit-artifacts/real-code/web/README.md -->
# STRATO SAFE STACK™ – Monorepo SaaS Elite

Esta carpeta contiene la app Next.js (SSR/SSG) para landings, dashboard avanzado y el futuro Control Tower multi-SaaS de STRATO.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

---

<!-- ORIGEN: ~6_README.cursor.md -->
## STRATO Context Rules for AI and Human Agents

> **Este archivo debe mantenerse sincronizado con ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md.**

⚠️ Este monorepo está protegido por STRATO Context Guard™

Este sistema automatizado asegura que toda contribución siga las reglas de estructura definidas en `.strato-manifest.json`, la lógica de negocio (~13_LOGICA_NEGOCIO.md) y el Checklist Maestro (~12_CHECKLIST_MAESTRO.md).

### Cómo Funcionan los Guardianes

1.  **Guardián de Commits (Pre-commit Hook)**: Valida staging y bloquea si hay violaciones.
2.  **Guardián de CI/CD (GitHub Actions)**: Valida todos los archivos modificados en PR.
3.  **Guardián de Vigilancia (Real-time Watcher)**: Feedback instantáneo en desarrollo.

### Qué Hacer si una Validación Falla
Lee el error, consulta el manifiesto y la lógica de negocio, ajusta el archivo y reintenta.

#### Ejemplo de Manifiesto (`.strato-manifest.json`)
```json
{
  "root": ".",
  "validPaths": ["apps/frontend/**", "apps/backend/**", "apps/web/**", "agent/**", "packages/utils/**", "audit-artifacts/**", ".github/**", ".husky/**", ".turbo/**", ".idea/**", "prompts/**", "scripts/**", "*.md", "*.json", "*.js", "*.cjs", "*.ts", ".strato-manifest.json"],
  "forbiddenPaths": ["node_modules/**", "dist/**", "build/**"],
  "namingConventions": {"testFiles": "*.test.ts", "componentFiles": "*.tsx", "routeFiles": "route.ts"},
  "preferredEntryDir": "apps/frontend/app/"
}
```

---

<!-- ORIGEN: ~19_README_CI_CD.md -->
## CI/CD y Workflows – STRATO SAFE STACK™

### 1. Workflows Actuales en `.github/workflows/`
- **ci.yml**: Lint, typecheck, test, context-watchdog.
- **ci-check.yml**: Lint, test, build.

### 2. Comandos clave en CI
- `pnpm install`, `pnpm run lint`, `pnpm run test`, `pnpm run build`, `npx tsc --noEmit`, `pnpm tsx scripts/agents/context-watchdog.ts`

### 3. Estado del Deploy Automático
- **Deploy real (Vercel, Railway, Supabase):** Pendiente de configurar.

### 4. Troubleshooting y recomendaciones
- Lee el log, corre el comando localmente, revisa dependencias y consulta la documentación viva.

### 5. Mejoras sugeridas
- Unificar workflows, añadir badge de CI, automatizar deploy real, validar variables de entorno y secrets en CI.

---

<!-- ORIGEN: ~8_SCORECARD.md -->
## Scorecard de Sanidad de la Plataforma

**Puntuación Global de Sanidad Actual: 73%**

| Métrica / Dimensión | Estado Actual | Puntuación | Justificación y Próximos Pasos |
| :--- | :--- | :---: | :--- |
| **1. Calidad de Código y Cero Deuda Técnica** | ESLint y Prettier estrictos, política de "cero any", "cero ts-ignore", "cero eslint-disable". | **95/100** | Excelente. El tooling y la disciplina están en su sitio. |
| **2. Cobertura y Calidad de Tests** | Infraestructura para testing implementada, pero falta cobertura real. | **15/100** | Crítico. Prioridad: crear tests unitarios y de frontend. |
| **3. Automatización y Flujo de Trabajo (CI/CD)** | Husky, lint-staged y commitlint activos. Falta pipeline de CI en la nube. | **60/100** | Crear workflow básico de GitHub Actions. |
| **4. Arquitectura y Estructura del Monorepo** | Migración a pnpm workspaces, estructura de carpetas y configs centralizadas. | **100/100** | Base sólida y lista para escalar. |
| **5. Gestión de Base de Datos** | Migraciones con Supabase, schema versionado, scripts de ayuda. | **90/100** | Falta generar tipos TS desde el schema. |
| **6. Seguridad** | Gestión de secretos correcta localmente, falta auditoría formal de dependencias. | **75/100** | Ejecutar pnpm audit y mejorar gestión de secretos en prod. |

---

<!-- ORIGEN: ~14_REGLAS_DE_ORO.md -->
## REGLAS DE ORO STRATO SAFE STACK™

1. Lee estas reglas todos los días antes de trabajar.
2. Nunca avances dejando deuda técnica. Todo workaround debe estar documentado y con plan de remoción.
3. Prohibido el uso de `any`, `@ts-ignore`, `eslint-disable` salvo justificación temporal y documentada.
4. Cada avance debe dejar el repo validado, auditable y sin errores/warnings.
5. No existe feature "simple" o "temporal": todo pasa por validación, test y docs.
6. Sincroniza siempre lógica de negocio, checklist maestro y reglas de oro.
7. Prioriza claridad, mantenibilidad y trazabilidad sobre velocidad.
8. Nunca ignores errores de CI, validaciones o guardianes.
9. Todo colaborador debe leer y aceptar estas reglas antes de contribuir.
10. Revisa y refuerza estas reglas cada sprint.

> Estas reglas son la defensa final contra la deuda técnica y el caos. Si dudas, vuelve a leerlas y consulta la lógica de negocio y el checklist maestro.

---

<!-- ORIGEN: ~13_LOGICA_NEGOCIO.md -->
## LÓGICA DE NEGOCIO Y VISIÓN STRATO

- Centralizar el conocimiento crítico del proyecto.
- Evitar pérdida de contexto entre sesiones, cambios de equipo o IA.
- Facilitar onboarding, auditoría, escalabilidad y continuidad.
- Servir como guía para founders no técnicos y para IA colaborativa.

### Estructura y convenciones
- `/apps/backend/`, `/apps/frontend/`, `/apps/web/`, `/packages/`, `/scripts/`, etc.
- Node.js, TypeScript, Next.js, Express, Supabase, Stripe, Resend, OpenAI, PostHog, Vitest, etc.
- Naming conventions: tests `.test.ts`, componentes `.tsx`, rutas `route.ts`.
- Estrategia de ramas y Git: PR, squash, convenciones claras.

### Estado de módulos críticos
| Módulo      | Estado      | Archivo principal         | Workaround | Fecha revisión |
|-------------|-------------|--------------------------|------------|---------------|
| Auth        | ✅ Validado | auth.service.ts          | ⚠️ tenant_id test | 2024-06-25    |
| Profiles    | ✅ Validado | profiles.controller.ts   |            | 2024-06-25    |
| Billing     | [ ]         | billing.service.ts       | [ ]        |               |
| OpenAI      | [ ]         | openai.service.ts        | [ ]        |               |
| Resend      | [ ]         | resend.service.ts        | [ ]        |               |
| PostHog     | [ ]         | posthog.service.ts       | [ ]        |               |
| Frontend    | [ ]         | /components/ui/          | [ ]        |               |
| Tests       | [ ]         | tests/                   | [ ]        |               |
| SEO         | [ ]         | next-seo.config.ts       | [ ]        |               |

### Infraestructura y carpetas técnicas
- `.github/`: Workflows y CI/CD
- `.husky/`: Hooks de pre-commit y pre-push
- `.turbo/`: Cache y configuración de TurboRepo
- `.tmp-scripts/`: Scripts temporales
- `prompts/`: Prompts y recursos para IA
- `apps/backend/`: Backend principal
- `apps/frontend/`: Frontend principal

---

> Actualiza este README tras cada avance relevante. El objetivo es tener el monorepo 100% validado, documentado y listo para producción. 