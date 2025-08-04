// Service Worker for SukiSU-Ultra Documentation
const CACHE_NAME = 'sukisu-ultra-v1';
const urlsToCache = [
  '/',
  '/guide/',
  '/guide/installation',
  '/guide/compatibility',
  '/guide/links',
  '/guide/license',
  '/zh/',
  '/zh/guide/',
  '/zh/guide/installation',
  '/zh/guide/compatibility',
  '/zh/guide/links',
  '/zh/guide/license',
  '/logo.svg',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
