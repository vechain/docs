const path = require('path')
module.exports = {
  title: "CoreDocs",
  description: 'Description of the site',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@public': path.join(__dirname, '../public/')
      }
    }
  },
  themeConfig: {
    logo: 'logo.png',
    smoothScroll: true,
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Thor', items: [
          { text: 'Learn', link: '/thor/learn/introduction' },
          { text: 'Get Started', link: '/thor/get-started/installation' }
        ]
      },
      { text: 'Connex', link: '/connex/connex-intro' },
      {
        text: 'Sync', items: [
          { text: 'Download', link: '/sync/download-and-install' },
          { text: 'User Guide', link: '/sync/user-guide/wallet' },
          { text: 'FAQ', link: '/sync/faq' },
        ]
      },
      {
      text: 'Links', items: [
      { text: 'Explorer', link: 'https://explore.vechain.org' },
      { text: 'App-hub', link: 'https://apps.vechain.org/' }
      ]
    }
    ],
    sidebar: {
      '/thor/learn/': [
        'introduction',
        'two-token-design',
        'proof-of-authority',
        'builtin-contracts',
        'block',
        'transaction-model',
        'transaction-calculation',
        'fee-delegation'
      ],
      '/thor/get-started/': [
        'installation',
        'custom-network',
        'api'
      ],
      '/connex/': [
        'connex-intro',
        'compatible-client',
        'demos-and-service',
        'api'
      ],
      '/sync/user-guide/': [
        'wallet',
        'import-ledger',
        'browse-dapp-and-web',
        'interact-with-dapps',
        'activities',
        'settings',
        'report-issue'
      ]
    },
        repo: 'xjwx89/doc',//edit page config 
        docsBranch: 'draft',
        editLinks: true,
  },
  plugins: [
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg'
      },
    ]
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }
    ]
  ]
}