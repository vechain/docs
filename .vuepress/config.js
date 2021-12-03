const path = require('path')

module.exports = {
  base: !!process.env.BASE ? process.env.BASE : '/',
  locales: {
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'VeChain Docs',
      description: 'Everything you need to know about VeChainThor'
    },
    '/pt/': {
      lang: 'pt-br',
      title: 'VeChain Docs',
      description: 'Tudo que você precisa saber sobre VeChainThor'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['meta', { name: 'keywords', content: 'vechain, documentation, docs, thor, connex, sync, official' }],
    ['meta', { name: 'google-site-verification', content: 'yvT2mNLTy-gN9NFUXxNNJR7zIsWLrEvcWNZg_m91pwA' }],
    ['meta', { name: "viewport", content: 'width=device-width, initial-scale=1' }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@public': path.join(__dirname, '../public/')
      }
    }
  },
  themeConfig: {
    repo: 'vechain/docs',
    docsRepo: 'vechain/docs',
    docsBranch: 'master',
    editLinks: true,
    logo: '/logo.png',
    sidebarDepth: 0,
    smoothScroll: true,
    activeHeaderLinks: false,
    searchPlaceholder: 'Search',
    algolia: {
      apiKey: '1cf3bcfcda8c87948b832b6aff064e7f',
      indexName: 'vechain'
    },
    locales: {
      '/': {
        // text for the language dropdown
        selectText: '🌍',
        // label for this locale in the language dropdown
        label: 'English',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Languages',
        // text for the edit-on-github link
        editLinkText: 'Help us to improve this page',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        nav: require('./nav/en'),
        sidebar: require('./sidebar/en')
      },
      '/pt/': {
        // text for the language dropdown
        selectText: '🌍',
        // label for this locale in the language dropdown
        label: 'Português',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Idiomas',
        // text for the edit-on-github link
        editLinkText: 'Nos ajude a melhorar essa página',
        serviceWorker: {
          updatePopup: {
            message: "Conteúdo novo disponível.",
            buttonText: "Atualizar"
          }
        },
        nav: require('./nav/pt'),
        sidebar: require('./sidebar/pt')
      }
    },
  },
  plugins: [
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg'
      },
    ],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true,
    }
    ],
    [
      'sitemap', {
        hostname: 'https://docs.vechain.org',
        exclude: '/404.html'
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-132391998-6'
      }
    ]
  ]
}