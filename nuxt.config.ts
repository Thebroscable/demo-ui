export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
  ],

  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/tailwind.scss', '~/assets/css/main.scss', '@fortawesome/fontawesome-free/css/all.min.css'],

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },

  compatibilityDate: '2025-02-18',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  shadcn: {
    prefix: 'UI',
    componentDir: './components/ui',
  },
})
