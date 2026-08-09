export const STATICFORMS_ENDPOINT =
  process.env.NEXT_PUBLIC_STATICFORMS_ENDPOINT || 'https://api.staticforms.xyz/submit';

export const STATICFORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_STATICFORMS_KEY || 'sf_b14798mng2klecllc3dljkgb';

export const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'contato@devsolar.com.br';
export const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM || 'contato@devsolar.com.br';
export const CONTACT_EMAIL_FROM_NAME = process.env.CONTACT_EMAIL_FROM_NAME || 'Dev Solar';
export const RESEND_API_KEY = process.env.RESEND_API_KEY || 'sf_b14798mng2klecllc3dljkgb';
export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'contato@devsolar.com.br';

export const NEWSLETTER_STATICFORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_NEWSLETTER_STATICFORMS_KEY || STATICFORMS_ACCESS_KEY;

export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  '6LeshiwrAAAAAPVbR8FTS_4l-80ea1G_UyBhZuFk';

const rawRecaptchaEnabled = process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED || process.env.RECAPTCHA_ENABLED;

export const RECAPTCHA_ENABLED =
  rawRecaptchaEnabled === undefined
    ? true
    : ['true', '1', 'yes', 'on'].includes(rawRecaptchaEnabled.toLowerCase());
