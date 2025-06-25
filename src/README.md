# Billing Module – STRATO Backend

Este módulo implementa la lógica de billing y suscripciones usando Stripe.

## Endpoints principales
- `POST /api/billing/checkout` – Crear sesión de pago
- `POST /api/billing/webhook` – Recibir webhooks de Stripe
- `GET /api/billing/subscription` – Validar estado de suscripción

## Estructura
- `billing.service.ts` – Lógica principal de integración con Stripe
- `billing.controller.ts` – Controlador de endpoints
- `billing.routes.ts` – Rutas del módulo
- `types.ts` – Tipos de datos de billing
- `utils.ts` – Utilidades y helpers
- `config.ts` – Configuración de planes y precios
- `README.md` – Documentación del módulo

## Ejemplo de uso
```ts
import { BillingService } from './services/billing.service';
const session = await BillingService.createCheckoutSession({
  userId: 'user_123',
  priceId: 'price_abc',
  successUrl: 'https://tuapp.com/success',
  cancelUrl: 'https://tuapp.com/cancel',
});
```

## Checklist de validación
- [x] Estructura y archivos según plantilla
- [x] Lint sin errores
- [x] Typecheck sin errores
- [x] Tests unitarios y de integración pasan
- [x] Documentación técnica (README)
- [x] Workarounds documentados (si aplica)
- [x] Commit en main

> Actualiza este README tras cada avance relevante. El objetivo es tener el módulo 100% validado y listo para producción. 