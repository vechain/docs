module.exports = {
    '/thor/': [
        {
            title: 'Learn',
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
            title: 'Get Started',
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
    '/connex/': [
        ['', 'Connex'],
        ['api', 'API Specification']
    ],
    '/sync/': [
        {
            title: 'Download & Install',
            path: 'download-and-install.html'
        },
        {
            title: 'User Guide',
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
            title: 'FAQ',
            path: 'faq'
        }
    ],
    '/sync2/': [
        {
            title: 'Get Sync2',
            path: 'get-started'
        },

        {
            title: 'User Guide',
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
            title: 'FAQ',
            path: 'faq'
        }
    ],
    '/others/': [
        ['miscellaneous', 'Miscellaneous'],
        ['development-resources', 'Development Resources']
    ]
}