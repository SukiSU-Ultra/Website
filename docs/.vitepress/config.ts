import {
  defineConfig,
  resolveSiteDataByRoute,
  type HeadConfig
} from 'vitepress'
import { resolve } from 'path'

const prod = !!process.env.VERCEL

export default defineConfig({
  title: 'SukiSU-Ultra',
  description: 'Next-Generation Android Root Solution - Advanced kernel-based root management for Android devices with KernelSU integration',

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  
  // Global performance optimizations
  cacheDir: './.vitepress/cache',
  ignoreDeadLinks: false,
  
  // Enhanced markdown with performance focus
  markdown: {
    math: true,
    linkify: true,
    typographer: true,
    lineNumbers: false, // Disable for faster rendering
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  // Optimized sitemap
  sitemap: {
    hostname: 'https://sukisu.org',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('404'))
        .map((item) => ({
          ...item,
          changefreq: item.url === '/' ? 'daily' : 
                     item.url.includes('/guide/') ? 'weekly' : 'monthly',
          priority: item.url === '/' ? 1.0 : 
                   item.url.includes('/guide/') ? 0.9 : 0.7
        }))
    }
  },

  // Critical performance transformations
  transformPageData(pageData) {
    const canonicalUrl = `https://sukisu.org${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['link', { rel: 'preload', href: '/logo.svg', as: 'image' }]
    )
    
    return pageData
  },

  head: [
    // Critical resource hints for global performance
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: '//github.com' }],
    ['link', { rel: 'dns-prefetch', href: '//t.me' }],
    ['link', { rel: 'dns-prefetch', href: '//sukisu.org' }],
    
    // Essential favicon setup - optimized for performance
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    
    // Apple Touch Icon (covers all iOS devices)
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    
    // Safari Pinned Tab
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#64edff' }],
    ['meta', { name: 'msapplication-square310x310logo', content: '/mstile-310x310.png' }],
    ['meta', { name: 'msapplication-config', content: '/browserconfig.xml' }],
    
    // Web App Manifest
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    
    // Theme and app configuration
    ['meta', { name: 'theme-color', content: '#64edff' }],
    ['meta', { name: 'application-name', content: 'SukiSU-Ultra' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'SukiSU-Ultra' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    
    // Viewport and mobile optimization
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    
    // Enhanced Open Graph for global sharing
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'SukiSU-Ultra' }],
    ['meta', { property: 'og:image', content: 'https://sukisu.org/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:url', content: 'https://sukisu.org/' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:locale:alternate', content: 'zh_CN' }],
    
    // Twitter optimization for global audience
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:site', content: '@sukisu_ultra' }],
    ['meta', { property: 'twitter:creator', content: '@sukisu_ultra' }],
    ['meta', { property: 'twitter:image', content: 'https://sukisu.org/og-image.png' }],
    
    // Additional SEO optimizations
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'bingbot', content: 'index, follow' }],
    ['meta', { name: 'referrer', content: 'strict-origin-when-cross-origin' }],
    
    // Vercel Analytics (global performance tracking)
    ['script', { src: '/_vercel/insights/script.js', defer: '' }],
    ['script', { src: '/_vercel/speed-insights/script.js', defer: '' }],
    
    // Global SEO optimization
    ['meta', { name: 'keywords', content: 'Android root, KernelSU, SukiSU-Ultra, Android kernel, root management, 安卓 root, カーネル, рут' }],
    ['meta', { name: 'author', content: 'SukiSU-Ultra Team' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    
    // Enhanced structured data for global search engines
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'SukiSU-Ultra',
      'description': 'Next-Generation Android Root Solution',
      'applicationCategory': 'SystemApplication',
      'operatingSystem': 'Android',
      'url': 'https://sukisu.org',
      'downloadUrl': 'https://github.com/sukisu-ultra/sukisu-ultra/releases',
      'supportingData': {
        '@type': 'DataCatalog',
        'name': 'Compatibility Database'
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'bestRating': '5',
        'ratingCount': '10000'
      },
      'author': {
        '@type': 'Organization',
        'name': 'SukiSU-Ultra Team',
        'url': 'https://github.com/sukisu-ultra'
      }
    })],
    
    // PWA optimization for global mobile users
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
      chunkSizeWarningLimit: 800,
      assetsInlineLimit: 8192,
      target: 'esnext',
      cssCodeSplit: true,
      sourcemap: false
    },
    
    server: {
      fs: {
        allow: ['..']
      }
    }
  }

})