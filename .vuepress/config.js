const path = require('path')
module.exports = {
    title: "CoreDocs",
    description: 'Description of the site',
    head: [
      ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/favicons/apple-touch-icon.png"}],
      ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicons/favicon-32x32.png"}],
      ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/favicons/favicon-16x16.png"}],
      ['link', { rel: "shortcut icon", href: "/assets/favicons/favicon.ico"}],
    ],
    configureWebpack: {
        resolve: {
            alias: {
                '@public': path.join(__dirname, '../public/')
            }
        }
    },
    themeConfig: {
      logo: 'public/images/thor/mpp.png',
      smoothScroll: true,
        nav: [
          { text: 'Thor', items:[
          { text: 'Learn', link: '/thor/learn/introduction'},
          { text: 'Get Started', link: '/thor/get-started/installation'},
          { text: 'FAQ',link :'/thor/learn/faq'}
          ]},
          { text: 'Connex', link: '/connex/connex-intro' },  
          { text: 'Sync', items :[
            { text: 'Download', link: '/sync/download-and-install' },
            { text: 'User Guide', link: '/sync/user-guide/wallet' },
            { text: 'FAQ', link: '/sync/faq'},
          ]},
          { text : 'Explorer',link:'https://insight.vecha.in'},
          { text : 'Github',link:'https://www.github.com/vechain'}
        ],
        sidebar: {
        '/thor/learn/' : [
            'introduction',
            'two-token-design',
            'proof-of-authority',
            'builtin-contracts',
            'block',
            'transaction-model',
            'transaction-calculation',
            'fee-delegation',
            'faq'
        ],
        '/thor/get-started/' : [
          'installation',
          'custom-network',
          'api'
      ],
        '/connex/' : [
            'connex-intro',
            'compatible-client',
            'api'
        ],
        '/sync/user-guide/' : [
            'wallet',
            'import-ledger',
            'browse-dapp-and-web',
            'interact-with-dapps',
            'activities',
            'settings',
            'report-issue'
        ]
        }
    },
    plugins: [
        [
          'vuepress-plugin-mathjax',
          {
            target: 'svg'
          },
        ],
      ],
}