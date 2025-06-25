# ~19_README_CI_CD.md

## CI/CD y Workflows – STRATO SAFE STACK™

> Este archivo documenta el flujo de Integración Continua (CI) y Despliegue Continuo (CD) del monorepo STRATO. Es la referencia para entender, mantener y auditar los pipelines automáticos del repo.

---

### 1. Workflows Actuales en `.github/workflows/`

- **ci.yml**
  - Ejecuta en cada push y PR a `main`.
  - Jobs:
    - **lint:** Valida estilo y sintaxis con ESLint (`npx eslint . --ext .ts,.tsx`).
    - **typecheck:** Valida tipos con TypeScript (`npx tsc --noEmit`).
    - **test:** Corre tests (`pnpm test`) y valida estructura con `context-watchdog.ts`.

- **ci-check.yml**
  - Ejecuta en cada push y PR a `main`.
  - Job único:
    - Lint (`pnpm run lint`)
    - Tests (`pnpm run test`)
    - Build (`pnpm run build`)

**Nota:** Puedes mantener ambos workflows (uno como "fast check" y otro como "full CI") o unificarlos según necesidades futuras.

---

### 2. Comandos clave en CI

- `pnpm install` – Instala dependencias.
- `pnpm run lint` / `npx eslint .` – Linting de todo el monorepo.
- `pnpm run test` – Ejecuta tests unitarios y de integración.
- `pnpm run build` – Build de frontend y backend.
- `npx tsc --noEmit` – Typecheck estricto.
- `pnpm tsx scripts/agents/context-watchdog.ts` – Valida estructura y convenciones.

---

### 3. Estado del Deploy Automático

- **Deploy real (Vercel, Railway, Supabase):**
  - **Pendiente de configurar.**
  - El pipeline actual valida calidad y build, pero no hace deploy automático.
  - Próximo paso: conectar Vercel (frontend) y Railway/Supabase (backend) y documentar variables de entorno necesarias.

---

### 4. Troubleshooting y recomendaciones

- Si falla un job de CI:
  1. Lee el log del job fallido en GitHub Actions.
  2. Corre el comando localmente (`pnpm run lint`, `pnpm run test`, etc.).
  3. Revisa dependencias, rutas y convenciones.
  4. Consulta la documentación viva y el Context Guard.
- Mantén los workflows sincronizados con la estructura real del monorepo.
- Documenta cualquier workaround o excepción en los archivos de lógica de negocio y checklist maestro.

---

### 5. Mejoras sugeridas

- Unificar workflows si hay redundancia.
- Añadir badge de CI al README principal.
- Automatizar deploy real y documentar el flujo completo.
- Validar variables de entorno y secrets en CI antes de activar el deploy.

---

> Actualiza este archivo tras cada cambio relevante en los workflows o el pipeline de CI/CD. Es la referencia para todo colaborador humano o IA. 