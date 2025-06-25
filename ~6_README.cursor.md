# STRATO Context Rules for AI and Human Agents

> **Este archivo debe mantenerse sincronizado con ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md.**
> 
> **Última sincronización: 2024-06-25**
> 
> **Hito reciente:** Monorepo conectado y subido a GitHub en main. Estado listo para colaboración y despliegue profesional. URL: https://github.com/jyavar/matris_saas
> 
> **Stack consolidado:** Next.js + React puro.

⚠️ Este monorepo está protegido por STRATO Context Guard™

Este sistema automatizado asegura que toda contribución siga las reglas de estructura definidas en `.strato-manifest.json`, la lógica de negocio (~13_LOGICA_NEGOCIO.md) y el Checklist Maestro (~12_CHECKLIST_MAESTRO.md).

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
2.  **Consulta el manifiesto y la lógica de negocio**: Abre `.strato-manifest.json`, ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md para ver las rutas, convenciones y reglas permitidas.
3.  **Mueve o ajusta el archivo**: Ubica tu archivo en una ruta válida y documenta cualquier workaround o excepción en la lógica de negocio.
4.  **Intenta de nuevo**: Haz el commit o push otra vez.

---

## Ejemplo de Manifiesto (`.strato-manifest.json`)

```json
{
  "root": ".",
  "validPaths": [
    "apps/frontend/**",
    "apps/backend/**",
    "apps/web/**",
    "agent/**",
    "packages/utils/**",
    "audit-artifacts/**",
    ".github/**",
    ".husky/**",
    ".turbo/**",
    ".idea/**",
    "prompts/**",
    "scripts/**",
    "*.md",
    "*.json",
    "*.js",
    "*.cjs",
    "*.ts",
    ".strato-manifest.json"
  ],
  "forbiddenPaths": [
    "node_modules/**",
    "dist/**",
    "build/**"
  ],
  "namingConventions": {
    "testFiles": "*.test.ts",
    "componentFiles": "*.tsx",
    "routeFiles": "route.ts"
  },
  "preferredEntryDir": "apps/frontend/app/"
}
```
- **`validPaths`**: Lista de patrones glob donde los archivos *pueden* existir (incluye documentación viva y scripts globales en raíz y carpetas técnicas).
- **`forbiddenPaths`**: Lista de patrones glob donde los archivos *nunca* deben existir. Tiene prioridad sobre `validPaths`.
- **`namingConventions`**: Reglas de nombrado para tipos específicos de archivos (actualmente informativo).
- **`preferredEntryDir`**: Directorio preferido para nuevos componentes de frontend (informativo).

Para agregar nuevos módulos, usa:
```bash
pnpm module:create
```

Nunca crees archivos directamente en rutas no permitidas ni con paths absolutos sin validar. Documenta cualquier excepción en ~13_LOGICA_NEGOCIO.md. 