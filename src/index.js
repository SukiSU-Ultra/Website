export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    try {
      // Handle clean URLs - if no extension, try to serve as HTML
      if (!pathname.includes('.') && !pathname.endsWith('/')) {
        const htmlPath = pathname + '.html';
        try {
          const htmlResponse = await env.ASSETS.fetch(new URL(htmlPath, request.url));
          if (htmlResponse.status === 200) {
            return new Response(htmlResponse.body, {
              status: 200,
              headers: {
                'Content-Type': 'text/html;charset=UTF-8',
                'Cache-Control': 'public, max-age=3600',
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff'
              }
            });
          }
        } catch (e) {
          // Continue to try index.html
        }
      }

      // Try to serve the requested asset
      const response = await env.ASSETS.fetch(request);
      
      if (response.status === 404) {
        // For 404s, try to serve index.html (SPA fallback)
        const indexResponse = await env.ASSETS.fetch(new URL('/index.html', request.url));
        if (indexResponse.status === 200) {
          return new Response(indexResponse.body, {
            status: 200,
            headers: {
              'Content-Type': 'text/html;charset=UTF-8',
              'Cache-Control': 'public, max-age=3600'
            }
          });
        }
      }

      // Add security headers to all responses
      const headers = new Headers(response.headers);
      headers.set('X-Frame-Options', 'DENY');
      headers.set('X-Content-Type-Options', 'nosniff');
      headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      
      // Set appropriate cache headers based on content type
      const contentType = headers.get('Content-Type') || '';
      if (contentType.includes('text/html')) {
        headers.set('Cache-Control', 'public, max-age=3600');
      } else if (pathname.includes('/assets/') || pathname.match(/\.(js|css|woff2?)$/)) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (pathname.match(/\.(svg|png|ico|jpg|jpeg|webp)$/)) {
        headers.set('Cache-Control', 'public, max-age=86400');
      }

      return new Response(response.body, {
        status: response.status,
        headers
      });

    } catch (error) {
      return new Response('Internal Server Error', { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff'
        }
      });
    }
  }
};
