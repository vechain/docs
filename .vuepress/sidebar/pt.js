module.exports = {
    '/pt/thor/': [
        {
            title: 'Aprenda',
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
            title: 'Primeiros Passos',
            collapsable: false,
            children: [
                'get-started/installation',
                'get-started/custom-network',
            ]
        },
        {
            title: 'Thorest API',
            path: 'get-started/api'
        }
    ],
    '/pt/connex/': [
        ['', 'Connex'],
        ['api', 'Documentação API']
    ],
    '/pt/sync/': [
        {
            title: 'Download & Instalação',
            path: 'download-and-install.html'
        },
        {
            title: 'Manual do Usuário',
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
            title: 'Perguntas Frequentes',
            path: 'faq'
        }
    ],
    '/pt/sync2/': [
        {
            title: 'Obter Sync2',
            path: 'get-started'
        },

        {
            title: 'Manual do Usuário',
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
            title: 'Perguntas Frequentes',
            path: 'faq'
        }
    ],
    '/pt/others/': [
        ['miscellaneous', 'Outros'],
        ['development-resources', 'Material Dev']
    ]
}
