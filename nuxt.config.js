const path = require('path')
const settings = require(path.resolve(__dirname, 'config.json'))

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: settings.siteTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: settings.siteDescription },
      
      // Facebook tags
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: settings.url },
      { property: 'og:image', content: settings.shareImage },
      { property: 'og:title', content: settings.shareTitle },
      { property: 'og:description', content: settings.shareDescription },
      { property: 'og:site_name', content: settings.siteTitle },
      
      // Twitter tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@FightForTheFtr' },
      { name: 'twitter:title', content: settings.shareTitle },
      { name: 'twitter:description', content: settings.shareDescription },
      { name: 'twitter:image:src', content: settings.shareImage }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: "https://fonts.googleapis.com/css?family=Montserrat:400,700|Open+Sans:400,700" }
    ]
  },
  css: [
    'normalize.css/normalize.css',
    '~/assets/css/main.scss'
  ],
  modules: [
    'nuxt-sass-resources-loader',
    ['@nuxtjs/google-analytics', {
      id: settings.googleAnalyticsId
    }]
  ],
  // make sass vars global
  sassResources: [
    '~/assets/css/_variables.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
