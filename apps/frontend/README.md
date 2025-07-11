# STRATO Core OS™ - Frontend

Este es el frontend de STRATO Core OS™, una plataforma SaaS enterprise-grade construida con Next.js 15, TypeScript, Tailwind CSS y Supabase.

## 🚀 Getting Started

### Prerrequisitos

- Node.js 20+
- pnpm (recomendado) o npm
- Backend de STRATO corriendo en `http://localhost:3001`
- Configuración de Supabase

### Instalación

1. **Instalar dependencias:**
```bash
pnpm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de Supabase y configuración de API.

### Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase | Requerido |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase | Requerido |
| `NEXT_PUBLIC_API_URL` | URL del backend STRATO | `http://localhost:3001` |
| `NEXT_PUBLIC_ENABLE_SETTINGS` | Habilitar módulo Settings | `true` |
| `NEXT_PUBLIC_ENABLE_MSW` | Habilitar MSW para tests | `false` |

### Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Linting
pnpm lint

# Tests
pnpm test
pnpm test:coverage
```

## 🏗️ Arquitectura

### Módulos Principales

- **Settings**: Gestión de preferencias de usuario, equipo y sistema
- **Analytics**: Dashboard y reportes de métricas
- **Billing**: Gestión de pagos y suscripciones
- **Auth**: Autenticación y autorización con Supabase

### Integración Backend

El frontend se conecta al backend de STRATO a través de la variable `NEXT_PUBLIC_API_URL`. Todos los servicios (Settings, Analytics, Billing) usan esta URL base para las peticiones HTTP.

**Ejemplo de integración Settings:**
```typescript
// apps/frontend/src/services/settings.service.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Las peticiones se hacen a: ${API_BASE_URL}/api/settings/user
```

### Autenticación

- **Supabase Auth**: JWT tokens para autenticación
- **Context API**: Estado global de autenticación
- **Protección de rutas**: Middleware para rutas protegidas

## 🧪 Testing

### Tests Unitarios
```bash
pnpm test
```

### Tests de Cobertura
```bash
pnpm test:coverage
```

### Tests E2E (Playwright)
```bash
pnpm test:e2e
```

## 📦 Build y Deploy

### Build de Producción
```bash
pnpm build
```

### Deploy en Vercel
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Deploy automático en cada push a `main`

## 🔧 Configuración Avanzada

### MSW (Mock Service Worker)
Para desarrollo y testing, puedes habilitar MSW:

```bash
# En .env
NEXT_PUBLIC_ENABLE_MSW=true
```

### Debug Logs
```bash
# En .env
NEXT_PUBLIC_ENABLE_DEBUG_LOGS=true
```

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [STRATO Core OS™ Documentation](../README.md)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contribución

1. Fork el repositorio
2. Crea una branch para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la branch (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](../LICENSE) para más detalles.
