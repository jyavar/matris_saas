import { expect, test } from '@playwright/test'

// Mock manual de supabase para E2E (solo en entorno de test)
const mockSupabase = {
  auth: {
    signInWithPassword: async () => ({ error: null }),
    getSession: async () => ({
      data: {
        session: { user: { id: 'mock-user', email: 'test@example.com' } },
      },
    }),
    onAuthStateChange: () => ({
      data: {
        subscription: { unsubscribe: () => {} },
      },
    }),
  },
}

// @ts-expect-error: mockSupabase no está tipado globalmente, solo para E2E
window.supabase = mockSupabase

// Ajusta la ruta según tu app (ejemplo: /login)
test('AuthForm: login exitoso y acceso a profile', async ({ page }) => {
  await page.goto('http://localhost:3001/login')

  // Verifica que el formulario se renderiza
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible()
  await expect(page.getByLabel('Email:')).toBeVisible()
  await expect(page.getByLabel('Password:')).toBeVisible()
  await expect(page.getByRole('button', { name: /log in/i })).toBeVisible()

  // Simula input
  await page.fill('input[type="email"]', 'test@example.com')
  await page.fill('input[type="password"]', '123456')

  // Simula submit
  await page.click('button[type="submit"]')

  // Espera redirección a profile
  await page.waitForURL('http://localhost:3001/profile', { timeout: 5000 })
  await expect(page).toHaveURL('http://localhost:3001/profile')

  // Verifica acceso a profile o sección clave
  await expect(page.getByRole('heading', { name: /profile/i })).toBeVisible()
  // await expect(page.getByText('Campañas')).toBeVisible() // Descomenta si aplica

  // Mensaje claro si falla
  // Si el login falla o no hay redirección, el test fallará automáticamente
})
