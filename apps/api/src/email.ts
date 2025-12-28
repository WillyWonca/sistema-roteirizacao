import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendResetEmail(to: string, token: string) {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const link = `${frontendUrl}/reset-password?token=${token}`;

  const from = process.env.FROM_EMAIL || "onboarding@resend.dev";

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject: "Recuperação de senha - Sistema de Roteirização",
      html: `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0b1220; color: #e5e7eb; padding: 24px;">
          <div style="max-width: 480px; margin: 0 auto; background: #020617; border-radius: 12px; border: 1px solid #1e293b; padding: 24px;">
            <h1 style="font-size: 20px; margin: 0 0 12px 0; color: #e5e7eb;">
              Recuperação de senha
            </h1>

            <p style="margin: 0 0 8px 0; color: #cbd5f5;">
              Recebemos uma solicitação para redefinir a senha da sua conta.
            </p>

            <p style="margin: 0 0 16px 0; color: #9ca3af;">
              Se foi você, clique no botão abaixo para criar uma nova senha.
            </p>

            <p style="margin: 0 0 24px 0; text-align: center;">
              <a href="${link}"
                style="
                  display: inline-block;
                  background: #22c55e;
                  color: #0b1120;
                  padding: 10px 18px;
                  border-radius: 999px;
                  text-decoration: none;
                  font-weight: 600;
                  font-size: 14px;
                ">
                Redefinir senha
              </a>
            </p>

            <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 13px;">
              Se o botão não funcionar, copie e cole o link abaixo no navegador:
            </p>

            <code style="
              display: block;
              padding: 10px 12px;
              background: #020617;
              border-radius: 8px;
              border: 1px solid #1f2937;
              color: #e5e7eb;
              font-size: 12px;
              word-break: break-all;
              margin-bottom: 16px;
            ">
              ${link}
            </code>

            <p style="margin: 0 0 4px 0; color: #9ca3af; font-size: 12px;">
              • Este link é válido por <strong>1 hora</strong>.
            </p>
            <p style="margin: 0 0 16px 0; color: #9ca3af; font-size: 12px;">
              • Se você não fez esta solicitação, pode ignorar este e-mail.
            </p>

            <p style="margin: 0; color: #6b7280; font-size: 11px; text-align: center;">
              Sistema de Roteirização
            </p>
          </div>
        </div>
      `,
    });

    console.log("📨 Resend response:", result);
  } catch (err) {
    console.error("❌ Erro ao enviar e-mail de reset:", err);
  }
}
export async function sendTwoFactorEmail(to: string, code: string) {
  const from = process.env.FROM_EMAIL || "onboarding@resend.dev";

  await resend.emails.send({
    from,
    to,
    subject: "Código de verificação (2FA)",
    html: `
      <div style="font-family: Arial; max-width: 480px">
        <h2>Verificação em duas etapas</h2>
        <p>Use o código abaixo para concluir seu login:</p>

        <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 4px;
          margin: 12px 0;
        ">${code}</div>

        <p>Este código expira em 10 minutos.</p>
      </div>
    `,
  });
}

