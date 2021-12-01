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
    logo: '/logo.png',
    sidebarDepth: 0,
    smoothScroll: true,
    activeHeaderLinks: false,

    repo: 'vechain/docs',
    docsRepo: 'vechain/docs',
    docsBranch: 'master',
    editLinks: true,
    searchPlaceholder: 'Search keyword',

    // specific configuraation for different languages
    locales: {
      '/': {
        // text for the language dropdown
        selectText: 'Languages',
        // label for this locale in the language dropdown
        label: 'English',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Languages',
        // text for the edit-on-github link
        editLinkText: 'Help us to improve this page',
        // search placeholder
        // searchPlaceholder: 'Busca', NOT WORKING
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        // algolia docsearch options for current locale
        algolia: {
          apiKey: '1cf3bcfcda8c87948b832b6aff064e7f',
          indexName: 'vechain'
        },
        nav: require('./nav/en'),
        sidebar: {
          '/thor/': getThorSidebar('Learn', 'Get Started', 'Thorest API'),
          '/connex/': ['', 'api'],
          '/sync2/': getSync2Sidebar('Get Sync2', 'User Guide', 'FAQ'),
          '/sync/': getSyncSidebar('Download & Install', 'User Guide', 'FAQ'),
          '/others/': ['', 'development-resources']
        },
        lastUpdated: 'Last Updated'
      },
      '/pt/': {
        // text for the language dropdown
        selectText: 'Idiomas',
        // label for this locale in the language dropdown
        label: 'Português',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Idiomas',
        // text for the edit-on-github link
        editLinkText: 'Nos ajude a melhorar essa página',
        // search placeholder
        // searchPlaceholder: 'Busca', NOT WORKING
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "Conteúdo novo disponível.",
            buttonText: "Atualizar"
          }
        },
        // algolia docsearch options for current locale
        algolia: {
          apiKey: '1cf3bcfcda8c87948b832b6aff064e7f',
          indexName: 'vechain_pt'
        },
        nav: require('./nav/pt'),
        sidebar: {
          '/pt/thor/': getThorSidebar('Aprenda', 'Primeiros Passos', 'Thorest API'),
          '/pt/connex/': ['', 'api'],
          '/pt/sync2/': getSync2Sidebar('Obter Sync2', 'Manual do Usuário', 'Perguntas Frequentes'),
          '/pt/sync/': getSyncSidebar('Download & Instalação', 'Manual do Usuário', 'Perguntas Frequentes'),
          '/pt/others/': ['', 'development-resources']
        },
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


function getThorSidebar(sectionA, sectionB, sectionC) {
  return [
    {
      title: sectionA,
      collapsable: false,
      children: [
        'learn/',
        'learn/two-token-design',
        'learn/proof-of-authority',
        'learn/builtin-contracts',
        'learn/block',
        'learn/transaction-model',
        'learn/transaction-calculation',
        'learn/fee-delegation'
      ]
    },
    {
      title: sectionB,
      collapsable: false,
      children: [
        'get-started/installation',
        'get-started/custom-network',
      ]
    },
    {
      title: sectionC,
      path: 'get-started/api'
    }
  ]
}
//Sync Desktop
function getSyncSidebar(sectionA, sectionB, sectionC) {
  return [
    {
      title: sectionA,
      path: 'download-and-install.html'
    },
    {
      title: sectionB,
      collapsable: false,
      children: [
        'user-guide/',
        'user-guide/import-ledger',
        'user-guide/browse-dapp-and-web',
        'user-guide/interact-with-dapps',
        'user-guide/activities',
        'user-guide/settings',
        'user-guide/report-issue',
        'user-guide/contribute'
      ]
    },
    {
      title: sectionC,
      path: 'faq'
    }
  ]
}
//Sync2
function getSync2Sidebar(sectionA, sectionB, sectionC) {
  return [
    {
      title: sectionA,
      path: 'get-started'
    },

    {
      title: sectionB,
      collapsable: false,
      children: [
        'user-guide/',
        'user-guide/wallet',
        'user-guide/signing',
        'user-guide/activities',
        'user-guide/settings'
      ]
    },
    {
      title: sectionC,
      path: 'faq'
    }
  ]
}