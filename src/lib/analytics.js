const isBrowser = typeof window !== 'undefined';

function getGtag() {
  if (!isBrowser) return null;
  return typeof window.gtag === 'function' ? window.gtag : null;
}

export function trackEvent(eventName, params = {}) {
  const gtag = getGtag();
  if (!gtag || !eventName) return;

  gtag('event', eventName, params);
}

export function trackWhatsAppClick(location, label = 'whatsapp_contact') {
  trackEvent('contact_click', {
    contact_channel: 'whatsapp',
    location,
    label,
  });
}
