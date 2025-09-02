// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/eslint'
  ],
  
  css: ['~/assets/css/main.css'],
  
  colorMode: {
    classSuffix: ''
  },

  nitro: {
    imports: {
      dirs: ['database']
    }
  },

  // Headers de sécurité - Configuration progressive pour éviter de casser l'app
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        ...(process.env.NODE_ENV === 'production' && {
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
        })
      }
    }
  }
})
