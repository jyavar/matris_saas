# Módulo Auth – Documentación Técnica

## Descripción
Módulo encargado de la autenticación de usuarios en el sistema. Implementa endpoints de signup y signin, validación de credenciales, manejo de sesiones y protección de rutas mediante JWT y Supabase Auth.

---

## Endpoints

### POST /auth/signup
- **Descripción:** Registra un nuevo usuario.
- **Payload:**
  ```json
  {
    "email": "usuario@ejemplo.com",
    "password": "*********"
  }
  ```
- **Respuesta esperada:**
  - 201 Created
  - Usuario creado (objeto user)

### POST /auth/signin
- **Descripción:** Inicia sesión y retorna un access token.
- **Payload:**
  ```json
  {
    "email": "usuario@ejemplo.com",
    "password": "*********"
  }
  ```
- **Respuesta esperada:**
  - 200 OK
  - {
      "user": { ... },
      "access_token": "..."
    }

---

## Middleware

- **auth.middleware.ts:** Protege rutas verificando JWT de Supabase. Permite bypass en entorno de test con headers simulados.
- **Workaround:** Si el token no trae `tenant_id` y estamos en test, se inyecta un `tenant_id` dummy. Eliminar cuando Supabase incluya `tenant_id` en el JWT.

---

## Validaciones y Seguridad
- Validación de payloads con Zod (`authSchema`).
- Manejo de errores estructurado con `ApiError`.
- Respuestas 401 para credenciales inválidas o token ausente/incorrecto.

---

## Dependencias
- Supabase Auth
- Express
- Zod
- ApiError utilitario

---

## Ejemplo de uso en test
```js
// Signup
await request(app).post('/auth/signup').send({ email, password })
// Signin
const res = await request(app).post('/auth/signin').send({ email, password })
const token = res.body.access_token
// Acceso a ruta protegida
await request(app).get('/profiles/me').set('Authorization', `Bearer ${token}`)
```

---

## Tests
- `auth.test.ts` cubre:
  - Signup
  - Signin (correcto y fallido)
  - Acceso a rutas protegidas (con y sin token)

---

## Estado
- Tipado estricto, sin `any`, sin `console.log`, sin deuda técnica.
- Workaround documentado.
- Tests robustos y cobertura alta.

---

## TODO
- Extraer tipos auxiliares a `types.ts` si crecen.
- Extraer funciones auxiliares a `utils.ts` si aplica.
- Eliminar workaround de `tenant_id` cuando Supabase lo soporte nativamente. 