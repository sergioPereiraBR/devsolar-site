'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' ||
      !('serviceWorker' in navigator)
    ) {
      return;
    }

    const manualRecoveryMessage =
      'O PWA do DEV Solar ficou com estado antigo e não conseguiu se recuperar automaticamente. ' +
      'Limpe os dados do site no navegador ou remova o atalho do aplicativo e reinstale.';

    let hasAttemptedRecovery = false;

    const showManualRecoveryNotice = () => {
      if (typeof window === 'undefined') return;
      if (window.__devsolarPwaRecoveryShown) return;
      window.__devsolarPwaRecoveryShown = true;
      console.warn(manualRecoveryMessage);
      window.dispatchEvent(
        new CustomEvent('devsolar-pwa-recovery-needed', {
          detail: { message: manualRecoveryMessage },
        }),
      );
    };

    const resetStaleServiceWorker = async () => {
      if (hasAttemptedRecovery) return false;
      hasAttemptedRecovery = true;

      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        if (!registrations.length) return true;

        let didUnregister = false;
        for (const registration of registrations) {
          try {
            const wasActive = Boolean(registration.active);
            await registration.unregister();
            didUnregister = true;
            if (wasActive) {
              return true;
            }
          } catch (error) {
            console.warn('PWA: falha ao limpar worker antigo.', error);
          }
        }

        return didUnregister;
      } catch (error) {
        console.warn('PWA: falha ao inspecionar workers antigos.', error);
        return false;
      }
    };

    const refreshRegistration = async () => {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (!registration) return;
        await registration.update();
      } catch (error) {
        console.warn('PWA: falha ao verificar atualização do serviço.', error);
      }
    };

    const registerServiceWorker = async () => {
      try {
        const didReset = await resetStaleServiceWorker();

        if (didReset) {
          window.location.reload();
          return;
        }

        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });

        const onUpdateFound = () => {
          if (!registration.waiting) return;
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        };

        registration.addEventListener('updatefound', onUpdateFound);

        const onVisibilityChange = () => {
          if (!document.hidden) {
            refreshRegistration();
          }
        };

        document.addEventListener('visibilitychange', onVisibilityChange);
        window.addEventListener('focus', refreshRegistration);
        window.addEventListener('online', refreshRegistration);

        const intervalId = window.setInterval(() => {
          refreshRegistration();
        }, 60000);

        return () => {
          registration.removeEventListener('updatefound', onUpdateFound);
          document.removeEventListener('visibilitychange', onVisibilityChange);
          window.removeEventListener('focus', refreshRegistration);
          window.removeEventListener('online', refreshRegistration);
          window.clearInterval(intervalId);
        };
      } catch (error) {
        console.warn('PWA: falha ao registrar service worker.', error);
        showManualRecoveryNotice();
      }
    };

    let cleanup = () => {};
    const registrationAttempt = registerServiceWorker();

    if (registrationAttempt && typeof registrationAttempt.then === 'function') {
      registrationAttempt.then((nextCleanup) => {
        cleanup = typeof nextCleanup === 'function' ? nextCleanup : () => {};
      });
    }

    return () => {
      cleanup();
    };
  }, []);

  return null;
}
