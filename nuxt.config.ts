import {NuxtConfig} from "nuxt/config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(<NuxtConfig>{
  app: {
    head: {
      title: 'Syno Manager'
    },
  },
  css: [
    'vue-json-pretty/lib/styles.css',
    'primevue/resources/themes/lara-light-indigo/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    '@/assets/app.scss'
  ],
  build: {
    transpile: ['primevue']
  },
  modules: [
    '@nuxt/devtools',
    '@pinia/nuxt',
    'nuxt-electron',
  ],
})
