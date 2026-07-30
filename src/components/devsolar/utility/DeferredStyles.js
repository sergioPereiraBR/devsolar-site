'use client';

import { useEffect } from 'react';

const STYLESHEETS = [
  '/vendor/bootstrap/bootstrap.min.css',
  '/vendor/fontawesome/styles.css',
];

function injectStylesheet(href) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`link[href="${href}"]`);

    if (existing) {
      if (existing.sheet) {
        resolve();
        return;
      }

      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error(href)), {
        once: true,
      });
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'all';
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => reject(new Error(href)), {
      once: true,
    });

    document.head.appendChild(link);
  });
}

export default function DeferredStyles() {
  useEffect(() => {
    if (document.querySelector('link[href*="bootstrap.min.css"]')) {
      return;
    }

    const startLoading = () => {
      STYLESHEETS.forEach((href) => injectStylesheet(href));
    };

    if ('requestIdleCallback' in window) {
      const idleHandle = window.requestIdleCallback(startLoading, {
        timeout: 1500,
      });

      return () => window.cancelIdleCallback(idleHandle);
    }

    const timeoutId = window.setTimeout(startLoading, 150);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
