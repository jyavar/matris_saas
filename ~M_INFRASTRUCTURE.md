# 🏗️ MÓDULO INFRAESTRUCTURA

```json
{
  "module": "INFRASTRUCTURE",
  "description": "Configuración de build, deployment, Docker y herramientas de desarrollo",
  "paths": [
    "apps/backend/Dockerfile",
    "apps/backend/.dockerignore",
    "apps/frontend/env.example",
    "apps/frontend/vercel.json",
    "apps/frontend/tsconfig.json",
    "apps/frontend/next-env.d.ts",
    "apps/frontend/src/vite-env.d.ts",
    "apps/frontend/src/hooks/useTodos.ts",
    "apps/frontend/src/lib/utils.ts",
    "apps/frontend/src/lib/todos.api.ts",
    "apps/frontend/src/app/page.tsx",
    "apps/frontend/src/app/layout.tsx",
    "apps/frontend/src/app/landing/page.tsx",
    "apps/web/next.config.ts",
    "apps/web/postcss.config.mjs",
    "apps/web/tailwind.config.ts",
    "apps/web/package.json",
    "apps/backend/package.json",
    "apps/frontend/package.json",
    "package.json",
    "pnpm-workspace.yaml",
    "tsconfig.json",
    ".gitignore",
    ".cursorrules",
    "turbo.json",
    "modules.json",
    "cloc-report.json",
    "packages/utils/package.json",
    "packages/db-types/package.json"
  ],
  "tests": [
    "scripts/validate-traceability.ts",
    "scripts/sync-modules-index.ts"
  ],
  "routes": [],
  "docs": [
    "~M_INFRASTRUCTURE.md"
  ],
  "last_synced": "2025-07-01",
  "responsible": "José + IA STRATO",
  "coverage": 0,
  "status": "active",
  "criticality": "high"
}
```

## 📋 DESCRIPCIÓN

El módulo **INFRASTRUCTURE** maneja toda la configuración de build, deployment, Docker y herramientas de desarrollo del monorepo STRATO. Es crítico para el funcionamiento del proyecto.

## 🎯 FUNCIONALIDADES PRINCIPALES

### **Build & Deployment**
- Configuración de Docker para backend
- Configuración de Vercel para frontend
- Configuración de Next.js para web app
- Configuración de TypeScript y PostCSS

### **Monorepo Management**
- Configuración de pnpm workspace
- Configuración de Turbo para builds
- Configuración de ESLint y Prettier
- Configuración de TypeScript base

### **Development Tools**
- Scripts de validación de trazabilidad
- Scripts de sincronización de módulos
- Configuración de Git y .gitignore
- Configuración de Cursor IDE

## 📁 ARCHIVOS CLAVE

### **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación## **Source Files**
- `apps/frontend/node_modules/next/config.js` - Archivo fuente
- `apps/frontend/node_modules/next/config.d.ts` - Archivo fuente
- `packages/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/shared.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/imports.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/exports.js` - Archivo fuente
- `packages/db-types/node_modules/@repo/eslint-config/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/recommended.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/rules.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/prettier.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/index.d.ts` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.js` - Archivo fuente
- `packages/eslint-config/node_modules/eslint-config-prettier/flat.d.ts` - Archivo fuente
- `playwright.config.ts` - Archivo fuente

### **Test Files**


### **Config Files**
- `apps/frontend/tsconfig.json` - Archivo de configuración
- `packages/utils/tsconfig.json` - Archivo de configuración
- `packages/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/typescript-config/package.json` - Archivo de configuración
- `packages/eslint-config/package.json` - Archivo de configuración
- `packages/db-types/tsconfig.json` - Archivo de configuración
- `packages/eslint-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/tsconfig.base.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/typescript-config/package.json` - Archivo de configuración
- `packages/db-types/node_modules/@repo/eslint-config/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-plugin-prettier/package.json` - Archivo de configuración
- `packages/typescript-config/node_modules/zod/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/parser/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/package.json` - Archivo de configuración
- `packages/eslint-config/node_modules/eslint-config-prettier/package.json` - Archivo de configuración
- `tsconfig.json` - Archivo de configuración
- `tsconfig.base.json` - Archivo de configuración

### **Doc Files**
- `packages/eslint-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-simple-import-sort/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-plugin-prettier/LICENSE.md` - Archivo de documentación
- `packages/typescript-config/node_modules/zod/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/parser/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/@typescript-eslint/eslint-plugin/README.md` - Archivo de documentación
- `packages/eslint-config/node_modules/eslint-config-prettier/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/Dockerfile` - Configuración Docker para backend
- `apps/backend/.dockerignore` - Archivos a ignorar en Docker
- `apps/frontend/env.example` - Variables de entorno de ejemplo
- `apps/web/next.config.ts` - Configuración Next.js
- `apps/web/postcss.config.mjs` - Configuración PostCSS
- `apps/web/tailwind.config.ts` - Configuración Tailwind CSS
- `apps/web/package.json` - Dependencias web app
- `apps/backend/package.json` - Dependencias backend
- `apps/frontend/package.json` - Dependencias frontend
- `package.json` - Configuración raíz del monorepo
- `pnpm-workspace.yaml` - Configuración workspace pnpm
- `tsconfig.json` - Configuración TypeScript raíz
- `.gitignore` - Archivos a ignorar en Git
- `.cursorrules` - Reglas de Cursor IDE

### **Test Files**
- `scripts/validate-traceability.ts` - Validación de trazabilidad
- `scripts/sync-modules-index.ts` - Sincronización de módulos

### **Config Files**
- `package.json` - Configuración de scripts y dependencias
- `pnpm-workspace.yaml` - Configuración de workspace
- `tsconfig.json` - Configuración TypeScript
- `.gitignore` - Configuración Git
- `.cursorrules` - Configuración IDE

### **Doc Files**
- `~M_INFRASTRUCTURE.md` - Documentación del módulo

## 🔧 SCRIPTS PRINCIPALES

### **Validación de Trazabilidad**
```bash
pnpm tsx scripts/validate-traceability.ts
```
- Valida que todos los archivos estén declarados en módulos
- Detecta archivos huérfanos
- Verifica documentación de rutas
- Calcula cobertura de trazabilidad

### **Sincronización de Módulos**
```bash
pnpm tsx scripts/sync-modules-index.ts
```
- Sincroniza headers JSON de módulos
- Actualiza secciones "Archivos clave"
- Detecta archivos automáticamente
- Genera reportes de sincronización

## 🚀 COMANDOS DE DESARROLLO

### **Build**
```bash
pnpm build          # Build completo del monorepo
pnpm build:backend  # Build solo backend
pnpm build:frontend # Build solo frontend
pnpm build:web      # Build solo web app
```

### **Development**
```bash
pnpm dev            # Desarrollo completo
pnpm dev:backend    # Desarrollo solo backend
pnpm dev:frontend   # Desarrollo solo frontend
pnpm dev:web        # Desarrollo solo web app
```

### **Testing**
```bash
pnpm test           # Tests completos
pnpm test:unit      # Tests unitarios
pnpm test:coverage  # Tests con cobertura
```

### **Linting & Formatting**
```bash
pnpm lint           # Linting completo
pnpm format         # Formateo automático
pnpm check-react-imports # Verificación de imports React
```

## 📊 MÉTRICAS DE CALIDAD

- **Cobertura de Tests:** 0% (scripts de infraestructura)
- **Cobertura de Trazabilidad:** 100% (todos los archivos declarados)
- **Estado:** Active
- **Crítica:** High

## 🔄 ÚLTIMA ACTUALIZACIÓN

**Fecha:** 2025-07-01  
**Responsable:** José + IA STRATO  
**Cambios:** Agregados archivos de configuración huérfanos

## ✅ CHECKLIST DE VALIDACIÓN

- [x] Header JSON válido
- [x] Sección "Archivos clave" actualizada
- [x] Scripts de validación funcionando
- [x] Configuración de build correcta
- [x] Configuración de deployment correcta
- [x] Documentación actualizada

## 🎯 PRÓXIMOS PASOS

1. **Mejorar cobertura de tests** para scripts de infraestructura
2. **Automatizar validaciones** en CI/CD
3. **Optimizar builds** con Turbo
4. **Documentar procesos** de deployment

*Módulo INFRASTRUCTURE - STRATO Core OS™* 