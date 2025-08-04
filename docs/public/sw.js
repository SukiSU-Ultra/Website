// High-Performance Service Worker for Global Traffic
const CACHE_NAME = 'sukisu-ultra-v2.0'
const STATIC_CACHE = 'sukisu-static-v2.0'
const RUNTIME_CACHE = 'sukisu-runtime-v2.0'
const IMAGE_CACHE = 'sukisu-images-v2.0'

// Critical paths for global users
const CRITICAL_ASSETS = [
  '/',
  '/guide/',
  '/guide/installation',
  '/guide/compatibility',
  '/zh/',
  '/zh/guide/',
  '/logo.svg',
  '/favicon.ico'
]

// Cache strategies optimized for 1M+ requests
const CACHE_STRATEGIES = {
  static: ['.css', '.js', '.woff2', '.woff', '.ttf', '.otf'],
  images: ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.gif', '.ico'],
  documents: ['.html', '.json', '.xml']
}

// Install - Aggressive caching for global performance
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE)
      try {
        await cache.addAll(CRITICAL_ASSETS)
      } catch (error) {
        console.warn('Failed to cache some assets:', error)
      }
      self.skipWaiting()
    })()
  )
})

// Activate - Clean old caches efficiently
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      const validCaches = [STATIC_CACHE, RUNTIME_CACHE, IMAGE_CACHE, CACHE_NAME]
      
      await Promise.all(
        cacheNames
          .filter(name => !validCaches.includes(name))
          .map(name => caches.delete(name))
      )
      
      self.clients.claim()
    })()
  )
})

// Fetch - High-performance caching strategy
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and cross-origin
  if (request.method !== 'GET' || url.origin !== location.origin) return

  // Skip Vercel analytics to prevent interference
  if (url.pathname.startsWith('/_vercel/') || url.pathname.startsWith('/api/')) return

  event.respondWith(handleRequest(request, url))
})

async function handleRequest(request, url) {
  const isStatic = CACHE_STRATEGIES.static.some(ext => url.pathname.endsWith(ext))
  const isImage = CACHE_STRATEGIES.images.some(ext => url.pathname.endsWith(ext))
  const isDocument = CACHE_STRATEGIES.documents.some(ext => url.pathname.endsWith(ext)) || url.pathname.endsWith('/')

  try {
    if (isStatic) {
      return await handleStatic(request)
    } else if (isImage) {
      return await handleImage(request)
    } else if (isDocument) {
      return await handleDocument(request)
    } else {
      return await handleDefault(request)
    }
  } catch (error) {
    return await handleOffline(request)
  }
}

// Static assets - Cache first with background update
async function handleStatic(request) {
  const cache = await caches.open(STATIC_CACHE)
  const cached = await cache.match(request)
  
  if (cached) {
    // Update in background for fresh content
    fetch(request).then(response => {
      if (response.ok) cache.put(request, response.clone())
    }).catch(() => {})
    
    return cached
  }

  const response = await fetch(request)
  if (response.ok) {
    cache.put(request, response.clone())
  }
  return response
}

// Images - Cache with long TTL
async function handleImage(request) {
  const cache = await caches.open(IMAGE_CACHE)
  const cached = await cache.match(request)
  
  if (cached) return cached

  const response = await fetch(request)
  if (response.ok) {
    cache.put(request, response.clone())
  }
  return response
}

// Documents - Network first with fallback
async function handleDocument(request) {
  const cache = await caches.open(RUNTIME_CACHE)
  
  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) return cached
    
    // Return offline page for navigation
    if (request.mode === 'navigate') {
      const offlinePage = await cache.match('/')
      if (offlinePage) return offlinePage
    }
    
    throw error
  }
}

// Default strategy - Network with cache fallback
async function handleDefault(request) {
  const cache = await caches.open(RUNTIME_CACHE)
  
  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) return cached
    throw error
  }
}

// Offline fallback
async function handleOffline(request) {
  const cache = await caches.open(STATIC_CACHE)
  
  if (request.mode === 'navigate') {
    const offlinePage = await cache.match('/')
    if (offlinePage) return offlinePage
  }
  
  // Return a minimal offline response
  return new Response('Offline', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  })
}

// Background sync for analytics (global performance tracking)
self.addEventListener('sync', event => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics())
  }
})

async function syncAnalytics() {
  try {
    // Batch analytics data for efficiency
    console.log('Syncing global analytics...')
    // Implementation depends on your analytics provider
  } catch (error) {
    console.error('Analytics sync failed:', error)
  }
}

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PERFORMANCE_MARK') {
    // Track performance metrics for global optimization
    performance.mark(event.data.name)
  }
})

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
