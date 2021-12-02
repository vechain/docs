const getThorSidebar = (sectionA, sectionB, sectionC) => {
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
const getSyncSidebar = (sectionA, sectionB, sectionC) => {
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
const getSync2Sidebar = (sectionA, sectionB, sectionC) => {
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

const getConnexSidebar = (sectionA, sectionB) => {
    return [
        ['', sectionA],
        ['api', sectionB]
    ]
}

const getOthersSidebar = (sectionA, sectionB) => {
    return [
        ['', sectionA],
        ['development-resources', sectionB]
    ]
}

exports.getThorSidebar = getThorSidebar
exports.getSyncSidebar = getSyncSidebar
exports.getSync2Sidebar = getSync2Sidebar
exports.getConnexSidebar = getConnexSidebar
exports.getOthersSidebar = getOthersSidebar