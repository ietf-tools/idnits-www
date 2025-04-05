import fs from 'node:fs/promises'
import tailwindcss from '@tailwindcss/vite'

const packageInfo = JSON.parse(await fs.readFile('package.json', 'utf-8'))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'reka-ui/nuxt',
    'nuxt-viewport'
  ],
  devtools: {
    enabled: true
  },
  app: {
    baseURL: '/idnits3/'
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      idnitsVersion: packageInfo.dependencies['@ietf-tools/idnits']
    }
  },
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
