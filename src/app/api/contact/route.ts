import { NextRequest, NextResponse } from 'next/server';

import {
  CONTACT_EMAIL_FROM,
  CONTACT_EMAIL_FROM_NAME,
  CONTACT_EMAIL_TO,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  STATICFORMS_ACCESS_KEY,
  STATICFORMS_ENDPOINT,
} from '@/lib/email-config';

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function buildTextMessage(formData: Record<string, unknown>): string {
  const name = normalizeString(formData.name || formData.firstName || formData.nome);
  const email = normalizeString(formData.email || formData.replyTo);
  const phone = normalizeString(formData.phone || formData.whatsapp);
  const message = normalizeString(formData.message);

  const lines = [
    `Nome: ${name || 'Não informado'}`,
    `E-mail: ${email || 'Não informado'}`,
    `Telefone: ${phone || 'Não informado'}`,
    '',
    'Mensagem:',
    message || 'Sem mensagem.',
  ];

  return lines.join('\n');
}

function buildHtmlMessage(formData: Record<string, unknown>): string {
  const name = normalizeString(formData.name || formData.firstName || formData.nome);
  const email = normalizeString(formData.email || formData.replyTo);
  const phone = normalizeString(formData.phone || formData.whatsapp);
  const message = normalizeString(formData.message);

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">Nova mensagem do formulário de contato</h2>
      <p><strong>Nome:</strong> ${name || 'Não informado'}</p>
      <p><strong>E-mail:</strong> ${email || 'Não informado'}</p>
      <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
      <hr style="margin: 16px 0;" />
      <p><strong>Mensagem:</strong></p>
      <p>${(message || 'Sem mensagem.').replace(/\n/g, '<br />')}</p>
    </div>
  `;
}

function extractContactPayload(rawBody: unknown): Record<string, unknown> {
  const body =
    rawBody && typeof rawBody === 'object' && !Array.isArray(rawBody)
      ? (rawBody as Record<string, unknown>)
      : {};

  const nestedFormData =
    body.formData && typeof body.formData === 'object' && !Array.isArray(body.formData)
      ? (body.formData as Record<string, unknown>)
      : undefined;

  const payload = nestedFormData ?? body;
  const name = normalizeString(payload.name || payload.firstName || payload.nome);

  return {
    ...payload,
    name,
    email: normalizeString(payload.email || payload.replyTo),
    phone: normalizeString(payload.phone || payload.whatsapp),
    message: normalizeString(payload.message),
    subject: normalizeString(payload.subject) || `Contato via site: ${name || 'Cliente'}`,
    replyTo: normalizeString(payload.replyTo || payload.email),
  };
}

export async function POST(request: NextRequest) {
  let rawBody: unknown = {};

  try {
    rawBody = await request.json();
  } catch {
    rawBody = {};
  }

  const formData = extractContactPayload(rawBody);

  const name = normalizeString(formData.name || formData.firstName || formData.nome);
  const email = normalizeString(formData.email || formData.replyTo);
  const phone = normalizeString(formData.phone || formData.whatsapp);
  const message = normalizeString(formData.message);
  const subject =
    normalizeString(formData.subject) ||
    `Novo contato pelo site - ${name || 'Cliente'}`;
  const replyTo = normalizeString(formData.replyTo || formData.email);
  const cleanFormData = {
    name,
    email,
    phone,
    message,
    subject,
    replyTo,
  };

  console.log('[contact-api] payload', {
    name,
    email,
    phone,
    subject,
    replyTo,
    message,
    hasResendKey: Boolean(RESEND_API_KEY && RESEND_API_KEY.trim()),
  });

  const toEmail = CONTACT_EMAIL_TO || 'contato@devsolar.com.br';
  const fromEmail = RESEND_FROM_EMAIL || CONTACT_EMAIL_FROM || 'contato@devsolar.com.br';
  const senderName = CONTACT_EMAIL_FROM_NAME || 'Dev Solar';
  const fromAddress =
    fromEmail.includes('<') && fromEmail.includes('>')
      ? fromEmail
      : `${senderName} <${fromEmail}>`;

  const shouldUseResend = Boolean(
    RESEND_API_KEY && RESEND_API_KEY.trim() && RESEND_API_KEY.trim() !== STATICFORMS_ACCESS_KEY,
  );

  if (shouldUseResend) {
    try {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [toEmail],
          replyTo: replyTo || fromEmail,
          subject: subject.replace(/\s+/g, ' ').trim(),
          text: buildTextMessage(cleanFormData),
          html: buildHtmlMessage(cleanFormData),
        }),
      });

      const resendData = await resendResponse.json().catch(() => ({}));

      if (!resendResponse.ok) {
        return NextResponse.json(
          {
            success: false,
            error: (resendData as { message?: string }).message || 'service_error',
          },
          { status: 500 },
        );
      }

      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : 'service_error',
        },
        { status: 500 },
      );
    }
  }

  try {
    const body = new URLSearchParams();
    body.set('accessKey', STATICFORMS_ACCESS_KEY);
    body.set('name', name || 'Contato');
    body.set('email', email || '');
    body.set('phone', phone || '');
    body.set('message', buildTextMessage(cleanFormData));
    body.set('subject', subject);
    if (replyTo) {
      body.set('replyTo', replyTo);
    }

    const response = await fetch(STATICFORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
      },
      body,
    });

    const responseBody = await response.json().catch(() => ({}));

    console.log('[contact-api] staticforms response', {
      status: response.status,
      ok: response.ok,
      body: responseBody,
    });

    return NextResponse.json({
      success: response.ok && responseBody.success !== false,
      message: responseBody.message || 'Form submitted successfully',
      error: responseBody.error || undefined,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'service_error',
      },
      { status: 500 },
    );
  }
}
