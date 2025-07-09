/* eslint-disable @typescript-eslint/no-unused-vars */

// Define tipos estrictos para los datos del template
interface TemplateData {
  [key: string]: string | number | boolean | null | undefined
}

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
    data: TemplateData,
  ): Promise<{ ok: boolean; message: string }> {
    // Mock: simular envío de template
    return {
      ok: true,
      message: `Template ${templateId} enviado a ${to}`,
    }
  }
}

export const resendService = new ResendService()
