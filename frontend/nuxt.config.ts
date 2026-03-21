export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'tokyo-night',
            dark: 'tokyo-night',
            light: 'min-light',
          },
          langs: [
            'typescript', 'javascript', 'python', 'go', 'rust',
            'bash', 'sh', 'dockerfile', 'yaml', 'json', 'vue',
            'css', 'html', 'sql', 'markdown',
          ],
        },
      },
    },
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'fbufler-color-mode',
  },

  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/main.css',
    '~/assets/css/typography.css',
    '~/assets/css/shiki.css',
  ],

  app: {
    head: {
      title: 'fbufler',
      meta: [
        { name: 'description', content: 'fbufler — developer, writer, builder' },
        { name: 'theme-color', content: '#1a1b26' },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  devtools: { enabled: true },
})
