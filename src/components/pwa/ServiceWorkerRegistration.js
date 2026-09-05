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

    let isCancelled = false;
    let hasReloadedForUpdate = false;
    let cleanup = () => {};

    const refreshRegistration = async () => {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (!registration) return;
        await registration.update();
      } catch (error) {
        console.warn('PWA: falha ao verificar atualização do serviço.', error);
      }
    };

    const handleFocusOrOnline = () => {
      if (!isCancelled) {
        refreshRegistration();
      }
    };

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });

        if (isCancelled) {
          return;
        }

        const onUpdateFound = () => {
          if (!registration.waiting || hasReloadedForUpdate) {
            return;
          }

          hasReloadedForUpdate = true;
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
        window.addEventListener('focus', handleFocusOrOnline);
        window.addEventListener('online', handleFocusOrOnline);

        const intervalId = window.setInterval(() => {
          refreshRegistration();
        }, 60000);

        cleanup = () => {
          isCancelled = true;
          registration.removeEventListener('updatefound', onUpdateFound);
          document.removeEventListener('visibilitychange', onVisibilityChange);
          window.removeEventListener('focus', handleFocusOrOnline);
          window.removeEventListener('online', handleFocusOrOnline);
          window.clearInterval(intervalId);
        };
      } catch (error) {
        console.warn('PWA: falha ao registrar service worker.', error);
      }
    };

    registerServiceWorker();

    return () => {
      cleanup();
    };
  }, []);

  return null;
}
