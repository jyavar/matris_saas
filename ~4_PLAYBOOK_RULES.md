> **Este archivo debe mantenerse sincronizado con ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md. Cualquier cambio relevante en reglas o stack debe reflejarse en los tres.**
> 
> **Última sincronización: 2024-06-22**

> 🧩
> 
> 
> **Objetivo:**
> 
> **no debe romperse**
> 

---

### **🧠 Instrucciones para el sistema AI:**

Eres un arquitecto técnico senior. Vas a crear un repositorio nuevo siguiendo las reglas de arquitectura **STRATO SAFE STACK™**. Debes cumplir estas condiciones estrictas:

---

### **✅ COSAS QUE**

### **DEBES HACER**

### **(STACK OFICIAL – 50 YES)**

- Usa pnpm con pnpm-workspace.yaml bien definido
- Configura un tsconfig.base.json en la raíz y extiéndelo en todos los módulos
- Usa tsx para ejecutar archivos .ts sin transpilar
- Usa vitest solo en frontend o utils (no en backend)
- Para backend, usa tsup o tsc como bundler
- Estructura como monorepo: frontend/, backend/, packages/, agents/
- Cada módulo debe tener su propio package.json, tsconfig.json, vitest.config.ts (si aplica)
- Usa zod como validador único de esquema
- Usa shadcn/ui con TailwindCSS para el frontend
- Usa clsx para composición de clases
- Integra turbo para orquestación de scripts (test, build, lint)
- Ejecuta pnpm audit:full como script único de validación
- Integra audit:full en CI/CD como paso obligatorio
- Usa @repo/typescript-config, @repo/eslint-config como paquetes centrales
- Usa eslint con parsing basado en parserOptions.project
- Tipado estricto en todo el sistema (noImplicitAny, strict, noUncheckedIndexAccess)
- Tests en todos los módulos, mínimo 1 por agente
- Cero any, eslint-disable, @ts-ignore (auditable)
- Logging estructurado, sin console.log
- Rutas con alias (@/modules/...), nunca con ../

---

### **❌ COSAS QUE**

### **NO PUEDES USAR**

### **(BLACKLIST – 50 NO)**

- ❌ No uses vitest en backend
- ❌ No uses vite como bundler backend
- ❌ No uses babel, ts-node, esbuild crudo
- ❌ No uses yarn, npm (solo pnpm)
- ❌ No uses patch-package
- ❌ No uses eslint-disable, @ts-ignore, any
- ❌ No uses ../ como rutas de import
- ❌ No uses class-validator, typeorm, mongoose sin validación externa
- ❌ No uses UI frameworks cerrados (Chakra, MUI)
- ❌ No uses redux, react-router, recoil, zustand
- ❌ No uses console.log en producción
- ❌ No uses agentes sin tests ni package.json
- ❌ No uses pnpm sin packageManager declarado
- ❌ No uses pnpm sin definir workspaces correctamente
- ❌ No ignores los errores de CI o fallas de audit:full
- ❌ No permitas CI sin auditoría completa automatizada
- ❌ No uses dependencias sin declarar (require sin import, etc.)
- ❌ No ejecutes node archivo.ts directamente
- ❌ No uses alias no resueltos en tsconfig.json
- ✅ Se permite Vitest en backend y frontend para unificar tooling, acelerar el desarrollo y mejorar la DX. Si surge una limitación real, se reevalúa.

---

### **📌 Instrucciones Finales para el Sistema AI:**

- Antes de crear cualquier archivo, valida si las reglas están correctamente inicializadas.
- Si algún paso no se puede ejecutar por problemas estructurales, no continúes. Devuelve un error y explica qué está mal.
- Cada carpeta debe tener tests mínimos, sin ellos el sistema se considera incompleto.
- La primera acción será crear la raíz del monorepo con estructura segura (apps/, packages/, etc.).
- Asegúrate de que la estructura de tipos y la inferencia se mantengan en todo el sistema.

--- 