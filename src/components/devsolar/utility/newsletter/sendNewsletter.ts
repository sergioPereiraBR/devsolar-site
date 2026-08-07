import { serializeForStaticForms } from '@/components/devsolar/utility/email/SendEmail';
import { STATICFORMS_ENDPOINT } from '@/lib/email-config';

export interface NewsletterSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
  status?: number;
}

export interface SendNewsletterOptions {
  email: string;
  accessKey: string;
  subject?: string;
  replyTo?: string;
  endpoint?: string;
}

export async function sendNewsletter({
  email,
  accessKey,
  subject,
  replyTo,
  endpoint = STATICFORMS_ENDPOINT,
}: SendNewsletterOptions): Promise<NewsletterSubmissionResult> {
  const payload = {
    accessKey,
    email,
    subject: subject ?? `Nova Inscrição Newsletter DEV Solar: ${email}`,
    ...(replyTo ? { replyTo } : {}),
  };

  const formBody = serializeForStaticForms(payload);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formBody,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Accept: 'application/json',
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
    success,
    message: typeof result.message === 'string' ? result.message : undefined,
    error: errorMessage,
    status: response.status,
  };
}
