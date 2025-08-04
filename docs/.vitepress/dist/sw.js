const CACHE_NAME = 'sukisu-ultra-v1.2'
const STATIC_CACHE = 'sukisu-static-v1.2'
const RUNTIME_CACHE = 'sukisu-runtime-v1.2'

// Files to cache on install
const STATIC_ASSETS = [
  '/',
  '/guide/',
  '/guide/installation',
  '/guide/compatibility',
  '/guide/links',
  '/zh/',
  '/zh/guide/',
  '/logo.svg',
  '/favicon.ico',
  '/site.webmanifest'
]

// Cache strategies
const CACHE_STRATEGIES = {
  static: ['.css', '.js', '.woff2', '.woff', '.ttf', '.otf'],
  images: ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.gif'],
  api: ['/api/']
}

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE)
      await cache.addAll(STATIC_ASSETS)
      self.skipWaiting()
    })()
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter(name => name !== STATIC_CACHE && name !== RUNTIME_CACHE)
          .map(name => caches.delete(name))
      )
      self.clients.claim()
    })()
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip cross-origin requests
  if (url.origin !== location.origin) return

  // Skip Vercel analytics and insights
  if (url.pathname.startsWith('/_vercel/')) return

  event.respondWith(
    (async () => {
      const cache = await caches.open(RUNTIME_CACHE)

      // Check if it's a static asset
      const isStatic = CACHE_STRATEGIES.static.some(ext => url.pathname.endsWith(ext))
      const isImage = CACHE_STRATEGIES.images.some(ext => url.pathname.endsWith(ext))

      if (isStatic || isImage) {
        // Cache first, then network for static assets
        const cachedResponse = await cache.match(request)
        if (cachedResponse) {
          // Update cache in background
          event.waitUntil(
            fetch(request).then(response => {
              if (response.ok) {
                cache.put(request, response.clone())
              }
            }).catch(() => {})
          )
          return cachedResponse
        }
      }

      try {
        const response = await fetch(request)
        
        if (response.ok) {
          // Cache successful responses
          if (isStatic || isImage || url.pathname.endsWith('.html')) {
            cache.put(request, response.clone())
          }
        }
        
        return response
      } catch (error) {
        // Return cached version if available
        const cachedResponse = await cache.match(request)
        if (cachedResponse) {
          return cachedResponse
        }
        
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
          const offlineResponse = await cache.match('/')
          if (offlineResponse) {
            return offlineResponse
          }
        }
        
        throw error
      }
    })()
  )
})

// Background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics())
  }
})

async function syncAnalytics() {
  // Sync any pending analytics data when online
  try {
    // Implementation would depend on your analytics setup
    console.log('Syncing analytics data...')
  } catch (error) {
    console.error('Analytics sync failed:', error)
  }
}

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
