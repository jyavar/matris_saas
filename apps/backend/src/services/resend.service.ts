export class ResendService {
  async sendEmail(
    to: string,
    subject: string,
    html?: string,
  ): Promise<{ ok: boolean; message: string }> {
    // Aquí se integraría la lógica real con la API de Resend
    // Mock: simular envío de email
    return {
      ok: true,
      message: `Email enviado a ${to} con asunto '${subject}'`,
    }
  }

  async sendTemplate(
    to: string,
    templateId: string,
    data: Record<string, any>,
  ): Promise<{ ok: boolean; message: string }> {
    // Mock: simular envío de template
    return {
      ok: true,
      message: `Template ${templateId} enviado a ${to}`,
    }
  }
}

export const resendService = new ResendService()
