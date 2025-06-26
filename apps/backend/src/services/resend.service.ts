export class ResendService {
  static async sendEmail(
    to: string,
    subject: string,
  ): Promise<{ ok: boolean; message: string }> {
    // Aquí se integraría la lógica real con la API de Resend
    // Mock: simular envío de email
    return {
      ok: true,
      message: `Email enviado a ${to} con asunto '${subject}'`,
    }
  }
}
