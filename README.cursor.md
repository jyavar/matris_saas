# STRATO Context Rules for AI and Human Agents

⚠️ Este monorepo está protegido por STRATO Context Guard™

- Solo puedes crear archivos dentro de estas rutas:
  - `apps/frontend/**`
  - `apps/backend/**`
  - `packages/core/**`
  - `scripts/**`
  - `types/**`
- Nunca crear archivos en:
  - `node_modules/`
  - `apps/**/build/`
  - cualquier carpeta `__snapshots__` o `__tests__` fuera del flujo oficial

Para agregar nuevos módulos, usa:
```bash
pnpm module:create
```

Nunca crees archivos directamente en raíz ni con paths absolutos sin validar. 