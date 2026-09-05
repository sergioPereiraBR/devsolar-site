'use client';

import { useEffect, useState } from 'react';

export default function PwaRecoveryNotice() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleRecoveryNeeded = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string }>;
      const detail = customEvent?.detail ?? {};
      const nextMessage =
        typeof detail.message === 'string'
          ? detail.message
          : 'O PWA do DEV Solar ficou com estado antigo e não conseguiu se recuperar automaticamente. Limpe os dados do site no navegador ou remova o atalho do aplicativo e reinstale.';

      setMessage(nextMessage);
      setVisible(true);
    };

    window.addEventListener(
      'devsolar-pwa-recovery-needed',
      handleRecoveryNeeded as EventListener,
    );

    return () => {
      window.removeEventListener(
        'devsolar-pwa-recovery-needed',
        handleRecoveryNeeded as EventListener,
      );
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: '16px',
        right: '16px',
        bottom: '16px',
        zIndex: 9999,
        background: '#111827',
        color: '#f9fafb',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
        padding: '14px 16px',
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '6px' }}>
        Aplicativo travado
      </div>
      <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{message}</div>
    </div>
  );
}
