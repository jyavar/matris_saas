# 🚀 STRATO Landing Page

Landing page profesional para STRATO Core OS™ - Plataforma de desarrollo con AI agents.

## 📁 Estructura del Proyecto

```
matriz_cursor/
├── apps/                    # ✅ Aplicaciones existentes (sin cambios)
│   ├── backend/            # Puerto 3001 ✅
│   ├── backend-nest/       # Puerto 3002 ✅
│   ├── frontend/           # Puerto 3000 ✅
│   └── web/               # Puerto 3003 ✅
├── landing-page/           # 🆕 Landing page separada
│   └── strato-landing/     # Puerto 3004 🆕
└── [resto de archivos]     # ✅ Sin cambios
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño
- **Lucide React** - Iconos
- **Framer Motion** - Animaciones
- **Headless UI** - Componentes accesibles

## 🚀 Desarrollo

### Instalar Dependencias
```bash
cd landing-page/strato-landing
npm install
```

### Ejecutar en Desarrollo
```bash
npm run dev
# Disponible en: http://localhost:3004
```

### Build de Producción
```bash
npm run build
npm start
```

## 🎨 Características del Diseño

### Hero Section
- **Gradiente moderno** - Azul a púrpura
- **Tipografía impactante** - Títulos grandes
- **CTAs claros** - "Get Started Free" y "View Marketplace"
- **Iconos profesionales** - Lucide React

### Stats Section
- **Métricas reales** - GitHub stars, agents, líneas de código
- **Diseño responsive** - Grid adaptativo
- **Animaciones sutiles** - Hover effects

### Features Section
- **6 características principales** - Cards con iconos
- **Gradientes únicos** - Cada feature tiene su color
- **Backdrop blur** - Efecto glassmorphism
- **Hover interactions** - Transiciones suaves

### CTA Section
- **Call-to-action final** - Conversión optimizada
- **Botones contrastantes** - Blanco y transparente
- **Mensaje motivacional** - "Ready to Build the Future?"

## 📱 Responsive Design

- **Mobile-first** - Diseño optimizado para móviles
- **Breakpoints** - sm, md, lg, xl
- **Flexible grid** - Adaptación automática
- **Touch-friendly** - Botones y enlaces optimizados

## 🎯 Optimización SEO

### Meta Tags
```html
<title>STRATO Core OS™ - AI-Powered Development Platform</title>
<meta name="description" content="Build, deploy, and monetize AI agents with enterprise-grade architecture. 15+ specialized agents ready for production.">
```

### Estructura Semántica
- **Header** - Navegación principal
- **Main** - Contenido principal
- **Sections** - Secciones bien definidas
- **Footer** - Enlaces y información

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Conectar repositorio a Vercel
# Configurar dominio personalizado
# Deploy automático en push a main
```

### Netlify
```bash
npm run build
# Subir carpeta .next a Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3004
CMD ["npm", "start"]
```

## 🔧 Configuración

### Variables de Entorno
```bash
# .env.local
NEXT_PUBLIC_STRATO_API_URL=http://localhost:3001
NEXT_PUBLIC_STRATO_MARKETPLACE_URL=http://localhost:3004/marketplace
NEXT_PUBLIC_STRATO_DOCS_URL=https://docs.strato.dev
```

### Personalización
- **Colores** - Modificar en `tailwind.config.js`
- **Fuentes** - Configurar en `next.config.js`
- **Iconos** - Reemplazar en `src/app/page.tsx`
- **Contenido** - Editar textos en componentes

## 📊 Analytics

### Google Analytics
```javascript
// _app.tsx
import { GoogleAnalytics } from 'nextjs-google-analytics'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  )
}
```

### PostHog
```javascript
// _app.tsx
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY)
}
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

### Lighthouse
```bash
npm run lighthouse
```

## 🔒 Seguridad

- **HTTPS** - SSL/TLS obligatorio
- **CSP** - Content Security Policy
- **HSTS** - HTTP Strict Transport Security
- **CORS** - Cross-Origin Resource Sharing

## 📈 Performance

### Optimizaciones
- **Image optimization** - Next.js Image component
- **Code splitting** - Lazy loading automático
- **Bundle analysis** - Webpack bundle analyzer
- **CDN** - Content Delivery Network

### Métricas Objetivo
- **LCP** < 2.5s
- **FID** < 100ms
- **CLS** < 0.1
- **TTFB** < 600ms

## 🤝 Contribución

1. **Fork** el repositorio
2. **Create** una rama feature
3. **Commit** tus cambios
4. **Push** a la rama
5. **Open** un Pull Request

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para detalles.

---

**¿Necesitas ayuda?** Contacta al equipo de STRATO en [support@strato.dev](mailto:support@strato.dev) 