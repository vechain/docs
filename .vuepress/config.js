const path = require('path')
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@public': path.join(__dirname, '../public/')
            }
        }
    },
    themeConfig: {
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