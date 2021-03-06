export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    DOMAIN: process.env.DOMAIN,
    API_URL: process.env.API_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    SENDFOX_USER_ID: process.env.SENDFOX_USER_ID,
    SENDFOX_FORM_ID: process.env.SENDFOX_FORM_ID,
    SENTRY_DEBUG: process.env.SENTRY_DEBUG,
    SENTRY_DSN: process.env.SENTRY_DSN,
    ENV: process.env.ENV,
    STRIPE_PK: process.env.STRIPE_PK,
    STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'OneClickDB',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/fav/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/fav/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/fav/favicon-16x16.png" },
      { rel: "manifest", href: "/img/fav/site.webmanifest" },
      { rel: "mask-icon", href: "/img/fav/safari-pinned-tab.svg", color: "#1d4ed8" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/app.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/components.js',
    '~/plugins/packages.js',
    '~/plugins/vue-awesome.js',
    '~/plugins/error.js',
    { src: '~/plugins/vue-stripe.js', ssr: false },
    { src: '~/plugins/confetti.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    '@nuxtjs/netlify-files',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-validate',
    '@nuxtjs/toast',
    '@nuxtjs/sentry',
    '@nuxtjs/markdownit'
  ],
  loading: false,
  sentry: {
    dsn: process.env.SENTRY_DSN,
    config: {
      debug: process.env.SENTRY_DEBUG || false,
      environment: process.env.ENV || 'development'
    },
  },
  toast: {
    position: 'top-center',
    duration: 2000
  },
  axios: {
    
  },
  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/auth/login',
      home: '/home'
    },
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: process.env.API_URL,
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      },
    }
  },
  netlifyFiles: {
    netlifyToml: {
      redirects: [
        {
          from: 'https://ocdb.patgriffith.com',
          to: 'https://oneclickdb.com',
          status: 301,
          force: true
        },
        {
          from: 'http://ocdb.patgriffith.com',
          to: 'https://oneclickdb.com',
          status: 301,
          force: true
        },
        {
          from: '/bee.js',
          to: 'https://cdn.splitbee.io/sb.js',
          status: 200
        },
        {
          from: '/_hive/*',
          to: 'https://hive.splitbee.io/:splat',
          status: 200
        },
      ]
    }
  },
  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: []
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vue-awesome/]
  }
}
