# STRATO Context Rules for AI and Human Agents

⚠️ Este monorepo está protegido por STRATO Context Guard™

Este sistema automatizado asegura que toda contribución siga las reglas de estructura definidas en `.strato-manifest.json`.

## Cómo Funcionan los Guardianes

1.  **Guardián de Commits (Pre-commit Hook)**:
    -   Se activa automáticamente con `git commit`.
    -   Valida que **solo los archivos en staging** cumplan con las reglas del manifiesto.
    -   Si detecta una violación, el commit es **bloqueado** y se muestran mensajes de error detallados.
    -   Los errores también se registran en `logs/context-violations.log`.

2.  **Guardián de CI/CD (GitHub Actions)**:
    -   Se ejecuta en cada Pull Request a `main`.
    -   Valida todos los **archivos modificados en el PR**.
    -   Si detecta una violación, el workflow de CI **fallará**, bloqueando el merge.

3.  **Guardián de Vigilancia (Real-time Watcher)**:
    -   Un modo de desarrollo para feedback instantáneo.
    -   Se ejecuta manualmente con `pnpm guardian:watch`.
    -   Observa el sistema de archivos y **advierte en tiempo real** si un archivo nuevo se crea en una ruta inválida.

## Qué Hacer si una Validación Falla
1.  **Lee el error**: El mensaje te dirá qué archivo falló y por qué.
2.  **Consulta el manifiesto**: Abre `.strato-manifest.json` para ver las `validPaths` y `forbiddenPaths` permitidas.
3.  **Mueve el archivo**: Ubica tu archivo en una ruta válida.
4.  **Intenta de nuevo**: Haz el commit o push otra vez.

---

## Ejemplo de Manifiesto (`.strato-manifest.json`)

```json
{
  "root": "./",
  "validPaths": [
    "apps/frontend/**",
    "apps/backend/**",
    "packages/core/**",
    "scripts/**",
    "types/**",
    ".husky/pre-commit",
    ".strato-manifest.json",
    "README.cursor.md",
    "package.json",
    "pnpm-lock.yaml"
  ],
  "forbiddenPaths": [
    "node_modules/**",
    "apps/**/build/**",
    "**/__tests__/**/__snapshots__/**"
  ],
  "namingConventions": {
    "testFiles": "*.test.ts",
    "componentFiles": "*.tsx",
    "routeFiles": "route.ts"
  },
  "preferredEntryDir": "apps/frontend/app/"
}
```
- **`validPaths`**: Lista de patrones glob donde los archivos *pueden* existir.
- **`forbiddenPaths`**: Lista de patrones glob donde los archivos *nunca* deben existir. Tiene prioridad sobre `validPaths`.
- **`namingConventions`**: Reglas de nombrado para tipos específicos de archivos (actualmente informativo).
- **`preferredEntryDir`**: Directorio preferido para nuevos componentes de frontend (informativo).

Para agregar nuevos módulos, usa:
```bash
pnpm module:create
```

Nunca crees archivos directamente en raíz ni con paths absolutos sin validar. 