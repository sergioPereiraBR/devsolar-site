const CACHE_NAME = 'devsolar-shell-v3';
const PRECACHE_URLS = ['/', '/manifest.json', '/images/favicon.ico'];
const CACHEABLE_DESTINATIONS = new Set([
  'document',
  'font',
  'image',
  'script',
  'style',
]);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName.startsWith('devsolar-shell-') &&
                cacheName !== CACHE_NAME,
            )
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function cacheResponse(request, response) {
  if (!response || response.type !== 'basic' || response.status !== 200) {
    return response;
  }

  const clone = response.clone();
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, clone);
  return response;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.ok) {
            await cacheResponse(request, networkResponse);
          }
          return networkResponse;
        } catch (error) {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;

          const fallbackHome = await caches.match('/');
          if (fallbackHome) return fallbackHome;

          return Response.error();
        }
      })(),
    );
    return;
  }

  if (!CACHEABLE_DESTINATIONS.has(request.destination)) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then((networkResponse) => {
        if (!networkResponse || !networkResponse.ok) return networkResponse;
        return cacheResponse(request, networkResponse);
      });
    }),
  );
});
