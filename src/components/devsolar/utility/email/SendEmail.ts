import { RECAPTCHA_ENABLED, STATICFORMS_ENDPOINT } from '@/lib/email-config';

export type EmailPayload = Record<string, unknown>;

export function serializeForStaticForms(payload: EmailPayload): URLSearchParams {
  const formData = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    const normalizedValue =
      typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
        ? String(value)
        : JSON.stringify(value);

    formData.append(key, normalizedValue);
  });

  return formData;
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
  endpoint = STATICFORMS_ENDPOINT,
  payload,
  headers,
}: SendEmailOptions): Promise<SendEmailResult> {
  const normalizedEndpoint =
    typeof endpoint === 'string' && endpoint.startsWith('/api/') && !endpoint.endsWith('/')
      ? `${endpoint}/`
      : endpoint;

  const isJsonEndpoint = typeof normalizedEndpoint === 'string' && normalizedEndpoint.startsWith('/api/');
  const formBody = isJsonEndpoint
    ? JSON.stringify(payload)
    : serializeForStaticForms(payload);

  const response = await fetch(normalizedEndpoint, {
    method: 'POST',
    body: formBody,
    headers: {
      'accept-charset': 'UTF-8',
      ...(isJsonEndpoint
        ? { 'Content-Type': 'application/json; charset=utf-8' }
        : { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }),
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
  const shouldIncludeCaptcha =
    RECAPTCHA_ENABLED === true &&
    typeof recaptchaToken === 'string' &&
    recaptchaToken.trim().length > 0;

  const normalizedName = [
    formData.firstName,
    formData.lastName,
    formData.name,
    formData.nome,
  ]
    .filter((value): value is string => Boolean(value && value.trim()))
    .join(' ')
    .trim();

  const normalizedEmail = formData.email || formData.replyTo || '';
  const normalizedPhone = formData.phone || formData.whatsapp || '';
  const normalizedMessage = [
    formData.message,
    normalizedPhone ? `Telefone: ${normalizedPhone}` : undefined,
  ]
    .filter((value): value is string => Boolean(value && value.trim()))
    .join('\n\n');

  const payload: EmailPayload = {
    accessKey,
    firstName: formData.firstName || undefined,
    lastName: formData.lastName || undefined,
    name: normalizedName || formData.name || formData.nome || formData.firstName || undefined,
    email: normalizedEmail || undefined,
    phone: normalizedPhone || undefined,
    message: normalizedMessage || formData.message || undefined,
    subject:
      subject ||
      `Contato Site DEV Solar: ${normalizedName || formData.firstName || formData.name || 'Contato'}`,
    ...(replyTo ? { replyTo } : {}),
    ...(redirectTo ? { redirectTo } : {}),
  };

  if (shouldIncludeCaptcha) {
    payload['g-recaptcha-response'] = recaptchaToken;
  }

  const apiEndpoint = endpoint || '/api/contact';

  return sendEmail({ endpoint: apiEndpoint, payload });
}
