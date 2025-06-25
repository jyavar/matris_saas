# Plantilla de Feature STRATO

> Usa esta plantilla para instruir a un asistente de IA. Sé explícito, claro y no dejes lugar a ambigüedades.

---

### **[Contexto]**

- **Objetivo General:** _(¿Qué estamos intentando lograr a nivel de negocio o de producto?)_
- **Ubicación del Código:** _(¿En qué módulo, paquete o carpeta debe vivir este código?)_
- **Requerimientos No Funcionales:** _(Rendimiento, seguridad, sin dependencias externas, etc.)_
- **Filosofía STRATO a Aplicar:** _(Cero `any`, código limpio, funciones puras, etc.)_

---

### **[Instrucciones Claras]**

1.  **Crear/Modificar Archivo `[ruta/al/archivo_1.ts]`:**
    - _(Descripción detallada de lo que debe contener el archivo. Incluir nombres de funciones, tipos de datos, lógica específica, etc.)_
2.  **Crear/Modificar Archivo `[ruta/al/test_1.test.ts]`:**
    - _(Descripción de los casos de prueba. "Debe probar X", "Debe manejar el caso borde Y", "Debe fallar si Z".)_
3.  ... (añadir más pasos si es necesario)

---

### **[Resultado Esperado]**

- [ ] Un nuevo archivo `[ruta/al/archivo_1.ts]` con el contenido especificado.
- [ ] Un nuevo archivo `[ruta/al/test_1.test.ts]` que cubre todos los casos mencionados.
- [ ] Todo el código nuevo debe pasar las validaciones de `eslint`, `prettier` y `tsc --noEmit`.
- [ ] Todos los tests deben pasar al ejecutar `npm test`.

---

### **[Commit Sugerido]**

```
feat(scope): describe el cambio concisamente
```
