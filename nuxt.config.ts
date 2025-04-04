export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/color-mode', {
      classSuffix: '',
      preference: 'system',
      fallback: 'light',
      storageKey: 'color-mode'
    }],
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  css: [
    '~/assets/css/tailwind.css',
  ],

  app: {
    head: {
      title: 'Routiine.io — Sales Performance Platform',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Routiine.io turns sales strategy into structured execution with behavior-driven systems.' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Routiine.io' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://routiine.io' },
        { property: 'og:title', content: 'Routiine.io — Sales Reinvented' },
        { property: 'og:description', content: 'A behavior-first sales system that installs structure and performance habits into your team.' },
        { property: 'og:image', content: 'https://routiine.io/og-image.jpg' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Routiine.io — Sales Reinvented' },
        { name: 'twitter:description', content: 'Routiine transforms sales strategy into execution through structured behavior systems.' },
        { name: 'twitter:image', content: 'https://routiine.io/og-image.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'canonical', href: 'https://routiine.io' }
      ]
    },
  },

  sitemap: {
    hostname: 'https://routiine.io',
    gzip: true,
    routes: [], // You can auto-generate or explicitly define static routes here.
  },

  robots: {
    UserAgent: '*',
    Disallow: '',
    Sitemap: 'https://routiine.io/sitemap.xml',
  },

  compatibilityDate: '2025-03-29',
});
