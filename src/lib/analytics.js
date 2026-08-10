const isBrowser = typeof window !== 'undefined';

function getGtag() {
  if (!isBrowser) return null;
  return typeof window.gtag === 'function' ? window.gtag : null;
}

function getDataLayer() {
  if (!isBrowser) return null;
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  return window.dataLayer;
}

function queueGtagCall(command, ...args) {
  if (!isBrowser) return;

  const gtag = getGtag();
  if (gtag) {
    gtag(command, ...args);
    return;
  }

  const dataLayer = getDataLayer();
  if (dataLayer) {
    dataLayer.push([command, ...args]);
  }
}

function sanitizeParams(params = {}) {
  if (!params || typeof params !== 'object') return {};

  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value === undefined || value === null || value === '') {
      return acc;
    }

    acc[key] = value;
    return acc;
  }, {});
}

function normalizeText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getElementLabel(element) {
  if (!element) return null;

  const explicitLabel = element.getAttribute('data-analytics-label');
  if (explicitLabel) return normalizeText(explicitLabel);

  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return normalizeText(ariaLabel);

  const title = element.getAttribute('title');
  if (title) return normalizeText(title);

  const alt = element.getAttribute('alt');
  if (alt) return normalizeText(alt);

  const text = normalizeText(element.textContent || '');
  if (text) return text;

  return null;
}

function getElementContext(element) {
  if (!element) return {};

  const location =
    element.getAttribute('data-analytics-location') ||
    element.getAttribute('data-location') ||
    element
      .closest('[data-analytics-location]')
      ?.getAttribute('data-analytics-location') ||
    element.closest('[data-location]')?.getAttribute('data-location') ||
    null;

  const section =
    element.getAttribute('data-analytics-section') ||
    element
      .closest('[data-analytics-section]')
      ?.getAttribute('data-analytics-section') ||
    null;

  return {
    location,
    section,
  };
}

function isInteractiveElement(element) {
  if (!element || element.closest('[data-analytics-ignore="true"]'))
    return false;

  const tagName = element.tagName?.toLowerCase();
  const role = element.getAttribute('role');
  const tabIndex = element.getAttribute('tabindex');

  if (
    ['a', 'button', 'input', 'select', 'textarea', 'summary'].includes(tagName)
  ) {
    return true;
  }

  if (['button', 'link', 'menuitem'].includes(role)) {
    return true;
  }

  if (tagName === 'label' || tagName === 'option' || tabIndex === '0') {
    return true;
  }

  return Boolean(element.getAttribute('onclick'));
}

function initGlobalClickTracking() {
  if (!isBrowser || typeof document === 'undefined') return;
  if (window.__devsolarAnalyticsInitialized) return;

  window.__devsolarAnalyticsInitialized = true;

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!target || !(target instanceof Element)) return;

      const interactiveElement = target.closest(
        'a, button, input, select, textarea, summary, [role="button"], [role="link"], [role="menuitem"], [onclick], [tabindex="0"]',
      );
      if (!interactiveElement || !isInteractiveElement(interactiveElement))
        return;

      const label = getElementLabel(interactiveElement);
      const context = getElementContext(interactiveElement);
      const href = interactiveElement.getAttribute('href') || null;
      const id = interactiveElement.getAttribute('id') || null;
      const className = interactiveElement.getAttribute('class') || null;

      trackEvent('user_click', {
        element: interactiveElement.tagName?.toLowerCase(),
        label,
        href,
        id,
        class_name: className,
        location: context.location,
        section: context.section,
        path: window.location?.pathname || null,
      });
    },
    true,
  );
}

export function trackEvent(eventName, params = {}) {
  if (!eventName) return;

  queueGtagCall('event', eventName, sanitizeParams(params));
}

export function trackWhatsAppClick(location, label = 'whatsapp_contact') {
  trackEvent('contact_click', {
    contact_channel: 'whatsapp',
    location,
    label,
  });
}

if (isBrowser) {
  initGlobalClickTracking();
}
