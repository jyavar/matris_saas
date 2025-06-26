import { expect, test } from '@playwright/test'

// Ajusta la ruta según tu app (ejemplo: /login)
test('AuthForm: render, input y submit', async ({ page }) => {
  await page.goto('/login')

  // Verifica que el formulario se renderiza
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible()
  await expect(page.getByPlaceholder('Email')).toBeVisible()
  await expect(page.getByPlaceholder('Password')).toBeVisible()
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible()

  // Simula input
  await page.fill('input[placeholder="Email"]', 'test@example.com')
  await page.fill('input[placeholder="Password"]', '123456')

  // Simula submit
  await page.click('button[type="submit"]')

  // Aquí podrías validar un mensaje de éxito, redirección, etc.
  // await expect(page).toHaveURL('/dashboard');
})
