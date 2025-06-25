# Módulo Profiles – Documentación Técnica

## Descripción
Módulo encargado de la gestión de perfiles de usuario. Permite crear, consultar, actualizar y eliminar perfiles, asegurando la pertenencia al tenant y la protección de datos.

---

## Endpoints

### GET /profiles/me
- **Descripción:** Obtiene el perfil del usuario autenticado.
- **Respuesta esperada:**
  - 200 OK
  - Objeto perfil del usuario

### GET /profiles/
- **Descripción:** Lista todos los perfiles del tenant.
- **Respuesta esperada:**
  - 200 OK
  - Array de perfiles

### GET /profiles/:id
- **Descripción:** Obtiene un perfil por ID (dentro del tenant).
- **Respuesta esperada:**
  - 200 OK
  - Objeto perfil
  - 404 si no existe

### POST /profiles/
- **Descripción:** Crea un nuevo perfil para el usuario autenticado.
- **Payload:**
  ```json
  {
    "username": "usuario123",
    "full_name": "Nombre Apellido",
    "avatar_url": "https://..."
  }
  ```
- **Respuesta esperada:**
  - 201 Created
  - Objeto perfil creado
  - 400 si datos inválidos

### PATCH /profiles/:id
- **Descripción:** Actualiza el perfil del usuario autenticado.
- **Payload:**
  ```json
  {
    "username": "nuevo_usuario",
    "full_name": "Nuevo Nombre"
  }
  ```
- **Respuesta esperada:**
  - 200 OK
  - Objeto perfil actualizado
  - 403 si intenta modificar otro perfil

### DELETE /profiles/:id
- **Descripción:** Elimina el perfil del usuario autenticado.
- **Respuesta esperada:**
  - 204 No Content

---

## Validaciones y Seguridad
- Todas las rutas protegidas por `authMiddleware`.
- Validación de payloads con Zod (`createProfileSchema`, `updateProfileSchema`).
- Solo el dueño puede modificar/eliminar su perfil.
- Manejo de errores estructurado con `ApiError`.

---

## Dependencias
- Supabase
- Express
- Zod
- ApiError utilitario

---

## Ejemplo de uso en test
```js
// Obtener perfil propio
await request(app).get('/profiles/me').set('Authorization', `Bearer ${token}`)
// Crear perfil
await request(app).post('/profiles').set('Authorization', `Bearer ${token}`).send({ username, full_name })
```

---

## Tests
- Cubiertos en `backend.coverage.extended.test.ts`:
  - Creación con datos inválidos (400)
  - Consulta de perfil inexistente (404)
  - Denegación de update a perfil ajeno (404)
  - Consulta de perfil propio (200)

---

## Estado
- Tipado estricto, sin `any`, sin `console.log`, sin deuda técnica.
- Validaciones y control de acceso robustos.
- Tests robustos y cobertura alta.

---

## TODO
- Extraer tipos auxiliares a `types.ts` si crecen.
- Extraer funciones auxiliares a `utils.ts` si aplica.
- Crear test dedicado si se requiere mayor claridad o mantenimiento. 