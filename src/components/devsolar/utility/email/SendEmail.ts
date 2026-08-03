export interface EmailPayload {
  [key: string]: string | number | boolean | undefined | null;
}

export interface SendEmailOptions {
  endpoint?: string;
  payload: EmailPayload;
  headers?: Record<string, string>;
}

export interface SendEmailResult {
  ok: boolean;
  success: boolean;
  status: number | null;
  message?: string;
  error?: string;
}

export async function sendEmail({
  endpoint = 'https://api.staticforms.xyz/submit',
  payload,
  headers,
}: SendEmailOptions): Promise<SendEmailResult> {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'accept-charset': 'UTF-8',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
  });

  let result: Record<string, unknown> = {};

  try {
    result = (await response.json()) as Record<string, unknown>;
  } catch {
    result = {};
  }

  const success = response.ok && result.success !== false;
  const errorMessage =
    (typeof result.error === 'string' && result.error) ||
    (typeof result.message === 'string' && result.message) ||
    (response.ok ? undefined : 'service_error');

  return {
    ok: response.ok,
    success,
    status: response.status,
    message:
      typeof result.message === 'string'
        ? result.message
        : success
          ? 'Form submitted successfully'
          : undefined,
    error: errorMessage,
  };
}

export interface SendContactEmailOptions {
  formData: Record<string, string>;
  accessKey: string;
  recaptchaToken?: string;
  endpoint?: string;
  subject?: string;
  replyTo?: string;
  redirectTo?: string;
}

export async function sendContactEmail({
  formData,
  accessKey,
  recaptchaToken,
  endpoint,
  subject,
  replyTo,
  redirectTo,
}: SendContactEmailOptions): Promise<SendEmailResult> {
  const payload: EmailPayload = {
    ...formData,
    accessKey,
    subject:
      subject ||
      `Contato Site DEV Solar: ${formData.firstName || formData.name || 'Contato'}`,
    ...(replyTo ? { replyTo } : {}),
    ...(redirectTo ? { redirectTo } : {}),
    ...(recaptchaToken ? { 'g-recaptcha-response': recaptchaToken } : {}),
  };

  return sendEmail({ endpoint, payload });
}
