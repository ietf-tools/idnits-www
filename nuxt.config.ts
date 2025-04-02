import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'reka-ui/nuxt'
  ],
  devtools: {
    enabled: true
  },
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  eslint: {
    config: {
      stylistic: {
        braceStyle: '1tbs',
        commaDangle: 'never'
      }
    }
  },
  piniaPluginPersistedstate: {
    key: 'idnits_%id',
    storage: 'localStorage'
  }
})
