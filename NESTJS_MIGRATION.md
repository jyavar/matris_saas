# 🚀 Migración a NestJS - STRATO Backend

## 📋 Estado Actual

STRATO ahora tiene **dos backends funcionando en paralelo**:

- **Express Backend** (puerto 3001) - Backend original
- **NestJS Backend** (puerto 3002) - Nuevo backend moderno

## 🎯 Estrategia de Migración

### Fase 1: Setup Paralelo ✅
- [x] NestJS configurado en `apps/backend-nest/`
- [x] Módulo de analytics migrado como ejemplo
- [x] Health check funcionando
- [x] Ambos backends corren simultáneamente

### Fase 2: Migración Gradual (En Progreso)
- [ ] Migrar módulo por módulo
- [ ] Mantener compatibilidad de APIs
- [ ] Tests unitarios y de integración
- [ ] Validación de performance

### Fase 3: Switch Completo (Futuro)
- [ ] Migración completa
- [ ] Remover Express backend
- [ ] Optimización final

## 🛠️ Comandos de Desarrollo

### Ejecutar Backends

```bash
# Solo Express (puerto 3001)
pnpm dev:express

# Solo NestJS (puerto 3002)
pnpm dev:nest

# Ambos en paralelo
pnpm dev:both

# Frontend + Express
pnpm dev:frontend
pnpm dev:backend

# Frontend + NestJS
pnpm dev:frontend
pnpm dev:nest
```

### Build y Tests

```bash
# Build ambos backends
pnpm build:express
pnpm build:nest

# Tests
pnpm test:express
pnpm test:nest
```

## 📊 Endpoints Disponibles

### Express Backend (puerto 3001)
```
GET  /api/health
GET  /api/analytics/events
POST /api/analytics/track/event
GET  /api/analytics/metrics
POST /api/analytics/track/metric
GET  /api/analytics/summary
```

### NestJS Backend (puerto 3002)
```
GET  /api/health
GET  /api/analytics/events
POST /api/analytics/track/event
GET  /api/analytics/metrics
POST /api/analytics/track/metric
GET  /api/analytics/summary
```

## 🔄 Migración de Módulos

### Módulos Migrados
- ✅ **Analytics** - Completamente migrado a NestJS
- ✅ **Health Check** - Implementado en NestJS

### Próximos Módulos a Migrar
- [ ] **Auth** - Autenticación y autorización
- [ ] **Billing** - Integración con Stripe
- [ ] **Campaigns** - Gestión de campañas
- [ ] **Email** - Envío de emails
- [ ] **Users** - Gestión de usuarios

## 🏗️ Estructura NestJS

```
apps/backend-nest/
├── src/
│   ├── analytics/           # ✅ Migrado
│   │   ├── analytics.controller.ts
│   │   ├── analytics.service.ts
│   │   └── analytics.module.ts
│   ├── health/             # ✅ Implementado
│   │   ├── health.controller.ts
│   │   └── health.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
└── tsconfig.json
```

## 🔧 Configuración

### Variables de Entorno
```bash
# Express Backend
PORT=3001

# NestJS Backend  
PORT=3002
```

### CORS
Ambos backends están configurados para aceptar requests desde:
- `http://localhost:3000` (Frontend)
- `http://localhost:3001` (Express)
- `http://localhost:3002` (NestJS)

## 🧪 Testing

### Tests Unitarios
```bash
# Express
cd apps/backend && pnpm test

# NestJS
cd apps/backend-nest && pnpm test
```

### Tests de Integración
```bash
# Probar endpoints
curl http://localhost:3001/api/health  # Express
curl http://localhost:3002/api/health  # NestJS
```

## 📈 Ventajas de NestJS

### ✅ Beneficios
- **TypeScript First** - Mejor tipado y DX
- **Decorators** - Código más limpio y declarativo
- **Dependency Injection** - Arquitectura más modular
- **Built-in Validation** - Con class-validator
- **OpenAPI/Swagger** - Documentación automática
- **Testing** - Mejor soporte para tests
- **Performance** - Más eficiente que Express

### 🔄 Compatibilidad
- **APIs idénticas** - Mismos endpoints y respuestas
- **Zero Downtime** - Migración sin interrupciones
- **Rollback Fácil** - Express sigue funcionando
- **A/B Testing** - Probar ambos backends

## 🚨 Consideraciones

### ⚠️ Importante
- **No romper APIs existentes** - Mantener compatibilidad
- **Tests obligatorios** - Cada módulo migrado debe tener tests
- **Performance** - Verificar que NestJS sea igual o mejor
- **Documentación** - Actualizar docs con cambios

### 🔒 Seguridad
- **Mismos middlewares** - Auth, rate limiting, etc.
- **Validación** - Usar class-validator en NestJS
- **Logging** - Mantener logs estructurados

## 🎯 Próximos Pasos

1. **Migrar Auth Module** - Autenticación y JWT
2. **Agregar Validación** - DTOs y class-validator
3. **Implementar Logging** - Pino en NestJS
4. **Configurar Supabase** - Conexión a base de datos
5. **Tests E2E** - Validar funcionalidad completa

## 📞 Soporte

Para dudas sobre la migración:
- Revisar este documento
- Consultar logs de ambos backends
- Probar endpoints en paralelo
- Verificar tests unitarios

---

**¡STRATO ahora tiene el poder de dos backends! 🚀** 