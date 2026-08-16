'use client';

import { useEffect, useState } from 'react';

import { trackEvent } from '@/lib/analytics';

// Aceita o email como prop (com um valor padrão opcional)
export function SafeEmailLink({
  email: contactEmail = 'comercial@devsolar.com.br',
  className = '',
  contact_channel = 'email',
  location = 'footer',
  label = 'footer_email',
  form_type = 'footer',
}) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(contactEmail);
  }, [contactEmail]);

  if (!email) return null;

  return (
    <a
      href={`mailto:${email}`}
      rel="noopener noreferrer nofollow"
      className={className}
      aria-label={`Enviar e-mail para DEV Solar: ${email}`}
      onClick={() =>
        trackEvent('contact_click', {
          contact_channel: `${contact_channel}`,
          location: `${location}`,
          label: `${label}`,
          form_type: `${form_type}`,
        })
      }
    >
      {' '}
      {email}
    </a>
  );
}

// Exemplo de chamada no Footer:
// <SafeEmailLink email="comercial@devsolar.com.br" />
