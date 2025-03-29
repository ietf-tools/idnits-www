import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  devtools: {
    enabled: true
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never'
      }
    }
  },
  future: {
    compatibilityVersion: 4
  },
  modules: [
    'reka-ui/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui-pro'
  ],
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
})