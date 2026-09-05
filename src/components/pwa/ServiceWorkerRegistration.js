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

    const handleControllerChange = () => {
      if (!isCancelled) {
        window.location.reload();
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
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        };

        registration.addEventListener('updatefound', onUpdateFound);
        navigator.serviceWorker.addEventListener(
          'controllerchange',
          handleControllerChange,
        );
        window.addEventListener('focus', handleFocusOrOnline);
        window.addEventListener('online', handleFocusOrOnline);

        const intervalId = window.setInterval(() => {
          refreshRegistration();
        }, 60000);

        cleanup = () => {
          isCancelled = true;
          registration.removeEventListener('updatefound', onUpdateFound);
          navigator.serviceWorker.removeEventListener(
            'controllerchange',
            handleControllerChange,
          );
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
