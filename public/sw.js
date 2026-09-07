const CACHE_NAME = 'devsolar-shell-v5';
const PRECACHE_URLS = ['/', '/manifest.json', '/images/favicon.ico'];
const CACHEABLE_DESTINATIONS = new Set([
  'document',
  'font',
  'image',
  'script',
  'style',
  'worker',
  'manifest',
  'audio',
  'video',
]);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(async (cache) => {
        for (const url of PRECACHE_URLS) {
          try {
            await cache.add(url);
          } catch (error) {
            // Ignora URLs indisponíveis no momento da instalação.
          }
        }
      })
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

  try {
    const clone = response.clone();
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, clone);
  } catch (error) {
    // Ignora falha de escrita em cache do navegador.
  }

  return response;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigationRequest =
    request.mode === 'navigate' || request.destination === 'document';
  const isStaticAssetRequest =
    CACHEABLE_DESTINATIONS.has(request.destination) ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname.startsWith('/vendor/');

  if (isNavigationRequest) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.ok) {
            await cacheResponse(request, networkResponse);
          }
          return networkResponse;
        } catch (error) {
          const cachedPage =
            (await caches.match(request)) || (await caches.match('/'));

          if (cachedPage) return cachedPage;

          return Response.error();
        }
      })(),
    );
    return;
  }

  if (!isStaticAssetRequest) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || !networkResponse.ok) {
            return networkResponse;
          }
          return cacheResponse(request, networkResponse);
        })
        .catch(() => Response.error());
    }),
  );
});
