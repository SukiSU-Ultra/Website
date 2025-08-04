import {
  defineConfig,
  resolveSiteDataByRoute,
  type HeadConfig
} from 'vitepress'

const prod = !!process.env.VERCEL

export default defineConfig({
  title: 'SukiSU-Ultra',
  description: 'Next-Generation Android Root Solution - Advanced kernel-based root management for Android devices with KernelSU integration',

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  
  // Enhanced caching and performance
  cacheDir: './.vitepress/cache',
  ignoreDeadLinks: false,

  markdown: {
    math: true,
    lineNumbers: true,
    linkify: true,
    typographer: true,
    codeTransformers: [
      // Add syntax highlighting transformers if needed
    ]
  },

  sitemap: {
    hostname: 'https://sukisu.org',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('404'))
        .map((item) => ({
          ...item,
          changefreq: item.url === '/' ? 'weekly' : 'monthly',
          priority: item.url === '/' ? 1.0 : 
                   item.url.includes('/guide/') ? 0.8 : 0.6
        }))
    }
  },

  transformPageData(pageData) {
    // Add structured data for each page
    const canonicalUrl = `https://sukisu.org${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }]
    )
    
    return pageData
  },

  head: [
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }
    ],
    ['meta', { name: 'theme-color', content: 'rgba(100, 237, 255, 1)' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'SukiSU-Ultra' }],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://sukisu.org/og-image.png'
      }
    ],
    ['meta', { property: 'og:url', content: 'https://sukisu.org/' }],
    // Performance and preloading
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: '//github.com' }],
    ['link', { rel: 'dns-prefetch', href: '//t.me' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    // Vercel Analytics
    ['script', { src: '/_vercel/insights/script.js', defer: '' }],
    // Vercel Speed Insights
    ['script', { src: '/_vercel/speed-insights/script.js', defer: '' }],
    // SEO Meta Tags
    ['meta', { name: 'keywords', content: 'Android root, KernelSU, SukiSU-Ultra, Android kernel, root management, Android rooting, custom ROM, Android modding' }],
    ['meta', { name: 'author', content: 'SukiSU-Ultra Team' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    // Open Graph enhancements
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:locale:alternate', content: 'zh_CN' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:site', content: '@sukisu_ultra' }],
    ['meta', { property: 'twitter:creator', content: '@sukisu_ultra' }],
    // Structured Data
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'SukiSU-Ultra',
      'description': 'Next-Generation Android Root Solution with KernelSU integration',
      'applicationCategory': 'SystemApplication',
      'operatingSystem': 'Android',
      'url': 'https://sukisu.org',
      'downloadUrl': 'https://github.com/sukisu-ultra/sukisu-ultra/releases',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'author': {
        '@type': 'Organization',
        'name': 'SukiSU-Ultra Team'
      }
    })],
    // Enhanced PWA manifest
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'SukiSU-Ultra' }]
  ],

  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sukisu-ultra/sukisu-ultra' },
      { 
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785L24 5.368c.321-1.279-.541-1.845-1.335-1.651Z"/></svg>'
        }, 
        link: 'https://t.me/sukiksu' 
      }
    ],

    search: {
      provider: 'local'
    }
  },

  locales: {
    root: { 
      label: 'English',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'Compatibility', link: '/guide/compatibility' },
          { text: 'Links', link: '/guide/links' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Introduction', link: '/guide/' },
                { text: 'Installation', link: '/guide/installation' },
                { text: 'Compatibility', link: '/guide/compatibility' },
                { text: 'Links', link: '/guide/links' }
              ]
            }
          ]
        }
      }
    },
    zh: { 
      label: '简体中文',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '指南', link: '/zh/guide/' },
          { text: '兼容性', link: '/zh/guide/compatibility' },
          { text: '链接', link: '/zh/guide/links' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '开始使用',
              items: [
                { text: '介绍', link: '/zh/guide/' },
                { text: '安装', link: '/zh/guide/installation' },
                { text: '兼容性', link: '/zh/guide/compatibility' },
                { text: '链接', link: '/zh/guide/links' }
              ]
            }
          ]
        }
      }
    }
  },

  vite: {
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096,
      target: 'esnext'
    },
    server: {
      fs: {
        allow: ['..']
      }
    }
  }

})