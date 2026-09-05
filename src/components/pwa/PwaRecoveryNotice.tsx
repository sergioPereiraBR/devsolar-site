'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __devsolarPwaRecoveryShown?: boolean;
  }
}

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

      if (window.__devsolarPwaRecoveryShown) {
        return;
      }

      window.__devsolarPwaRecoveryShown = true;
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <div>
          <div style={{ fontWeight: 700, marginBottom: '6px' }}>
            Aplicativo travado
          </div>
          <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{message}</div>
        </div>
        <button
          type="button"
          aria-label="Fechar aviso do aplicativo travado"
          onClick={() => setVisible(false)}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#f9fafb',
            fontSize: '1.2rem',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0',
            marginTop: '2px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
