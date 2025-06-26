import { z } from 'zod'

export const onboardingSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

export class OnboardingService {
  static async registerUser(data: {
    email: string
    name: string
  }): Promise<{ ok: boolean; message: string }> {
    // Aquí se integraría la lógica real de persistencia y Resend
    // Mock: simular registro y envío de email
    return {
      ok: true,
      message: `Usuario ${data.name} registrado y email enviado a ${data.email}`,
    }
  }
}
